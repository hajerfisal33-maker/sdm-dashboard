import { useEffect, useState } from "react";
import { Container, Row, Col, Card, Table, Badge, Alert, Spinner } from "react-bootstrap";
import api from "../services/api";
import BarChartComponent from "../charts/BarChartComponent";
import PieChartComponent from "../charts/PieChartComponent";

// ==========================================
// 1. مكون اختبار كاي سكوير للسؤال السادس (BQ6)
// ==========================================
function ChiSquareResultsBQ6() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchChiSquareData() {
      try {
        const response = await api.get("/restrictions-chi-square");
        setData(response.data);
      } catch (err) {
        console.error("Error fetching Chi-Square data for BQ6:", err);
        setError("Failed to load Chi-Square statistical analysis.");
      } finally {
        setLoading(false);
      }
    }

    fetchChiSquareData();
  }, []);

  if (loading) {
    return (
      <Card className="shadow-sm p-4 text-center mt-3 border-0 bg-white">
        <Spinner animation="border" role="status" variant="primary" className="mb-2 mx-auto" />
        <p className="text-muted mb-0">Calculating Chi-Square Test Results...</p>
      </Card>
    );
  }

  if (error) {
    return (
      <Alert variant="danger" className="mt-3">
        {error}
      </Alert>
    );
  }

  const isSignificant = data?.pValue < 0.05;

  return (
    <Card className="shadow-sm p-4 border-0 bg-white rounded-4">
      <div className="d-flex justify-content-between align-items-center mb-3 border-bottom pb-3">
        <div>
          <h4 className="fw-bold mb-1 text-dark">📊 Chi-Square Test of Independence</h4>
          <p className="text-muted small mb-0">
            Testing association between <strong>Dominant Claim Type (domclaim)</strong> and <strong>Government Restrictions (res)</strong>.
          </p>
        </div>
        <Badge bg={isSignificant ? "success" : "secondary"} className="px-3 py-2 fs-6 rounded-pill">
          {isSignificant ? "✓ Statistically Significant" : "Not Significant"}
        </Badge>
      </div>

      {/* جدول القيم الإحصائية */}
      <Table responsive hover className="align-middle text-center mb-3">
        <thead className="table-light">
          <tr>
            <th>Statistical Metric</th>
            <th>Value</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="fw-semibold">Chi-Square Statistic (χ²)</td>
            <td>{data?.chiSquare ? Number(data.chiSquare).toFixed(4) : "N/A"}</td>
          </tr>
          <tr>
            <td className="fw-semibold">Degrees of Freedom (df)</td>
            <td>{data?.degreesOfFreedom ?? "N/A"}</td>
          </tr>
          <tr>
            <td className="fw-semibold">p-value</td>
            <td>
              <span className={`fw-bold ${isSignificant ? "text-success" : "text-danger"}`}>
                {data?.pValue !== undefined 
                  ? (data.pValue < 0.001 ? "< 0.001" : Number(data.pValue).toFixed(4)) 
                  : "N/A"}
              </span>
            </td>
          </tr>
        </tbody>
      </Table>

      {/* التفسير الإحصائي */}
      <div className={`p-3 rounded-3 ${isSignificant ? "bg-success-subtle text-success-emphasis" : "bg-warning-subtle text-warning-emphasis"}`}>
        <h6 className="fw-bold mb-1">💡 Statistical Interpretation:</h6>
        <p className="mb-0 fs-6">{data?.interpretation}</p>
      </div>
    </Card>
  );
}

