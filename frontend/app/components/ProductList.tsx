import React from "react"
import Image from "next/image"
import { MdOutlineKeyboardArrowRight } from "react-icons/md"
import Link from "next/link"

const beautyProducts = [
  { tag: "Eye Makeup", image: "/assets/bt5.jpg" },
  { tag: "Face Makeup", image: "/assets/bt3.jpg" },
  { tag: "Hair Care", image: "/assets/bt4.jpg" },
]

const clothProducts = [
  { tag: "T-Shirts", image: "/assets/j1.jpg" },
  { tag: "Tinted Jeans", image: "/assets/j2.jpg" },
  { tag: "Cargos", image: "/assets/j3.jpg" },
  { tag: "Trousers", image: "/assets/j4.jpg" },
]

const shoeProducts = [
  { tag: "Sneakers", image: "/assets/s1.jpg" },
  { tag: "Sports", image: "/assets/s2.jpg" },
  { tag: "Formal", image: "/assets/s3.jpg" },
  { tag: "Casual", image: "/assets/s4.jpg" },
]

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

      <h1 className={`text-3xl text-right mb-8 mt-16`}>Beuty Products</h1>
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
