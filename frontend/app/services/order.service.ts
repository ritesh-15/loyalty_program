import { api } from "../config/axios"

class OrderService {
  static async getOrderItems<T>(token: string, query?: string) {
    const res = await api.get<T>(`/order-items?${query}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })

    return res.data
  }

  static async createOrder(token: string, data: any) {
    const res = await api.post(`/orders`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })

    return res.data
  }

  static async createOrderItem(token: string, data: any) {
    const res = await api.post(`/order-items`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })

    return res.data
  }
}

export default OrderService
