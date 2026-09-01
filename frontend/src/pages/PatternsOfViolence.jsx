import { useEffect, useState } from "react";

import {
    Container,
    Row,
    Col,
    Card,
    Badge,
    Spinner
} from "react-bootstrap";

import api from "../services/api";

import PieChartComponent from "../charts/PieChartComponent";

import DashboardFilters from "../components/DashboardFilters";



const MAPPED_LABELS = {

    1: "Yes",

    0: "No"

};



function PatternsOfViolence() {


    const [violentData, setViolentData] = useState([]);

    const [escalationData, setEscalationData] = useState([]);

    const [onsetData, setOnsetData] = useState([]);

    const [loading, setLoading] = useState(true);


    const [filters, setFilters] = useState({

        country: "",

        region: "",

        year: "",

        claim: ""

    });



    // ========================================
    // Format Violence Data
    // ========================================

    const formatViolenceData = (rawArray) => {

        if (!Array.isArray(rawArray)) {

            return [];

        }


        return rawArray.map(item => {

            let label = "Not Available";


            if (
                item.violsd === 1 ||
                item.violsd === "1"
            ) {

                label = "Yes";

            }


            else if (
                item.violsd === 0 ||
                item.violsd === "0"
            ) {

                label = "No";

            }


            return {

                ...item,

                statusLabel: label

            };

        });

    };



    // ========================================
    // Format Onset Data
    // ========================================

    const formatOnsetData = (rawArray) => {

        if (!Array.isArray(rawArray)) {

            return [];

        }


        return rawArray.map(item => {

            let label = "Did Not Start with Violence";


            if (
                item.violsd_onset === 1 ||
                item.violsd_onset === "1"
            ) {

                label = "Started Directly with Violence";

            }


            return {

                ...item,

                onsetLabel: label

            };

        });

    };



    // ========================================
    // Load Data
    // ========================================

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



            const violent = await api.get(

                "/violent-movements",

                {
                    params
                }

            );


            const escalation = await api.get(

                "/violent-escalation",

                {
                    params
                }

            );


            /*
            Violence onset does not use year
            because it is based on the first
            recorded observation of a movement.
            */

            const onsetParams = {

                country:
                    filters.country || undefined,

                region:
                    filters.region || undefined,

                claim:
                    filters.claim || undefined

            };


            const onset = await api.get(

                "/violent-onset",

                {
                    params: onsetParams
                }

            );



            setViolentData(

                formatViolenceData(

                    violent.data

                )

            );


            setEscalationData(

                escalation.data || []

            );


            setOnsetData(

                formatOnsetData(

                    onset.data

                )

            );


        }


        catch (error) {


            console.log(

                error

            );


            setViolentData([]);

            setEscalationData([]);

            setOnsetData([]);


        }


        finally {


            setLoading(false);


        }


    }



    // ========================================
    // Loading
    // ========================================

    if (loading) {


        return (

            <Container className="mt-5 mb-5">


                <DashboardFilters

                    filters={filters}

                    setFilters={setFilters}

                />


                <div className="text-center mt-5">


                    <Spinner animation="border" />


                    <p className="mt-3">


                        Loading Violence Analysis...


                    </p>


                </div>


            </Container>

        );

    }



    // ========================================
    // Page
    // ========================================

    return (


        <Container className="mt-5 mb-5">


            {/* Dashboard Filters */}

            <DashboardFilters

                filters={filters}

                setFilters={setFilters}

            />



            {/* Header */}

            <div className="mb-4">


                <Badge

                    bg="danger"

                    className="px-3 py-2 fs-6 mb-2 rounded-pill"

                >


                    Violence & Conflict Dynamics


                </Badge>



                <h1 className="fw-bold">


                    Violence Patterns


                </h1>



                <p className="lead text-muted">


                    This section explores patterns of political violence among
                    self-determination movements. It examines whether movements
                    experienced violence, the different pathways through which
                    violence developed, and whether movements began directly
                    with violence in their first recorded observation.


                </p>


            </div>



            <Row className="g-4">


                {/* Chart 1 */}

                <Col lg={6}>


                    <Card className="shadow-sm border-0 rounded-4 h-100 p-4">


                        <h4 className="fw-bold">


                            Movements Engaging in Violence


                        </h4>



                        <p className="text-muted">


                            This chart compares observations according to whether
                            violent conflict was recorded.


                        </p>



                        <PieChartComponent

                            data={violentData}

                            nameKey="statusLabel"

                            valueKey="total"

                        />



                        <hr />



                        <h6 className="fw-bold">


                            Interpretation


                        </h6>



                        <p className="text-muted">


                            The chart shows the distribution of recorded
                            observations in which self-determination movements
                            experienced violence and those in which violence
                            was not recorded.


                        </p>


                    </Card>


                </Col>



                {/* Chart 2 */}

                <Col lg={6}>


                    <Card className="shadow-sm border-0 rounded-4 h-100 p-4">


                        <h4 className="fw-bold">


                            Violence Escalation Pathways


                        </h4>



                        <p className="text-muted">


                            This chart examines different patterns through which
                            violence developed among movements.


                        </p>



                        <PieChartComponent

                            data={escalationData}

                            nameKey="category"

                            valueKey="total"

                        />



                        <hr />



                        <h6 className="fw-bold">


                            Interpretation


                        </h6>



                        <p className="text-muted">


                            The chart provides insight into the different
                            pathways through which movements experienced
                            political violence, including movements that
                            remained peaceful and those that escalated
                            into violent conflict.


                        </p>


                    </Card>


                </Col>



                {/* Chart 3 */}

                <Col lg={12}>


                    <Card className="shadow-sm border-0 rounded-4 p-4">


                        <h4 className="fw-bold">


                            Movements That Started Directly with Violence


                        </h4>



                        <p className="text-muted">


                            This chart examines the first recorded observation
                            of each movement to identify whether the movement
                            began directly with violence.


                        </p>



                        <PieChartComponent

                            data={onsetData}

                            nameKey="onsetLabel"

                            valueKey="total"

                        />



                        <hr />



                        <h6 className="fw-bold">


                            Interpretation


                        </h6>



                        <p className="text-muted">


                            A movement is classified as having started directly
                            with violence when its first recorded observation
                            has a value of 1 for the violence indicator.
                            Movements with a value of 0 in their first recorded
                            observation are classified as not having started
                            directly with violence.


                        </p>



                        <p className="text-muted mb-0">


                            <strong>Methodological Note:</strong> This analysis
                            is based on the first recorded observation of each
                            movement. Therefore, the year filter does not apply
                            to this chart because the purpose is to examine how
                            a movement began rather than its status in a selected
                            observation year.


                        </p>


                    </Card>


                </Col>


            </Row>


        </Container>

    );

}



export default PatternsOfViolence;