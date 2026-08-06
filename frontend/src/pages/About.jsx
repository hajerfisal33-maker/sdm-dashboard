import React from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Badge,
  Alert
} from "react-bootstrap";

function About() {

  const analyticalCapabilities = [
    {
      title: "Geographical & Historical Distribution",
      desc: "Explore where self-determination movements are located across countries and regions, and examine how movement activity changes over the historical period from 1945 to 2020.",
      icon: "🌍",
    },
    {
      title: "Claims & Movement Duration",
      desc: "Examine the political objectives pursued by self-determination movements and compare how long movements remain active across different claim categories.",
      icon: "📜",
    },
    {
      title: "Sovereignty Declarations",
      desc: "Investigate when unilateral sovereignty declarations occurred, how they are distributed across claim types, and whether claim categories are statistically associated with declarations.",
      icon: "🏛️",
    },
    {
      title: "Violence & Conflict Dynamics",
      desc: "Explore the relationship between self-determination movements and separatist armed conflict, including violent involvement, escalation, and the onset of violence.",
      icon: "⚔️",
    },
    {
      title: "Governmental Concessions",
      desc: "Examine state policies that increase ethnic rights, including cultural, autonomy-related, and independence-related concessions.",
      icon: "🤝",
    },
    {
      title: "Governmental Restrictions",
      desc: "Analyze state policies that reduce ethnic rights through cultural, autonomy-related, and independence-related restrictions.",
      icon: "⚖️",
    },
    {
      title: "Group Characteristics",
      desc: "Explore structural characteristics associated with the groups represented by self-determination movements, including relative group size, geographic concentration, and access to political power.",
      icon: "👥",
    },
  ];

  return (

    <Container className="mt-5 mb-5">

      {/* =====================================================
          PAGE HEADER
      ====================================================== */}

      <Card className="border-0 shadow-sm p-4 p-md-5 mb-5 bg-white rounded-4 text-center">

        <div className="py-2">

          <Badge
            bg="primary"
            className="px-3 py-2 fs-6 mb-3 rounded-pill"
          >

            About the Research Dashboard

          </Badge>


          <h1 className="fw-bold text-dark display-5">

            SDM 2.0 Research & Visual Analytics Platform

          </h1>


          <p
            className="lead text-muted mx-auto mt-3 mb-0"
            style={{ maxWidth: "850px" }}
          >

            This dashboard provides an interactive environment for
            exploring and interpreting the SDM 2.0 dataset on
            self-determination movements. It brings together
            geographical, historical, political, conflict-related,
            and structural dimensions of self-determination into
            a single research-oriented interface.

          </p>

        </div>

      </Card>


      {/* =====================================================
          ABOUT THE DATASET
      ====================================================== */}

      <Row className="g-4 mb-5">

        <Col lg={8}>

          <Card className="border-0 shadow-sm p-4 p-md-5 rounded-4 h-100">

            <Badge
              bg="info"
              text="dark"
              className="px-3 py-2 mb-3 rounded-pill"
              style={{ width: "fit-content" }}
            >

              Dataset Overview

            </Badge>


            <h2 className="fw-bold mb-3">

              About SDM 2.0

            </h2>


            <p className="text-muted">

              SDM 2.0 is a global dataset covering
              <strong> 502 self-determination movements</strong>
              across <strong>124 countries</strong> between
              <strong> 1945 and 2020</strong>.

            </p>


            <p className="text-muted">

              The dataset focuses on politically significant
              self-determination movements connected to ethnic
              groups. It captures a broad range of political
              demands, including claims for internal autonomy,
              territorial self-government, independence, and
              irredentist outcomes.

            </p>


            <p className="text-muted mb-0">

              In addition to political claims, SDM 2.0 includes
              information on separatist armed conflict,
              unilateral sovereignty declarations, governmental
              concessions and restrictions affecting ethnic rights,
              and several structural characteristics of the groups
              associated with these movements.

            </p>

          </Card>

        </Col>


        <Col lg={4}>

          <Card className="border-0 shadow-sm p-4 rounded-4 h-100 bg-light">

            <h5 className="fw-bold mb-4">

              Dataset at a Glance

            </h5>


            <div className="mb-4">

              <h3 className="fw-bold text-primary mb-1">

                502

              </h3>

              <span className="text-muted">

                Self-Determination Movements

              </span>

            </div>


            <div className="mb-4">

              <h3 className="fw-bold text-success mb-1">

                124

              </h3>

              <span className="text-muted">

                Countries

              </span>

            </div>


            <div>

              <h3 className="fw-bold text-danger mb-1">

                1945–2020

              </h3>

              <span className="text-muted">

                Historical Coverage

              </span>

            </div>

          </Card>

        </Col>

      </Row>


      {/* =====================================================
          PURPOSE
      ====================================================== */}

      <Row className="g-4 mb-5">

        <Col lg={12}>

          <Card className="border-0 shadow-sm p-4 p-md-5 rounded-4">

            <h2 className="fw-bold mb-3">

              Purpose of the Dashboard

            </h2>


            <p className="text-muted">

              The purpose of this dashboard is to make a complex
              research dataset easier to access, explore, and
              interpret. Rather than requiring users to work
              directly with raw data tables, the platform organizes
              key variables into thematic analytical sections and
              presents results through interactive visualizations
              and selected statistical analyses.

            </p>


            <p className="text-muted mb-0">

              The dashboard is designed primarily as a research
              support tool. It can help users identify patterns,
              compare movement characteristics, explore government
              responses, and develop questions for further empirical
              investigation.

            </p>

          </Card>

        </Col>

      </Row>


      {/* =====================================================
          ANALYTICAL DOMAINS
      ====================================================== */}

      <div className="text-center mb-4">

        <Badge
          bg="dark"
          className="px-3 py-2 fs-6 mb-3 rounded-pill"
        >

          Analytical Scope

        </Badge>


        <h2 className="fw-bold text-dark">

          Key Analytical Domains

        </h2>


        <p
          className="text-muted mx-auto"
          style={{ maxWidth: "800px" }}
        >

          The dashboard organizes the dataset into seven major
          analytical domains, each focusing on a different
          dimension of self-determination movements.

        </p>

      </div>


      <Row className="g-4 mb-5">

        {analyticalCapabilities.map((item, index) => (

          <Col key={index} md={6} lg={4}>

            <Card
              className="h-100 border-0 shadow-sm p-4 rounded-4"
            >

              <div className="d-flex align-items-center mb-3">

                <span className="fs-2 me-3">

                  {item.icon}

                </span>


                <h5 className="fw-bold mb-0 text-dark">

                  {item.title}

                </h5>

              </div>


              <p className="text-muted small mb-0">

                {item.desc}

              </p>

            </Card>

          </Col>

        ))}

      </Row>


      {/* =====================================================
          HOW TO USE
      ====================================================== */}

      <Row className="g-4 mb-5">

        <Col lg={6}>

          <Card className="border-0 shadow-sm p-4 p-md-5 rounded-4 h-100">

            <h3 className="fw-bold mb-3">

              How Researchers Can Use the Platform

            </h3>


            <p className="text-muted">

              Researchers can use the dashboard to explore the
              distribution and evolution of self-determination
              movements, compare political claims, examine conflict
              patterns, and investigate how governments respond to
              self-determination demands.

            </p>


            <p className="text-muted mb-0">

              The visualizations can also serve as a starting point
              for identifying trends, comparing groups or regions,
              and developing more focused research questions for
              subsequent statistical or qualitative investigation.

            </p>

          </Card>

        </Col>


        <Col lg={6}>

          <Card className="border-0 shadow-sm p-4 p-md-5 rounded-4 h-100">

            <h3 className="fw-bold mb-3">

              Research-Oriented Features

            </h3>


            <ul className="text-muted">

              <li className="mb-3">

                Interactive visualizations designed to support
                exploration and comparison.

              </li>


              <li className="mb-3">

                Thematic organization of complex variables into
                clearly defined analytical domains.

              </li>


              <li className="mb-3">

                Descriptive summaries of movements, observations,
                events, and government responses.

              </li>


              <li className="mb-3">

                Selected inferential analyses, including
                Chi-Square tests of independence.

              </li>


              <li>

                Explanatory descriptions that clarify the meaning
                of variables and visual results for users who may
                be unfamiliar with the SDM dataset.

              </li>

            </ul>

          </Card>

        </Col>

      </Row>


      {/* =====================================================
          IMPORTANT METHODOLOGICAL NOTE
      ====================================================== */}

      <Alert
        variant="secondary"
        className="border-0 shadow-sm rounded-4 p-4"
      >

        <h5 className="fw-bold">

          Important Note for Interpreting Results

        </h5>


        <p className="mb-0 text-muted">

          The SDM 2.0 dataset contains both movement-level and
          time-varying information. As a result, different
          visualizations may summarize distinct movements,
          annual observations, or recorded events. These analytical
          levels should not be interpreted as equivalent measures.
          Users are encouraged to read the explanations provided
          within each analytical section and consult the SDM 2.0
          Codebook when interpreting results or conducting further
          research.

        </p>

      </Alert>

    </Container>

  );

}

export default About;