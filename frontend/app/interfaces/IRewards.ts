export interface IRewards {
  data: Daum[]
  meta: Meta
}

export interface Daum {
  id: number
  attributes: Attributes
}

export interface Attributes {
  discount: number
  points: number
  product: Product
}

export interface Product {
  data: Data
}

export interface Data {
  id: number
  attributes: Attributes2
}

export interface Attributes2 {
  name: string
  description: string
  images: string[]
  price: number
  brandId: BrandId
}

export interface BrandId {
  data: Data2
}

export interface Data2 {
  id: number
  attributes: Attributes3
}

export interface Attributes3 {
  user: User
}

export interface User {
  data: Data3
}

export interface Data3 {
  id: number
  attributes: Attributes4
}

export interface Attributes4 {
  walletAddress: string
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
