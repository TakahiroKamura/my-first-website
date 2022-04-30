import type { NextPage } from 'next';
import Head from 'next/head';
import { Navbar, Nav, NavDropdown, Container } from 'react-bootstrap';

const Header: NextPage = () => {

    return (
        <header>
            <Head>
                <meta charSet="utf-8" />
                <title>PMK Games オフィシャルサイト</title>
            </Head>
            <Navbar bg="light" expand="lg">
                <Container>
                    <Navbar.Brand>PMK Games</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link href="/">HOME</Nav.Link>
                            <Nav.Link href="/about">ABOUT</Nav.Link>
                            <Nav.Link href="/products">PRODUCTS</Nav.Link>
                            <NavDropdown title="WEB CONTENTS" id="basic-nav-dropdown">
                                <NavDropdown.Item href="/card">CARD</NavDropdown.Item>
                                <NavDropdown.Item href="/law">LAW</NavDropdown.Item>
                            </NavDropdown>
                            <Nav.Link href="/contact">CONTACT</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </header>
    );
};

export default Header;