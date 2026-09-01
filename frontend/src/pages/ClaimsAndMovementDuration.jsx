import { useEffect, useState } from "react";
import api from "../services/api";

import PieChartComponent from "../charts/PieChartComponent";
import BarChartComponent from "../charts/BarChartComponent";

import {
    Container,
    Row,
    Col,
    Card,
    Spinner,
    Alert
} from "react-bootstrap";

import DashboardFilters from "../components/DashboardFilters";


function ClaimsAndMovementDuration() {


    // =========================
    // Data States
    // =========================

    const [claimTypes, setClaimTypes] = useState([]);

    const [claimDuration, setClaimDuration] = useState([]);


    // =========================
    // Loading and Error States
    // =========================

    const [loading, setLoading] = useState(true);

    const [error, setError] = useState(null);


    // =========================
    // Dashboard Filters
    // =========================

    const [filters, setFilters] = useState({

        country: "",

        region: "",

        year: "",

        claim: ""

    });


    // =========================
    // Load Data When Filters Change
    // =========================

    useEffect(() => {

        loadData();

    }, [filters]);


    // =========================
    // Load Dashboard Data
    // =========================

    async function loadData() {

        try {

            setLoading(true);

            setError(null);


            // =========================
            // Build Filter Parameters
            // =========================

            const params = {};


            if (filters.country) {

                params.country = filters.country;

            }


            if (filters.region) {

                params.region = filters.region;

            }


            if (filters.year) {

                params.year = filters.year;

            }


            if (filters.claim) {

                params.claim = filters.claim;

            }


            // =========================
            // API Requests
            // =========================

            const [

                claims,

                duration

            ] = await Promise.all([

                api.get(

                    "/claim-types",

                    { params }

                ),

                api.get(

                    "/claim-duration",

                    { params }

                )

            ]);


            // =========================
            // Store Results
            // =========================

            setClaimTypes(

                claims.data || []

            );


            setClaimDuration(

                duration.data || []

            );


        }

        catch (error) {

            console.error(

                "Failed to load BQ2 data:",

                error

            );


            setError(

                "Failed to load dashboard data. Please try again."

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


            {/* ================= Header ================= */}

            <Card className="shadow-sm border-0 mb-4 p-4">

                <h2 className="fw-bold text-primary">

                    Movement Claims and Duration

                </h2>


                <p className="mt-3">

                    Self-determination movements do not all pursue the same political objective.
                    Some seek complete independence, while others demand greater autonomy within
                    the existing state or pursue other political arrangements.

                </p>


                <p>

                    This section explores the different types of claims made by
                    self-determination movements and examines the duration of
                    movements associated with different claim categories.

                </p>

            </Card>



            {/* ================= Dashboard Filters ================= */}

            <DashboardFilters

                filters={filters}

                setFilters={setFilters}

            />



            {/* ================= Error ================= */}

            {error && (

                <Alert variant="danger">

                    {error}

                </Alert>

            )}



            {/* ================= Loading ================= */}

            {loading ? (

                <div className="text-center my-5">

                    <Spinner animation="border" />

                    <p className="mt-3 text-muted">

                        Loading dashboard data...

                    </p>

                </div>


            ) : (

                <>


                    {/* ================= Claim Types ================= */}

                    <Row className="mb-4">

                        <Col lg={12}>

                            <Card className="shadow-sm border-0 p-4">

                                <h4 className="fw-bold">

                                    Distribution of Movement Claim Types

                                </h4>


                                {claimTypes.length > 0 ? (

                                    <PieChartComponent

                                        data={claimTypes}

                                        nameKey="domclaim"

                                        valueKey="total_movements"

                                    />

                                ) : (

                                    <Alert variant="info">

                                        No claim type data is available for the selected filters.

                                    </Alert>

                                )}


                                <hr />


                                <h5 className="fw-bold">

                                    Interpretation

                                </h5>


                                <p>

                                    This figure illustrates the distribution of
                                    self-determination movements according to their
                                    political claim categories.

                                </p>


                                <ul>

                                    <li>

                                        Each slice represents a political claim
                                        category recorded in the SDM dataset.

                                    </li>


                                    <li>

                                        The size of each slice represents the number
                                        of movements associated with that claim.

                                    </li>


                                    <li>

                                        Larger slices indicate claim categories that
                                        appear more frequently within the selected data.

                                    </li>

                                </ul>


                                <p>

                                    Because a movement's dominant claim may change
                                    over time, the same movement may appear in more
                                    than one claim category across different years.

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


                                {claimDuration.length > 0 ? (

                                    <BarChartComponent

                                        data={claimDuration}

                                        xKey="domclaim"

                                        yKey="avg_duration"

                                    />

                                ) : (

                                    <Alert variant="info">

                                        No duration data is available for the selected filters.

                                    </Alert>

                                )}


                                <hr />


                                <h5 className="fw-bold">

                                    Interpretation

                                </h5>


                                <p>

                                    This chart compares the average duration of
                                    movements across different political claim
                                    categories.

                                </p>


                                <ul>

                                    <li>

                                        <strong>X-axis:</strong> Political claim type.

                                    </li>


                                    <li>

                                        <strong>Y-axis:</strong> Average movement
                                        duration in years.

                                    </li>


                                    <li>

                                        Ongoing movements coded as 9999 are treated
                                        as active until 2020.

                                    </li>


                                    <li>

                                        Movements coded as 8888 are excluded when
                                        their duration cannot be calculated
                                        consistently.

                                    </li>

                                </ul>


                                <p>

                                    Longer bars indicate that movements associated
                                    with that claim category generally remained
                                    active for a longer period.

                                </p>


                            </Card>

                        </Col>

                    </Row>


                </>

            )}


        </Container>

    );

}


export default ClaimsAndMovementDuration;

