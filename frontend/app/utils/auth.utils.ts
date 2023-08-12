import { getServerSession } from "next-auth"
import { authOptions } from "../api/auth/[...nextauth]/route"
import { IUserSession } from "../interfaces/IUser"

export function getSession() {
  return getServerSession(authOptions)
}

export async function getCurrentUser() {
  try {
    const session: any = await getSession()
    if (!session) throw new Error("Session does not exist")
    return <IUserSession>session.user
  } catch (error: any) {
    return null
  }
}
