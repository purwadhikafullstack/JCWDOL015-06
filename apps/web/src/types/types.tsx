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
}

export interface Discount {
  id: number;
  name: string;
  discountType: DiscountType;
  discountAmount?: number | null;
  discountPercentage?: number | null;
  appliedDiscountType: AppliedDiscountType;
  minimumPurchaseAmount?: number;
  products?: Product[];
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

export const dummyProducts = [
  {
    id: 1,
    productName: 'Daging Sapi Rendang',
    price: 65000,
    categoryId: 4,
    imageUrls: '',
    desc: 'Description for product 1Description for product 1Description for product 1Description for product 1Description for product 1Description for product 1',
    weight: 199
  },
  {
    id: 2,
    productName: 'Kentang frozen',
    price: 99000,
    categoryId: 2,
    imageUrls: '',
    desc: 'Description for product 2Description for product 2Description for product 2Description for product 2Description for product 2Description for product 2',
    weight: 235
  },
  {
    id: 3,
    productName: 'Kecap Manis Bango',
    price: 19000,
    categoryId: 10,
    imageUrls: '',
    desc: 'Description for product 3Description for product 3Description for product 3Description for product 3Description for product 3Description for product 3',
    weight: 339
  },
  {
    id: 4,
    productName: 'Product 4',
    price: 42000,
    categoryId: 20,
    imageUrls: '',
    desc: 'Description for product 4Description for product 4Description for product 4Description for product 4Description for product 4Description for product 4',
    weight: 178
  },
  {
    id: 5,
    productName: 'Product 5',
    price: 33000,
    categoryId: 19,
    imageUrls: '',
    desc: 'Description for product 5Description for product 5Description for product 5Description for product 5Description for product 5Description for product 5',
    weight: 403
  },
  {
    id: 6,
    productName: 'Product 6',
    price: 30000,
    categoryId: 17,
    imageUrls: '',
    desc: 'Description for product 6Description for product 6Description for product 6Description for product 6Description for product 6Description for product 6',
    weight: 301
  },
  {
    id: 7,
    productName: 'Product 7',
    price: 77000,
    categoryId: 20,
    imageUrls: '',
    desc: 'Description for product 7Description for product 7Description for product 7Description for product 7Description for product 7Description for product 7',
    weight: 531
  },
  {
    id: 8,
    productName: 'Product 8',
    price: 7000,
    categoryId: 6,
    imageUrls: '',
    desc: 'Description for product 8Description for product 8Description for product 8Description for product 8Description for product 8Description for product 8',
    weight: 179
  },
  {
    id: 9,
    productName: 'Product 9',
    price: 77000,
    categoryId: 12,
    imageUrls: '',
    desc: 'Description for product 9Description for product 9Description for product 9Description for product 9Description for product 9Description for product 9',
    weight: 331
  },
  {
    id: 10,
    productName: 'Product 10',
    price: 53000,
    categoryId: 12,
    imageUrls: '',
    desc: 'Description for product 10Description for product 10Description for product 10Description for product 10Description for product 10Description for prod',
    weight: 524
  },
  {
    id: 11,
    productName: 'Product 11',
    price: 66000,
    categoryId: 18,
    imageUrls: '',
    desc: 'Description for product 11Description for product 11Description for product 11Description for product 11Description for product 11Description for prod',
    weight: 522
  },
  {
    id: 12,
    productName: 'Telur',
    price: 17000,
    categoryId: 10,
    imageUrls: '',
    desc: 'Description for product 12Description for product 12Description for product 12Description for product 12Description for product 12Description for prod',
    weight: 223
  },
  {
    id: 13,
    productName: 'Product 13',
    price: 73000,
    categoryId: 5,
    imageUrls: '',
    desc: 'Description for product 13Description for product 13Description for product 13Description for product 13Description for product 13Description for prod',
    weight: 241
  },
  {
    id: 14,
    productName: 'Product 14',
    price: 53000,
    categoryId: 16,
    imageUrls: '',
    desc: 'Description for product 14Description for product 14Description for product 14Description for product 14Description for product 14Description for prod',
    weight: 479
  },
  {
    id: 15,
    productName: 'Product 15',
    price: 50000,
    categoryId: 7,
    imageUrls: '',
    desc: 'Description for product 15Description for product 15Description for product 15Description for product 15Description for product 15Description for prod',
    weight: 172
  },
  {
    id: 16,
    productName: 'Product 16',
    price: 63000,
    categoryId: 11,
    imageUrls: '',
    desc: 'Description for product 16Description for product 16Description for product 16Description for product 16Description for product 16Description for prod',
    weight: 382
  },
  {
    id: 17,
    productName: 'Product 17',
    price: 96000,
    categoryId: 17,
    imageUrls: '',
    desc: 'Description for product 17Description for product 17Description for product 17Description for product 17Description for product 17Description for prod',
    weight: 206
  },
  {
    id: 18,
    productName: 'Product 18',
    price: 81000,
    categoryId: 20,
    imageUrls: '',
    desc: 'Description for product 18Description for product 18Description for product 18Description for product 18Description for product 18Description for prod',
    weight: 268
  },
  {
    id: 19,
    productName: 'Product 19',
    price: 97000,
    categoryId: 19,
    imageUrls: '',
    desc: 'Description for product 19Description for product 19Description for product 19Description for product 19Description for product 19Description for prod',
    weight: 125
  },
  {
    id: 20,
    productName: 'Product 20',
    price: 51000,
    categoryId: 13,
    imageUrls: '',
    desc: 'Description for product 20Description for product 20Description for product 20Description for product 20Description for product 20Description for prod',
    weight: 479
  },
  {
    id: 21,
    productName: 'Product 21',
    price: 27000,
    categoryId: 4,
    imageUrls: '',
    desc: 'Description for product 21Description for product 21Description for product 21Description for product 21Description for product 21Description for prod',
    weight: 201
  },
  {
    id: 22,
    productName: 'Product 22',
    price: 81000,
    categoryId: 9,
    imageUrls: '',
    desc: 'Description for product 22Description for product 22Description for product 22Description for product 22Description for product 22Description for prod',
    weight: 532
  },
  {
    id: 23,
    productName: 'Product 23',
    price: 49000,
    categoryId: 9,
    imageUrls: '',
    desc: 'Description for product 23Description for product 23Description for product 23Description for product 23Description for product 23Description for prod',
    weight: 560
  },
  {
    id: 24,
    productName: 'Product 24',
    price: 34000,
    categoryId: 14,
    imageUrls: '',
    desc: 'Description for product 24Description for product 24Description for product 24Description for product 24Description for product 24Description for prod',
    weight: 106
  },
  {
    id: 25,
    productName: 'Product 25',
    price: 29000,
    categoryId: 7,
    imageUrls: '',
    desc: 'Description for product 25Description for product 25Description for product 25Description for product 25Description for product 25Description for prod',
    weight: 436
  }
] as Product[];

export const dummyStores = [
  { id: 0, name: 'Store Jakarta', address: 'Jl. Jakarta No. 1' },
  { id: 1, name: 'Store Bandung', address: 'Jl. Bandung No. 2' }
] as Store[];

export const dummyDiscounts = [
  {
    id: 1,
    name: 'Summer Sale',
    discountType: 'PERCENTAGE',
    discountAmount: null,
    discountPercentage: 20,
    appliedDiscountType: 'ON_PRODUCT'
  },
  {
    id: 2,
    name: 'Winter Sale',
    discountType: 'AMOUNT',
    discountAmount: 50000,
    discountPercentage: null,
    appliedDiscountType: 'MINIMUM_PURCHASE',
    minimumPurchaseAmount: 100000
  },
  {
    id: 3,
    name: 'Black Friday',
    discountType: 'PERCENTAGE',
    discountAmount: null,
    discountPercentage: 30,
    appliedDiscountType: 'BUY_ONE_GET_ONE'
  },
  {
    id: 4,
    name: 'Cyber Monday',
    discountType: 'AMOUNT',
    discountAmount: 100000,
    discountPercentage: null,
    appliedDiscountType: 'ON_PRODUCT',
    products: dummyProducts.slice(1, 5)
  },
  {
    id: 5,
    name: 'New Year Sale',
    discountType: 'AMOUNT',
    discountAmount: 25000,
    discountPercentage: null,
    appliedDiscountType: 'MINIMUM_PURCHASE',
    minimumPurchaseAmount: 100000
  },
  {
    id: 6,
    name: "Valentine's Day",
    discountType: 'PERCENTAGE',
    discountAmount: null,
    discountPercentage: 75,
    appliedDiscountType: 'BUY_ONE_GET_ONE',
    products: dummyProducts.slice(1, 6)
  },
  {
    id: 7,
    name: 'Easter Sale',
    discountType: 'PERCENTAGE',
    discountAmount: null,
    discountPercentage: 15,
    appliedDiscountType: 'ON_PRODUCT',
    products: dummyProducts.slice(1, 3)
  },
  {
    id: 8,
    name: 'Halloween Sale',
    discountType: 'AMOUNT',
    discountAmount: 60000,
    discountPercentage: null,
    appliedDiscountType: 'MINIMUM_PURCHASE',
    minimumPurchaseAmount: 100000
  },
  {
    id: 9,
    name: 'Thanksgiving Sale',
    discountType: 'PERCENTAGE',
    discountAmount: null,
    discountPercentage: 10,
    appliedDiscountType: 'BUY_ONE_GET_ONE',
    products: dummyProducts.slice(2, 8)
  },
  {
    id: 10,
    name: 'Christmas Sale',
    discountType: 'AMOUNT',
    discountAmount: 150000,
    discountPercentage: null,
    appliedDiscountType: 'ON_PRODUCT',
    products: dummyProducts.slice(1, 2)
  }
] as Discount[];

export const dummyStocks = [
  {
    id: 1,
    productId: dummyProducts[0].id,
    product: dummyProducts[0],
    storeId: dummyStores[0].id,
    store: dummyStores[0],
    quantity: 10
  },
  {
    id: 2,
    productId: dummyProducts[0].id,
    product: dummyProducts[0],
    storeId: dummyStores[1].id,
    store: dummyStores[1],
    quantity: 5
  },
  {
    id: 3,
    productId: dummyProducts[1].id,
    product: dummyProducts[1],
    storeId: dummyStores[0].id,
    store: dummyStores[0],
    quantity: 50
  },
  {
    id: 4,
    productId: dummyProducts[1].id,
    product: dummyProducts[1],
    storeId: dummyStores[1].id,
    store: dummyStores[1],
    quantity: 100
  },
  {
    id: 5,
    productId: dummyProducts[2].id,
    product: dummyProducts[2],
    storeId: dummyStores[0].id,
    store: dummyStores[0],
    quantity: 30
  }
] as Stock[];

interface DummyData {
  sales: { [key: string]: number[] };
}

export const dummyData: DummyData = {
  sales: {
    All: [14, 22, 23, 10, 3, 7],
    'Store Jakarta': [12, 19, 3, 5, 2, 3],
    'Store Bandung': [2, 3, 20, 5, 1, 4]
  }
};
