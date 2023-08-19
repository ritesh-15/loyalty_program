"use client";
import Image from "next/image";
import { useState, useEffect } from "react";
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
    setInterval(() => {
      // handleNextSlide()
    }, 3000);
  }, []);

  return (
    <div className="pt-28 pb-8">
      {/* <AiOutlineLeft
        onClick={handlePrevSlide}
        size={40}
        className="float-left m-auto text-5xl  mt-40 cursor-pointer text-gray-400"
        />
      <AiOutlineRight
        onClick={handleNextSlide}
        className="float-right right-2 m-auto text-5xl mt-40 cursor-pointer text-gray-400"
      /> */}
      <AiOutlineLeft
        size={40}
        className="float-left mt-40 cursor-pointer text-gray-400"
      />
      <AiOutlineRight
        size={40}
        className="float-right mt-40 cursor-pointer text-gray-400"
      />

      <div
        // className="relative"
        className="h-[45vh] w-[120vh] flex m-auto relative"
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
                Image
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
      </div>
    </div>
  );
}
