"use client"
import React, { useEffect, useState } from "react"
import { Poppins } from "next/font/google"
import Navbar from "../components/Navbar"
import { RxTokens } from "react-icons/rx"
import { useSession } from "next-auth/react"
import { IUserSession } from "../interfaces/IUser"
import qs from "qs"
import { useMutation, useQuery } from "react-query"
import RewardService from "../services/reward.service"
import { IRewards } from "../interfaces/IRewards"
import Image from "next/image"
import useLoyaltyContract from "../hooks/useLoyaltyContract"
import { toast } from "react-hot-toast"
import { ethers } from "ethers"
import Modal from "../components/Modal"
import OrderService from "../services/order.service"
import { useRouter } from "next/navigation"
import Button from "../components/button/Button"
import Link from "next/link"

const Rewards = () => {
  const { data } = useSession()
  const user = data?.user as IUserSession

  const [loading, setLoading] = useState(true)
  const [isOrderPlacing, setIsOrderPlacing] = useState(false)

  const router = useRouter()
  const { buyProductWithTokens, getAccountBalance, approveTokens } =
    useLoyaltyContract()

  const [modalState, setModalState] = useState({
    discount: 0,
    tokens: 0,
  })

  const [stats, setStats] = useState({
    balance: "",
  })

  const query = qs.stringify(
    {
      fields: ["discount", "points"],
      populate: {
        product: {
          fields: ["name", "description", "images", "price"],
          populate: {
            brandId: {
              fields: ["id"],
              populate: {
                user: {
                  fields: ["walletAddress"],
                },
              },
            },
          },
        },
        seller: {
          fields: ["id"],
          populate: {
            user: {
              fields: ["walletAddress"],
            },
          },
        },
      },
    },
    { encodeValuesOnly: true }
  )

  const { data: rewards } = useQuery(
    ["rewards"],
    () => RewardService.getRewards<IRewards>(user.token, query),
    {
      enabled: user ? true : false,
    }
  )

  useEffect(() => {
    if (!user) return
    ;(async () => {
      try {
        const balance = await getAccountBalance(user.data.walletAddress)
        setStats({
          balance: ethers.formatEther(balance.toString()),
        })
      } catch (e) {
        toast.error("Someting went wrong")
      } finally {
        setLoading(false)
      }
    })()
  }, [user])

  const { mutateAsync: createOrder } = useMutation((data: any) =>
    OrderService.createOrder(user.token, data)
  )

  const { mutateAsync: createOrderItem } = useMutation((data: any) =>
    OrderService.createOrderItem(user.token, data)
  )

  const calculateDiscount = (price: number, discount: number) => {
    return Math.floor(price - (discount * price) / 100)
  }

  const handleOrder = async (product: IRewards["data"][0]) => {
    setIsOrderPlacing(true)
    try {
      const tokens = product.attributes.points
      const discount = calculateDiscount(
        product.attributes.product.data.attributes.price,
        product.attributes.discount
      )

      setModalState({
        discount: product.attributes.discount,
        tokens,
      })

      const tx = await approveTokens(tokens)

      await tx.wait()

      await buyProductWithTokens(
        tokens,
        product.attributes.product.data.attributes.brandId.data.attributes.user
          .data.attributes.walletAddress
      )

      const order = await createOrder({
        data: {
          userId: user.data.id,
          totalAmount: discount,
          numberOfTokens: parseInt(`${tokens}`),
        },
      })

      // TODO

      await createOrderItem({
        data: {
          orderId: order.data.id,
          productId: product.attributes.product.data.id,
          sellerId: product.attributes.seller.data.id,
          brandId: product.attributes.product.data.attributes.brandId.data.id,
          quantity: 1,
        },
      })

      router.push("/orders")
      toast.success("Order placed successfully!!")
    } catch (err: any) {
      toast.error("Someting unexpected error occured please try again")
    } finally {
      setIsOrderPlacing(false)
    }
  }

  return (
    <>
      <section>
        <Navbar />
        <div className="p-28">
          <div className="text-center flex items-center justify-between">
            <div className="flex flex-row text-4xl">
              <RxTokens />
              <p className="translate-x-4 font-serif ">Rewards</p>
            </div>

            <div>
              <Link href="/rewards/history">
                <Button
                  className="w-fit bg-transparent border border-primary text-primary"
                  type="button"
                >
                  View wallet history
                </Button>
              </Link>
            </div>
          </div>

          <div className="bg-white rounded-lg p-4 mt-16 mb-8 shadow-md">
            <h2 className="text-lg font-semibold mb-2">Wallet Balance</h2>
            {loading ? (
              <div className="w-[55px] h-[55px] rounded-full border-2 border-transparent border-r-primary border-b-primary border-l-primary animate-spin"></div>
            ) : (
              <div className="flex items-center">
                <span className="text-2xl font-bold mr-2" id="wallet-balance">
                  {stats.balance} FC
                </span>
              </div>
            )}
          </div>

          <div className="m-8">
            <h1 className="text-3xl text-left left-10">
              Exciting Rewards Only for you!
            </h1>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 m-8">
            {rewards?.data.map((reward, index) => {
              return (
                <div key={index}>
                  <div className="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                    {reward.attributes.product.data.attributes.images && (
                      <div className="flex justify-center items-center h-48">
                        <a href="#">
                          <Image
                            className="rounded-t-lg"
                            src={
                              reward.attributes.product.data.attributes
                                .images[0]
                            }
                            alt=""
                            height={100}
                            width={100}
                          />
                        </a>
                      </div>
                    )}
                    <a href="#">
                      <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                        {reward.attributes.discount}% worth{" "}
                        {reward.attributes.points}$ Tokens
                      </h5>
                      <h3 className="text-xl font-sans">
                        {reward.attributes.product.data.attributes.name}
                      </h3>
                    </a>
                    <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                      {reward.attributes.product.data.attributes.description}
                      <br />
                    </p>
                    <span>
                      {calculateDiscount(
                        reward.attributes.product.data.attributes.price,
                        reward.attributes.discount
                      )}
                    </span>
                    <Button onClick={() => handleOrder(reward)}>Buy now</Button>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      <Modal open={isOrderPlacing}>
        <div className="flex items-center flex-col justify-center">
          <h1 className="text-xl font-bold">Processing your order...</h1>
          <p className="mt-1 max-w-[75%] text-center">
            You got {modalState.discount} by making use of {modalState.tokens}{" "}
            FC your tokens congratulations!
          </p>
          <div className="w-[55px] h-[55px] rounded-full border-2 border-transparent border-r-primary border-b-primary border-l-primary animate-spin mt-4"></div>
        </div>
      </Modal>
    </>
  )
}

export default Rewards
