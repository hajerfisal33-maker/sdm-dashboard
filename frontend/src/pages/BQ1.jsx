import { useEffect, useState } from "react";
import api from "../services/api";
import BarChartComponent from "../charts/BarChartComponent";
import { Container, Row, Col, Card, Badge, Spinner } from "react-bootstrap";

function BQ1() {
    const [countryData, setCountryData] = useState([]);
    const [regionData, setRegionData] = useState([]);
    const [yearData, setYearData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadData();
    }, []);

    async function loadData() {
        try {
            const country = await api.get("/country");
            const region = await api.get("/region");
            const year = await api.get("/year");
            
            // التأكد من أن البيانات المراجعة عبارة عن Array
            setCountryData(Array.isArray(country.data) ? country.data : []);
            setRegionData(Array.isArray(region.data) ? region.data : []);
            setYearData(Array.isArray(year.data) ? year.data : []);
        }
        catch(error){
            console.log("Error loading data:", error);
        }
        finally {
            setLoading(false); // إيقاف التحميل بعد وصول البيانات
        }
    }

    // 🛡️ حماية: عرض شاشة تحميل أثناء استرجاع البيانات لمنع انهيار الرسم البياني
    if (loading) {
        return (
            <Container className="d-flex justify-content-center align-items-center style-loading" style={{ minHeight: "60vh" }}>
                <div className="text-center">
                    <Spinner animation="border" variant="primary" role="status" className="mb-3" />
                    <h5 className="text-muted">Loading dashboard data...</h5>
                </div>
            </Container>
        );
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
                        {countryData.length > 0 ? (
                            <BarChartComponent
                                data={countryData}
                                xKey="country_name"
                                yKey="total_movements"
                            />
                        ) : (
                            <p className="text-muted">No country data available</p>
                        )}
                    </Card>
                </Col>

                <Col lg={12}>
                    <Card className="shadow-sm p-4 border-0 rounded-4 bg-white">
                        <h4 className="fw-bold mb-1">
                            Distribution by Region
                        </h4>
                        <p className="text-muted small mb-3">Comparative volume of active movements across global geographic regions</p>
                        {regionData.length > 0 ? (
                            <BarChartComponent
                                data={regionData}
                                xKey="region"
                                yKey="total_movements"
                            />
                        ) : (
                            <p className="text-muted">No region data available</p>
                        )}
                    </Card>
                </Col>

                <Col lg={12}>
                    <Card className="shadow-sm p-4 border-0 rounded-4 bg-white">
                        <h4 className="fw-bold mb-1">
                            Historical Distribution Over Time
                        </h4>
                        <p className="text-muted small mb-3">Annual frequency breakdown of active self-determination movements (1945–2020)</p>
                        {yearData.length > 0 ? (
                            <BarChartComponent
                                data={yearData}
                                xKey="year"
                                yKey="active_movements"
                            />
                        ) : (
                            <p className="text-muted">No temporal data available</p>
                        )}
                    </Card>
                </Col>
            </Row>
        </Container>
    );
}

export default BQ1;