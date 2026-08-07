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
import PieChartComponent from "../charts/PieChartComponent";


// =====================================================
// Chi-Square Results for BQ5
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
                    "Failed to load Chi-Square statistical analysis."
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

            <Card className="shadow-sm p-4 text-center mt-3 border-0 bg-white">

                <Spinner
                    animation="border"
                    role="status"
                    variant="primary"
                    className="mb-2 mx-auto"
                />

                <p className="text-muted mb-0">

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

            <div className="d-flex justify-content-between align-items-center mb-3 border-bottom pb-3">

                <div>

                    <h4 className="fw-bold">

                        Chi-Square Test of Independence

                    </h4>

                    <p className="text-muted mb-0">

                        Examining whether dominant claim type is statistically
                        associated with government concessions.

                    </p>

                </div>

                <Badge
                    bg={significant ? "success" : "secondary"}
                    className="px-3 py-2 rounded-pill fs-6"
                >

                    {significant
                        ? "Statistically Significant"
                        : "Not Significant"}

                </Badge>

            </div>

            <Table bordered hover responsive className="text-center">

                <thead className="table-light">

                    <tr>

                        <th>Statistic</th>

                        <th>Value</th>

                    </tr>

                </thead>

                <tbody>

                    <tr>

                        <td>Chi-Square (χ²)</td>

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

                <strong>Interpretation</strong>

                <br />

                {data.interpretation}

            </Alert>

        </Card>

    );

}



// =====================================================
// Main Component
// =====================================================

