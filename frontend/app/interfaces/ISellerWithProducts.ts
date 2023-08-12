export interface ISellerWithProducts {
  data: Daum[];
  meta: Meta;
}

export interface Daum {
  id: number;
  attributes: Attributes;
}

export interface Attributes {
  name: string;
  location: string;
  products: Products;
}

export interface Products {
  data: Daum2[];
}

export interface Daum2 {
  id: number;
  attributes: Attributes2;
}

export interface Attributes2 {
  name: string;
  description: string;
  price: number;
  images?: string[];
  brandId: BrandId;
  categories: Categories;
}

export interface BrandId {
  data: Data;
}

export interface Data {
  id: number;
  attributes: Attributes3;
}

export interface Attributes3 {
  name: string;
}

export interface Categories {
  data: Daum3[];
}

export interface Daum3 {
  id: number;
  attributes: Attributes4;
}

export interface Attributes4 {
  name: string;
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
