import { api } from "../config/axios"

class SellerService {
  static async getSellers<T>(token: string, query: string = "") {
    const res = await api.get<T>(`/sellers?${query}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    return res.data
  }

  static async getSellerByID<T>(id: string, token: string, query: string = "") {
    const res = await api.get<T>(`/sellers/${id}?${query}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    return res.data
  }
}

export default SellerService
