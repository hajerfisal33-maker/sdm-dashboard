import React from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Badge,
  Alert
} from "react-bootstrap";
import { Link } from "react-router-dom";

function Home() {

  const stats = [
    {
      label: "Self-Determination Movements",
      value: "502",
      icon: "🌍",
      color: "primary"
    },
    {
      label: "Countries Covered",
      value: "124",
      icon: "🗺️",
      color: "success"
    },
    {
      label: "Historical Coverage",
      value: "1945–2020",
      icon: "📅",
      color: "warning"
    }
  ];

  const features = [
    {
      title: "Interactive Visual Analytics",
      desc: "Explore geographical, historical, political, and conflict-related patterns through interactive charts and visual summaries.",
      icon: "📈",
      bgColor: "bg-primary-subtle"
    },
    {
      title: "Database-Backed Analysis",
      desc: "Structured queries transform the underlying SDM 2.0 data into focused indicators for comparative and descriptive analysis.",
      icon: "🗄️",
      bgColor: "bg-success-subtle"
    },
    {
      title: "Research-Oriented Architecture",
      desc: "A full-stack system connects the React interface, backend API, and database to provide consistent access to analytical results.",
      icon: "⚡",
      bgColor: "bg-warning-subtle"
    },
    {
      title: "Statistical Analysis",
      desc: "Selected relationships between variables are examined using inferential analysis, including Chi-Square tests of independence.",
      icon: "🔬",
      bgColor: "bg-danger-subtle"
    }
  ];

  return (

    <div>

      {/* =====================================================
          HERO SECTION
      ====================================================== */}

      <div
        className="text-white py-5 mb-5 shadow-sm"
        style={{
          background:
            "linear-gradient(135deg, #0f172a 0%, #1e293b 100%)"
        }}
      >

        <Container className="py-5 text-center">

          <Badge
            bg="primary"
            className="px-3 py-2 fs-6 mb-3 rounded-pill shadow-sm"
          >
            SDM 2.0 Research & Visual Analytics Platform
          </Badge>


          <h1 className="display-4 fw-bold mb-3 text-white">

            Exploring Self-Determination Movements

          </h1>


          <p
            className="lead text-light mx-auto mb-4"
            style={{
              maxWidth: "850px",
              opacity: "0.9"
            }}
          >

            An interactive research dashboard for exploring the
            geographical distribution, political claims, conflict
            dynamics, government responses, and structural
            characteristics of self-determination movements
            documented in the SDM 2.0 dataset.

          </p>


          <p
            className="text-light mx-auto mb-4"
            style={{
              maxWidth: "780px",
              opacity: "0.75"
            }}
          >

            The platform transforms complex, annualized data into
            accessible visual and statistical analyses designed to
            support researchers in exploring patterns across
            countries, regions, and historical periods.

          </p>


          <div className="d-flex justify-content-center gap-3 flex-wrap">

            <Button
              as={Link}
              to="/dashboard"
              variant="primary"
              size="lg"
              className="px-4 py-2 rounded-pill fw-bold shadow-sm"
            >

              Explore the Dashboard

            </Button>


            <Button
              as={Link}
              to="/about"
              variant="outline-light"
              size="lg"
              className="px-4 py-2 rounded-pill fw-semibold"
            >

              About the Project

            </Button>

          </div>

        </Container>

      </div>


      <Container className="mb-5">


        {/* =====================================================
            KEY DATASET STATISTICS
        ====================================================== */}

        <Row className="g-4 mb-5">

          {stats.map((stat, index) => (

            <Col key={index} md={4}>

              <Card
                className="border-0 shadow-sm text-center p-4 rounded-4 bg-white h-100"
              >

                <div className="fs-1 mb-2">

                  {stat.icon}

                </div>


                <h2
                  className={`fw-bold text-${stat.color} mb-1`}
                >

                  {stat.value}

                </h2>


                <span className="text-muted fw-semibold small">

                  {stat.label}

                </span>

              </Card>

            </Col>

          ))}

        </Row>


        {/* =====================================================
            DATASET CONTEXT
        ====================================================== */}

        <Card
          className="border-0 shadow-sm p-4 p-md-5 mb-5 rounded-4 bg-white"
        >

          <Row className="align-items-center g-4">

            <Col lg={7}>

              <Badge
                bg="info"
                className="px-3 py-2 fs-6 mb-3 text-dark rounded-pill"
              >

                Dataset Context

              </Badge>


              <h2 className="fw-bold text-dark mb-3">

                Understanding Self-Determination Movements

              </h2>


              <p className="text-secondary">

                The SDM 2.0 dataset focuses on self-determination
                movements: political organizations connected to
                ethnic groups that make politically significant
                claims for increased self-determination from the
                state.

              </p>


              <p className="text-muted">

                The concept of self-determination used in SDM 2.0
                includes a broad range of claims, from internal
                autonomy and territorial self-government to
                national independence and irredentist claims.

              </p>


              <p className="text-muted mb-0">

                The dataset covers 502 self-determination movements
                across 124 countries between 1945 and 2020, with
                information on political claims, separatist armed
                conflict, government concessions and restrictions,
                unilateral sovereignty declarations, and group
                characteristics.

              </p>

            </Col>


            <Col lg={5}>

              <div
                className="p-4 rounded-4 bg-light border shadow-sm"
              >

                <h5 className="fw-bold text-dark mb-3">

                  Key Dataset Highlights

                </h5>


                <ul className="list-unstyled mb-0">


                  <li className="mb-3 d-flex align-items-start">

                    <span className="me-2 text-primary">
                      ✔
                    </span>

                    <span>

                      <strong>Global Coverage:</strong>{" "}
                      Self-determination movements identified
                      across 124 countries.

                    </span>

                  </li>


                  <li className="mb-3 d-flex align-items-start">

                    <span className="me-2 text-primary">
                      ✔
                    </span>

                    <span>

                      <strong>Historical Scope:</strong>{" "}
                      Coverage from 1945 through 2020,
                      allowing long-term historical comparison.

                    </span>

                  </li>


                  <li className="mb-3 d-flex align-items-start">

                    <span className="me-2 text-primary">
                      ✔
                    </span>

                    <span>

                      <strong>Time-Varying Information:</strong>{" "}
                      Annualized data captures changes in movement
                      claims and other characteristics over time.

                    </span>

                  </li>


                  <li className="d-flex align-items-start">

                    <span className="me-2 text-primary">
                      ✔
                    </span>

                    <span>

                      <strong>Multiple Dimensions:</strong>{" "}
                      Includes claims, violence, sovereignty
                      declarations, concessions, restrictions,
                      and group characteristics.

                    </span>

                  </li>

                </ul>

              </div>

            </Col>

          </Row>

        </Card>


        {/* =====================================================
            DATASET AUTHOR / SOURCE
        ====================================================== */}

        <Card
          className="border-0 shadow-sm p-4 p-md-5 mb-5 rounded-4 bg-white"
        >

          <Row className="g-4 align-items-center">

            <Col lg={8}>

              <Badge
                bg="secondary"
                className="px-3 py-2 fs-6 mb-3 rounded-pill"
              >

                Dataset Source

              </Badge>


              <h2 className="fw-bold text-dark mb-3">

                SDM 2.0 and Its Documentation

              </h2>


              <p className="text-muted">

                SDM 2.0 is documented in the official
                <strong> SDM 2.0 Codebook</strong> authored by
                <strong> Micha Germann</strong> at the
                <strong> University of Bath</strong>.
                The Codebook provides the conceptual definitions,
                coding rules, variable descriptions, and methodological
                guidance required to interpret the dataset.

              </p>


              <p className="text-muted mb-0">

                The dataset builds on earlier SDM research and
                extends the scope of the original dataset by
                expanding temporal coverage, adding new movements,
                providing annualized claims information, and
                introducing more detailed data on violence,
                concessions, restrictions, and group attributes.

              </p>

            </Col>


            <Col lg={4}>

              <Card
                className="border-0 bg-light rounded-4 p-4 text-center h-100"
              >

                <div className="fs-1 mb-2">

                  📚

                </div>


                <h5 className="fw-bold">

                  Dataset Author

                </h5>


                <p className="mb-1">

                  Micha Germann

                </p>


                <p className="text-muted small mb-0">

                  Department of Politics, Languages,
                  and International Studies

                  <br />

                  University of Bath

                  <br />

                  SDM 2.0 Codebook, December 2025

                </p>

              </Card>

            </Col>

          </Row>

        </Card>


        {/* =====================================================
            WHAT THE PLATFORM ENABLES
        ====================================================== */}

        <div className="text-center mb-4">

          <Badge
            bg="dark"
            className="px-3 py-2 fs-6 mb-3 rounded-pill"
          >

            Research Capabilities

          </Badge>


          <h2 className="fw-bold text-dark">

            What Can Researchers Do With This Platform?

          </h2>


          <p className="text-muted mx-auto" style={{ maxWidth: "800px" }}>

            The dashboard provides a structured way to explore the
            dataset without requiring users to work directly with
            the underlying database or raw annualized observations.

          </p>

        </div>


        <Row className="g-4 mb-5">

          <Col md={4}>

            <Card className="border-0 shadow-sm p-4 rounded-4 h-100">

              <div className="fs-2 mb-3">

                🌍

              </div>


              <h5 className="fw-bold">

                Explore Patterns

              </h5>


              <p className="text-muted small mb-0">

                Examine where self-determination movements are
                concentrated geographically and how movement activity
                changes across the historical period.

              </p>

            </Card>

          </Col>


          <Col md={4}>

            <Card className="border-0 shadow-sm p-4 rounded-4 h-100">

              <div className="fs-2 mb-3">

                🔎

              </div>


              <h5 className="fw-bold">

                Compare Political Dynamics

              </h5>


              <p className="text-muted small mb-0">

                Compare the claims pursued by movements, their
                involvement in violence, and the types of responses
                adopted by governments.

              </p>

            </Card>

          </Col>


          <Col md={4}>

            <Card className="border-0 shadow-sm p-4 rounded-4 h-100">

              <div className="fs-2 mb-3">

                📊

              </div>


              <h5 className="fw-bold">

                Support Evidence-Based Analysis

              </h5>


              <p className="text-muted small mb-0">

                Use descriptive visualizations and selected inferential
                statistical tests to support exploratory and comparative
                research on self-determination movements.

              </p>

            </Card>

          </Col>

        </Row>


        {/* =====================================================
            PLATFORM CAPABILITIES
        ====================================================== */}

        <div className="text-center mb-4">

          <h2 className="fw-bold text-dark">

            Platform Capabilities

          </h2>


          <p className="text-muted">

            Technical and analytical capabilities supporting the
            research experience.

          </p>

        </div>


        <Row className="g-4 mb-5">

          {features.map((item, index) => (

            <Col key={index} md={6} lg={3}>

              <Card
                className="border-0 shadow-sm p-4 rounded-4 h-100 bg-white"
              >

                <div
                  className={`p-3 rounded-3 d-inline-block fs-3 mb-3 ${item.bgColor}`}
                  style={{ width: "fit-content" }}
                >

                  {item.icon}

                </div>


                <h5 className="fw-bold text-dark mb-2">

                  {item.title}

                </h5>


                <p className="text-muted small mb-0">

                  {item.desc}

                </p>

              </Card>

            </Col>

          ))}

        </Row>


        {/* =====================================================
            RESEARCH NOTE
        ====================================================== */}

        <Alert
          variant="light"
          className="border shadow-sm rounded-4 p-4 mb-5"
        >

          <h5 className="fw-bold">

            Important Note for Researchers

          </h5>


          <p className="text-muted mb-0">

            Results presented in the dashboard should be interpreted
            according to the coding rules and definitions of the
            SDM 2.0 dataset. Some analyses summarize distinct
            movements, while others summarize annual observations
            or recorded events. Users should therefore consult the
            descriptions provided within each analytical section
            and refer to the SDM 2.0 Codebook when conducting
            further interpretation or research.

          </p>

        </Alert>


        {/* =====================================================
            FINAL CTA
        ====================================================== */}

        <Card
          className="border-0 shadow-sm rounded-4 p-4 p-md-5 text-center"
          style={{
            background:
              "linear-gradient(135deg, #eff6ff 0%, #f8fafc 100%)"
          }}
        >

          <h2 className="fw-bold mb-3">

            Ready to Explore the Data?

          </h2>


          <p
            className="text-muted mx-auto mb-4"
            style={{ maxWidth: "700px" }}
          >

            Start with the dashboard overview to understand the
            dataset and analytical structure, then explore the
            individual research domains to investigate specific
            patterns and relationships.

          </p>


          <div>

            <Button
              as={Link}
              to="/dashboard"
              variant="primary"
              size="lg"
              className="px-5 py-2 rounded-pill fw-bold"
            >

              Open Research Dashboard

            </Button>

          </div>

        </Card>

      </Container>

    </div>

  );

}

export default Home;