import { useEffect, useState } from "react";
import api from "../services/api";
import PieChartComponent from "../charts/PieChartComponent";
import BarChartComponent from "../charts/BarChartComponent";
import { Container, Row, Col, Card, Spinner } from "react-bootstrap";
import DashboardFilters from "../components/DashboardFilters";

function ClaimsAndMovementDuration() {

    const [claimTypes, setClaimTypes] = useState([]);
    const [claimDuration, setClaimDuration] = useState([]);
    const [loading, setLoading] = useState(true);

const [filters, setFilters] = useState({
  country: "",
  region: "",
  year: "",
  claim: ""
});

    useEffect(() => {
        loadData();
    }, [filters]);

    async function loadData() {

        try {

            const claims = await api.get("/claim-types");
            const duration = await api.get("/claim-duration");

            setClaimTypes(claims.data || []);
            setClaimDuration(duration.data || []);

        }

        catch (error) {

            console.log(error);

        }

        finally {

            setLoading(false);

        }

    }

    if (loading) {

        return
        <DashboardFilters
    filters={filters}
    setFilters={setFilters}
/>
        (

            <Container className="text-center mt-5">

                <Spinner animation="border" />

            </Container>

        );

    }

    return (

        <Container className="mt-5 mb-5">

            {/* ================= Header ================= */}

            <Card className="shadow-sm border-0 mb-4 p-4">

                <h2 className="fw-bold text-primary">

                    Movement Claims and Duration

                </h2>

                <p className="mt-3">

                    Self-determination movements do not all pursue the same political objective.
                    Some seek complete independence, others demand greater autonomy within
                    the existing state, while some pursue alternative constitutional or political
                    arrangements. This section explores the different categories of claims made by
                    movements and examines how long these movements remain active.

                </p>

                <p>

                    Understanding both the objectives and duration of movements provides
                    valuable insight into the overall dynamics of self-determination conflicts and
                    political mobilization.

                </p>

            </Card>

            {/* ================= Claim Types ================= */}

            <Row className="mb-4">

                <Col lg={12}>

                    <Card className="shadow-sm border-0 p-4">

                        <h4 className="fw-bold">

                            Distribution of Movement Claim Types

                        </h4>

                        <PieChartComponent
                            data={claimTypes}
                            nameKey="domclaim"
                            valueKey="total_movements"
                        />

                        <hr />

                        <h5 className="fw-bold">

                            Interpretation

                        </h5>

                        <p>

                            This figure illustrates the proportion of self-determination movements
                            according to their primary political objective.

                        </p>

                        <ul>

                            <li>

                                Each slice represents one category of political claim
                                (<strong>domclaim</strong>) recorded in the SDM dataset.

                            </li>

                            <li>

                                The size of each slice corresponds to the number of
                                distinct movements making that claim.

                            </li>

                            <li>

                                Larger slices indicate claim types that are more common
                                among self-determination movements worldwide.

                            </li>

                        </ul>

                        <p>

                            In the SDM dataset, <strong>domclaim</strong> represents the
                            principal objective pursued by each movement, such as demands
                            for independence, territorial autonomy, or other forms of
                            political self-government.

                        </p>

                    </Card>

                </Col>

            </Row>

            {/* ================= Duration ================= */}

            <Row>

                <Col lg={12}>

                    <Card className="shadow-sm border-0 p-4">

                        <h4 className="fw-bold">

                            Average Duration of Movement Activity

                        </h4>

                        <BarChartComponent
                            data={claimDuration}
                            xKey="domclaim"
                            yKey="avg_duration"
                        />

                        <hr />

                        <h5 className="fw-bold">

                            Interpretation

                        </h5>

                        <p>

                            This chart compares the average duration of movements across
                            the different claim categories.

                        </p>

                        <ul>

                            <li>

                                <strong>X-axis:</strong> Type of political claim pursued by the movement.

                            </li>

                            <li>

                                <strong>Y-axis:</strong> Average duration (in years) during which
                                movements remained active.

                            </li>

                            <li>

                                Duration is calculated using the recorded movement start
                                and end dates contained in the SDM dataset.

                            </li>

                            <li>

                                Ongoing movements (coded as 9999) are treated as active
                                until the end of the observation period (2020), while
                                movements coded with 8888 are excluded because their
                                duration cannot be calculated consistently.

                            </li>

                        </ul>

                        <p>

                            Longer bars indicate that movements pursuing that particular
                            claim generally remain active for longer periods, whereas
                            shorter bars suggest comparatively shorter movement lifespans.

                        </p>

                    </Card>

                </Col>

            </Row>

        </Container>

    );

}

export default ClaimsAndMovementDuration;