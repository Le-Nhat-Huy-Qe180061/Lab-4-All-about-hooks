import React, { useState, useEffect } from 'react';
import { Container, Alert, Spinner } from 'react-bootstrap';
import NavbarComponent from './components/layout/Navbar';
import CarouselComponent from './components/layout/CarouselComponent';
import ProductList from './components/product/ProductList';
import CartModal from './components/cart/CartModal'; // Check if the path is correct
import { CartProvider } from './reducers/cartReducer';
import { AuthProvider } from './components/context/AuthContext';

function App() {
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [modalShow, setModalShow] = useState(false);
    const [showAlert, setShowAlert] = useState(false);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch(
                    'https://api-demo-4gqb.onrender.com/products'
                );
                const data = await response.json();
                setData(data.data);
            } catch (error) {
                console.error('Error fetching products:', error);
                setError('Failed to fetch products. Please try again later.');
            } finally {
                setIsLoading(false);
            }
        };

        fetchProducts();
    }, []);

    useEffect(() => {
        if (showAlert) {
            const timer = setTimeout(() => {
                setShowAlert(false);
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [showAlert]);

    return (
        <AuthProvider>
            <CartProvider>
                <Container>
                    {showAlert && (
                        <Alert
                            variant='success'
                            onClose={() => setShowAlert(false)}
                            dismissible
                        >
                            Product removed from cart successfully!
                        </Alert>
                    )}

                    <NavbarComponent setModalShow={setModalShow} />
                    <CarouselComponent />

                    {isLoading ? (
                        <div className='text-center my-5'>
                            <Spinner animation='border' role='status'>
                                <span className='visually-hidden'>
                                    Loading...
                                </span>
                            </Spinner>
                        </div>
                    ) : error ? (
                        <Alert variant='danger' className='text-center my-5'>
                            {error}
                        </Alert>
                    ) : (
                        <ProductList products={data} />
                    )}

                    <CartModal
                        show={modalShow}
                        onHide={() => setModalShow(false)}
                        setShowAlert={setShowAlert} // Ensure this is correctly passed
                    />
                </Container>
            </CartProvider>
        </AuthProvider>
    );
}

export default App;
