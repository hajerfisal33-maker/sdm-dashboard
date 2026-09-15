import {
    Navbar,
    Nav,
    Container
} from "react-bootstrap";

import { Link } from "react-router-dom";

function NavbarComponent() {

    return (

        <Navbar
            bg="dark"
            variant="dark"
            expand="lg"
            className="sdm-navbar shadow-sm"
        >

            <Container>

                {/* Brand */}
                <Navbar.Brand
                    as={Link}
                    to="/"
                    className="fw-bold"
                >
                    SDM Dashboard
                </Navbar.Brand>


                {/* Mobile Toggle */}
                <Navbar.Toggle
                    aria-controls="sdm-navbar-nav"
                />


                {/* Navigation */}
                <Navbar.Collapse id="sdm-navbar-nav">

                    <Nav className="ms-auto align-items-lg-center">

                        {/* Dashboard */}
                        <Nav.Link
                            as={Link}
                            to="/dashboard"
                        >
                            Dashboard
                        </Nav.Link>


                        {/* About */}
                        <Nav.Link
                            as={Link}
                            to="/about"
                            className="ms-lg-2"
                        >
                            About
                        </Nav.Link>

                    </Nav>

                </Navbar.Collapse>

            </Container>

        </Navbar>

    );
}

export default NavbarComponent;