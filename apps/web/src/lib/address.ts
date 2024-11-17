import { IAccountAddress, IAddressCreate } from '@/types/address';
import { getToken } from './cookie';

export const getAccountAddress = async () => {
  const token = await getToken();
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API_URL}address/user`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  const result = await res.json();

  return { result };
};

export const getProvincesAndCities = async () => {
  const res1 = await fetch(`${process.env.NEXT_PUBLIC_BASE_API_URL}address/provinces`, {
    method: 'GET'
  });

  const result1 = await res1.json();

  const res2 = await fetch(`${process.env.NEXT_PUBLIC_BASE_API_URL}address/cities`, {
    method: 'GET'
  });

  const result2 = await res2.json();

  return { result1, result2 };
};

export const getProvinces = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API_URL}address/provinces`, {
    method: 'GET'
  });

  const result = await res.json();
  return { result };
};

export const getCitiesByProvince = async (provinceId: number) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API_URL}address/cities/${provinceId}`, {
    method: 'GET'
  });

  const result = await res.json();
  return { result };
};

export const createAddress = async (data: IAddressCreate) => {
  const token = await getToken();
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API_URL}address/user`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify({
      provinceId: data.provinceId,
      cityId: data.cityId,
      desc: data.desc
    })
  });

  const result = await res.json();

  return { result };
};

export const updateAddress = async (id: number) => {
  const token = await getToken();
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API_URL}address/user`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify({
      id: id
    })
  });

  const result = await res.json();

  return { result };
};

export const deleteAddress = async (id: number) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API_URL}address/user`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      id: id
    })
  });

  const result = await res.json();

  return { result };
};
