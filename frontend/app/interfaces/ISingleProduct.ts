export interface ISingleProduct {
  data: Daum[];
  meta: Meta;
}

export interface Daum {
  id: number;
  attributes: Attributes;
}

export interface Attributes {
  name: string;
  description: string;
  price: number;
  images: string[];
  brandId: BrandId;
  categories: Categories;
  sellers: Sellers;
}

export interface BrandId {
  data: Data;
}

export interface Data {
  id: number;
  attributes: Attributes2;
}

export interface Attributes2 {
  name: string;
  brandLogo: string;
  user: User;
}

export interface User {
  data: Data2;
}

export interface Data2 {
  id: number;
  attributes: Attributes3;
}

export interface Attributes3 {
  username: string;
  walletAddress: string;
}

export interface Categories {
  data: Daum2[];
}

export interface Daum2 {
  id: number;
  attributes: Attributes4;
}

export interface Attributes4 {
  name: string;
}

export interface Sellers {
  data: Daum3[];
}

export interface Daum3 {
  id: number;
  attributes: Attributes5;
}

export interface Attributes5 {
  name: string;
  location: string;
  user: User2;
}

export interface User2 {
  data: Data3;
}

export interface Data3 {
  id: number;
  attributes: Attributes6;
}

export interface Attributes6 {
  username: string;
  walletAddress: string;
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
