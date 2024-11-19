export interface IRegLogin {
  email: string;
  password: string;
}

export interface IAccountState {
  accountState: boolean;
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  isVerify: number;
}

export interface DecodedToken {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  userRole: 'SUPER_ADMIN' | 'STORE_ADMIN' | 'USER' | null;
  isVerify: number;
  storeId: number | null;
}

export interface IRegister {
  email: string;
  password: string;
  confirmPassword: string;
  firstName: string;
  lastName: string;
  mobileNum: number;
}

export interface IChangePassword {
  password: string;
  confirmPassword: string;
}

export interface IForgot {
  email: string;
}

export interface IAccount {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  avatar: string;
  role: number;
  storeId: number;
  isVerify: number;
  mobileNum: number;
}

export interface IUpdateEmail {
  id: number;
  email: string;
}

export interface IUpdateBasic {
  firstName: string;
  lastName: string;
  mobileNum: number;
}
