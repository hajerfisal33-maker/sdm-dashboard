import { Navbar, Nav, Container } from "react-bootstrap";
import { Link } from "react-router-dom";

function NavbarComponent() {

    return (

        <Navbar bg="dark" variant="dark" expand="lg">

            <Container>

                <Navbar.Brand as={Link} to="/">
                    SDM Dashboard
                </Navbar.Brand>

                <Navbar.Toggle />

                <Navbar.Collapse>

                    <Nav className="ms-auto">

                        <Nav.Link as={Link} to="/">
                            Home
                        </Nav.Link>

                        <Nav.Link as={Link} to="/about">
                            About
                        </Nav.Link>

                        <Nav.Link as={Link} to="/dashboard">
                            Dashboard
                        </Nav.Link>

                        <Nav.Link as={Link} to="/bq1">
                            Geographical & Historical Distribution
                        </Nav.Link>

                        <Nav.Link as={Link} to="/bq2">
                            Claims & Movement Duration
                        </Nav.Link>

                        <Nav.Link as={Link} to="/bq3">
                            Sovereignty Declarations
                        </Nav.Link>

                        <Nav.Link as={Link} to="/bq4">
                            Patterns of Violence
                        </Nav.Link>

                        <Nav.Link as={Link} to="/bq5">
                            Government Concessions
                        </Nav.Link>

                        <Nav.Link as={Link} to="/bq6">
                            Government Restrictions
                        </Nav.Link>

                        <Nav.Link as={Link} to="/bq7">
                            Group Characteristics
                        </Nav.Link>

                        <Nav.Link as={Link} to="/globe">
                            Globe
                        </Nav.Link>

                    </Nav>

                </Navbar.Collapse>

            </Container>

        </Navbar>

    );

}

export default NavbarComponent;