import axios from "axios"

export const api = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_SEVER_BASE_URL}/api`,
})
