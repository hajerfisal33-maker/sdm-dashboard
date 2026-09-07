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

import DashboardFilters from "../components/DashboardFilters";


// =====================================================
// Chi-Square Results
// =====================================================

function ChiSquareResultsBQ5() {

    const [data, setData] = useState(null);

    const [loading, setLoading] =
        useState(true);

    const [error, setError] =
        useState(null);


    useEffect(() => {

        async function fetchChiSquareData() {

            try {

                const response =
                    await api.get(
                        "/concessions-chi-square"
                    );

                setData(
                    response.data
                );

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

            <Card className="shadow-sm p-4 text-center border-0">

                <Spinner
                    animation="border"
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
        Number(data?.pValue) < 0.05;


    return (

        <Card className="shadow-sm p-4 border-0 rounded-4">

            <div className="d-flex justify-content-between align-items-center mb-3 border-bottom pb-3">

                <div>

                    <h4 className="fw-bold">
                        Chi-Square Test of Independence
                    </h4>

                    <p className="text-muted mb-0">

                        Examining whether dominant claim type
                        is statistically associated with
                        government concessions.

                    </p>

                </div>


                <Badge
                    bg={
                        significant
                            ? "success"
                            : "secondary"
                    }
                    className="px-3 py-2 rounded-pill fs-6"
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
                className="text-center"
            >

                <thead className="table-light">

                    <tr>

                        <th>
                            Statistic
                        </th>

                        <th>
                            Value
                        </th>

                    </tr>

                </thead>


                <tbody>

                    <tr>

                        <td>
                            Chi-Square (χ²)
                        </td>

                        <td>
                            {Number(
                                data?.chiSquare || 0
                            ).toFixed(4)}
                        </td>

                    </tr>


                    <tr>

                        <td>
                            Degrees of Freedom
                        </td>

                        <td>
                            {data?.degreesOfFreedom}
                        </td>

                    </tr>


                    <tr>

                        <td>
                            p-value
                        </td>

                        <td>

                            {Number(data?.pValue) < 0.001
                                ? "< 0.001"
                                : Number(
                                    data?.pValue || 0
                                ).toFixed(4)
                            }

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
                className="mt-3"
            >

                <strong>
                    Interpretation
                </strong>

                <br />

                {data?.interpretation}

            </Alert>

        </Card>

    );

}


// =====================================================
// Main Component
// =====================================================

function GovernmentConcessions() {


    const [summaryData, setSummaryData] =
        useState([]);


    const [movementClaims, setMovementClaims] =
        useState([]);


    const [movementCount, setMovementCount] =
        useState(0);


    const [totals, setTotals] =
        useState({

            total: 0,

            cultural: 0,

            autonomy: 0,

            independence: 0

        });


    const [loading, setLoading] =
        useState(true);


    const [error, setError] =
        useState(null);


    // =================================================
    // Dashboard Filters
    // =================================================

    const [filters, setFilters] =
        useState({

            country: "",

            region: "",

            year: "",

            claim: ""

        });


    // =================================================
    // Load data whenever filters change
    // =================================================

    useEffect(() => {

        loadData();

    }, [filters]);


    // =================================================
    // Load BQ5 data
    // =================================================

    async function loadData() {

        setLoading(true);

        setError(null);


        try {


            const params = {

                country:
                    filters.country || "",

                region:
                    filters.region || "",

                year:
                    filters.year || "",

                claim:
                    filters.claim || ""

            };


            const [

                totalRes,

                culturalRes,

                autonomyRes,

                independenceRes,

                movementsRes,

                movementClaimsRes

            ] = await Promise.all([


                api.get(
                    "/concessions",
                    { params }
                ),


                api.get(
                    "/cultural-concessions",
                    { params }
                ),


                api.get(
                    "/autonomy-concessions",
                    { params }
                ),


                api.get(
                    "/independence-concessions",
                    { params }
                ),


                api.get(
                    "/concession-movements",
                    { params }
                ),


                api.get(
                    "/concession-movements-by-claim",
                    { params }
                )

            ]);


            // =================================================
            // Convert API results to arrays safely
            // =================================================

            const totalRows =
                Array.isArray(totalRes.data)
                    ? totalRes.data
                    : [];


            const culturalRows =
                Array.isArray(culturalRes.data)
                    ? culturalRes.data
                    : [];


            const autonomyRows =
                Array.isArray(autonomyRes.data)
                    ? autonomyRes.data
                    : [];


            const independenceRows =
                Array.isArray(independenceRes.data)
                    ? independenceRes.data
                    : [];


            const movementRows =
                Array.isArray(movementsRes.data)
                    ? movementsRes.data
                    : [];


            const movementClaimRows =
                Array.isArray(movementClaimsRes.data)
                    ? movementClaimsRes.data
                    : [];


            // =================================================
            // Sum all concession events
            // =================================================

            const totalVal =
                totalRows.reduce(

                    (sum, row) =>

                        sum +
                        Number(
                            row.concessions || 0
                        ),

                    0

                );


            const culturalVal =
                culturalRows.reduce(

                    (sum, row) =>

                        sum +
                        Number(
                            row.cultural_concessions || 0
                        ),

                    0

                );


            const autonomyVal =
                autonomyRows.reduce(

                    (sum, row) =>

                        sum +
                        Number(
                            row.autonomy_concessions || 0
                        ),

                    0

                );


            const independenceVal =
                independenceRows.reduce(

                    (sum, row) =>

                        sum +
                        Number(
                            row.independence_concessions || 0
                        ),

                    0

                );


            // =================================================
            // Unique movement count
            // =================================================

            const movementVal =
                Number(
                    movementRows[0]?.total_movements || 0
                );


            // =================================================
            // Update totals
            // =================================================

            setTotals({

                total: totalVal,

                cultural: culturalVal,

                autonomy: autonomyVal,

                independence:
                    independenceVal

            });


            setMovementCount(
                movementVal
            );


            // =================================================
            // Movement-by-claim chart
            // =================================================

            setMovementClaims(
                movementClaimRows
            );


            // =================================================
            // Summary chart
            // =================================================

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

                    count:
                        independenceVal

                }

            ]);

        }


        catch (error) {

            console.error(
                "Failed to load BQ5 data:",
                error
            );


            setError(
                "Failed to load government concession data. Please try again."
            );

        }


        finally {

            setLoading(false);

        }

    }


    // =====================================================
    // Page
    // =====================================================

    return (

        <Container className="mt-5 mb-5">


            {/* =================================================
                Header
            ================================================= */}

            <Card className="shadow-sm border-0 mb-4 p-4">

                <Badge
                    bg="success"
                    className="px-3 py-2 fs-6 rounded-pill mb-2"
                >

                    Government Responses & Concessions

                </Badge>


                <h1 className="fw-bold">

                    Government Concessions to
                    Self-Determination Movements

                </h1>


                <p className="lead text-muted">

                    This section examines government concessions
                    granted to self-determination movements and
                    compares concession events with the number
                    of distinct movements receiving concessions.

                </p>

            </Card>


            {/* =================================================
                Dashboard Filters
            ================================================= */}

            <DashboardFilters

                filters={filters}

                setFilters={setFilters}

            />


            {/* =================================================
                Error
            ================================================= */}

            {error && (

                <Alert variant="danger">

                    {error}

                </Alert>

            )}


            {/* =================================================
                Loading
            ================================================= */}

            {loading ? (

                <div className="text-center my-5">

                    <Spinner animation="border" />

                    <p className="mt-3 text-muted">

                        Loading government concession analysis...

                    </p>

                </div>

            ) : (

                <>


                    {/* =================================================
                        Summary Cards
                    ================================================= */}

                    <Row className="g-3 mb-4">


                        <Col md={6}>

                            <Card
                                className="
                                    shadow-sm
                                    border-0
                                    border-start
                                    border-success
                                    border-4
                                    p-4
                                    text-center
                                "
                            >

                                <h6 className="text-uppercase text-muted">

                                    Total Recorded Concession Events

                                </h6>


                                <h2 className="fw-bold text-success">

                                    {totals.total.toLocaleString()}

                                </h2>


                                <p className="text-muted mb-0">

                                    Total recorded concession events
                                    under the selected filters.

                                </p>

                            </Card>

                        </Col>


                        <Col md={6}>

                            <Card
                                className="
                                    shadow-sm
                                    border-0
                                    border-start
                                    border-warning
                                    border-4
                                    p-4
                                    text-center
                                "
                            >

                                <h6 className="text-uppercase text-muted">

                                    Unique Movements Receiving Concessions

                                </h6>


                                <h2 className="fw-bold text-warning">

                                    {movementCount.toLocaleString()}

                                </h2>


                                <p className="text-muted mb-0">

                                    Distinct movements that received
                                    at least one recorded concession.

                                </p>

                            </Card>

                        </Col>

                    </Row>


                    {/* =================================================
                        Unique Movements by Claim
                    ================================================= */}

                    <Row className="g-4 mb-4">

                        <Col lg={12}>

                            <Card className="shadow-sm p-4 border-0 rounded-4 bg-white">


                                <h4 className="fw-bold">

                                    Movements Receiving Government
                                    Concessions by Dominant Claim Type

                                </h4>


                                <p className="text-muted">

                                    This chart presents the number of
                                    distinct self-determination movements
                                    that received at least one governmental
                                    concession, grouped according to their
                                    dominant political claim.

                                </p>


                                {movementClaims.length > 0 ? (

                                    <BarChartComponent

                                        data={movementClaims}

                                        xKey="domclaim"

                                        yKey="movements"

                                    />

                                ) : (

                                    <Alert variant="info">

                                        No movement data is available
                                        for the selected filters.

                                    </Alert>

                                )}


                                <hr />


                                <h6 className="fw-bold">

                                    Interpretation

                                </h6>


                                <p className="text-muted mb-0">

                                    Each movement is counted only once
                                    within the selected filter conditions,
                                    regardless of how many concession events
                                    it experienced. This chart therefore
                                    reflects the breadth of government
                                    concessions across different dominant
                                    claim categories rather than the total
                                    number of concession events.

                                </p>


                            </Card>

                        </Col>

                    </Row>


                    {/* =================================================
                        Concession Events by Domain
                    ================================================= */}

                    <Row className="g-4 mb-4">


                        {/* ================================
                            Bar Chart
                        ================================= */}

                        <Col lg={6}>

                            <Card className="shadow-sm p-4 h-100 border-0 rounded-4 bg-white">


                                <h4 className="fw-bold">

                                    Government Concession Events by Domain

                                </h4>


                                <p className="text-muted">

                                    This chart compares the frequency
                                    of recorded government concession
                                    events across cultural, autonomy,
                                    and independence-related domains.

                                </p>


                                {summaryData.length > 0 ? (

                                    <BarChartComponent

                                        data={summaryData}

                                        xKey="type"

                                        yKey="count"

                                    />

                                ) : (

                                    <Alert variant="info">

                                        No concession data is available
                                        for the selected filters.

                                    </Alert>

                                )}


                                <hr />


                                <h6 className="fw-bold">

                                    Interpretation

                                </h6>


                                <p className="text-muted mb-0">

                                    The bars represent recorded concession
                                    events rather than unique movements.
                                    A movement may therefore contribute
                                    more than one event across different
                                    years. The selected filters determine
                                    which observations are included in
                                    the calculation.

                                </p>


                            </Card>

                        </Col>


                        {/* ================================
                            Pie Chart
                        ================================= */}

                        <Col lg={6}>

                            <Card className="shadow-sm p-4 h-100 border-0 rounded-4 bg-white">


                                <h4 className="fw-bold">

                                    Share of Government Concession Events

                                </h4>


                                <p className="text-muted">

                                    This chart illustrates the proportional
                                    distribution of recorded concession
                                    events across cultural, autonomy,
                                    and independence-related domains.

                                </p>


                                {summaryData.length > 0 ? (

                                    <PieChartComponent

                                        data={summaryData}

                                        nameKey="type"

                                        valueKey="count"

                                    />

                                ) : (

                                    <Alert variant="info">

                                        No concession data is available
                                        for the selected filters.

                                    </Alert>

                                )}


                                <hr />


                                <h6 className="fw-bold">

                                    Interpretation

                                </h6>


                                <p className="text-muted mb-0">

                                    Larger sectors represent concession
                                    domains that account for a greater
                                    share of the recorded events within
                                    the selected filter conditions.

                                </p>


                            </Card>

                        </Col>

                    </Row>


                    {/* =================================================
                        Statistical Validation
                        Intentionally NOT affected by filters
                    ================================================= */}

                    <Row className="mb-4">

                        <Col>

                            <ChiSquareResultsBQ5 />

                        </Col>

                    </Row>


                    {/* =================================================
                        Analytical Note
                    ================================================= */}

                    <Card className="shadow-sm border-0 rounded-4 p-4 bg-light">


                        <h5 className="fw-bold">

                            Analytical Note

                        </h5>


                        <p className="text-muted mb-2">

                            Government concessions represent important
                            policy responses to self-determination
                            movements. They may involve cultural rights,
                            increased internal autonomy, or measures
                            related to independence.

                        </p>


                        <p className="text-muted mb-0">

                            The dashboard distinguishes between the
                            <strong>
                                {" "}number of concession events
                            </strong>
                            {" "}and the
                            <strong>
                                {" "}number of distinct movements receiving
                                concessions
                            </strong>.
                            This distinction prevents repeated annual
                            observations from being interpreted as
                            additional unique movements.

                        </p>


                    </Card>


                </>

            )}

        </Container>

    );

}


export default GovernmentConcessions;

