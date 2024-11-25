import { Role } from '@/types/types';
import axios, { AxiosRequestConfig } from 'axios';

// const API_BASE_URL = 'http://localhost:8000/api';
const STORE_ADMIN_BASE_URL = `${process.env.NEXT_PUBLIC_BASE_API_URL}storeAdmin`;

export const fetchStoreAdmins = async (queryParams: { [key: string]: any } = {}) => {
  let newQueryParams = { ...queryParams };
  newQueryParams.role = Role.STORE_ADMIN;
  try {
    const config: AxiosRequestConfig = {
      params: newQueryParams
    };
    const response = await axios.get(`${STORE_ADMIN_BASE_URL}`, config);
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch store admins');
  }
};

export const fetchAllUsers = async () => {
  try {
    const response = await axios.get(`${STORE_ADMIN_BASE_URL}`);
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch users');
  }
};

export const createStoreAdmin = async (storeAdminData: {
  username: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  storeId: number;
  mobileNum: string;
}) => {
  try {
    const response = await axios.post(`${STORE_ADMIN_BASE_URL}`, storeAdminData, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
    return response.data;
  } catch (error) {
    throw new Error('Failed to create storeAdmin');
  }
};

export const getStoreAdminById = async (id: number) => {
  try {
    const response = await axios.get(`${STORE_ADMIN_BASE_URL}/${id}`);
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch storeAdmin');
  }
};

export const updateStoreAdmin = async (
  id: number,
  storeAdminData: { firstName?: string; lastName?: string; storeId?: number }
) => {
  try {
    const response = await axios.put(`${STORE_ADMIN_BASE_URL}/${id}`, storeAdminData, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
    return response.data;
  } catch (error) {
    throw new Error('Failed to update storeAdmin');
  }
};

export const deleteStoreAdmin = async (id: number) => {
  try {
    await axios.delete(`${STORE_ADMIN_BASE_URL}/${id}`);
  } catch (error) {
    throw new Error('Failed to delete storeAdmin');
  }
};
