"use client"

import LoyalUserToken from "@/app/components/LoyalUserToken"
import Modal from "@/app/components/Modal"
import Button from "@/app/components/button/Button"
import { IBrandsOrders } from "@/app/interfaces/IBrandsOrders"
import { ISellerOrders } from "@/app/interfaces/ISellerOrder"
import { IUserSession } from "@/app/interfaces/IUser"
import OrderService from "@/app/services/order.service"
import { useSession } from "next-auth/react"
import qs from "qs"
import { useState } from "react"
import { useQuery } from "react-query"

export default function Orders() {
  const { data: session } = useSession()
  const user = session?.user as IUserSession

  const [walletAddress, setWalletAddress] = useState("")

  const query = qs.stringify(
    {
      filters: {
        order_items: {
          brandId: {
            id: {
              $eq: user?.data.brandId?.id,
            },
          },
        },
      },
      fields: ["totalAmount", "numberOfTokens"],
      populate: {
        userId: {
          fields: ["walletAddress", "username"],
        },
      },
    },
    { encodeValuesOnly: true }
  )

  const { data: orders, isLoading } = useQuery(
    ["brand-orders"],
    () => OrderService.getOrders<ISellerOrders>(user.token, query),
    {
      enabled: user !== undefined ? true : false,
    }
  )

  if (isLoading)
    return (
      <div className="flex items-center justify-center h-full">
        <div className="w-[75px] h-[75px] rounded-full border-2 border-transparent border-r-primary border-b-primary border-l-primary animate-spin"></div>
      </div>
    )

  return (
    <>
      <section className="mt-12 mx-4">
        <div className="flex items-center justify-between">
          <div className="">
            <h1 className="text-2xl font-bold">Orders</h1>
            <p className="">Manage the orders</p>
          </div>
        </div>

        <div className="mt-12">
          <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-white">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    Order ID
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Total amounts
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Number of tokens
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Username
                  </th>
                  <th scope="col" className="px-6 py-3"></th>
                </tr>
              </thead>

              <tbody>
                {orders?.data?.map((order) => (
                  <tr
                    key={order.id}
                    className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                  >
                    <th
                      scope="row"
                      className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      {order?.id}
                    </th>

                    <td className="px-6 py-4">
                      ₹ {order?.attributes.totalAmount}
                    </td>

                    <td className="px-6 py-4">
                      {order?.attributes?.numberOfTokens}
                    </td>

                    <td className="px-6 py-4">
                      {order?.attributes?.userId?.data.attributes.username}
                    </td>

                    <td className="flex items-center px-6 py-4 space-x-3">
                      <Button
                        onClick={() =>
                          setWalletAddress(
                            order?.attributes.userId.data.attributes
                              .walletAddress
                          )
                        }
                        className="w-fit"
                      >
                        Give loyalty rewards
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <Modal open={walletAddress !== ""}>
        <LoyalUserToken
          walletAddress={walletAddress}
          onClose={() => setWalletAddress("")}
        />
      </Modal>
    </>
  )
}
