import { useEffect, useState } from "react";
import api from "../services/api";
import BarChartComponent from "../charts/BarChartComponent";
import { Container, Row, Col, Card, Badge } from "react-bootstrap";

function BQ1() {
    const [countryData, setCountryData] = useState([]);
    const [regionData, setRegionData] = useState([]);
    const [yearData, setYearData] = useState([]);

    useEffect(() => {
        loadData();
    }, []);

    async function loadData() {
        try {
            const country = await api.get("/country");
            const region = await api.get("/region");
            const year = await api.get("/year");
            setCountryData(country.data);
            setRegionData(region.data);
            setYearData(year.data);
        }
        catch(error){
            console.log(error);
        }
    }

    return (
        <Container className="mt-5 mb-5">
            {/* الهيدر الشارح السليم بدون BQ أو سؤال */}
            <div className="mb-4">
                <Badge bg="primary" className="px-3 py-2 fs-6 mb-2 rounded-pill">
                    Geographic & Temporal Overview
                </Badge>
                <h1 className="fw-bold text-dark">
                    Geographical and Historical Distribution
                </h1>
                <p className="lead text-muted">
                    This section illustrates the global distribution of self-determination movements across countries and geographic regions, alongside their active temporal progression over time (1945–2020).
                </p>
            </div>

            <Row className="g-4">
                <Col lg={12}>
                    <Card className="shadow-sm p-4 border-0 rounded-4 bg-white">
                        <h4 className="fw-bold mb-1">
                            Distribution by Country
                        </h4>
                        <p className="text-muted small mb-3">Total number of identified self-determination movements per sovereign country</p>
                        <BarChartComponent
                            data={countryData}
                            xKey="country_name"
                            yKey="total_movements"
                        />
                    </Card>
                </Col>

                <Col lg={12}>
                    <Card className="shadow-sm p-4 border-0 rounded-4 bg-white">
                        <h4 className="fw-bold mb-1">
                            Distribution by Region
                        </h4>
                        <p className="text-muted small mb-3">Comparative volume of active movements across global geographic regions</p>
                        <BarChartComponent
                            data={regionData}
                            xKey="region"
                            yKey="total_movements"
                        />
                    </Card>
                </Col>

                <Col lg={12}>
                    <Card className="shadow-sm p-4 border-0 rounded-4 bg-white">
                        <h4 className="fw-bold mb-1">
                            Historical Distribution Over Time
                        </h4>
                        <p className="text-muted small mb-3">Annual frequency breakdown of active self-determination movements (1945–2020)</p>
                        <BarChartComponent
                            data={yearData}
                            xKey="year"
                            yKey="active_movements"
                        />
                    </Card>
                </Col>
            </Row>
        </Container>
    );
}

export default BQ1;