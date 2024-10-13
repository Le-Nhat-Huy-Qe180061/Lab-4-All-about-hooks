import React from 'react';
import { Modal, Button, Row, Col } from 'react-bootstrap';
import { useCart } from '../../reducers/cartReducer';

const CartModal = ({ show, onHide, setShowAlert }) => {
    const { state, dispatch } = useCart();

    const calculateTotalPrice = () => {
        return state.cart
            .reduce((total, item) => total + item.price * item.quantity, 0)
            .toFixed(2);
    };

    return (
        <Modal
            size='lg'
            aria-labelledby='contained-modal-title-vcenter'
            centered
            show={show}
            onHide={onHide}
        >
            <Modal.Header closeButton>
                <Modal.Title id='contained-modal-title-vcenter'>
                    Your Cart
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {state.cart.length > 0 ? (
                    <>
                        {state.cart.map((item) => (
                            <Row key={item.id} className='mb-3'>
                                <Col md={3}>
                                    <img
                                        src={item.image}
                                        alt={item.title}
                                        style={{
                                            width: '100%',
                                            objectFit: 'cover'
                                        }}
                                    />
                                </Col>
                                <Col md={5}>
                                    <h5>{item.title}</h5>
                                    <p>{item.description}</p>
                                    <p>
                                        Price:{' '}
                                        <span
                                            style={{
                                                color: 'red',
                                                fontWeight: '500'
                                            }}
                                        >
                                            ${item.price.toFixed(2)}
                                        </span>
                                    </p>
                                </Col>
                                <Col
                                    md={4}
                                    className='d-flex align-items-center'
                                >
                                    <Button
                                        variant='secondary'
                                        onClick={() =>
                                            dispatch({
                                                type: 'DECREMENT_QUANTITY',
                                                payload: item.id
                                            })
                                        }
                                    >
                                        -
                                    </Button>
                                    <span className='mx-2'>
                                        {item.quantity}
                                    </span>
                                    <Button
                                        variant='secondary'
                                        onClick={() =>
                                            dispatch({
                                                type: 'INCREMENT_QUANTITY',
                                                payload: item.id
                                            })
                                        }
                                    >
                                        +
                                    </Button>
                                    <Button
                                        variant='danger'
                                        className='ms-2'
                                        onClick={() => {
                                            dispatch({
                                                type: 'REMOVE_FROM_CART',
                                                payload: item.id
                                            });
                                            console.log(
                                                'Before calling setShowAlert:',
                                                setShowAlert
                                            ); // Debugging
                                            if (setShowAlert) {
                                                setShowAlert(true);
                                            } else {
                                                console.error(
                                                    'setShowAlert is undefined'
                                                );
                                            }
                                        }}
                                    >
                                        Remove
                                    </Button>
                                </Col>
                            </Row>
                        ))}
                        <h5>
                            Total Price:{' '}
                            <span
                                style={{
                                    color: 'red',
                                    fontSize: '30px',
                                    fontWeight: '500'
                                }}
                            >
                                ${calculateTotalPrice()}
                            </span>
                        </h5>
                    </>
                ) : (
                    <p>Your cart is empty.</p>
                )}
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={onHide}>Close</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default CartModal;
