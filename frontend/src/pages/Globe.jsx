import { useEffect, useMemo, useState } from "react";
import Globe from "react-globe.gl";
import { Container, Card, Spinner, Alert } from "react-bootstrap";

import api from "../services/api";
import countriesGeoJSON from "../data/countries.json";

function GlobePage() {

    // ========================================
    // States
    // ========================================

    const [countries, setCountries] = useState([]);

    const [loading, setLoading] = useState(true);

    const [error, setError] = useState(null);

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
                    self-determination movements across countries.

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
onPolygonClick={(country) => {

    console.log(
        "Selected country:",
        country.properties?.name
    );

    console.log(
        "Database country:",
        country.databaseCountry
    );

}}
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

        </Container>

    );

}

export default GlobePage;