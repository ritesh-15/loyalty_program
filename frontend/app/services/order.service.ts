import { api } from "../config/axios";

class OrderService {
  static async getOrderItems<T>(token: string, query?: string) {
    const res = await api.get<T>(`/order-items?${query}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return res.data;
  }

  static async getOrders<T>(token: string, query?: string) {
    const res = await api.get<T>(`/orders?${query}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return res.data;
  }
}

export default OrderService;
