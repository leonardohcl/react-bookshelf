import { Container, Navbar } from "react-bootstrap"
import { Link } from "react-router-dom"

const Navigation = () => {
    return <Navbar expand="lg" bg="primary" variant="dark" className="mb-4">
        <Container>
            <Navbar.Brand as={Link} to="/">Bookshelf</Navbar.Brand>
        </Container>
    </Navbar>
}

export default Navigation