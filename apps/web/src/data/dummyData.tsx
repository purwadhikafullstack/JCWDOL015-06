export enum AppliedDiscountType {
  ON_PRODUCT = 'ON_PRODUCT',
  MINIMUM_PURCHASE = 'MINIMUM_PURCHASE',
  BUY_ONE_GET_ONE = 'BUY_ONE_GET_ONE'
}

export enum DiscountType {
  PERCENTAGE = 'PERCENTAGE',
  AMOUNT = 'AMOUNT'
}

export enum Role {
  SUPER_ADMIN,
  STORE_ADMIN,
  USER
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
  id: number;
  productId: number;
  storeId: number;
  store: Store;
  product: Product;
  quantity: number;
}

export interface StockHistory {
  id: number;
  userId: number;
  user: User;
  product: Product;
  productId: number;
  quantity: number;
  totalQuantity: number;
  storeId: number;
  store: Store;
  createdAt: Date;
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

export const dummyCategories = [
  { id: 1, name: 'Fruits' },
  { id: 2, name: 'Vegetables' },
  { id: 3, name: 'Dairy' },
  { id: 4, name: 'Meat' },
  { id: 5, name: 'Bakery' },
  { id: 6, name: 'Beverages' },
  { id: 7, name: 'Snacks' },
  { id: 8, name: 'Frozen Foods' },
  { id: 9, name: 'Canned Goods' },
  { id: 10, name: 'Condiments' },
  { id: 11, name: 'Spices' },
  { id: 12, name: 'Grains' },
  { id: 13, name: 'Pasta' },
  { id: 14, name: 'Seafood' },
  { id: 15, name: 'Sweets' },
  { id: 16, name: 'Personal Care' },
  { id: 17, name: 'Household Items' },
  { id: 18, name: 'Pet Supplies' },
  { id: 19, name: 'Baby Products' },
  { id: 20, name: 'Health Products' }
] as Category[];

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

export const dummyStoreAdmins = [
  {
    id: 1,
    firstName: 'Eren',
    lastName: 'Yeager',
    email: 'store1admin@example.com',
    role: Role.STORE_ADMIN,
    storeId: dummyStores[0].id,
    store: dummyStores[0]
  },
  {
    id: 2,
    firstName: 'Jane',
    lastName: 'Smith',
    email: 'jane.smith@example.com',
    role: Role.STORE_ADMIN,
    storeId: dummyStores[1].id,
    store: dummyStores[1]
  },
  {
    id: 3,
    firstName: 'Alice',
    lastName: 'Johnson',
    email: 'alice.johnson@example.com',
    role: Role.STORE_ADMIN,
    storeId: dummyStores[0].id,
    store: dummyStores[0]
  },
  {
    id: 4,
    firstName: 'Bob',
    lastName: 'Brown',
    email: 'bob.brown@example.com',
    role: Role.STORE_ADMIN,
    storeId: dummyStores[1].id,
    store: dummyStores[1]
  },
  {
    id: 5,
    firstName: 'Charlie',
    lastName: 'Davis',
    email: 'charlie.davis@example.com',
    role: Role.STORE_ADMIN,
    storeId: dummyStores[0].id,
    store: dummyStores[0]
  }
] as User[];

export const dummyUsers = [
  {
    id: 1,
    username: 'eren.yeager',
    firstName: 'Eren',
    lastName: 'Yeager',
    email: 'superadmin@example.com',
    role: 'SUPER_ADMIN',
    password: '12345',
    avatar: '',
    isVerify: 1,
    mobileNum: 9232392832,
    createdAt: '2024-11-16 11:23:36.335341',
    updatedAt: '2024-11-16 11:23:36.335341'
  },
  {
    id: 2,
    username: 'mikasa.ackerman',
    firstName: 'Mikasa',
    lastName: 'Ackerman',
    email: 'store1admin@example.com',
    role: 'STORE_ADMIN',
    storeId: 1,
    password: '12345',
    avatar: '',
    isVerify: 1,
    mobileNum: 9232392832,
    createdAt: '2024-11-16 11:23:36.335341',
    updatedAt: '2024-11-16 11:23:36.335341'
  },
  {
    id: 3,
    username: 'armin.arlert',
    firstName: 'Armin',
    lastName: 'Arlert',
    email: 'user1@example.com',
    role: 'USER',
    password: '12345',
    avatar: '',
    isVerify: 1,
    mobileNum: 9232392832,
    createdAt: '2024-11-16 11:23:36.335341',
    updatedAt: '2024-11-16 11:23:36.335341'
  }
];

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

export const dummyStockHistories = [
  {
    id: 1,
    userId: dummyStoreAdmins[0].id,
    user: dummyStoreAdmins[0],
    productId: dummyProducts[0].id,
    product: dummyProducts[0],
    quantity: 10,
    totalQuantity: 10,
    storeId: dummyStores[0].id,
    store: dummyStores[0],
    createdAt: new Date('2023-01-01T00:00:00Z')
  },
  {
    id: 2,
    userId: dummyStoreAdmins[0].id,
    user: dummyStoreAdmins[0],
    productId: dummyProducts[0].id,
    product: dummyProducts[0],
    quantity: -2,
    totalQuantity: 8,
    storeId: dummyStores[0].id,
    store: dummyStores[0],
    createdAt: new Date('2023-01-02T00:00:00Z')
  },
  {
    id: 3,
    userId: dummyStoreAdmins[1].id,
    user: dummyStoreAdmins[1],
    productId: dummyProducts[1].id,
    product: dummyProducts[1],
    quantity: 5,
    totalQuantity: 5,
    quantityChanged: 5,
    storeId: dummyStores[1].id,
    store: dummyStores[1],
    createdAt: new Date('2023-01-01T00:00:00Z')
  },
  {
    id: 4,
    userId: dummyStoreAdmins[1].id,
    user: dummyStoreAdmins[1],
    productId: dummyProducts[1].id,
    product: dummyProducts[1],
    quantity: 3,
    totalQuantity: 8,
    storeId: dummyStores[1].id,
    store: dummyStores[1],
    createdAt: new Date('2023-01-02T00:00:00Z')
  },
  {
    id: 5,
    userId: dummyStoreAdmins[2].id,
    user: dummyStoreAdmins[2],
    productId: dummyProducts[2].id,
    product: dummyProducts[2],
    quantity: 50,
    totalQuantity: 50,
    storeId: dummyStores[0].id,
    store: dummyStores[0],
    createdAt: new Date('2023-01-01T00:00:00Z')
  },
  {
    id: 6,
    userId: dummyStoreAdmins[2].id,
    user: dummyStoreAdmins[2],
    productId: dummyProducts[2].id,
    product: dummyProducts[2],
    quantity: -10,
    totalQuantity: 40,
    storeId: dummyStores[0].id,
    store: dummyStores[0],
    createdAt: new Date('2023-01-02T00:00:00Z')
  },
  {
    id: 7,
    userId: dummyStoreAdmins[3].id,
    user: dummyStoreAdmins[3],
    productId: dummyProducts[1].id,
    product: dummyProducts[1],
    quantity: 100,
    totalQuantity: 100,
    storeId: dummyStores[1].id,
    store: dummyStores[1],
    createdAt: new Date('2023-01-01T00:00:00Z')
  },
  {
    id: 8,
    userId: dummyStoreAdmins[3].id,
    user: dummyStoreAdmins[3],
    productId: dummyProducts[1].id,
    product: dummyProducts[1],
    quantity: -20,
    totalQuantity: 80,
    storeId: dummyStores[1].id,
    store: dummyStores[1],
    createdAt: new Date('2023-01-02T00:00:00Z')
  },
  {
    id: 9,
    userId: dummyStoreAdmins[4].id,
    user: dummyStoreAdmins[4],
    productId: dummyProducts[2].id,
    product: dummyProducts[2],
    quantity: 30,
    totalQuantity: 30,
    storeId: dummyStores[0].id,
    store: dummyStores[0],
    createdAt: new Date('2023-01-01T00:00:00Z')
  },
  {
    id: 10,
    userId: dummyStoreAdmins[4].id,
    user: dummyStoreAdmins[4],
    productId: dummyProducts[2].id,
    product: dummyProducts[2],
    quantity: 5,
    totalQuantity: 35,
    storeId: dummyStores[0].id,
    store: dummyStores[0],
    createdAt: new Date('2023-01-02T00:00:00Z')
  }
] as StockHistory[];

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

// createdAt      DateTime @default(now())
// userId         Int
// quantityChanged Int
// totalQuantity  Int

const dummyStockHistory22 = [
  {
    id: 1,
    productId: 1,
    storeId: 1,
    userId: 2,
    totalQuantity: 20,
    quantityChanged: 20,
    createdAt: '2023-01-16 11:23:36.000'
  },
  {
    id: 39,
    productId: 1,
    storeId: 1,
    userId: 1,
    totalQuantity: 15,
    quantityChanged: -5,
    createdAt: '2023-02-16 11:23:36.000'
  },
  {
    id: 2,
    productId: 2,
    storeId: 1,
    userId: 2,
    totalQuantity: 10,
    quantityChanged: 10,
    createdAt: '2023-03-16 11:23:36.000'
  },
  {
    id: 40,
    productId: 2,
    storeId: 1,
    userId: 2,
    totalQuantity: 2,
    quantityChanged: -8,
    createdAt: '2023-04-16 11:23:36.000'
  },
  {
    id: 3,
    productId: 2,
    storeId: 2,
    userId: 4,
    totalQuantity: 34,
    quantityChanged: 34,
    createdAt: '2023-05-16 11:23:36.000'
  },
  {
    id: 4,
    productId: 3,
    storeId: 1,
    userId: 2,
    totalQuantity: 20,
    quantityChanged: 20,
    createdAt: '2023-06-16 11:23:36.000'
  },
  {
    id: 41,
    productId: 3,
    storeId: 1,
    userId: 2,
    totalQuantity: 12,
    quantityChanged: -8,
    createdAt: '2023-07-16 11:23:36.000'
  },
  {
    id: 5,
    productId: 3,
    storeId: 2,
    userId: 4,
    totalQuantity: 3,
    quantityChanged: 3,
    createdAt: '2023-08-16 11:23:36.000'
  },
  {
    id: 6,
    productId: 4,
    storeId: 1,
    userId: 2,
    totalQuantity: 300,
    quantityChanged: 300,
    createdAt: '2023-09-16 11:23:36.000'
  },
  {
    id: 42,
    productId: 4,
    storeId: 1,
    userId: 2,
    totalQuantity: 234,
    quantityChanged: -66,
    createdAt: '2023-10-16 11:23:36.000'
  },
  {
    id: 7,
    productId: 5,
    storeId: 2,
    userId: 4,
    totalQuantity: 5,
    quantityChanged: 5,
    createdAt: '2023-11-16 11:23:36.000'
  },
  {
    id: 8,
    productId: 5,
    storeId: 1,
    userId: 2,
    totalQuantity: 56,
    quantityChanged: 56,
    createdAt: '2023-12-16 11:23:36.000'
  },
  {
    id: 9,
    productId: 6,
    storeId: 2,
    userId: 4,
    totalQuantity: 234,
    quantityChanged: 234,
    createdAt: '2024-01-16 11:23:36.000'
  },
  {
    id: 10,
    productId: 6,
    storeId: 2,
    userId: 4,
    totalQuantity: 20,
    quantityChanged: 20,
    createdAt: '2024-02-16 11:23:36.000'
  },
  {
    id: 43,
    productId: 6,
    storeId: 2,
    userId: 4,
    totalQuantity: 12,
    quantityChanged: -8,
    createdAt: '2024-03-16 11:23:36.000'
  },
  {
    id: 11,
    productId: 7,
    storeId: 2,
    userId: 4,
    totalQuantity: 66,
    quantityChanged: 66,
    createdAt: '2024-04-16 11:23:36.000'
  },
  {
    id: 12,
    productId: 8,
    storeId: 1,
    userId: 2,
    totalQuantity: 45,
    quantityChanged: 45,
    createdAt: '2024-05-16 11:23:36.000'
  },
  {
    id: 13,
    productId: 8,
    storeId: 2,
    userId: 4,
    totalQuantity: 334,
    quantityChanged: 334,
    createdAt: '2024-06-16 11:23:36.000'
  },
  {
    id: 14,
    productId: 9,
    storeId: 1,
    userId: 2,
    totalQuantity: 45,
    quantityChanged: 45,
    createdAt: '2024-07-16 11:23:36.000'
  },
  {
    id: 15,
    productId: 9,
    storeId: 2,
    userId: 4,
    totalQuantity: 33,
    quantityChanged: 33,
    createdAt: '2024-08-16 11:23:36.000'
  },
  {
    id: 16,
    productId: 10,
    storeId: 1,
    userId: 2,
    totalQuantity: 33,
    quantityChanged: 33,
    createdAt: '2024-09-16 11:23:36.000'
  },
  {
    id: 17,
    productId: 10,
    storeId: 2,
    userId: 4,
    totalQuantity: 77,
    quantityChanged: 77,
    createdAt: '2024-10-16 11:23:36.000'
  },
  {
    id: 18,
    productId: 11,
    storeId: 2,
    userId: 4,
    totalQuantity: 23,
    quantityChanged: 23,
    createdAt: '2024-11-16 11:23:36.000'
  },
  {
    id: 19,
    productId: 12,
    storeId: 1,
    userId: 2,
    totalQuantity: 44,
    quantityChanged: 44,
    createdAt: '2024-12-16 11:23:36.000'
  },
  {
    id: 20,
    productId: 13,
    storeId: 2,
    userId: 4,
    totalQuantity: 55,
    quantityChanged: 55,
    createdAt: '2023-01-16 11:23:36.000'
  },
  {
    id: 21,
    productId: 14,
    storeId: 1,
    userId: 2,
    totalQuantity: 34,
    quantityChanged: 34,
    createdAt: '2023-02-16 11:23:36.000'
  },
  {
    id: 22,
    productId: 14,
    storeId: 2,
    userId: 4,
    totalQuantity: 11,
    quantityChanged: 11,
    createdAt: '2023-03-16 11:23:36.000'
  },
  {
    id: 23,
    productId: 15,
    storeId: 1,
    userId: 2,
    totalQuantity: 1,
    quantityChanged: 1,
    createdAt: '2023-04-16 11:23:36.000'
  },
  {
    id: 24,
    productId: 15,
    storeId: 2,
    userId: 4,
    totalQuantity: 34,
    quantityChanged: 34,
    createdAt: '2023-05-16 11:23:36.000'
  },
  {
    id: 25,
    productId: 16,
    storeId: 1,
    userId: 2,
    totalQuantity: 5,
    quantityChanged: 5,
    createdAt: '2023-06-16 11:23:36.000'
  },
  {
    id: 26,
    productId: 16,
    storeId: 2,
    userId: 4,
    totalQuantity: 54,
    quantityChanged: 54,
    createdAt: '2023-07-16 11:23:36.000'
  },
  {
    id: 27,
    productId: 17,
    storeId: 1,
    userId: 2,
    totalQuantity: 53,
    quantityChanged: 53,
    createdAt: '2023-08-16 11:23:36.000'
  },
  {
    id: 28,
    productId: 18,
    storeId: 1,
    userId: 2,
    totalQuantity: 53,
    quantityChanged: 53,
    createdAt: '2023-09-16 11:23:36.000'
  },
  {
    id: 29,
    productId: 18,
    storeId: 2,
    userId: 4,
    totalQuantity: 53,
    quantityChanged: 53,
    createdAt: '2023-10-16 11:23:36.000'
  },
  {
    id: 30,
    productId: 19,
    storeId: 2,
    userId: 4,
    totalQuantity: 53,
    quantityChanged: 53,
    createdAt: '2023-11-16 11:23:36.000'
  },
  {
    id: 31,
    productId: 20,
    storeId: 2,
    userId: 4,
    totalQuantity: 22,
    quantityChanged: 22,
    createdAt: '2023-12-16 11:23:36.000'
  },
  {
    id: 32,
    productId: 21,
    storeId: 1,
    userId: 2,
    totalQuantity: 22,
    quantityChanged: 22,
    createdAt: '2024-01-16 11:23:36.000'
  },
  {
    id: 33,
    productId: 21,
    storeId: 2,
    userId: 4,
    totalQuantity: 23,
    quantityChanged: 23,
    createdAt: '2024-02-16 11:23:36.000'
  },
  {
    id: 34,
    productId: 22,
    storeId: 2,
    userId: 4,
    totalQuantity: 53,
    quantityChanged: 53,
    createdAt: '2024-03-16 11:23:36.000'
  },
  {
    id: 35,
    productId: 22,
    storeId: 1,
    userId: 2,
    totalQuantity: 53,
    quantityChanged: 53,
    createdAt: '2024-04-16 11:23:36.000'
  },
  {
    id: 36,
    productId: 23,
    storeId: 1,
    userId: 2,
    totalQuantity: 11,
    quantityChanged: 11,
    createdAt: '2024-05-16 11:23:36.000'
  },
  {
    id: 37,
    productId: 24,
    storeId: 2,
    userId: 4,
    totalQuantity: 34,
    quantityChanged: 34,
    createdAt: '2024-06-16 11:23:36.000'
  },
  {
    id: 38,
    productId: 25,
    storeId: 2,
    userId: 4,
    totalQuantity: 34,
    quantityChanged: 34,
    createdAt: '2024-07-16 11:23:36.000'
  }
];
