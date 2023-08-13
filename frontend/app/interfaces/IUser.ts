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
  brandId?: RoleData
  seller?: RoleData
}

export interface Role {
  id: number
  name: string
  type: string
}

export interface RoleData {
  id: number
  name: string
}
