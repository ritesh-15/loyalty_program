import React from "react";
import { Poppins } from "next/font/google";
import Image from "next/image";

const poppins = Poppins({
    weight:"400",
    subsets:["latin"]
})

const beautyProducts = [
  { tag: "Eye Makeup", image: "/assets/bt1.jpg" },
  { tag: "Face Makeup", image: "/assets/bt2.jpg" },
  { tag: "Hair Care", image: "/assets/bt3.jpg" },
];

const clothProducts = [
  { tag: "T-Shirts", image: "/assets/j1.jpg" },
  { tag: "Tinted Jeans", image: "/assets/j2.jpg" },
  { tag: "Cargos", image: "/assets/j3.jpg" },
  { tag: "Trousers", image: "/assets/j4.jpg" },
];

const shoeProducts = [
  { tag: "Sneakers", image: "/assets/s1.jpg" },
  { tag: "Sports", image: "/assets/s2.jpg" },
  { tag: "Formal", image: "/assets/s3.jpg" },
  { tag: "Casual", image: "/assets/s4.jpg" },
];

const ProductList = () => {
    return (
      <section>
        <div>
          <h1 className={`${poppins.className} text-4xl text-center p-8 bg-cyan-700/40`}>
            Clothing
          </h1>

          <div className="grid grid-cols-4 gap-4 w-full h-auto">
            {clothProducts.map((cat, index) => {
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
                    <h2 className="text-center text-xl m-2">{cat.tag}</h2>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div>
          <h1 className={`${poppins.className} text-4xl text-center p-8 bg-slate-200`}>
            Shoes 
          </h1>

          <div className="grid grid-cols-4 gap-4 w-full h-auto">
            {shoeProducts.map((cat, index) => {
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
                    <h2 className="text-center text-xl m-2">{cat.tag}</h2>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div>
            <hr />
          <h1 className={`${poppins.className} text-4xl text-center p-8 bg-pink-100`}>
            Beauty Products
          </h1>
            <hr />
          <div className="grid grid-cols-3 gap-4 w-full h-auto">
            {beautyProducts.map((cat, index) => {
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
                    <h2 className="text-center text-xl m-2">{cat.tag}</h2>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    );
}

export default ProductList