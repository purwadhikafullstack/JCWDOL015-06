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

export interface Category {
  id: number;
  name?: string;
}

export const dummyProducts = [
  {
    id: 1,
    productName: 'Daging Sapi Rendang',
    price: 65000,
    category: {
      id: 20
    },
    imageUrls: [
      'https://i2.wp.com/juragansapi.com/wp-content/uploads/2020/05/promo-daging-sapisegar-lebaran-2020.jpg?fit=800%2C500&ssl=1'
    ],
    desc: 'Description for product 1Description for product 1Description for product 1Description for product 1Description for product 1Description for product 1',
    weight: 199,
    stock: 42
  },
  {
    id: 2,
    productName: 'Kentang frozen',
    price: 99000,
    category: {
      id: 16
    },
    imageUrls: [
      'https://www.static-src.com/wcsstore/Indraprastha/images/catalog/full//catalog-image/116/MTA-96749279/br-m036969-08463_-promo-kentang-goreng-fiesta-french-fries-shoestring-1-kg-500-gr_full01.jpg'
    ],
    desc: 'Description for product 2Description for product 2Description for product 2Description for product 2Description for product 2Description for product 2',
    weight: 235,
    stock: 8
  },
  {
    id: 3,
    productName: 'Kecap Manis Bango',
    price: 19000,
    category: {
      id: 19
    },
    imageUrls: ['https://assets.klikindomaret.com/share/HERO_BNR_BANGO-17-MEI.jpg'],
    desc: 'Description for product 3Description for product 3Description for product 3Description for product 3Description for product 3Description for product 3',
    weight: 339,
    stock: 39
  },
  {
    id: 4,
    productName: 'Product 4',
    price: 42000,
    category: {
      id: 20
    },
    imageUrls: [''],
    desc: 'Description for product 4Description for product 4Description for product 4Description for product 4Description for product 4Description for product 4',
    weight: 178,
    stock: 38
  },
  {
    id: 5,
    productName: 'Product 5',
    price: 33000,
    category: {
      id: 19
    },
    imageUrls: [''],
    desc: 'Description for product 5Description for product 5Description for product 5Description for product 5Description for product 5Description for product 5',
    weight: 403,
    stock: 10
  },
  {
    id: 6,
    productName: 'Product 6',
    price: 30000,
    category: {
      id: 17
    },
    imageUrls: [''],
    desc: 'Description for product 6Description for product 6Description for product 6Description for product 6Description for product 6Description for product 6',
    weight: 301,
    stock: 94
  },
  {
    id: 7,
    productName: 'Product 7',
    price: 77000,
    category: {
      id: 20
    },
    imageUrls: [''],
    desc: 'Description for product 7Description for product 7Description for product 7Description for product 7Description for product 7Description for product 7',
    weight: 531,
    stock: 72
  },
  {
    id: 8,
    productName: 'Product 8',
    price: 7000,
    category: {
      id: 6
    },
    imageUrls: [''],
    desc: 'Description for product 8Description for product 8Description for product 8Description for product 8Description for product 8Description for product 8',
    weight: 179,
    stock: 72
  },
  {
    id: 9,
    productName: 'Product 9',
    price: 77000,
    category: {
      id: 12
    },
    imageUrls: [''],
    desc: 'Description for product 9Description for product 9Description for product 9Description for product 9Description for product 9Description for product 9',
    weight: 331,
    stock: 21
  },
  {
    id: 10,
    productName: 'Product 10',
    price: 53000,
    category: {
      id: 12
    },
    imageUrls: [''],
    desc: 'Description for product 10Description for product 10Description for product 10Description for product 10Description for product 10Description for prod',
    weight: 524,
    stock: 67
  },
  {
    id: 11,
    productName: 'Product 11',
    price: 66000,
    category: {
      id: 18
    },
    imageUrls: [''],
    desc: 'Description for product 11Description for product 11Description for product 11Description for product 11Description for product 11Description for prod',
    weight: 522,
    stock: 2
  },
  {
    id: 12,
    productName: 'Telur',
    price: 17000,
    category: {
      id: 10
    },
    imageUrls: [''],
    desc: 'Description for product 12Description for product 12Description for product 12Description for product 12Description for product 12Description for prod',
    weight: 223,
    stock: 31
  },
  {
    id: 13,
    productName: 'Product 13',
    price: 73000,
    category: {
      id: 5
    },
    imageUrls: [''],
    desc: 'Description for product 13Description for product 13Description for product 13Description for product 13Description for product 13Description for prod',
    weight: 241,
    stock: 45
  },
  {
    id: 14,
    productName: 'Product 14',
    price: 53000,
    category: {
      id: 16
    },
    imageUrls: [''],
    desc: 'Description for product 14Description for product 14Description for product 14Description for product 14Description for product 14Description for prod',
    weight: 479,
    stock: 100
  },
  {
    id: 15,
    productName: 'Product 15',
    price: 50000,
    category: {
      id: 7
    },
    imageUrls: [''],
    desc: 'Description for product 15Description for product 15Description for product 15Description for product 15Description for product 15Description for prod',
    weight: 172,
    stock: 88
  },
  {
    id: 16,
    productName: 'Product 16',
    price: 63000,
    category: {
      id: 11
    },
    imageUrls: [''],
    desc: 'Description for product 16Description for product 16Description for product 16Description for product 16Description for product 16Description for prod',
    weight: 382,
    stock: 31
  },
  {
    id: 17,
    productName: 'Product 17',
    price: 96000,
    category: {
      id: 17
    },
    imageUrls: [''],
    desc: 'Description for product 17Description for product 17Description for product 17Description for product 17Description for product 17Description for prod',
    weight: 206,
    stock: 24
  },
  {
    id: 18,
    productName: 'Product 18',
    price: 81000,
    category: {
      id: 20
    },
    imageUrls: [''],
    desc: 'Description for product 18Description for product 18Description for product 18Description for product 18Description for product 18Description for prod',
    weight: 268,
    stock: 12
  },
  {
    id: 19,
    productName: 'Product 19',
    price: 97000,
    category: {
      id: 19
    },
    imageUrls: [''],
    desc: 'Description for product 19Description for product 19Description for product 19Description for product 19Description for product 19Description for prod',
    weight: 125,
    stock: 19
  },
  {
    id: 20,
    productName: 'Product 20',
    price: 51000,
    category: {
      id: 13
    },
    imageUrls: [''],
    desc: 'Description for product 20Description for product 20Description for product 20Description for product 20Description for product 20Description for prod',
    weight: 479,
    stock: 40
  },
  {
    id: 21,
    productName: 'Product 21',
    price: 27000,
    category: {
      id: 4
    },
    imageUrls: [''],
    desc: 'Description for product 21Description for product 21Description for product 21Description for product 21Description for product 21Description for prod',
    weight: 201,
    stock: 10
  },
  {
    id: 22,
    productName: 'Product 22',
    price: 81000,
    category: {
      id: 9
    },
    imageUrls: [''],
    desc: 'Description for product 22Description for product 22Description for product 22Description for product 22Description for product 22Description for prod',
    weight: 532,
    stock: 26
  },
  {
    id: 23,
    productName: 'Product 23',
    price: 49000,
    category: {
      id: 9
    },
    imageUrls: [''],
    desc: 'Description for product 23Description for product 23Description for product 23Description for product 23Description for product 23Description for prod',
    weight: 560,
    stock: 19
  },
  {
    id: 24,
    productName: 'Product 24',
    price: 34000,
    category: {
      id: 14
    },
    imageUrls: [''],
    desc: 'Description for product 24Description for product 24Description for product 24Description for product 24Description for product 24Description for prod',
    weight: 106,
    stock: 22
  },
  {
    id: 25,
    productName: 'Product 25',
    price: 29000,
    category: {
      id: 7
    },
    imageUrls: [''],
    desc: 'Description for product 25Description for product 25Description for product 25Description for product 25Description for product 25Description for prod',
    weight: 436,
    stock: 71
  },
  {
    id: 26,
    productName: 'Product 26',
    price: 51000,
    category: {
      id: 11
    },
    imageUrls: [''],
    desc: 'Description for product 26Description for product 26Description for product 26Description for product 26Description for product 26Description for prod',
    weight: 489,
    stock: 49
  },
  {
    id: 27,
    productName: 'Product 27',
    price: 76000,
    category: {
      id: 18
    },
    imageUrls: [''],
    desc: 'Description for product 27Description for product 27Description for product 27Description for product 27Description for product 27Description for prod',
    weight: 177,
    stock: 58
  },
  {
    id: 28,
    productName: 'Product 28',
    price: 35000,
    category: {
      id: 3
    },
    imageUrls: [''],
    desc: 'Description for product 28Description for product 28Description for product 28Description for product 28Description for product 28Description for prod',
    weight: 157,
    stock: 78
  },
  {
    id: 29,
    productName: 'Product 29',
    price: 26000,
    category: {
      id: 11
    },
    imageUrls: [''],
    desc: 'Description for product 29Description for product 29Description for product 29Description for product 29Description for product 29Description for prod',
    weight: 525,
    stock: 90
  },
  {
    id: 30,
    productName: 'Product 30',
    price: 38000,
    category: {
      id: 6
    },
    imageUrls: [''],
    desc: 'Description for product 30Description for product 30Description for product 30Description for product 30Description for product 30Description for prod',
    weight: 494,
    stock: 61
  },
  {
    id: 31,
    productName: 'Product 31',
    price: 36000,
    category: {
      id: 5
    },
    imageUrls: [''],
    desc: 'Description for product 31Description for product 31Description for product 31Description for product 31Description for product 31Description for prod',
    weight: 160,
    stock: 11
  },
  {
    id: 32,
    productName: 'Product 32',
    price: 92000,
    category: {
      id: 6
    },
    imageUrls: [''],
    desc: 'Description for product 32Description for product 32Description for product 32Description for product 32Description for product 32Description for prod',
    weight: 425,
    stock: 87
  },
  {
    id: 33,
    productName: 'Product 33',
    price: 6000,
    category: {
      id: 1
    },
    imageUrls: [''],
    desc: 'Description for product 33Description for product 33Description for product 33Description for product 33Description for product 33Description for prod',
    weight: 262,
    stock: 57
  },
  {
    id: 34,
    productName: 'Product 34',
    price: 87000,
    category: {
      id: 7
    },
    imageUrls: [''],
    desc: 'Description for product 34Description for product 34Description for product 34Description for product 34Description for product 34Description for prod',
    weight: 254,
    stock: 2
  },
  {
    id: 35,
    productName: 'Product 35',
    price: 54000,
    category: {
      id: 17
    },
    imageUrls: [''],
    desc: 'Description for product 35Description for product 35Description for product 35Description for product 35Description for product 35Description for prod',
    weight: 485,
    stock: 36
  },
  {
    id: 36,
    productName: 'Product 36',
    price: 74000,
    category: {
      id: 12
    },
    imageUrls: [''],
    desc: 'Description for product 36Description for product 36Description for product 36Description for product 36Description for product 36Description for prod',
    weight: 229,
    stock: 93
  },
  {
    id: 37,
    productName: 'Product 37',
    price: 92000,
    category: {
      id: 16
    },
    imageUrls: [''],
    desc: 'Description for product 37Description for product 37Description for product 37Description for product 37Description for product 37Description for prod',
    weight: 168,
    stock: 2
  },
  {
    id: 38,
    productName: 'Product 38',
    price: 35000,
    category: {
      id: 6
    },
    imageUrls: [''],
    desc: 'Description for product 38Description for product 38Description for product 38Description for product 38Description for product 38Description for prod',
    weight: 576,
    stock: 78
  },
  {
    id: 39,
    productName: 'Product 39',
    price: 28000,
    category: {
      id: 4
    },
    imageUrls: [''],
    desc: 'Description for product 39Description for product 39Description for product 39Description for product 39Description for product 39Description for prod',
    weight: 203,
    stock: 22
  },
  {
    id: 40,
    productName: 'Product 40',
    price: 31000,
    category: {
      id: 11
    },
    imageUrls: [''],
    desc: 'Description for product 40Description for product 40Description for product 40Description for product 40Description for product 40Description for prod',
    weight: 230,
    stock: 97
  },
  {
    id: 41,
    productName: 'Product 41',
    price: 26000,
    category: {
      id: 8
    },
    imageUrls: [''],
    desc: 'Description for product 41Description for product 41Description for product 41Description for product 41Description for product 41Description for prod',
    weight: 414,
    stock: 91
  },
  {
    id: 42,
    productName: 'Product 42',
    price: 68000,
    category: {
      id: 18
    },
    imageUrls: [''],
    desc: 'Description for product 42Description for product 42Description for product 42Description for product 42Description for product 42Description for prod',
    weight: 368,
    stock: 22
  },
  {
    id: 43,
    productName: 'Product 43',
    price: 70000,
    category: {
      id: 9
    },
    imageUrls: [''],
    desc: 'Description for product 43Description for product 43Description for product 43Description for product 43Description for product 43Description for prod',
    weight: 404,
    stock: 30
  },
  {
    id: 44,
    productName: 'Product 44',
    price: 48000,
    category: {
      id: 9
    },
    imageUrls: [''],
    desc: 'Description for product 44Description for product 44Description for product 44Description for product 44Description for product 44Description for prod',
    weight: 317,
    stock: 5
  },
  {
    id: 45,
    productName: 'Product 45',
    price: 44000,
    category: {
      id: 14
    },
    imageUrls: [''],
    desc: 'Description for product 45Description for product 45Description for product 45Description for product 45Description for product 45Description for prod',
    weight: 288,
    stock: 100
  },
  {
    id: 46,
    productName: 'Product 46',
    price: 22000,
    category: {
      id: 15
    },
    imageUrls: [''],
    desc: 'Description for product 46Description for product 46Description for product 46Description for product 46Description for product 46Description for prod',
    weight: 564,
    stock: 20
  },
  {
    id: 47,
    productName: 'Product 47',
    price: 31000,
    category: {
      id: 17
    },
    imageUrls: [''],
    desc: 'Description for product 47Description for product 47Description for product 47Description for product 47Description for product 47Description for prod',
    weight: 246,
    stock: 21
  },
  {
    id: 48,
    productName: 'Product 48',
    price: 15000,
    category: {
      id: 17
    },
    imageUrls: [''],
    desc: 'Description for product 48Description for product 48Description for product 48Description for product 48Description for product 48Description for prod',
    weight: 202,
    stock: 67
  },
  {
    id: 49,
    productName: 'Product 49',
    price: 62000,
    category: {
      id: 12
    },
    imageUrls: [''],
    desc: 'Description for product 49Description for product 49Description for product 49Description for product 49Description for product 49Description for prod',
    weight: 286,
    stock: 4
  },
  {
    id: 50,
    productName: 'Product 50',
    price: 20000,
    category: {
      id: 9
    },
    imageUrls: [''],
    desc: 'Description for product 50Description for product 50Description for product 50Description for product 50Description for product 50Description for prod',
    weight: 435,
    stock: 1
  }
];

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

