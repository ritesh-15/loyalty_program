export interface IOrders {
  data: Daum[];
  meta: Meta;
}

export interface Daum {
  id: number;
  attributes: Attributes;
}

export interface Attributes {
  numberOfTokens: number;
  totalAmount: number;
  order_items: OrderItems;
}

export interface OrderItems {
  data: Daum2[];
}

export interface Daum2 {
  id: number;
  attributes: Attributes2;
}

export interface Attributes2 {
  quantity: number;
  productId: ProductId;
}

export interface ProductId {
  data: Data;
}

export interface Data {
  id: number;
  attributes: Attributes3;
}

export interface Attributes3 {
  name: string;
  images: string[];
  price: number;
}

export interface Meta {
  pagination: Pagination;
}

export interface Pagination {
  page: number;
  pageSize: number;
  pageCount: number;
  total: number;
}
