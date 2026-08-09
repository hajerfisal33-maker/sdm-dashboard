import { useState } from "react";
import GlobeComponent from "react-globe.gl";
import { Container, Card, Badge } from "react-bootstrap";

function Globe() {

    const [selectedCountry, setSelectedCountry] = useState(null);

    // بيانات تجريبية مؤقتة
    // حنربطها بالـ Node.js API بعدين
    const countries = [
        {
            id: 1,
            name: "Sudan",
            lat: 15.5007,
            lng: 32.5599,
            movements: 5
        },
        {
            id: 2,
            name: "United Kingdom",
            lat: 55.3781,
            lng: -3.4360,
            movements: 8
        },
        {
            id: 3,
            name: "India",
            lat: 20.5937,
            lng: 78.9629,
            movements: 12
        },
        {
            id: 4,
            name: "Spain",
            lat: 40.4637,
            lng: -3.7492,
            movements: 4
        },
        {
            id: 5,
            name: "Canada",
            lat: 56.1304,
            lng: -106.3468,
            movements: 6
        }
    ];

    return (
        <Container className="mt-5 mb-5">

            {/* ================= Header ================= */}

            <div className="mb-4">

                <Badge
                    bg="primary"
                    className="px-3 py-2 fs-6 rounded-pill mb-2"
                >
                    Global SDM Distribution
                </Badge>

                <h1 className="fw-bold">
                    Self-Determination Movements Around the World
                </h1>

                <p className="lead text-muted">
                    Explore the geographical distribution of self-determination
                    movements and select a country to examine its movements
                    and related characteristics.
                </p>

            </div>


            {/* ================= Globe ================= */}

            <Card className="shadow-sm border-0 rounded-4 p-3 mb-4">

                <h4 className="fw-bold px-2 pt-2">
                    Interactive Globe
                </h4>

                <p className="text-muted px-2">
                    Rotate the globe and select a country to explore
                    self-determination movements.
                </p>

                <div
                    style={{
                        width: "100%",
                        height: "650px",
                        overflow: "hidden"
                    }}
                >

                    <GlobeComponent

                        width={window.innerWidth > 1200 ? 1100 : 700}
                        height={600}

                        backgroundColor="#ffffff"

                        globeImageUrl="//unpkg.com/three-globe/example/img/earth-blue-marble.jpg"

                        bumpImageUrl="//unpkg.com/three-globe/example/img/earth-topology.png"

                        showAtmosphere={true}

                        atmosphereColor="#4da6ff"

                        atmosphereAltitude={0.15}


                        /* ================= Country Points ================= */

                        pointsData={countries}

                        pointLat="lat"

                        pointLng="lng"

                        pointAltitude={0.02}

                        pointRadius={0.5}

                        pointColor={() => "#dc3545"}

                        pointLabel={(country) => `
                            <div>
                                <strong>${country.name}</strong>
                                <br/>
                                Movements: ${country.movements}
                            </div>
                        `}

                        onPointClick={(country) => {

                            setSelectedCountry(country);

                        }}

                    />

                </div>

            </Card>


            {/* ================= Selected Country ================= */}

            {selectedCountry && (

                <Card className="shadow-sm border-0 rounded-4 p-4">

                    <Badge
                        bg="success"
                        className="mb-2"
                    >
                        Selected Country
                    </Badge>

                    <h2 className="fw-bold">
                        {selectedCountry.name}
                    </h2>

                    <p className="text-muted">
                        Number of self-determination movements:
                    </p>

                    <h3 className="fw-bold text-primary">
                        {selectedCountry.movements}
                    </h3>

                </Card>

            )}

        </Container>
    );
}

export default Globe;