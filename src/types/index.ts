// Product types
export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  longDescription: string;
  price: number;
  originalPrice?: number;
  images: string[];
  category: Category;
  subcategory?: string;
  tags: string[];
  rating: number;
  reviewCount: number;
  stock: number;
  sku: string;
  sizes?: string[];
  colors?: ProductColor[];
  featured: boolean;
  isNew: boolean;
  isBestSeller: boolean;
  materials?: string[];
  dimensions?: string;
  weight?: string;
  createdAt: string;
}

export interface ProductColor {
  name: string;
  hex: string;
}

export type Category =
  | "clothing"
  | "accessories"
  | "footwear"
  | "bags"
  | "jewelry"
  | "home";

// Cart types
export interface CartItem {
  product: Product;
  quantity: number;
  selectedSize?: string;
  selectedColor?: ProductColor;
}

export interface Cart {
  items: CartItem[];
  subtotal: number;
  discount: number;
  shipping: number;
  total: number;
}

// User types
export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  addresses: Address[];
  wishlist: string[];
}

export interface Address {
  id: string;
  label: string;
  street: string;
  city: string;
  state: string;
  zip: string;
  country: string;
  isDefault: boolean;
}

// Order types
export interface Order {
  id: string;
  userId: string;
  items: CartItem[];
  status: OrderStatus;
  shippingAddress: Address;
  paymentMethod: string;
  subtotal: number;
  discount: number;
  shipping: number;
  total: number;
  createdAt: string;
  updatedAt: string;
  trackingNumber?: string;
}

export type OrderStatus =
  | "pending"
  | "confirmed"
  | "processing"
  | "shipped"
  | "delivered"
  | "cancelled";

// Review types
export interface Review {
  id: string;
  userId: string;
  userName: string;
  userAvatar?: string;
  productId: string;
  rating: number;
  title: string;
  body: string;
  helpful: number;
  verified: boolean;
  createdAt: string;
}

// Filter types
export interface ProductFilters {
  categories: Category[];
  priceRange: [number, number];
  sizes: string[];
  colors: string[];
  rating: number;
  inStock: boolean;
  sortBy: SortOption;
}

export type SortOption =
  | "featured"
  | "newest"
  | "price-asc"
  | "price-desc"
  | "rating"
  | "best-selling";

// Navigation types
export interface NavItem {
  label: string;
  href: string;
  children?: NavItem[];
}
