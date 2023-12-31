import axios from "axios"
import { api } from "../config/axios"

class UploadService {
  static async upload<T>(data: any) {
    const res = await axios.post<T>(
      `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUD_NAME}/image/upload`,
      data
    )
    return res.data
  }
}

export default UploadService
