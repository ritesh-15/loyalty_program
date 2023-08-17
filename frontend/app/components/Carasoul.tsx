"use client";
import Image from "next/image";
import { useState,useEffect } from "react";
import Swipe from "react-easy-swipe";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";

const images = [
  "/assets/img1.jpg",
  "/assets/img2.jpg",
  "/assets/img3.jpg",
  "/assets/img4.jpg",
  "/assets/img2.jpg",
];

export default function Carousel() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const handleNextSlide = () => {
    let newSlide = currentSlide === images.length - 1 ? 0 : currentSlide + 1;
    setCurrentSlide(newSlide);
  };

  const handlePrevSlide = () => {
    let newSlide = currentSlide === 0 ? images.length - 1 : currentSlide - 1;
    setCurrentSlide(newSlide);
  };

  useEffect(() => {
    setInterval(()=>{
      // handleNextSlide()
    },3000)
    
  }, [])
  

  return (
    <div className="p-28 pb-8 -z-0">
      <AiOutlineLeft
        onClick={handlePrevSlide}
        className="absolute left-2 m-auto text-5xl  mt-40 cursor-pointer text-gray-400"
      />
      <AiOutlineRight
        onClick={handleNextSlide}
        className="absolute right-2 m-auto text-5xl mt-40 cursor-pointer text-gray-400"
      />
      <div className="w-full h-[50vh] flex overflow-hidden relative m-auto">
        <Swipe
          onSwipeLeft={handleNextSlide}
          onSwipeRight={handlePrevSlide}
          className="relative z-10 w-full h-full"
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
                    className="animate-fadeIn w-max"
                    alt="image not present"
                  />
                  <div
                    className={
                      index === currentSlide
                        ? "h-4 w-4 bg-gray-700 rounded-full mx-2 mb-2 cursor-pointer"
                        : "h-4 w-4 bg-gray-300 rounded-full mx-2 mb-2 cursor-pointer"
                    }
                    onClick={() => {
                      setCurrentSlide(index);
                    }}
                  />
                </div>
              );
            }
          })}
        </Swipe>
      </div>
    </div>
  );
}
