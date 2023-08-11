import React from "react";
import Image from "next/image";
import {Poppins} from 'next/font/google'
import {SiNike} from 'react-icons/si'

const poppins = Poppins({
  subsets: ["latin"],
  weight: "400",
});

const brands = [
  { name: "H&M", logo: "/assets/b1.png" },
  { name: "Calvin Klein", logo: "/assets/b2.png" },
  { name: "Nike", logo: "/assets/b3.png" },
  { name: "Champion", logo: "/assets/b4.png" },
  { name: "Sapphire", logo: "/assets/b5.png" },
  { name: "Levi's", logo: "/assets/b6.png" },
  { name: "Adidas", logo: "/assets/b7.png" },
  { name: "Nautica", logo: "/assets/b8.png" },
  { name: "Puma", logo: "/assets/b9.png" },
];

const BrandCard = () => {
  return (
    <div>
      <div className={`${poppins.className} text-center text-2xl mb-4`}>
        Shop from your favorite brand
      </div>
      <div className="flex flex-row overflow-hidden justify-between bg-blue-300">
        {brands.map((brand, index) => {
          return (
            <div className="w-full h-[150px] rounded-md  bg-white m-2 flex items-center justify-center image-container" key={index}>
              <Image
                src={brand.logo}
                height={100}
                width={100}
                objectFit="cover"
                objectPosition="center"
                alt="brandlogo"
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default BrandCard;
