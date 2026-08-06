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
// Chi-Square Results for BQ6
// =====================================================

function ChiSquareResultsBQ6() {

    const [data, setData] = useState(null);

    const [loading, setLoading] = useState(true);

    const [error, setError] = useState(null);

    useEffect(() => {

        async function fetchChiSquareData() {

            try {

                const response =
                    await api.get("/restrictions-chi-square");

                setData(response.data);

            }

            catch (err) {

                console.error(
                    "Error fetching Chi-Square data for BQ6:",
                    err
                );

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

            <Alert variant="danger" className="mt-3">

                {error}

            </Alert>

        );

    }

    const isSignificant =
        data?.pValue < 0.05;

    return (

        <Card className="shadow-sm p-4 border-0 bg-white rounded-4">

            <div className="d-flex justify-content-between align-items-center mb-3 border-bottom pb-3">

                <div>

                    <h4 className="fw-bold mb-1 text-dark">

                        Chi-Square Test of Independence

                    </h4>

                    <p className="text-muted small mb-0">

                        Examining whether the dominant claim pursued
                        by a self-determination movement is statistically
                        associated with the occurrence of governmental
                        restrictions.

                    </p>

                </div>

                <Badge
                    bg={
                        isSignificant
                            ? "success"
                            : "secondary"
                    }
                    className="px-3 py-2 fs-6 rounded-pill"
                >

                    {
                        isSignificant
                            ? "Statistically Significant"
                            : "Not Significant"
                    }

                </Badge>

            </div>

            <Table
                responsive
                hover
                bordered
                className="align-middle text-center mb-3"
            >

                <thead className="table-light">

                    <tr>

                        <th>
                            Statistical Metric
                        </th>

                        <th>
                            Value
                        </th>

                    </tr>

                </thead>

                <tbody>

                    <tr>

                        <td className="fw-semibold">

                            Chi-Square Statistic (χ²)

                        </td>

                        <td>

                            {
                                data?.chiSquare !== undefined
                                    ? Number(
                                        data.chiSquare
                                    ).toFixed(4)
                                    : "N/A"
                            }

                        </td>

                    </tr>

                    <tr>

                        <td className="fw-semibold">

                            Degrees of Freedom (df)

                        </td>

                        <td>

                            {
                                data?.degreesOfFreedom ??
                                "N/A"
                            }

                        </td>

                    </tr>

                    <tr>

                        <td className="fw-semibold">

                            p-value

                        </td>

                        <td>

                            <span
                                className={
                                    `fw-bold ${
                                        isSignificant
                                            ? "text-success"
                                            : "text-danger"
                                    }`
                                }
                            >

                                {
                                    data?.pValue !== undefined

                                        ? (
                                            data.pValue < 0.001
                                                ? "< 0.001"
                                                : Number(
                                                    data.pValue
                                                ).toFixed(4)
                                        )

                                        : "N/A"
                                }

                            </span>

                        </td>

                    </tr>

                </tbody>

            </Table>

            <Alert
                variant={
                    isSignificant
                        ? "success"
                        : "warning"
                }
                className="mb-3"
            >

                <strong>
                    Statistical Interpretation:
                </strong>

                <br />

                {data?.interpretation}

            </Alert>

            <div className="p-3 bg-light rounded-3">

                <h6 className="fw-bold">

                    How to interpret the test

                </h6>

                <p className="text-muted mb-0">

                    The Chi-Square Test of Independence evaluates
                    whether the distribution of governmental restrictions
                    differs across dominant claim categories. A p-value
                    below 0.05 suggests a statistically significant
                    association between the type of claim pursued by
                    movements and the occurrence of restrictions.
                    A p-value of 0.05 or higher does not provide sufficient
                    statistical evidence of such an association.

                </p>

            </div>

        </Card>

    );

}


// =====================================================
// Main BQ6 Component
// =====================================================

function BQ6() {

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


    // =================================================
    // Load Data
    // =================================================

    useEffect(() => {

        loadData();

    }, []);


    async function loadData() {

        try {

            const resTotal =
                await api.get("/restrictions");

            const resCultural =
                await api.get("/cultural-restrictions");

            const resAutonomy =
                await api.get("/autonomy-restrictions");

            const resIndependence =
                await api.get("/independence-restrictions");

            const resMovementCount =
                await api.get("/restriction-movements");

            const resMovementClaims =
                await api.get(
                    "/restriction-movements-by-claim"
                );


            // =========================================
            // Total Restriction Events
            // =========================================

            const totalVal = Number(

                resTotal.data?.[0]
                    ?.restrictions || 0

            );


            // =========================================
            // Cultural Restriction Events
            // =========================================

            const culturalVal = Number(

                resCultural.data?.[0]
                    ?.cultural_restrictions || 0

            );


            // =========================================
            // Autonomy Restriction Events
            // =========================================

            const autonomyVal = Number(

                resAutonomy.data?.[0]
                    ?.autonomy_restrictions || 0

            );


            // =========================================
            // Independence Restriction Events
            // =========================================

            const independenceVal = Number(

                resIndependence.data?.[0]
                    ?.independence_restrictions || 0

            );


            // =========================================
            // Number of Distinct Movements Affected
            // =========================================

            const affectedMovements = Number(

                resMovementCount.data?.[0]
                    ?.total_movements || 0

            );


            // =========================================
            // Store Totals
            // =========================================

            setTotals({

                total: totalVal,

                cultural: culturalVal,

                autonomy: autonomyVal,

                independence: independenceVal

            });


            // =========================================
            // Store Number of Affected Movements
            // =========================================

            setMovementCount(
                affectedMovements
            );


            // =========================================
            // Store Movements by Claim Type
            // =========================================

            setMovementClaims(

                Array.isArray(
                    resMovementClaims.data
                )

                    ? resMovementClaims.data

                    : []

            );


            // =========================================
            // Data for Bar + Pie Charts
            // =========================================

            const chartData = [

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

            ];


            setSummaryData(chartData);

        }

        catch (error) {

            console.error(
                "Error loading BQ6 data:",
                error
            );

        }

        finally {

            setLoading(false);

        }

    }


    // =================================================
    // Loading State
    // =================================================

    if (loading) {

        return (

            <Container className="mt-5 text-center">

                <Spinner animation="border" />

                <h4 className="mt-3">

                    Loading Governmental Restrictions Analysis...

                </h4>

            </Container>

        );

    }


    // =================================================
    // Main Page
    // =================================================

    return (

        <Container className="mt-5 mb-5">

            {/* =================================================
                PAGE HEADER
            ================================================= */}

            <div className="mb-4">

                <Badge
                    bg="warning"
                    text="dark"
                    className="px-3 py-2 fs-6 mb-2 rounded-pill"
                >

                    Government Responses & Restrictions

                </Badge>


                <h1 className="fw-bold text-dark">

                    Governmental Restrictions on
                    Self-Determination Movements

                </h1>


                <p className="lead text-muted">

                    This section examines how states restrict the
                    political, cultural, and self-government rights
                    associated with self-determination movements.
                    The SDM dataset records restrictions imposed by
                    governments that reduce ethnic group rights or
                    limit their ability to exercise self-rule.

                </p>


                <p className="text-muted">

                    The analysis distinguishes between different
                    restriction domains, including cultural rights,
                    autonomy and self-rule, and independence-related
                    rights. The page also reports both the frequency
                    of restriction events and the number of distinct
                    movements affected by these policies.

                </p>

            </div>


            {/* =================================================
                STAT CARDS
            ================================================= */}

            <Row className="g-3 mb-4">


                {/* Total Restrictions */}

                <Col md={4}>

                    <Card className="shadow-sm text-center p-4 border-0 border-start border-primary border-4 rounded-3 bg-white">

                        <h6 className="text-muted text-uppercase fw-semibold">

                            Total Restriction Events

                        </h6>

                        <h2 className="text-primary fw-bold">

                            {totals.total.toLocaleString()}

                        </h2>

                        <p className="text-muted small mb-0">

                            Total recorded instances of governmental
                            restrictions across the annual observations
                            in the dataset.

                        </p>

                    </Card>

                </Col>


                {/* Affected Movements */}

                <Col md={4}>

                    <Card className="shadow-sm text-center p-4 border-0 border-start border-warning border-4 rounded-3 bg-white">

                        <h6 className="text-muted text-uppercase fw-semibold">

                            Movements Affected

                        </h6>

                        <h2 className="text-warning fw-bold">

                            {movementCount.toLocaleString()}

                        </h2>

                        <p className="text-muted small mb-0">

                            Number of distinct self-determination
                            movements that experienced at least one
                            type of governmental restriction.

                        </p>

                    </Card>

                </Col>


                {/* Restriction Domains */}

                <Col md={4}>

                    <Card className="shadow-sm text-center p-4 border-0 border-start border-danger border-4 rounded-3 bg-white">

                        <h6 className="text-muted text-uppercase fw-semibold">

                            Restriction Domains

                        </h6>

                        <h2 className="text-danger fw-bold">

                            3

                        </h2>

                        <p className="text-muted small mb-0">

                            Cultural rights, autonomy/self-rule,
                            and independence-related restrictions.

                        </p>

                    </Card>

                </Col>

            </Row>


            {/* =================================================
                MOVEMENTS AFFECTED BY CLAIM TYPE
            ================================================= */}

            <Row className="g-4 mb-4">

                <Col lg={12}>

                    <Card className="shadow-sm p-4 border-0 rounded-4 bg-white">

                        <h4 className="fw-bold">

                            Movements Affected by Restrictions,
                            Grouped by Dominant Claim Type

                        </h4>

                        <p className="text-muted">

                            This chart counts the number of distinct
                            self-determination movements that experienced
                            at least one governmental restriction, grouped
                            according to the dominant political claim
                            associated with the movement.

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

                            Higher bars indicate claim categories that
                            include a larger number of distinct movements
                            affected by governmental restrictions.
                            Each movement is counted once in this chart,
                            even if it experienced restrictions in
                            multiple years or across multiple domains.

                            This makes the chart useful for comparing the
                            breadth of government restrictions across
                            different types of self-determination claims.

                        </p>

                    </Card>

                </Col>

            </Row>


            {/* =================================================
                EVENT BREAKDOWN
            ================================================= */}

            <Row className="g-4 mb-4">


                {/* Bar Chart */}

                <Col lg={6}>

                    <Card className="shadow-sm p-4 h-100 border-0 rounded-4 bg-white">

                        <h4 className="fw-bold">

                            Restriction Events by Domain

                        </h4>

                        <p className="text-muted">

                            This bar chart compares the frequency of
                            recorded restriction events across three
                            broad domains: cultural rights, autonomy
                            or self-rule, and independence-related
                            rights.

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

                            Taller bars indicate domains in which
                            governments imposed restrictions more
                            frequently across the annual observations
                            recorded in the dataset.

                            Unlike the previous movement-level chart,
                            this visualization counts restriction events.
                            Therefore, the same movement may contribute
                            multiple events if restrictions occurred
                            repeatedly over time.

                        </p>

                    </Card>

                </Col>


                {/* Pie Chart */}

                <Col lg={6}>

                    <Card className="shadow-sm p-4 h-100 border-0 rounded-4 bg-white">

                        <h4 className="fw-bold">

                            Share of Restriction Events by Domain

                        </h4>

                        <p className="text-muted">

                            This pie chart presents the relative share
                            of recorded restriction events associated
                            with each restriction domain.

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

                            Larger segments represent restriction
                            domains that account for a greater share
                            of all recorded restriction events.

                            The chart is useful for understanding the
                            overall composition of government responses
                            and identifying whether restrictions are
                            concentrated primarily on cultural rights,
                            autonomy, or independence-related issues.

                        </p>

                    </Card>

                </Col>

            </Row>


            {/* =================================================
                CHI-SQUARE
            ================================================= */}

            <Row>

                <Col lg={12}>

                    <ChiSquareResultsBQ6 />

                </Col>

            </Row>

        </Container>

    );

}

export default BQ6;