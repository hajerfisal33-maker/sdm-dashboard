import React from "react";
import { Container, Row, Col, Card, Badge } from "react-bootstrap";

function About() {
  const techStack = [
    { name: "React", category: "Frontend" },
    { name: "Node.js", category: "Backend" },
    { name: "Express.js", category: "Backend" },
    { name: "MySQL", category: "Database" },
    { name: "Python", category: "Data Pipeline" },
  ];

  const analyticalCapabilities = [
    {
      title: "Geographical & Temporal Trends",
      desc: "Analyze global distribution patterns and historical evolution of movements from 1945 to 2020.",
      icon: "🌐",
    },
    {
      title: "Claim Types & Sovereignty",
      desc: "Explore categories of movement demands, autonomy structures, and unilateral declarations of independence.",
      icon: "📜",
    },
    {
      title: "Conflict Intensity & Escalation",
      desc: "Track patterns of non-violent strategies versus violent escalation thresholds across different regions.",
      icon: "📈",
    },
    {
      title: "State Responses & Concessions",
      desc: "Examine government policy outcomes, including political, cultural, and administrative concessions granted.",
      icon: "🤝",
    },
    {
      title: "Governmental Restrictions",
      desc: "Assess state-imposed constraints, policy lockdowns, and legal restrictions on self-determination groups.",
      icon: "⚖️",
    },
    {
      title: "Statistical & Inferential Modeling",
      desc: "Validate relationships across movement characteristics using robust statistical significance testing (Chi-Square).",
      icon: "📊",
    },
  ];

  return (
    <Container className="mt-5 mb-5">
      {/* 1. Header Banner */}
      <Card className="border-0 shadow-sm p-4 mb-4 bg-white rounded-4 text-center">
        <div className="py-2">
          <Badge bg="primary" className="px-3 py-2 fs-6 mb-3 rounded-pill">
            SDM 2.0 Dataset Visualizer
          </Badge>
          <h1 className="fw-bold text-dark display-5">About This Dashboard</h1>
          <p className="lead text-muted mx-auto" style={{ maxWidth: "820px" }}>
            An interactive analytical platform built to visualize and explore the 
            <strong> Self-Determination Movements (SDM 2.0)</strong> dataset. It enables researchers 
            and analysts to uncover historical patterns, movement behaviors, and state responses through interactive charts and empirical modeling.
          </p>
        </div>
      </Card>

      {/* 2. Analytical Focus Areas */}
      <h3 className="fw-bold mb-3 text-dark">🔍 Key Analytical Domains</h3>
      <Row className="g-3 mb-5">
        {analyticalCapabilities.map((item, index) => (
          <Col key={index} md={6} lg={4}>
            <Card className="h-100 border-0 shadow-sm p-3 rounded-3">
              <div className="d-flex align-items-center mb-2">
                <span className="fs-3 me-2">{item.icon}</span>
                <h6 className="fw-bold mb-0 text-dark">{item.title}</h6>
              </div>
              <p className="text-muted small mb-0">{item.desc}</p>
            </Card>
          </Col>
        ))}
      </Row>

      {/* 3. Technology Stack */}
      <h3 className="fw-bold mb-3 text-dark">⚙️ Built With</h3>
      <Row className="g-3">
        {techStack.map((tech, index) => (
          <Col key={index} xs={6} md={4} lg={2.4}>
            <Card className="h-100 border-0 shadow-sm text-center p-3 rounded-3">
              <span className="text-muted small fw-semibold">{tech.category}</span>
              <h5 className="fw-bold mt-1 mb-0 text-dark">{tech.name}</h5>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default About;