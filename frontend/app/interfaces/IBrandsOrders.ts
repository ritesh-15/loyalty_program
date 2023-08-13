export interface IBrandsOrders {
  data: Daum[]
  meta: Meta
}

export interface Daum {
  id: number
  attributes: Attributes
}

export interface Attributes {
  quantity: number
  orderId: OrderId
  productId: ProductId
}

export interface OrderId {
  data: Data
}

export interface Data {
  id: number
  attributes: Attributes2
}

export interface Attributes2 {
  totalAmount: number
  numberOfTokens: number
  userId: UserId
}

export interface UserId {
  data: Data2
}

export interface Data2 {
  id: number
  attributes: Attributes3
}

export interface Attributes3 {
  username: string
  walletAddress: string
}

export interface ProductId {
  data: Data3
}

export interface Data3 {
  id: number
  attributes: Attributes4
}

export interface Attributes4 {
  price: number
  name: string
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
