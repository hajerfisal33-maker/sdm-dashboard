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
                            BQ1
                        </Nav.Link>

                        <Nav.Link as={Link} to="/bq2">
                            BQ2
                        </Nav.Link>

                        <Nav.Link as={Link} to="/bq3">
                            BQ3
                        </Nav.Link>

                        <Nav.Link as={Link} to="/bq4">
                            BQ4
                        </Nav.Link>

                        <Nav.Link as={Link} to="/bq5">
                            BQ5
                        </Nav.Link>

                        <Nav.Link as={Link} to="/bq6">
                            BQ6
                        </Nav.Link>

                        <Nav.Link as={Link} to="/bq7">
                            BQ7
                        </Nav.Link>

                    </Nav>

                </Navbar.Collapse>

            </Container>

        </Navbar>

    );

}

export default NavbarComponent;