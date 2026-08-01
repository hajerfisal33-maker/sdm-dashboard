import { Container } from "react-bootstrap";

function Dashboard(){

    return(

        <Container className="mt-5">

            <h1>Dashboard Overview</h1>

            <hr/>

            <p>

                This page provides a summary of the SDM dataset.
                Individual analyses are available through
                Business Questions (BQ1–BQ7).

            </p>

        </Container>

    );

}

export default Dashboard;