import {
    Container,
    Row,
    Col,
    Card,
    Badge
} from "react-bootstrap";

import { Link } from "react-router-dom";

function Comparisons() {

    return (

        <div className="comparisons-page">

            <Container className="py-5">

                {/* Header */}

                <div className="comparisons-header text-center mb-5">

                    <Badge
                        bg="dark"
                        className="comparisons-badge mb-3"
                    >
                        COMPARISONS
                    </Badge>

                    <h1 className="comparisons-title">
                        Compare SDM Patterns
                    </h1>

                    <p className="comparisons-subtitle">
                        Compare movements across countries and
                        continents to identify differences in
                        self-determination patterns.
                    </p>

                </div>


                {/* Comparison Options */}

                <Row className="g-4 justify-content-center">

                    {/* Country Comparison */}

                    <Col
                        xs={12}
                        md={6}
                        lg={5}
                    >

                        <Link
                            to="/globe"
                            className="comparison-card-link"
                        >

                            <Card className="comparison-card border-0 shadow-sm h-100">

                                <Card.Body>

                                    <div className="comparison-icon">
                                        🌍
                                    </div>

                                    <div className="comparison-number">
                                        01
                                    </div>

                                    <h2 className="comparison-title">
                                        Compare Countries
                                    </h2>

                                    <p className="comparison-description">
                                        Select countries from the
                                        interactive globe and compare
                                        their SDM characteristics,
                                        violence, sovereignty,
                                        concessions, and restrictions.
                                    </p>

                                    <div className="comparison-action">
                                        Explore countries
                                        <span>→</span>
                                    </div>

                                </Card.Body>

                            </Card>

                        </Link>

                    </Col>


                    {/* Continent Comparison */}

                    <Col
                        xs={12}
                        md={6}
                        lg={5}
                    >

                        <Link
                            to="/continent-comparison"
                            className="comparison-card-link"
                        >

                            <Card className="comparison-card border-0 shadow-sm h-100">

                                <Card.Body>

                                    <div className="comparison-icon">
                                        🌎
                                    </div>

                                    <div className="comparison-number">
                                        02
                                    </div>

                                    <h2 className="comparison-title">
                                        Compare Continents
                                    </h2>

                                    <p className="comparison-description">
                                        Compare SDM patterns across
                                        continents using movement,
                                        sovereignty, violence,
                                        concession, and restriction
                                        indicators.
                                    </p>

                                    <div className="comparison-action">
                                        Compare continents
                                        <span>→</span>
                                    </div>

                                </Card.Body>

                            </Card>

                        </Link>

                    </Col>

                </Row>

            </Container>

        </div>

    );
}

export default Comparisons;