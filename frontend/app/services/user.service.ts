import { api } from "../config/axios"

class UserService {
  static async getAllUsers<T>(token: string, query?: string) {
    const res = await api.get<T>(`/users?${query}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })

    return res.data
  }
}

export default UserService
