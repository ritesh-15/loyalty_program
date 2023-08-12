'use client'
import React from 'react'
import Image from 'next/image'
import Wrapper from '../components/Wrapper'
import Link from 'next/link'
import CartItem from '../components/CartItem'
import { useState } from 'react'
import {useRouter} from 'next/navigation'
import {message } from "antd";
const Cart = () => {
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const handleOrder= async()=>{
        try {
            setLoading(true);
            router.push("/orderHistory");
            
            setLoading(false);
            message.success("purchased successfully");
            
          } catch (error) {
            setLoading(false);
            message.error("something went wrong");
          }


    }
  return (
    <div className='py-20 w-full'>
        <Wrapper className="primary">
            <div className="text-center max-w-[800px] mx-auto md:mt-0">
                <div className="text-[28px] md:text-[34px] mb-5 font-semibold leading-tight ">
                    Shopping Cart
                </div>
            </div>
            <div className="flex flex-col lg:flex-row gap-12 py-10">
                {/* CART ITEMS */}
                <div className="flex-[2]">
                    <div className="text-lg font-bold">
                        Cart Items
                    </div>
                    <CartItem/>
                    <CartItem/>
                    <CartItem/>
                </div>

                {/* CART SUMMARY */}
                <div className="flex-[1]">
                    <div className="text-lg font-bold">
                        Summary
                    </div>

                    <div className="p-5 my-5 bg-black/[0.05] rounded-xl">
                        <div className="flex justify-between">
                            <div className="uppercase text-md md:text-lg font-medium text-black">
                                Subtotal
                            </div>
                            <div className="text-md md:text-lg font-medium text-black">
                                $6000
                            </div>
                        </div>
                        <div className="text-sm md:text-md py-5 border-t mt-5"> Lorem ipsum dolor, sit amet consectetur adipisicing elit. Iure unde fugiat dolorum, veritatis reiciendis obcaecati cupiditate consectetur nihil nisi deserunt sit voluptas eligendi, velit consequuntur asperiores beatae libero! Velit, sed.</div>
                    </div>

                    <button className="w-full py-4 rounded-full bg-black text-white text-lg font-medium transition-transform active:scale-95 mb-3 hover:opacity-75" onClick={handleOrder}>
                        Checkout
                        {loading && <img src="/spinner.svg" />}
                    </button>

                </div>
            </div>

            <div className="flex-[2] flex flex-col items-center pb-[50px] md:-mt-14">
                <Image src="/empty.jpg"  alt='' width={300} height={300} 
                className="w-[300px] md:w-[400px]"/>
                <span className="text-xl font-bold">Your cart is empty</span>
                <span className='text-center mt-4'>Looks llike you have not added anything in your Cart <br />
                Go ahead and explore</span>
                <Link href="/" className='py-4 px-8 rounded-full bg-black text-white text-lg font-medium transition-transform active:scale-95 mb-3 hover:opacity-75 mt 8'>Continue Shopping</Link>
            </div>





        </Wrapper>
    </div>
  )
}

export default Cart