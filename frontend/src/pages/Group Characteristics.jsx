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


function BQ7() {

    const [allGroups, setAllGroups] = useState([]);

    const [topGroups, setTopGroups] = useState([]);

    const [geoConcentrationData, setGeoConcentrationData] = useState([]);

    const [powerData, setPowerData] = useState([]);

    const [loading, setLoading] = useState(true);


    // =====================================================
    // Load Data
    // =====================================================

    useEffect(() => {

        async function loadData() {

            try {

                const resSize =
                    await api.get("/group-size");

                const resGeo =
                    await api.get("/geographic-concentration");

                const resPower =
                    await api.get("/power-participation");


                const groups = Array.isArray(resSize.data)
                    ? resSize.data
                    : [];


                const geoData = Array.isArray(resGeo.data)
                    ? resGeo.data
                    : [];


                const powerDataResponse = Array.isArray(resPower.data)
                    ? resPower.data
                    : [];


                setAllGroups(groups);

                // Display the 15 largest groups in the main chart
                setTopGroups(groups.slice(0, 15));

                setGeoConcentrationData(geoData);

                setPowerData(powerDataResponse);

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

    }, []);


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
                GROUP SIZE
            ================================================= */}

            <Row className="g-4 mb-4">

                <Col lg={12}>

                    <Card className="shadow-sm p-4 border-0 rounded-4 bg-white">

                        <h4 className="fw-bold">

                            Largest Groups by Recorded Group Size

                        </h4>


                        <p className="text-muted">

                            This chart displays the 15 movements associated
                            with the largest recorded group-size values in
                            the dataset. The group-size measure describes
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

                            Each bar represents one self-determination
                            movement and its associated group-size value.
                            The horizontal axis identifies the group,
                            while the vertical axis shows the recorded
                            group-size measure.

                            Higher values indicate groups with a larger
                            recorded demographic size relative to other
                            groups in the dataset.

                            The visualization is limited to the 15
                            largest groups to make comparison easier;
                            the complete list of all movements is provided
                            in the directory below.

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

                            This chart summarizes how the groups associated
                            with self-determination movements are distributed
                            according to their recorded level of geographic
                            concentration.

                            Geographic concentration captures the extent
                            to which the population represented by a
                            movement is geographically concentrated within
                            a particular area.

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

                            Each segment represents one recorded geographic
                            concentration category.

                            Larger segments indicate that a greater number
                            of distinct movements are associated with that
                            category.

                            Geographic concentration can be important when
                            considering self-determination movements because
                            a geographically concentrated population may
                            have different opportunities for territorial
                            self-government than a population that is
                            widely dispersed.

                            The categories shown here correspond to the
                            values recorded in the SDM dataset.

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
                            self-determination movements according to the
                            recorded political power status of the group
                            associated with each movement.

                            The measure captures the group's relationship
                            with access to political power at the
                            central-state level.

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
                            category recorded in the dataset.

                            The height of each bar indicates the number
                            of distinct movements associated with that
                            category.

                            Comparing the categories helps researchers
                            examine whether self-determination movements
                            are more commonly associated with groups that
                            have greater access to central political power
                            or with groups that experience weaker political
                            inclusion.

                            The exact category labels shown in the chart
                            are taken directly from the values recorded in
                            the dataset.

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

                                    Complete Self-Determination Movement Directory

                                </h4>


                                <p className="text-muted small mb-0">

                                    A complete list of the 502 distinct
                                    self-determination movements represented
                                    in the SDM dataset, together with their
                                    recorded group-size values.

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

                                            <tr key={index}>

                                                <td>

                                                    {index + 1}

                                                </td>


                                                <td className="text-start fw-semibold">

                                                    {group.group_name}

                                                </td>


                                                <td>

                                                    {group.group_size !== null &&
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

                                The directory provides the complete set of
                                movements represented in the dataset.
                                Unlike the chart above, which highlights
                                only the 15 largest recorded groups, this
                                table allows researchers to browse the full
                                population of movements included in the
                                analysis.

                                The group-size values shown here are the
                                values associated with the observations
                                retrieved from the movement-observations
                                dataset and are presented for descriptive
                                comparison.

                            </p>

                        </div>

                    </Card>

                </Col>

            </Row>


        </Container>

    );

}

export default BQ7;