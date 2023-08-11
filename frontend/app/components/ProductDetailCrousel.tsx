'use client'
import Image from 'next/image';
import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

const ProductDetailCarousel = () => {
  return (
    <div className='text-white text-[20px] w-full max-w-[1360px] mx-auto sticky top-[50px]'>
      <Carousel
        infiniteLoop={true}
        showIndicators={false}
        showStatus={false}
        thumbWidth={60}
        className='productCarousel'
      >
        <img src="/img1.png" alt="" />
        <img src="/img2.png" alt="" />
        <img src="/img3.png" alt="" />
        <img src="/img4.png" alt="" />
      </Carousel>
    </div>
  );
};

export default ProductDetailCarousel;
