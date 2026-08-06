import { useEffect, useState } from "react";
import api from "../services/api";
import BarChartComponent from "../charts/BarChartComponent";
import {
  Container,
  Row,
  Col,
  Card,
  Spinner
} from "react-bootstrap";

function BQ1() {

    const [countryData,setCountryData]=useState([]);
    const [regionData,setRegionData]=useState([]);
    const [yearData,setYearData]=useState([]);
    const [loading,setLoading]=useState(true);

    useEffect(()=>{

        loadData();

    },[]);

    async function loadData(){

        try{

            const country=await api.get("/country");
            const region=await api.get("/region");
            const year=await api.get("/year");

            setCountryData(country.data||[]);
            setRegionData(region.data||[]);
            setYearData(year.data||[]);

        }

        catch(err){

            console.log(err);

        }

        finally{

            setLoading(false);

        }

    }

    if(loading){

        return(

            <Container className="text-center mt-5">

                <Spinner animation="border"/>

            </Container>

        )

    }

    return(

<Container className="mt-5 mb-5">

{/* ================= Header ================= */}

<Card className="shadow-sm border-0 mb-4 p-4">

<h2 className="fw-bold text-primary">

Geographical & Historical Distribution of Self-Determination Movements

</h2>

<p className="mt-3">

This section provides an overview of the geographical and historical
distribution of self-determination movements contained in the SDM dataset.
The visualisations illustrate where movements emerged, how they are
distributed across world regions, and how the number of active movements
changed over time between 1945 and 2020.

</p>

<p>

These charts provide a general understanding of the global patterns before
moving to more detailed analyses in the following sections.

</p>

</Card>

{/* ================= Country ================= */}

<Row className="mb-4">

<Col>

<Card className="shadow-sm border-0 p-4">

<h4 className="fw-bold">

Distribution of Self-Determination Movements by Country

</h4>

<BarChartComponent

data={countryData}

xKey="country_name"

yKey="total_movements"

/>

<hr/>

<h5 className="fw-bold">

Interpretation

</h5>

<p>

This chart presents the number of distinct self-determination movements
identified within each sovereign state.

</p>

<ul>

<li>

<b>X-axis:</b> Host countries included in the SDM dataset.

</li>

<li>

<b>Y-axis:</b> Number of distinct self-determination movements
identified in each country.

</li>

<li>

Each movement is counted only once regardless of how many years it
appears in the dataset.

</li>

<li>

Higher bars indicate countries that have historically experienced a
greater number of self-determination movements.

</li>

</ul>

</Card>

</Col>

</Row>

{/* ================= Region ================= */}

<Row className="mb-4">

<Col>

<Card className="shadow-sm border-0 p-4">

<h4 className="fw-bold">

Distribution of Self-Determination Movements by World Region

</h4>

<BarChartComponent

data={regionData}

xKey="region"

yKey="total_movements"

/>

<hr/>

<h5 className="fw-bold">

Interpretation

</h5>

<p>

This chart aggregates all movements according to their geographical
region.

</p>

<ul>

<li>

<b>X-axis:</b> World regions represented in the SDM dataset.

</li>

<li>

<b>Y-axis:</b> Number of distinct movements occurring within each
region.

</li>

<li>

The chart allows comparison of regional concentrations of
self-determination movements.

</li>

<li>

Regions with taller bars contain a larger share of recorded
movements.

</li>

</ul>

</Card>

</Col>

</Row>

{/* ================= Timeline ================= */}

<Row>

<Col>

<Card className="shadow-sm border-0 p-4">

<h4 className="fw-bold">

Historical Distribution of Active Movements (1945–2020)

</h4>

<BarChartComponent

data={yearData}

xKey="year"

yKey="active_movements"

/>

<hr/>

<h5 className="fw-bold">

Interpretation

</h5>

<p>

This chart illustrates the temporal evolution of self-determination
movements across the entire observation period.

</p>

<ul>

<li>

<b>X-axis:</b> Calendar year.

</li>

<li>

<b>Y-axis:</b> Number of active movements recorded during each year.

</li>

<li>

A movement contributes to every year in which it remained active.

</li>

<li>

The chart helps identify periods characterised by increased or
decreased levels of self-determination activity worldwide.

</li>

</ul>

</Card>

</Col>

</Row>

</Container>

)

}

export default BQ1;