import React from "react"
import Image from "next/image"

const category = [
  { name: "Fashion", image: "/assets/c1.jpg", isDark: false },
  { name: "Smartphones", image: "/assets/c2.jpg", isDark: true },
  { name: "Electronics", image: "/assets/c3.jpg", isDark: true },
  { name: "Grocery", image: "/assets/c4.jpg", isDark: false },
  { name: "Home & Furniture", image: "/assets/c6.jpg", isDark: true },
  { name: "Clothing", image: "/assets/c7.jpg", isDark: true },
  { name: "Books", image: "/assets/c8.jpg", isDark: true },
  { name: "Smartphones", image: "/assets/c9.jpg", isDark: true },
  //   { name: "Books", image: "/assets/c5.jpg" },
]

const CategoryCard = () => {
  return (
    <div className="mt-16 border-t pt-12">
      <h1 className={`text-3xl text-right mb-8`}>Shop by category</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {category.map((cat, index) => {
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
                  {cat.name}
                </h1>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default CategoryCard
