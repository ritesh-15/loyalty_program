"use client"
import React, { useEffect, useState } from "react"
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
import AdminCard from "../components/admin/AdminCard"
import { FaCoins } from "react-icons/fa"
import { GrFormView } from "react-icons/gr"

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

  const { data: rewards, isLoading } = useQuery(
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
        console.log(balance)
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

  if (isLoading)
    return (
      <div className="flex items-center justify-center mt-16">
        <div className="w-[75px] h-[75px] rounded-full border-2 border-transparent border-r-primary border-b-primary border-l-primary animate-spin"></div>
      </div>
    )

  return (
    <>
      <section className="mb-4">
        <div className="">
          <div className="text-center flex items-center justify-between mb-4">
            <div className="flex flex-row text-2xl items-center gap-2 ">
              <RxTokens />
              <p className="">Rewards</p>
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

          <div className="flex flex-col">
            {loading ? (
              <div className="w-[55px] h-[55px] rounded-full border-2 border-transparent border-r-primary border-b-primary border-l-primary animate-spin"></div>
            ) : (
              <div className="w-full max-w-[450px]">
                <AdminCard
                  title="Wallet Balance"
                  icon={<FaCoins />}
                  value={`${stats.balance} FC`}
                />
              </div>
            )}

            <Link
              href="/rewards/rules"
              className="mt-4 items-center flex gap-1"
            >
              <GrFormView className="text-xl" />
              <small> View rules and guidelines</small>
            </Link>
          </div>

          <div className="mt-16 mb-12">
            <h1 className="text-3xl text-left left-10">
              Exciting Rewards Only for you!
            </h1>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {rewards?.data.map((reward, index) => {
              return (
                <div
                  className="hover:shadow-lg rounded-md p-4 relative"
                  key={index}
                >
                  <div className="absolute p-4 w-[45px] h-[45px] flex items-center justify-center rounded-full bg-primary text-sm text-white z-20 left-0 top-0 text-center">
                    {reward.attributes.points} FC
                  </div>

                  <div className="flex flex-col justify-between h-full">
                    <div className="flex items-center flex-col">
                      <div className="relative w-full h-[300px] rounded-md overflow-hidden">
                        <Image
                          src={
                            reward.attributes.product.data.attributes.images[0]
                          }
                          fill
                          alt=""
                          className="object-contain"
                        />
                      </div>
                    </div>

                    <div>
                      <h3 className="mt-4 text-gray-700 text-lg font-bold text-ellipsis line-clamp-2">
                        {reward.attributes.product.data.attributes.name}
                      </h3>
                      <div className="flex gap-2 items-center">
                        <p className="text-lg font-medium text-gray-900">
                          ₹
                          {calculateDiscount(
                            reward.attributes.product.data.attributes.price,
                            reward.attributes.discount
                          )}
                        </p>
                        <small className="line-through">
                          ₹{reward.attributes.product.data.attributes.price}
                        </small>
                        <small className="text-green-500">
                          {reward.attributes.discount}%
                        </small>
                      </div>
                    </div>

                    <div className="flex mt-4 gap-4 items-center">
                      <Link
                        href={`/products/${reward.attributes.product.data.id}?sellerId=${reward.attributes.seller.data.id}&productId=${reward.attributes.product.data.id}`}
                        className="block w-full"
                      >
                        <Button className="bg-transparent text-primary border border-primary">
                          View
                        </Button>
                      </Link>
                      <Button onClick={() => handleOrder(reward)} className="">
                        Claim Now
                      </Button>
                    </div>
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
            You got {modalState.discount}% by making use of {modalState.tokens}{" "}
            FC your tokens congratulations!
          </p>
          <div className="w-[55px] h-[55px] rounded-full border-2 border-transparent border-r-primary border-b-primary border-l-primary animate-spin mt-4"></div>
        </div>
      </Modal>
    </>
  )
}

export default Rewards