export interface Store {
  id: number;
  name: string;
}

export const dummyStores = [
  { id: 0, name: 'Store Jakarta' },
  { id: 1, name: 'Store Bandung' }
];

export interface Product {
  id?: number;
  price?: number;
  imageUrls?: string[];
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

enum AppliedDiscountType {
  ON_PRODUCT = 'ON_PRODUCT',
  MINIMUM_PURCHASE = 'MINIMUM_PURCHASE',
  BUY_ONE_GET_ONE = 'BUY_ONE_GET_ONE'
}

enum DiscountType {
  PERCENTAGE = 'PERCENTAGE',
  AMOUNT = 'AMOUNT'
}

export const dummyDiscounts = [
  {
    id: 1,
    name: 'Summer Sale',
    discountType: DiscountType.PERCENTAGE,
    discountAmount: null,
    discountPercentage: 20,
    appliedDiscountType: AppliedDiscountType.ON_PRODUCT
  },
  {
    id: 2,
    name: 'Winter Sale',
    discountType: DiscountType.AMOUNT,
    discountAmount: 50000,
    discountPercentage: null,
    appliedDiscountType: AppliedDiscountType.MINIMUM_PURCHASE,
    minimumPurchaseAmount: 100000
  },
  {
    id: 3,
    name: 'Black Friday',
    discountType: DiscountType.PERCENTAGE,
    discountAmount: null,
    discountPercentage: 30,
    appliedDiscountType: AppliedDiscountType.BUY_ONE_GET_ONE
  },
  {
    id: 4,
    name: 'Cyber Monday',
    discountType: DiscountType.AMOUNT,
    discountAmount: 100000,
    discountPercentage: null,
    appliedDiscountType: AppliedDiscountType.ON_PRODUCT,
    products: dummyProducts.slice(1, 5)
  },
  {
    id: 5,
    name: 'New Year Sale',
    discountType: DiscountType.AMOUNT,
    discountAmount: 25000,
    discountPercentage: null,
    appliedDiscountType: AppliedDiscountType.MINIMUM_PURCHASE,
    minimumPurchaseAmount: 100000
  },
  {
    id: 6,
    name: "Valentine's Day",
    discountType: DiscountType.PERCENTAGE,
    discountAmount: null,
    discountPercentage: 75,
    appliedDiscountType: AppliedDiscountType.BUY_ONE_GET_ONE,
    products: dummyProducts.slice(1, 6)
  },
  {
    id: 7,
    name: 'Easter Sale',
    discountType: DiscountType.PERCENTAGE,
    discountAmount: null,
    discountPercentage: 15,
    appliedDiscountType: AppliedDiscountType.ON_PRODUCT,
    products: dummyProducts.slice(1, 3)
  },
  {
    id: 8,
    name: 'Halloween Sale',
    discountType: DiscountType.AMOUNT,
    discountAmount: 60000,
    discountPercentage: null,
    appliedDiscountType: AppliedDiscountType.MINIMUM_PURCHASE,
    minimumPurchaseAmount: 100000
  },
  {
    id: 9,
    name: 'Thanksgiving Sale',
    discountType: DiscountType.PERCENTAGE,
    discountAmount: null,
    discountPercentage: 10,
    appliedDiscountType: AppliedDiscountType.BUY_ONE_GET_ONE,
    products: dummyProducts.slice(2, 8)
  },
  {
    id: 10,
    name: 'Christmas Sale',
    discountType: DiscountType.AMOUNT,
    discountAmount: 150000,
    discountPercentage: null,
    appliedDiscountType: AppliedDiscountType.ON_PRODUCT,
    products: dummyProducts.slice(1, 2)
  }
] as Discount[];

export enum Role {
  SUPER_ADMIN,
  STORE_ADMIN,
  USER
}

export interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  role: Role;
  storeId?: number;
  store?: Store;
}

export const dummyStoreAdmins: User[] = [
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
];

export interface Stock {
  id: number;
  productId: number;
  storeId: number;
  store: Store;
  product: Product;
  quantity: number;
}

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
];

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

export const dummyStockHistories: StockHistory[] = [
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
];
