import React from "react"
import Image from "next/image"
import { Poppins } from "next/font/google"

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
]

const BrandCard = () => {
  return (
    <div className="flex flex-col items-center justify-center">
      <div className="flex flex-row flex-wrap overflow-hidden items-center gap-4 justify-between">
        {brands.map((brand, index) => {
          return (
            <div
              className="w-full max-w-[100px] h-[150px] rounded-md  bg-white m-2 flex items-center justify-center image-container"
              key={index}
            >
              <Image
                src={brand.logo}
                height={100}
                width={100}
                objectFit="cover"
                objectPosition="center"
                alt="brandlogo"
              />
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default BrandCard
