import { api } from "../config/axios"

class BrandService {
  static async createBrand(data: any, token: string) {
    const res = await api.post("/api/brands", data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })

    return res.data
  }
}

export default BrandService
