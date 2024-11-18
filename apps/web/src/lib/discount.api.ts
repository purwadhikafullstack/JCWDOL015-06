import axios, { AxiosRequestConfig } from 'axios';

const API_BASE_URL = 'http://localhost:8000/api';
const DISCOUNT_BASE_URL = `${API_BASE_URL}/discount`;

export const fetchDiscounts = async (queryParams: { [key: string]: any } = {}) => {
  try {
    const config: AxiosRequestConfig = {
      params: queryParams
    };
    const response = await axios.get(`${DISCOUNT_BASE_URL}`, config);
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch discounts');
  }
};

export const createDiscount = async (discountData: { name: string }) => {
  try {
    const response = await axios.post(`${DISCOUNT_BASE_URL}`, discountData, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
    return response.data;
  } catch (error) {
    throw new Error('Failed to create discount');
  }
};

export const getDiscountById = async (id: number) => {
  try {
    const response = await axios.get(`${DISCOUNT_BASE_URL}/${id}`);
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch discount');
  }
};

export const updateDiscount = async (id: number, discountData: { name: string }) => {
  try {
    const response = await axios.put(`${DISCOUNT_BASE_URL}/${id}`, discountData, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
    return response.data;
  } catch (error) {
    throw new Error('Failed to update discount');
  }
};

export const deleteDiscount = async (id: number) => {
  try {
    await axios.delete(`${DISCOUNT_BASE_URL}/${id}`);
  } catch (error) {
    throw new Error('Failed to delete discount');
  }
};
