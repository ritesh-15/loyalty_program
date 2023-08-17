import { api } from "../config/axios";

class ReferralService {
  // for admin
  static async getReferral<T>(token: string, query?: string) {
    const res = await api.get<T>(`/referrals?${query}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  }

  static async checkReferral<T>(query?: string) {
    const res = await api.get<T>(`referrals?${query}`);
    return res.data;
  }

  static async createReferral(token: string, data: any) {
    const res = await api.post("/referrals", data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  }
}

export default ReferralService;
