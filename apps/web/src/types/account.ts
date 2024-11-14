import { PiPassword } from "react-icons/pi";

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