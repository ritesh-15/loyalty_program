"use client";
import Image from "next/image";
import React from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";


type ProductDetailCarouselProps = {
    images: Array<string>
}

const ProductDetailCarousel:React.FC<ProductDetailCarouselProps> = ({images}) => {
  return (
    <div className="text-white text-[20px] w-full max-w-[1360px] mx-auto sticky top-[50px]">
      <Carousel
        infiniteLoop={true}
        showIndicators={false}
        showStatus={false}
        thumbWidth={60}
        className="productCarousel"
      >
        {images.map((image,index)=>{
            return (
                <Image key={index} src={image} alt="" height={100} width={100}/>
            )
        })}
      </Carousel>
    </div>
  );
};

export default ProductDetailCarousel;
