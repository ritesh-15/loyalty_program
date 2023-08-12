export interface IBrands {
  data: Daum[]
  meta: Meta
}

export interface Daum {
  id: number
  attributes: Attributes
}

export interface Attributes {
  name: string
  brandLogo: string
  user: User
}

export interface User {
  data: Data
}

export interface Data {
  id: number
  attributes: Attributes2
}

export interface Attributes2 {
  username: string
  email: string
  provider: string
  confirmed: boolean
  blocked: boolean
  walletAddress: string
  createdAt: string
  updatedAt: string
  addresses: any
}

export interface Meta {
  pagination: Pagination
}

export interface Pagination {
  page: number
  pageSize: number
  pageCount: number
  total: number
}
