import React from "react";
import {
    Container,
    Row,
    Col,
    Card,
    Badge
} from "react-bootstrap";

import { Link } from "react-router-dom";

function About() {

    const topics = [
        {
            icon: "🌍",
            title: "Geographical Distribution",
            text: "Explore self-determination movements across countries and regions around the world."
        },
        {
            icon: "📜",
            title: "Political Claims",
            text: "Discover the different types of claims pursued by self-determination movements."
        },
        {
            icon: "⚔️",
            title: "Violence & Conflict",
            text: "Explore patterns of violence, escalation, and conflict associated with movements."
        },
        {
            icon: "🏛️",
            title: "Government Responses",
            text: "Examine government concessions and restrictions related to self-determination demands."
        },
        {
            icon: "🕊️",
            title: "Sovereignty",
            text: "Explore sovereignty declarations and their relationship with movements and political claims."
        },
        {
            icon: "👥",
            title: "Group Characteristics",
            text: "Learn about characteristics such as group size, geographic concentration, and political power."
        }
    ];

    return (

        <div
            style={{
                minHeight: "100vh",
                background: "#f7f9fc",
                color: "#172033"
            }}
        >

            {/* =====================================================
                HERO
            ====================================================== */}

            <section
                style={{
                    position: "relative",
                    overflow: "hidden",
                    background:
                        "linear-gradient(135deg, #0f172a 0%, #172554 55%, #1e3a8a 100%)",
                    padding: "90px 0 100px"
                }}
            >

                {/* Background decoration */}

                <div
                    style={{
                        position: "absolute",
                        width: "420px",
                        height: "420px",
                        borderRadius: "50%",
                        border: "1px solid rgba(255,255,255,0.08)",
                        right: "-160px",
                        top: "-180px"
                    }}
                />

                <div
                    style={{
                        position: "absolute",
                        width: "300px",
                        height: "300px",
                        borderRadius: "50%",
                        border: "1px solid rgba(255,255,255,0.06)",
                        left: "-150px",
                        bottom: "-150px"
                    }}
                />

                <Container
                    style={{
                        position: "relative",
                        zIndex: 2
                    }}
                >

                    <Row>

                        <Col
                            lg={8}
                            className="mx-auto text-center"
                        >

                            <Badge
                                style={{
                                    background: "rgba(255,255,255,0.12)",
                                    color: "#dbeafe",
                                    border: "1px solid rgba(255,255,255,0.12)",
                                    padding: "10px 18px",
                                    borderRadius: "999px",
                                    fontWeight: "600",
                                    marginBottom: "24px"
                                }}
                            >
                                SDM 2.0 Data Platform
                            </Badge>

                            <h1
                                style={{
                                    color: "#ffffff",
                                    fontSize: "clamp(2.6rem, 6vw, 4.8rem)",
                                    fontWeight: "800",
                                    letterSpacing: "-2px",
                                    lineHeight: "1.05",
                                    marginBottom: "25px"
                                }}
                            >
                                About the Platform
                            </h1>

                            <p
                                style={{
                                    color: "rgba(255,255,255,0.78)",
                                    fontSize: "1.12rem",
                                    lineHeight: "1.8",
                                    maxWidth: "760px",
                                    margin: "0 auto"
                                }}
                            >
                                An interactive platform for exploring
                                self-determination movements, their political
                                claims, geographical distribution, conflict
                                patterns, and government responses.
                            </p>

                        </Col>

                    </Row>

                </Container>

            </section>


            {/* =====================================================
                INTRODUCTION
            ====================================================== */}

            <section
                style={{
                    padding: "70px 0 30px"
                }}
            >

                <Container>

                    <Row
                        className="g-4 align-items-stretch"
                    >

                        <Col lg={7}>

                            <Card
                                style={{
                                    height: "100%",
                                    border: "1px solid #e8edf5",
                                    borderRadius: "24px",
                                    background: "#ffffff",
                                    boxShadow: "0 8px 30px rgba(15,23,42,0.05)"
                                }}
                            >

                                <Card.Body
                                    style={{
                                        padding: "42px"
                                    }}
                                >

                                    <Badge
                                        style={{
                                            background: "#eef4ff",
                                            color: "#2563eb",
                                            padding: "9px 15px",
                                            borderRadius: "999px",
                                            marginBottom: "18px"
                                        }}
                                    >
                                        About SDM 2.0
                                    </Badge>

                                    <h2
                                        style={{
                                            fontWeight: "750",
                                            marginBottom: "20px",
                                            color: "#111827"
                                        }}
                                    >
                                        Exploring Self-Determination Movements
                                    </h2>

                                    <p
                                        style={{
                                            color: "#667085",
                                            lineHeight: "1.85",
                                            marginBottom: "18px"
                                        }}
                                    >
                                        Self-determination movements have
                                        played an important role in the
                                        political history of many countries
                                        and regions around the world.
                                    </p>

                                    <p
                                        style={{
                                            color: "#667085",
                                            lineHeight: "1.85",
                                            marginBottom: "0"
                                        }}
                                    >
                                        This platform provides an accessible
                                        way to explore information about these
                                        movements and examine their claims,
                                        development, conflict experiences,
                                        sovereignty declarations, and
                                        interactions with governments.
                                    </p>

                                </Card.Body>

                            </Card>

                        </Col>


                        {/* DATASET SUMMARY */}

                        <Col lg={5}>

                            <Card
                                style={{
                                    height: "100%",
                                    border: "none",
                                    borderRadius: "24px",
                                    background:
                                        "linear-gradient(145deg,#172033,#1e293b)",
                                    color: "#ffffff",
                                    boxShadow: "0 12px 35px rgba(15,23,42,0.15)"
                                }}
                            >

                                <Card.Body
                                    style={{
                                        padding: "42px"
                                    }}
                                >

                                    <div
                                        style={{
                                            fontSize: "0.75rem",
                                            fontWeight: "700",
                                            letterSpacing: "1.5px",
                                            color: "rgba(255,255,255,0.55)",
                                            marginBottom: "12px"
                                        }}
                                    >
                                        DATASET
                                    </div>

                                    <h3
                                        style={{
                                            fontWeight: "800",
                                            marginBottom: "30px"
                                        }}
                                    >
                                        SDM 2.0
                                    </h3>


                                    <Row className="g-4">

                                        <Col xs={6}>

                                            <div
                                                style={{
                                                    fontSize: "2rem",
                                                    fontWeight: "800"
                                                }}
                                            >
                                                502
                                            </div>

                                            <div
                                                style={{
                                                    color: "rgba(255,255,255,0.65)",
                                                    fontSize: "0.9rem",
                                                    marginTop: "5px"
                                                }}
                                            >
                                                Movements
                                            </div>

                                        </Col>


                                        <Col xs={6}>

                                            <div
                                                style={{
                                                    fontSize: "2rem",
                                                    fontWeight: "800"
                                                }}
                                            >
                                                124
                                            </div>

                                            <div
                                                style={{
                                                    color: "rgba(255,255,255,0.65)",
                                                    fontSize: "0.9rem",
                                                    marginTop: "5px"
                                                }}
                                            >
                                                Countries
                                            </div>

                                        </Col>


                                        <Col xs={12}>

                                            <div
                                                style={{
                                                    fontSize: "2rem",
                                                    fontWeight: "800"
                                                }}
                                            >
                                                1945–2020
                                            </div>

                                            <div
                                                style={{
                                                    color: "rgba(255,255,255,0.65)",
                                                    fontSize: "0.9rem",
                                                    marginTop: "5px"
                                                }}
                                            >
                                                Historical coverage
                                            </div>

                                        </Col>

                                    </Row>

                                </Card.Body>

                            </Card>

                        </Col>

                    </Row>

                </Container>

            </section>


            {/* =====================================================
                WHAT YOU CAN EXPLORE
            ====================================================== */}

            <section
                style={{
                    padding: "55px 0 75px"
                }}
            >

                <Container>

                    <div
                        className="text-center"
                        style={{
                            marginBottom: "42px"
                        }}
                    >

                        <Badge
                            style={{
                                background: "#eef4ff",
                                color: "#2563eb",
                                padding: "9px 15px",
                                borderRadius: "999px",
                                marginBottom: "15px"
                            }}
                        >
                            Explore
                        </Badge>

                        <h2
                            style={{
                                fontWeight: "800",
                                color: "#111827",
                                marginBottom: "12px"
                            }}
                        >
                            What Can You Explore?
                        </h2>

                        <p
                            style={{
                                color: "#667085",
                                maxWidth: "700px",
                                margin: "0 auto",
                                lineHeight: "1.7"
                            }}
                        >
                            Explore different aspects of self-determination
                            movements through the platform's interactive
                            sections.
                        </p>

                    </div>


                    <Row className="g-4">

                        {topics.map((topic) => (

                            <Col
                                md={6}
                                lg={4}
                                key={topic.title}
                            >

                                <Card
                                    style={{
                                        height: "100%",
                                        border: "1px solid #e8edf5",
                                        borderRadius: "22px",
                                        background: "#ffffff",
                                        boxShadow: "0 7px 24px rgba(15,23,42,0.045)",
                                        transition:
                                            "transform .2s ease, box-shadow .2s ease"
                                    }}
                                    className="about-topic-card"
                                >

                                    <Card.Body
                                        style={{
                                            padding: "30px"
                                        }}
                                    >

                                        <div
                                            style={{
                                                width: "52px",
                                                height: "52px",
                                                borderRadius: "15px",
                                                background: "#eef4ff",
                                                display: "flex",
                                                alignItems: "center",
                                                justifyContent: "center",
                                                fontSize: "1.45rem",
                                                marginBottom: "20px"
                                            }}
                                        >
                                            {topic.icon}
                                        </div>


                                        <h5
                                            style={{
                                                fontWeight: "750",
                                                color: "#172033",
                                                marginBottom: "12px"
                                            }}
                                        >
                                            {topic.title}
                                        </h5>


                                        <p
                                            style={{
                                                color: "#667085",
                                                fontSize: "0.92rem",
                                                lineHeight: "1.7",
                                                marginBottom: "0"
                                            }}
                                        >
                                            {topic.text}
                                        </p>

                                    </Card.Body>

                                </Card>

                            </Col>

                        ))}

                    </Row>

                </Container>

            </section>


            {/* =====================================================
                EXPLORE CALL TO ACTION
            ====================================================== */}

            <section
                style={{
                    padding: "0 0 75px"
                }}
            >

                <Container>

                    <div
                        style={{
                            background:
                                "linear-gradient(135deg,#eff6ff,#f8fafc)",
                            border: "1px solid #dbe7f8",
                            borderRadius: "28px",
                            padding: "45px",
                            textAlign: "center"
                        }}
                    >

                        <h3
                            style={{
                                fontWeight: "800",
                                color: "#172033",
                                marginBottom: "12px"
                            }}
                        >
                            Ready to Explore?
                        </h3>

                        <p
                            style={{
                                color: "#667085",
                                marginBottom: "25px"
                            }}
                        >
                            Explore the platform and discover the data.
                        </p>

                        <Link
                            to="/dashboard"
                            className="btn btn-primary rounded-pill px-5 py-3 fw-semibold"
                        >
                            Explore the Dashboard →
                        </Link>

                    </div>

                </Container>

            </section>


            {/* =====================================================
                FOOTER
            ====================================================== */}

            <footer
                style={{
                    background: "#111827",
                    color: "#ffffff",
                    padding: "50px 0 25px",
                    marginTop: "20px"
                }}
            >

                <Container>

                    <Row className="g-4">

                        {/* BRAND */}

                        <Col md={5}>

                            <h4
                                style={{
                                    fontWeight: "800",
                                    marginBottom: "15px"
                                }}
                            >
                                SDM Dashboard
                            </h4>

                            <p
                                style={{
                                    color: "rgba(255,255,255,0.65)",
                                    lineHeight: "1.7",
                                    maxWidth: "430px"
                                }}
                            >
                                An interactive platform for exploring
                                self-determination movements and related
                                political, geographical, and historical
                                information.
                            </p>

                        </Col>


                        {/* DATA */}

                        <Col md={3}>

                            <h6
                                style={{
                                    fontWeight: "700",
                                    marginBottom: "15px"
                                }}
                            >
                                Data Source
                            </h6>

                            <p
                                style={{
                                    color: "rgba(255,255,255,0.65)",
                                    fontSize: "0.9rem",
                                    lineHeight: "1.7"
                                }}
                            >
                                Self-Determination Movements (SDM 2.0)
                                dataset.
                            </p>

                        </Col>


                        {/* PLATFORM */}

                        <Col md={4}>

                            <h6
                                style={{
                                    fontWeight: "700",
                                    marginBottom: "15px"
                                }}
                            >
                                Platform
                            </h6>

                            <div
                                style={{
                                    display: "flex",
                                    flexDirection: "column",
                                    gap: "9px"
                                }}
                            >

                                <Link
                                    to="/dashboard"
                                    style={{
                                        color: "rgba(255,255,255,0.65)",
                                        textDecoration: "none"
                                    }}
                                >
                                    Dashboard
                                </Link>

                                <Link
                                    to="/globe"
                                    style={{
                                        color: "rgba(255,255,255,0.65)",
                                        textDecoration: "none"
                                    }}
                                >
                                    Explore Countries
                                </Link>

                                <Link
                                    to="/continent-comparison"
                                    style={{
                                        color: "rgba(255,255,255,0.65)",
                                        textDecoration: "none"
                                    }}
                                >
                                    Compare Continents
                                </Link>

                            </div>

                        </Col>

                    </Row>


                    <hr
                        style={{
                            borderColor: "rgba(255,255,255,0.12)",
                            margin: "35px 0 20px"
                        }}
                    />


                    <div
                        style={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            gap: "20px",
                            flexWrap: "wrap",
                            color: "rgba(255,255,255,0.5)",
                            fontSize: "0.82rem"
                        }}
                    >

                        <span>
                            © {new Date().getFullYear()} SDM Dashboard
                        </span>

                        <span>
                            Developed by: [Your Name / Institution]
                        </span>

                    </div>

                </Container>

            </footer>

        </div>
    );
}

export default About;