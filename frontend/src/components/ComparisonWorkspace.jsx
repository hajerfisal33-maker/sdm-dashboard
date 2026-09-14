import { useState } from "react";
import {
    Card,
    Row,
    Col,
    Button,
    Form,
    Alert,
    Spinner,
    Badge
} from "react-bootstrap";

import api from "../services/api";

function ComparisonWorkspace({
    countries = [],
    initialCountryId = "",
    onClose
}) {
    // ========================================
    // States
    // ========================================

    const [country1, setCountry1] = useState(
        initialCountryId ? String(initialCountryId) : ""
    );

    const [country2, setCountry2] = useState("");

    const [comparisonData, setComparisonData] = useState([]);

    const [loading, setLoading] = useState(false);

    const [error, setError] = useState(null);


    // ========================================
    // Metrics
    // ========================================

    const metrics = [
        {
            key: "total_movements",
            label: "Total SDMs",
            description: "Distinct self-determination movements"
        },
        {
            key: "sovereignty_movements",
            label: "Sovereignty Declarations",
            description: "Movements that declared sovereignty"
        },
        {
            key: "experienced_violence",
            label: "Experienced Violence",
            description: "Movements that experienced violence at any point"
        },
        {
            key: "started_violence",
            label: "Started With Violence",
            description: "Movements whose first observation was violent"
        },
        {
            key: "latest_peaceful_movements",
            label: "Latest Peaceful Status",
            description: "Movements whose latest observation was peaceful"
        },
        {
            key: "concession_movements",
            label: "Concessions Received",
            description: "Movements that received concessions"
        },
        {
            key: "restriction_movements",
            label: "Restrictions Faced",
            description: "Movements that faced restrictions"
        }
    ];


    // ========================================
    // Find selected countries
    // ========================================

    const selectedCountry1 = countries.find(
        country =>
            String(country.country_id) === String(country1)
    );

    const selectedCountry2 = countries.find(
        country =>
            String(country.country_id) === String(country2)
    );


    // ========================================
    // Compare
    // ========================================

    async function handleCompare() {

        if (!country1 || !country2) {

            setError(
                "Please select two countries."
            );

            return;
        }


        if (country1 === country2) {

            setError(
                "Please select two different countries."
            );

            return;
        }


        try {

            setLoading(true);

            setError(null);

            setComparisonData([]);


            const response = await api.get(
                "/compare/countries",
                {
                    params: {
                        country1: country1,
                        country2: country2
                    }
                }
            );


            setComparisonData(
                response.data || []
            );


        } catch (err) {

            console.error(
                "Comparison error:",
                err
            );

            setError(
                err.response?.data?.error ||
                "Failed to load comparison data."
            );

        } finally {

            setLoading(false);

        }
    }


    // ========================================
    // Get country result
    // ========================================

    function getCountryResult(countryId) {

        return comparisonData.find(
            item =>
                String(item.country_id) ===
                String(countryId)
        );
    }


    const country1Data =
        getCountryResult(country1);

    const country2Data =
        getCountryResult(country2);


    // ========================================
    // Difference
    // ========================================

    function getDifference(key) {

        if (!country1Data || !country2Data) {
            return 0;
        }

        return (
            Number(country2Data[key] || 0) -
            Number(country1Data[key] || 0)
        );
    }


    // ========================================
    // Percentage difference
    // ========================================

    function getPercentageDifference(key) {

        if (!country1Data || !country2Data) {
            return null;
        }

        const value1 =
            Number(country1Data[key] || 0);

        const value2 =
            Number(country2Data[key] || 0);


        if (value1 === 0) {

            if (value2 === 0) {
                return 0;
            }

            return null;
        }


        return (
            ((value2 - value1) / value1) * 100
        );
    }


    // ========================================
    // Higher country
    // ========================================

    function getHigherCountry(key) {

        if (!country1Data || !country2Data) {
            return null;
        }

        const value1 =
            Number(country1Data[key] || 0);

        const value2 =
            Number(country2Data[key] || 0);


        if (value1 === value2) {
            return "Equal";
        }


        return value1 > value2
            ? selectedCountry1?.country_name
            : selectedCountry2?.country_name;
    }


    // ========================================
    // Close
    // ========================================

    function handleClose() {

        if (onClose) {
            onClose();
        }

    }


    return (

        <div
            style={{
                position: "fixed",
                inset: 0,
                backgroundColor: "rgba(0,0,0,0.55)",
                zIndex: 9999,
                overflowY: "auto",
                padding: "30px"
            }}
        >

            <div
                style={{
                    maxWidth: "1200px",
                    margin: "0 auto",
                    backgroundColor: "#fff",
                    borderRadius: "20px",
                    padding: "30px",
                    boxShadow:
                        "0 10px 40px rgba(0,0,0,0.25)"
                }}
            >

                {/* ========================================
                    HEADER
                ======================================== */}

                <div
                    className="d-flex justify-content-between align-items-start mb-4"
                >

                    <div>

                        <h2
                            className="fw-bold text-primary mb-2"
                        >
                            Compare SDM Profiles
                        </h2>

                        <p className="text-muted mb-0">

                            Compare self-determination movement
                            characteristics between two countries.

                        </p>

                    </div>


                    <Button
                        variant="light"
                        className="rounded-circle"
                        onClick={handleClose}
                    >
                        ✕
                    </Button>

                </div>


                {/* ========================================
                    COUNTRY SELECTORS
                ======================================== */}

                <Card
                    className="border-0 bg-light rounded-4 p-4 mb-4"
                >

                    <Row
                        className="align-items-end g-3"
                    >

                        {/* Country A */}

                        <Col md={5}>

                            <Form.Label
                                className="fw-bold"
                            >
                                Country A
                            </Form.Label>

                            <Form.Select
                                value={country1}
                                onChange={(e) => {
                                    setCountry1(
                                        e.target.value
                                    );

                                    setComparisonData([]);

                                    setError(null);
                                }}
                            >

                                <option value="">
                                    Select country
                                </option>

                                {countries.map(
                                    country => (

                                        <option
                                            key={
                                                country.country_id
                                            }
                                            value={
                                                country.country_id
                                            }
                                        >
                                            {
                                                country.country_name
                                            }
                                        </option>

                                    )
                                )}

                            </Form.Select>

                        </Col>


                        {/* VS */}

                        <Col
                            md={2}
                            className="text-center"
                        >

                            <div
                                className="fw-bold text-muted"
                                style={{
                                    fontSize: "20px"
                                }}
                            >
                                VS
                            </div>

                        </Col>


                        {/* Country B */}

                        <Col md={5}>

                            <Form.Label
                                className="fw-bold"
                            >
                                Country B
                            </Form.Label>

                            <Form.Select
                                value={country2}
                                onChange={(e) => {
                                    setCountry2(
                                        e.target.value
                                    );

                                    setComparisonData([]);

                                    setError(null);
                                }}
                            >

                                <option value="">
                                    Select country
                                </option>

                                {countries
                                    .filter(
                                        country =>
                                            String(
                                                country.country_id
                                            ) !==
                                            String(country1)
                                    )
                                    .map(
                                        country => (

                                            <option
                                                key={
                                                    country.country_id
                                                }
                                                value={
                                                    country.country_id
                                                }
                                            >
                                                {
                                                    country.country_name
                                                }
                                            </option>

                                        )
                                    )}

                            </Form.Select>

                        </Col>


                        {/* Compare Button */}

                        <Col xs={12}>

                            <div className="text-center mt-2">

                                <Button
                                    variant="primary"
                                    className="px-5 rounded-3 fw-bold"
                                    onClick={
                                        handleCompare
                                    }
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
                                        <>
                                            Compare Countries
                                        </>
                                    )}

                                </Button>

                            </div>

                        </Col>

                    </Row>

                </Card>


                {/* ========================================
                    ERROR
                ======================================== */}

                {error && (

                    <Alert
                        variant="danger"
                        className="rounded-3"
                    >
                        {error}
                    </Alert>

                )}


                {/* ========================================
                    RESULTS
                ======================================== */}

                {country1Data &&
                    country2Data &&
                    !loading && (

                    <>

                        {/* ====================================
                            COUNTRY HEADERS
                        ==================================== */}

                        <Row className="g-3 mb-4">

                            <Col md={6}>

                                <Card
                                    className="border-0 bg-light rounded-4 p-3 text-center h-100"
                                >

                                    <small className="text-muted">
                                        Country A
                                    </small>

                                    <h3 className="fw-bold text-primary mb-0">

                                        {
                                            country1Data.country_name
                                        }

                                    </h3>

                                </Card>

                            </Col>


                            <Col md={6}>

                                <Card
                                    className="border-0 bg-light rounded-4 p-3 text-center h-100"
                                >

                                    <small className="text-muted">
                                        Country B
                                    </small>

                                    <h3 className="fw-bold text-primary mb-0">

                                        {
                                            country2Data.country_name
                                        }

                                    </h3>

                                </Card>

                            </Col>

                        </Row>


                        {/* ====================================
                            KEY INDICATORS
                        ==================================== */}

                        <div className="mb-5">

                            <h4
                                className="fw-bold text-primary mb-3"
                            >
                                Key Indicators
                            </h4>


                            <div
                                className="table-responsive"
                            >

                                <table
                                    className="table table-hover align-middle"
                                >

                                    <thead>

                                        <tr>

                                            <th>
                                                Indicator
                                            </th>

                                            <th className="text-center">
                                                {
                                                    country1Data.country_name
                                                }
                                            </th>

                                            <th className="text-center">
                                                Difference
                                            </th>

                                            <th className="text-center">
                                                {
                                                    country2Data.country_name
                                                }
                                            </th>

                                            <th className="text-center">
                                                % Difference
                                            </th>

                                        </tr>

                                    </thead>


                                    <tbody>

                                        {metrics.map(
                                            metric => {

                                                const value1 =
                                                    Number(
                                                        country1Data[
                                                            metric.key
                                                        ] || 0
                                                    );

                                                const value2 =
                                                    Number(
                                                        country2Data[
                                                            metric.key
                                                        ] || 0
                                                    );

                                                const difference =
                                                    value2 -
                                                    value1;

                                                const percentage =
                                                    getPercentageDifference(
                                                        metric.key
                                                    );


                                                return (

                                                    <tr
                                                        key={
                                                            metric.key
                                                        }
                                                    >

                                                        <td>

                                                            <div className="fw-semibold">
                                                                {
                                                                    metric.label
                                                                }
                                                            </div>

                                                            <small className="text-muted">
                                                                {
                                                                    metric.description
                                                                }
                                                            </small>

                                                        </td>


                                                        <td className="text-center fw-bold">

                                                            {value1}

                                                        </td>


                                                        <td
                                                            className="text-center fw-bold"
                                                        >

                                                            {difference > 0
                                                                ? `+${difference}`
                                                                : difference}

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

                                            }
                                        )}

                                    </tbody>

                                </table>

                            </div>

                        </div>


                        {/* ====================================
                            VISUAL COMPARISON
                        ==================================== */}

                        <div className="mb-5">

                            <h4
                                className="fw-bold text-primary mb-4"
                            >
                                SDM Indicator Comparison
                            </h4>


                            {metrics.map(
                                metric => {

                                    const value1 =
                                        Number(
                                            country1Data[
                                                metric.key
                                            ] || 0
                                        );

                                    const value2 =
                                        Number(
                                            country2Data[
                                                metric.key
                                            ] || 0
                                        );

                                    const maxValue =
                                        Math.max(
                                            value1,
                                            value2,
                                            1
                                        );


                                    const width1 =
                                        (value1 /
                                            maxValue) *
                                        100;

                                    const width2 =
                                        (value2 /
                                            maxValue) *
                                        100;


                                    return (

                                        <div
                                            key={
                                                metric.key
                                            }
                                            className="mb-4"
                                        >

                                            <div
                                                className="fw-semibold mb-2"
                                            >
                                                {
                                                    metric.label
                                                }
                                            </div>


                                            {/* Country A */}

                                            <div
                                                className="d-flex align-items-center gap-2 mb-2"
                                            >

                                                <div
                                                    style={{
                                                        width: "90px",
                                                        fontSize: "13px",
                                                        fontWeight: 600
                                                    }}
                                                >
                                                    {
                                                        country1Data.country_name
                                                    }
                                                </div>


                                                <div
                                                    style={{
                                                        flex: 1,
                                                        background: "#e9ecef",
                                                        borderRadius: "6px",
                                                        height: "30px",
                                                        overflow: "hidden"
                                                    }}
                                                >

                                                    <div
                                                        style={{
                                                            width: `${width1}%`,
                                                            height: "100%",
                                                            background: "#4dabf7",
                                                            borderRadius: "6px",
                                                            display: "flex",
                                                            alignItems: "center",
                                                            justifyContent: "flex-end",
                                                            paddingRight: "8px",
                                                            color: "#fff",
                                                            fontWeight: 700,
                                                            transition:
                                                                "width 0.4s ease"
                                                        }}
                                                    >

                                                        {value1}

                                                    </div>

                                                </div>

                                            </div>


                                            {/* Country B */}

                                            <div
                                                className="d-flex align-items-center gap-2"
                                            >

                                                <div
                                                    style={{
                                                        width: "90px",
                                                        fontSize: "13px",
                                                        fontWeight: 600
                                                    }}
                                                >
                                                    {
                                                        country2Data.country_name
                                                    }
                                                </div>


                                                <div
                                                    style={{
                                                        flex: 1,
                                                        background: "#e9ecef",
                                                        borderRadius: "6px",
                                                        height: "30px",
                                                        overflow: "hidden"
                                                    }}
                                                >

                                                    <div
                                                        style={{
                                                            width: `${width2}%`,
                                                            height: "100%",
                                                            background: "#ff922b",
                                                            borderRadius: "6px",
                                                            display: "flex",
                                                            alignItems: "center",
                                                            justifyContent: "flex-end",
                                                            paddingRight: "8px",
                                                            color: "#fff",
                                                            fontWeight: 700,
                                                            transition:
                                                                "width 0.4s ease"
                                                        }}
                                                    >

                                                        {value2}

                                                    </div>

                                                </div>

                                            </div>

                                        </div>

                                    );

                                }
                            )}

                        </div>


                        {/* ====================================
                            KEY FINDINGS
                        ==================================== */}

                        <Card
                            className="border-0 bg-light rounded-4 p-4"
                        >

                            <h4
                                className="fw-bold text-primary mb-3"
                            >
                                Key Findings
                            </h4>


                            <div>

                                {metrics.map(
                                    metric => {

                                        const higher =
                                            getHigherCountry(
                                                metric.key
                                            );

                                        const difference =
                                            getDifference(
                                                metric.key
                                            );


                                        if (
                                            higher === "Equal"
                                        ) {

                                            return (

                                                <div
                                                    key={
                                                        metric.key
                                                    }
                                                    className="mb-2"
                                                >

                                                    <span>
                                                        •
                                                    </span>

                                                    {" "}

                                                    {country1Data.country_name}
                                                    {" and "}
                                                    {country2Data.country_name}
                                                    {" have the same number of "}

                                                    <strong>
                                                        {
                                                            metric.label.toLowerCase()
                                                        }
                                                    </strong>
                                                    .

                                                </div>

                                            );

                                        }


                                        return (

                                            <div
                                                key={
                                                    metric.key
                                                }
                                                className="mb-2"
                                            >

                                                <span>
                                                    •
                                                </span>

                                                {" "}

                                                <strong>
                                                    {higher}
                                                </strong>

                                                {" has "}

                                                <strong>
                                                    {Math.abs(difference)}
                                                </strong>

                                                {" more "}

                                                {
                                                    metric.label.toLowerCase()
                                                }

                                                {" than "}

                                                {higher ===
                                                country1Data.country_name
                                                    ? country2Data.country_name
                                                    : country1Data.country_name}

                                                .

                                            </div>

                                        );

                                    }
                                )}

                            </div>

                        </Card>


                        {/* ====================================
                            METHODOLOGICAL NOTE
                        ==================================== */}

                        <Alert
                            variant="light"
                            className="border small mt-4"
                        >

                            <strong>
                                How to interpret the comparison:
                            </strong>

                            <br />

                            All headline indicators represent
                            distinct movements rather than annual
                            movement observations.

                            <br />

                            <br />

                            Experienced Violence refers to a
                            movement that recorded violence at least
                            once during its observed period.

                            <br />

                            <br />

                            Started With Violence refers to a movement
                            whose first observed status was violent.

                            <br />

                            <br />

                            Latest Peaceful Status refers to movements
                            whose most recent observation recorded
                            a peaceful status.

                        </Alert>

                    </>

                )}

            </div>

        </div>

    );
}

export default ComparisonWorkspace;