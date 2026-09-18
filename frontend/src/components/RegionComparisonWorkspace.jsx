
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

const REGIONS = [
    "Central Asia",
    "Europe",
    "Latin America",
    "M East & N Africa",
    "N America",
    "Oceania",
    "SE Asia",
    "SS Africa"
];

const METRICS = [
    {
        key: "total_movements",
        label: "Total SDMs",
        description: "Distinct movements"
    },
    {
        key: "experienced_violence",
        label: "Experienced Violence",
        description: "Movements with violence recorded at least once"
    },
    {
        key: "started_violent",
        label: "Started With Violence",
        description: "First observed record was violent"
    },
    {
        key: "latest_nonviolent",
        label: "Latest Nonviolent Status",
        description: "Latest observed record was nonviolent"
    },
    {
        key: "sovereignty_movements",
        label: "Sovereignty Declarations",
        description: "Movements with a sovereignty declaration"
    },
    {
        key: "concession_movements",
        label: "Concessions",
        description: "Movements with concessions recorded"
    },
    {
        key: "restriction_movements",
        label: "Restrictions",
        description: "Movements with restrictions recorded"
    },
    {
        key: "concentrated_movements",
        label: "Geographically Concentrated",
        description: "Movements coded as concentrated"
    },
    {
        key: "non_concentrated_movements",
        label: "Not Geographically Concentrated",
        description: "Movements coded as not concentrated"
    }
];

const POWER_STATUSES = [
    "Discriminated",
    "Dominant",
    "Junior partner",
    "Powerless",
    "Senior partner"
];

