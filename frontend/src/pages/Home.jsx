import React from "react";
import { Container, Row, Col, Card, Button, Badge } from "react-bootstrap";
import { Link } from "react-router-dom";

function Home() {
  const stats = [
    { label: "Total Movements Analyzed", value: "502", icon: "🌍", color: "primary" },
    { label: "Observation Period", value: "1945 – 2020", icon: "📅", color: "success" },
    { label: "Analytical Domains", value: "7 Modules", icon: "📊", color: "warning" },
  ];

  const features = [
    {
      title: "Interactive Visualizations",
      desc: "Dynamic charts and graphs built for deep exploration of SDM trends.",
      icon: "📈",
      bgColor: "bg-primary-subtle",
    },
    {
      title: "SQL Analytics Engine",
      desc: "Robust query layer filtering indicators across complex geopolitical variables.",
      icon: "🗄️",
      bgColor: "bg-success-subtle",
    },
    {
      title: "RESTful API Integration",
      desc: "Seamless full-stack communication between React client and Node.js backend.",
      icon: "⚡",
      bgColor: "bg-warning-subtle",
    },
    {
      title: "Empirical Inferential Tests",
      desc: "Integrated Chi-Square tests validating statistical significance between variables.",
      icon: "🔬",
      bgColor: "bg-danger-subtle",
    },
  ];

  return (
    <div>
      {/* 1. Hero Section Banner */}
      <div 
        className="bg-dark text-white py-5 mb-5 shadow-sm" 
        style={{ background: "linear-gradient(135deg, #0f172a 0%, #1e293b 100%)" }}
      >
        <Container className="py-4 text-center">
          <Badge bg="primary" className="px-3 py-2 fs-6 mb-3 rounded-pill shadow-sm">
            SDM 2.0 Visual Analytics Platform
          </Badge>
          <h1 className="display-4 fw-bold mb-3 text-white">
            Interactive Dashboard for <br />
            <span style={{ color: "#38bdf8" }}>Self-Determination Movements</span>
          </h1>
          <p className="lead text-light mx-auto mb-4" style={{ maxWidth: "800px", opacity: "0.9" }}>
            Explore historical trends, conflict dynamics, state concessions, and political restrictions across global self-determination movements (1945–2020).
          </p>
          <div className="d-flex justify-content-center gap-3">
            <Button as={Link} to="/dashboard" variant="primary" size="lg" className="px-4 py-2 rounded-pill fw-bold shadow-sm">
              Explore Dashboard 🚀
            </Button>
            <Button as={Link} to="/about" variant="outline-light" size="lg" className="px-4 py-2 rounded-pill fw-semibold">
              Learn More ℹ️
            </Button>
          </div>
        </Container>
      </div>

      <Container className="mb-5">
        {/* 2. Key Statistics Cards */}
        <Row className="g-4 mb-5">
          {stats.map((stat, index) => (
            <Col key={index} md={4}>
              <Card className="border-0 shadow-sm text-center p-4 rounded-4 bg-white h-100 hover-card">
                <div className="fs-1 mb-2">{stat.icon}</div>
                <h2 className={`fw-bold text-${stat.color} mb-1`}>{stat.value}</h2>
                <span className="text-muted fw-semibold small">{stat.label}</span>
              </Card>
            </Col>
          ))}
        </Row>

        {/* 3. Context & Background Section (إيضاح ملف البيانات والمفهوم) */}
        <Card className="border-0 shadow-sm p-4 p-md-5 mb-5 rounded-4 bg-white">
          <Row className="align-items-center g-4">
            <Col lg={7}>
              <Badge bg="info" className="px-3 py-2 fs-6 mb-3 text-dark rounded-pill">
                Context & Background
              </Badge>
              <h2 className="fw-bold text-dark mb-3">What are Self-Determination Movements?</h2>
              <p className="text-secondary lead fs-6">
                <strong>Self-Determination Movements (SDM)</strong> represent organized political and social efforts by sub-national groups seeking greater political autonomy, legal recognition, territorial self-governance, or full independence from a sovereign state.
              </p>
              <p className="text-muted mb-0">
                This dashboard utilizes the empirical <strong>SDM 2.0 Dataset</strong>, covering political, institutional, and conflict indicators of <strong>502 self-determination groups worldwide</strong> between <strong>1945 and 2020</strong>. It allows users to examine how strategies, state concessions, and government restrictions interact over time.
              </p>
            </Col>
            <Col lg={5}>
              <div className="p-4 rounded-4 bg-light border border-1 shadow-sm">
                <h5 className="fw-bold text-dark mb-3">📌 Key Dataset Highlights</h5>
                <ul className="list-unstyled mb-0">
                  <li className="mb-2 d-flex align-items-start">
                    <span className="me-2 text-primary">✔</span>
                    <span><strong>Global Scope:</strong> Includes movements across Africa, Americas, Asia, Europe, and Oceania.</span>
                  </li>
                  <li className="mb-2 d-flex align-items-start">
                    <span className="me-2 text-primary">✔</span>
                    <span><strong>Historical Depth:</strong> Track changes across 75 years of geopolitical shifts post-WWII.</span>
                  </li>
                  <li className="d-flex align-items-start">
                    <span className="me-2 text-primary">✔</span>
                    <span><strong>Multidimensional Attributes:</strong> Covers claim types, sovereignty declarations, violence escalation, and policy concessions.</span>
                  </li>
                </ul>
              </div>
            </Col>
          </Row>
        </Card>

        {/* 4. Dashboard Features Section */}
        <div className="text-center mb-4">
          <h2 className="fw-bold text-dark">Platform Capabilities</h2>
          <p className="text-muted">Core engineering features designed for seamless analytical workflow</p>
        </div>

        <Row className="g-4">
          {features.map((item, index) => (
            <Col key={index} md={6} lg={3}>
              <Card className="border-0 shadow-sm p-4 rounded-4 h-100 bg-white hover-card">
                <div className={`p-3 rounded-3 d-inline-block fs-3 mb-3 ${item.bgColor}`}>
                  {item.icon}
                </div>
                <h5 className="fw-bold text-dark mb-2">{item.title}</h5>
                <p className="text-muted small mb-0">{item.desc}</p>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
}

export default Home;