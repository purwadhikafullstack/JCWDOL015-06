import { DecodedToken, IForgot, IRegister, IRegLogin, IUpdateBasic, IUpdateEmail } from '@/types/account';
import { jwtDecode } from 'jwt-decode';
import { getToken } from './cookie';

export const regulerLogin = async (data: IRegLogin) => {
  console.log('DATA FROM FORM, ', data);

  //   const postData = new FormData();
  //   postData.append('email', data.email.toString());
  //   postData.append('password', data.password.toString());

  //   console.log('DATA AFTER APPEND, ', postData.get('email'));

  //   const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API_URL}account/login`, {
  //     method: 'POST',
  //     body: postData
  //   });

  // Send data as JSON
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API_URL}account/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      email: data.email,
      password: data.password
    })
  });

  const res2 = await res.json();

  if (res2.status == 'ok') {
    // Decode the token to get user info
    const decodedToken: DecodedToken = jwtDecode<DecodedToken>(res2.token);

    return {
      result: {
        status: 'ok',
        user: decodedToken,
        token: res2.token
      }
    };
  } else {
    return { result: res2 };
  }
};

export const googleLogin = async (token: string) => {
  const decodedToken: DecodedToken = jwtDecode<DecodedToken>(token);

  return { decodedToken };
};

export const registerAccount = async (data: IRegister) => {
  console.log('\n\nREGISTER ACTION STARTS\n\n');

  // Send data as JSON
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API_URL}account/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      email: data.email,
      password: data.password,
      firstName: data.firstName,
      lastName: data.lastName,
      mobileNum: data.mobileNum
    })
  });

  const result = await res.json();

  return { result };
};

export const verifyAccount = async (token: string) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API_URL}account/account-verify`, {
    method: 'PATCH',
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  const result = await res.json();

  return { result };
};
// Unexpected token 'N', "Not found !" is not valid JSON

export const changePassword = async (password: string, token: string, email: string | null) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API_URL}account/change-password`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      password: password,
      token: token,
      email: email
    })
  });

  const result = await res.json();

  return { result };
};

export const forgotPassword = async (data: IForgot) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API_URL}account/forgot-password`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      email: data.email
    })
  });

  const result = await res.json();

  return { result };
};

export const getAccountDetail = async (token: string) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API_URL}account/account-detail`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  const result = await res.json();

  return { result };
};

export const updateAccountEmail = async (data: IUpdateEmail) => {
  const token = await getToken();

  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API_URL}account/update-email`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify({
      id: data.id,
      email: data.email
    })
  });

  const result = await res.json();

  return { result };
};

export const updateAccountBasic = async (id: number, data: IUpdateBasic) => {
  const token = await getToken();

  // Send data as JSON
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API_URL}account/update-basic`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify({
      id: id,
      firstName: data.firstName,
      lastName: data.lastName,
      mobileNum: data.mobileNum
    })
  });

  const result = await res.json();

  return { result };
};
