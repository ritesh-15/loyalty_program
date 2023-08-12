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
      fields: ["name", "location"],
      populate: {
        user: {
          fields: ["username"],
        },
      },
      filters: {
        brands: {
          id: {
            $in: user?.data.brandId?.id,
          },
        },
      },
    },
    { encodeValuesOnly: true }
  )

  const { data: orders } = useQuery(
    ["brand-sellers", user?.data.brandId?.id],
    () => OrderService.getOrders(user.token, query),
    {
      enabled: user !== undefined ? true : false,
    }
  )

  return <div>page</div>
}
