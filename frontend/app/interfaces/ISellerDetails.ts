export interface ISellerDetails {
  data: Data
  meta: Meta
}

export interface Data {
  id: number
  attributes: Attributes
}

export interface Attributes {
  name: string
  location: string
  user: User
  brands: Brands
}

export interface User {
  data: Data2
}

export interface Data2 {
  id: number
  attributes: Attributes2
}

export interface Attributes2 {
  username: string
}

export interface Brands {
  data: Daum[]
}

export interface Daum {
  id: number
  attributes: Attributes3
}

export interface Attributes3 {
  name: string
  brandLogo: string
}

export interface Meta {}
