import { Container, Nav, Navbar } from "react-bootstrap"
import RouteMap from "./RoutesMap"
import { useNavigate } from "react-router-dom"
import { useContext } from "react";
import { Context } from "./ContextProvider";

const NavbarCp = () => {
    const navigate = useNavigate();
    const { userDetails, setUserDetails } = useContext(Context);

    const handleNavigate = (path: string) => {
        if (path == "/logout") {
            navigate('/books')
            localStorage.removeItem("userDetails");
            setUserDetails(null)
        } else {
            navigate(path);
        }
    };

    return (<>
        <Navbar bg="dark" variant="dark" expand="lg">
            <Container>
                <Navbar.Brand href="#home">Library Management</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link onClick={() => handleNavigate('/books')}>Books</Nav.Link>
                        <Nav.Link hidden={!(userDetails)} onClick={() => handleNavigate('/students')}>Students</Nav.Link>
                        <Nav.Link hidden={!(userDetails)} onClick={() => handleNavigate('/student-books')}>Student-Books</Nav.Link>
                        <Nav.Link hidden={!(userDetails)} onClick={() => handleNavigate('/logout')}>Logout</Nav.Link>
                        <Nav.Link hidden={(userDetails)} onClick={() => handleNavigate('/login')}>Login</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
        <RouteMap></RouteMap>
    </>
    )
}

export default NavbarCp