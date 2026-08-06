import {
    Container,
    Row,
    Col,
    Card,
    Badge,
    Alert
} from "react-bootstrap";

function Dashboard() {

    return (

        <Container className="mt-5 mb-5">

            {/* =====================================================
                PAGE HEADER
            ====================================================== */}

            <div className="mb-4">

                <Badge
                    bg="primary"
                    className="px-3 py-2 fs-6 mb-3 rounded-pill"
                >

                    Research Dashboard

                </Badge>

                <h1 className="fw-bold text-dark">

                    SDM 2.0 Research Dashboard

                </h1>

                <p className="lead text-muted">

                    An interactive research dashboard for exploring
                    global self-determination movements, their political
                    claims, conflict dynamics, government responses,
                    and structural characteristics.

                </p>

            </div>


            {/* =====================================================
                WHAT IS SDM 2.0?
            ====================================================== */}

            <Row className="g-4 mb-4">

                <Col lg={12}>

                    <Card className="shadow-sm border-0 rounded-4 p-4">

                        <h3 className="fw-bold text-primary mb-3">

                            What is the SDM 2.0 Dataset?

                        </h3>

                        <p>

                            SDM 2.0 is a global dataset on
                            self-determination movements. It identifies
                            <strong> 502 self-determination movements
                            </strong> across
                            <strong> 124 countries</strong> covering the
                            period from <strong>1945 to 2020</strong>.

                        </p>

                        <p>

                            The dataset contains information about the
                            political claims made by self-determination
                            movements, their involvement in separatist
                            armed conflict, government concessions and
                            restrictions affecting ethnic rights,
                            unilateral sovereignty declarations, and
                            several structural characteristics of the
                            groups connected to these movements.

                        </p>

                        <p className="mb-0">

                            The dataset also has a geographical extension
                            known as <strong>GeoSDM</strong>, which provides
                            spatial information about territories claimed
                            by self-determination movements and additional
                            geographical attributes.

                        </p>

                    </Card>

                </Col>

            </Row>


            {/* =====================================================
                AUTHOR / DATASET INFORMATION
            ====================================================== */}

            <Row className="g-4 mb-4">

                <Col lg={6}>

                    <Card className="shadow-sm border-0 rounded-4 h-100 p-4">

                        <h4 className="fw-bold mb-3">

                            Dataset Author and Source

                        </h4>

                        <p>

                            The SDM 2.0 Codebook is authored by
                            <strong> Micha Germann</strong> from the
                            Department of Politics, Languages, and
                            International Studies at the
                            <strong> University of Bath</strong>.

                        </p>

                        <p>

                            The Codebook is dated
                            <strong> December 2025</strong> and provides
                            the definitions, coding rules, data sources,
                            and methodological guidance used to construct
                            and interpret the dataset.

                        </p>

                        <p className="mb-0">

                            The SDM 2.0 documentation also acknowledges the
                            contribution of earlier SDM work by Nicholas
                            Sambanis, Micha Germann, and Andreas Schädel,
                            whose original SDM dataset provided the
                            foundation for the updated version.

                        </p>

                    </Card>

                </Col>


                <Col lg={6}>

                    <Card className="shadow-sm border-0 rounded-4 h-100 p-4">

                        <h4 className="fw-bold mb-3">

                            Dataset Coverage

                        </h4>

                        <Row className="g-3">

                            <Col sm={4}>

                                <Card className="text-center border-0 bg-light rounded-3 p-3 h-100">

                                    <h3 className="fw-bold text-primary">

                                        502

                                    </h3>

                                    <small className="text-muted">

                                        Self-Determination
                                        Movements

                                    </small>

                                </Card>

                            </Col>

                            <Col sm={4}>

                                <Card className="text-center border-0 bg-light rounded-3 p-3 h-100">

                                    <h3 className="fw-bold text-success">

                                        124

                                    </h3>

                                    <small className="text-muted">

                                        Countries

                                    </small>

                                </Card>

                            </Col>

                            <Col sm={4}>

                                <Card className="text-center border-0 bg-light rounded-3 p-3 h-100">

                                    <h3 className="fw-bold text-danger">

                                        1945–2020

                                    </h3>

                                    <small className="text-muted">

                                        Historical Coverage

                                    </small>

                                </Card>

                            </Col>

                        </Row>

                    </Card>

                </Col>

            </Row>


            {/* =====================================================
                WHAT IS A SELF-DETERMINATION MOVEMENT?
            ====================================================== */}

            <Row className="g-4 mb-4">

                <Col lg={12}>

                    <Card className="shadow-sm border-0 rounded-4 p-4">

                        <h3 className="fw-bold mb-3">

                            What is a Self-Determination Movement?

                        </h3>

                        <p>

                            In SDM 2.0, a self-determination movement is
                            defined as a collection of one or more political
                            organizations connected to an ethnic group that
                            make politically significant claims for
                            increased self-determination from the state.

                        </p>

                        <p>

                            The concept of self-determination used by the
                            dataset is broad. It can include claims for
                            internal autonomy, territorial self-government,
                            indigenous land rights, and cultural or
                            linguistic self-rule, as well as claims for
                            national independence or the merger of a
                            territory with another state.

                        </p>

                        <Alert
                            variant="info"
                            className="mb-0 rounded-3"
                        >

                            <strong>Important:</strong>

                            The dataset does not simply represent every
                            ethnic group or every separatist sentiment.
                            Movements must meet the project's criteria for
                            political significance and political
                            mobilization.

                        </Alert>

                    </Card>

                </Col>

            </Row>


            {/* =====================================================
                UNDERSTANDING MOVEMENTS VS OBSERVATIONS
            ====================================================== */}

            <Row className="g-4 mb-4">

                <Col lg={12}>

                    <Card className="shadow-sm border-0 rounded-4 p-4">

                        <h3 className="fw-bold mb-3">

                            Understanding Movements and Annual Observations

                        </h3>

                        <p>

                            One of the most important concepts when using
                            this dashboard is the distinction between a
                            <strong> movement</strong> and an
                            <strong> annual observation</strong>.

                        </p>

                        <p>

                            SDM 2.0 contains annualized information.
                            This means that information about a movement
                            can be recorded across multiple years.
                            For example, the same movement may appear in
                            the dataset for several consecutive years,
                            with information recorded for each year.

                        </p>

                        <Row className="g-3 mt-2">

                            <Col md={6}>

                                <Card className="border-0 bg-light p-4 rounded-3 h-100">

                                    <h5 className="fw-bold text-primary">

                                        Movement

                                    </h5>

                                    <p className="mb-0">

                                        Represents the distinct
                                        self-determination movement
                                        itself. A movement is counted
                                        once when the analysis is
                                        concerned with the number of
                                        distinct movements.

                                    </p>

                                </Card>

                            </Col>

                            <Col md={6}>

                                <Card className="border-0 bg-light p-4 rounded-3 h-100">

                                    <h5 className="fw-bold text-success">

                                        Annual Observation

                                    </h5>

                                    <p className="mb-0">

                                        Represents information recorded
                                        for a movement in a particular
                                        year. The same movement can
                                        therefore contribute multiple
                                        observations over time.

                                    </p>

                                </Card>

                            </Col>

                        </Row>

                        <Alert
                            variant="warning"
                            className="mt-4 mb-0 rounded-3"
                        >

                            <strong>Why does this matter?</strong>

                            When interpreting dashboard results, some
                            analyses count distinct movements, while
                            others count events or annual observations.
                            These two approaches answer different research
                            questions and should not be interpreted as
                            interchangeable measures.

                        </Alert>

                    </Card>

                </Col>

            </Row>


            {/* =====================================================
                WHAT THE DASHBOARD DOES
            ====================================================== */}

            <Row className="g-4 mb-4">

                <Col lg={12}>

                    <Card className="shadow-sm border-0 rounded-4 p-4">

                        <h3 className="fw-bold mb-3">

                            What Does This Dashboard Do?

                        </h3>

                        <p>

                            This dashboard transforms the complex SDM 2.0
                            dataset into an interactive research-oriented
                            interface. Instead of requiring users to work
                            directly with thousands of annual observations
                            and numerous variables, the dashboard organizes
                            the data into thematic analytical sections.

                        </p>

                        <p>

                            The purpose is to make the dataset easier to
                            explore, compare, and interpret while preserving
                            the analytical structure of the original data.

                        </p>

                        <Row className="g-3 mt-2">

                            <Col md={4}>

                                <Card className="border-0 bg-light p-4 rounded-3 h-100">

                                    <h5 className="fw-bold">

                                        Explore

                                    </h5>

                                    <p className="mb-0">

                                        Explore the geographical and
                                        historical distribution of
                                        self-determination movements
                                        across countries, regions,
                                        and years.

                                    </p>

                                </Card>

                            </Col>

                            <Col md={4}>

                                <Card className="border-0 bg-light p-4 rounded-3 h-100">

                                    <h5 className="fw-bold">

                                        Compare

                                    </h5>

                                    <p className="mb-0">

                                        Compare movement claims,
                                        government responses,
                                        violence patterns, group
                                        characteristics, and other
                                        dimensions of self-determination
                                        conflicts.

                                    </p>

                                </Card>

                            </Col>

                            <Col md={4}>

                                <Card className="border-0 bg-light p-4 rounded-3 h-100">

                                    <h5 className="fw-bold">

                                        Analyze

                                    </h5>

                                    <p className="mb-0">

                                        Use descriptive visualizations
                                        and statistical analyses to
                                        identify patterns and relationships
                                        within the dataset.

                                    </p>

                                </Card>

                            </Col>

                        </Row>

                    </Card>

                </Col>

            </Row>


            {/* =====================================================
                ANALYTICAL SECTIONS
            ====================================================== */}

            <Row className="g-4 mb-4">

                <Col lg={12}>

                    <Card className="shadow-sm border-0 rounded-4 p-4">

                        <h3 className="fw-bold mb-4">

                            Analytical Sections

                        </h3>

                        <Row className="g-3">

                            <Col md={6}>

                                <Card className="border-start border-primary border-4 shadow-sm p-3 h-100">

                                    <h5 className="fw-bold">

                                        Geographical & Historical Distribution

                                    </h5>

                                    <p className="text-muted mb-0">

                                        Examines where self-determination
                                        movements are located and how
                                        their presence changes across
                                        countries, regions, and historical
                                        periods.

                                    </p>

                                </Card>

                            </Col>


                            <Col md={6}>

                                <Card className="border-start border-primary border-4 shadow-sm p-3 h-100">

                                    <h5 className="fw-bold">

                                        Claims & Movement Duration

                                    </h5>

                                    <p className="text-muted mb-0">

                                        Examines the political objectives
                                        pursued by movements and compares
                                        the duration of movement activity
                                        across claim categories.

                                    </p>

                                </Card>

                            </Col>


                            <Col md={6}>

                                <Card className="border-start border-primary border-4 shadow-sm p-3 h-100">

                                    <h5 className="fw-bold">

                                        Sovereignty Declarations

                                    </h5>

                                    <p className="text-muted mb-0">

                                        Examines the timing and claim
                                        categories associated with
                                        unilateral sovereignty declarations
                                        and tests potential statistical
                                        relationships.

                                    </p>

                                </Card>

                            </Col>


                            <Col md={6}>

                                <Card className="border-start border-danger border-4 shadow-sm p-3 h-100">

                                    <h5 className="fw-bold">

                                        Violence & Conflict Dynamics

                                    </h5>

                                    <p className="text-muted mb-0">

                                        Examines involvement in separatist
                                        armed conflict, escalation, and
                                        the onset of violence among
                                        self-determination movements.

                                    </p>

                                </Card>

                            </Col>


                            <Col md={6}>

                                <Card className="border-start border-success border-4 shadow-sm p-3 h-100">

                                    <h5 className="fw-bold">

                                        Governmental Concessions

                                    </h5>

                                    <p className="text-muted mb-0">

                                        Examines state policies that
                                        increase ethnic rights, including
                                        cultural, autonomy, and
                                        independence-related concessions.

                                    </p>

                                </Card>

                            </Col>


                            <Col md={6}>

                                <Card className="border-start border-warning border-4 shadow-sm p-3 h-100">

                                    <h5 className="fw-bold">

                                        Governmental Restrictions

                                    </h5>

                                    <p className="text-muted mb-0">

                                        Examines state policies that
                                        decrease ethnic rights through
                                        cultural, autonomy, or
                                        independence-related restrictions.

                                    </p>

                                </Card>

                            </Col>


                            <Col md={6}>

                                <Card className="border-start border-info border-4 shadow-sm p-3 h-100">

                                    <h5 className="fw-bold">

                                        Group Characteristics

                                    </h5>

                                    <p className="text-muted mb-0">

                                        Examines structural characteristics
                                        associated with groups, including
                                        relative group size, geographic
                                        concentration, and access to
                                        political power.

                                    </p>

                                </Card>

                            </Col>

                        </Row>

                    </Card>

                </Col>

            </Row>


            {/* =====================================================
                HOW TO USE
            ====================================================== */}

            <Row className="g-4 mb-4">

                <Col lg={12}>

                    <Card className="shadow-sm border-0 rounded-4 p-4">

                        <h3 className="fw-bold mb-3">

                            How to Use This Dashboard

                        </h3>

                        <ol className="mb-0">

                            <li className="mb-2">

                                Start with the geographical and historical
                                overview to understand the distribution
                                of movements.

                            </li>

                            <li className="mb-2">

                                Explore the claims and duration section
                                to understand what movements seek and
                                how long they remain active.

                            </li>

                            <li className="mb-2">

                                Examine sovereignty declarations and
                                violence patterns to investigate conflict
                                dynamics.

                            </li>

                            <li className="mb-2">

                                Review government concessions and
                                restrictions to understand how states
                                respond to self-determination demands.

                            </li>

                            <li>

                                Use group characteristics to examine the
                                structural and demographic context of
                                the movements.

                            </li>

                        </ol>

                    </Card>

                </Col>

            </Row>


            {/* =====================================================
                IMPORTANT METHODOLOGICAL NOTE
            ====================================================== */}

            <Alert
                variant="secondary"
                className="rounded-4 p-4"
            >

                <h5 className="fw-bold">

                    Important Note for Researchers

                </h5>

                <p className="mb-0">

                    The visualizations in this dashboard should always
                    be interpreted in light of the SDM 2.0 coding rules
                    and definitions. Different charts may operate at
                    different analytical levels: some summarize distinct
                    movements, while others summarize annual observations
                    or recorded events. Researchers should therefore
                    consult the relevant visualization description and
                    the SDM 2.0 Codebook when interpreting results or
                    conducting further analysis.

                </p>

            </Alert>

        </Container>

    );

}

export default Dashboard;