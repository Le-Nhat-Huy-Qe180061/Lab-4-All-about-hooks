// src/components/Product/ProductList.js
import React from 'react';
import { Row } from 'react-bootstrap';
import ProductCard from './ProductCard';

const ProductList = ({ products }) => {
    // console.log('data product', products);

    return (
        <Row className='mt-5'>
            {products.map((item) => (
                <ProductCard key={item.id} item={item} />
            ))}
        </Row>
    );
};

export default ProductList;
