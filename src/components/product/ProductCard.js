import React from 'react';
import { Card, Button, Col } from 'react-bootstrap';
import { useCart } from '../../reducers/cartReducer';
import './style.scss';
const ProductCard = ({ item }) => {
    const { dispatch } = useCart();

    // Add a check to ensure item exists
    if (!item) {
        return null; // or return a loading placeholder
    }

    return (
        <Col xs={12} md={4} lg={3} className='mb-4'>
            <Card className='cardProduct'>
                {item.image && (
                    <Card.Img
                        className='cardProduct__img'
                        variant='top'
                        src={item.image}
                    />
                )}

                {item.salePrice ? (
                    <div className='cardProduct__sale'>
                        Sale:{' '}
                        <span className='cardProduct__sale-discout'>
                            {item.salePrice}$
                        </span>
                    </div>
                ) : (
                    ''
                )}

                <Card.Body>
                    <Card.Title>{item.title || 'No Title'}</Card.Title>
                    <Card.Text>
                        {item.description || 'No Description'}
                    </Card.Text>
                    <Card.Text>
                        Price:
                        <span className='cardProduct__price'>
                            ${item.price || 'N/A'}
                        </span>
                    </Card.Text>
                    <Button
                        variant='primary'
                        onClick={() =>
                            dispatch({ type: 'ADD_TO_CART', payload: item })
                        }
                    >
                        Add to Cart
                    </Button>
                </Card.Body>
            </Card>
        </Col>
    );
};

export default ProductCard;
