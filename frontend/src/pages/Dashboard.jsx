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
            accent: "#2563eb"
        },
        {
            number: "02",
            title: "Claims & Movement Duration",
            description:
                "Examine the types of self-determination claims and the duration of movement activity across claim categories.",
            path: "/bq2",
            accent: "#7c3aed"
        },
        {
            number: "03",
            title: "Sovereignty Declarations",
            description:
                "Explore unilateral sovereignty declarations and their relationship with movement claim types.",
            path: "/bq3",
            accent: "#0891b2"
        },
        {
            number: "04",
            title: "Violence & Conflict Dynamics",
            description:
                "Examine violence, escalation, and the onset of armed conflict among self-determination movements.",
            path: "/bq4",
            accent: "#dc2626"
        },
        {
            number: "05",
            title: "Government Concessions",
            description:
                "Explore government responses that increase ethnic rights through cultural, autonomy, or independence-related concessions.",
            path: "/bq5",
            accent: "#059669"
        },
        {
            number: "06",
            title: "Government Restrictions",
            description:
                "Examine government responses that restrict cultural, autonomy, or independence-related rights.",
            path: "/bq6",
            accent: "#d97706"
        },
        {
            number: "07",
            title: "Group Characteristics",
            description:
                "Explore group size, geographic concentration, and political power characteristics associated with movements.",
            path: "/bq7",
            accent: "#4f46e5"
        }
    ];


    return (

        <div
            style={{
                minHeight: "100vh",
                background:
                    "radial-gradient(circle at 8% 12%, rgba(37,99,235,0.07), transparent 24%), radial-gradient(circle at 92% 18%, rgba(124,58,237,0.06), transparent 22%), radial-gradient(circle at 50% 90%, rgba(8,145,178,0.045), transparent 28%), #f8fafc",
                color: "#172033",
                position: "relative",
                overflow: "hidden"
            }}
        >

            {/* =====================================================
                VERY LIGHT BACKGROUND DECORATION
            ====================================================== */}

            <div
                style={{
                    position: "absolute",
                    width: "420px",
                    height: "420px",
                    borderRadius: "50%",
                    border: "1px solid rgba(37,99,235,0.07)",
                    right: "-190px",
                    top: "90px",
                    pointerEvents: "none"
                }}
            />

            <div
                style={{
                    position: "absolute",
                    width: "280px",
                    height: "280px",
                    borderRadius: "50%",
                    border: "1px solid rgba(124,58,237,0.06)",
                    left: "-150px",
                    top: "520px",
                    pointerEvents: "none"
                }}
            />

            <div
                style={{
                    position: "absolute",
                    width: "160px",
                    height: "160px",
                    borderRadius: "50%",
                    background: "rgba(37,99,235,0.035)",
                    right: "15%",
                    top: "420px",
                    pointerEvents: "none"
                }}
            />


            <Container
                className="py-5"
                style={{
                    position: "relative",
                    zIndex: 1,
                    maxWidth: "1180px"
                }}
            >

                {/* =====================================================
                    HEADER
                ====================================================== */}

                <div
                    style={{
                        background: "rgba(255,255,255,0.94)",
                        border: "1px solid #e7ebf2",
                        borderRadius: "26px",
                        padding: "48px 45px",
                        marginBottom: "42px",
                        boxShadow: "0 10px 35px rgba(15,23,42,0.05)"
                    }}
                >

                    <Badge
                        style={{
                            background: "#eaf2ff",
                            color: "#2563eb",
                            fontSize: "0.78rem",
                            fontWeight: 700,
                            padding: "9px 15px",
                            borderRadius: "50px",
                            marginBottom: "18px"
                        }}
                    >
                        Research Dashboard
                    </Badge>


                    <h1
                        style={{
                            fontSize: "clamp(2.2rem, 5vw, 3.7rem)",
                            fontWeight: 800,
                            letterSpacing: "-1.5px",
                            lineHeight: 1.08,
                            color: "#111827",
                            marginBottom: "18px"
                        }}
                    >
                        Explore the SDM 2.0 Dataset
                    </h1>


                    <p
                        style={{
                            maxWidth: "820px",
                            fontSize: "1.05rem",
                            lineHeight: 1.8,
                            color: "#64748b",
                            marginBottom: 0
                        }}
                    >
                        Use the dashboard as a starting point for exploring
                        self-determination movements, examining analytical
                        patterns, and comparing geographical contexts across
                        the dataset.
                    </p>

                </div>


                {/* =====================================================
                    EXPLORE
                ====================================================== */}

                <section style={{ marginBottom: "45px" }}>

                    <div style={{ marginBottom: "22px" }}>

                        <div
                            style={{
                                fontSize: "0.75rem",
                                fontWeight: 800,
                                letterSpacing: "1.5px",
                                color: "#2563eb",
                                textTransform: "uppercase",
                                marginBottom: "7px"
                            }}
                        >
                            Start Exploring
                        </div>


                        <h2
                            style={{
                                fontSize: "1.8rem",
                                fontWeight: 800,
                                color: "#111827",
                                marginBottom: "8px"
                            }}
                        >
                            Explore & Compare
                        </h2>


                        <p
                            style={{
                                color: "#64748b",
                                marginBottom: 0,
                                lineHeight: 1.7
                            }}
                        >
                            Explore movements geographically or compare
                            patterns across larger geographical areas.
                        </p>

                    </div>


                    <Row className="g-4">

                        {/* COUNTRY / GLOBE */}

                        <Col lg={6}>

                            <Card
                                as={Link}
                                to="/globe"
                                style={{
                                    height: "100%",
                                    textDecoration: "none",
                                    border: "1px solid #e4e9f1",
                                    borderRadius: "22px",
                                    background: "#ffffff",
                                    boxShadow: "0 8px 28px rgba(15,23,42,0.055)",
                                    overflow: "hidden",
                                    transition: "all 0.25s ease"
                                }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.transform =
                                        "translateY(-5px)";
                                    e.currentTarget.style.boxShadow =
                                        "0 18px 40px rgba(37,99,235,0.12)";
                                    e.currentTarget.style.borderColor =
                                        "#cbdcfb";
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.transform = "none";
                                    e.currentTarget.style.boxShadow =
                                        "0 8px 28px rgba(15,23,42,0.055)";
                                    e.currentTarget.style.borderColor =
                                        "#e4e9f1";
                                }}
                            >

                                <Card.Body style={{ padding: "34px" }}>

                                    <div
                                        style={{
                                            width: "58px",
                                            height: "58px",
                                            borderRadius: "17px",
                                            background: "#edf4ff",
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "center",
                                            fontSize: "1.7rem",
                                            marginBottom: "20px"
                                        }}
                                    >
                                        🌍
                                    </div>


                                    <Badge
                                        style={{
                                            background: "#edf4ff",
                                            color: "#2563eb",
                                            padding: "8px 13px",
                                            borderRadius: "50px",
                                            fontWeight: 700,
                                            fontSize: "0.73rem",
                                            marginBottom: "15px"
                                        }}
                                    >
                                        Geographic Exploration
                                    </Badge>


                                    <h3
                                        style={{
                                            fontWeight: 800,
                                            color: "#111827",
                                            marginBottom: "12px"
                                        }}
                                    >
                                        Explore Countries
                                    </h3>


                                    <p
                                        style={{
                                            color: "#64748b",
                                            lineHeight: 1.75,
                                            marginBottom: "20px"
                                        }}
                                    >
                                        Explore self-determination movements
                                        through the interactive globe, select
                                        individual countries, and examine
                                        movement-level details.
                                    </p>


                                    <div
                                        style={{
                                            color: "#2563eb",
                                            fontWeight: 700
                                        }}
                                    >
                                        Explore the Globe
                                        <span style={{ marginLeft: "8px" }}>
                                            →
                                        </span>
                                    </div>

                                </Card.Body>

                            </Card>

                        </Col>


                        {/* CONTINENTS */}

                        <Col lg={6}>

                            <Card
                                as={Link}
                                to="/continent-comparison"
                                style={{
                                    height: "100%",
                                    textDecoration: "none",
                                    border: "1px solid #e4e9f1",
                                    borderRadius: "22px",
                                    background: "#ffffff",
                                    boxShadow: "0 8px 28px rgba(15,23,42,0.055)",
                                    overflow: "hidden",
                                    transition: "all 0.25s ease"
                                }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.transform =
                                        "translateY(-5px)";
                                    e.currentTarget.style.boxShadow =
                                        "0 18px 40px rgba(5,150,105,0.11)";
                                    e.currentTarget.style.borderColor =
                                        "#c8eadf";
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.transform = "none";
                                    e.currentTarget.style.boxShadow =
                                        "0 8px 28px rgba(15,23,42,0.055)";
                                    e.currentTarget.style.borderColor =
                                        "#e4e9f1";
                                }}
                            >

                                <Card.Body style={{ padding: "34px" }}>

                                    <div
                                        style={{
                                            width: "58px",
                                            height: "58px",
                                            borderRadius: "17px",
                                            background: "#ecfdf5",
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "center",
                                            fontSize: "1.7rem",
                                            marginBottom: "20px"
                                        }}
                                    >
                                        🌎
                                    </div>


                                    <Badge
                                        style={{
                                            background: "#ecfdf5",
                                            color: "#059669",
                                            padding: "8px 13px",
                                            borderRadius: "50px",
                                            fontWeight: 700,
                                            fontSize: "0.73rem",
                                            marginBottom: "15px"
                                        }}
                                    >
                                        Continental Analysis
                                    </Badge>


                                    <h3
                                        style={{
                                            fontWeight: 800,
                                            color: "#111827",
                                            marginBottom: "12px"
                                        }}
                                    >
                                        Compare Continents
                                    </h3>


                                    <p
                                        style={{
                                            color: "#64748b",
                                            lineHeight: 1.75,
                                            marginBottom: "20px"
                                        }}
                                    >
                                        Compare self-determination movements
                                        across continents and examine how
                                        political and movement patterns differ
                                        geographically.
                                    </p>


                                    <div
                                        style={{
                                            color: "#059669",
                                            fontWeight: 700
                                        }}
                                    >
                                        Compare Continents
                                        <span style={{ marginLeft: "8px" }}>
                                            →
                                        </span>
                                    </div>

                                </Card.Body>

                            </Card>

                        </Col>

                    </Row>

                </section>


                {/* =====================================================
                    COUNTRY COMPARISON
                ====================================================== */}

                <section style={{ marginBottom: "50px" }}>

                    <Card
                        style={{
                            border: "1px solid #dbe4f0",
                            borderRadius: "22px",
                            background:
                                "linear-gradient(135deg, #f8fbff 0%, #ffffff 100%)",
                            boxShadow: "0 8px 28px rgba(15,23,42,0.045)"
                        }}
                    >

                        <Card.Body style={{ padding: "32px 35px" }}>

                            <Row className="align-items-center">

                                <Col lg={8}>

                                    <Badge
                                        style={{
                                            background: "#f1f5f9",
                                            color: "#475569",
                                            padding: "8px 13px",
                                            borderRadius: "50px",
                                            fontWeight: 700,
                                            fontSize: "0.73rem",
                                            marginBottom: "14px"
                                        }}
                                    >
                                        Comparative Analysis
                                    </Badge>


                                    <h3
                                        style={{
                                            fontWeight: 800,
                                            color: "#111827",
                                            marginBottom: "10px"
                                        }}
                                    >
                                        Compare Countries
                                    </h3>


                                    <p
                                        style={{
                                            color: "#64748b",
                                            lineHeight: 1.75,
                                            marginBottom: 0
                                        }}
                                    >
                                        Select two countries from the
                                        interactive globe and compare their
                                        self-determination movements across
                                        key indicators such as violence,
                                        sovereignty declarations, concessions,
                                        and restrictions.
                                    </p>

                                </Col>


                                <Col
                                    lg={4}
                                    className="text-lg-end mt-4 mt-lg-0"
                                >

                                    <Link
                                        to="/globe"
                                        style={{
                                            display: "inline-flex",
                                            alignItems: "center",
                                            justifyContent: "center",
                                            gap: "9px",
                                            background: "#2563eb",
                                            color: "#ffffff",
                                            textDecoration: "none",
                                            fontWeight: 700,
                                            padding: "12px 22px",
                                            borderRadius: "12px",
                                            boxShadow:
                                                "0 6px 18px rgba(37,99,235,0.20)",
                                            transition: "all 0.2s ease"
                                        }}
                                        onMouseEnter={(e) => {
                                            e.currentTarget.style.background =
                                                "#1d4ed8";
                                            e.currentTarget.style.transform =
                                                "translateY(-2px)";
                                        }}
                                        onMouseLeave={(e) => {
                                            e.currentTarget.style.background =
                                                "#2563eb";
                                            e.currentTarget.style.transform =
                                                "none";
                                        }}
                                    >
                                        Start with the Globe
                                        <span>→</span>
                                    </Link>

                                </Col>

                            </Row>

                        </Card.Body>

                    </Card>

                </section>


                {/* =====================================================
                    ANALYTICAL QUESTIONS
                ====================================================== */}

                <section>

                    <div style={{ marginBottom: "24px" }}>

                        <div
                            style={{
                                fontSize: "0.75rem",
                                fontWeight: 800,
                                letterSpacing: "1.5px",
                                color: "#64748b",
                                textTransform: "uppercase",
                                marginBottom: "7px"
                            }}
                        >
                            Research Analysis
                        </div>


                        <h2
                            style={{
                                fontSize: "1.8rem",
                                fontWeight: 800,
                                color: "#111827",
                                marginBottom: "8px"
                            }}
                        >
                            Analytical Questions
                        </h2>


                        <p
                            style={{
                                color: "#64748b",
                                lineHeight: 1.7,
                                maxWidth: "780px",
                                marginBottom: 0
                            }}
                        >
                            Explore seven research-focused analytical areas
                            covering geography, claims, conflict, government
                            responses, and group characteristics.
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
                                    style={{
                                        height: "100%",
                                        textDecoration: "none",
                                        border: "1px solid #e4e9f1",
                                        borderRadius: "20px",
                                        background: "#ffffff",
                                        boxShadow:
                                            "0 6px 22px rgba(15,23,42,0.045)",
                                        overflow: "hidden",
                                        transition:
                                            "transform 0.22s ease, box-shadow 0.22s ease"
                                    }}
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.transform =
                                            "translateY(-4px)";
                                        e.currentTarget.style.boxShadow =
                                            "0 15px 32px rgba(15,23,42,0.09)";
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.transform = "none";
                                        e.currentTarget.style.boxShadow =
                                            "0 6px 22px rgba(15,23,42,0.045)";
                                    }}
                                >

                                    {/* Accent line */}

                                    <div
                                        style={{
                                            height: "4px",
                                            background: section.accent
                                        }}
                                    />


                                    <Card.Body style={{ padding: "25px" }}>

                                        <div
                                            style={{
                                                display: "flex",
                                                justifyContent: "space-between",
                                                alignItems: "center",
                                                marginBottom: "22px"
                                            }}
                                        >

                                            <span
                                                style={{
                                                    fontSize: "0.78rem",
                                                    fontWeight: 800,
                                                    color: section.accent,
                                                    letterSpacing: "1px"
                                                }}
                                            >
                                                {section.number}
                                            </span>


                                            <span
                                                style={{
                                                    width: "32px",
                                                    height: "32px",
                                                    borderRadius: "10px",
                                                    background: "#f8fafc",
                                                    color: "#64748b",
                                                    display: "flex",
                                                    alignItems: "center",
                                                    justifyContent: "center",
                                                    fontSize: "1rem"
                                                }}
                                            >
                                                →
                                            </span>

                                        </div>


                                        <h5
                                            style={{
                                                fontWeight: 800,
                                                color: "#111827",
                                                lineHeight: 1.4,
                                                marginBottom: "11px"
                                            }}
                                        >
                                            {section.title}
                                        </h5>


                                        <p
                                            style={{
                                                color: "#64748b",
                                                fontSize: "0.88rem",
                                                lineHeight: 1.7,
                                                marginBottom: 0
                                            }}
                                        >
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

                <div
                    style={{
                        marginTop: "45px",
                        marginBottom: "15px",
                        padding: "20px 23px",
                        background: "#f1f5f9",
                        border: "1px solid #e2e8f0",
                        borderRadius: "15px"
                    }}
                >

                    <p
                        style={{
                            color: "#64748b",
                            fontSize: "0.82rem",
                            lineHeight: 1.7,
                            marginBottom: 0
                        }}
                    >

                        <strong style={{ color: "#334155" }}>
                            Reading the dashboard:
                        </strong>{" "}

                        Depending on the research question, visualizations
                        may summarize distinct self-determination movements
                        or annual movement observations. Results should
                        therefore be interpreted according to the analytical
                        level used by each section.

                    </p>

                </div>


            </Container>

        </div>

    );

}


export default Dashboard;