"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Wrapper from "../components/Wrapper";
import Link from "next/link";
import CartItem from "../components/CartItem";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import { useCartStore } from "../store/CartStore";
import { ICartItem } from "../interfaces/ICartItem";
import { RiDeleteBin6Line } from "react-icons/ri";


const Cart = () => {
  const [loading, setLoading] = useState(false);
  const [total,setTotal] = useState(0)
  const router = useRouter();
  
  const cartItems:ICartItem[] = useCartStore.getState().cartItems
  console.log(cartItems)

  useEffect(()=>{
    let p = 0;
    cartItems.map((item)=>{
      p += item.price * item.quantity;
    })
    setTotal(p)
  },[])
  

  const handleOrder = () => {
    
  }

  const handleIncrement = (item:ICartItem) => {
    console.log('increment')
    item.quantity = item.quantity+1;
  };

  const handleDecrement = (item: ICartItem) => {
    console.log("increment");  
    item.quantity = Math.max(item.quantity - 1, 1);
  };


  return (
    <div className="py-20 w-full">
      <Wrapper className="primary">
        <div className="text-center max-w-[800px] mx-auto md:mt-0">
          <div className="text-[28px] md:text-[34px] mb-5 font-semibold leading-tight">
            Shopping Cart
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-12 py-10">
          {/* CART ITEMS */}
          <div className="flex-[2]">
            {cartItems?.map((item, index) => {
              return (
                <div key={index}>
                  <div className="flex py-5 gap-3 md:gap-5 border-b">
                    <div className="shrink-0 aspect-square w-[50px] md:w-[120px]">
                      {item.images && (
                        <Image
                          src={item.images[0]}
                          height={200}
                          width={200}
                          alt=""
                        />
                      )}
                    </div>

                    <div className="w-full flex flex-col">
                      <div className="flex flex-col md:flex-row justify-between">
                        <div className="text-lg md:text-2xl font-semibold text-black/[0.8]">
                          {item.name}
                        </div>

                        <div className="text-sm md:text-md font-bold text-black/[0.5] mt-2">
                          Amount : ₹{item.price}
                        </div>
                      </div>

                      <div className="flex items-center justify-between mt-4">
                        <div className="text-sm md:text-md font-medium text-black/[0.5] block ">
                          BrandId - {item.brandId}
                        </div>
                        <div className="text-sm md:text-md font-medium text-black/[0.5] block ">
                          SellerId - {item.sellerId}
                        </div>

                        <RiDeleteBin6Line className="cursor-pointer text-black/[0.5] hover:text-black text-[16px] md:text-[20px]" />
                      </div>

                      <div className="flex items-center justify-between mt-4">
                        <div className="flex items-center gap-2 md:gap-10 text-black/[0.5] text-sm  md:text-md">
                          <div className="flex items-center gap-1">
                            <div className="font-semibold">Quantity:</div>
                            <div className="flex items-center gap-2">
                              <button
                                onClick={() => {
                                  item.quantity = Math.max(
                                    item.quantity - 1,
                                    0
                                  );
                                }}
                                className="hover:text-black bg-gray-300 px-2 py-1 rounded"
                              >
                                -
                              </button>
                              <span>{item.quantity}</span>
                              <button
                                onClick={() => {
                                  item.quantity = item.quantity + 1;
                                }}
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
                </div>
              );
            })}
          </div>
          {/* Cart items end */}

          {/* Cart Summary */}
          {cartItems.length !== 0 && (
            <div className="flex-[1]">
              <div className="text-lg font-bold">Summary</div>

              <div className="p-5 my-5 bg-black/[0.05] rounded-xl">
                <div className="flex justify-between">
                  <div className="uppercase text-md md:text-lg font-medium text-black">
                    Subtotal
                  </div>
                  <div className="text-md md:text-lg font-medium text-black">
                    Total : ₹{total}
                  </div>
                </div>
                <button onClick={handleOrder}>Place Order</button>
              </div>
            </div>
          )} 
          {/* Summary */}
        </div>

        <div className="flex-[2] flex flex-col items-center pb-[50px] md:-mt-14">
          {cartItems.length === 0 && (
            <span className="text-xl font-bold">Your cart is empty</span>
          )}
          <span className="text-center mt-4">
            Looks like you haven&apos t added anything to your cart. <br />
            Go ahead and explore!
          </span>
          <Link
            href="/"
            className="py-4 px-8 rounded-full bg-black text-white text-lg font-medium transition-transform active:scale-95 mb-3 hover:opacity-75 mt-8"
          >
            Continue Shopping
          </Link>
        </div>
      </Wrapper>
    </div>
  );
};

export default Cart;
