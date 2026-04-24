export type Brand =
  | "Maybelline"
  | "Cocoon"
  | "L'Oréal"
  | "3CE"
  | "Carslan"
  | "Peripera"
  | "Romand"
  | "Cerave";

export interface AppliedDiscount {
  code: string;
  amount: number;
}

export interface Product {
  id: string;
  name: string;
  brand: Brand;
  category: string;
  price: number;
  rating: number;
  images: string[];
  description: string;
  stock: number;
  skinType: string[];
  slug: string;
  variant?: string;
  appliedDiscount?: AppliedDiscount;
}

export interface CartItem {
  product: Product;
  quantity: number;
}
