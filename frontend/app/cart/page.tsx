"use client"

import React, { useState } from "react"
import Image from "next/image"
import Wrapper from "../components/Wrapper"
import Link from "next/link"
import { useCartStore } from "../store/CartStore"
import { RiDeleteBin6Line } from "react-icons/ri"
import { IUserSession } from "../interfaces/IUser"
import { useSession } from "next-auth/react"
import { toast } from "react-hot-toast"
import useLoyaltyContract from "../hooks/useLoyaltyContract"
import Button from "../components/button/Button"
import { useMutation } from "react-query"
import OrderService from "../services/order.service"
import Modal from "../components/Modal"
import { useRouter } from "next/navigation"

const Cart = () => {
  const { data: session } = useSession()
  const user = session?.user as IUserSession

  const router = useRouter()

  const { getTokenOnOrder } = useLoyaltyContract()
  const [loading, setLoading] = useState(false)
  const [numberOfTokens, setNumberOfTokens] = useState(0)

  const {
    incrementQuantity,
    decrementQuantity,
    total: subTotal,
    removeFromCart,
    cartItems,
    clearCart,
  } = useCartStore()

  const transferTokensToUserAccount = async (numberOfTokens: number) => {
    try {
      await getTokenOnOrder(user.data.walletAddress, numberOfTokens)
    } catch (e: any) {
      toast.error("Couldn't transfer tokens to your account")
    }
  }

  const { mutateAsync: createOrder } = useMutation((data: any) =>
    OrderService.createOrder(user.token, data)
  )

  const { mutateAsync: createOrderItem } = useMutation((data: any) =>
    OrderService.createOrderItem(user.token, data)
  )

  const handleOrder = async () => {
    setLoading(true)
    try {
      const tokens = (subTotal * 0.5) / 100
      setNumberOfTokens(tokens)

      const order = await createOrder({
        data: {
          userId: user.data.id,
          totalAmount: subTotal,
          numberOfTokens: parseInt(`${tokens}`),
        },
      })

      const orderItems = cartItems.map((item) => {
        return createOrderItem({
          data: {
            orderId: order.data.id,
            productId: item.productId,
            sellerId: item.sellerId,
            brandId: item.brandId,
            quantity: item.quantity,
          },
        })
      })

      await Promise.all([...orderItems, transferTokensToUserAccount(tokens)])

      clearCart()

      router.push("/orders")
      toast.success("Order placed successfully!!")
    } catch (err: any) {
      toast.error("Someting unexpected error occured please try again")
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <div className="py-20 w-full">
        <Wrapper className="primary">
          <div className="text-center max-w-[800px] mx-auto md:mt-0">
            <div className="text-[28px] md:text-[34px] mb-5 font-semibold leading-tight">
              Shopping Cart
            </div>
          </div>

          <div className="flex flex-col lg:flex-row gap-12 py-10">
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

                          <RiDeleteBin6Line
                            onClick={() => removeFromCart(item.productId)}
                            className="cursor-pointer text-black/[0.5] hover:text-black text-[16px] md:text-[20px]"
                          />
                        </div>

                        <div className="flex items-center justify-between mt-4">
                          <div className="flex items-center gap-2 md:gap-10 text-black/[0.5] text-sm  md:text-md">
                            <div className="flex items-center gap-1">
                              <div className="font-semibold">Quantity:</div>
                              <div className="flex items-center gap-2">
                                <button
                                  onClick={() => {
                                    decrementQuantity(
                                      item.productId,
                                      item.sellerId
                                    )
                                  }}
                                  className="hover:text-black bg-gray-300 px-2 py-1 rounded"
                                >
                                  -
                                </button>
                                <span>{item.quantity}</span>
                                <button
                                  onClick={() => {
                                    incrementQuantity(
                                      item.productId,
                                      item.sellerId
                                    )
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
                )
              })}
            </div>

            {cartItems.length !== 0 && (
              <div className="flex-[1]">
                <div className="text-lg font-bold">Summary</div>

                <div className="p-5 my-5 bg-black/[0.05] rounded-xl">
                  <div className="flex justify-between">
                    <div className="uppercase text-md md:text-lg font-medium text-black">
                      Subtotal
                    </div>
                    <div className="text-md md:text-lg font-medium text-black">
                      Total : ₹{subTotal}
                    </div>
                  </div>
                  <Button className="mt-4" onClick={handleOrder}>
                    Place Order
                  </Button>
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

      <Modal open={loading}>
        <div className="flex items-center flex-col justify-center">
          <h1 className="text-xl font-bold">Processing your order...</h1>
          <p className="mt-1 max-w-[75%] text-center">
            Congratulations you won{" "}
            <span className="font-bold">{numberOfTokens} FC</span> reward coins.
            Please confirm the meta mask transaction to awail rewards
          </p>
          <div className="w-[55px] h-[55px] rounded-full border-2 border-transparent border-r-primary border-b-primary border-l-primary animate-spin mt-4"></div>
        </div>
      </Modal>
    </>
  )
}

export default Cart
