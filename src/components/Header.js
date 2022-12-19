import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";

function Header() {
    return (
        <>
            <Navbar bg="light">
                <Container>
                    <Navbar.Brand href="#">Configuration Editor</Navbar.Brand>
                </Container>
            </Navbar>
        </>
    );
}

export default Header;
