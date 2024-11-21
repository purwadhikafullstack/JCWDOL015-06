import axios, { AxiosRequestConfig } from 'axios';

// const API_BASE_URL = 'http://localhost:8000/api';
const STORE_BASE_URL = `${process.env.NEXT_PUBLIC_BASE_API_URL}store`;

export const fetchStores = async (queryParams: { [key: string]: any } = {}) => {
  try {
    const config: AxiosRequestConfig = {
      params: queryParams
    };
    const response = await axios.get(`${STORE_BASE_URL}`, config);
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch stores');
  }
};

export const createStore = async (storeData: { name: string }) => {
  try {
    const response = await axios.post(`${STORE_BASE_URL}`, storeData, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
    return response.data;
  } catch (error) {
    throw new Error('Failed to create store');
  }
};

export const getStoreById = async (id: number) => {
  try {
    const response = await axios.get(`${STORE_BASE_URL}/${id}`);
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch store');
  }
};

export const updateStore = async (id: number, storeData: { name: string }) => {
  try {
    const response = await axios.put(`${STORE_BASE_URL}/${id}`, storeData, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
    return response.data;
  } catch (error) {
    throw new Error('Failed to update store');
  }
};

export const deleteStore = async (id: number) => {
  try {
    await axios.delete(`${STORE_BASE_URL}/${id}`);
  } catch (error) {
    throw new Error('Failed to delete store');
  }
};
