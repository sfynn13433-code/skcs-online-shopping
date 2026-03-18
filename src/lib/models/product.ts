export interface ProductVendor {
  name: string;
  price: number;
  stock: string;
  link: string;
}

export interface Product {
  id: string;
  title: string;
  category: string;
  image: string;
  rating: number;
  reviews: number;
  bestPrice: number;
  history: number[];
  vendors: ProductVendor[];
}
