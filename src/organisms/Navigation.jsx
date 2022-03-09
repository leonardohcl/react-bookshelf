import { Container, Navbar } from "react-bootstrap"

const Navigation = () => {
    return <Navbar expand="lg" bg="primary" variant="dark" className="mb-4">
        <Container>
            <Navbar.Brand>Bookshelf</Navbar.Brand>
        </Container>
    </Navbar>
}

export default Navigation