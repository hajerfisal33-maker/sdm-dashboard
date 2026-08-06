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

import BarChartComponent from "../charts/BarChartComponent";

// =====================================================
// Chi Square Component
// =====================================================

function ChiSquareResultsBQ5() {

    const [data, setData] = useState(null);

    const [loading, setLoading] = useState(true);

    const [error, setError] = useState(null);

    useEffect(() => {

        async function fetchChiSquareData() {

            try {

                const response =
                    await api.get("/concessions-chi-square");

                setData(response.data);

            }

            catch (err) {

                console.error(err);

                setError(
                    "Failed to load Chi-Square analysis."
                );

            }

            finally {

                setLoading(false);

            }

        }

        fetchChiSquareData();

    }, []);

    if (loading) {

        return (

            <Card className="shadow-sm p-4 text-center mt-3">

                <Spinner
                    animation="border"
                    variant="primary"
                    className="mx-auto mb-3"
                />

                <p className="text-muted">

                    Calculating statistical association...

                </p>

            </Card>

        );

    }

    if (error) {

        return (

            <Alert variant="danger">

                {error}

            </Alert>

        );

    }

    const significant =
        data?.pValue < 0.05;

    return (

        <Card className="shadow-sm p-4 border-0 rounded-4">

            <div className="d-flex justify-content-between align-items-center mb-3">

                <div>

                    <h4 className="fw-bold">

                        Chi-Square Test of Independence

                    </h4>

                    <p className="text-muted small mb-0">

                        Examining whether the dominant claim
                        pursued by a movement is statistically
                        associated with receiving governmental
                        concessions.

                    </p>

                </div>

                <Badge
                    bg={significant ? "success" : "secondary"}
                    className="fs-6 px-3 py-2 rounded-pill"
                >

                    {significant
                        ? "Statistically Significant"
                        : "Not Significant"}

                </Badge>

            </div>

            <Table
                bordered
                hover
                responsive
                className="text-center align-middle"
            >

                <thead className="table-light">

                    <tr>

                        <th>Statistic</th>

                        <th>Value</th>

                    </tr>

                </thead>

                <tbody>

                    <tr>

                        <td>Chi-Square (χ²)</td>

                        <td>

                            {Number(data?.chiSquare).toFixed(4)}

                        </td>

                    </tr>

                    <tr>

                        <td>Degrees of Freedom</td>

                        <td>{data?.degreesOfFreedom}</td>

                    </tr>

                    <tr>

                        <td>p-value</td>

                        <td>

                            {data?.pValue < 0.001
                                ? "< 0.001"
                                : Number(data?.pValue).toFixed(4)}

                        </td>

                    </tr>

                </tbody>

            </Table>

            <Alert
                variant={
                    significant
                        ? "success"
                        : "warning"
                }
            >

                <strong>Interpretation:</strong>

                <br />

                {data?.interpretation}

            </Alert>

        </Card>

    );

}

// =====================================================
// Main Component
// =====================================================

