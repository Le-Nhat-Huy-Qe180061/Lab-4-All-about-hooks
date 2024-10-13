import React, { useState } from 'react';
import { Container, Button, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import { useCart } from '../../reducers/cartReducer';
import { useAuth } from '../context/AuthContext';
import CartModal from '../cart/CartModal';
import LoginModal from '../LoginModal/LoginModal';
import './Navbar.scss'; // Import the new SCSS file

const NavbarComponent = () => {
    const { state } = useCart();
    const { user, logout } = useAuth();
    const [showModal, setShowModal] = useState(false);
    const [showModalLogin, setShowModalLogin] = useState(false);

    const handleCloseModal = () => setShowModal(false);
    const handleShowModal = () => setShowModal(true);
    const handleCloseModalLogin = () => setShowModalLogin(false);
    const handleShowModalLogin = () => setShowModalLogin(true);

    return (
        <>
            <Navbar expand='lg' className='navbar-custom'>
                <Container fluid>
                    <Navbar.Brand href='#'>Pizza House</Navbar.Brand>
                    <Navbar.Toggle aria-controls='navbarScroll' />
                    <Navbar.Collapse id='navbarScroll'>
                        <Nav className='me-auto my-2 my-lg-0' navbarScroll>
                            <Nav.Link href='#home'>Home</Nav.Link>
                            <Nav.Link href='#about'>About us</Nav.Link>
                            <NavDropdown
                                title='Contact'
                                id='navbarScrollingDropdown'
                            >
                                <NavDropdown.Item href='#action3'>
                                    Phone
                                </NavDropdown.Item>
                                <NavDropdown.Item href='#action4'>
                                    Email
                                </NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item href='#action5'>
                                    Location
                                </NavDropdown.Item>
                            </NavDropdown>
                        </Nav>
                        <Button
                            variant='primary'
                            onClick={handleShowModal}
                            className='order-btn'
                        >
                            Order now [
                            {state.cart.reduce(
                                (acc, item) => acc + item.quantity,
                                0
                            )}
                            ]
                        </Button>

                        {user ? (
                            <div className='d-flex align-items-center'>
                                <span className='welcome-text me-2'>
                                    Welcome, {user.name}!
                                </span>
                                <Button
                                    variant='outline-primary'
                                    onClick={logout}
                                >
                                    Logout
                                </Button>
                            </div>
                        ) : (
                            <Button
                                variant='primary'
                                className='ms-2'
                                onClick={handleShowModalLogin}
                            >
                                Login / Sign-up
                            </Button>
                        )}
                    </Navbar.Collapse>
                </Container>
            </Navbar>

            <CartModal
                show={showModal}
                onHide={handleCloseModal}
                className='m-2'
            />
            <LoginModal show={showModalLogin} onHide={handleCloseModalLogin} />
        </>
    );
};

export default NavbarComponent;
