import { useEffect, useState } from "react";
import api from "../services/api";

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


function GeographicalAndHistoricalDistribution() {


    // =========================
    // Dashboard Data
    // =========================

    const [countryData, setCountryData] = useState([]);

    const [regionData, setRegionData] = useState([]);

    const [yearData, setYearData] = useState([]);


    // =========================
    // Loading and Error
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
    // Reload When Filters Change
    // =========================

    useEffect(() => {

        loadData();

    }, [filters]);


    // =========================
    // Load Data
    // =========================

    async function loadData() {

        try {

            setLoading(true);

            setError(null);


            const params = {

                country: filters.country || "",

                region: filters.region || "",

                year: filters.year || "",

                claim: filters.claim || ""

            };


            const [

                country,

                region,

                year

            ] = await Promise.all([

                api.get(
                    "/country",
                    { params }
                ),

                api.get(
                    "/region",
                    { params }
                ),

                api.get(
                    "/year",
                    { params }
                )

            ]);


            setCountryData(
                country.data || []
            );


            setRegionData(
                region.data || []
            );


            setYearData(
                year.data || []
            );


        }

        catch (error) {

            console.error(
                "Failed to load BQ1 data:",
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

                    Geographical & Historical Distribution
                    of Self-Determination Movements

                </h2>


                <p className="mt-3">

                    This section provides an overview of the geographical and
                    historical distribution of self-determination movements
                    contained in the SDM dataset. The visualisations illustrate
                    where movements emerged, how they are distributed across
                    world regions, and how movement activity changed over time
                    between 1945 and 2020.

                </p>


                <p>

                    These charts provide a general understanding of global
                    patterns before moving to more detailed analyses in the
                    following sections.

                </p>

            </Card>



            {/* ================= Filters ================= */}

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


                    {/* ================= Country ================= */}

                    <Row className="mb-4">

                        <Col>

                            <Card className="shadow-sm border-0 p-4">

                                <h4 className="fw-bold">

                                    Distribution of Self-Determination
                                    Movements by Country

                                </h4>


                                {countryData.length > 0 ? (

                                    <BarChartComponent

                                        data={countryData}

                                        xKey="country_name"

                                        yKey="total_movements"

                                    />

                                ) : (

                                    <Alert variant="info">

                                        No country data is available for
                                        the selected filters.

                                    </Alert>

                                )}


                                <hr />


                                <h5 className="fw-bold">

                                    Interpretation

                                </h5>


                                <p>

                                    This chart presents the number of distinct
                                    self-determination movements identified
                                    within each country.

                                </p>


                                <ul>

                                    <li>

                                        <b>X-axis:</b> Host countries included
                                        in the selected data.

                                    </li>


                                    <li>

                                        <b>Y-axis:</b> Number of distinct
                                        self-determination movements.

                                    </li>


                                    <li>

                                        Each movement is counted once within
                                        the selected filter conditions.

                                    </li>

                                </ul>

                            </Card>

                        </Col>

                    </Row>



                    {/* ================= Region ================= */}

                    <Row className="mb-4">

                        <Col>

                            <Card className="shadow-sm border-0 p-4">

                                <h4 className="fw-bold">

                                    Distribution of Self-Determination
                                    Movements by World Region

                                </h4>


                                {regionData.length > 0 ? (

                                    <BarChartComponent

                                        data={regionData}

                                        xKey="region"

                                        yKey="total_movements"

                                    />

                                ) : (

                                    <Alert variant="info">

                                        No regional data is available for
                                        the selected filters.

                                    </Alert>

                                )}


                                <hr />


                                <h5 className="fw-bold">

                                    Interpretation

                                </h5>


                                <p>

                                    This chart compares the distribution of
                                    self-determination movements across the
                                    geographical regions represented in the
                                    selected data.

                                </p>

                            </Card>

                        </Col>

                    </Row>



                    {/* ================= Timeline ================= */}

                    <Row>

                        <Col>

                            <Card className="shadow-sm border-0 p-4">

                                <h4 className="fw-bold">

                                    Historical Distribution of Active Movements
                                    (1945–2020)

                                </h4>


                                {yearData.length > 0 ? (

                                    <BarChartComponent

                                        data={yearData}

                                        xKey="year"

                                        yKey="active_movements"

                                    />

                                ) : (

                                    <Alert variant="info">

                                        No historical data is available for
                                        the selected filters.

                                    </Alert>

                                )}


                                <hr />


                                <h5 className="fw-bold">

                                    Interpretation

                                </h5>


                                <p>

                                    This chart illustrates the historical
                                    distribution of movements across the
                                    observation period.

                                </p>


                                <ul>

                                    <li>

                                        <b>X-axis:</b> Calendar year.

                                    </li>


                                    <li>

                                        <b>Y-axis:</b> Number of movements
                                        included in each recorded year.

                                    </li>

                                </ul>

                            </Card>

                        </Col>

                    </Row>


                </>

            )}


        </Container>

    );

}


export default GeographicalAndHistoricalDistribution;