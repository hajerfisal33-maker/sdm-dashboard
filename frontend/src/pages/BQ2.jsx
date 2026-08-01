import { useEffect, useState } from "react";
import api from "../services/api";
import PieChartComponent from "../charts/PieChartComponent";
import BarChartComponent from "../charts/BarChartComponent";
import { Container, Row, Col, Card, Badge } from "react-bootstrap";

function BQ2() {
    const [claimTypes, setClaimTypes] = useState([]);
    const [claimDuration, setClaimDuration] = useState([]);

    useEffect(() => {
        loadData();
    }, []);

    async function loadData() {
        try {
            const claims = await api.get("/claim-types");
            const duration = await api.get("/claim-duration");
            setClaimTypes(claims.data);
            setClaimDuration(duration.data);
        }
        catch(error){
            console.log(error);
        }
    }

    return(
        <Container className="mt-5 mb-5">
            {/* الهيدر الشارح الجديد بدون كلمة BQ أو صيغة سؤال */}
            <div className="mb-4">
                <Badge bg="primary" className="px-3 py-2 fs-6 mb-2 rounded-pill">
                    Movement Classification & Lifespan
                </Badge>
                <h1 className="fw-bold text-dark">
                    Movement Claim Types and Active Duration
                </h1>
                <p className="lead text-muted">
                    This analysis categorizes self-determination movements by their core objective (such as Autonomy or Independence) and evaluates the average lifespan and persistence of these active movements.
                </p>
            </div>

            <Row className="g-4">
                <Col lg={6}>
                    <Card className="shadow-sm p-4 h-100 border-0 rounded-4 bg-white">
                        <h4 className="fw-bold mb-1">
                            Distribution of Claim Types
                        </h4>
                        <p className="text-muted small mb-3">Proportional breakdown of movements based on primary claim category</p>
                        <PieChartComponent
                            data={claimTypes}
                            nameKey="domclaim"
                            valueKey="total_movements"
                        />
                    </Card>
                </Col>

                <Col lg={6}>
                    <Card className="shadow-sm p-4 h-100 border-0 rounded-4 bg-white">
                        <h4 className="fw-bold mb-1">
                            Average Active Duration (Years)
                        </h4>
                        <p className="text-muted small mb-3">Average lifespan of movements across each claim category</p>
                        <BarChartComponent
                            data={claimDuration}
                            xKey="domclaim"
                            yKey="average_duration"
                        />
                    </Card>
                </Col>
            </Row>
        </Container>
    );
}

export default BQ2;