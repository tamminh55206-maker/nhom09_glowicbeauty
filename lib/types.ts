export type Brand =
  | "Maybelline"
  | "Cocoon"
  | "L'Oréal"
  | "3CE"
  | "Carslan"
  | "Peripera"
  | "Romand"
  | "Cerave";

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
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export type UserOrderStatus =
  | "pending"
  | "shipping"
  | "delivered"
  | "cancelled";

export interface UserNotification {
  id: string;
  title: string;
  lines: string[];
  postedAt: string;
}

export interface UserOrderItem {
  id: string;
  name: string;
  image: string;
  price: number;
  quantity: number;
}

export interface UserOrder {
  id: string;
  placedAt: string;
  status: UserOrderStatus;
  paymentMethod: string;
  shippingAddress: string;
  total: number;
  items: UserOrderItem[];
}

export interface UserAccount {
  id: string;
  name: string;
  phone: string;
  email: string;
  password: string;
  birthDate: string;
  memberTier: string;
  joinedAt: string;
  shippingAddress: string;
  notifications: UserNotification[];
  orders: UserOrder[];
}

export interface UserRegistrationInput {
  name: string;
  phone: string;
  email: string;
  password: string;
  birthDate: string;
}
