"use client"
import Image from "next/image"
import { useState, useEffect } from "react"
import Swipe from "react-easy-swipe"
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai"

const images = [
  "https://res.cloudinary.com/dq4vpg3fh/image/upload/v1692514040/Metamarket/HomePageUI/img4_pjng7f.jpg",
  "https://res.cloudinary.com/dq4vpg3fh/image/upload/v1692514037/Metamarket/HomePageUI/img3_isyrte.jpg",
  "https://res.cloudinary.com/dq4vpg3fh/image/upload/v1692514037/Metamarket/HomePageUI/img2_v6pocq.jpg",
  "https://res.cloudinary.com/dq4vpg3fh/image/upload/v1692514034/Metamarket/HomePageUI/img1_hbpxfr.jpg",
];

export default function Carousel() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const handleNextSlide = () => {
    let newSlide = currentSlide === images.length - 1 ? 0 : currentSlide + 1
    setCurrentSlide(newSlide)
  }

  const handlePrevSlide = () => {
    const newSlide = (currentSlide + 1) % images.length
    setCurrentSlide(newSlide)
  }

  return (
    <div className="pb-8 relative">
      <AiOutlineLeft
        onClick={handlePrevSlide}
        className="absolute w-[30px] h-[30px] left-2 z-10 bg-[rgba(0,0,0,0.2)] rounded-full p-1 m-auto text-3xl mt-40 cursor-pointer"
      />
      <AiOutlineRight
        onClick={handleNextSlide}
        className="absolute w-[30px] h-[30px] right-2 z-10 bg-[rgba(0,0,0,0.2)] rounded-full p-1 m-auto text-3xl mt-40 cursor-pointer"
      />
      <div className="w-full h-[50vh] flex overflow-hidden relative m-auto">
        <Swipe
          onSwipeLeft={handleNextSlide}
          onSwipeRight={handlePrevSlide}
          className="relative w-full h-full"
        >
          {images.map((image, index) => {
            if (index === currentSlide) {
              return (
                <div
                  key={index}
                  className="duration-700 ease-in-out"
                  data-carousel-item
                >
                  <Image
                    key={index}
                    src={image}
                    layout="fill"
                    objectFit="cover"
                    objectPosition="center"
                    className="animate-fadeIn w-full rounded-md"
                    alt="image not present"
                  />
                  <div
                    className={
                      index === currentSlide
                        ? "h-4 w-4 bg-gray-700 rounded-full mx-2 mb-2 cursor-pointer"
                        : "h-4 w-4 bg-gray-300 rounded-full mx-2 mb-2 cursor-pointer"
                    }
                    onClick={() => {
                      setCurrentSlide(index)
                    }}
                  />
                </div>
              )
            }
          })}
        </Swipe>
      </div>
    </div>
  )
}
