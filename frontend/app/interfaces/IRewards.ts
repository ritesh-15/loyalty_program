export interface IRewards{
    data: Root
}

export type Root = Root2[];

export interface Root2 {
  id: number;
  attributes: Attributes;
}

export interface Attributes {
  discount: number;
  points: number;
  product: Product;
}

export interface Product {
  data: Data;
}

export interface Data {
  id: number;
  attributes: Attributes2;
}

export interface Attributes2 {
  name: string;
  description: string;
  images?: string[];
  price: number;
}
