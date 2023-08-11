import React from "react";
import Image from "next/image";
import { Poppins } from "next/font/google";

const poppins = Poppins({
    weight:"400",
    subsets: ["latin"]
})

const category = [
  { name: "Fashion", image: "/assets/c1.jpg" },
  { name: "Smartphones", image: "/assets/c2.jpg" },
  { name: "Clothing", image: "/assets/c3.jpg" },
  { name: "Electronics", image: "/assets/c4.jpg" },
  { name: "Home & Furniture", image: "/assets/c6.jpg" },
  { name: "Toys", image: "/assets/c7.jpg" },
  { name: "Grocery", image: "/assets/c8.jpg" },
  { name: "Books", image: "/assets/c9.jpg" },
  //   { name: "Books", image: "/assets/c5.jpg" },
];

const CategoryCard = () => {
    return (
      <div className="m-16">
        <hr />
        <div className={`${poppins.className} text-4xl text-center m-12`}>
          Shop by category
        </div>
        <div className="grid grid-cols-4 gap-4 w-full h-auto">
          {category.map((cat, index) => {
            return (
              <div
                key={index}
                className="bg-white shadow-md shadow-blue-50 rounded-md m-16 overflow-hidden flex flex-col"
              >
                <Image
                  src={cat.image}
                  height={300}
                  width={300}
                  objectFit="cover"
                  objectPosition="center"
                  alt="brandlogo"
                />
                <div className="p-4 flex flex-col flex-grow">
                  <h2 className="text-center text-xl m-2">{cat.name}</h2>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
}

export default CategoryCard