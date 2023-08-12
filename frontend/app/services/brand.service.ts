import { api } from "../config/axios"

class BrandService {
  static async createBrand(data: any, token: string) {
    const res = await api.post("/brands", data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })

    return res.data
  }

  static async getBrandByID<T>(id: string, token: string, query: string = "") {
    const res = await api.get<T>(`/brands/${id}?${query}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })

    return res.data
  }

  static async getBrands<T>(token: string, query?: string) {
    const res = await api.get<T>(`/brands?${query}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })

    return res.data
  }
}

export default BrandService
