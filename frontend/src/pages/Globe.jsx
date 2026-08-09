import { useState } from "react";
import GlobeComponent from "react-globe.gl";
import { Container, Row, Col, Card, Badge, Table } from "react-bootstrap";

function Globe() {
    const [selectedCountry, setSelectedCountry] = useState(null);

    // بيانات الدول الموزعة حسب المستويات الثلاثة
    const countriesData = [
        {
            name: "Sudan",
            lat: 12.8628,
            lng: 30.2176,
            // Level 1: Country Summary Metrics
            summary: {
                ethnicGroupsCount: 8,
                sdmCount: 12,
                sovereigntyDeclarations: 3,
                violentMovements: 7,
                startedViolent: 2,
                remainedPeaceful: 5,
                receivedConcessions: 4,
                facedRestrictions: 6
            },
            // Level 2: Ethnic Groups List
            ethnicGroups: [
                "Fur", "Zaghawa", "Masalit", "Beja", "Nuba", "Dinka", "Nuer", "Shilluk"
            ],
            // Level 3: Movement Records
            movements: [
                {
                    movement: "SLA (Darfur)",
                    claim: "Autonomy",
                    groupSize: "Medium",
                    powerStatus: "Powerless",
                    violence: "Yes",
                    concession: "Yes",
                    restriction: "Yes"
                },
                {
                    movement: "Beja Congress",
                    claim: "Autonomy",
                    groupSize: "Small",
                    powerStatus: "Discriminated",
                    violence: "Yes",
                    concession: "Yes",
                    restriction: "Yes"
                },
                {
                    movement: "SPLM/A",
                    claim: "Independence",
                    groupSize: "Large",
                    powerStatus: "Powerless",
                    violence: "Yes",
                    concession: "Yes",
                    restriction: "Yes"
                }
            ]
        },
        {
            name: "United Kingdom",
            lat: 55.3781,
            lng: -3.4360,
            summary: {
                ethnicGroupsCount: 3,
                sdmCount: 8,
                sovereigntyDeclarations: 2,
                violentMovements: 2,
                startedViolent: 1,
                remainedPeaceful: 6,
                receivedConcessions: 5,
                facedRestrictions: 2
            },
            ethnicGroups: ["Scots", "Welsh", "Northern Irish"],
            movements: [
                {
                    movement: "SNP (Scotland)",
                    claim: "Independence",
                    groupSize: "Large",
                    powerStatus: "Junior Partner",
                    violence: "No",
                    concession: "Yes",
                    restriction: "No"
                },
                {
                    movement: "Plaid Cymru (Wales)",
                    claim: "Autonomy",
                    groupSize: "Medium",
                    powerStatus: "Junior Partner",
                    violence: "No",
                    concession: "Yes",
                    restriction: "No"
                }
            ]
        },
        {
            name: "Spain",
            lat: 40.4637,
            lng: -3.7492,
            summary: {
                ethnicGroupsCount: 3,
                sdmCount: 5,
                sovereigntyDeclarations: 2,
                violentMovements: 2,
                startedViolent: 1,
                remainedPeaceful: 3,
                receivedConcessions: 4,
                facedRestrictions: 3
            },
            ethnicGroups: ["Catalans", "Basques", "Galicians"],
            movements: [
                {
                    movement: "ETA (Basque)",
                    claim: "Independence",
                    groupSize: "Medium",
                    powerStatus: "Powerless",
                    violence: "Yes",
                    concession: "Yes",
                    restriction: "Yes"
                },
                {
                    movement: "Catalan National Assembly",
                    claim: "Independence",
                    groupSize: "Large",
                    powerStatus: "Included",
                    violence: "No",
                    concession: "Yes",
                    restriction: "Yes"
                }
            ]
        }
    ];

    return (
        <Container fluid className="py-4 bg-light">
            
            {/* Header */}
            <Container className="mb-4 text-center">
                <Badge bg="primary" className="px-3 py-2 fs-6 rounded-pill mb-2 shadow-sm">
                    🌍 INTERACTIVE SDM GLOBE
                </Badge>
                <h1 className="fw-bold">Self-Determination Movements Around the World</h1>
                <p className="lead text-muted mx-auto" style={{ maxWidth: "800px" }}>
                    Select a country from the globe to explore its 3-level data structure: Country Summary, Ethnic Groups, and Movement Records.
                </p>
            </Container>

            {/* Interactive Globe Container */}
            <Card className="shadow-lg border-0 rounded-4 overflow-hidden mb-5 bg-dark text-white">
                <Card.Header className="bg-dark border-bottom border-secondary d-flex justify-content-between align-items-center p-3">
                    <h5 className="fw-bold mb-0 text-info">🌐 Global Globe View</h5>
                    <span className="text-muted small">Click on a country dot to expand details</span>
                </Card.Header>

                <div style={{ width: "100%", height: "550px", position: "relative" }}>
                    <GlobeComponent
                        width={window.innerWidth > 1200 ? 1200 : window.innerWidth - 60}
                        height={550}
                        backgroundColor="#0b0e14"
                        globeImageUrl="//unpkg.com/three-globe/example/img/earth-night.jpg"
                        bumpImageUrl="//unpkg.com/three-globe/example/img/earth-topology.png"
                        showAtmosphere={true}
                        atmosphereColor="#00d2ff"
                        atmosphereAltitude={0.2}

                        pointsData={countriesData}
                        pointLat="lat"
                        pointLng="lng"
                        pointAltitude={(d) => (selectedCountry?.name === d.name ? 0.08 : 0.03)}
                        pointRadius={(d) => (selectedCountry?.name === d.name ? 0.8 : 0.5)}
                        pointColor={(d) => (selectedCountry?.name === d.name ? "#ff3366" : "#00f2fe")}
                        pointLabel={(d) => `
                            <div style="background: rgba(0,0,0,0.85); color: #fff; padding: 6px 10px; border-radius: 6px; border: 1px solid #00f2fe;">
                                <strong style="color: #00f2fe;">${d.name}</strong>
                            </div>
                        `}
                        onPointClick={(country) => {
                            setSelectedCountry(country);
                        }}
                    />
                </div>
            </Card>

            {/* Display Selected Country Data across the 3 Levels */}
            {selectedCountry ? (
                <Container className="mb-5">

                    {/* ========================================== */}
                    {/* LEVEL 1: COUNTRY SUMMARY                   */}
                    {/* ========================================== */}
                    <Card className="shadow-sm border-0 rounded-4 mb-4 p-4 border-start border-5 border-primary">
                        <div className="d-flex justify-content-between align-items-center mb-3">
                            <div>
                                <Badge bg="primary" className="mb-2 px-3 py-1 fs-6">Level 1</Badge>
                                <h2 className="fw-bold text-dark mb-0">{selectedCountry.name} - Country Summary</h2>
                            </div>
                        </div>

                        <Row className="g-3 mt-2">
                            <Col md={3} sm={6}>
                                <div className="p-3 bg-light rounded-3 text-center border">
                                    <div className="text-muted small fw-bold">Ethnic Groups</div>
                                    <div className="fs-3 fw-bold text-primary">{selectedCountry.summary.ethnicGroupsCount}</div>
                                </div>
                            </Col>
                            <Col md={3} sm={6}>
                                <div className="p-3 bg-light rounded-3 text-center border">
                                    <div className="text-muted small fw-bold">Self-Determination Movements</div>
                                    <div className="fs-3 fw-bold text-dark">{selectedCountry.summary.sdmCount}</div>
                                </div>
                            </Col>
                            <Col md={3} sm={6}>
                                <div className="p-3 bg-light rounded-3 text-center border">
                                    <div className="text-muted small fw-bold">Sovereignty Declarations</div>
                                    <div className="fs-3 fw-bold text-info">{selectedCountry.summary.sovereigntyDeclarations}</div>
                                </div>
                            </Col>
                            <Col md={3} sm={6}>
                                <div className="p-3 bg-light rounded-3 text-center border">
                                    <div className="text-muted small fw-bold">Violent Movements</div>
                                    <div className="fs-3 fw-bold text-danger">{selectedCountry.summary.violentMovements}</div>
                                </div>
                            </Col>

                            <Col md={3} sm={6}>
                                <div className="p-3 bg-light rounded-3 text-center border">
                                    <div className="text-muted small fw-bold">Started Violent</div>
                                    <div className="fs-3 fw-bold text-warning">{selectedCountry.summary.startedViolent}</div>
                                </div>
                            </Col>
                            <Col md={3} sm={6}>
                                <div className="p-3 bg-light rounded-3 text-center border">
                                    <div className="text-muted small fw-bold">Remained Peaceful</div>
                                    <div className="fs-3 fw-bold text-success">{selectedCountry.summary.remainedPeaceful}</div>
                                </div>
                            </Col>
                            <Col md={3} sm={6}>
                                <div className="p-3 bg-light rounded-3 text-center border">
                                    <div className="text-muted small fw-bold">Received Concessions</div>
                                    <div className="fs-3 fw-bold text-success">{selectedCountry.summary.receivedConcessions}</div>
                                </div>
                            </Col>
                            <Col md={3} sm={6}>
                                <div className="p-3 bg-light rounded-3 text-center border">
                                    <div className="text-muted small fw-bold">Faced Restrictions</div>
                                    <div className="fs-3 fw-bold text-secondary">{selectedCountry.summary.facedRestrictions}</div>
                                </div>
                            </Col>
                        </Row>
                    </Card>

                    {/* ========================================== */}
                    {/* LEVEL 2: ETHNIC GROUPS                     */}
                    {/* ========================================== */}
                    <Card className="shadow-sm border-0 rounded-4 mb-4 p-4 border-start border-5 border-info">
                        <Badge bg="info" className="text-dark mb-2 px-3 py-1 fs-6 align-self-start">Level 2</Badge>
                        <h4 className="fw-bold mb-3 text-dark">👥 Ethnic Groups</h4>
                        <div className="d-flex flex-wrap gap-2">
                            {selectedCountry.ethnicGroups.map((group, idx) => (
                                <Badge key={idx} bg="light" className="text-dark border p-2 fs-6 fw-normal">
                                    • {group}
                                </Badge>
                            ))}
                        </div>
                    </Card>

                    {/* ========================================== */}
                    {/* LEVEL 3: MOVEMENT RECORDS                  */}
                    {/* ========================================== */}
                    <Card className="shadow-sm border-0 rounded-4 p-4 border-start border-5 border-dark">
                        <Badge bg="dark" className="mb-2 px-3 py-1 fs-6 align-self-start">Level 3</Badge>
                        <h4 className="fw-bold mb-3 text-dark">📜 Movement Records</h4>
                        
                        {selectedCountry.movements && selectedCountry.movements.length > 0 ? (
                            <Table responsive hover className="align-middle mb-0">
                                <thead className="table-light">
                                    <tr>
                                        <th>Movement</th>
                                        <th>Claim</th>
                                        <th>Group Size</th>
                                        <th>Power Status</th>
                                        <th>Violence</th>
                                        <th>Concession</th>
                                        <th>Restriction</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {selectedCountry.movements.map((m, idx) => (
                                        <tr key={idx}>
                                            <td className="fw-bold">{m.movement}</td>
                                            <td><Badge bg="info" className="text-dark">{m.claim}</Badge></td>
                                            <td>{m.groupSize}</td>
                                            <td>{m.powerStatus}</td>
                                            <td>{m.violence === "Yes" ? <Badge bg="danger">Yes</Badge> : <Badge bg="light" className="text-dark border">No</Badge>}</td>
                                            <td>{m.concession === "Yes" ? <Badge bg="success">Yes</Badge> : <Badge bg="secondary">No</Badge>}</td>
                                            <td>{m.restriction === "Yes" ? <Badge bg="warning" className="text-dark">Yes</Badge> : <Badge bg="light" className="text-dark border">No</Badge>}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>
                        ) : (
                            <p className="text-muted mb-0">No specific movement records registered.</p>
                        )}
                    </Card>

                </Container>
            ) : (
                <Container className="text-center py-3">
                    <p className="text-muted fs-5">👆 Click on any country dot on the globe to inspect its 3-level data structure.</p>
                </Container>
            )}

        </Container>
    );
}

export default Globe;