"use client"
import React, { useState } from "react"
import qs from "qs"
import { IUserSession } from "../interfaces/IUser"
import { useSession } from "next-auth/react"
import { useQuery } from "react-query"
import OrderService from "../services/order.service"
import { IOrders } from "../interfaces/IOrders"
import Image from "next/image"
import Link from "next/link"

const OrderHistory = () => {
  const { data } = useSession()
  const user = data?.user as IUserSession

  const query = qs.stringify({
    filters: {
      userId: {
        id: {
          $eq: user?.data.id,
        },
      },
    },
    populate: {
      order_items: {
        populate: {
          productId: {
            fields: ["name", "images", "price"],
          },
        },
        fields: ["quantity"],
      },
    },
    fields: ["numberOfTokens", "totalAmount"],
    sort: ["createdAt:desc"],
  })

  const { isLoading, data: orders } = useQuery(
    ["orders"],
    () => OrderService.getOrders<IOrders>(user.token, query),
    {
      enabled: user ? true : false,
      select({ data }) {
        return data
      },
    }
  )

  if (isLoading)
    return (
      <div className="flex items-center justify-center mt-16">
        <div className="w-[75px] h-[75px] rounded-full border-2 border-transparent border-r-primary border-b-primary border-l-primary animate-spin"></div>
      </div>
    )

  return (
    <div className="">
      <div>
        <h1 className="text-3xl mb-12">Orders</h1>
        <div className="flex flex-col justify-between">
          {orders?.map((order, index) => {
            return (
              <div key={index}>
                <div className="text-md m-4">
                  {/* order details */}
                  <div className="flex flex-col justify-between">
                    <h3 className="text-sm font-light">
                      Order ID : {order.id}
                    </h3>
                    <div className="flex items-center justify-between">
                      <p>
                        Rewards Received : {order.attributes.numberOfTokens} FC
                      </p>
                      <p className="font-bold">
                        Total Amount : ₹{order.attributes.totalAmount}
                      </p>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      Number of Items Ordered :{" "}
                      {order.attributes.order_items.data.length}
                    </div>

                    {/* Ordered Products */}

                    <div className="mt-4">
                      <div className="">
                        <h1 className="text-xl mb-4">Products </h1>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        {order.attributes.order_items.data.map(
                          (product, id) => {
                            return (
                              <div
                                className="hovershadow-lg shadow-md rounded-md p-4"
                                key={index}
                              >
                                <div className="flex justify-center items-center">
                                  <div className="relative w-full h-[250px] rounded-md overflow-hidden">
                                    <Image
                                      src={
                                        product.attributes.productId.data
                                          .attributes.images[0]
                                      }
                                      fill
                                      alt=""
                                      className="object-contain"
                                    />
                                  </div>
                                </div>
                                <div>
                                  <h3 className="mt-4 text-xl font-bold text-ellipsis line-clamp-2">
                                    {
                                      product.attributes.productId.data
                                        .attributes.name
                                    }
                                  </h3>
                                  <p className="mt-1 text-sm font-medium text-gray-900">
                                    ₹
                                    {
                                      product.attributes.productId.data
                                        .attributes.price
                                    }
                                  </p>
                                </div>
                              </div>
                            )
                          }
                        )}
                      </div>
                    </div>
                  </div>
                </div>
                <hr className="border border-spacing-3 border-gray-400" />
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default OrderHistory
