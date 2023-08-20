import React from "react"
import Image from "next/image"
import { Poppins } from "next/font/google"

const brands = [
  {
    name: "H&M",
    logo: "https://res.cloudinary.com/dq4vpg3fh/image/upload/v1692514023/Metamarket/HomePageUI/b1_r0jhxc.png",
  },
  {
    name: "Calvin Klein",
    logo: "https://res.cloudinary.com/dq4vpg3fh/image/upload/v1692514023/Metamarket/HomePageUI/b2_ytvl6l.png",
  },
  {
    name: "Nike",
    logo: "https://res.cloudinary.com/dq4vpg3fh/image/upload/v1692514023/Metamarket/HomePageUI/b3_znyfm8.png",
  },
  {
    name: "Champion",
    logo: "https://res.cloudinary.com/dq4vpg3fh/image/upload/v1692514023/Metamarket/HomePageUI/b4_nkp7tb.png",
  },
  {
    name: "Sapphire",
    logo: "https://res.cloudinary.com/dq4vpg3fh/image/upload/v1692514023/Metamarket/HomePageUI/b5_egxd9i.png",
  },
  {
    name: "Levi's",
    logo: "https://res.cloudinary.com/dq4vpg3fh/image/upload/v1692514024/Metamarket/HomePageUI/b6_msucys.png",
  },
  {
    name: "Adidas",
    logo: "https://res.cloudinary.com/dq4vpg3fh/image/upload/v1692514024/Metamarket/HomePageUI/b7_vmwagq.png",
  },
  {
    name: "Nautica",
    logo: "https://res.cloudinary.com/dq4vpg3fh/image/upload/v1692514024/Metamarket/HomePageUI/b8_lmadv5.png",
  },
  {
    name: "Puma",
    logo: "https://res.cloudinary.com/dq4vpg3fh/image/upload/v1692514024/Metamarket/HomePageUI/b9_rsrpsz.png",
  },
];

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
