import axios, { AxiosRequestConfig } from 'axios';

const API_BASE_URL = 'http://localhost:8000/api';
const STOCK_HISTORY_BASE_URL = `${API_BASE_URL}/stockHistory`;

export const fetchStockHistories = async (queryParams: { [key: string]: any } = {}) => {
  try {
    const config: AxiosRequestConfig = {
      params: queryParams
    };
    const response = await axios.get(`${STOCK_HISTORY_BASE_URL}`, config);
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch stock histories');
  }
};

export const createStockHistory = async (stockHistoryData: {
  userId: number;
  storeId: number;
  productId: number;
  quantityChanged: number;
  totalQuantity: number;
}) => {
  try {
    const response = await axios.post(`${STOCK_HISTORY_BASE_URL}`, stockHistoryData, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
    return response.data;
  } catch (error) {
    throw new Error('Failed to create stockHistory');
  }
};
