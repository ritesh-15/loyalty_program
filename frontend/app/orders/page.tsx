"use client";
import React, { useState } from "react";
import qs from "qs";
import { IUserSession } from "../interfaces/IUser";
import { useSession } from "next-auth/react";
import { useQuery } from "react-query";
import OrderService from "../services/order.service";
import { IOrders } from "../interfaces/IOrders";

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

  return (
    <div className="p-20">
      <div>
        <h1 className="text-4xl">Orders</h1>
        <div>
          {orders?.map((order, index) => {
            // {order.attributes.order_items.data.map((product,index)=>{
            //   return (
            //     <div key={index}>{product.attributes.productId.data.attributes.name}</div>
            //   )
            // })}
            return (
              <div key={index}>
                {order.attributes.totalAmount}
                
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default OrderHistory;
