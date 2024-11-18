export enum AppliedDiscountType {
  ON_PRODUCT = 'ON_PRODUCT',
  MINIMUM_PURCHASE = 'MINIMUM_PURCHASE',
  BUY_ONE_GET_ONE = 'BUY_ONE_GET_ONE'
}

export enum DiscountType {
  PERCENTAGE = 'PERCENTAGE',
  AMOUNT = 'AMOUNT',
  BUY_ONE_GET_ONE = 'BUY_ONE_GET_ONE'
}

export enum Role {
  SUPER_ADMIN = 'SUPER_ADMIN',
  STORE_ADMIN = 'STORE_ADMIN',
  USER = 'USER'
}

export interface Category {
  id: number;
  name?: string;
}

export interface Store {
  id: number;
  name: string;
  address: string;
}

export interface User {
  id: number;
  username: string;
  password?: string;
  avatar?: string;
  isVerify?: number;
  mobileNum?: number;
  firstName: string;
  lastName: string;
  email: string;
  role: Role;
  storeId?: number;
  store?: Store;
  createdAt?: string;
  updatedAt?: string;
}

export interface Product {
  id?: number;
  price?: number;
  imageUrls?: string;
  categoryId?: number;
  productName?: string;
  desc?: string;
  weight?: number;
  category?: Category;
  Stock?: Stock[];
  productDiscounts?: {
    id?: number;
    productId?: number;
    discountId?: number;
    discount?: Discount;
  }[];
}

export interface Discount {
  id?: number;
  name: string;
  discountType: DiscountType;
  discountAmount?: number | null;
  discountPercentage?: number | null;
  appliedDiscountType: AppliedDiscountType;
  minimumPurchaseAmount?: number;
  products?: Product[];
  selectedProductIds?: number[] | string[];
  selectedProducts?: Product[];
  ProductDiscount?: {
    id?: number;
    productId?: number;
    product?: Product[];
  }[];
}

export interface Stock {
  id?: number;
  productId?: number;
  storeId?: number;
  store?: Store;
  product?: Product;
  quantity?: number;
}

export interface StockHistory {
  id: number;
  userId: number;
  user: User;
  product: Product;
  productId: number;
  quantityChanged: number;
  totalQuantity: number;
  storeId: number;
  store: Store;
  createdAt: Date;
}

export interface StoreAdmin {
  id?: number;
  username?: string;
  email?: string;
  password?: string;
  firstName?: string;
  lastName?: string;
  storeId?: number;
  mobileNum?: string;
  store?: Store;
}

export interface Order {
  id?: number;
  discountId?: number | null;
  discount?: Discount;
  totalPrice?: number;
  totalDiscount?: number;
  createdAt?: string;
  storeId?: number;
  userId?: number;
  orderItems?: OrderItem[];
  store?: Store;
}

export interface OrderItem {
  id?: number;
  orderId?: number;
  productId?: number;
  quantity?: number;
  totalPrice?: number;
  totalDiscount?: number;
  discountId?: number | null;
  product?: Product;
  discount?: Discount;
}

export interface Root {
  carts: Cart[];
  total: number;
}

export interface Cart {
  id?: number;
  totalPrice?: number;
  totalDiscount?: number;
  createdAt?: string;
  storeId?: number;
  userId?: number;
  cartItems?: CartItem[];
  discountId?: number;
  discount?: Discount;
  store?: Store;
  user?: User;
}

export interface CartItem {
  id?: number;
  cartId?: number;
  productId?: number;
  quantity?: number;
  totalPrice?: number;
  totalDiscount?: number;
  discountId?: number;
  product?: Product;
  discount?: Discount;
}
