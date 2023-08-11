export interface IUserSession {
  email: string
  data: Data
  token: string
}

export interface Data {
  id: number
  username: string
  role: Role
  walletAddress: string
  addresses: any
  email: string
}

export interface Role {
  id: number
  name: string
  description: string
  type: string
  createdAt: string
  updatedAt: string
}
