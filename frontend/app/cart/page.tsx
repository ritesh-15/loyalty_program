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
    numberOfTokens: wonedNumberOfTokens,
  } = useCartStore()

  const transferTokensToUserAccount = async (numberOfTokens: number) => {
    try {
      await getTokenOnOrder(user.data.walletAddress, numberOfTokens)
      toast.success("Tokens transfered successfully!")
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
      <div className="mt-16">
        <>
          <div className="mb-12">
            <div className="text-3xl mb-4 font-semibold">Shopping Cart</div>
          </div>

          <div className="flex flex-col lg:flex-row gap-12 justify-between">
            <div className="flex-1 w-full max-w-[650px] mb-16">
              {cartItems?.map((item, index) => {
                return (
                  <div key={index}>
                    <div className="flex py-5 gap-3 md:gap-5 border-b">
                      <div className="shrink-0 aspect-square w-[50px] md:w-[120px]">
                        {item.images && (
                          <div className="relative w-full h-[150px]">
                            <Image
                              src={item.images[0]}
                              alt=""
                              fill
                              className="object-contain"
                            />
                          </div>
                        )}
                      </div>

                      <div className="w-full flex flex-col justify-starat">
                        <div className="flex flex-col md:flex-row justify-between items-center">
                          <div className="text-lg md:text-2xl font-semibold">
                            {item.name}
                          </div>

                          <div className="text-lg md:text-md font-bold">
                            ₹{item.price}
                          </div>
                        </div>

                        <div className="flex items-center justify-between mt-4">
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
              <div className="w-full max-w-[400px] mb-12">
                <div className="text-lg font-bold">Summary</div>

                <div className="border p-4 rounded-md mt-4 flex flex-col gap-1">
                  <div className="flex justify-between">
                    <div className="uppercase text-sm text-black">
                      Tokens reward
                    </div>
                    <div className="text-sm font-medium text-black">
                      : {wonedNumberOfTokens} FC
                    </div>
                  </div>
                  <div className="flex justify-between">
                    <div className="uppercase text-sm text-black">
                      Number of products
                    </div>
                    <div className="text-sm font-medium text-black">
                      : {cartItems.length}
                    </div>
                  </div>
                  <div className="flex justify-between">
                    <div className="uppercase text-md md:text-lg font-medium text-black">
                      Subtotal
                    </div>
                    <div className="text-md md:text-lg font-medium text-black">
                      : ₹{subTotal}
                    </div>
                  </div>
                  {user ? (
                    <Button className="mt-4" onClick={handleOrder}>
                      Place Order
                    </Button>
                  ) : (
                    <Link href="/login">
                      <Button className="mt-4">
                        Continue checkout by logging in
                      </Button>
                    </Link>
                  )}
                  <small className="text-center font-light mt-1">
                    * You can won upto 100 FC token on minimum order value of Rs
                    1000, this tokens can be used to earn rewards later
                  </small>
                </div>
              </div>
            )}
            {/* Summary */}
          </div>

          <div className="flex-[2] flex flex-col items-center pb-[50px] md:-mt-14">
            {cartItems.length === 0 && (
              <div className="text-center text-xl mt-28">
                <p className="font-bold">Your cart is empty</p>
                <p className="text-center mt-4">
                  Looks like you have not anything added anything to your cart.{" "}
                  <br />
                  Go ahead and explore!
                </p>
              </div>
            )}
            <Link href="/products" className="mt-4">
              <Button className="rounded-full p-4">Continue Shopping</Button>
            </Link>
          </div>
        </>
      </div>

      <Modal open={loading}>
        <div className="flex items-center flex-col justify-center">
          <h1 className="text-xl font-bold">Processing your order...</h1>
          <p className="mt-1 max-w-[75%] text-center">
            Congratulations you won{" "}
            <span className="font-bold">{wonedNumberOfTokens} FC</span> reward
            coins. Please confirm the meta mask transaction to awail rewards
          </p>
          <div className="w-[55px] h-[55px] rounded-full border-2 border-transparent border-r-primary border-b-primary border-l-primary animate-spin mt-4"></div>
        </div>
      </Modal>
    </>
  )
}

export default Cart
