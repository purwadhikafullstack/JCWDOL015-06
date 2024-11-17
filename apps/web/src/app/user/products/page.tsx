'use client';

import React, { useCallback, useEffect, useState } from 'react';
import { Product } from '@/types/types';
// import ProductsTable from '@/components/common/ProductTable';
import ProductGrid from '@/components/common/ProductGrid';
import { fetchCategories } from '@/api/category.api';
import { fetchProducts } from '@/api/product.api';
import { toastFailed } from '@/utils/toastHelper';

const ProductsPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [products, setProducts] = useState<Product[]>([]);
  const [totalProducts, setTotalProducts] = useState<number>();

  const pageSize = 20;

  const loadProducts = useCallback(async () => {
    try {
      const queryParams = { page: currentPage, pageSize } as { [key: string]: any };

      const response = await fetchProducts(queryParams);
      setProducts(response.products);
      setTotalProducts(response.total);
    } catch (err) {
      toastFailed('Failed to fetch products');
      setProducts([]);
      setTotalProducts(0);
    }
  }, [currentPage]);

  useEffect(() => {
    loadProducts();
  }, [loadProducts]);

  return (
    <div className="p-4 mx-auto w-full items-center">
      <ProductGrid
        products={products ?? []}
        pagination={{ totalPage: Math.ceil(totalProducts ? totalProducts / pageSize : 1), currentPage }}
        onChangePage={setCurrentPage}
      />
    </div>
  );
};

export default ProductsPage;
