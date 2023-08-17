"use client";
import React from "react";
import { useRouter } from "next/navigation";

const items = [
  {
    name: "Jorden retro 5g",
    category: "Men's Golf shoes",
    orderedAt: "July 15, 2023",
    deliveredAt: "July 20, 2023",
    imageSrc: "/img1.png",
  }
];

const Orders = () => {
  const router = useRouter();

  const buyagain = async () => {
    router.push("/singleProduct");
  };
  return (
    <div className="mx-auto w-3/5 px-6 mt-6">
      {items.map((item, index) => (
        <div
          key={index}
          className="flex items-start border border-gray-300 rounded-md px-2 py-4 mb-6 ml-10"
        >
          <div className="flex w-full justify-between">
            <div className="flex items-start">
              <div className="shrink-0 aspect-square w-[60px] md:w-[160px] pl-12">
                <img src={item.imageSrc} alt={item.name} />
              </div>
              <div className="flex flex-col w-full pl-4">
                <div className="text-sm md:text-xl font-semibold text-black/[0.8]">
                  {item.name}
                </div>
                <div className="hidden md:block text-xs md:text-sm font-medium text-black/[0.5]">
                  {item.category}
                </div>
                {/* "Ordered at" and "Delivered at" text moved below */}
                <div className="hidden md:block text-xs md:text-sm font-medium text-black/[0.5] mt-2">
                  Ordered at: {item.orderedAt}
                </div>
                <div className="hidden md:block text-xs md:text-sm font-medium text-black/[0.5]">
                  Delivered at: {item.deliveredAt}
                </div>
              </div>
            </div>
            <div className="flex flex-col items-center justify-center">
              {/* Buy Again button */}
              <button
                className="mt-4 md:mt-2 bg-black text-white text-sm py-1 px-3 rounded-full transition-transform active:scale-95 mb-3 hover:opacity-75 ml-2"
                onClick={buyagain}
              >
                Buy Again
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Orders;
