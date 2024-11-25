'use client';

import React, { useCallback, useEffect, useState } from 'react';
import { Category, Product } from '@/types/types';
// import ProductsTable from '@/components/common/ProductTable';
import ProductGrid from '@/components/common/ProductGrid';
import { fetchCategories } from '@/api/category.api';
import { fetchProducts } from '@/api/product.api';
import { toastFailed } from '@/utils/toastHelper';
import { Button, Input, Select, SelectItem } from '@nextui-org/react';
const ProductsPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [products, setProducts] = useState<Product[]>([]);
  const [totalProducts, setTotalProducts] = useState<number>();
  const [nameFilter, setNameFilter] = useState<string>('');
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<Set<string>>(new Set([]));

  const pageSize = 10;

  useEffect(() => {
    const getStores = async () => {
      const response = await fetchCategories({ page: 1, pageSize: 100 });
      const categoriesResponse = response.categories?.map((store: any) => {
        return {
          ...store,
          id: String(store.id)
        };
      });
      setCategories(categoriesResponse);
    };

    getStores();
  }, []);

  const loadProducts = useCallback(async () => {
    try {
      const selectedCategoryIds = Array.from(selectedCategories);
      const queryParams = { page: currentPage, pageSize } as { [key: string]: any };
      if (nameFilter) {
        queryParams.name = nameFilter;
      }
      if (selectedCategoryIds) {
        queryParams.categoryIds = selectedCategoryIds;
      }
      const response = await fetchProducts(queryParams);
      setProducts(response.products);
      setTotalProducts(response.total);
    } catch (err) {
      toastFailed('Failed to fetch products');
      setProducts([]);
      setTotalProducts(0);
    }
  }, [currentPage, nameFilter, selectedCategories]);

  useEffect(() => {
    loadProducts();
  }, [loadProducts]);

  const onResetFilter = () => {
    setNameFilter('');
    setSelectedCategories(new Set([]));
  };

  return (
    <div className="p-4 mx-auto w-full grid grid-cols-12 gap-5">
      <div className="my-2 gap-3 p-4 border col-span-3 border-gray-200 shadow-md bg-white rounded-md flex flex-col">
        <div>Filter Products</div>
        <Input size="sm" label="Search by Name" value={nameFilter} onChange={(e) => setNameFilter(e.target.value)} />
        <Select
          fullWidth
          multiple={true}
          label="Filter By Cateogry"
          selectedKeys={selectedCategories}
          onSelectionChange={(e) => {
            const newCategories = [...selectedCategories, String(e.currentKey)];

            setSelectedCategories(new Set([...newCategories]));
          }}
        >
          {categories?.map((category) => (
            <SelectItem key={category.id} textValue={category.name} value={category.id}>
              {category.name}
            </SelectItem>
          ))}
        </Select>
        <Button className="bg-gray-100" onClick={onResetFilter}>
          Reset
        </Button>
      </div>
      <div className="col-span-9">
        <ProductGrid
          products={products ?? []}
          pagination={{ totalPage: Math.ceil(totalProducts ? totalProducts / pageSize : 1), currentPage }}
          onChangePage={setCurrentPage}
        />
      </div>
    </div>
  );
};

export default ProductsPage;
