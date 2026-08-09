import { useEffect, useMemo, useState, useRef } from "react";
import Globe from "react-globe.gl";
import { Container, Card, Spinner, Alert, Offcanvas, Badge, Row, Col } from "react-bootstrap";

import api from "../services/api";
import countriesGeoJSON from "../data/countries.json";

function GlobePage() {

    // ========================================
    // States
    // ========================================

    const [countries, setCountries] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // الزيادة الخاصة بالتفاعل والتفاصيل (Level 2 & Level 3)
    const globeRef = useRef();
    const [selectedCountry, setSelectedCountry] = useState(null);
    const [countryDetails, setCountryDetails] = useState(null);
    const [detailsLoading, setDetailsLoading] = useState(false);
    const [detailsError, setDetailsError] = useState(null);


    // ========================================
    // Load countries from database
    // ========================================

    useEffect(() => {

        async function loadCountries() {

            try {

                const response =
                    await api.get("/globe/countries");

                setCountries(response.data || []);

            }

            catch (err) {

                console.error(
                    "Failed to load globe countries:",
                    err
                );

                setError(
                    "Failed to load countries from the database."
                );

            }

            finally {

                setLoading(false);

            }

        }

        loadCountries();

    }, []);

    // ========================================
    // Match database countries
    // with GeoJSON countries
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

        return countriesGeoJSON.features.filter(
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
    // Handle Country Click (Level 1 -> Level 2 & 3)
    // ========================================

    const handlePolygonClick = async (countryFeature) => {

        const countryName = countryFeature.properties?.name;

        if (!countryName) return;

        setSelectedCountry(countryName);
        setDetailsLoading(true);
        setDetailsError(null);
        setCountryDetails(null);

        // توجيه الكرة الأرضية نحو الدولة المحددة
        if (globeRef.current) {
            globeRef.current.pointOfView(
                { lat: 0, lng: 0, altitude: 2 },
                1000
            );
        }

        try {

            const response = await api.get(`/country-details/${encodeURIComponent(countryName)}`);
            setCountryDetails(response.data);

        } catch (err) {

            console.error("Failed to load country details:", err);
            setDetailsError("Failed to load details for " + countryName);

        } finally {

            setDetailsLoading(false);

        }

    };


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

            <Card className="shadow-sm border-0 rounded-4 p-4 mb-4">

                <h2 className="fw-bold text-primary">

                    Global Distribution of
                    Self-Determination Movements

                </h2>

                <p className="text-muted mb-0">

                    Explore the geographical distribution of
                    self-determination movements across countries. Click on any country to inspect details.

                </p>

            </Card>


            {/* ========================================
                Globe
            ======================================== */}

            <Card
                className="shadow-sm border-0 rounded-4 p-3"
            >

                <div
                    className="d-flex justify-content-center"
                    style={{
                        width: "100%",
                        minHeight: "650px"
                    }}
                >

                    <Globe

                        ref={globeRef}

                        // --------------------------------
                        // Globe appearance
                        // --------------------------------

                        width={900}

                        height={650}

                        backgroundColor="#ffffff"

                        globeImageUrl={
                            "//unpkg.com/three-globe/example/img/earth-blue-marble.jpg"
                        }


                        // --------------------------------
                        // Country polygons
                        // --------------------------------

                        polygonsData={
                            globeCountries
                        }


                        // --------------------------------
                        // Country appearance
                        // --------------------------------

                        polygonCapColor={() =>
                            "#4dabf7"
                        }

                        polygonSideColor={() =>
                            "rgba(0, 0, 0, 0.15)"
                        }

                        polygonStrokeColor={() =>
                            "#ffffff"
                        }

                        polygonAltitude={0.01}


                        // --------------------------------
                        // Country label
                        // --------------------------------

                        polygonLabel={(country) => {

                            return `
                                <div
                                    style="
                                        padding: 6px 10px;
                                        background: white;
                                        border-radius: 6px;
                                        color: #222;
                                        box-shadow: 0 2px 8px rgba(0,0,0,0.2);
                                    "
                                >
                                    <strong>
                                        ${country.properties?.name || "Unknown"}
                                    </strong>
                                </div>
                            `;

                        }}


                        // --------------------------------
                        // Country click
                        // --------------------------------

                        onPolygonClick={handlePolygonClick}

                    />

                </div>

            </Card>


            {/* ========================================
                Temporary information
            ======================================== */}

            <Card
                className="shadow-sm border-0 rounded-4 p-4 mt-4"
            >

                <h5 className="fw-bold">

                    Countries Available

                </h5>

                <p className="text-muted mb-0">

                    {countries.length} countries are
                    available in the SDM dataset.

                </p>

                <p className="text-muted mb-0">

                    {globeCountries.length} countries
                    are currently displayed on the globe.

                </p>

            </Card>


            {/* ========================================
                Country Details Side Panel (Offcanvas)
            ======================================== */}

            <Offcanvas
                show={!!selectedCountry}
                onHide={() => setSelectedCountry(null)}
                placement="end"
                className="rounded-start-4 shadow-lg"
                style={{ width: "420px" }}
            >
                <Offcanvas.Header closeButton className="border-bottom">
                    <Offcanvas.Title className="fw-bold text-primary">
                        🌍 {selectedCountry}
                    </Offcanvas.Title>
                </Offcanvas.Header>

                <Offcanvas.Body>

                    {detailsLoading && (
                        <div className="text-center py-5">
                            <Spinner animation="border" variant="primary" />
                            <p className="mt-2 text-muted">Loading country details...</p>
                        </div>
                    )}

                    {detailsError && (
                        <Alert variant="warning">
                            {detailsError}
                        </Alert>
                    )}

                    {countryDetails?.summary && (
                        <>
                            {/* Level 2: Country Summary Card */}
                            <Card className="border-0 bg-light rounded-3 p-3 mb-4">
                                <h6 className="fw-bold text-dark mb-3">Country Summary</h6>

                                <p className="small mb-2">
                                    <strong>Ethnic Groups: </strong>
                                    <span className="text-muted">{countryDetails.summary.ethnic_groups || "N/A"}</span>
                                </p>

                                <hr className="my-2" />

                                <Row className="g-2 text-center mt-1">
                                    <Col xs={6}>
                                        <div className="p-2 bg-white rounded border">
                                            <div className="small text-muted">Total SDMs</div>
                                            <div className="fw-bold fs-5 text-primary">{countryDetails.summary.total_sdms || 0}</div>
                                        </div>
                                    </Col>
                                    <Col xs={6}>
                                        <div className="p-2 bg-white rounded border">
                                            <div className="small text-muted">Sovereignty</div>
                                            <div className="fw-bold fs-5 text-success">{countryDetails.summary.sovereignty_count || 0}</div>
                                        </div>
                                    </Col>
                                    <Col xs={6}>
                                        <div className="p-2 bg-white rounded border">
                                            <div className="small text-muted">Violent</div>
                                            <div className="fw-bold fs-5 text-danger">{countryDetails.summary.violent_count || 0}</div>
                                        </div>
                                    </Col>
                                    <Col xs={6}>
                                        <div className="p-2 bg-white rounded border">
                                            <div className="small text-muted">Peaceful</div>
                                            <div className="fw-bold fs-5 text-info">{countryDetails.summary.remained_peaceful_count || 0}</div>
                                        </div>
                                    </Col>
                                </Row>

                                <div className="d-flex justify-content-between mt-3 small">
                                    <span>Concessions: <strong>{countryDetails.summary.concessions_count || 0}</strong></span>
                                    <span>Restrictions: <strong>{countryDetails.summary.restrictions_count || 0}</strong></span>
                                </div>
                            </Card>

                            {/* Level 3: Movement Records List */}
                            <h6 className="fw-bold text-dark mb-3">
                                Movement Records ({countryDetails.movements?.length || 0})
                            </h6>

                            {countryDetails.movements?.length === 0 ? (
                                <p className="text-muted small">No movement records found.</p>
                            ) : (
                                countryDetails.movements?.map((m, idx) => (
                                    <Card key={idx} className="mb-3 border-start border-4 border-primary shadow-sm rounded-3">
                                        <Card.Body className="p-3">
                                            <h6 className="fw-bold text-primary mb-2">{m.group_name}</h6>

                                            <div className="small mb-1">
                                                <strong>Claim:</strong> {m.domclaim || "N/A"}
                                            </div>

                                            <div className="small mb-1">
                                                <strong>Group Size:</strong> {m.groupsize || "N/A"}
                                            </div>

                                            <div className="small mb-1">
                                                <strong>Power Status:</strong> {m.pwrstat || "N/A"}
                                            </div>

                                            <div className="d-flex gap-1 flex-wrap my-2">
                                                <Badge bg={m.sovdec === 1 ? "success" : "secondary"}>
                                                    Sov Dec: {m.sovdec === 1 ? "Yes" : "No"}
                                                </Badge>
                                                <Badge bg={m.violsd === 1 ? "danger" : "info"}>
                                                    Violence: {m.violsd === 1 ? "Yes" : "No"}
                                                </Badge>
                                                <Badge bg={m.con === 1 ? "primary" : "secondary"}>
                                                    Concession: {m.con === 1 ? "Yes" : "No"}
                                                </Badge>
                                            </div>

                                            <div className="text-muted mt-2" style={{ fontSize: "11px" }}>
                                                Duration: {m.start_year || "N/A"} - {m.end_year || "Present"}
                                            </div>
                                        </Card.Body>
                                    </Card>
                                ))
                            )}
                        </>
                    )}

                </Offcanvas.Body>
            </Offcanvas>

        </Container>

    );

}

export default GlobePage;