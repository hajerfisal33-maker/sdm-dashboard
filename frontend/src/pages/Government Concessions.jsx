import { useEffect, useState } from "react";
import { Container, Row, Col, Card, Table, Badge, Alert, Spinner } from "react-bootstrap";

import api from "../services/api";

import BarChartComponent from "../charts/BarChartComponent";

// ==========================================
// 1. مكون اختبار كاي سكوير للسؤال الخامس
// ==========================================
function ChiSquareResultsBQ5() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchChiSquareData() {
      try {
        const response = await api.get("/concessions-chi-square");
        setData(response.data);
      } catch (err) {
        console.error("Error fetching Chi-Square data for BQ5:", err);
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
            Evaluating the statistical association between <strong>Dominant Claim Type (domclaim)</strong> and <strong>Government Concessions (con)</strong>.
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
// 2. المكون الرئيسي BQ5
// ==========================================
function BQ5() {
  const [totalConcessions, setTotalConcessions] = useState([]);
  const [culturalData, setCulturalData] = useState([]);
  const [autonomyData, setAutonomyData] = useState([]);
  const [independenceData, setIndependenceData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  async function loadData() {
    try {
      const resTotal = await api.get("/concessions");
      const resCultural = await api.get("/cultural-concessions");
      const resAutonomy = await api.get("/autonomy-concessions");
      const resIndependence = await api.get("/independence-concessions");

      setTotalConcessions(resTotal.data);
      setCulturalData(resCultural.data);
      setAutonomyData(resAutonomy.data);
      setIndependenceData(resIndependence.data);
    } catch (error) {
      console.error("Error loading BQ5 data:", error);
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <Container className="mt-5 text-center">
        <h3>Loading Concessions Analysis...</h3>
      </Container>
    );
  }

  return (
    <Container className="mt-5 mb-5">
      {/* الهيدر الشارح بدلاً من صيغة BQ5 والسؤال المباشر */}
      <div className="mb-4">
        <Badge bg="success" className="px-3 py-2 fs-6 mb-2 rounded-pill">
          Policy & Governance Responses
        </Badge>
        <h1 className="fw-bold text-dark">Governmental Concessions Analysis</h1>
        <p className="lead text-muted">
          This analysis evaluates state policy responses toward self-determination movements, detailing total concessions granted alongside specific cultural, autonomy, and independence accommodations.
        </p>
      </div>

      <Row className="g-4">
        {/* 1. إجمالي التنازلات حسب المطالبة */}
        <Col lg={6}>
          <Card className="shadow-sm p-4 h-100 border-0 rounded-4 bg-white">
            <h4 className="fw-bold mb-1">Total Concessions Granted</h4>
            <p className="text-muted small mb-3">Cumulative sum of all policy concessions (con) by primary claim type</p>
            <BarChartComponent
              data={totalConcessions}
              xKey="domclaim"
              yKey="concessions"
            />
          </Card>
        </Col>

        {/* 2. التنازلات الثقافية */}
        <Col lg={6}>
          <Card className="shadow-sm p-4 h-100 border-0 rounded-4 bg-white">
            <h4 className="fw-bold mb-1">Cultural Concessions</h4>
            <p className="text-muted small mb-3">Cultural and linguistic accommodations granted (cultcon)</p>
            <BarChartComponent
              data={culturalData}
              xKey="domclaim"
              yKey="cultural_concessions"
            />
          </Card>
        </Col>

        {/* 3. تنازلات الحكم الذاتي */}
        <Col lg={6}>
          <Card className="shadow-sm p-4 h-100 border-0 rounded-4 bg-white">
            <h4 className="fw-bold mb-1">Autonomy Concessions</h4>
            <p className="text-muted small mb-3">Institutional devolution and self-governance concessions (autcon)</p>
            <BarChartComponent
              data={autonomyData}
              xKey="domclaim"
              yKey="autonomy_concessions"
            />
          </Card>
        </Col>

        {/* 4. تنازلات الاستقلال */}
        <Col lg={6}>
          <Card className="shadow-sm p-4 h-100 border-0 rounded-4 bg-white">
            <h4 className="fw-bold mb-1">Independence Concessions</h4>
            <p className="text-muted small mb-3">Formal legal recognition and referendum concessions (indcon)</p>
            <BarChartComponent
              data={independenceData}
              xKey="domclaim"
              yKey="independence_concessions"
            />
          </Card>
        </Col>

        {/* 5. قسم تحليل كاي سكوير الإحصائي */}
        <Col lg={12} className="mt-4">
          <ChiSquareResultsBQ5 />
        </Col>
      </Row>
    </Container>
  );
}

export default BQ5;

