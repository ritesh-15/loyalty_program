export interface IBrandDetails {
  data: Data
  meta: Meta
}

export interface Data {
  id: number
  attributes: Attributes
}

export interface Attributes {
  name: string
  brandLogo: string
  user: User
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
  walletAddress: string
}

export interface Meta {}