function BQ5() {

    const [totalConcessions, setTotalConcessions] = useState([]);

    const [culturalData, setCulturalData] = useState([]);

    const [autonomyData, setAutonomyData] = useState([]);

    const [independenceData, setIndependenceData] = useState([]);

    const [movementCards, setMovementCards] = useState([]);

    const [movementClaims, setMovementClaims] = useState([]);

    const [loading, setLoading] = useState(true);

    useEffect(() => {

        loadData();

    }, []);

    async function loadData() {

        try {

            const total =
                await api.get("/concessions");

            const cultural =
                await api.get("/cultural-concessions");

            const autonomy =
                await api.get("/autonomy-concessions");

            const independence =
                await api.get("/independence-concessions");

            const movements =
                await api.get("/concession-movements");

            const movementClaimsReq =
                await api.get("/concession-movements-by-claim");

            setTotalConcessions(total.data);

            setCulturalData(cultural.data);

            setAutonomyData(autonomy.data);

            setIndependenceData(independence.data);

            setMovementCards(movements.data);

            setMovementClaims(movementClaimsReq.data);

        }

        catch (error) {

            console.log(error);

        }

        finally {

            setLoading(false);

        }

    }

    if (loading) {

        return (

            <Container className="mt-5 text-center">

                <Spinner animation="border" />

                <h4 className="mt-3">

                    Loading Government Concessions...

                </h4>

            </Container>

        );

    }

    return (

        <Container className="mt-5 mb-5">

            <div className="mb-4">

                <Badge
                    bg="success"
                    className="px-3 py-2 fs-6 rounded-pill mb-2"
                >

                    Government Responses

                </Badge>

                <h1 className="fw-bold">

                    Governmental Concessions

                </h1>

                <p className="lead text-muted">

                    Governments frequently respond to
                    self-determination movements by offering
                    political concessions instead of relying
                    solely on coercive measures. These
                    concessions may involve cultural
                    recognition, increased political
                    autonomy, or even negotiations related
                    to independence. The following visual
                    analyses summarize how frequently
                    different forms of concessions were
                    granted and identify the movements that
                    benefited from these governmental
                    responses.

                </p>

            </div>

            <Row className="g-4">

                <Col lg={6}>

                    <Card className="shadow-sm border-0 rounded-4 p-4 text-center">

                        <h3 className="fw-bold text-success">

                            {
                                movementCards[0]
                                    ?.total_movements
                            }

                        </h3>

                        <h5>

                            Movements Receiving
                            Government Concessions

                        </h5>

                        <p className="text-muted">

                            This indicator reports the
                            number of distinct
                            self-determination movements
                            that received at least one
                            governmental concession,
                            regardless of concession type.

                        </p>

                    </Card>

                </Col>

                <Col lg={6}>

                    <Card className="shadow-sm border-0 rounded-4 p-4">

                        <h5 className="fw-bold mb-3">

                            Movements Receiving
                            Concessions by Claim Type

                        </h5>

                        <BarChartComponent
                            data={movementClaims}
                            xKey="domclaim"
                            yKey="movements"
                        />

                        <hr />

                        <p className="text-muted">

                            This chart shows how many
                            unique movements received
                            concessions according to
                            their primary political
                            objective (Autonomy,
                            Independence, Integration,
                            etc.). Unlike the following
                            charts, each movement is
                            counted only once regardless
                            of how many concessions it
                            received.

                        </p>

                    </Card>

                </Col>
                                {/* =========================
                    Total Concessions
                ========================== */}

                <Col lg={6}>

                    <Card className="shadow-sm border-0 rounded-4 p-4">

                        <h4 className="fw-bold">

                            Total Government Concessions

                        </h4>

                        <p className="text-muted">

                            This figure summarizes the total number of governmental concessions granted to self-determination movements. Every concession event recorded in the dataset is included, meaning that a movement may contribute multiple concession events across different years.

                        </p>

                        <BarChartComponent
                            data={totalConcessions}
                            xKey="domclaim"
                            yKey="concessions"
                        />

                        <hr />

                        <h6 className="fw-bold">

                            Interpretation

                        </h6>

                        <p className="text-muted">

                            Higher values indicate that governments were more willing to accommodate movements with that particular claim type through political or institutional concessions. Because this chart counts concession events rather than movements, repeated concessions toward the same movement are intentionally included.

                        </p>

                    </Card>

                </Col>

                {/* =========================
                    Cultural
                ========================== */}

                <Col lg={6}>

                    <Card className="shadow-sm border-0 rounded-4 p-4">

                        <h4 className="fw-bold">

                            Cultural Concessions

                        </h4>

                        <p className="text-muted">

                            Cultural concessions include policies such as language recognition, educational rights, cultural protection, or symbolic recognition granted to self-determination movements.

                        </p>

                        <BarChartComponent
                            data={culturalData}
                            xKey="domclaim"
                            yKey="cultural_concessions"
                        />

                        <hr />

                        <h6 className="fw-bold">

                            Interpretation

                        </h6>

                        <p className="text-muted">

                            This visualization highlights whether governments preferred addressing cultural grievances instead of providing broader political reforms. Larger bars indicate claim categories that received more cultural accommodations over time.

                        </p>

                    </Card>

                </Col>

                {/* =========================
                    Autonomy
                ========================== */}

                <Col lg={6}>

                    <Card className="shadow-sm border-0 rounded-4 p-4">

                        <h4 className="fw-bold">

                            Autonomy Concessions

                        </h4>

                        <p className="text-muted">

                            These concessions represent governmental actions that expanded regional self-government, administrative decentralization, or political autonomy without granting full independence.

                        </p>

                        <BarChartComponent
                            data={autonomyData}
                            xKey="domclaim"
                            yKey="autonomy_concessions"
                        />

                        <hr />

                        <h6 className="fw-bold">

                            Interpretation

                        </h6>

                        <p className="text-muted">

                            High values suggest that governments frequently attempted to resolve conflicts through decentralization or self-governance arrangements rather than complete constitutional separation.

                        </p>

                    </Card>

                </Col>

                {/* =========================
                    Independence
                ========================== */}

                <Col lg={6}>

                    <Card className="shadow-sm border-0 rounded-4 p-4">

                        <h4 className="fw-bold">

                            Independence-related Concessions

                        </h4>

                        <p className="text-muted">

                            Independence concessions represent the most substantial governmental responses, including agreements allowing referendums, negotiations toward sovereignty, or recognition of independence-related political processes.

                        </p>

                        <BarChartComponent
                            data={independenceData}
                            xKey="domclaim"
                            yKey="independence_concessions"
                        />

                        <hr />

                        <h6 className="fw-bold">

                            Interpretation

                        </h6>

                        <p className="text-muted">

                            Because independence concessions are generally rare, even relatively small values may represent historically significant political events. Comparing this chart with the autonomy chart illustrates whether governments preferred partial accommodation or complete political separation.

                        </p>

                    </Card>

                </Col>

                {/* =========================
                    Chi Square
                ========================== */}

                <Col lg={12} className="mt-4">

                    <ChiSquareResultsBQ5 />

                </Col>

            </Row>

        </Container>

    );

}

export default BQ5;

