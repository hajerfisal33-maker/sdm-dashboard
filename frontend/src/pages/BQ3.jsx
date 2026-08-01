import { useEffect, useState } from "react";
import { Container, Row, Col, Card, Table, Badge, Alert, Spinner } from "react-bootstrap";

import api from "../services/api";

import LineChartComponent from "../charts/LineChartComponent";
import PieChartComponent from "../charts/PieChartComponent";

// ==========================================
// 1. مكون اختبار كاي سكوير (Chi-Square)
// ==========================================
function ChiSquareResults() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchChiSquareData() {
      try {
        // استدعاء مسار كاي سكوير من الباك إيند
        const response = await api.get("/declarations-chi-square");
        setData(response.data);
      } catch (err) {
        console.error("Error fetching Chi-Square data:", err);
        setError("Failed to load Chi-Square statistical analysis.");
      } finally {
        setLoading(false);
      }
    }

    fetchChiSquareData();
  }, []);

  if (loading) {
    return (
      <Card className="shadow-sm p-4 text-center mt-3">
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
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h4 className="fw-bold mb-0">Chi-Square Test of Independence</h4>
        <Badge bg={isSignificant ? "success" : "secondary"} className="p-2 fs-6 rounded-pill">
          {isSignificant ? "Statistically Significant" : "Not Significant"}
        </Badge>
      </div>

      <p className="text-muted small">
        Testing association between <strong>Dominant Claim Type (domclaim)</strong> and <strong>Unilateral Sovereignty Declarations (sovdec)</strong>.
      </p>

      {/* جدول القيم الإحصائية */}
      <Table bordered hover responsive className="text-center mt-2 align-middle">
        <thead className="table-light">
          <tr>
            <th>Statistical Metric</th>
            <th>Value</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>Chi-Square Statistic (χ²)</strong></td>
            <td>{data?.chiSquare ? Number(data.chiSquare).toFixed(4) : "N/A"}</td>
          </tr>
          <tr>
            <td><strong>Degrees of Freedom (df)</strong></td>
            <td>{data?.degreesOfFreedom ?? "N/A"}</td>
          </tr>
          <tr>
            <td><strong>p-value</strong></td>
            <td>
              <span className={isSignificant ? "fw-bold text-success" : "fw-bold text-danger"}>
                {data?.pValue !== undefined 
                  ? (data.pValue < 0.001 ? "< 0.001" : Number(data.pValue).toFixed(4)) 
                  : "N/A"}
              </span>
            </td>
          </tr>
        </tbody>
      </Table>

      {/* التفسير الإحصائي */}
      <Alert variant={isSignificant ? "success" : "warning"} className="mt-2 mb-0 rounded-3">
        <Alert.Heading className="fs-6 fw-bold">Statistical Interpretation:</Alert.Heading>
        <p className="mb-0">{data?.interpretation}</p>
      </Alert>
    </Card>
  );
}

// ==========================================
// 2. المكون الرئيسي BQ3
// ==========================================
function BQ3() {
  const [sovereignty, setSovereignty] = useState([]);
  const [claims, setClaims] = useState([]);

  useEffect(() => {
    loadData();
  }, []);

  async function loadData() {
    try {
      const s = await api.get("/sovereignty-declarations");
      const c = await api.get("/declaration-by-claim");

      setSovereignty(s.data);
      setClaims(c.data);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <Container className="mt-5 mb-5">
      {/* الهيدر الشارح بدلاً من صيغة السؤال والـ BQ */}
      <div className="mb-4">
        <Badge bg="primary" className="px-3 py-2 fs-6 mb-2 rounded-pill">
          Sovereignty & Claim Dynamics
        </Badge>
        <h1 className="fw-bold text-dark">Unilateral Sovereignty Declarations Analysis</h1>
        <p className="lead text-muted">
          This analysis visualizes the historical frequency of unilateral sovereignty declarations issued by self-determination movements alongside the primary categories of claims driving these declarations.
        </p>
      </div>

      <Row className="g-4">
        {/* Line Chart */}
        <Col lg={6}>
          <Card className="shadow-sm p-4 h-100 border-0 rounded-4 bg-white">
            <h4 className="fw-bold mb-1">Sovereignty Declarations by Year</h4>
            <p className="text-muted small mb-3">Historical trend and timeline of declarations issued between 1945 and 2020</p>
            <LineChartComponent
              data={sovereignty}
              xKey="year"
              yKey="declarations"
            />
          </Card>
        </Col>

        {/* Pie Chart */}
        <Col lg={6}>
          <Card className="shadow-sm p-4 h-100 border-0 rounded-4 bg-white">
            <h4 className="fw-bold mb-1">Dominant Claim Categories</h4>
            <p className="text-muted small mb-3">Distribution breakdown of sovereignty declarations by primary movement claim</p>
            <PieChartComponent
              data={claims}
              nameKey="domclaim"
              valueKey="declarations"
            />
          </Card>
        </Col>

        {/* قسم اختبـار كاي سكوير */}
        <Col lg={12} className="mt-4">
          <ChiSquareResults />
        </Col>
      </Row>
    </Container>
  );
}

export default BQ3;