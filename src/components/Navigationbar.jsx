import React from 'react';
import { Navbar, Container, Nav } from 'react-bootstrap';
import { useNavigate } from "react-router-dom";

const Navigationbar = () => {
    let navigate = useNavigate();

    const handleClick = (e, target) => {
        e.preventDefault();
        navigate(target);
    };
    return (
        <Navbar bg="dark" variant="dark">
            <Container>
                <Navbar.Brand href="/"
                    onClick={ e => handleClick(e, '/') }
                >Book Finder</Navbar.Brand>
                <Nav className="me-auto">
                    <Nav.Link
                        href="/wishlist"
                        onClick={ e => handleClick(e, '/wishlist') }
                    >Wishlist</Nav.Link>
                </Nav>
            </Container>
        </Navbar>
    );
};

export default Navigationbar;