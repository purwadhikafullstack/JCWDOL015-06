import axios, { AxiosRequestConfig } from 'axios';

// const API_BASE_URL = 'http://localhost:8000/api';
const PRODUCT_BASE_URL = `${process.env.NEXT_PUBLIC_BASE_API_URL}product`;

export const fetchProducts = async (queryParams: { [key: string]: any } = {}) => {
  try {
    const config: AxiosRequestConfig = {
      params: queryParams
    };
    const response = await axios.get(`${PRODUCT_BASE_URL}`, config);
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch products');
  }
};

export const createProduct = async (productData: {
  productName?: string;
  desc?: string;
  price?: number;
  weight?: number;
  imageUrls?: string;
  categoryId?: number;
}) => {
  try {
    const response = await axios.post(`${PRODUCT_BASE_URL}`, productData, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
    return response.data;
  } catch (error) {
    throw new Error('Failed to create product');
  }
};

export const getProductById = async (id: number) => {
  try {
    const response = await axios.get(`${PRODUCT_BASE_URL}/${id}`);
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch product');
  }
};

export const updateProduct = async (
  id: number,
  productData: {
    productName?: string;
    desc?: string;
    price?: number;
    weight?: number;
    imageUrls?: string;
    categoryId?: number;
  }
) => {
  try {
    const response = await axios.put(`${PRODUCT_BASE_URL}/${id}`, productData, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
    return response.data;
  } catch (error) {
    throw new Error('Failed to update product');
  }
};

export const deleteProduct = async (id: number) => {
  try {
    await axios.delete(`${PRODUCT_BASE_URL}/${id}`);
  } catch (error) {
    throw new Error('Failed to delete product');
  }
};

export const getSpecials = async (userId: number) => {
  const res = await fetch(`${PRODUCT_BASE_URL}/specials/v2`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      userId
    })
  });

  const result = await res.json();

  return { result };
};
