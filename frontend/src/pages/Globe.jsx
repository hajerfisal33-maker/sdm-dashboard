import { useEffect, useMemo, useState } from "react";
import Globe from "react-globe.gl";
import {
    Container,
    Card,
    Spinner,
    Alert,
    Row,
    Col,
    Offcanvas,
    Badge,
    Button
} from "react-bootstrap";

import api from "../services/api";
import countriesJSON from "../data/countries.json";

function GlobePage() {

    // ========================================
    // States
    // ========================================

    const [countries, setCountries] = useState([]);

    const [selectedCountry, setSelectedCountry] = useState(null);

    const [countryDetails, setCountryDetails] = useState(null);

    const [loading, setLoading] = useState(true);

    const [detailsLoading, setDetailsLoading] = useState(false);

    const [error, setError] = useState(null);

    const [detailsError, setDetailsError] = useState(null);

    const [showPanel, setShowPanel] = useState(false);


    // ========================================
    // Load countries
    // ========================================

    useEffect(() => {

        async function loadCountries() {

            try {

                const response =
                    await api.get("/globe/countries");

                setCountries(response.data || []);

            } catch (err) {

                console.error(
                    "Failed to load globe countries:",
                    err
                );

                setError(
                    "Failed to load countries from the database."
                );

            } finally {

                setLoading(false);

            }

        }

        loadCountries();

    }, []);


    // ========================================
    // Match database countries with JSON
    // ========================================

    const globeCountries = useMemo(() => {

        if (!countries.length) {
            return [];
        }

        const databaseCountryNames =
            new Set(
                countries.map(country =>
                    country.country_name
                        ?.trim()
                        .toLowerCase()
                )
            );

        return countriesJSON.features.filter(
            feature => {

                const geoName =
                    feature.properties?.name;

                if (!geoName) {
                    return false;
                }

                return databaseCountryNames.has(
                    geoName
                        .trim()
                        .toLowerCase()
                );

            }
        );

    }, [countries]);


    // ========================================
    // Country click
    // ========================================

    async function handleCountryClick(country) {

        const countryName =
            country.properties?.name;

        if (!countryName) {
            return;
        }

        console.log(
            "Selected country:",
            countryName
        );

        setSelectedCountry(countryName);

        setCountryDetails(null);

        setDetailsError(null);

        setDetailsLoading(true);

        setShowPanel(true);

        try {

            const response =
                await api.get(
                    `/country-details/${encodeURIComponent(countryName)}`
                );

            setCountryDetails(
                response.data
            );

        } catch (err) {

            console.error(
                "Failed to load country details:",
                err
            );

            setDetailsError(
                "Failed to load data for this country."
            );

        } finally {

            setDetailsLoading(false);

        }

    }


    // ========================================
    // Close country panel
    // ========================================

    function handleClosePanel() {

        setShowPanel(false);

    }


    // ========================================
    // Binary values
    // ========================================

    function binaryLabel(value) {

        if (
            value === 1 ||
            value === "1"
        ) {
            return "Yes";
        }

        if (
            value === 0 ||
            value === "0"
        ) {
            return "No";
        }

        return "N/A";

    }


    // ========================================
    // End year
    // ========================================

    function formatEndYear(value) {

        if (
            value === 9999 ||
            value === "9999"
        ) {
            return "2020";
        }

        if (
            value === 8888 ||
            value === "8888"
        ) {
            return "N/A";
        }

        if (
            value === null ||
            value === undefined ||
            value === ""
        ) {
            return "N/A";
        }

        return value;

    }


    // ========================================
    // Loading
    // ========================================

    if (loading) {

        return (

            <Container className="mt-5 text-center">

                <Spinner
                    animation="border"
                    variant="primary"
                />

                <h5 className="mt-3">
                    Loading countries...
                </h5>

            </Container>

        );

    }


    // ========================================
    // Error
    // ========================================

    if (error) {

        return (

            <Container className="mt-5">

                <Alert variant="danger">
                    {error}
                </Alert>

            </Container>

        );

    }


    // ========================================
    // Main Page
    // ========================================

    return (

        <Container className="mt-5 mb-5">


            {/* ========================================
                Page Header
            ======================================== */}

            <Card
                className="shadow-sm border-0 rounded-4 p-4 mb-4"
            >

                <h2 className="fw-bold text-primary mb-2">

                    Global Distribution of
                    Self-Determination Movements

                </h2>

                <p className="text-muted mb-0">

                    Explore the geographical distribution of
                    self-determination movements across countries.
                    Click on a country to view its movements,
                    claims, political characteristics and outcomes.

                </p>

            </Card>


            {/* ========================================
                Globe
            ======================================== */}

            <Card
                className="shadow-sm border-0 rounded-4 p-3"
            >

                <div
                    className="d-flex justify-content-center align-items-center"
                    style={{
                        width: "100%",
                        minHeight: "650px"
                    }}
                >

                    <Globe

                        width={900}

                        height={650}

                        backgroundColor="#ffffff"

                        globeImageUrl={
                            "//unpkg.com/three-globe/example/img/earth-blue-marble.jpg"
                        }


                        // --------------------------------
                        // Countries
                        // --------------------------------

                        polygonsData={
                            globeCountries
                        }


                        // --------------------------------
                        // Country colour
                        // --------------------------------

                        polygonCapColor={
                            country => {

                                if (
                                    selectedCountry ===
                                    country.properties?.name
                                ) {

                                    return "#ff922b";

                                }

                                return "#4dabf7";

                            }
                        }


                        polygonSideColor={() =>
                            "rgba(0, 0, 0, 0.15)"
                        }


                        polygonStrokeColor={() =>
                            "#ffffff"
                        }


                        // --------------------------------
                        // Selected country height
                        // --------------------------------

                        polygonAltitude={
                            country => {

                                if (
                                    selectedCountry ===
                                    country.properties?.name
                                ) {

                                    return 0.04;

                                }

                                return 0.01;

                            }
                        }


                        // --------------------------------
                        // Country label
                        // --------------------------------

                        polygonLabel={
                            country => {

                                return `

                                    <div
                                        style="
                                            padding: 7px 12px;
                                            background: white;
                                            border-radius: 7px;
                                            color: #222;
                                            box-shadow:
                                                0 3px 12px
                                                rgba(0,0,0,0.18);
                                            font-size: 13px;
                                        "
                                    >

                                        <strong>
                                            ${
                                                country.properties?.name ||
                                                "Unknown"
                                            }
                                        </strong>

                                    </div>

                                `;

                            }
                        }


                        // --------------------------------
                        // Country click
                        // --------------------------------

                        onPolygonClick={
                            handleCountryClick
                        }

                    />

                </div>


                {/* ========================================
                    Globe Instructions
                ======================================== */}

                <div className="text-center mt-2 mb-2">

                    <small className="text-muted">

                        🌍 Drag the globe to explore countries.
                        Click a country to view detailed SDM information.

                    </small>

                </div>

            </Card>


            {/* ========================================
                Dataset Information
            ======================================== */}

            <Card
                className="shadow-sm border-0 rounded-4 p-4 mt-4"
            >

                <Row className="g-3">

                    <Col md={6}>

                        <div className="text-center">

                            <h6 className="text-muted">
                                Countries in SDM Dataset
                            </h6>

                            <h3 className="fw-bold text-primary">

                                {countries.length}

                            </h3>

                        </div>

                    </Col>


                    <Col md={6}>

                        <div className="text-center">

                            <h6 className="text-muted">
                                Countries Displayed
                            </h6>

                            <h3 className="fw-bold text-primary">

                                {globeCountries.length}

                            </h3>

                        </div>

                    </Col>

                </Row>

            </Card>


            {/* =====================================================
                COUNTRY SIDE PANEL
            ===================================================== */}

            <Offcanvas
                show={showPanel}
                onHide={handleClosePanel}
                placement="end"
                scroll
                backdrop
                style={{
                    width: "520px"
                }}
            >

                {/* ========================================
                    Panel Header
                ======================================== */}

                <Offcanvas.Header
                    closeButton
                    className="border-bottom"
                >

                    <Offcanvas.Title>

                        <div>

                            <div
                                className="text-primary fw-bold"
                                style={{
                                    fontSize: "24px"
                                }}
                            >

                                {selectedCountry}

                            </div>

                            <small className="text-muted">

                                Self-Determination Movement
                                Information

                            </small>

                        </div>

                    </Offcanvas.Title>

                </Offcanvas.Header>


                <Offcanvas.Body>


                    {/* ========================================
                        Loading Country Details
                    ======================================== */}

                    {detailsLoading && (

                        <div className="text-center py-5">

                            <Spinner
                                animation="border"
                                variant="primary"
                            />

                            <p className="text-muted mt-3">

                                Loading country information...

                            </p>

                        </div>

                    )}


                    {/* ========================================
                        Error
                    ======================================== */}

                    {detailsError && (

                        <Alert variant="danger">

                            {detailsError}

                        </Alert>

                    )}


                    {/* ========================================
                        Country Data
                    ======================================== */}

                    {countryDetails &&
                        !detailsLoading &&
                        !detailsError && (

                        <>


                            {/* ====================================
                                LEVEL 2
                            ==================================== */}

                            <div className="mb-4">

                                <h5 className="fw-bold text-primary mb-3">

                                    Country Overview

                                </h5>


                                {/* Ethnic Groups */}

                                <Card
                                    className="border-0 bg-light rounded-3 p-3 mb-3"
                                >

                                    <h6 className="fw-bold">

                                        Ethnic Groups

                                    </h6>

                                    <p className="mb-0">

                                        {
                                            countryDetails.summary
                                                ?.ethnic_groups ||
                                            "N/A"
                                        }

                                    </p>

                                </Card>


                                {/* Statistics */}

                                <Row className="g-2">


                                    <Col xs={6}>

                                        <Card
                                            className="border-0 bg-light p-3 text-center h-100"
                                        >

                                            <small className="text-muted">

                                                Total SDMs

                                            </small>

                                            <h3 className="fw-bold text-primary">

                                                {
                                                    countryDetails.summary
                                                        ?.total_sdms ?? 0
                                                }

                                            </h3>

                                        </Card>

                                    </Col>


                                    <Col xs={6}>

                                        <Card
                                            className="border-0 bg-light p-3 text-center h-100"
                                        >

                                            <small className="text-muted">

                                                Sovereignty Declarations

                                            </small>

                                            <h3 className="fw-bold">

                                                {
                                                    countryDetails.summary
                                                        ?.sovereignty_count ?? 0
                                                }

                                            </h3>

                                        </Card>

                                    </Col>


                                    <Col xs={6}>

                                        <Card
                                            className="border-0 bg-light p-3 text-center h-100"
                                        >

                                            <small className="text-muted">

                                                Experienced Violence

                                            </small>

                                            <h3 className="fw-bold">

                                                {
                                                    countryDetails.summary
                                                        ?.violent_count ?? 0
                                                }

                                            </h3>

                                        </Card>

                                    </Col>


                                    <Col xs={6}>

                                        <Card
                                            className="border-0 bg-light p-3 text-center h-100"
                                        >

                                            <small className="text-muted">

                                                Started Violence

                                            </small>

                                            <h3 className="fw-bold">

                                                {
                                                    countryDetails.summary
                                                        ?.started_violent_count ?? 0
                                                }

                                            </h3>

                                        </Card>

                                    </Col>


                                    <Col xs={6}>

                                        <Card
                                            className="border-0 bg-light p-3 text-center h-100"
                                        >

                                            <small className="text-muted">

                                                Remained Peaceful

                                            </small>

                                            <h3 className="fw-bold">

                                                {
                                                    countryDetails.summary
                                                        ?.remained_peaceful_count ?? 0
                                                }

                                            </h3>

                                        </Card>

                                    </Col>


                                    <Col xs={6}>

                                        <Card
                                            className="border-0 bg-light p-3 text-center h-100"
                                        >

                                            <small className="text-muted">

                                                Concessions Received

                                            </small>

                                            <h3 className="fw-bold">

                                                {
                                                    countryDetails.summary
                                                        ?.concessions_count ?? 0
                                                }

                                            </h3>

                                        </Card>

                                    </Col>


                                    <Col xs={12}>

                                        <Card
                                            className="border-0 bg-light p-3 text-center"
                                        >

                                            <small className="text-muted">

                                                Restrictions Faced

                                            </small>

                                            <h3 className="fw-bold">

                                                {
                                                    countryDetails.summary
                                                        ?.restrictions_count ?? 0
                                                }

                                            </h3>

                                        </Card>

                                    </Col>

                                </Row>

                            </div>


                            {/* ====================================
                                LEVEL 3
                            ==================================== */}

                            <hr className="my-4" />


                            <div className="mb-3">

                                <h5 className="fw-bold text-primary">

                                    Movement Records

                                </h5>

                                <p className="text-muted small">

                                    Each movement is shown once.
                                    Claim types include all distinct
                                    claims recorded during the movement's
                                    observed period.

                                </p>

                            </div>


                            {/* ====================================
                                Methodological Note
                            ==================================== */}

                            <Alert
                                variant="light"
                                className="border small"
                            >

                                <strong>
                                    Note:
                                </strong>

                                <br />

                                Group size, group concentration,
                                and power status represent the
                                <strong>
                                    {" "}latest recorded values
                                </strong>
                                {" "}for each movement.

                                <br />
                                <br />

                                Claim types include all distinct
                                claims recorded during the movement's
                                observed period.

                                <br />
                                <br />

                                An end year of
                                <strong> 2020 </strong>
                                means that the movement was still active
                                at the end of the study period.

                                <br />
                                <br />

                                Cases coded as 8888 are displayed as
                                unavailable because a consistent end
                                year could not be determined.

                            </Alert>


                            {/* ====================================
                                Movement Cards
                            ==================================== */}

                            {countryDetails.movements &&
                            countryDetails.movements.length > 0 ? (

                                <div>

                                    {countryDetails.movements.map(
                                        (movement, index) => (

                                            <Card
                                                key={
                                                    movement.group_id ||
                                                    index
                                                }
                                                className="border-0 shadow-sm rounded-4 mb-3"
                                            >

                                                <Card.Body>


                                                    {/* Movement Name */}

                                                    <div
                                                        className="d-flex justify-content-between align-items-start mb-3"
                                                    >

                                                        <div>

                                                            <h6 className="fw-bold mb-1">

                                                                {
                                                                    movement.group_name ||
                                                                    "Unknown Movement"
                                                                }

                                                            </h6>

                                                            <small className="text-muted">

                                                                {
                                                                    movement.region ||
                                                                    "N/A"
                                                                }

                                                            </small>

                                                        </div>

                                                        <Badge
                                                            bg="primary"
                                                        >

                                                            Movement

                                                        </Badge>

                                                    </div>


                                                    {/* Claims */}

                                                    <div className="mb-3">

                                                        <small className="text-muted d-block">

                                                            Claim Types

                                                        </small>

                                                        <strong>

                                                            {
                                                                movement.claim_types ||
                                                                "N/A"
                                                            }

                                                        </strong>

                                                    </div>


                                                    {/* Characteristics */}

                                                    <Row className="g-2 mb-3">


                                                        <Col xs={4}>

                                                            <div className="bg-light rounded-3 p-2 text-center">

                                                                <small className="text-muted d-block">

                                                                    Group Size

                                                                </small>

                                                                <strong>

                                                                    {
                                                                        movement.group_size ??
                                                                        "N/A"
                                                                    }

                                                                </strong>

                                                            </div>

                                                        </Col>


                                                        <Col xs={4}>

                                                            <div className="bg-light rounded-3 p-2 text-center">

                                                                <small className="text-muted d-block">

                                                                    Concentration

                                                                </small>

                                                                <strong>

                                                                    {
                                                                        movement.group_concentration ??
                                                                        "N/A"
                                                                    }

                                                                </strong>

                                                            </div>

                                                        </Col>


                                                        <Col xs={4}>

                                                            <div className="bg-light rounded-3 p-2 text-center">

                                                                <small className="text-muted d-block">

                                                                    Power Status

                                                                </small>

                                                                <strong>

                                                                    {
                                                                        movement.power_status ??
                                                                        "N/A"
                                                                    }

                                                                </strong>

                                                            </div>

                                                        </Col>

                                                    </Row>


                                                    {/* Movement Characteristics */}

                                                    <div className="mb-3">

                                                        <small className="text-muted d-block mb-2">

                                                            Movement Characteristics

                                                        </small>


                                                        <div className="d-flex flex-wrap gap-2">


                                                            <Badge
                                                                bg={
                                                                    movement.sovereignty_declared == 1
                                                                        ? "success"
                                                                        : "secondary"
                                                                }
                                                            >

                                                                Sovereignty:{" "}
                                                                {
                                                                    binaryLabel(
                                                                        movement.sovereignty_declared
                                                                    )
                                                                }

                                                            </Badge>


                                                            <Badge
                                                                bg={
                                                                    movement.experienced_violence == 1
                                                                        ? "danger"
                                                                        : "secondary"
                                                                }
                                                            >

                                                                Violence:{" "}
                                                                {
                                                                    binaryLabel(
                                                                        movement.experienced_violence
                                                                    )
                                                                }

                                                            </Badge>


                                                            <Badge
                                                                bg={
                                                                    movement.started_violence == 1
                                                                        ? "danger"
                                                                        : "secondary"
                                                                }
                                                            >

                                                                Started Violence:{" "}
                                                                {
                                                                    binaryLabel(
                                                                        movement.started_violence
                                                                    )
                                                                }

                                                            </Badge>


                                                            <Badge
                                                                bg={
                                                                    movement.received_concession == 1
                                                                        ? "success"
                                                                        : "secondary"
                                                                }
                                                            >

                                                                Concession:{" "}
                                                                {
                                                                    binaryLabel(
                                                                        movement.received_concession
                                                                    )
                                                                }

                                                            </Badge>


                                                            <Badge
                                                                bg={
                                                                    movement.faced_restriction == 1
                                                                        ? "warning"
                                                                        : "secondary"
                                                                }
                                                            >

                                                                Restriction:{" "}
                                                                {
                                                                    binaryLabel(
                                                                        movement.faced_restriction
                                                                    )
                                                                }

                                                            </Badge>

                                                        </div>

                                                    </div>


                                                    {/* Dates */}

                                                    <div className="border-top pt-3">

                                                        <Row>

                                                            <Col xs={6}>

                                                                <small className="text-muted d-block">

                                                                    Start Year

                                                                </small>

                                                                <strong>

                                                                    {
                                                                        movement.start_year ??
                                                                        "N/A"
                                                                    }

                                                                </strong>

                                                            </Col>


                                                            <Col xs={6}>

                                                                <small className="text-muted d-block">

                                                                    End Year

                                                                </small>

                                                                <strong>

                                                                    {
                                                                        formatEndYear(
                                                                            movement.end_year
                                                                        )
                                                                    }

                                                                </strong>

                                                            </Col>

                                                        </Row>

                                                    </div>


                                                </Card.Body>

                                            </Card>

                                        )
                                    )}

                                </div>

                            ) : (

                                <Alert variant="secondary">

                                    No movement records were found
                                    for this country.

                                </Alert>

                            )}

                        </>

                    )}

                </Offcanvas.Body>

            </Offcanvas>


        </Container>

    );

}

export default GlobePage;