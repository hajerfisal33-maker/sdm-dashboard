import { useState } from "react";
import {
    Alert,
    Badge,
    Button,
    Card,
    Col,
    Form,
    Row,
    Spinner
} from "react-bootstrap";

import api from "../services/api";

const METRICS = [
    { key: "total_movements", label: "Total SDMs", description: "Distinct self-determination movements" },
    { key: "sovereignty_movements", label: "Sovereignty Declarations", description: "Movements that declared sovereignty" },
    { key: "experienced_violence", label: "Experienced Violence", description: "Movements that experienced violence at any point" },
    { key: "started_violence", label: "Started With Violence", description: "Movements whose first observation was violent" },
    { key: "latest_peaceful_movements", label: "Latest Peaceful Status", description: "Movements whose latest observation was peaceful" },
    { key: "concession_movements", label: "Concessions Received", description: "Movements that received concessions" },
    { key: "restriction_movements", label: "Restrictions Faced", description: "Movements that faced restrictions" }
];

function getValue(data, key) {
    return Number(data?.[key] || 0);
}

function ComparisonWorkspace({ countries = [], initialCountryId = "", onClose }) {
    const [country1, setCountry1] = useState(
        initialCountryId ? String(initialCountryId) : ""
    );
    const [country2, setCountry2] = useState("");
    const [comparisonData, setComparisonData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    async function handleCompare() {
        if (!country1 || !country2) {
            setError("Please select two countries.");
            return;
        }

        if (country1 === country2) {
            setError("Please select two different countries.");
            return;
        }

        try {
            setLoading(true);
            setError(null);
            setComparisonData([]);

            const response = await api.get("/compare/countries", {
                params: { country1, country2 }
            });

            setComparisonData(
                Array.isArray(response.data) ? response.data : []
            );
        } catch (err) {
            console.error("Country comparison error:", err);
            setError(
                err.response?.data?.error ||
                "Failed to load country comparison."
            );
        } finally {
            setLoading(false);
        }
    }

    const country1Data = comparisonData.find(
        item => String(item.country_id) === String(country1)
    );
    const country2Data = comparisonData.find(
        item => String(item.country_id) === String(country2)
    );

    function selectCountry1(value) {
        setCountry1(value);
        setComparisonData([]);
        setError(null);
    }

    function selectCountry2(value) {
        setCountry2(value);
        setComparisonData([]);
        setError(null);
    }

    return (
        <div
            style={{
                position: "fixed",
                inset: 0,
                zIndex: 9999,
                overflowY: "auto",
                padding: "24px",
                backgroundColor: "rgba(0,0,0,0.55)"
            }}
        >
            <div
                style={{
                    maxWidth: "1200px",
                    margin: "0 auto",
                    padding: "28px",
                    backgroundColor: "#fff",
                    borderRadius: "18px",
                    boxShadow: "0 10px 40px rgba(0,0,0,0.25)"
                }}
            >
                <div className="d-flex justify-content-between align-items-start mb-4">
                    <div>
                        <h2 className="fw-bold text-primary">Compare SDM Countries</h2>
                        <p className="text-muted mb-0">
                            Compare self-determination movement characteristics between two countries.
                        </p>
                    </div>

                    {onClose && (
                        <Button
                            variant="light"
                            className="rounded-circle"
                            onClick={onClose}
                            aria-label="Close country comparison"
                        >
                            ×
                        </Button>
                    )}
                </div>

                <Card className="border-0 bg-light rounded-4 p-4 mb-4">
                    <Row className="align-items-end g-3">
                        <Col md={5}>
                            <Form.Label className="fw-bold">Country A</Form.Label>
                            <Form.Select
                                value={country1}
                                onChange={event => selectCountry1(event.target.value)}
                            >
                                <option value="">Select country</option>
                                {countries.map(country => (
                                    <option key={country.country_id} value={country.country_id}>
                                        {country.country_name}
                                    </option>
                                ))}
                            </Form.Select>
                        </Col>

                        <Col md={2} className="text-center">
                            <strong className="text-muted fs-5">VS</strong>
                        </Col>

                        <Col md={5}>
                            <Form.Label className="fw-bold">Country B</Form.Label>
                            <Form.Select
                                value={country2}
                                onChange={event => selectCountry2(event.target.value)}
                            >
                                <option value="">Select country</option>
                                {countries
                                    .filter(country => String(country.country_id) !== String(country1))
                                    .map(country => (
                                        <option key={country.country_id} value={country.country_id}>
                                            {country.country_name}
                                        </option>
                                    ))}
                            </Form.Select>
                        </Col>

                        <Col xs={12} className="text-center mt-3">
                            <Button
                                variant="primary"
                                className="px-5 fw-bold"
                                onClick={handleCompare}
                                disabled={loading}
                            >
                                {loading ? (
                                    <>
                                        <Spinner size="sm" animation="border" className="me-2" />
                                        Comparing...
                                    </>
                                ) : "Compare Countries"}
                            </Button>
                        </Col>
                    </Row>
                </Card>

                {error && <Alert variant="danger">{error}</Alert>}

                {loading && (
                    <div className="text-center py-4">
                        <Spinner animation="border" />
                    </div>
                )}

                {country1Data && country2Data && !loading && (
                    <>
                        <Row className="g-3 mb-4">
                            {[country1Data, country2Data].map((country, index) => (
                                <Col md={6} key={country.country_id}>
                                    <Card className="border-0 bg-light rounded-4 p-3 text-center h-100">
                                        <small className="text-muted">
                                            Country {index === 0 ? "A" : "B"}
                                        </small>
                                        <h3 className="fw-bold text-primary mb-0">
                                            {country.country_name}
                                        </h3>
                                        <Badge bg="secondary" className="mt-2">
                                            {getValue(country, "total_movements")} movements
                                        </Badge>
                                    </Card>
                                </Col>
                            ))}
                        </Row>

                        <h4 className="fw-bold text-primary mb-3">Key Indicators</h4>

                        <div className="table-responsive mb-5">
                            <table className="table table-hover align-middle">
                                <thead>
                                    <tr>
                                        <th>Indicator</th>
                                        <th className="text-center">{country1Data.country_name}</th>
                                        <th className="text-center">{country2Data.country_name}</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {METRICS.map(metric => (
                                        <tr key={metric.key}>
                                            <td>
                                                <div className="fw-semibold">{metric.label}</div>
                                                <small className="text-muted">{metric.description}</small>
                                            </td>
                                            <td className="text-center fw-bold">
                                                {getValue(country1Data, metric.key)}
                                            </td>
                                            <td className="text-center fw-bold">
                                                {getValue(country2Data, metric.key)}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        <h4 className="fw-bold text-primary mb-4">Visual Comparison</h4>

                        {METRICS.map(metric => {
                            const value1 = getValue(country1Data, metric.key);
                            const value2 = getValue(country2Data, metric.key);
                            const maximum = Math.max(value1, value2, 1);
                            const items = [
                                {
                                    name: country1Data.country_name,
                                    value: value1,
                                    width: (value1 / maximum) * 100,
                                    color: "#4dabf7"
                                },
                                {
                                    name: country2Data.country_name,
                                    value: value2,
                                    width: (value2 / maximum) * 100,
                                    color: "#ff922b"
                                }
                            ];

                            return (
                                <div key={metric.key} className="mb-4">
                                    <div className="fw-semibold mb-2">{metric.label}</div>
                                    {items.map(item => (
                                        <div key={item.name} className="d-flex align-items-center gap-2 mb-2">
                                            <div style={{ width: "150px", fontSize: "13px", fontWeight: 600 }}>
                                                {item.name}
                                            </div>
                                            <div
                                                style={{
                                                    flex: 1,
                                                    height: "28px",
                                                    background: "#e9ecef",
                                                    borderRadius: "6px",
                                                    overflow: "hidden"
                                                }}
                                            >
                                                <div
                                                    style={{
                                                        width: `${item.width}%`,
                                                        height: "100%",
                                                        background: item.color,
                                                        display: "flex",
                                                        alignItems: "center",
                                                        justifyContent: "flex-end",
                                                        paddingRight: "8px",
                                                        color: "#fff",
                                                        fontWeight: 700,
                                                        transition: "width 0.4s ease"
                                                    }}
                                                >
                                                    {item.value}
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            );
                        })}

                        <Alert variant="light" className="border small mt-4">
                            <strong>Interpretation note:</strong>
                            <br />
                            All headline counts represent distinct movements, not annual movement observations.
                            <br /><br />
                            Latest Peaceful Status means the latest observed record was peaceful;
                            it does not necessarily mean that the movement ended peacefully.
                        </Alert>
                    </>
                )}
            </div>
        </div>
    );
}

export default ComparisonWorkspace;
