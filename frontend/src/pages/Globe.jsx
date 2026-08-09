import { useEffect, useMemo, useState } from "react";
import Globe from "react-globe.gl";
import { Container, Card, Spinner, Alert, Row, Col } from "react-bootstrap";

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
    // Load selected country details
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

        try {

            const response =
                await api.get(
                    `/country-details/${encodeURIComponent(countryName)}`
                );

            setCountryDetails(
                response.data
            );

        }

        catch (err) {

            console.error(
                "Failed to load country details:",
                err
            );

            setDetailsError(
                "Failed to load data for this country."
            );

        }

        finally {

            setDetailsLoading(false);

        }

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
    // Helper for binary values
    // ========================================

    function binaryLabel(value) {

        if (value === 1 || value === "1") {
            return "Yes";
        }

        if (value === 0 || value === "0") {
            return "No";
        }

        return "N/A";

    }


    // ========================================
    // Helper for end year
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

                <h2 className="fw-bold text-primary">

                    Global Distribution of
                    Self-Determination Movements

                </h2>

                <p className="text-muted mb-0">

                    Explore the geographical distribution of
                    self-determination movements across countries.

                    Click on a country to explore its
                    self-determination movements and related
                    characteristics.

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

                        polygonCapColor={
                            (country) => {

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

                        polygonAltitude={
                            (country) => {

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

                        polygonLabel={(country) => {

                            return `

                                <div
                                    style="
                                        padding: 6px 10px;
                                        background: white;
                                        border-radius: 6px;
                                        color: #222;
                                        box-shadow: 0 2px 8px rgba(0,0,0,0.15);
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

                        }}


                        // --------------------------------
                        // Country click
                        // --------------------------------

                        onPolygonClick={
                            handleCountryClick
                        }

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
                Selected Country
            ======================================== */}

            {selectedCountry && (

                <Card
                    className="shadow-sm border-0 rounded-4 p-4 mt-4"
                >

                    <h3 className="fw-bold text-primary mb-3">

                        {selectedCountry}

                    </h3>


                    {/* ========================================
                        Details Loading
                    ======================================== */}

                    {detailsLoading && (

                        <div className="text-center py-4">

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
                        Details Error
                    ======================================== */}

                    {detailsError && (

                        <Alert variant="danger">

                            {detailsError}

                        </Alert>

                    )}


                    {/* ========================================
                        Country Details
                    ======================================== */}

                    {countryDetails &&
                        !detailsLoading &&
                        !detailsError && (

                        <>

                            {/* ========================================
                                Level 2 - Country Summary
                            ======================================== */}

                            <h4 className="fw-bold mb-3">

                                Country Summary

                            </h4>


                            <Row className="g-3">


                                {/* Ethnic Groups */}

                                <Col md={12}>

                                    <Card
                                        className="border-0 bg-light p-3 h-100"
                                    >

                                        <h6 className="fw-bold">

                                            Ethnic Groups

                                        </h6>

                                        <p className="mb-0">

                                            {
                                                countryDetails.summary?.ethnic_groups ||
                                                "N/A"
                                            }

                                        </p>

                                    </Card>

                                </Col>


                                {/* Total SDMs */}

                                <Col md={4}>

                                    <Card
                                        className="border-0 bg-light p-3 h-100"
                                    >

                                        <h6 className="fw-bold">

                                            Total SDMs

                                        </h6>

                                        <h3>

                                            {
                                                countryDetails.summary?.total_sdms ??
                                                0
                                            }

                                        </h3>

                                    </Card>

                                </Col>


                                {/* Sovereignty */}

                                <Col md={4}>

                                    <Card
                                        className="border-0 bg-light p-3 h-100"
                                    >

                                        <h6 className="fw-bold">

                                            Sovereignty Declarations

                                        </h6>

                                        <h3>

                                            {
                                                countryDetails.summary?.sovereignty_count ??
                                                0
                                            }

                                        </h3>

                                    </Card>

                                </Col>


                                {/* Violence */}

                                <Col md={4}>

                                    <Card
                                        className="border-0 bg-light p-3 h-100"
                                    >

                                        <h6 className="fw-bold">

                                            Movements Experiencing Violence

                                        </h6>

                                        <h3>

                                            {
                                                countryDetails.summary?.violent_count ??
                                                0
                                            }

                                        </h3>

                                    </Card>

                                </Col>


                                {/* Started Violence */}

                                <Col md={4}>

                                    <Card
                                        className="border-0 bg-light p-3 h-100"
                                    >

                                        <h6 className="fw-bold">

                                            Movements Starting Violence

                                        </h6>

                                        <h3>

                                            {
                                                countryDetails.summary?.started_violent_count ??
                                                0
                                            }

                                        </h3>

                                    </Card>

                                </Col>


                                {/* Peaceful */}

                                <Col md={4}>

                                    <Card
                                        className="border-0 bg-light p-3 h-100"
                                    >

                                        <h6 className="fw-bold">

                                            Remained Peaceful

                                        </h6>

                                        <h3>

                                            {
                                                countryDetails.summary?.remained_peaceful_count ??
                                                0
                                            }

                                        </h3>

                                    </Card>

                                </Col>


                                {/* Concessions */}

                                <Col md={4}>

                                    <Card
                                        className="border-0 bg-light p-3 h-100"
                                    >

                                        <h6 className="fw-bold">

                                            Concessions Received

                                        </h6>

                                        <h3>

                                            {
                                                countryDetails.summary?.concessions_count ??
                                                0
                                            }

                                        </h3>

                                    </Card>

                                </Col>


                                {/* Restrictions */}

                                <Col md={4}>

                                    <Card
                                        className="border-0 bg-light p-3 h-100"
                                    >

                                        <h6 className="fw-bold">

                                            Restrictions Faced

                                        </h6>

                                        <h3>

                                            {
                                                countryDetails.summary?.restrictions_count ??
                                                0
                                            }

                                        </h3>

                                    </Card>

                                </Col>

                            </Row>


                            {/* ========================================
                                Level 3 - Movement Records
                            ======================================== */}

                            <hr className="my-5" />

                            <h4 className="fw-bold mb-2">

                                Movement Records

                            </h4>

                            <p className="text-muted">

                                Each movement is shown once. Claim types
                                include all distinct claims recorded during
                                the movement's observed period.

                            </p>


                            {/* Methodological Note */}

                            <Alert
                                variant="light"
                                className="border"
                            >

                                <strong>
                                    Methodological Note:
                                </strong>

                                <br />

                                Group size, group concentration, and
                                power status represent the latest recorded
                                values for each movement in the SDM dataset.
                                These values are taken from the most recent
                                available observation year for each movement.

                                <br />
                                <br />

                                Claim types include all distinct claims
                                recorded across the movement's observed
                                period.

                                <br />
                                <br />

                                For movements that were still ongoing at
                                the end of the study period, an end year
                                of 2020 indicates that the movement remained
                                active through the end of the dataset.
                                Cases coded as 8888 are displayed as
                                unavailable because a consistent end year
                                could not be determined.

                            </Alert>


                            {/* ========================================
                                Movement Records
                            ======================================== */}

                            {countryDetails.movements &&
                                countryDetails.movements.length > 0 ? (

                                <div className="table-responsive">

                                    <table
                                        className="table table-bordered table-hover align-middle"
                                    >

                                        <thead className="table-light">

                                            <tr>

                                                <th>
                                                    Ethnic Group
                                                </th>

                                                <th>
                                                    Region
                                                </th>

                                                <th>
                                                    Claim Types
                                                </th>

                                                <th>
                                                    Group Size
                                                </th>

                                                <th>
                                                    Group Concentration
                                                </th>

                                                <th>
                                                    Power Status
                                                </th>

                                                <th>
                                                    Sovereignty
                                                </th>

                                                <th>
                                                    Experienced Violence
                                                </th>

                                                <th>
                                                    Started Violence
                                                </th>

                                                <th>
                                                    Concession
                                                </th>

                                                <th>
                                                    Restriction
                                                </th>

                                                <th>
                                                    Start Year
                                                </th>

                                                <th>
                                                    End Year
                                                </th>

                                            </tr>

                                        </thead>


                                        <tbody>

                                            {
                                                countryDetails.movements.map(
                                                    (movement, index) => (

                                                        <tr
                                                            key={
                                                                movement.group_id ||
                                                                index
                                                            }
                                                        >

                                                            <td>

                                                                {
                                                                    movement.group_name ||
                                                                    "N/A"
                                                                }

                                                            </td>


                                                            <td>

                                                                {
                                                                    movement.region ||
                                                                    "N/A"
                                                                }

                                                            </td>


                                                            <td>

                                                                {
                                                                    movement.claim_types ||
                                                                    "N/A"
                                                                }

                                                            </td>


                                                            <td>

                                                                {
                                                                    movement.group_size ??
                                                                    "N/A"
                                                                }

                                                            </td>


                                                            <td>

                                                                {
                                                                    movement.group_concentration ??
                                                                    "N/A"
                                                                }

                                                            </td>


                                                            <td>

                                                                {
                                                                    movement.power_status ??
                                                                    "N/A"
                                                                }

                                                            </td>


                                                            <td>

                                                                {
                                                                    binaryLabel(
                                                                        movement.sovereignty_declared
                                                                    )
                                                                }

                                                            </td>


                                                            <td>

                                                                {
                                                                    binaryLabel(
                                                                        movement.experienced_violence
                                                                    )
                                                                }

                                                            </td>


                                                            <td>

                                                                {
                                                                    binaryLabel(
                                                                        movement.started_violence
                                                                    )
                                                                }

                                                            </td>


                                                            <td>

                                                                {
                                                                    binaryLabel(
                                                                        movement.received_concession
                                                                    )
                                                                }

                                                            </td>


                                                            <td>

                                                                {
                                                                    binaryLabel(
                                                                        movement.faced_restriction
                                                                    )
                                                                }

                                                            </td>


                                                            <td>

                                                                {
                                                                    movement.start_year ??
                                                                    "N/A"
                                                                }

                                                            </td>


                                                            <td>

                                                                {
                                                                    formatEndYear(
                                                                        movement.end_year
                                                                    )
                                                                }

                                                            </td>

                                                        </tr>

                                                    )
                                                )
                                            }

                                        </tbody>

                                    </table>

                                </div>

                            ) : (

                                <Alert variant="secondary">

                                    No movement records were found
                                    for this country.

                                </Alert>

                            )}

                        </>

                    )}

                </Card>

            )}

        </Container>

    );

}

export default GlobePage;