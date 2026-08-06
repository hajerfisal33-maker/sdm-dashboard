import { useEffect, useState } from "react";
import { Container, Row, Col, Card, Badge } from "react-bootstrap";
import api from "../services/api";
import PieChartComponent from "../charts/PieChartComponent";

const MAPPED_LABELS = {
    1: "Yes",
    0: "No",
    null: "Not Available"
};

function PatternsOfViolence() {

    const [violentData, setViolentData] = useState([]);
    const [escalationData, setEscalationData] = useState([]);
    const [onsetData, setOnsetData] = useState([]);
    const [loading, setLoading] = useState(true);

    const formatChartData = (rawArray, keyName) => {

        if (!Array.isArray(rawArray)) return [];

        return rawArray.map(item => {

            const value = item[keyName];

            let label = MAPPED_LABELS.null;

            if (value === 1 || value === "1") {

                label = MAPPED_LABELS[1];

            }

            else if (value === 0 || value === "0") {

                label = MAPPED_LABELS[0];

            }

            return {

                ...item,

                statusLabel: label

            };

        });

    };

    useEffect(() => {

        async function loadData() {

            try {

                const violent = await api.get("/violent-movements");

                const escalation = await api.get("/violent-escalation");

                const onset = await api.get("/violenceOnset");

                setViolentData(
                    formatChartData(violent.data, "violsd")
                );

                setEscalationData(
                    formatChartData(escalation.data, "viol_escal")
                );

                setOnsetData(
                    formatChartData(onset.data, "violsd_onset")
                );

            }

            catch (error) {

                console.log(error);

            }

            finally {

                setLoading(false);

            }

        }

        loadData();

    }, []);

    if (loading) {

        return (

            <Container className="mt-5 text-center">

                <h3>Loading Violence Analysis...</h3>

            </Container>

        );

    }

    return (

        <Container className="mt-5 mb-5">

            <div className="mb-4">

                <Badge
                    bg="danger"
                    className="px-3 py-2 fs-6 mb-2 rounded-pill"
                >

                    Violence & Conflict Dynamics

                </Badge>

                <h1 className="fw-bold">

                    Violent Escalation and Conflict Dynamics

                </h1>

                <p className="lead text-muted">

                    This section investigates how self-determination movements evolved in relation to political violence. Using variables contained in the SDM Dataset, it distinguishes between movements that remained peaceful, those that became involved in armed conflict, those that gradually escalated from peaceful protest into violence, and those that were violent from the very beginning of their existence.

                </p>

            </div>

            <Row className="g-4">

                {/* Chart 1 */}

                <Col lg={4}>

                    <Card className="shadow-sm border-0 rounded-4 h-100 p-4">

                        <h4 className="fw-bold">

                            Overall Violent Movements

                        </h4>

                        <p className="text-muted">

                            This chart compares all movements in the dataset according to whether they ever engaged in violent conflict during their lifetime. Only movements with recorded information are included in the comparison.

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

                            A larger "Yes" segment indicates that a greater proportion of self-determination movements eventually resorted to armed conflict. Conversely, a larger "No" segment suggests that most movements relied on peaceful political strategies throughout their existence. This provides a broad overview of how common political violence is among SDMs.

                        </p>

                    </Card>

                </Col>

                {/* Chart 2 */}

                <Col lg={4}>

                    <Card className="shadow-sm border-0 rounded-4 h-100 p-4">

                        <h4 className="fw-bold">

                            Violent Escalation

                        </h4>

                        <p className="text-muted">

                            This visualization identifies movements that initially pursued peaceful political strategies but later escalated into violent conflict. Movements without escalation information are excluded from the analysis.

                        </p>

                        <PieChartComponent

                            data={escalationData}

                            nameKey="statusLabel"

                            valueKey="total"

                        />

                        <hr />

                        <h6 className="fw-bold">

                            Interpretation

                        </h6>

                        <p className="text-muted">

                            The proportion of "Yes" indicates how frequently peaceful movements transformed into violent actors over time. This helps researchers understand whether escalation into armed conflict is common or relatively uncommon among self-determination movements.

                        </p>

                    </Card>

                </Col>

                {/* Chart 3 */}

                <Col lg={4}>

                    <Card className="shadow-sm border-0 rounded-4 h-100 p-4">

                        <h4 className="fw-bold">

                            Immediate Violence Onset

                        </h4>

                        <p className="text-muted">

                            This chart distinguishes movements that were already violent when they first emerged from those that initially appeared as peaceful organizations. Only movements with available onset information are included.

                        </p>

                        <PieChartComponent

                            data={onsetData}

                            nameKey="statusLabel"

                            valueKey="total"

                        />

                        <hr />

                        <h6 className="fw-bold">

                            Interpretation

                        </h6>

                        <p className="text-muted">

                            A higher proportion of "Yes" indicates that many movements were established as armed organizations from the outset, whereas a higher proportion of "No" suggests that most movements began peacefully and only some later changed strategy. Comparing this chart with the escalation chart provides insight into different pathways through which political violence emerges.

                        </p>

                    </Card>

                </Col>

            </Row>

        </Container>

    );

}

export default PatternsOfViolence;