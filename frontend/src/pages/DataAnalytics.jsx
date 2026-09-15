import {
    Container,
    Row,
    Col,
    Card,
    Badge
} from "react-bootstrap";

import { Link } from "react-router-dom";

function DataAnalytics() {

    const analyticsPages = [

        {
            number: "01",
            title: "Geographical & Historical Distribution",
            description:
                "Explore the geographical distribution of self-determination movements and their historical patterns across countries, regions, and years.",
            path: "/bq1"
        },

        {
            number: "02",
            title: "Claims & Movement Duration",
            description:
                "Examine dominant self-determination claims and explore patterns in movement duration.",
            path: "/bq2"
        },

        {
            number: "03",
            title: "Sovereignty Declarations",
            description:
                "Analyze movements associated with sovereignty declarations and examine their distribution across the dataset.",
            path: "/bq3"
        },

        {
            number: "04",
            title: "Violence & Conflict Dynamics",
            description:
                "Explore violence, escalation, and the relationship between peaceful and violent movement trajectories.",
            path: "/bq4"
        },

        {
            number: "05",
            title: "Government Concessions",
            description:
                "Analyze government concessions and examine how they relate to different self-determination claims.",
            path: "/bq5"
        },

        {
            number: "06",
            title: "Government Restrictions",
            description:
                "Explore government restrictions affecting self-determination movements and compare patterns across claim types.",
            path: "/bq6"
        },

        {
            number: "07",
            title: "Group Characteristics",
            description:
                "Examine movement characteristics including group size, concentration, and political participation.",
            path: "/bq7"
        }

    ];


    return (

        <div className="analytics-page">

            <Container className="py-5">

                {/* Header */}

                <div className="analytics-header text-center mb-5">

                    <Badge
                        bg="primary"
                        className="analytics-badge mb-3"
                    >
                        DATA ANALYTICS
                    </Badge>

                    <h1 className="analytics-title">
                        Explore the SDM Dataset
                    </h1>

                    <p className="analytics-subtitle">
                        Select an analytical dimension to explore
                        the self-determination movements dataset
                        through interactive visualizations.
                    </p>

                </div>


                {/* Analytics Cards */}

                <Row className="g-4">

                    {analyticsPages.map((page) => (

                        <Col
                            key={page.number}
                            xs={12}
                            md={6}
                            lg={6}
                        >

                            <Link
                                to={page.path}
                                className="analytics-card-link"
                            >

                                <Card
                                    className="analytics-card h-100 border-0 shadow-sm"
                                >

                                    <Card.Body>

                                        <div className="analytics-card-number">
                                            {page.number}
                                        </div>

                                        <h3 className="analytics-card-title">
                                            {page.title}
                                        </h3>

                                        <p className="analytics-card-description">
                                            {page.description}
                                        </p>

                                        <div className="analytics-card-action">
                                            Explore analysis
                                            <span>→</span>
                                        </div>

                                    </Card.Body>

                                </Card>

                            </Link>

                        </Col>

                    ))}

                </Row>

            </Container>

        </div>

    );
}

export default DataAnalytics;