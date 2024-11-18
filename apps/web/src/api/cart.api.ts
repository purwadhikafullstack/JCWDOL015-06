import axios, { AxiosRequestConfig } from 'axios';

const API_BASE_URL = 'http://localhost:8000/api';
const CART_BASE_URL = `${API_BASE_URL}/cart`;

export const fetchCarts = async (queryParams: { [key: string]: any } = {}) => {
  try {
    const config: AxiosRequestConfig = {
      params: queryParams
    };
    const response = await axios.get(`${CART_BASE_URL}`, config);
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch carts');
  }
};

export const createCart = async (cartData: { userId?: number; storeId?: number }) => {
  try {
    const response = await axios.post(`${CART_BASE_URL}`, cartData, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
    return response.data;
  } catch (error) {
    throw new Error('Failed to create cart');
  }
};

export const getCartById = async (id: number) => {
  try {
    const response = await axios.get(`${CART_BASE_URL}/${id}`);
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch cart');
  }
};

export const updateCart = async (
  id: number,
  cartData: {
    discountId?: number;
    totalPrice?: number;
    totalDiscount?: number;
    cartItems?: {
      productId?: number;
      quantity?: number;
      discountId?: number;
      totalPrice?: number;
      totalDiscount?: number;
    }[];
  }
) => {
  try {
    const response = await axios.put(`${CART_BASE_URL}/${id}`, cartData, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
    return response.data;
  } catch (error) {
    throw new Error('Failed to update cart');
  }
};

export const deleteCart = async (id: number) => {
  try {
    await axios.delete(`${CART_BASE_URL}/${id}`);
  } catch (error) {
    throw new Error('Failed to delete cart');
  }
};
