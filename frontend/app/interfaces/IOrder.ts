// export type IOrder = Root2[];

export interface IOrder {
  id: number;
  attributes: Attributes;
}

export interface Attributes {
  numberOfTokens: number;
  totalAmount: number;
  order_items: OrderItems;
}

export interface OrderItems {
  data: Daum[];
}

export interface Daum {
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
