import { useState } from "react";
import { Container, Card, Row, Col, Badge } from "react-bootstrap";

function Globe() {

    const [selectedCountry, setSelectedCountry] = useState(null);

    return (
        <Container className="mt-5 mb-5">

            {/* Header */}
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

            {/* Globe */}
            <Card className="shadow-sm border-0 rounded-4 p-4 mb-4">

                <h4 className="fw-bold mb-3">
                    Interactive Globe
                </h4>

                <div
                    style={{
                        height: "600px",
                        background: "#f8f9fa",
                        borderRadius: "20px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center"
                    }}
                >

                    <h2 className="text-muted">
                        🌍 Interactive Globe
                    </h2>

                </div>

            </Card>

            {/* Country Information */}
            {selectedCountry && (

                <Card className="shadow-sm border-0 rounded-4 p-4">

                    <h3 className="fw-bold">
                        {selectedCountry}
                    </h3>

                    <p className="text-muted">
                        Country information will appear here.
                    </p>

                </Card>

            )}

        </Container>
    );
}

export default Globe;