import React from "react"
import Image from "next/image"

const category = [
  {
    name: "Fashion",
    image:
      "https://res.cloudinary.com/dq4vpg3fh/image/upload/v1692514028/Metamarket/HomePageUI/c1_peymex.jpg",
    isDark: false,
  },
  {
    name: "Smartphones",
    image:
      "https://res.cloudinary.com/dq4vpg3fh/image/upload/v1692514033/Metamarket/HomePageUI/c2_ryz2et.jpg",
    isDark: true,
  },
  {
    name: "Electronics",
    image:
      "https://res.cloudinary.com/dq4vpg3fh/image/upload/v1692514037/Metamarket/HomePageUI/c3_nvxsqb.jpg",
    isDark: true,
  },
  {
    name: "Grocery",
    image:
      "https://res.cloudinary.com/dq4vpg3fh/image/upload/v1692514034/Metamarket/HomePageUI/c4_j8mo8a.jpg",
    isDark: false,
  },
  {
    name: "Home & Furniture",
    image:
      "https://res.cloudinary.com/dq4vpg3fh/image/upload/v1692514030/Metamarket/HomePageUI/c6_m2gpsj.jpg",
    isDark: true,
  },
  {
    name: "Clothing",
    image:
      "https://res.cloudinary.com/dq4vpg3fh/image/upload/v1692514037/Metamarket/HomePageUI/c7_zvnwha.jpg",
    isDark: true,
  },
  {
    name: "Books",
    image:
      "https://res.cloudinary.com/dq4vpg3fh/image/upload/v1692514033/Metamarket/HomePageUI/c8_f1qmbt.jpg",
    isDark: true,
  },
  {
    name: "Smartphones",
    image:
      "https://res.cloudinary.com/dq4vpg3fh/image/upload/v1692514042/Metamarket/HomePageUI/c9_dcjodj.jpg",
    isDark: true,
  },
];

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
