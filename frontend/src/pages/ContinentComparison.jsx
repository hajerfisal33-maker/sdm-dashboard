import {
    Container,
    Row,
    Col,
    Card,
    Badge
} from "react-bootstrap";

function ContinentComparison() {

    return (

        <div className="continent-comparison-page">

            <Container className="py-5">

                {/* Header */}

                <div className="continent-comparison-header text-center mb-5">

                    <Badge
                        bg="primary"
                        className="continent-comparison-badge mb-3"
                    >
                        CONTINENT COMPARISON
                    </Badge>

                    <h1 className="continent-comparison-title">
                        Compare Continents
                    </h1>

                    <p className="continent-comparison-subtitle">
                        Compare self-determination movement patterns
                        across continents using key indicators from
                        the SDM 2.0 dataset.
                    </p>

                </div>


                {/* Coming Analysis Area */}

                <Row className="g-4">

                    <Col xs={12}>

                        <Card className="continent-analysis-card border-0 shadow-sm">

                            <Card.Body className="p-5">

                                <div className="continent-analysis-label">
                                    CONTINENTAL ANALYSIS
                                </div>

                                <h2 className="continent-analysis-title">
                                    Continental Comparison
                                </h2>

                                <p className="continent-analysis-text">
                                    This section will present comparative
                                    information about self-determination
                                    movements across continents. The
                                    analysis will include movement counts
                                    and selected indicators related to
                                    sovereignty, violence, government
                                    concessions, and restrictions.
                                </p>

                                <div className="continent-status-box">

                                    <span className="continent-status-icon">
                                        🌎
                                    </span>

                                    <div>

                                        <strong>
                                            Analysis data
                                        </strong>

                                        <p>
                                            Continental data will be
                                            loaded from the SDM database.
                                        </p>

                                    </div>

                                </div>

                            </Card.Body>

                        </Card>

                    </Col>

                </Row>

            </Container>

        </div>

    );
}

export default ContinentComparison;