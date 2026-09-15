import React from "react";
import {
    Container,
    Row,
    Col,
    Card,
    Badge
} from "react-bootstrap";

function About() {

    const researchDimensions = [
        {
            number: "01",
            title: "Geographical & Historical",
            description:
                "The geographical and temporal distribution of self-determination movements across countries, regions, and the period covered by the dataset."
        },
        {
            number: "02",
            title: "Political Claims",
            description:
                "The types of self-determination claims pursued by movements, including different forms of political and territorial demands."
        },
        {
            number: "03",
            title: "Conflict & Violence",
            description:
                "Violence involvement, escalation, and the onset of violent conflict associated with self-determination movements."
        },
        {
            number: "04",
            title: "Government Responses",
            description:
                "Governmental concessions and restrictions affecting the political and cultural rights associated with self-determination demands."
        },
        {
            number: "05",
            title: "Group Characteristics",
            description:
                "Structural characteristics of the groups represented in the dataset, including group size, geographic concentration, and political power."
        },
        {
            number: "06",
            title: "Sovereignty",
            description:
                "The occurrence of unilateral sovereignty declarations and their relationship with movement characteristics and claim types."
        }
    ];

    const systemComponents = [
        {
            title: "Data Preparation",
            icon: "01",
            description:
                "The original SDM data is prepared and validated before being incorporated into the database structure used by the platform."
        },
        {
            title: "Database Layer",
            icon: "02",
            description:
                "A relational MySQL database organizes countries, ethnic groups, and movement observations to support structured analytical queries."
        },
        {
            title: "Backend Services",
            icon: "03",
            description:
                "A Node.js and Express backend connects the analytical interface to the database and provides API endpoints for retrieving research results."
        },
        {
            title: "Interactive Interface",
            icon: "04",
            description:
                "A React-based interface presents the processed results through interactive visualizations, geographical exploration, and analytical sections."
        }
    ];

    return (
        <Container className="about-page mt-5 mb-5">

            {/* =====================================================
                HERO
            ====================================================== */}

            <section className="about-hero mb-5">

                <div className="about-hero-inner">

                    <Badge
                        bg="primary"
                        className="px-3 py-2 rounded-pill mb-3"
                    >
                        Research Context
                    </Badge>

                    <h1 className="display-4 fw-bold text-dark mb-3">
                        About the Research
                    </h1>

                    <p
                        className="lead text-muted mb-0"
                        style={{ maxWidth: "850px" }}
                    >
                        An Information Systems and data analytics project
                        focused on transforming complex self-determination
                        movement data into an accessible, structured, and
                        interactive research environment.
                    </p>

                </div>

            </section>


            {/* =====================================================
                RESEARCH CONTEXT
            ====================================================== */}

            <section className="mb-5">

                <Row className="g-4 align-items-stretch">

                    <Col lg={7}>

                        <Card className="about-content-card border-0 shadow-sm rounded-4 h-100">

                            <Card.Body className="p-4 p-lg-5">

                                <Badge
                                    bg="light"
                                    text="primary"
                                    className="px-3 py-2 rounded-pill mb-3"
                                >
                                    Research Context
                                </Badge>

                                <h2 className="fw-bold mb-4">
                                    From Complex Data to Research Insight
                                </h2>

                                <p className="text-muted">
                                    Research datasets on self-determination
                                    movements contain a large number of
                                    political, historical, geographical,
                                    conflict-related, and group-level
                                    variables. Although such datasets provide
                                    valuable empirical information, their
                                    complexity can make direct exploration
                                    difficult.
                                </p>

                                <p className="text-muted mb-0">
                                    This research addresses this information
                                    accessibility challenge by developing an
                                    interactive, database-backed dashboard
                                    that organizes selected SDM 2.0 variables
                                    into clearly defined analytical areas.
                                    The system is intended to support
                                    structured exploration and interpretation
                                    of the dataset without requiring users to
                                    work directly with the underlying raw
                                    tables.
                                </p>

                            </Card.Body>

                        </Card>

                    </Col>


                    <Col lg={5}>

                        <Card className="about-highlight-card border-0 shadow-sm rounded-4 h-100">

                            <Card.Body className="p-4 p-lg-5">

                                <div className="about-stat-label mb-3">
                                    DATASET IN FOCUS
                                </div>

                                <h3 className="fw-bold mb-4">
                                    SDM 2.0
                                </h3>

                                <div className="about-stat mb-4">
                                    <span className="about-stat-number">
                                        502
                                    </span>
                                    <span className="about-stat-text">
                                        self-determination movements
                                    </span>
                                </div>

                                <div className="about-stat mb-4">
                                    <span className="about-stat-number">
                                        124
                                    </span>
                                    <span className="about-stat-text">
                                        countries
                                    </span>
                                </div>

                                <div className="about-stat">
                                    <span className="about-stat-number">
                                        1945–2020
                                    </span>
                                    <span className="about-stat-text">
                                        historical coverage
                                    </span>
                                </div>

                            </Card.Body>

                        </Card>

                    </Col>

                </Row>

            </section>


            {/* =====================================================
                ABOUT DATASET
            ====================================================== */}

            <section className="mb-5">

                <Card className="about-content-card border-0 shadow-sm rounded-4">

                    <Card.Body className="p-4 p-lg-5">

                        <div className="d-flex align-items-center mb-4">

                            <div className="about-section-icon">
                                📊
                            </div>

                            <div className="ms-3">

                                <Badge
                                    bg="light"
                                    text="dark"
                                    className="px-3 py-2 rounded-pill mb-2"
                                >
                                    Data Source
                                </Badge>

                                <h2 className="fw-bold mb-0">
                                    The SDM 2.0 Dataset
                                </h2>

                            </div>

                        </div>

                        <Row className="g-4">

                            <Col lg={6}>

                                <p className="text-muted">
                                    SDM 2.0 is a global research dataset
                                    covering self-determination movements
                                    associated with ethnic groups. It provides
                                    information on movements and their
                                    political claims across countries and
                                    over time.
                                </p>

                                <p className="text-muted mb-0">
                                    The dataset covers the historical period
                                    from 1945 to 2020 and includes movements
                                    pursuing different forms of
                                    self-determination.
                                </p>

                            </Col>

                            <Col lg={6}>

                                <p className="text-muted">
                                    In addition to political claims, the data
                                    includes variables related to violence,
                                    sovereignty declarations, government
                                    responses, and structural characteristics
                                    of the groups involved.
                                </p>

                                <p className="text-muted mb-0">
                                    These dimensions provide the empirical
                                    basis for the analytical sections
                                    implemented in the dashboard.
                                </p>

                            </Col>

                        </Row>

                    </Card.Body>

                </Card>

            </section>


            {/* =====================================================
                RESEARCH PURPOSE
            ====================================================== */}

            <section className="mb-5">

                <Row className="g-4">

                    <Col lg={5}>

                        <div className="about-section-heading h-100">

                            <Badge
                                bg="primary"
                                className="px-3 py-2 rounded-pill mb-3"
                            >
                                Research Purpose
                            </Badge>

                            <h2 className="fw-bold mb-3">
                                Why Was the System Developed?
                            </h2>

                            <p className="text-muted">
                                The main purpose is to improve the
                                accessibility and interpretability of a
                                complex research dataset through an
                                information system designed for analytical
                                exploration.
                            </p>

                        </div>

                    </Col>


                    <Col lg={7}>

                        <Card className="border-0 shadow-sm rounded-4 h-100">

                            <Card.Body className="p-4 p-lg-5">

                                <div className="about-purpose-item mb-4">

                                    <span className="purpose-number">
                                        01
                                    </span>

                                    <div>
                                        <h5 className="fw-bold">
                                            Improve Data Accessibility
                                        </h5>

                                        <p className="text-muted mb-0">
                                            Present selected research
                                            variables in a structured
                                            interface rather than requiring
                                            direct interaction with complex
                                            raw data tables.
                                        </p>
                                    </div>

                                </div>


                                <div className="about-purpose-item mb-4">

                                    <span className="purpose-number">
                                        02
                                    </span>

                                    <div>
                                        <h5 className="fw-bold">
                                            Support Exploratory Analysis
                                        </h5>

                                        <p className="text-muted mb-0">
                                            Help users identify distributions,
                                            patterns, differences, and
                                            relationships that can guide
                                            further research.
                                        </p>
                                    </div>

                                </div>


                                <div className="about-purpose-item">

                                    <span className="purpose-number">
                                        03
                                    </span>

                                    <div>
                                        <h5 className="fw-bold">
                                            Integrate Research Data and
                                            Visualization
                                        </h5>

                                        <p className="text-muted mb-0">
                                            Connect a structured database and
                                            analytical queries with an
                                            interactive visualization layer.
                                        </p>
                                    </div>

                                </div>

                            </Card.Body>

                        </Card>

                    </Col>

                </Row>

            </section>


            {/* =====================================================
                ANALYTICAL SCOPE
            ====================================================== */}

            <section className="mb-5">

                <div className="text-center mb-4">

                    <Badge
                        bg="dark"
                        className="px-3 py-2 rounded-pill mb-3"
                    >
                        Analytical Scope
                    </Badge>

                    <h2 className="fw-bold">
                        Research Dimensions
                    </h2>

                    <p
                        className="text-muted mx-auto"
                        style={{ maxWidth: "760px" }}
                    >
                        The dashboard translates the dataset into several
                        complementary analytical dimensions rather than
                        treating the data as a single undifferentiated
                        collection of variables.
                    </p>

                </div>


                <Row className="g-4">

                    {researchDimensions.map((item) => (

                        <Col md={6} lg={4} key={item.number}>

                            <Card className="about-dimension-card border-0 shadow-sm rounded-4 h-100">

                                <Card.Body className="p-4">

                                    <div className="about-dimension-number mb-4">
                                        {item.number}
                                    </div>

                                    <h5 className="fw-bold mb-3">
                                        {item.title}
                                    </h5>

                                    <p className="text-muted small mb-0">
                                        {item.description}
                                    </p>

                                </Card.Body>

                            </Card>

                        </Col>

                    ))}

                </Row>

            </section>


            {/* =====================================================
                SYSTEM APPROACH
            ====================================================== */}

            <section className="mb-5">

                <Card className="about-system-card border-0 shadow-sm rounded-4">

                    <Card.Body className="p-4 p-lg-5">

                        <div className="text-center mb-5">

                            <Badge
                                bg="light"
                                text="primary"
                                className="px-3 py-2 rounded-pill mb-3"
                            >
                                Information System Structure
                            </Badge>

                            <h2 className="fw-bold">
                                From Data to Interactive Analysis
                            </h2>

                            <p
                                className="text-muted mx-auto mb-0"
                                style={{ maxWidth: "750px" }}
                            >
                                The platform combines data preparation,
                                relational database storage, backend
                                services, and an interactive frontend.
                            </p>

                        </div>


                        <Row className="g-4">

                            {systemComponents.map((item) => (

                                <Col md={6} lg={3} key={item.icon}>

                                    <div className="about-system-step h-100">

                                        <div className="system-step-number">
                                            {item.icon}
                                        </div>

                                        <h5 className="fw-bold mt-4 mb-3">
                                            {item.title}
                                        </h5>

                                        <p className="text-muted small mb-0">
                                            {item.description}
                                        </p>

                                    </div>

                                </Col>

                            ))}

                        </Row>

                    </Card.Body>

                </Card>

            </section>


            {/* =====================================================
                RESEARCH CHARACTER
            ====================================================== */}

            <section className="mb-5">

                <Row className="g-4">

                    <Col lg={6}>

                        <Card className="border-0 shadow-sm rounded-4 h-100">

                            <Card.Body className="p-4 p-lg-5">

                                <Badge
                                    bg="light"
                                    text="success"
                                    className="px-3 py-2 rounded-pill mb-3"
                                >
                                    Research-Oriented Design
                                </Badge>

                                <h3 className="fw-bold mb-3">
                                    Designed for Exploration
                                </h3>

                                <p className="text-muted">
                                    The platform is designed as a research
                                    support system. Its visualizations help
                                    users examine the distribution of
                                    movements, compare selected dimensions,
                                    and explore relationships between
                                    political, conflict-related, governmental,
                                    and structural variables.
                                </p>

                                <p className="text-muted mb-0">
                                    The dashboard therefore emphasizes
                                    structured presentation and exploratory
                                    analysis rather than replacing formal
                                    statistical or qualitative research.
                                </p>

                            </Card.Body>

                        </Card>

                    </Col>


                    <Col lg={6}>

                        <Card className="border-0 shadow-sm rounded-4 h-100">

                            <Card.Body className="p-4 p-lg-5">

                                <Badge
                                    bg="light"
                                    text="warning"
                                    className="px-3 py-2 rounded-pill mb-3"
                                >
                                    Analytical Boundaries
                                </Badge>

                                <h3 className="fw-bold mb-3">
                                    Interpreting the Results
                                </h3>

                                <p className="text-muted">
                                    The dashboard presents descriptive
                                    summaries and selected statistical
                                    analyses based on the variables and
                                    observations available in SDM 2.0.
                                </p>

                                <p className="text-muted mb-0">
                                    Because the dataset contains both
                                    movement-level characteristics and
                                    time-varying observations, different
                                    analytical sections may operate at
                                    different levels of analysis. Results
                                    should therefore be interpreted according
                                    to the specific measure and analytical
                                    definition used in each section.
                                </p>

                            </Card.Body>

                        </Card>

                    </Col>

                </Row>

            </section>


            {/* =====================================================
                DATA INTERPRETATION NOTE
            ====================================================== */}

            <section>

                <Card className="about-note-card border-0 rounded-4">

                    <Card.Body className="p-4 p-lg-5">

                        <Row className="align-items-start">

                            <Col lg={1} className="text-center mb-3 mb-lg-0">

                                <div className="about-note-icon">
                                    ℹ
                                </div>

                            </Col>

                            <Col lg={11}>

                                <h5 className="fw-bold mb-3">
                                    Note on Data Interpretation
                                </h5>

                                <p className="text-muted mb-0">
                                    The dashboard should be understood as an
                                    interactive research interface built on
                                    the SDM 2.0 dataset. Counts and summaries
                                    may represent distinct movements,
                                    movement-year observations, or recorded
                                    events depending on the analytical
                                    question. These measures are therefore
                                    not necessarily equivalent and should be
                                    interpreted using the definitions
                                    provided within the relevant analytical
                                    section and the SDM 2.0 Codebook.
                                </p>

                            </Col>

                        </Row>

                    </Card.Body>

                </Card>

            </section>

        </Container>
    );
}

export default About;