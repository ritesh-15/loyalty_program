import React from "react"
import Image from "next/image"
import { MdOutlineKeyboardArrowRight } from "react-icons/md"
import Link from "next/link"

const beautyProducts = [
  {
    tag: "Eye Makeup",
    image:
      "https://res.cloudinary.com/dq4vpg3fh/image/upload/v1692514027/Metamarket/HomePageUI/bt5_ep9kk3.jpg",
  },
  {
    tag: "Face Makeup",
    image:
      "https://res.cloudinary.com/dq4vpg3fh/image/upload/v1692514028/Metamarket/HomePageUI/bt3_alktal.jpg",
  },
  {
    tag: "Hair Care",
    image:
      "https://res.cloudinary.com/dq4vpg3fh/image/upload/v1692514026/Metamarket/HomePageUI/bt4_wzh2vj.jpg",
  },
];

const clothProducts = [
  {
    tag: "T-Shirts",
    image:
      "https://res.cloudinary.com/dq4vpg3fh/image/upload/v1692514043/Metamarket/HomePageUI/j1_wz6otm.jpg",
  },
  {
    tag: "Tinted Jeans",
    image:
      "https://res.cloudinary.com/dq4vpg3fh/image/upload/v1692514040/Metamarket/HomePageUI/j2_dojy1l.jpg",
  },
  {
    tag: "Cargos",
    image:
      "https://res.cloudinary.com/dq4vpg3fh/image/upload/v1692514041/Metamarket/HomePageUI/j3_jpbwlz.jpg",
  },
  {
    tag: "Trousers",
    image:
      "https://res.cloudinary.com/dq4vpg3fh/image/upload/v1692514043/Metamarket/HomePageUI/j4_sme50g.jpg",
  },
];

const shoeProducts = [
  {
    tag: "Sneakers",
    image:
      "https://res.cloudinary.com/dq4vpg3fh/image/upload/v1692514044/Metamarket/HomePageUI/s1_s2l4gn.jpg",
  },
  {
    tag: "Sports",
    image:
      "https://res.cloudinary.com/dq4vpg3fh/image/upload/v1692514043/Metamarket/HomePageUI/s2_oujfqo.jpg  ",
  },
  {
    tag: "Formal",
    image:
      "https://res.cloudinary.com/dq4vpg3fh/image/upload/v1692514049/Metamarket/HomePageUI/s3_sjb9wh.jpg",
  },
  {
    tag: "Casual",
    image:
      "https://res.cloudinary.com/dq4vpg3fh/image/upload/v1692514045/Metamarket/HomePageUI/s4_e7umoe.jpg",
  },
];

const ProductList = () => {
  return (
    <div className="mt-16">
      <div>
        <h1 className={`text-3xl text-right mb-8`}>Clothing</h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {clothProducts.map((cat, index) => {
            return (
              <div key={index} className="flex flex-col">
                <div className="relative w-full h-[300px] rounded-lg overflow-hidden flex items-center justify-center hover:opacity-50 text-white transition-opacity">
                  <Image
                    src={cat.image}
                    objectFit="cover"
                    objectPosition="center"
                    alt="brandlogo"
                    className=""
                    fill
                  />

                  <h1 className="absolute font-bold text-xl bottom-2 right-2">
                    {cat.tag}
                  </h1>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      <div>
        <h1 className={`text-3xl text-right mb-8 mt-16`}>Shoes</h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {shoeProducts.map((cat, index) => {
            return (
              <div key={index} className="flex flex-col">
                <div className="relative w-full h-[300px] rounded-lg overflow-hidden flex items-center justify-center hover:opacity-50 text-white transition-opacity">
                  <Image
                    src={cat.image}
                    objectFit="cover"
                    objectPosition="center"
                    alt="brandlogo"
                    className=""
                    fill
                  />

                  <h1 className="absolute font-bold text-xl bottom-2 right-2">
                    {cat.tag}
                  </h1>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      <h1 className={`text-3xl text-right mb-8 mt-16`}>Beauty Products</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {beautyProducts.map((cat, index) => {
          return (
            <div key={index} className="flex flex-col">
              <div className="relative w-full h-[300px] rounded-lg overflow-hidden flex items-center justify-center hover:opacity-50 text-white transition-opacity">
                <Image
                  src={cat.image}
                  objectFit="cover"
                  objectPosition="center"
                  alt="brandlogo"
                  className=""
                  fill
                />

                <h1 className="absolute font-bold text-xl bottom-2 right-2">
                  {cat.tag}
                </h1>
              </div>
            </div>
          )
        })}
      </div>

      <Link href="/products">
        <div className="flex items-center justify-center border-2 mt-16 w-fit mx-auto px-3 mb-8 cursor-pointer hover:bg-gray-100 transition-colors gap-2 py-3 rounded-full">
          <h1>Explore Products</h1>
          <MdOutlineKeyboardArrowRight className="text-xl" />
        </div>
      </Link>
    </div>
  )
}

export default ProductList
