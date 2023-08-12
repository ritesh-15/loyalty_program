import React, { useState, useEffect } from "react";
import Image from "next/image";

type ImageSlideshowProps = {
    images: Array<string>
}

const ImageSlideshow:React.FC<ImageSlideshowProps> = ({ images }) => {
  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prevImage) => (prevImage + 1) % images.length);
    }, 3000); // Change image every 3 seconds

    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <div className="relative h-64">
      {images.map((image, index) => (
        <div key={index} className="flex justify-center items-center h-48">
          <Image
            src={image}
            alt={`Slideshow Image ${index + 1}`}
            height={100}
            width={100}
            className={`absolute transition-opacity duration-500 ${
              index === currentImage ? "opacity-100" : "opacity-0"
            }`}
          />
        </div>
      ))}
    </div>
  );
};

export default ImageSlideshow;
