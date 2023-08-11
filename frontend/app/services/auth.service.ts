import { api } from "../config/axios"

class AuthService {
  static async register(data: any) {
    const res = await api.post("/auth/local/register", data)
    return res.data
  }

  static async login(data: any) {
    const res = await api.post("/auth/local", data)
    return res
  }
}

export default AuthService
