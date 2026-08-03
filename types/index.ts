export interface Customer {
  name: string;
  email: string;
}

export interface OrderProduct {
  name: string;
  image: string;
  type?: string;
}

export type OrderStatus = 'Pending' | 'Shipped' | 'Delivered' | 'Cancelled' | 'Refunded';

export interface Order {
  id: string;
  customer: Customer;
  product: OrderProduct;
  date: string;
  total: number;
  status: OrderStatus;
  action: string;
}

export type ProductStatus = 'Active' | 'Draft' | 'Archived';

export interface InventoryProduct {
  id: string;
  name: string;
  type: string | null;
  status: ProductStatus;
  stock: number | null;
  price: number;
  image: string | null;
}

export interface Category {
  id: string;
  name: string;
  icon: string;
}

export interface ShopProduct {
  id: number;
  name: string;
  description: string;
  price: number;
  rating: number;
  image: string;
  badge?: string;
  liked?: boolean;
}

export interface StoreProduct {
  id: string;
  name: string;
  description: string | null;
  type: string | null;
  category: string | null;
  sizes: string[];
  price: number;
  stock: number | null;
  image: string | null;
}

export interface ProductFeature {
  icon: string;
  title: string;
  description: string;
}

export interface ProductSpec {
  label: string;
  value: string;
}

export interface ProductDetail {
  id: number;
  title: string;
  subtitle: string;
  artist: string;
  artistAvatar: string;
  edition: string;
  rating: number;
  reviewCount: number;
  location: string;
  price: number;
  images: string[];
  features: ProductFeature[];
  description: string;
  specs: ProductSpec[];
  shipping: number;
  serviceFee: number;
  sizes: string[];
}
