import React from 'react';
import { Carousel } from 'react-bootstrap';
import img1 from '../../Images/menu1.jpg';
import img2 from '../../Images/menu2.jpg';
import img3 from '../../Images/menu3.jpg';
import './CarouselComponent.scss'; // Import file SCSS tùy chỉnh

const CarouselComponent = () => {
    return (
        <Carousel slide={false} interval={3000} fade>
            <Carousel.Item>
                <img
                    src={img1}
                    alt='ảnh 1'
                    className='d-block w-100 carousel-img'
                />
                <Carousel.Caption className='carousel-caption-custom'>
                    <h3>First slide label</h3>
                    <p>
                        Nulla vitae elit libero, a pharetra augue mollis
                        interdum.
                    </p>
                </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
                <img
                    src={img2}
                    alt='ảnh 2'
                    className='d-block w-100 carousel-img'
                />
                <Carousel.Caption className='carousel-caption-custom'>
                    <h3>Second slide label</h3>
                    <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    </p>
                </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
                <img
                    src={img3}
                    alt='ảnh 3'
                    className='d-block w-100 carousel-img'
                />
                <Carousel.Caption className='carousel-caption-custom'>
                    <h3>Third slide label</h3>
                    <p>
                        Praesent commodo cursus magna, vel scelerisque nisl
                        consectetur.
                    </p>
                </Carousel.Caption>
            </Carousel.Item>
        </Carousel>
    );
};

export default CarouselComponent;
