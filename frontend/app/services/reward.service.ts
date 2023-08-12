import { api } from "../config/axios";

class RewardService {
  static async createBrand(data: any, token: string) {
    const res = await api.post("/rewards", data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return res.data;
  }

  static async getRewards<T>(token: string, query?: string) {
    const res = await api.get<T>(`/rewards?${query}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return res.data;
  }
}

export default RewardService;