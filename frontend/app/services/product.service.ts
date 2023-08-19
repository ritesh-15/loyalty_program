import { api } from "../config/axios"

class ProductService {
  static async getProducts<T>(token: string, query?: string) {
    const res = await api.get<T>(`/products?${query}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })

    return res.data
  }

  static async fetchProduct<T>(query?: string) {
    const res = await api.get<T>(`/products?${query}`)

    return res.data
  }

  static async getProductById<T>(id: string, token: string, query?: string) {
    const res = await api.get<T>(`/products/${id}?${query}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })

    return res.data
  }
}

export default ProductService
