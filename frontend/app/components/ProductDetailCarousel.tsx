"use client"
import Image from "next/image"
import React from "react"
import { Carousel } from "react-responsive-carousel"
import "react-responsive-carousel/lib/styles/carousel.min.css"

type ProductDetailCarouselProps = {
  images: Array<string>
}

const ProductDetailCarousel: React.FC<ProductDetailCarouselProps> = ({
  images,
}) => {
  return (
    <div className="text-white text-[20px] w-full max-w-[1360px] mx-auto sticky top-[50px]">
      <Carousel
        infiniteLoop={true}
        showIndicators={false}
        showStatus={false}
        thumbWidth={150}
        className=""
      >
        {images.map((image, index) => {
          return (
            <div key={index} className="relative w-full h-[550px] md:max-w-[450px] overflow-hidden rounded-md">
              <Image
                src={image}
                alt=""
                fill
                className="object-contain"
              />
            </div>
          )
        })}
      </Carousel>
    </div>
  )
}

export default ProductDetailCarousel
