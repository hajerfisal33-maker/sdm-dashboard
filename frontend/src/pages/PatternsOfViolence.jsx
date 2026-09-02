import { useEffect, useState } from "react";

import api from "../services/api";

import BarChartComponent from "../charts/BarChartComponent";
import PieChartComponent from "../charts/PieChartComponent";

import {
    Container,
    Row,
    Col,
    Card,
    Spinner,
    Alert
} from "react-bootstrap";

import DashboardFilters from "../components/DashboardFilters";


function ViolencePatterns() {


    // =========================
    // Dashboard Data
    // =========================

    const [violentData, setViolentData] = useState([]);
    const [escalationData, setEscalationData] = useState([]);
    const [onsetData, setOnsetData] = useState([]);


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


            /*
            Year is intentionally excluded here because
            violence onset must always be based on the
            first recorded observation of each movement.
            */

            const onsetParams = {

                country: filters.country || "",
                region: filters.region || "",
                claim: filters.claim || ""

            };


            const [

                violent,
                escalation,
                onset

            ] = await Promise.all([

                api.get(
                    "/violent-movements",
                    { params }
                ),

                api.get(
                    "/violent-escalation",
                    { params }
                ),

                api.get(
                    "/violence-onset",
                    { params: onsetParams }
                )

            ]);


            // =========================
            // Format Violence Data
            // =========================

            const formattedViolence = (violent.data || []).map(item => ({

                ...item,

                violence_status:

                    Number(item.violsd) === 1
                        ? "Experienced Violence"
                        : "No Recorded Violence"

            }));


            // =========================
            // Format Violence Onset
            // =========================

            const formattedOnset = (onset.data || []).map(item => ({

                ...item,

                onset_status:

                    Number(item.started_with_violence) === 1
                        ? "Started With Violence"
                        : "Did Not Start With Violence"

            }));


            // =========================
            // Format Escalation Data
            // =========================

            const formattedEscalation =
                (escalation.data || []).map(item => ({

                    ...item,

                    escalation_status:

                        item.viol_escal === null
                            ? "No Escalation Information"
                            : String(item.viol_escal)

                }));


            setViolentData(formattedViolence);

            setEscalationData(formattedEscalation);

            setOnsetData(formattedOnset);


        }

        catch (error) {

            console.error(
                "Failed to load violence data:",
                error
            );


            setError(
                "Failed to load violence data. Please try again."
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

                    Violence Patterns

                </h2>


                <p className="mt-3">

                    This section explores patterns of separatist violence
                    among self-determination movements in the SDM dataset.
                    It examines whether movements experienced violence,
                    patterns of violence escalation, and whether movements
                    started directly with violence.

                </p>


                <p>

                    The dashboard filters allow the results to be explored
                    by country, region, year, and dominant claim type.

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

                        Loading violence data...

                    </p>

                </div>

            ) : (

                <>


                    {/* ================= Violence Experienced ================= */}

                    <Row className="mb-4">

                        <Col>

                            <Card className="shadow-sm border-0 p-4">

                                <h4 className="fw-bold">

                                    Movements Experiencing Separatist Violence

                                </h4>


                                {violentData.length > 0 ? (

                                    <PieChartComponent

                                        data={violentData}

                                        nameKey="violence_status"

                                        valueKey="total"

                                    />

                                ) : (

                                    <Alert variant="info">

                                        No violence data is available
                                        for the selected filters.

                                    </Alert>

                                )}


                                <hr />


                                <h5 className="fw-bold">

                                    Interpretation

                                </h5>


                                <p>

                                    This chart shows whether movements
                                    experienced separatist violence during
                                    the selected observation period.

                                </p>


                                <ul>

                                    <li>

                                        <strong>Experienced Violence:</strong>
                                        The movement had at least one
                                        observation associated with
                                        separatist violence.

                                    </li>


                                    <li>

                                        <strong>No Recorded Violence:</strong>
                                        No separatist violence was recorded
                                        in the observations included in
                                        the selected data.

                                    </li>

                                </ul>


                            </Card>

                        </Col>

                    </Row>


                    {/* ================= Violence Escalation ================= */}

                    <Row className="mb-4">

                        <Col>

                            <Card className="shadow-sm border-0 p-4">

                                <h4 className="fw-bold">

                                    Violence Escalation

                                </h4>


                                {escalationData.length > 0 ? (

                                    <BarChartComponent

                                        data={escalationData}

                                        xKey="escalation_status"

                                        yKey="total"

                                    />

                                ) : (

                                    <Alert variant="info">

                                        No violence escalation data is
                                        available for the selected filters.

                                    </Alert>

                                )}


                                <hr />


                                <h5 className="fw-bold">

                                    Interpretation

                                </h5>


                                <p>

                                    This chart shows the distribution of
                                    movements according to their recorded
                                    violence escalation status.

                                </p>


                                <p>

                                    The results can be filtered by country,
                                    region, year, and dominant claim type.

                                </p>


                            </Card>

                        </Col>

                    </Row>


                    {/* ================= Violence Onset ================= */}

                    <Row className="mb-4">

                        <Col>

                            <Card className="shadow-sm border-0 p-4">

                                <h4 className="fw-bold">

                                    Did Movements Start With Violence?

                                </h4>


                                {onsetData.length > 0 ? (

                                    <PieChartComponent

                                        data={onsetData}

                                        nameKey="onset_status"

                                        valueKey="total"

                                    />

                                ) : (

                                    <Alert variant="info">

                                        No violence onset data is available
                                        for the selected filters.

                                    </Alert>

                                )}


                                <hr />


                                <h5 className="fw-bold">

                                    Interpretation

                                </h5>


                                <p>

                                    This analysis examines the first recorded
                                    observation of each movement to determine
                                    whether the movement started directly
                                    with separatist violence.

                                </p>


                                <ul>

                                    <li>

                                        <strong>Started With Violence:</strong>
                                        The movement was recorded as violent
                                        in its first available observation.

                                    </li>


                                    <li>

                                        <strong>Did Not Start With Violence:</strong>
                                        The movement was not recorded as
                                        violent in its first available
                                        observation.

                                    </li>

                                </ul>


                                <p>

                                    The year filter is intentionally not
                                    applied to this chart because violence
                                    onset must always be determined using
                                    the actual first recorded observation
                                    of each movement.

                                </p>


                            </Card>

                        </Col>

                    </Row>


                </>

            )}


        </Container>

    );

}


export default ViolencePatterns;