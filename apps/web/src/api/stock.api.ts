import axios, { AxiosRequestConfig } from 'axios';

// const API_BASE_URL = 'http://localhost:8000/api';
const STOCK_BASE_URL = `${process.env.NEXT_PUBLIC_BASE_API_URL}stock`;

export const fetchStocks = async (queryParams: { [key: string]: any } = {}) => {
  try {
    const config: AxiosRequestConfig = {
      params: queryParams
    };
    const response = await axios.get(`${STOCK_BASE_URL}`, config);
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch stocks');
  }
};

export const createStock = async (stockData: { productId: number; storeId: number; quantity: number }) => {
  try {
    const response = await axios.post(`${STOCK_BASE_URL}`, stockData, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
    return response.data;
  } catch (error) {
    throw new Error('Failed to create stock');
  }
};

export const getStockById = async (id: number) => {
  try {
    const response = await axios.get(`${STOCK_BASE_URL}/${id}`);
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch stock');
  }
};

export const updateStock = async (
  id: number,
  stockData: { productId?: number; storeId?: number; quantity?: number }
) => {
  try {
    const response = await axios.put(`${STOCK_BASE_URL}/${id}`, stockData, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
    return response.data;
  } catch (error) {
    throw new Error('Failed to update stock');
  }
};

export const deleteStock = async (id: number) => {
  try {
    await axios.delete(`${STOCK_BASE_URL}/${id}`);
  } catch (error) {
    throw new Error('Failed to delete stock');
  }
};
