import { useEffect, useState } from "react";
import api from "../services/api";

import BarChartComponent from "../charts/BarChartComponent";
import PieChartComponent from "../charts/PieChartComponent";

import {
    Container,
    Row,
    Col,
    Card,
    Spinner
} from "react-bootstrap";

import DashboardFilters from "../components/DashboardFilters";


function ViolencePatterns() {

    const [violentMovements, setViolentMovements] = useState([]);

    const [violentEscalation, setViolentEscalation] = useState([]);

    const [violenceOnset, setViolenceOnset] = useState([]);

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

            setLoading(true);


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


            const violenceResponse = await api.get(

                "/violent-movements",

                { params }

            );


            const escalationResponse = await api.get(

                "/violent-escalation",

                { params }

            );


            const onsetResponse = await api.get(

                "/violence-onset",

                { params }

            );


            /*
            =========================
            LABEL EXPERIENCED VIOLENCE
            =========================
            */

            const formattedViolence = (

                violenceResponse.data || []

            ).map(item => ({

                ...item,

                violence_status:

                    item.violence_status ===
                    "Experienced Violence"

                        ? "Experienced Violence"

                        : "No Recorded Violence"

            }));


            /*
            =========================
            LABEL ESCALATION
            =========================
            */

            const formattedEscalation = (

                escalationResponse.data || []

            ).map(item => ({

                ...item,

                escalation_status:

                    item.escalation_status ===
                    "Escalated to Violence"

                        ? "Escalated to Violence"

                        : "Did Not Escalate to Violence"

            }));


            /*
            =========================
            LABEL VIOLENCE ONSET
            =========================
            */

            const formattedOnset = (

    onsetResponse.data || []

).map(item => ({

    ...item,

    onset_status:

        Number(item.violsd_onset) === 1

            ? "Started With Violence"

            : "Did Not Start With Violence"

}));


            setViolentMovements(

                formattedViolence

            );


            setViolentEscalation(

                formattedEscalation

            );


            setViolenceOnset(

                formattedOnset

            );


        }

        catch (error) {

            console.log(error);

        }

        finally {

            setLoading(false);

        }

    }


    /*
    =========================
    LOADING
    =========================
    */

    if (loading) {

        return (

            <Container className="mt-5">


                <DashboardFilters

                    filters={filters}

                    setFilters={setFilters}

                />


                <div className="text-center mt-5">

                    <Spinner animation="border" />

                </div>


            </Container>

        );

    }


    return (

        <Container className="mt-5 mb-5">


            {/* =========================
                DASHBOARD FILTERS
            ========================= */}

            <DashboardFilters

                filters={filters}

                setFilters={setFilters}

            />


            {/* =========================
                HEADER
            ========================= */}

            <Card className="shadow-sm border-0 mb-4 p-4">


                <h2 className="fw-bold text-primary">

                    Violence Patterns in
                    Self-Determination Movements

                </h2>


                <p className="mt-3">

                    Self-determination movements do not all follow
                    the same path in relation to violence. Some
                    movements experience violence during their
                    history, while others remain non-violent throughout
                    the recorded observation period. This section
                    examines whether movements experienced violence,
                    whether they escalated from peaceful activity to
                    violence, and whether they started directly with
                    violence.

                </p>


            </Card>


            {/* =====================================
                CHART 1
                EXPERIENCED VIOLENCE
            ===================================== */}

            <Row className="mb-4">


                <Col lg={12}>


                    <Card className="shadow-sm border-0 p-4">


                        <h4 className="fw-bold">

                            Movements That Experienced Violence

                        </h4>


                        <PieChartComponent

                            data={violentMovements}

                            nameKey="violence_status"

                            valueKey="total"

                        />


                        <hr />


                        <h5 className="fw-bold">

                            Interpretation

                        </h5>


                        <p>

                            This chart shows whether self-determination
                            movements experienced separatist violence at
                            any point during the recorded observation
                            period.

                        </p>


                        <ul>

                            <li>

                                <strong>
                                    Experienced Violence
                                </strong>

                                {" "}includes movements that recorded
                                violence in at least one observation year.
                                These movements may have later returned
                                to peaceful activity or may have remained
                                violent.

                            </li>


                            <li>

                                <strong>
                                    No Recorded Violence
                                </strong>

                                {" "}includes movements that did not
                                record separatist violence during the
                                available observation period.

                            </li>

                        </ul>


                        <p>

                            Each movement belongs to only one of these
                            two categories. Therefore, the total number
                            of movements in both categories represents
                            the total number of movements included in
                            the selected filters.

                        </p>


                    </Card>


                </Col>


            </Row>


            {/* =====================================
                CHART 2
                ESCALATION TO VIOLENCE
            ===================================== */}

            <Row className="mb-4">


                <Col lg={12}>


                    <Card className="shadow-sm border-0 p-4">


                        <h4 className="fw-bold">

                            Escalation from Peaceful Activity
                            to Violence

                        </h4>


                        <BarChartComponent

                            data={violentEscalation}

                            xKey="escalation_status"

                            yKey="total"

                        />


                        <hr />


                        <h5 className="fw-bold">

                            Interpretation

                        </h5>


                        <p>

                            This chart examines whether a movement
                            changed from a peaceful phase to a violent
                            phase during the observation period.

                        </p>


                        <ul>

                            <li>

                                <strong>
                                    Escalated to Violence
                                </strong>

                                {" "}includes movements that were
                                recorded as peaceful in an earlier year
                                and later recorded as violent.

                            </li>


                            <li>

                                <strong>
                                    Did Not Escalate to Violence
                                </strong>

                                {" "}includes movements for which no
                                transition from an earlier peaceful
                                phase to a later violent phase was
                                recorded.

                            </li>

                        </ul>


                        <p>

                            A movement is classified as having escalated
                            to violence if it changed from peaceful
                            activity to violence at any point. The
                            movement may later have returned to peaceful
                            activity or may have remained violent. This
                            analysis therefore focuses on whether the
                            transition to violence occurred, rather than
                            the movement's final recorded status.

                        </p>


                    </Card>


                </Col>


            </Row>


            {/* =====================================
                CHART 3
                STARTED WITH VIOLENCE
            ===================================== */}

            <Row>


                <Col lg={12}>


                    <Card className="shadow-sm border-0 p-4">


                        <h4 className="fw-bold">

                            Whether Movements Started
                            with Violence

                        </h4>


                        <PieChartComponent

                            data={violenceOnset}

                            nameKey="onset_status"

                            valueKey="total"

                        />


                        <hr />


                        <h5 className="fw-bold">

                            Interpretation

                        </h5>


                        <p>

                            This chart shows whether the first recorded
                            observation of a movement was already
                            associated with separatist violence.

                        </p>


                        <ul>

                            <li>

                                <strong>
                                    Started With Violence
                                </strong>

                                {" "}includes movements whose first
                                recorded observation was violent.

                            </li>


                            <li>

                                <strong>
                                    Did Not Start With Violence
                                </strong>

                                {" "}includes movements whose first
                                recorded observation was not violent.

                            </li>

                        </ul>


                        <p>

                            This analysis focuses specifically on the
                            first recorded year of each movement. It
                            therefore distinguishes movements that began
                            directly with violence from movements that
                            entered the dataset without violence,
                            regardless of whether they later experienced
                            violence.

                        </p>


                    </Card>


                </Col>


            </Row>


        </Container>

    );

}


export default ViolencePatterns;