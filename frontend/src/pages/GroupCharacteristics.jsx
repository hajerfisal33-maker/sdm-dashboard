import { useEffect, useState } from "react";

import {
    Container,
    Row,
    Col,
    Card,
    Table,
    Badge,
    Spinner
} from "react-bootstrap";

import api from "../services/api";

import BarChartComponent from "../charts/BarChartComponent";
import PieChartComponent from "../charts/PieChartComponent";

import DashboardFilters from "../components/DashboardFilters";


function GroupCharacteristics() {

    const [allGroups, setAllGroups] = useState([]);

    const [topGroups, setTopGroups] = useState([]);

    const [geoConcentrationData, setGeoConcentrationData] =
        useState([]);

    const [powerData, setPowerData] =
        useState([]);

    const [loading, setLoading] =
        useState(true);


    // =====================================================
    // Filters
    // =====================================================

    const [filters, setFilters] = useState({

        country: "",
        region: "",
        year: "",
        claim: ""

    });


    // =====================================================
    // Load Data
    // =====================================================

    useEffect(() => {

        async function loadData() {

            try {

                setLoading(true);


                // -------------------------------------------------
                // Build query parameters
                // -------------------------------------------------

                const params = {};


                if (filters.country) {
                    params.country = filters.country;
                }


                if (filters.region) {
                    params.region = filters.region;
                }


                if (filters.year) {
                    params.year = filters.year;
                }


                if (filters.claim) {
                    params.claim = filters.claim;
                }


                // -------------------------------------------------
                // Load BQ7 data
                // -------------------------------------------------

                const resSize =
                    await api.get(
                        "/group-size",
                        { params }
                    );


                const resGeo =
                    await api.get(
                        "/geographic-concentration",
                        { params }
                    );


                const resPower =
                    await api.get(
                        "/power-participation",
                        { params }
                    );


                // -------------------------------------------------
                // Validate responses
                // -------------------------------------------------

                const groups =
                    Array.isArray(resSize.data)
                        ? resSize.data
                        : [];


                const geoData =
                    Array.isArray(resGeo.data)
                        ? resGeo.data
                        : [];


                const powerDataResponse =
                    Array.isArray(resPower.data)
                        ? resPower.data
                        : [];


                // -------------------------------------------------
                // Save data
                // -------------------------------------------------

                setAllGroups(groups);


                // Display the 15 largest groups
                setTopGroups(
                    groups.slice(0, 15)
                );


                setGeoConcentrationData(
                    geoData
                );


                setPowerData(
                    powerDataResponse
                );

            }

            catch (error) {

                console.error(
                    "Error loading BQ7 data:",
                    error
                );

            }

            finally {

                setLoading(false);

            }

        }


        loadData();

    }, [filters]);


    // =====================================================
    // Loading State
    // =====================================================

    if (loading) {

        return (

            <Container className="mt-5 text-center">

                <Spinner animation="border" />

                <h4 className="mt-3">

                    Loading Group Characteristics Analysis...

                </h4>

            </Container>

        );

    }


    // =====================================================
    // Main Page
    // =====================================================

    return (

        <Container className="mt-5 mb-5">


            {/* =================================================
                PAGE HEADER
            ================================================= */}

            <div className="mb-4">

                <Badge
                    bg="info"
                    text="dark"
                    className="px-3 py-2 fs-6 mb-2 rounded-pill"
                >

                    Group Characteristics & Structural Profile

                </Badge>


                <h1 className="fw-bold text-dark">

                    Group Characteristics of
                    Self-Determination Movements

                </h1>


                <p className="lead text-muted">

                    This section examines structural characteristics
                    associated with the ethnic groups connected to
                    self-determination movements in the SDM dataset.
                    The analysis focuses on three dimensions:
                    relative group size, geographic concentration,
                    and access to central political power.

                </p>


                <p className="text-muted">

                    These characteristics help researchers understand
                    the broader social and political context in which
                    self-determination movements emerge and operate.
                    The visualizations do not measure the strength of
                    a movement directly; instead, they describe
                    structural conditions associated with the groups
                    represented in the dataset.

                </p>

            </div>


            {/* =================================================
                DASHBOARD FILTERS
            ================================================= */}

            <DashboardFilters
                filters={filters}
                setFilters={setFilters}
            />


            {/* =================================================
                GROUP SIZE
            ================================================= */}

            <Row className="g-4 mb-4">

                <Col lg={12}>

                    <Card className="shadow-sm p-4 border-0 rounded-4 bg-white">

                        <h4 className="fw-bold">

                            Largest Groups by Recorded Group Size

                        </h4>


                        <p className="text-muted">

                            This chart displays the 15 movements
                            associated with the largest recorded
                            group-size values in the selected dataset
                            scope. The group-size measure describes
                            the relative demographic size of the ethnic
                            group associated with each self-determination
                            movement.

                        </p>


                        <BarChartComponent

                            data={topGroups}

                            xKey="group_name"

                            yKey="group_size"

                        />


                        <hr />


                        <h6 className="fw-bold">

                            Interpretation

                        </h6>


                        <p className="text-muted mb-0">

                            Each bar represents one distinct
                            self-determination movement identified by
                            its group identifier and associated group
                            name. Higher values indicate groups with a
                            larger recorded demographic size relative
                            to other movements in the selected scope.

                            The visualization is limited to the 15
                            largest groups to make comparison easier;
                            the complete list of retrieved movements is
                            provided in the directory below.

                        </p>

                    </Card>

                </Col>

            </Row>


            {/* =================================================
                GEOGRAPHIC CONCENTRATION
            ================================================= */}

            <Row className="g-4 mb-4">

                <Col lg={6}>

                    <Card className="shadow-sm p-4 h-100 border-0 rounded-4 bg-white">

                        <h4 className="fw-bold">

                            Geographic Concentration

                        </h4>


                        <p className="text-muted">

                            This chart summarizes how the groups
                            associated with self-determination
                            movements are distributed according to
                            their recorded level of geographic
                            concentration.

                        </p>


                        <PieChartComponent

                            data={geoConcentrationData}

                            nameKey="group_con"

                            valueKey="total_groups"

                        />


                        <hr />


                        <h6 className="fw-bold">

                            Interpretation

                        </h6>


                        <p className="text-muted mb-0">

                            Each segment represents one recorded
                            geographic concentration category.
                            Larger segments indicate that a greater
                            number of distinct movements are associated
                            with that category.

                            The categories correspond to the values
                            recorded in the SDM dataset.

                        </p>

                    </Card>

                </Col>


                {/* =================================================
                    POLITICAL POWER
                ================================================= */}

                <Col lg={6}>

                    <Card className="shadow-sm p-4 h-100 border-0 rounded-4 bg-white">

                        <h4 className="fw-bold">

                            Access to Central Political Power

                        </h4>


                        <p className="text-muted">

                            This chart presents the distribution of
                            self-determination movements according to
                            the recorded political power status of the
                            group associated with each movement.

                        </p>


                        <BarChartComponent

                            data={powerData}

                            xKey="pwrstat"

                            yKey="total_groups"

                        />


                        <hr />


                        <h6 className="fw-bold">

                            Interpretation

                        </h6>


                        <p className="text-muted mb-0">

                            Each bar represents a political power-status
                            category. The height of each bar indicates
                            the number of distinct movements associated
                            with that category.

                            Comparing the categories helps researchers
                            examine the political inclusion of groups
                            represented in the SDM dataset.

                        </p>

                    </Card>

                </Col>

            </Row>


            {/* =================================================
                COMPLETE MOVEMENT DIRECTORY
            ================================================= */}

            <Row>

                <Col lg={12}>

                    <Card className="shadow-sm p-4 border-0 rounded-4 bg-white">

                        <div className="d-flex justify-content-between align-items-center mb-3">

                            <div>

                                <h4 className="fw-bold mb-1">

                                    Complete Self-Determination
                                    Movement Directory

                                </h4>


                                <p className="text-muted small mb-0">

                                    A complete list of the distinct
                                    self-determination movements retrieved
                                    under the selected filters, together
                                    with their recorded group-size values.

                                </p>

                            </div>


                            <Badge
                                bg="secondary"
                                className="px-3 py-2 fs-6 rounded-pill"
                            >

                                Total:
                                {" "}
                                {allGroups.length}
                                {" "}
                                Movements

                            </Badge>

                        </div>


                        <div
                            style={{
                                maxHeight: "500px",
                                overflowY: "auto"
                            }}
                            className="border rounded-3"
                        >

                            <Table
                                striped
                                hover
                                responsive
                                className="align-middle mb-0 text-center"
                            >

                                <thead className="table-dark sticky-top">

                                    <tr>

                                        <th>
                                            #
                                        </th>

                                        <th>
                                            Group ID
                                        </th>

                                        <th className="text-start">
                                            Group / Movement
                                        </th>

                                        <th>
                                            Recorded Group Size
                                        </th>

                                    </tr>

                                </thead>


                                <tbody>

                                    {allGroups.map(
                                        (group, index) => (

                                            <tr
                                                key={group.group_id}
                                            >

                                                <td>

                                                    {index + 1}

                                                </td>


                                                <td>

                                                    {group.group_id}

                                                </td>


                                                <td className="text-start fw-semibold">

                                                    {group.group_name}

                                                </td>


                                                <td>

                                                    {
                                                        group.group_size !== null &&
                                                        group.group_size !== undefined
                                                            ? Number(
                                                                group.group_size
                                                            ).toLocaleString()
                                                            : "Not Available"
                                                    }

                                                </td>

                                            </tr>

                                        )
                                    )}

                                </tbody>

                            </Table>

                        </div>


                        <div className="mt-4 p-3 bg-light rounded-3">

                            <h6 className="fw-bold">

                                How to Use This Directory

                            </h6>


                            <p className="text-muted mb-0">

                                The directory provides the complete set
                                of distinct movements returned by the
                                analysis. Each movement is identified
                                using its unique group ID rather than
                                the group name, because group names may
                                occur more than once in the dataset.

                                The group-size values represent the
                                latest observation available within the
                                selected filter scope.

                            </p>

                        </div>

                    </Card>

                </Col>

            </Row>


        </Container>

    );

}


export default GroupCharacteristics;