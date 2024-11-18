import axios, { AxiosRequestConfig } from 'axios';

const API_BASE_URL = 'http://localhost:8000/api';
const ORDER_BASE_URL = `${API_BASE_URL}/order`;

export const fetchOrders = async (queryParams: { [key: string]: any } = {}) => {
  try {
    const config: AxiosRequestConfig = {
      params: queryParams
    };
    const response = await axios.get(`${ORDER_BASE_URL}`, config);
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch orders');
  }
};

export const createOrder = async (orderData: {
  userId: number;
  storeId: number;
  productId: number;
  quantityChanged: number;
  totalQuantity: number;
}) => {
  try {
    const response = await axios.post(`${ORDER_BASE_URL}`, orderData, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
    return response.data;
  } catch (error) {
    throw new Error('Failed to create order');
  }
};
