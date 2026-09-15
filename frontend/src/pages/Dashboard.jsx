import {
    Container,
    Row,
    Col,
    Card,
    Badge
} from "react-bootstrap";

import { Link } from "react-router-dom";


function Dashboard() {

    const analyticalSections = [
        {
            number: "01",
            title: "Geographical & Historical Distribution",
            description:
                "Explore where self-determination movements are distributed across countries, regions, and historical years.",
            path: "/bq1",
            className: "dashboard-card-primary"
        },
        {
            number: "02",
            title: "Claims & Movement Duration",
            description:
                "Examine the types of self-determination claims and the duration of movement activity across claim categories.",
            path: "/bq2",
            className: "dashboard-card-primary"
        },
        {
            number: "03",
            title: "Sovereignty Declarations",
            description:
                "Explore unilateral sovereignty declarations and their relationship with movement claim types.",
            path: "/bq3",
            className: "dashboard-card-primary"
        },
        {
            number: "04",
            title: "Violence & Conflict Dynamics",
            description:
                "Examine violence, escalation, and the onset of armed conflict among self-determination movements.",
            path: "/bq4",
            className: "dashboard-card-danger"
        },
        {
            number: "05",
            title: "Government Concessions",
            description:
                "Explore government responses that increase ethnic rights through cultural, autonomy, or independence-related concessions.",
            path: "/bq5",
            className: "dashboard-card-success"
        },
        {
            number: "06",
            title: "Government Restrictions",
            description:
                "Examine government responses that restrict cultural, autonomy, or independence-related rights.",
            path: "/bq6",
            className: "dashboard-card-warning"
        },
        {
            number: "07",
            title: "Group Characteristics",
            description:
                "Explore group size, geographic concentration, and political power characteristics associated with movements.",
            path: "/bq7",
            className: "dashboard-card-info"
        }
    ];


    return (

        <Container className="dashboard-page mt-5 mb-5">


            {/* =====================================================
                HEADER
            ====================================================== */}

            <div className="dashboard-header mb-5">

                <Badge
                    bg="primary"
                    className="px-3 py-2 rounded-pill mb-3"
                >
                    Research Dashboard
                </Badge>

                <h1 className="fw-bold text-dark mb-3">
                    Explore the SDM 2.0 Dataset
                </h1>

                <p className="lead text-muted mb-0">
                    Navigate the dashboard to explore self-determination
                    movements geographically, compare countries and
                    continents, and examine key political and conflict
                    patterns in the dataset.
                </p>

            </div>


            {/* =====================================================
                EXPLORATION HUB
            ====================================================== */}

            <section className="mb-5">

                <div className="mb-4">

                    <h2 className="fw-bold">
                        Explore
                    </h2>

                    <p className="text-muted">
                        Start by exploring the movements geographically
                        or comparing patterns across countries and
                        continents.
                    </p>

                </div>


                <Row className="g-4">


                    {/* COUNTRY EXPLORATION */}

                    <Col lg={6}>

                        <Card
                            as={Link}
                            to="/globe"
                            className="dashboard-explore-card h-100 text-decoration-none shadow-sm border-0 rounded-4"
                        >

                            <Card.Body className="p-4 p-lg-5">

                                <div className="dashboard-explore-icon mb-4">
                                    🌍
                                </div>

                                <Badge
                                    bg="light"
                                    text="primary"
                                    className="mb-3 px-3 py-2 rounded-pill"
                                >
                                    Geographic Exploration
                                </Badge>

                                <h3 className="fw-bold text-dark mb-3">
                                    Explore Countries
                                </h3>

                                <p className="text-muted mb-4">
                                    Explore self-determination movements
                                    through the interactive globe, select
                                    individual countries, and examine
                                    movement-level details.
                                </p>

                                <div className="fw-semibold text-primary">
                                    Explore the Globe →
                                </div>

                            </Card.Body>

                        </Card>

                    </Col>


                    {/* CONTINENT COMPARISON */}

                    <Col lg={6}>

                        <Card
                            as={Link}
                            to="/continent-comparison"
                            className="dashboard-explore-card h-100 text-decoration-none shadow-sm border-0 rounded-4"
                        >

                            <Card.Body className="p-4 p-lg-5">

                                <div className="dashboard-explore-icon mb-4">
                                    🌎
                                </div>

                                <Badge
                                    bg="light"
                                    text="success"
                                    className="mb-3 px-3 py-2 rounded-pill"
                                >
                                    Continental Analysis
                                </Badge>

                                <h3 className="fw-bold text-dark mb-3">
                                    Compare Continents
                                </h3>

                                <p className="text-muted mb-4">
                                    Compare self-determination movements
                                    across continents and examine how
                                    movement characteristics and political
                                    patterns differ geographically.
                                </p>

                                <div className="fw-semibold text-success">
                                    Compare Continents →
                                </div>

                            </Card.Body>

                        </Card>

                    </Col>

                </Row>

            </section>


            {/* =====================================================
                COUNTRY COMPARISON
            ====================================================== */}

            <section className="mb-5">

                <Card className="border-0 shadow-sm rounded-4">

                    <Card.Body className="p-4 p-lg-5">

                        <Row className="align-items-center">

                            <Col lg={8}>

                                <Badge
                                    bg="light"
                                    text="dark"
                                    className="px-3 py-2 rounded-pill mb-3"
                                >
                                    Comparative Analysis
                                </Badge>

                                <h3 className="fw-bold mb-3">
                                    Compare Countries
                                </h3>

                                <p className="text-muted mb-lg-0">
                                    Select two countries from the interactive
                                    globe and compare their self-determination
                                    movements across key indicators such as
                                    violence, sovereignty declarations,
                                    concessions, and restrictions.
                                </p>

                            </Col>


                            <Col
                                lg={4}
                                className="text-lg-end mt-4 mt-lg-0"
                            >

                                <Link
                                    to="/globe"
                                    className="btn btn-primary rounded-pill px-4 py-2"
                                >
                                    Start with the Globe →
                                </Link>

                            </Col>

                        </Row>

                    </Card.Body>

                </Card>

            </section>


            {/* =====================================================
                ANALYTICAL SECTIONS
            ====================================================== */}

            <section>

                <div className="mb-4">

                    <h2 className="fw-bold">
                        Analytical Questions
                    </h2>

                    <p className="text-muted">
                        The analytical sections organize the dataset into
                        seven research-focused areas covering geography,
                        claims, conflict, government responses, and group
                        characteristics.
                    </p>

                </div>


                <Row className="g-4">

                    {analyticalSections.map((section) => (

                        <Col
                            key={section.number}
                            md={6}
                            lg={4}
                        >

                            <Card
                                as={Link}
                                to={section.path}
                                className={`analytical-dashboard-card ${section.className} h-100 text-decoration-none shadow-sm border-0 rounded-4`}
                            >

                                <Card.Body className="p-4">

                                    <div className="d-flex justify-content-between align-items-start mb-4">

                                        <span className="dashboard-section-number">
                                            {section.number}
                                        </span>

                                        <span className="dashboard-arrow">
                                            →
                                        </span>

                                    </div>


                                    <h5 className="fw-bold text-dark mb-3">
                                        {section.title}
                                    </h5>


                                    <p className="text-muted small mb-0">
                                        {section.description}
                                    </p>

                                </Card.Body>

                            </Card>

                        </Col>

                    ))}

                </Row>

            </section>


            {/* =====================================================
                DATA NOTE
            ====================================================== */}

            <div className="dashboard-data-note mt-5">

                <p className="text-muted small mb-0">

                    <strong>Reading the dashboard:</strong>{" "}
                    Depending on the research question, visualizations
                    may summarize distinct self-determination movements
                    or annual movement observations. Results should
                    therefore be interpreted according to the analytical
                    level used by each section.

                </p>

            </div>


        </Container>

    );

}


export default Dashboard;