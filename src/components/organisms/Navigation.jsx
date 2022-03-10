import { Container, Nav, Navbar } from "react-bootstrap"
import { Link, useMatch, useResolvedPath } from "react-router-dom"

const navLinks = [
    { title: "Search", to: "/" },
    { title: "My Favorites", to: "favorites" }
]

const ReactRouterNavLink = props => {
    const resolved = useResolvedPath(props.to);
    const match = useMatch({ path: resolved.pathname, end: true })
    return <Nav.Link as={Link} to={props.to} active={match}>{props.children}</Nav.Link>
}

const Navigation = () => {
    const links = navLinks.map(link =>
        <ReactRouterNavLink to={link.to} key={link.to}>{link.title}</ReactRouterNavLink>
    )

    return <Navbar expand="lg" bg="primary" variant="dark" className="mb-4">
        <Container>
            <Navbar.Brand as={Link} to="/">Bookshelf</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav>
                    {links}
                </Nav>
            </Navbar.Collapse>

        </Container>
    </Navbar>
}

export default Navigation