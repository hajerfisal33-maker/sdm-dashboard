import {
    Container,
    Row,
    Col,
    Card
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
                    "radial-gradient(circle at 8% 8%, rgba(37,99,235,0.045), transparent 24%), radial-gradient(circle at 92% 12%, rgba(124,58,237,0.04), transparent 22%), #f8fafc",
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
                    width: "430px",
                    height: "430px",
                    borderRadius: "50%",
                    border: "1px solid rgba(37,99,235,0.045)",
                    right: "-210px",
                    top: "120px",
                    pointerEvents: "none"
                }}
            />

            <div
                style={{
                    position: "absolute",
                    width: "280px",
                    height: "280px",
                    borderRadius: "50%",
                    border: "1px solid rgba(124,58,237,0.04)",
                    left: "-150px",
                    top: "620px",
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

                <section
                    style={{
                        background:
                            "linear-gradient(135deg, #ffffff 0%, #f8faff 100%)",
                        border: "1px solid #e5e9f0",
                        borderRadius: "28px",
                        padding: "55px 48px",
                        marginBottom: "55px",
                        boxShadow:
                            "0 10px 35px rgba(15,23,42,0.045)"
                    }}
                >

                    <div
                        style={{
                            display: "inline-flex",
                            alignItems: "center",
                            background: "#eef4ff",
                            color: "#2563eb",
                            padding: "8px 15px",
                            borderRadius: "50px",
                            fontSize: "0.75rem",
                            fontWeight: 700,
                            marginBottom: "20px"
                        }}
                    >
                        SDM 2.0 Dashboard
                    </div>


                    <h1
                        style={{
                            fontSize: "clamp(2.3rem, 5vw, 3.8rem)",
                            fontWeight: 800,
                            letterSpacing: "-1.7px",
                            lineHeight: 1.08,
                            color: "#111827",
                            marginBottom: "18px"
                        }}
                    >
                        Explore the SDM 2.0 Dataset
                    </h1>


                    <p
                        style={{
                            maxWidth: "800px",
                            fontSize: "1.05rem",
                            lineHeight: 1.85,
                            color: "#64748b",
                            marginBottom: 0
                        }}
                    >
                        Explore self-determination movements through
                        geographical perspectives, historical patterns,
                        political claims, conflict dynamics, government
                        responses, and group characteristics.
                    </p>

                </section>


                {/* =====================================================
                    EXPLORE
                ====================================================== */}

                <section style={{ marginBottom: "60px" }}>

                    <div style={{ marginBottom: "25px" }}>

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
                                fontSize: "1.95rem",
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
                            exploring the data.
                        </p>

                    </div>


                    <Row className="g-4">

                        {/* ================================
                            COUNTRIES
                        ================================= */}

                        <Col lg={6}>

                            <Card
                                as={Link}
                                to="/globe"
                                style={{
                                    height: "100%",
                                    textDecoration: "none",
                                    border: "1px solid #e2e8f0",
                                    borderRadius: "24px",
                                    background: "#ffffff",
                                    boxShadow:
                                        "0 8px 30px rgba(15,23,42,0.045)",
                                    overflow: "hidden",
                                    transition:
                                        "transform .25s ease, box-shadow .25s ease"
                                }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.transform =
                                        "translateY(-6px)";

                                    e.currentTarget.style.boxShadow =
                                        "0 18px 42px rgba(37,99,235,0.10)";
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.transform =
                                        "translateY(0)";

                                    e.currentTarget.style.boxShadow =
                                        "0 8px 30px rgba(15,23,42,0.045)";
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
                                        padding: "38px"
                                    }}
                                >

                                    <div
                                        style={{
                                            width: "64px",
                                            height: "64px",
                                            borderRadius: "18px",
                                            background: "#eef4ff",
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "center",
                                            fontSize: "1.8rem",
                                            marginBottom: "22px"
                                        }}
                                    >
                                        🌍
                                    </div>


                                    <div
                                        style={{
                                            display: "inline-block",
                                            background: "#f1f5f9",
                                            color: "#64748b",
                                            padding: "7px 13px",
                                            borderRadius: "50px",
                                            fontWeight: 700,
                                            fontSize: "0.7rem",
                                            marginBottom: "15px"
                                        }}
                                    >
                                        Countries
                                    </div>


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
                                            lineHeight: 1.8,
                                            marginBottom: "24px"
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


                        {/* ================================
                            Region
                        ================================= */}

                        <Col lg={6}>

                            <Card
                                as={Link}
                                to="/region-comparison"
                                style={{
                                    height: "100%",
                                    textDecoration: "none",
                                    border: "1px solid #e2e8f0",
                                    borderRadius: "24px",
                                    background: "#ffffff",
                                    boxShadow:
                                        "0 8px 30px rgba(15,23,42,0.045)",
                                    overflow: "hidden",
                                    transition:
                                        "transform .25s ease, box-shadow .25s ease"
                                }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.transform =
                                        "translateY(-6px)";

                                    e.currentTarget.style.boxShadow =
                                        "0 18px 42px rgba(5,150,105,0.10)";
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.transform =
                                        "translateY(0)";

                                    e.currentTarget.style.boxShadow =
                                        "0 8px 30px rgba(15,23,42,0.045)";
                                }}
                            >

                                <div
                                    style={{
                                        height: "4px",
                                        background: "#059669"
                                    }}
                                />


                                <Card.Body
                                    style={{
                                        padding: "38px"
                                    }}
                                >

                                    <div
                                        style={{
                                            width: "64px",
                                            height: "64px",
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


                                    <div
                                        style={{
                                            display: "inline-block",
                                            background: "#f1f5f9",
                                            color: "#64748b",
                                            padding: "7px 13px",
                                            borderRadius: "50px",
                                            fontWeight: 700,
                                            fontSize: "0.7rem",
                                            marginBottom: "15px"
                                        }}
                                    >
                                        Regions
                                    </div>


                                    <h3
                                        style={{
                                            fontWeight: 800,
                                            color: "#111827",
                                            marginBottom: "12px"
                                        }}
                                    >
                                        Explore Region
                                    </h3>


                                    <p
                                        style={{
                                            color: "#64748b",
                                            lineHeight: 1.8,
                                            marginBottom: "24px"
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
                                        Explore Region
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

                    <div style={{ marginBottom: "25px" }}>

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
                            Analysis
                        </div>


                        <h2
                            style={{
                                fontSize: "1.95rem",
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
                            Explore seven analytical areas covering the
                            geographical, political, conflict, governmental,
                            and structural dimensions of self-determination
                            movements.
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
                                        borderRadius: "21px",
                                        background: "#ffffff",
                                        boxShadow:
                                            "0 6px 24px rgba(15,23,42,0.04)",
                                        overflow: "hidden",
                                        transition:
                                            "transform .22s ease, box-shadow .22s ease"
                                    }}
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.transform =
                                            "translateY(-5px)";

                                        e.currentTarget.style.boxShadow =
                                            "0 16px 35px rgba(15,23,42,0.08)";
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.transform =
                                            "translateY(0)";

                                        e.currentTarget.style.boxShadow =
                                            "0 6px 24px rgba(15,23,42,0.04)";
                                    }}
                                >

                                    <div
                                        style={{
                                            height: "4px",
                                            background: section.accent
                                        }}
                                    />


                                    <Card.Body
                                        style={{
                                            padding: "27px"
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
                                                    width: "34px",
                                                    height: "34px",
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
                                                lineHeight: 1.45,
                                                marginBottom: "12px"
                                            }}
                                        >
                                            {section.title}
                                        </h5>


                                        <p
                                            style={{
                                                color: "#64748b",
                                                fontSize: "0.88rem",
                                                lineHeight: 1.75,
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
                        marginTop: "50px",
                        padding: "20px 24px",
                        background: "#f1f5f9",
                        border: "1px solid #e2e8f0",
                        borderRadius: "16px"
                    }}
                >

                    <p
                        style={{
                            color: "#64748b",
                            fontSize: "0.82rem",
                            lineHeight: 1.75,
                            marginBottom: 0
                        }}
                    >

                        <strong style={{ color: "#334155" }}>
                            Reading the dashboard:
                        </strong>{" "}

                        Depending on the analytical question, visualizations
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