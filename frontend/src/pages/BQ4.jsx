import { useEffect, useState } from "react";
import { Container, Row, Col, Card, Badge } from "react-bootstrap";
import api from "../services/api";
import PieChartComponent from "../charts/PieChartComponent";

const MAPPED_LABELS = {
  1: "Yes",
  0: "No",
  null: "Not Available"
};

function BQ4() {
  const [violentData, setViolentData] = useState([]);
  const [escalationData, setEscalationData] = useState([]);
  const [onsetData, setOnsetData] = useState([]);
  const [loading, setLoading] = useState(true);

  const formatChartData = (rawArray, keyName) => {
    if (!Array.isArray(rawArray)) return [];

    return rawArray.map(item => {
      const value = item[keyName];
      let label = MAPPED_LABELS.null;

      if (value === 1 || value === "1") {
        label = MAPPED_LABELS[1];
      }
      else if (value === 0 || value === "0") {
        label = MAPPED_LABELS[0];
      }

      return {
        ...item,
        statusLabel: label
      };
    });
  };

  useEffect(() => {
    async function loadData() {
      try {
        const violent = await api.get("/violent-movements");
        const escalation = await api.get("/violent-escalation");
        const onset = await api.get("/violenceOnset");

        setViolentData(
          formatChartData(
            violent.data,
            "violsd"
          )
        );
        setEscalationData(
          formatChartData(
            escalation.data,
            "viol_escal"
          )
        );
        setOnsetData(
          formatChartData(
            onset.data,
            "violsd_onset"
          )
        );
      }
      catch (error) {
        console.log(error);
      }
      finally {
        setLoading(false);
      }
    }

    loadData();
  }, []);

  if (loading) {
    return (
      <Container className="mt-5 text-center">
        <h3>Loading Violence & Escalation Analysis...</h3>
      </Container>
    );
  }

  return (
    <Container className="mt-5 mb-5">
      {/* الهيدر الجديد المباشر الشارح للرسومات البيانية */}
      <div className="mb-4">
        <Badge bg="danger" className="px-3 py-2 fs-6 mb-2 rounded-pill">
          Conflict Intensity & Dynamics
        </Badge>
        <h1 className="fw-bold text-dark">
          Violent Escalation and Conflict Onset Analysis
        </h1>
        <p className="lead text-muted">
          This section evaluates the conflict characteristics of self-determination movements, analyzing overall violence involvement, escalation patterns from peaceful to armed strategies, and immediate violent onset.
        </p>
      </div>

      <Row className="g-4">
        <Col lg={4}>
          <Card className="shadow-sm p-4 h-100 border-0 rounded-4 bg-white">
            <h4 className="fw-bold mb-1">
              Overall Violent Movements
            </h4>
            <p className="text-muted small mb-3">Proportion of movements engaging in armed conflict</p>
            <PieChartComponent
              data={violentData}
              nameKey="statusLabel"
              valueKey="total"
            />
          </Card>
        </Col>

        <Col lg={4}>
          <Card className="shadow-sm p-4 h-100 border-0 rounded-4 bg-white">
            <h4 className="fw-bold mb-1">
              Violent Escalation Rate
            </h4>
            <p className="text-muted small mb-3">Movements escalating from peaceful methods to violence</p>
            <PieChartComponent
              data={escalationData}
              nameKey="statusLabel"
              valueKey="total"
            />
          </Card>
        </Col>

        <Col lg={4}>
          <Card className="shadow-sm p-4 h-100 border-0 rounded-4 bg-white">
            <h4 className="fw-bold mb-1">
              Immediate Violence Onset
            </h4>
            <p className="text-muted small mb-3">Movements that emerged directly as violent conflicts at origin</p>
            <PieChartComponent
              data={onsetData}
              nameKey="statusLabel"
              valueKey="total"
            />
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default BQ4;