import { useEffect, useState } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Table,
  Badge,
  Alert,
  Spinner
} from "react-bootstrap";

import api from "../services/api";

import LineChartComponent from "../charts/LineChartComponent";
import PieChartComponent from "../charts/PieChartComponent";

function ChiSquareResults() {

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await api.get("/declarations-chi-square");
        setData(res.data);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  if (loading) {
    return (
      <Card className="shadow-sm p-4 text-center">
        <Spinner animation="border" />
      </Card>
    );
  }

  const significant = data?.pValue < 0.05;

  return (
    <Card className="shadow-sm p-4 border-0 rounded-4">

      <div className="d-flex justify-content-between align-items-center mb-3">

        <h4 className="fw-bold">
          Chi-Square Test of Independence
        </h4>

        <Badge
          bg={significant ? "success" : "secondary"}
          className="rounded-pill"
        >
          {significant
            ? "Statistically Significant"
            : "Not Significant"}
        </Badge>

      </div>

      <p className="text-muted">

        This statistical test evaluates whether there is a meaningful association between the dominant political claim pursued by a movement and its decision to issue a unilateral declaration of sovereignty.

      </p>

      <Table bordered hover responsive>

        <thead className="table-light">

          <tr>

            <th>Statistic</th>

            <th>Value</th>

          </tr>

        </thead>

        <tbody>

          <tr>

            <td>Chi-Square Statistic</td>

            <td>{Number(data.chiSquare).toFixed(4)}</td>

          </tr>

          <tr>

            <td>Degrees of Freedom</td>

            <td>{data.degreesOfFreedom}</td>

          </tr>

          <tr>

            <td>p-value</td>

            <td>

              {data.pValue < 0.001
                ? "< 0.001"
                : Number(data.pValue).toFixed(4)}

            </td>

          </tr>

        </tbody>

      </Table>

      <Alert
        variant={significant ? "success" : "warning"}
        className="mt-3"
      >

        <Alert.Heading>

          Interpretation

        </Alert.Heading>

        <p className="mb-0">

          {data.interpretation}

        </p>

      </Alert>

      <div className="mt-4">

        <h6 className="fw-bold">

          How to interpret this test

        </h6>

        <p className="text-muted">

          A statistically significant result (p-value less than 0.05) indicates that sovereignty declarations are not randomly distributed across claim types. Instead, certain categories of political claims are significantly more likely to issue unilateral sovereignty declarations than others.

        </p>

      </div>

    </Card>
  );
}

function SovereigntyDeclarations() {

  const [sovereignty, setSovereignty] = useState([]);
  const [claims, setClaims] = useState([]);

  useEffect(() => {

    async function loadData() {

      try {

        const s = await api.get("/sovereignty-declarations");
        const c = await api.get("/declaration-by-claim");

        setSovereignty(s.data);
        setClaims(c.data);

      } catch (err) {

        console.log(err);

      }

    }

    loadData();

  }, []);

  return (

    <Container className="mt-5 mb-5">

      <div className="mb-4">

        <Badge
          bg="primary"
          className="px-3 py-2 fs-6 mb-2 rounded-pill"
        >

          Sovereignty Declaration Analysis

        </Badge>

        <h1 className="fw-bold">

          Unilateral Sovereignty Declarations

        </h1>

        <p className="lead text-muted">

          This section explores unilateral sovereignty declarations made by self-determination movements contained within the SDM dataset. It examines how declarations evolved historically, which political claim types were associated with these declarations, and whether a statistically significant relationship exists between movement claims and sovereignty declarations.

        </p>

      </div>

      <Row className="g-4">

        <Col lg={6}>

          <Card className="shadow-sm p-4 border-0 rounded-4 h-100">

            <h4 className="fw-bold">

              Sovereignty Declarations Over Time

            </h4>

            <p className="text-muted">

              This line chart displays the annual number of unilateral sovereignty declarations recorded between 1945 and 2020. Each point represents the total declarations issued during a specific year.

            </p>

            <LineChartComponent

              data={sovereignty}

              xKey="year"

              yKey="declarations"

            />

            <hr />

            <h6 className="fw-bold">

              Interpretation

            </h6>

            <p className="text-muted">

              Peaks indicate years in which more movements declared sovereignty, while lower values indicate relatively fewer declarations. Researchers can use this visualization to identify historical periods characterized by increased separatist activity and relate these periods to broader political or international developments.

            </p>

          </Card>

        </Col>

        <Col lg={6}>

          <Card className="shadow-sm p-4 border-0 rounded-4 h-100">

            <h4 className="fw-bold">

              Sovereignty Declarations by Claim Type

            </h4>

            <p className="text-muted">

              This pie chart illustrates the proportion of sovereignty declarations according to the dominant political objective pursued by each movement, such as independence, autonomy, or other claim categories.

            </p>

            <PieChartComponent

              data={claims}

              nameKey="domclaim"

              valueKey="declarations"

            />

            <hr />

            <h6 className="fw-bold">

              Interpretation

            </h6>

            <p className="text-muted">

              Larger segments represent claim categories that account for a greater share of sovereignty declarations. The visualization enables researchers to identify which political objectives are most frequently associated with unilateral declarations and compare the relative prominence of each claim type.

            </p>

          </Card>

        </Col>

        <Col lg={12}>

          <ChiSquareResults />

        </Col>

      </Row>

    </Container>

  );

}

export default SovereigntyDeclarations;