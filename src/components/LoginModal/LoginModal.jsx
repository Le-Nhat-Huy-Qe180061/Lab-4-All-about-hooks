import React, { useState } from 'react';
import { Modal, Button, Form, Alert, Tabs, Tab } from 'react-bootstrap';
import { useAuth } from '../context/AuthContext';

const LoginModal = ({ show, onHide }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');
    const [activeTab, setActiveTab] = useState('login');
    const { login, register } = useAuth();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        let result;
        if (activeTab === 'login') {
            result = await login(username, password);
        } else {
            result = await register(username, email, password);
        }
        if (result.success) {
            onHide();
        } else {
            setError(
                result.error ||
                    `${activeTab === 'login' ? 'Login' : 'Registration'} failed`
            );
        }
    };

    return (
        <Modal
            size='lg'
            aria-labelledby='contained-modal-title-vcenter'
            centered
            show={show}
            onHide={onHide}
        >
            <Modal.Header closeButton className='bg-primary text-white'>
                <Modal.Title id='contained-modal-title-vcenter'>
                    {activeTab === 'login' ? 'Login' : 'Register'}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body className='bg-light'>
                <Tabs
                    activeKey={activeTab}
                    onSelect={(k) => setActiveTab(k)}
                    className='mb-3'
                >
                    <Tab eventKey='login' title='Login'>
                        <Form onSubmit={handleSubmit}>
                            {error && <Alert variant='danger'>{error}</Alert>}
                            <Form.Group
                                className='mb-3'
                                controlId='formBasicUsername'
                            >
                                <Form.Label>Username</Form.Label>
                                <Form.Control
                                    type='text'
                                    placeholder='Enter username'
                                    value={username}
                                    onChange={(e) =>
                                        setUsername(e.target.value)
                                    }
                                />
                            </Form.Group>
                            <Form.Group
                                className='mb-3'
                                controlId='formBasicPassword'
                            >
                                <Form.Label>Password</Form.Label>
                                <Form.Control
                                    type='password'
                                    placeholder='Password'
                                    value={password}
                                    onChange={(e) =>
                                        setPassword(e.target.value)
                                    }
                                />
                            </Form.Group>
                            <Button
                                variant='primary'
                                type='submit'
                                className='w-100'
                            >
                                Login
                            </Button>
                        </Form>
                    </Tab>
                    <Tab eventKey='register' title='Register'>
                        <Form onSubmit={handleSubmit}>
                            {error && <Alert variant='danger'>{error}</Alert>}
                            <Form.Group
                                className='mb-3'
                                controlId='formBasicRegisterUsername'
                            >
                                <Form.Label>Username</Form.Label>
                                <Form.Control
                                    type='text'
                                    placeholder='Choose a username'
                                    value={username}
                                    onChange={(e) =>
                                        setUsername(e.target.value)
                                    }
                                />
                            </Form.Group>
                            <Form.Group
                                className='mb-3'
                                controlId='formBasicRegisterEmail'
                            >
                                <Form.Label>Email address</Form.Label>
                                <Form.Control
                                    type='email'
                                    placeholder='Enter email'
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </Form.Group>
                            <Form.Group
                                className='mb-3'
                                controlId='formBasicRegisterPassword'
                            >
                                <Form.Label>Password</Form.Label>
                                <Form.Control
                                    type='password'
                                    placeholder='Choose a password'
                                    value={password}
                                    onChange={(e) =>
                                        setPassword(e.target.value)
                                    }
                                />
                            </Form.Group>
                            <Button
                                variant='success'
                                type='submit'
                                className='w-100'
                            >
                                Register
                            </Button>
                        </Form>
                    </Tab>
                </Tabs>
            </Modal.Body>
            <Modal.Footer className='bg-light'>
                <Button variant='secondary' onClick={onHide}>
                    Close
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default LoginModal;
