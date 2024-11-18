import axios, { AxiosRequestConfig } from 'axios';

const API_BASE_URL = 'http://localhost:8000/api';
const CATEGORY_BASE_URL = `${API_BASE_URL}/category`;

export const fetchCategories = async (queryParams: { [key: string]: any } = {}) => {
  try {
    const config: AxiosRequestConfig = {
      params: queryParams
    };
    const response = await axios.get(`${CATEGORY_BASE_URL}`, config);
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch categories');
  }
};

export const createCategory = async (categoryData: { name: string }) => {
  try {
    const response = await axios.post(`${CATEGORY_BASE_URL}`, categoryData, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
    return response.data;
  } catch (error) {
    throw new Error('Failed to create category');
  }
};

export const getCategoryById = async (id: number) => {
  try {
    const response = await axios.get(`${CATEGORY_BASE_URL}/${id}`);
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch category');
  }
};

export const updateCategory = async (id: number, categoryData: { name: string }) => {
  try {
    const response = await axios.put(`${CATEGORY_BASE_URL}/${id}`, categoryData, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
    return response.data;
  } catch (error) {
    throw new Error('Failed to update category');
  }
};

export const deleteCategory = async (id: number) => {
  try {
    await axios.delete(`${CATEGORY_BASE_URL}/${id}`);
  } catch (error) {
    throw new Error('Failed to delete category');
  }
};
