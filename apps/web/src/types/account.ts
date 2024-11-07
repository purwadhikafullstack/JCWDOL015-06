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
}

export interface DecodedToken {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
}

export interface IRegister {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  mobileNum: number;
}