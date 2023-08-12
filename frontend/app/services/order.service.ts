import { api } from "../config/axios"

class OrderService {
  static async getOrders<T>(token: string, query?: string) {
    const res = await api.get<T>(`/orders?${query}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })

    return res.data
  }
}

export default OrderService
