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

        <div className="home-page">

            {/* =====================================================
                HERO
            ====================================================== */}

            <section className="home-hero">

                <Container>

                    <Row className="align-items-center min-vh-75">

                        <Col lg={8} className="mx-auto text-center">

                            <Badge
                                bg="light"
                                text="primary"
                                className="home-hero-badge px-3 py-2 rounded-pill mb-4"
                            >
                                SDM 2.0 Research Platform
                            </Badge>


                            <h1 className="home-hero-title mb-4">

                                Explore.
                                <br />

                                Understand.
                                <br />

                                Compare.

                            </h1>


                            <p className="home-hero-text mx-auto mb-5">

                                An interactive research platform for exploring
                                self-determination movement data through
                                geographical exploration, analytical
                                visualizations, and comparative research.

                            </p>


                            <div className="home-hero-actions">

                                <Link
                                    to="/dashboard"
                                    className="btn btn-primary btn-lg rounded-pill px-5 py-3 fw-semibold shadow-sm"
                                >
                                    Explore the Dashboard
                                    <span className="ms-2">→</span>
                                </Link>


                                <Link
                                    to="/about"
                                    className="btn btn-outline-light btn-lg rounded-pill px-5 py-3 fw-semibold"
                                >
                                    About the Research
                                </Link>

                            </div>

                        </Col>

                    </Row>

                </Container>

            </section>


            {/* =====================================================
                QUICK ENTRY
            ====================================================== */}

            <section className="home-entry-section">

                <Container>

                    <div className="text-center mb-5">

                        <Badge
                            bg="light"
                            text="dark"
                            className="px-3 py-2 rounded-pill mb-3"
                        >
                            Start Here
                        </Badge>

                        <h2 className="fw-bold text-dark mb-2">
                            Where would you like to begin?
                        </h2>

                        <p className="text-muted mb-0">
                            Choose the path that best matches what you want
                            to explore.
                        </p>

                    </div>


                    <Row className="g-4 justify-content-center">

                        {/* DASHBOARD */}

                        <Col md={6} lg={5}>

                            <Card
                                as={Link}
                                to="/dashboard"
                                className="home-entry-card dashboard-entry-card h-100 border-0 rounded-4 text-decoration-none shadow-sm"
                            >

                                <Card.Body className="p-4 p-lg-5">

                                    <div className="home-entry-icon dashboard-icon">
                                        📊
                                    </div>


                                    <Badge
                                        bg="primary"
                                        className="px-3 py-2 rounded-pill mb-3"
                                    >
                                        Explore
                                    </Badge>


                                    <h3 className="fw-bold text-dark mb-3">
                                        Research Dashboard
                                    </h3>


                                    <p className="text-muted mb-4">
                                        Access the interactive research
                                        sections, geographical exploration,
                                        and comparative analysis tools.
                                    </p>


                                    <div className="home-entry-link">
                                        Enter the Dashboard
                                        <span>→</span>
                                    </div>

                                </Card.Body>

                            </Card>

                        </Col>


                        {/* ABOUT */}

                        <Col md={6} lg={5}>

                            <Card
                                as={Link}
                                to="/about"
                                className="home-entry-card about-entry-card h-100 border-0 rounded-4 text-decoration-none shadow-sm"
                            >

                                <Card.Body className="p-4 p-lg-5">

                                    <div className="home-entry-icon about-icon">
                                        📚
                                    </div>


                                    <Badge
                                        bg="dark"
                                        className="px-3 py-2 rounded-pill mb-3"
                                    >
                                        Learn More
                                    </Badge>


                                    <h3 className="fw-bold text-dark mb-3">
                                        About the Research
                                    </h3>


                                    <p className="text-muted mb-4">
                                        Learn about the research context,
                                        dataset, analytical scope, and
                                        information-system approach behind
                                        the platform.
                                    </p>


                                    <div className="home-entry-link about-link">
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
                SIMPLE FLOW
            ====================================================== */}

            <section className="home-flow-section">

                <Container>

                    <div className="home-flow-card">

                        <Row className="align-items-center g-4">

                            <Col lg={4}>

                                <Badge
                                    bg="primary"
                                    className="px-3 py-2 rounded-pill mb-3"
                                >
                                    Research Journey
                                </Badge>

                                <h3 className="fw-bold mb-2">
                                    A simple way to explore the data
                                </h3>

                                <p className="text-muted mb-0">
                                    Move from an overview of the research
                                    system to detailed exploration and
                                    comparison.
                                </p>

                            </Col>


                            <Col lg={8}>

                                <div className="home-flow">

                                    <div className="home-flow-step">

                                        <div className="flow-number">
                                            01
                                        </div>

                                        <div>
                                            <strong>
                                                Explore
                                            </strong>

                                            <small>
                                                Navigate the dashboard
                                            </small>
                                        </div>

                                    </div>


                                    <div className="flow-arrow">
                                        →
                                    </div>


                                    <div className="home-flow-step">

                                        <div className="flow-number">
                                            02
                                        </div>

                                        <div>
                                            <strong>
                                                Analyze
                                            </strong>

                                            <small>
                                                Examine research dimensions
                                            </small>

                                        </div>

                                    </div>


                                    <div className="flow-arrow">
                                        →
                                    </div>


                                    <div className="home-flow-step">

                                        <div className="flow-number">
                                            03
                                        </div>

                                        <div>
                                            <strong>
                                                Compare
                                            </strong>

                                            <small>
                                                Investigate differences
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

            <section className="home-bottom-section">

                <Container className="text-center">

                    <p className="text-muted small mb-0">
                        An academic research project in Information Systems
                        and Data Analytics.
                    </p>

                </Container>

            </section>

        </div>

    );

}

export default Home;