// ==========================================
// 2. المكون الرئيسي BQ6
// ==========================================
function BQ6() {
  const [summaryData, setSummaryData] = useState([]);
  const [totals, setTotals] = useState({
    total: 0,
    cultural: 0,
    autonomy: 0,
    independence: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  async function loadData() {
    try {
      const resTotal = await api.get("/restrictions");
      const resCultural = await api.get("/cultural-restrictions");
      const resAutonomy = await api.get("/autonomy-restrictions");
      const resIndependence = await api.get("/independence-restrictions");

      const totalVal = Number(resTotal.data[0]?.restrictions || 0);
      const culturalVal = Number(resCultural.data[0]?.cultural_restrictions || 0);
      const autonomyVal = Number(resAutonomy.data[0]?.autonomy_restrictions || 0);
      const independenceVal = Number(resIndependence.data[0]?.independence_restrictions || 0);

      setTotals({
        total: totalVal,
        cultural: culturalVal,
        autonomy: autonomyVal,
        independence: independenceVal,
      });

      const chartData = [
        { type: "Cultural", count: culturalVal },
        { type: "Autonomy", count: autonomyVal },
        { type: "Independence", count: independenceVal },
      ];

      setSummaryData(chartData);
    } catch (error) {
      console.error("Error loading BQ6 data:", error);
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <Container className="mt-5 text-center">
        <h3>Loading Governmental Restrictions Analysis...</h3>
      </Container>
    );
  }

  return (
    <Container className="mt-5 mb-5">
      {/* الهيدر الشارح بدلاً من صيغة السؤال والـ BQ6 */}
      <div className="mb-4">
        <Badge bg="warning" text="dark" className="px-3 py-2 fs-6 mb-2 rounded-pill">
          State Control & Suppression Measures
        </Badge>
        <h1 className="fw-bold text-dark">Governmental Restrictions Analysis</h1>
        <p className="lead text-muted">
          This section examines the structural and political restrictions imposed by central governments on self-determination movements across cultural, autonomous, and independence domains.
        </p>
      </div>

      {/* 1. كروت الإحصائيات (Stat Cards) */}
      <Row className="g-3">
        <Col md={3}>
          <Card className="shadow-sm text-center p-3 border-0 border-start border-primary border-4 rounded-3 bg-white">
            <h6 className="text-muted small text-uppercase fw-semibold mb-1">Total Restrictions</h6>
            <h2 className="text-primary fw-bold mb-0">{totals.total.toLocaleString()}</h2>
          </Card>
        </Col>
        <Col md={3}>
          <Card className="shadow-sm text-center p-3 border-0 border-start border-success border-4 rounded-3 bg-white">
            <h6 className="text-muted small text-uppercase fw-semibold mb-1">Cultural Restrictions</h6>
            <h2 className="text-success fw-bold mb-0">{totals.cultural.toLocaleString()}</h2>
          </Card>
        </Col>
        <Col md={3}>
          <Card className="shadow-sm text-center p-3 border-0 border-start border-warning border-4 rounded-3 bg-white">
            <h6 className="text-muted small text-uppercase fw-semibold mb-1">Autonomy Restrictions</h6>
            <h2 className="text-warning fw-bold mb-0">{totals.autonomy.toLocaleString()}</h2>
          </Card>
        </Col>
        <Col md={3}>
          <Card className="shadow-sm text-center p-3 border-0 border-start border-danger border-4 rounded-3 bg-white">
            <h6 className="text-muted small text-uppercase fw-semibold mb-1">Independence Restrictions</h6>
            <h2 className="text-danger fw-bold mb-0">{totals.independence.toLocaleString()}</h2>
          </Card>
        </Col>
      </Row>

      {/* 2. رسوم بيانية للمقارنة بين أنواع القيود */}
      <Row className="g-4 mt-1">
        {/* Bar Chart للمقارنة */}
        <Col lg={6}>
          <Card className="shadow-sm p-4 h-100 border-0 rounded-4 bg-white">
            <h4 className="fw-bold mb-1">Domain Restrictions Breakdown</h4>
            <p className="text-muted small mb-3">Comparing total institutional restrictions across specific domains</p>
            <BarChartComponent
              data={summaryData}
              xKey="type"
              yKey="count"
            />
          </Card>
        </Col>

        {/* Pie Chart لتوزيع النسب */}
        <Col lg={6}>
          <Card className="shadow-sm p-4 h-100 border-0 rounded-4 bg-white">
            <h4 className="fw-bold mb-1">Restriction Type Share</h4>
            <p className="text-muted small mb-3">Percentage distribution of state-imposed restriction categories</p>
            <PieChartComponent
              data={summaryData}
              nameKey="type"
              valueKey="count"
            />
          </Card>
        </Col>

        {/* 3. قسم اختبار كاي سكوير الإحصائي */}
        <Col lg={12} className="mt-4">
          <ChiSquareResultsBQ6 />
        </Col>
      </Row>
    </Container>
  );
}

export default BQ6;