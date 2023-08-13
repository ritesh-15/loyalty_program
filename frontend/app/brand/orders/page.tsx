"use client"

import { IUserSession } from "@/app/interfaces/IUser"
import OrderService from "@/app/services/order.service"
import { useSession } from "next-auth/react"
import qs from "qs"
import { useQuery } from "react-query"

export default function page() {
  const { data: session } = useSession()
  const user = session?.user as IUserSession

  const query = qs.stringify(
    {
      filters: {
        brandId: {
          id: {
            $eq: user?.data.brandId?.id,
          },
        },
      },
      populate: {
        orderId: {
          populate: {
            userId: {
              fields: ["username", "walletAddress"],
            },
          },
          fields: ["totalAmount", "numberOfTokens"],
        },
        productId: {
          fields: ["price"],
        },
      },
      fields: ["quantity"],
    },
    { encodeValuesOnly: true }
  )

  const { data: orders } = useQuery(
    ["brand-sellers", user?.data.brandId?.id],
    () => OrderService.getOrderItems(user.token, query),
    {
      enabled: user !== undefined ? true : false,
    }
  )

  console.log(orders)

  return <div>page</div>
}
