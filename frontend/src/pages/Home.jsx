import React from "react";

import {
    Container,
    Row,
    Col,
    Card,
    Badge
} from "react-bootstrap";

import { Link } from "react-router-dom";


function Home() {

    return (

        <div
            style={{
                minHeight: "100vh",
                background: "#f8fafc",
                color: "#172033"
            }}
        >

            {/* =====================================================
                HERO
            ====================================================== */}

            <section
                style={{
                    minHeight: "78vh",
                    display: "flex",
                    alignItems: "center",
                    position: "relative",
                    overflow: "hidden",

                    backgroundColor: "#f8fafc",

                    backgroundImage: `
                        linear-gradient(rgba(37, 99, 235, 0.055) 1px, transparent 1px),
                        linear-gradient(90deg, rgba(37, 99, 235, 0.055) 1px, transparent 1px),
                        radial-gradient(circle at 82% 18%, rgba(37, 99, 235, 0.10), transparent 28%),
                        radial-gradient(circle at 12% 82%, rgba(100, 116, 139, 0.07), transparent 25%)
                    `,

                    backgroundSize: "42px 42px, 42px 42px, auto, auto"
                }}
            >

                {/* Soft background circle */}

                <div
                    style={{
                        position: "absolute",
                        width: "500px",
                        height: "500px",
                        borderRadius: "50%",
                        border: "1px solid rgba(37,99,235,0.07)",
                        right: "-230px",
                        top: "-210px",
                        pointerEvents: "none"
                    }}
                />


                <div
                    style={{
                        position: "absolute",
                        width: "320px",
                        height: "320px",
                        borderRadius: "50%",
                        border: "1px solid rgba(37,99,235,0.055)",
                        left: "-170px",
                        bottom: "-170px",
                        pointerEvents: "none"
                    }}
                />


                <Container
                    style={{
                        position: "relative",
                        zIndex: 2,
                        paddingTop: "70px",
                        paddingBottom: "70px"
                    }}
                >

                    <Row>

                        <Col
                            lg={9}
                            xl={8}
                            className="mx-auto text-center"
                        >

                            {/* =================================================
                                BADGE
                            ================================================== */}

                            <Badge
                                style={{
                                    background: "#eaf2ff",
                                    color: "#2563eb",
                                    border: "1px solid #d8e6ff",
                                    fontSize: "0.78rem",
                                    fontWeight: 700,
                                    padding: "9px 16px",
                                    borderRadius: "50px",
                                    marginBottom: "24px"
                                }}
                            >
                                SDM 2.0 Research Platform
                            </Badge>


                            {/* =================================================
                                TITLE
                            ================================================== */}

                            <h1
                                style={{
                                    color: "#111827",
                                    fontSize: "clamp(3rem, 7vw, 5.6rem)",
                                    fontWeight: 800,
                                    lineHeight: 0.98,
                                    letterSpacing: "-2.5px",
                                    marginBottom: "28px"
                                }}
                            >

                                Explore.
                                <br />

                                Understand.
                                <br />

                                <span
                                    style={{
                                        color: "#2563eb"
                                    }}
                                >
                                    Compare.
                                </span>

                            </h1>


                            {/* =================================================
                                DESCRIPTION
                            ================================================== */}

                            <p
                                style={{
                                    color: "#64748b",
                                    fontSize: "1.08rem",
                                    lineHeight: 1.8,
                                    maxWidth: "760px",
                                    margin: "0 auto 34px"
                                }}
                            >
                                An interactive research platform for exploring
                                self-determination movement data through
                                geographical exploration, analytical
                                visualizations, and comparative research.
                            </p>


                            {/* =================================================
                                ACTION BUTTONS
                            ================================================== */}

                            <div
                                style={{
                                    display: "flex",
                                    justifyContent: "center",
                                    gap: "14px",
                                    flexWrap: "wrap"
                                }}
                            >

                                <Link
                                    to="/dashboard"
                                    style={{
                                        display: "inline-flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        gap: "10px",

                                        background: "#2563eb",
                                        color: "#ffffff",

                                        textDecoration: "none",

                                        padding: "14px 30px",
                                        borderRadius: "13px",

                                        fontSize: "1rem",
                                        fontWeight: 700,

                                        boxShadow:
                                            "0 8px 22px rgba(37,99,235,0.20)",

                                        transition:
                                            "transform .2s ease, box-shadow .2s ease"
                                    }}
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.transform =
                                            "translateY(-2px)";

                                        e.currentTarget.style.boxShadow =
                                            "0 12px 28px rgba(37,99,235,0.25)";
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.transform =
                                            "none";

                                        e.currentTarget.style.boxShadow =
                                            "0 8px 22px rgba(37,99,235,0.20)";
                                    }}
                                >
                                    Explore the Dashboard
                                    <span>→</span>
                                </Link>


                                <Link
                                    to="/about"
                                    style={{
                                        display: "inline-flex",
                                        alignItems: "center",
                                        justifyContent: "center",

                                        background: "#ffffff",
                                        color: "#334155",

                                        textDecoration: "none",

                                        padding: "14px 30px",
                                        borderRadius: "13px",

                                        border: "1px solid #cbd5e1",

                                        fontSize: "1rem",
                                        fontWeight: 700,

                                        boxShadow:
                                            "0 5px 18px rgba(15,23,42,0.04)",

                                        transition:
                                            "transform .2s ease, border-color .2s ease"
                                    }}
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.transform =
                                            "translateY(-2px)";

                                        e.currentTarget.style.borderColor =
                                            "#94a3b8";
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.transform =
                                            "none";

                                        e.currentTarget.style.borderColor =
                                            "#cbd5e1";
                                    }}
                                >
                                    About the Research
                                </Link>

                            </div>


                            {/* =================================================
                                SMALL DATA INDICATORS
                            ================================================== */}

                            <div
                                style={{
                                    display: "flex",
                                    justifyContent: "center",
                                    gap: "12px",
                                    flexWrap: "wrap",
                                    marginTop: "45px"
                                }}
                            >

                                <div
                                    style={{
                                        background: "rgba(255,255,255,0.88)",
                                        border: "1px solid #e2e8f0",
                                        borderRadius: "12px",
                                        padding: "12px 18px",
                                        minWidth: "125px"
                                    }}
                                >

                                    <div
                                        style={{
                                            fontSize: "1.2rem",
                                            fontWeight: 800,
                                            color: "#111827"
                                        }}
                                    >
                                        75
                                    </div>

                                    <div
                                        style={{
                                            fontSize: "0.72rem",
                                            color: "#64748b",
                                            marginTop: "2px"
                                        }}
                                    >
                                        Years covered
                                    </div>

                                </div>


                                <div
                                    style={{
                                        background: "rgba(255,255,255,0.88)",
                                        border: "1px solid #e2e8f0",
                                        borderRadius: "12px",
                                        padding: "12px 18px",
                                        minWidth: "125px"
                                    }}
                                >

                                    <div
                                        style={{
                                            fontSize: "1.2rem",
                                            fontWeight: 800,
                                            color: "#111827"
                                        }}
                                    >
                                        500+
                                    </div>

                                    <div
                                        style={{
                                            fontSize: "0.72rem",
                                            color: "#64748b",
                                            marginTop: "2px"
                                        }}
                                    >
                                        Movements
                                    </div>

                                </div>


                                <div
                                    style={{
                                        background: "rgba(255,255,255,0.88)",
                                        border: "1px solid #e2e8f0",
                                        borderRadius: "12px",
                                        padding: "12px 18px",
                                        minWidth: "125px"
                                    }}
                                >

                                    <div
                                        style={{
                                            fontSize: "1.2rem",
                                            fontWeight: 800,
                                            color: "#111827"
                                        }}
                                    >
                                        124
                                    </div>

                                    <div
                                        style={{
                                            fontSize: "0.72rem",
                                            color: "#64748b",
                                            marginTop: "2px"
                                        }}
                                    >
                                        Countries
                                    </div>

                                </div>

                            </div>

                        </Col>

                    </Row>

                </Container>

            </section>


            {/* =====================================================
                QUICK ENTRY
            ====================================================== */}

            <section
                style={{
                    background: "#ffffff",
                    padding: "75px 0"
                }}
            >

                <Container>

                    <div
                        style={{
                            textAlign: "center",
                            marginBottom: "42px"
                        }}
                    >

                        <Badge
                            style={{
                                background: "#f1f5f9",
                                color: "#64748b",
                                border: "1px solid #e2e8f0",
                                fontSize: "0.72rem",
                                fontWeight: 800,
                                letterSpacing: "1px",
                                padding: "8px 14px",
                                borderRadius: "50px",
                                marginBottom: "15px"
                            }}
                        >
                            START HERE
                        </Badge>


                        <h2
                            style={{
                                color: "#111827",
                                fontSize: "2rem",
                                fontWeight: 800,
                                marginBottom: "9px"
                            }}
                        >
                            Where would you like to begin?
                        </h2>


                        <p
                            style={{
                                color: "#64748b",
                                marginBottom: 0,
                                lineHeight: 1.7
                            }}
                        >
                            Choose the path that best matches what you want
                            to explore.
                        </p>

                    </div>


                    <Row className="g-4 justify-content-center">

                        {/* =================================================
                            DASHBOARD CARD
                        ================================================== */}

                        <Col md={6} lg={5}>

                            <Card
                                as={Link}
                                to="/dashboard"
                                style={{
                                    height: "100%",
                                    textDecoration: "none",

                                    background: "#ffffff",

                                    border: "1px solid #e2e8f0",
                                    borderRadius: "22px",

                                    overflow: "hidden",

                                    boxShadow:
                                        "0 8px 28px rgba(15,23,42,0.055)",

                                    transition:
                                        "transform .22s ease, box-shadow .22s ease"
                                }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.transform =
                                        "translateY(-5px)";

                                    e.currentTarget.style.boxShadow =
                                        "0 18px 38px rgba(37,99,235,0.12)";
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.transform =
                                        "none";

                                    e.currentTarget.style.boxShadow =
                                        "0 8px 28px rgba(15,23,42,0.055)";
                                }}
                            >

                                <div
                                    style={{
                                        height: "4px",
                                        background: "#2563eb"
                                    }}
                                />

                                <Card.Body
                                    style={{
                                        padding: "34px"
                                    }}
                                >

                                    <div
                                        style={{
                                            width: "58px",
                                            height: "58px",
                                            borderRadius: "16px",
                                            background: "#edf4ff",
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "center",
                                            fontSize: "1.7rem",
                                            marginBottom: "20px"
                                        }}
                                    >
                                        📊
                                    </div>


                                    <div
                                        style={{
                                            display: "inline-block",
                                            background: "#eef4ff",
                                            color: "#2563eb",
                                            padding: "6px 11px",
                                            borderRadius: "50px",
                                            fontSize: "0.7rem",
                                            fontWeight: 700,
                                            marginBottom: "14px"
                                        }}
                                    >
                                        Explore
                                    </div>


                                    <h3
                                        style={{
                                            color: "#111827",
                                            fontWeight: 800,
                                            marginBottom: "12px"
                                        }}
                                    >
                                        Research Dashboard
                                    </h3>


                                    <p
                                        style={{
                                            color: "#64748b",
                                            lineHeight: 1.75,
                                            marginBottom: "23px"
                                        }}
                                    >
                                        Access the interactive research
                                        sections, geographical exploration,
                                        and comparative analysis tools.
                                    </p>


                                    <div
                                        style={{
                                            color: "#2563eb",
                                            fontWeight: 700,
                                            display: "flex",
                                            alignItems: "center",
                                            gap: "8px"
                                        }}
                                    >
                                        Enter the Dashboard
                                        <span>→</span>
                                    </div>

                                </Card.Body>

                            </Card>

                        </Col>


                        {/* =================================================
                            ABOUT CARD
                        ================================================== */}

                        <Col md={6} lg={5}>

                            <Card
                                as={Link}
                                to="/about"
                                style={{
                                    height: "100%",
                                    textDecoration: "none",

                                    background: "#ffffff",

                                    border: "1px solid #e2e8f0",
                                    borderRadius: "22px",

                                    overflow: "hidden",

                                    boxShadow:
                                        "0 8px 28px rgba(15,23,42,0.055)",

                                    transition:
                                        "transform .22s ease, box-shadow .22s ease"
                                }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.transform =
                                        "translateY(-5px)";

                                    e.currentTarget.style.boxShadow =
                                        "0 18px 38px rgba(15,23,42,0.09)";
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.transform =
                                        "none";

                                    e.currentTarget.style.boxShadow =
                                        "0 8px 28px rgba(15,23,42,0.055)";
                                }}
                            >

                                <div
                                    style={{
                                        height: "4px",
                                        background: "#475569"
                                    }}
                                />


                                <Card.Body
                                    style={{
                                        padding: "34px"
                                    }}
                                >

                                    <div
                                        style={{
                                            width: "58px",
                                            height: "58px",
                                            borderRadius: "16px",
                                            background: "#f1f5f9",
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "center",
                                            fontSize: "1.7rem",
                                            marginBottom: "20px"
                                        }}
                                    >
                                        📚
                                    </div>


                                    <div
                                        style={{
                                            display: "inline-block",
                                            background: "#f1f5f9",
                                            color: "#475569",
                                            padding: "6px 11px",
                                            borderRadius: "50px",
                                            fontSize: "0.7rem",
                                            fontWeight: 700,
                                            marginBottom: "14px"
                                        }}
                                    >
                                        Learn More
                                    </div>


                                    <h3
                                        style={{
                                            color: "#111827",
                                            fontWeight: 800,
                                            marginBottom: "12px"
                                        }}
                                    >
                                        About the Research
                                    </h3>


                                    <p
                                        style={{
                                            color: "#64748b",
                                            lineHeight: 1.75,
                                            marginBottom: "23px"
                                        }}
                                    >
                                        Learn about the research context,
                                        dataset, analytical scope, and
                                        information-system approach behind
                                        the platform.
                                    </p>


                                    <div
                                        style={{
                                            color: "#334155",
                                            fontWeight: 700,
                                            display: "flex",
                                            alignItems: "center",
                                            gap: "8px"
                                        }}
                                    >
                                        Learn About the Project
                                        <span>→</span>
                                    </div>

                                </Card.Body>

                            </Card>

                        </Col>

                    </Row>

                </Container>

            </section>


            {/* =====================================================
                RESEARCH JOURNEY
            ====================================================== */}

            <section
                style={{
                    padding: "0 0 75px",
                    background: "#ffffff"
                }}
            >

                <Container>

                    <div
                        style={{
                            background: "#f8fafc",
                            border: "1px solid #e2e8f0",
                            borderRadius: "24px",
                            padding: "38px 35px"
                        }}
                    >

                        <Row className="align-items-center g-4">

                            <Col lg={4}>

                                <Badge
                                    style={{
                                        background: "#eaf2ff",
                                        color: "#2563eb",
                                        padding: "8px 13px",
                                        borderRadius: "50px",
                                        fontSize: "0.7rem",
                                        fontWeight: 700,
                                        marginBottom: "13px"
                                    }}
                                >
                                    Research Journey
                                </Badge>


                                <h3
                                    style={{
                                        color: "#111827",
                                        fontWeight: 800,
                                        marginBottom: "9px"
                                    }}
                                >
                                    A simple way to explore the data
                                </h3>


                                <p
                                    style={{
                                        color: "#64748b",
                                        lineHeight: 1.7,
                                        marginBottom: 0
                                    }}
                                >
                                    Move from an overview of the research
                                    system to detailed exploration and
                                    comparison.
                                </p>

                            </Col>


                            <Col lg={8}>

                                <div
                                    style={{
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        gap: "18px",
                                        flexWrap: "wrap"
                                    }}
                                >

                                    {/* STEP 1 */}

                                    <div
                                        style={{
                                            display: "flex",
                                            alignItems: "center",
                                            gap: "11px"
                                        }}
                                    >

                                        <div
                                            style={{
                                                width: "42px",
                                                height: "42px",
                                                borderRadius: "12px",
                                                background: "#ffffff",
                                                border: "1px solid #e2e8f0",
                                                display: "flex",
                                                alignItems: "center",
                                                justifyContent: "center",
                                                color: "#2563eb",
                                                fontSize: "0.78rem",
                                                fontWeight: 800
                                            }}
                                        >
                                            01
                                        </div>


                                        <div>

                                            <strong
                                                style={{
                                                    display: "block",
                                                    color: "#111827",
                                                    fontSize: "0.9rem"
                                                }}
                                            >
                                                Explore
                                            </strong>

                                            <small
                                                style={{
                                                    color: "#64748b"
                                                }}
                                            >
                                                Navigate
                                            </small>

                                        </div>

                                    </div>


                                    <span
                                        style={{
                                            color: "#cbd5e1",
                                            fontSize: "1.3rem"
                                        }}
                                    >
                                        →
                                    </span>


                                    {/* STEP 2 */}

                                    <div
                                        style={{
                                            display: "flex",
                                            alignItems: "center",
                                            gap: "11px"
                                        }}
                                    >

                                        <div
                                            style={{
                                                width: "42px",
                                                height: "42px",
                                                borderRadius: "12px",
                                                background: "#ffffff",
                                                border: "1px solid #e2e8f0",
                                                display: "flex",
                                                alignItems: "center",
                                                justifyContent: "center",
                                                color: "#2563eb",
                                                fontSize: "0.78rem",
                                                fontWeight: 800
                                            }}
                                        >
                                            02
                                        </div>


                                        <div>

                                            <strong
                                                style={{
                                                    display: "block",
                                                    color: "#111827",
                                                    fontSize: "0.9rem"
                                                }}
                                            >
                                                Analyze
                                            </strong>

                                            <small
                                                style={{
                                                    color: "#64748b"
                                                }}
                                            >
                                                Examine
                                            </small>

                                        </div>

                                    </div>


                                    <span
                                        style={{
                                            color: "#cbd5e1",
                                            fontSize: "1.3rem"
                                        }}
                                    >
                                        →
                                    </span>


                                    {/* STEP 3 */}

                                    <div
                                        style={{
                                            display: "flex",
                                            alignItems: "center",
                                            gap: "11px"
                                        }}
                                    >

                                        <div
                                            style={{
                                                width: "42px",
                                                height: "42px",
                                                borderRadius: "12px",
                                                background: "#ffffff",
                                                border: "1px solid #e2e8f0",
                                                display: "flex",
                                                alignItems: "center",
                                                justifyContent: "center",
                                                color: "#2563eb",
                                                fontSize: "0.78rem",
                                                fontWeight: 800
                                            }}
                                        >
                                            03
                                        </div>


                                        <div>

                                            <strong
                                                style={{
                                                    display: "block",
                                                    color: "#111827",
                                                    fontSize: "0.9rem"
                                                }}
                                            >
                                                Compare
                                            </strong>

                                            <small
                                                style={{
                                                    color: "#64748b"
                                                }}
                                            >
                                                Investigate
                                            </small>

                                        </div>

                                    </div>

                                </div>

                            </Col>

                        </Row>

                    </div>

                </Container>

            </section>


            {/* =====================================================
                FOOTER INTRO
            ====================================================== */}

            <section
                style={{
                    background: "#f8fafc",
                    borderTop: "1px solid #e5e7eb",
                    padding: "25px 0"
                }}
            >

                <Container className="text-center">

                    <p
                        style={{
                            color: "#94a3b8",
                            fontSize: "0.78rem",
                            marginBottom: 0
                        }}
                    >
                        An academic research project in Information Systems
                        and Data Analytics.
                    </p>

                </Container>

            </section>

        </div>

    );

}


export default Home;