function RegionComparisonWorkspace({ onClose }) {
    const [region1, setRegion1] = useState("");
    const [region2, setRegion2] = useState("");

    const [comparisonData, setComparisonData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    async function handleCompare() {
        if (!region1 || !region2) {
            setError("Please select two regions.");
            return;
        }

        if (region1 === region2) {
            setError("Please select two different regions.");
            return;
        }

        try {
            setLoading(true);
            setError(null);
            setComparisonData([]);

            const response = await api.get(
                "/compare/regions",
                {
                    params: {
                        region1,
                        region2
                    }
                }
            );

            setComparisonData(
                Array.isArray(response.data)
                    ? response.data
                    : []
            );
        } catch (err) {
            console.error("Region comparison error:", err);

            setError(
                err.response?.data?.error ||
                "Failed to load region comparison."
            );
        } finally {
            setLoading(false);
        }
    }

    const region1Data = comparisonData.find(
        item => item.region === region1
    );

    const region2Data = comparisonData.find(
        item => item.region === region2
    );

    function getValue(data, key) {
        return Number(data?.[key] || 0);
    }

    function getDifference(key) {
        if (!region1Data || !region2Data) return 0;

        return (
            getValue(region2Data, key) -
            getValue(region1Data, key)
        );
    }

    function getPercentageDifference(key) {
        if (!region1Data || !region2Data) return null;

        const value1 = getValue(region1Data, key);
        const value2 = getValue(region2Data, key);

        if (value1 === 0) {
            return value2 === 0 ? 0 : null;
        }

        return ((value2 - value1) / value1) * 100;
    }

    function getHigherRegion(key) {
        if (!region1Data || !region2Data) return null;

        const value1 = getValue(region1Data, key);
        const value2 = getValue(region2Data, key);

        if (value1 === value2) return "Equal";

        return value1 > value2 ? region1 : region2;
    }

    function getPowerStatusRows(region) {
        return comparisonData.length
            ? []
            : [];
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
                        <h2 className="fw-bold text-primary">
                            Compare SDM Regions
                        </h2>

                        <p className="text-muted mb-0">
                            Compare self-determination movement
                            characteristics between two regions.
                        </p>
                    </div>

                    {onClose && (
                        <Button
                            variant="light"
                            className="rounded-circle"
                            onClick={onClose}
                        >
                            ✕
                        </Button>
                    )}
                </div>

                <Card className="border-0 bg-light rounded-4 p-4 mb-4">
                    <Row className="align-items-end g-3">
                        <Col md={5}>
                            <Form.Label className="fw-bold">
                                Region A
                            </Form.Label>

                            <Form.Select
                                value={region1}
                                onChange={e => {
                                    setRegion1(e.target.value);
                                    setComparisonData([]);
                                    setError(null);
                                }}
                            >
                                <option value="">Select region</option>

                                {REGIONS.map(region => (
                                    <option
                                        key={region}
                                        value={region}
                                    >
                                        {region}
                                    </option>
                                ))}
                            </Form.Select>
                        </Col>

                        <Col md={2} className="text-center">
                            <strong className="text-muted fs-5">
                                VS
                            </strong>
                        </Col>

                        <Col md={5}>
                            <Form.Label className="fw-bold">
                                Region B
                            </Form.Label>

                            <Form.Select
                                value={region2}
                                onChange={e => {
                                    setRegion2(e.target.value);
                                    setComparisonData([]);
                                    setError(null);
                                }}
                            >
                                <option value="">Select region</option>

                                {REGIONS
                                    .filter(region => region !== region1)
                                    .map(region => (
                                        <option
                                            key={region}
                                            value={region}
                                        >
                                            {region}
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
                                        <Spinner
                                            size="sm"
                                            animation="border"
                                            className="me-2"
                                        />
                                        Comparing...
                                    </>
                                ) : (
                                    "Compare Regions"
                                )}
                            </Button>
                        </Col>
                    </Row>
                </Card>

                {error && (
                    <Alert variant="danger">
                        {error}
                    </Alert>
                )}

                {loading && (
                    <div className="text-center py-4">
                        <Spinner animation="border" />
                    </div>
                )}

                {region1Data && region2Data && !loading && (
                    <>
                        <Row className="g-3 mb-4">
                            {[region1Data, region2Data].map(
                                (regionData, index) => (
                                    <Col md={6} key={regionData.region}>
                                        <Card className="border-0 bg-light rounded-4 p-3 text-center h-100">
                                            <small className="text-muted">
                                                Region {index === 0 ? "A" : "B"}
                                            </small>

                                            <h3 className="fw-bold text-primary mb-0">
                                                {regionData.region}
                                            </h3>

                                            <Badge bg="secondary" className="mt-2">
                                                {getValue(
                                                    regionData,
                                                    "total_movements"
                                                )} movements
                                            </Badge>
                                        </Card>
                                    </Col>
                                )
                            )}
                        </Row>

                        <h4 className="fw-bold text-primary mb-3">
                            Key Indicators
                        </h4>

                        <div className="table-responsive mb-5">
                            <table className="table table-hover align-middle">
                                <thead>
                                    <tr>
                                        <th>Indicator</th>
                                        <th className="text-center">
                                            {region1}
                                        </th>
                                        <th className="text-center">
                                            Difference (B − A)
                                        </th>
                                        <th className="text-center">
                                            {region2}
                                        </th>
                                        <th className="text-center">
                                            % Difference
                                        </th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {METRICS.map(metric => {
                                        const value1 = getValue(
                                            region1Data,
                                            metric.key
                                        );

                                        const value2 = getValue(
                                            region2Data,
                                            metric.key
                                        );

                                        const percentage =
                                            getPercentageDifference(
                                                metric.key
                                            );

                                        return (
                                            <tr key={metric.key}>
                                                <td>
                                                    <div className="fw-semibold">
                                                        {metric.label}
                                                    </div>

                                                    <small className="text-muted">
                                                        {metric.description}
                                                    </small>
                                                </td>

                                                <td className="text-center fw-bold">
                                                    {value1}
                                                </td>

                                                <td className="text-center fw-bold">
                                                    {getDifference(metric.key) > 0
                                                        ? `+${getDifference(metric.key)}`
                                                        : getDifference(metric.key)}
                                                </td>

                                                <td className="text-center fw-bold">
                                                    {value2}
                                                </td>

                                                <td className="text-center">
                                                    {percentage === null
                                                        ? "N/A"
                                                        : `${percentage > 0 ? "+" : ""}${percentage.toFixed(1)}%`}
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </div>

                        <h4 className="fw-bold text-primary mb-4">
                            Visual Comparison
                        </h4>

                        {METRICS.map(metric => {
                            const value1 = getValue(
                                region1Data,
                                metric.key
                            );

                            const value2 = getValue(
                                region2Data,
                                metric.key
                            );

                            const maxValue = Math.max(
                                value1,
                                value2,
                                1
                            );

                            const width1 = (value1 / maxValue) * 100;
                            const width2 = (value2 / maxValue) * 100;

                            return (
                                <div
                                    key={metric.key}
                                    className="mb-4"
                                >
                                    <div className="fw-semibold mb-2">
                                        {metric.label}
                                    </div>

                                    {[
                                        {
                                            name: region1,
                                            value: value1,
                                            width: width1,
                                            color: "#4dabf7"
                                        },
                                        {
                                            name: region2,
                                            value: value2,
                                            width: width2,
                                            color: "#ff922b"
                                        }
                                    ].map(item => (
                                        <div
                                            key={item.name}
                                            className="d-flex align-items-center gap-2 mb-2"
                                        >
                                            <div
                                                style={{
                                                    width: "150px",
                                                    fontSize: "13px",
                                                    fontWeight: 600
                                                }}
                                            >
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

                        <Card className="border-0 bg-light rounded-4 p-4 mt-4">
                            <h4 className="fw-bold text-primary mb-3">
                                Key Findings
                            </h4>

                            {METRICS.map(metric => {
                                const higher = getHigherRegion(metric.key);
                                const difference = Math.abs(
                                    getDifference(metric.key)
                                );

                                return (
                                    <div
                                        key={metric.key}
                                        className="mb-2"
                                    >
                                        {higher === "Equal"
                                            ? `${region1} and ${region2} have the same number of ${metric.label.toLowerCase()}.`
                                            : `${higher} has ${difference} more ${metric.label.toLowerCase()} than the other region.`}
                                    </div>
                                );
                            })}
                        </Card>

                        <Alert variant="light" className="border small mt-4">
                            <strong>Interpretation note:</strong>
                            <br />
                            All headline counts represent distinct movements,
                            not annual movement observations.
                            <br /><br />
                            Latest Nonviolent Status means the latest
                            observed record was nonviolent. It does not
                            necessarily mean the movement ended peacefully.
                        </Alert>
                    </>
                )}
            </div>
        </div>
    );
}

export default RegionComparisonWorkspace;
