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
                    "radial-gradient(circle at 8% 12%, rgba(37,99,235,0.06), transparent 24%), radial-gradient(circle at 92% 18%, rgba(124,58,237,0.05), transparent 22%), #f8fafc",
                color: "#172033",
                position: "relative",
                overflow: "hidden"
            }}
        >

            {/* =====================================================
                BACKGROUND DECORATION
            ====================================================== */}

            <div
                style={{
                    position: "absolute",
                    width: "420px",
                    height: "420px",
                    borderRadius: "50%",
                    border: "1px solid rgba(37,99,235,0.055)",
                    right: "-190px",
                    top: "100px",
                    pointerEvents: "none"
                }}
            />

            <div
                style={{
                    position: "absolute",
                    width: "300px",
                    height: "300px",
                    borderRadius: "50%",
                    border: "1px solid rgba(124,58,237,0.05)",
                    left: "-160px",
                    top: "550px",
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
                        background: "rgba(255,255,255,0.96)",
                        border: "1px solid #e5e9f0",
                        borderRadius: "26px",
                        padding: "48px 45px",
                        marginBottom: "42px",
                        boxShadow: "0 10px 35px rgba(15,23,42,0.045)"
                    }}
                >

                    <Badge
                        style={{
                            background: "#f1f5f9",
                            color: "#475569",
                            fontSize: "0.75rem",
                            fontWeight: 700,
                            padding: "8px 14px",
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
                        Explore self-determination movements through
                        geographical perspectives and research-focused
                        analytical questions covering the SDM 2.0 dataset.
                    </p>

                </div>


                {/* =====================================================
                    EXPLORATION HUB
                ====================================================== */}

                <section style={{ marginBottom: "55px" }}>

                    <div style={{ marginBottom: "24px" }}>

                        <div
                            style={{
                                fontSize: "0.72rem",
                                fontWeight: 800,
                                letterSpacing: "1.5px",
                                color: "#64748b",
                                textTransform: "uppercase",
                                marginBottom: "7px"
                            }}
                        >
                            Explore
                        </div>


                        <h2
                            style={{
                                fontSize: "1.9rem",
                                fontWeight: 800,
                                color: "#111827",
                                marginBottom: "8px"
                            }}
                        >
                            Explore the Dataset
                        </h2>


                        <p
                            style={{
                                color: "#64748b",
                                lineHeight: 1.7,
                                marginBottom: 0
                            }}
                        >
                            Choose a geographical perspective to begin
                            exploring the dataset.
                        </p>

                    </div>


                    <Row className="g-4">

                        {/* =================================================
                            EXPLORE COUNTRIES
                        ================================================== */}

                        <Col lg={6}>

                            <Card
                                as={Link}
                                to="/globe"
                                style={{
                                    height: "100%",
                                    textDecoration: "none",
                                    border: "1px solid #e1e7ef",
                                    borderRadius: "23px",
                                    background: "#ffffff",
                                    boxShadow:
                                        "0 8px 28px rgba(15,23,42,0.055)",
                                    overflow: "hidden",
                                    transition:
                                        "transform 0.25s ease, box-shadow 0.25s ease"
                                }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.transform =
                                        "translateY(-5px)";

                                    e.currentTarget.style.boxShadow =
                                        "0 18px 40px rgba(37,99,235,0.12)";
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.transform =
                                        "none";

                                    e.currentTarget.style.boxShadow =
                                        "0 8px 28px rgba(15,23,42,0.055)";
                                }}
                            >

                                {/* Blue top line */}

                                <div
                                    style={{
                                        height: "4px",
                                        background: "#2563eb"
                                    }}
                                />


                                <Card.Body
                                    style={{
                                        padding: "36px"
                                    }}
                                >

                                    <div
                                        style={{
                                            width: "62px",
                                            height: "62px",
                                            borderRadius: "18px",
                                            background: "#edf4ff",
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "center",
                                            fontSize: "1.8rem",
                                            marginBottom: "22px"
                                        }}
                                    >
                                        🌍
                                    </div>


                                    {/* Neutral badge */}

                                    <Badge
                                        style={{
                                            background: "#f1f5f9",
                                            color: "#64748b",
                                            padding: "7px 12px",
                                            borderRadius: "50px",
                                            fontWeight: 700,
                                            fontSize: "0.7rem",
                                            marginBottom: "14px"
                                        }}
                                    >
                                        Countries
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
                                            marginBottom: "22px"
                                        }}
                                    >
                                        Explore self-determination movements
                                        across countries using the interactive
                                        globe and examine movement-level
                                        information for selected countries.
                                    </p>


                                    <div
                                        style={{
                                            display: "inline-flex",
                                            alignItems: "center",
                                            gap: "8px",
                                            color: "#2563eb",
                                            fontWeight: 700
                                        }}
                                    >
                                        Explore Countries
                                        <span>→</span>
                                    </div>

                                </Card.Body>

                            </Card>

                        </Col>


                        {/* =================================================
                            EXPLORE CONTINENTS
                        ================================================== */}

                        <Col lg={6}>

                            <Card
                                as={Link}
                                to="/continent-comparison"
                                style={{
                                    height: "100%",
                                    textDecoration: "none",
                                    border: "1px solid #e1e7ef",
                                    borderRadius: "23px",
                                    background: "#ffffff",
                                    boxShadow:
                                        "0 8px 28px rgba(15,23,42,0.055)",
                                    overflow: "hidden",
                                    transition:
                                        "transform 0.25s ease, box-shadow 0.25s ease"
                                }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.transform =
                                        "translateY(-5px)";

                                    e.currentTarget.style.boxShadow =
                                        "0 18px 40px rgba(5,150,105,0.11)";
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.transform =
                                        "none";

                                    e.currentTarget.style.boxShadow =
                                        "0 8px 28px rgba(15,23,42,0.055)";
                                }}
                            >

                                {/* Green top line */}

                                <div
                                    style={{
                                        height: "4px",
                                        background: "#059669"
                                    }}
                                />


                                <Card.Body
                                    style={{
                                        padding: "36px"
                                    }}
                                >

                                    <div
                                        style={{
                                            width: "62px",
                                            height: "62px",
                                            borderRadius: "18px",
                                            background: "#ecfdf5",
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "center",
                                            fontSize: "1.8rem",
                                            marginBottom: "22px"
                                        }}
                                    >
                                        🌎
                                    </div>


                                    {/* Neutral badge */}

                                    <Badge
                                        style={{
                                            background: "#f1f5f9",
                                            color: "#64748b",
                                            padding: "7px 12px",
                                            borderRadius: "50px",
                                            fontWeight: 700,
                                            fontSize: "0.7rem",
                                            marginBottom: "14px"
                                        }}
                                    >
                                        Continents
                                    </Badge>


                                    <h3
                                        style={{
                                            fontWeight: 800,
                                            color: "#111827",
                                            marginBottom: "12px"
                                        }}
                                    >
                                        Explore Continents
                                    </h3>


                                    <p
                                        style={{
                                            color: "#64748b",
                                            lineHeight: 1.75,
                                            marginBottom: "22px"
                                        }}
                                    >
                                        Explore the distribution of
                                        self-determination movements across
                                        continents and examine broader
                                        geographical patterns in the dataset.
                                    </p>


                                    <div
                                        style={{
                                            display: "inline-flex",
                                            alignItems: "center",
                                            gap: "8px",
                                            color: "#059669",
                                            fontWeight: 700
                                        }}
                                    >
                                        Explore Continents
                                        <span>→</span>
                                    </div>

                                </Card.Body>

                            </Card>

                        </Col>

                    </Row>

                </section>


                {/* =====================================================
                    ANALYTICAL QUESTIONS
                ====================================================== */}

                <section>

                    <div style={{ marginBottom: "24px" }}>

                        <div
                            style={{
                                fontSize: "0.72rem",
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
                                fontSize: "1.9rem",
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
                                        e.currentTarget.style.transform =
                                            "none";

                                        e.currentTarget.style.boxShadow =
                                            "0 6px 22px rgba(15,23,42,0.045)";
                                    }}
                                >

                                    {/* Colored accent */}

                                    <div
                                        style={{
                                            height: "4px",
                                            background: section.accent
                                        }}
                                    />


                                    <Card.Body
                                        style={{
                                            padding: "25px"
                                        }}
                                    >

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