import React from "react";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useState } from "react";

const CartItem = () => {
  const [quantity, setQuantity] = useState(1);

  const handleIncrement = () => {
    // Increase the quantity, but not beyond a maximum value (if needed)
    setQuantity(Math.min(quantity + 1, 999)); // Adjust 999 to your desired maximum value
  };

  const handleDecrement = () => {
    // Decrease the quantity, but not below the minimum value (1)
    setQuantity(Math.max(quantity - 1, 1));
  };
  return (
    <div className="flex py-5 gap-3 md:gap-5 border-b">
      <div className="shrink-0 aspect-square w-[50px] md:w-[120px]">
        <img src="/img1.png" alt="" />
      </div>

      <div className="w-full flex flex-col">
        <div className="flex flex-col md:flex-row justify-between">
          <div className="text-lg md:text-2xl font-semibold text-black/[0.8]">
            Jorden retro 5g
          </div>

          <div className="text-sm md:text-md font-medium text-black/[0.5] block md:hidden">
            Men&apos s Golf shoes
          </div>
          <div className="text-sm md:text-md font-bold text-black/[0.5] mt-2">
            $2000
          </div>
        </div>

        <div className="flex items-center justify-between mt-4">
          <div className="text-sm md:text-md font-medium text-black/[0.5] block ">
            brandLogo and Name
          </div>
          <div className="text-sm md:text-md font-medium text-black/[0.5] block ">
            Seller info
          </div>

          <RiDeleteBin6Line className="cursor-pointer text-black/[0.5] hover:text-black text-[16px] md:text-[20px]" />
        </div>

        <div className="flex items-center justify-between mt-4">
          <div className="flex items-center gap-2 md:gap-10 text-black/[0.5] text-sm  md:text-md">
            <div className="flex items-center gap-1">
              <div className="font-semibold">Quantity:</div>
              <div className="flex items-center gap-2">
                <button
                  onClick={handleDecrement}
                  className="hover:text-black bg-gray-300 px-2 py-1 rounded"
                >
                  -
                </button>
                <span>{quantity}</span>
                <button
                  onClick={handleIncrement}
                  className="hover:text-black bg-gray-300 px-2 py-1 rounded"
                >
                  +
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
