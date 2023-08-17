import { api } from "../config/axios";

class ReferralService {
  // for admin
  static async getReferral<T>(token: string, query?: string) {
    const res = await api.get<T>(`/referral?${query}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  }

  static async createReferral(token: string, data: any) {
    console.log(data);
    const res = await api.post("/referral", data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  }
}

export default ReferralService;
