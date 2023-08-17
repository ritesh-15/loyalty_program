"use client";
import React, { useState } from "react";
import qs from "qs";
import { IUserSession } from "../interfaces/IUser";
import { useSession } from "next-auth/react";
import { useQuery } from "react-query";
import OrderService from "../services/order.service";
import { IOrders } from "../interfaces/IOrders";
import Image from "next/image";

const OrderHistory = () => {
  const { data } = useSession();
  const user = data?.user as IUserSession;

  const [orders, setOrders] = useState<IOrders["data"]>([]);

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
  });

  useQuery(
    ["orders"],
    () => OrderService.getOrders<IOrders>(user.token, query),
    {
      onSuccess({ data }) {
        if (data) {
          setOrders(data);
        }
      },
      enabled: user ? true : false,
    }
  );

  // console.log(orders)

  return (
    <div className="p-24">
      <div>
        <h1 className="text-4xl">Order Summary</h1>
        <div className="flex flex-col justify-between">
          {orders?.map((order, index) => {
            return (
              <div key={index}>
                <div className="text-md m-4">
                  {/* order details */}
                  <div className="flex flex-col justify-between">
                    <h3 className="text-lg text-gray-500">Order Id : {order.id}</h3>
                    <div className="flex flex-row justify-between">
                      <p>
                        Rewards Received : {order.attributes.numberOfTokens}
                      </p>
                      <p>Total Amount : ₹{order.attributes.totalAmount}</p>
                    </div>

                    {/* Ordered Products */}

                    <div>
                      <div className="">
                        <h1 className="text-xl p-2">Products </h1>
                        <div className="grid grid-cols-2 gap-4">
                          Number of Items Ordered :{" "}
                          {order.attributes.order_items.data.length}
                        </div>
                      </div>
                      <div className="grid grid-cols-4 gap-4">

                      {order.attributes.order_items.data.map((product, id) => {
                        return (
                          <div key={id}>
                            <div className="w-full p-3 border rounded-lg  bg-gray-200 text-lg m-4">
                              <div className="mb-4 flex flex-col justify-between">
                                {product.attributes.productId.data.attributes
                                  .images && (
                                  <Image
                                  src={
                                      product.attributes.productId.data
                                        .attributes.images[0]
                                    }
                                    alt=""
                                    width={100}
                                    height={100}
                                  />
                                )}
                                <p>
                                  {
                                    product.attributes.productId.data.attributes
                                      .name
                                  }
                                </p>
                                <p>
                                  ₹
                                  {
                                    product.attributes.productId.data.attributes
                                      .price
                                    }
                                </p>
                                <p>Quantity : {product.attributes.quantity}</p>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                      </div>
                    </div>
                  </div>
                </div>
                <hr className="border border-spacing-3 border-gray-400"/>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default OrderHistory;
