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

import DashboardFilters from "../components/DashboardFilters";



/* =====================================
   CHI-SQUARE RESULTS
   NOT AFFECTED BY DASHBOARD FILTERS
===================================== */

function ChiSquareResults() {

    const [data, setData] = useState(null);

    const [loading, setLoading] = useState(true);


    useEffect(() => {

        async function fetchData() {

            try {

                const res = await api.get(
                    "/declarations-chi-square"
                );

                setData(res.data);

            }

            catch (err) {

                console.log(err);

            }

            finally {

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

                    bg={
                        significant
                            ? "success"
                            : "secondary"
                    }

                    className="rounded-pill"
                >

                    {
                        significant
                            ? "Statistically Significant"
                            : "Not Significant"
                    }

                </Badge>

            </div>


            <p className="text-muted">

                This statistical test evaluates whether there is a
                meaningful association between the dominant political
                claim pursued by a movement and its decision to issue
                a unilateral declaration of sovereignty.

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

                        <td>
                            Chi-Square Statistic
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

                            {
                                data?.pValue < 0.001
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

                <Alert.Heading>

                    Interpretation

                </Alert.Heading>


                <p className="mb-0">

                    {data?.interpretation}

                </p>

            </Alert>


            <div className="mt-4">

                <h6 className="fw-bold">

                    How to interpret this test

                </h6>


                <p className="text-muted">

                    A statistically significant result indicates that
                    sovereignty declarations are not randomly distributed
                    across claim types.

                </p>

            </div>

        </Card>

    );

}



/* =====================================
   MAIN PAGE
===================================== */

function SovereigntyDeclarations() {


    // =========================
    // Data
    // =========================

    const [sovereignty, setSovereignty] =
        useState([]);

    const [claims, setClaims] =
        useState([]);


    // =========================
    // Loading
    // =========================

    const [loading, setLoading] =
        useState(true);

    const [error, setError] =
        useState(null);


    // =========================
    // Filters
    // =========================

    const [filters, setFilters] =
        useState({

            country: "",

            region: "",

            year: "",

            claim: ""

        });



    // =========================
    // Reload Data
    // =========================

    useEffect(() => {

        loadData();

    }, [filters]);



    async function loadData() {

        try {

            setLoading(true);

            setError(null);


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

                sovereigntyResponse,

                claimsResponse

            ] = await Promise.all([

                api.get(
                    "/sovereignty-declarations",
                    { params }
                ),

                api.get(
                    "/declaration-by-claim",
                    { params }
                )

            ]);


            setSovereignty(
                sovereigntyResponse.data || []
            );


            setClaims(
                claimsResponse.data || []
            );


        }

        catch (error) {

            console.log(error);


            setError(
                "Failed to load sovereignty declaration data."
            );

        }

        finally {

            setLoading(false);

        }

    }



    // =========================
    // Page
    // =========================

    return (

        <Container className="mt-5 mb-5">


            {/* =========================
                HEADER
            ========================= */}

            <Card className="shadow-sm border-0 mb-4 p-4">

                <Badge

                    bg="primary"

                    className="px-3 py-2 fs-6 mb-3 rounded-pill"

                >

                    Sovereignty Declaration Analysis

                </Badge>


                <h1 className="fw-bold">

                    Unilateral Sovereignty Declarations

                </h1>


                <p className="lead text-muted">

                    This section explores unilateral sovereignty
                    declarations made by self-determination movements
                    contained within the SDM dataset.

                </p>


                <p className="text-muted">

                    The visualisations examine how declarations changed
                    over time and how they were associated with different
                    political claim types.

                </p>

            </Card>



            {/* =========================
                DASHBOARD FILTERS
            ========================= */}

            <DashboardFilters

                filters={filters}

                setFilters={setFilters}

            />



            {/* =========================
                ERROR
            ========================= */}

            {

                error && (

                    <Alert variant="danger">

                        {error}

                    </Alert>

                )

            }



            {/* =========================
                LOADING
            ========================= */}

            {

                loading

                    ? (

                        <div className="text-center my-5">

                            <Spinner animation="border" />

                            <p className="mt-3 text-muted">

                                Loading dashboard data...

                            </p>

                        </div>

                    )

                    : (

                        <Row className="g-4">


                            {/* =========================
                                DECLARATIONS OVER TIME
                            ========================= */}

                            <Col lg={6}>

                                <Card className="shadow-sm p-4 border-0 rounded-4 h-100">

                                    <h4 className="fw-bold">

                                        Sovereignty Declarations
                                        Over Time

                                    </h4>


                                    <p className="text-muted">

                                        This line chart displays the
                                        recorded sovereignty declarations
                                        across the observation period.

                                    </p>


                                    {

                                        sovereignty.length > 0

                                            ? (

                                                <LineChartComponent

                                                    data={sovereignty}

                                                    xKey="year"

                                                    yKey="declarations"

                                                />

                                            )

                                            : (

                                                <Alert variant="info">

                                                    No sovereignty declaration
                                                    data is available for the
                                                    selected filters.

                                                </Alert>

                                            )

                                    }


                                    <hr />


                                    <h6 className="fw-bold">

                                        Interpretation

                                    </h6>


                                    <p className="text-muted">

                                        Peaks indicate years in which
                                        more movements issued sovereignty
                                        declarations.

                                    </p>

                                </Card>

                            </Col>



                            {/* =========================
                                DECLARATIONS BY CLAIM
                            ========================= */}

                            <Col lg={6}>

                                <Card className="shadow-sm p-4 border-0 rounded-4 h-100">

                                    <h4 className="fw-bold">

                                        Sovereignty Declarations
                                        by Claim Type

                                    </h4>


                                    <p className="text-muted">

                                        This chart compares sovereignty
                                        declarations across different
                                        political claim categories.

                                    </p>


                                    {

                                        claims.length > 0

                                            ? (

                                                <PieChartComponent

                                                    data={claims}

                                                    nameKey="domclaim"

                                                    valueKey="declarations"

                                                />

                                            )

                                            : (

                                                <Alert variant="info">

                                                    No declaration data is
                                                    available for the selected
                                                    filters.

                                                </Alert>

                                            )

                                    }


                                    <hr />


                                    <h6 className="fw-bold">

                                        Interpretation

                                    </h6>


                                    <p className="text-muted">

                                        Larger segments represent claim
                                        categories associated with a
                                        greater number of sovereignty
                                        declarations.

                                    </p>

                                </Card>

                            </Col>



                            {/* =========================
                                CHI-SQUARE
                                NOT FILTERED
                            ========================= */}

                            <Col lg={12}>

                                <div className="mt-2">

                                    <h5 className="fw-bold mb-3">

                                        Statistical Association Analysis

                                    </h5>


                                    <p className="text-muted">

                                        The following Chi-Square result
                                        is based on the overall dataset
                                        and is not affected by the
                                        dashboard filters above.

                                    </p>


                                    <ChiSquareResults />

                                </div>

                            </Col>


                        </Row>

                    )

            }


        </Container>

    );

}


export default SovereigntyDeclarations;