import { useEffect, useState } from "react";
import { Container, Row, Col, Card, Badge } from "react-bootstrap";
import api from "../services/api";
import PieChartComponent from "../charts/PieChartComponent";

const MAPPED_LABELS = {
  1: "Yes",
  0: "No",
  null: "Not Available",
};

function PatternsOfViolence() {

  const [violentData, setViolentData] = useState([]);
  const [escalationData, setEscalationData] = useState([]);
  const [loading, setLoading] = useState(true);

  const formatViolenceData = (rawArray) => {

    if (!Array.isArray(rawArray)) return [];

    return rawArray.map(item => {

      let label = "Not Available";

      if (item.violsd === 1 || item.violsd === "1") {

        label = "Yes";

      }

      else if (item.violsd === 0 || item.violsd === "0") {

        label = "No";

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

        setViolentData(
          formatViolenceData(violent.data)
        );

        setEscalationData(escalation.data);

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

        <h3>Loading Violence Analysis...</h3>

      </Container>

    );

  }

  return (

    <Container className="mt-5 mb-5">

      <div className="mb-4">

        <Badge
          bg="danger"
          className="px-3 py-2 fs-6 mb-2 rounded-pill"
        >

          Violence & Conflict Dynamics

        </Badge>

        <h1 className="fw-bold">

          Violence Patterns

        </h1>

        <p className="lead text-muted">

          This section explores the role of political violence in self-determination movements. It distinguishes between movements that remained peaceful, those that experienced violent conflict at any point, and those that escalated from peaceful political activity into armed confrontation.

        </p>

      </div>

      <Row className="g-4">

        {/* Chart 1 */}

        <Col lg={6}>

          <Card className="shadow-sm border-0 rounded-4 h-100 p-4">

            <h4 className="fw-bold">

              Movements Engaging in Violence

            </h4>

            <p className="text-muted">

              This chart compares movements according to whether they engaged in violent conflict at any stage of their existence.

            </p>

            <PieChartComponent

              data={violentData}

              nameKey="statusLabel"

              valueKey="total"

            />

            <hr />

            <h6 className="fw-bold">

              Interpretation

            </h6>

            <p className="text-muted">

              The chart illustrates the proportion of movements that remained entirely peaceful compared with those that resorted to violence. A larger "Yes" segment indicates that political violence was a common strategy among self-determination movements, whereas a larger "No" segment suggests that peaceful mobilization was more prevalent.

            </p>

          </Card>

        </Col>

        {/* Chart 2 */}

        <Col lg={6}>

          <Card className="shadow-sm border-0 rounded-4 h-100 p-4">

            <h4 className="fw-bold">

              Violence Escalation Pathways

            </h4>

            <p className="text-muted">

              This chart classifies movements into three categories: movements that remained peaceful, movements that became violent without escalation, and movements that gradually escalated from peaceful activity into violent conflict.

            </p>

            <PieChartComponent

              data={escalationData}

              nameKey="category"

              valueKey="total"

            />

            <hr />

            <h6 className="fw-bold">

              Interpretation

            </h6>

            <p className="text-muted">

              Comparing these categories provides insight into different pathways through which violence emerged. Some movements remained peaceful throughout their existence, some adopted violence from an early stage, while others escalated only after initially pursuing non-violent political strategies. This distinction helps explain the dynamics of conflict escalation within self-determination movements.

            </p>

          </Card>

        </Col>

      </Row>

    </Container>

  );

}

export default PatternsOfViolence;