function GovernmentConcessions() {

    const [summaryData, setSummaryData] = useState([]);

    const [movementCount, setMovementCount] = useState(0);

    const [movementClaims, setMovementClaims] = useState([]);

    const [totals, setTotals] = useState({

        total: 0,

        cultural: 0,

        autonomy: 0,

        independence: 0

    });

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

            const movementClaimsRes =
                await api.get("/concession-movements-by-claim");

            const totalVal =
                Number(total.data[0]?.concessions || 0);

            const culturalVal =
                Number(cultural.data[0]?.cultural_concessions || 0);

            const autonomyVal =
                Number(autonomy.data[0]?.autonomy_concessions || 0);

            const independenceVal =
                Number(independence.data[0]?.independence_concessions || 0);

            setTotals({

                total: totalVal,

                cultural: culturalVal,

                autonomy: autonomyVal,

                independence: independenceVal

            });

            setMovementCount(

                Number(
                    movements.data[0]?.total_movements || 0
                )

            );

            setMovementClaims(

                movementClaimsRes.data

            );

            setSummaryData([

                {
                    type: "Cultural",
                    count: culturalVal
                },

                {
                    type: "Autonomy",
                    count: autonomyVal
                },

                {
                    type: "Independence",
                    count: independenceVal
                }

            ]);

        }

        catch (error) {

            console.error(error);

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

                    Loading Government Concessions Analysis...

                </h4>

            </Container>

        );

    }

    return (

        <Container className="mt-5 mb-5">

            {/* Header */}

            <div className="mb-4">

                <Badge
                    bg="success"
                    className="px-3 py-2 fs-6 rounded-pill mb-2"
                >

                    Government Responses & Concessions

                </Badge>

                <h1 className="fw-bold">

                    Government Concessions to Self-Determination Movements

                </h1>

                <p className="lead text-muted">

                    This section examines government concessions granted to self-determination movements and compares both the number of concession events and the number of movements receiving concessions across different claim types.

                </p>

            </div>

            {/* Summary Cards */}

            <Row className="g-3 mb-4">

                <Col md={6}>

                    <Card className="shadow-sm border-0 border-start border-success border-4 p-4 text-center">

                        <h6 className="text-uppercase text-muted">

                            Total Recorded Concession Events

                        </h6>

                        <h2 className="fw-bold text-success">

                            {totals.total.toLocaleString()}

                        </h2>

                    </Card>

                </Col>

                <Col md={6}>

                    <Card className="shadow-sm border-0 border-start border-warning border-4 p-4 text-center">

                        <h6 className="text-uppercase text-muted">

                            Unique Movements Receiving Concessions

                        </h6>

                        <h2 className="fw-bold text-warning">

                            {movementCount.toLocaleString()}

                        </h2>

                    </Card>

                </Col>


            </Row>
                        {/* =================================================
                Movements Receiving Concessions by Claim Type
            ================================================= */}

            <Row className="g-4 mb-4">

                <Col lg={12}>

                    <Card className="shadow-sm p-4 border-0 rounded-4 bg-white">

                        <h4 className="fw-bold">

                            Movements Receiving Government Concessions by Dominant Claim Type

                        </h4>

                        <p className="text-muted">

                            This chart presents the number of distinct self-determination
                            movements that received at least one form of governmental
                            concession, grouped according to their dominant political claim.

                        </p>

                        <BarChartComponent
                            data={movementClaims}
                            xKey="domclaim"
                            yKey="movements"
                        />

                        <hr />

                        <h6 className="fw-bold">

                            Interpretation

                        </h6>

                        <p className="text-muted mb-0">

                            Each movement is counted only once, regardless of how many
                            years concessions were granted. The visualization therefore
                            compares how widely government concessions were distributed
                            across different claim categories rather than how many
                            concession events occurred.

                        </p>

                    </Card>

                </Col>

            </Row>



            {/* =================================================
                Concession Events by Domain
            ================================================= */}

            <Row className="g-4 mb-4">

                {/* Bar Chart */}

                <Col lg={6}>

                    <Card className="shadow-sm p-4 h-100 border-0 rounded-4 bg-white">

                        <h4 className="fw-bold">

                            Government Concession Events by Domain

                        </h4>

                        <p className="text-muted">

                            This chart compares the frequency of governmental concession
                            events across the three principal domains recorded within
                            the SDM dataset.

                        </p>

                        <BarChartComponent
                            data={summaryData}
                            xKey="type"
                            yKey="count"
                        />

                        <hr />

                        <h6 className="fw-bold">

                            Interpretation

                        </h6>

                        <p className="text-muted mb-0">

                            Unlike the previous visualization, this chart represents
                            concession events rather than distinct movements. A single
                            movement may contribute multiple events across different
                            years whenever concessions were repeatedly granted.

                        </p>

                    </Card>

                </Col>



                {/* Pie Chart */}

                <Col lg={6}>

                    <Card className="shadow-sm p-4 h-100 border-0 rounded-4 bg-white">

                        <h4 className="fw-bold">

                            Share of Government Concession Events

                        </h4>

                        <p className="text-muted">

                            The pie chart illustrates the proportional distribution
                            of all recorded concession events among cultural,
                            autonomy, and independence-related concessions.

                        </p>

                        <PieChartComponent
                            data={summaryData}
                            nameKey="type"
                            valueKey="count"
                        />

                        <hr />

                        <h6 className="fw-bold">

                            Interpretation

                        </h6>

                        <p className="text-muted mb-0">

                            Larger sectors indicate concession domains that account
                            for a greater proportion of all recorded governmental
                            concessions throughout the observation period.

                        </p>

                    </Card>

                </Col>

            </Row>
                        {/* ============================================
                Statistical Validation
            ============================================ */}

            <Row className="mb-4">

                <Col>

                    <ChiSquareResultsBQ5 />

                </Col>

            </Row>



            {/* ============================================
                Analytical Note
            ============================================ */}

            <Card className="shadow-sm border-0 rounded-4 p-4 bg-light">

                <h5 className="fw-bold">

                    Analytical Note

                </h5>

                <p className="text-muted mb-2">

                    Government concessions represent one of the principal policy
                    instruments used by states when responding to self-determination
                    movements. These measures may include cultural recognition,
                    expanded political autonomy, or negotiations concerning
                    independence.

                </p>

                <p className="text-muted mb-0">

                    The dashboard distinguishes between the
                    <strong> number of concession events</strong> and the
                    <strong> number of movements receiving concessions</strong>.
                    This distinction prevents repeated yearly observations from
                    being confused with the total number of unique movements,
                    thereby providing a more accurate interpretation of state
                    responses across the SDM 2.0 dataset.

                </p>

            </Card>

        </Container>

    );

}

export default GovernmentConcessions;

