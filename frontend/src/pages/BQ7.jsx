import { useEffect, useState } from "react";
import { Container, Row, Col, Card, Table, Badge } from "react-bootstrap";
import api from "../services/api";
import BarChartComponent from "../charts/BarChartComponent";
import PieChartComponent from "../charts/PieChartComponent";

function BQ7() {
  const [allGroups, setAllGroups] = useState([]);
  const [topGroups, setTopGroups] = useState([]);
  const [geoConcentrationData, setGeoConcentrationData] = useState([]);
  const [powerData, setPowerData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  async function loadData() {
    try {
      const resSize = await api.get("/group-size");
      const resGeo = await api.get("/geographic-concentration");
      const resPower = await api.get("/power-participation");

      const groups = resSize.data || [];
      setAllGroups(groups);
      setTopGroups(groups.slice(0, 15));

      setGeoConcentrationData(resGeo.data || []);
      setPowerData(resPower.data || []);
    } catch (error) {
      console.error("Error loading BQ7 data:", error);
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <Container className="mt-5 text-center">
        <h3>Loading Group Demographics Analysis...</h3>
      </Container>
    );
  }

  return (
    <Container className="mt-5 mb-5">
      {/* الهيدر الأكاديمي الشارح بدلاً من BQ7 والسؤال المباشر */}
      <div className="mb-4">
        <Badge bg="info" text="dark" className="px-3 py-2 fs-6 mb-2 rounded-pill">
          Structural & Demographic Profile
        </Badge>
        <h1 className="fw-bold text-dark">Group Demographics and Structural Characteristics</h1>
        <p className="lead text-muted">
          This section analyzes the structural foundation of self-determination movements, profiling ethnic group population distribution, geographic concentration levels, and access to national political power.
        </p>
      </div>

      <Row className="g-4">
        {/* 1. أعلى 15 حركة بالشارت */}
        <Col lg={12}>
          <Card className="shadow-sm p-4 border-0 rounded-4 bg-white">
            <h4 className="fw-bold mb-1">Top 15 Ethnic Groups by Population Size</h4>
            <p className="text-muted small mb-3">Displaying the 15 largest self-determination movements by relative demographic scale</p>
            <BarChartComponent
              data={topGroups}
              xKey="group_name"
              yKey="group_size"
            />
          </Card>
        </Col>

        {/* 2. التركز الجغرافي والمشاركة في السلطة */}
        <Col lg={6}>
          <Card className="shadow-sm p-4 h-100 border-0 rounded-4 bg-white">
            <h4 className="fw-bold mb-1">Geographic Concentration</h4>
            <p className="text-muted small mb-3">Distribution of movements across spatial dispersion categories</p>
            <PieChartComponent
              data={geoConcentrationData}
              nameKey="group_con"
              valueKey="total_groups"
            />
          </Card>
        </Col>

        <Col lg={6}>
          <Card className="shadow-sm p-4 h-100 border-0 rounded-4 bg-white">
            <h4 className="fw-bold mb-1">Political Power Participation</h4>
            <p className="text-muted small mb-3">Institutional power status and inclusion levels in central governance</p>
            <BarChartComponent
              data={powerData}
              xKey="pwrstat"
              yKey="total_groups"
            />
          </Card>
        </Col>

        {/* 3. جدول كامل بجميع الـ 502 حركة */}
        <Col lg={12}>
          <Card className="shadow-sm p-4 border-0 rounded-4 bg-white mt-2">
            <div className="d-flex justify-content-between align-items-center mb-3">
              <div>
                <h4 className="fw-bold mb-1">Comprehensive Ethnic Movement Directory</h4>
                <p className="text-muted small mb-0">Complete record of analyzed ethnic groups and their relative population figures</p>
              </div>
              <Badge bg="secondary" className="px-3 py-2 fs-6 rounded-pill">
                Total: {allGroups.length} Movements
              </Badge>
            </div>

            <div style={{ maxHeight: "400px", overflowY: "auto" }} className="border rounded-3">
              <Table striped hover responsive className="align-middle mb-0 text-center">
                <thead className="table-dark sticky-top">
                  <tr>
                    <th>#</th>
                    <th className="text-start">Group Name</th>
                    <th>Group Size</th>
                  </tr>
                </thead>
                <tbody>
                  {allGroups.map((group, index) => (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td className="text-start fw-semibold">{group.group_name}</td>
                      <td>{Number(group.group_size).toLocaleString()}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default BQ7;