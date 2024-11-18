'use client';

import React, { useCallback, useEffect, useState } from 'react';
import { Button, Input, Select, SelectItem } from '@nextui-org/react';
import { Category, Product, Role } from '@/types/types';
import { fetchProducts, deleteProduct } from '@/lib/product.api';
import { toastFailed, toastSuccess } from '@/utils/toastHelper';
import DeleteConfirmationModal from '@/components/common/DeleteConfirmationModal';
import { useRouter } from 'next/navigation';
import ProductsTable from '@/components/common/ProductTable';
import { fetchCategories } from '@/lib/category.api';

const ProductsPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [products, setProducts] = useState<Product[]>([]);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [totalProducts, setTotalProducts] = useState<number>();
  const [nameFilter, setNameFilter] = useState<string | undefined>();
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<Set<string>>(new Set([]));
  const router = useRouter();
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

  const onResetFilter = () => {
    setNameFilter('');
    setSelectedCategories(new Set([]));
  };

  useEffect(() => {
    setCurrentPage(1);
  }, [nameFilter]);

  useEffect(() => {
    loadProducts();
  }, [loadProducts]);

  const handleAddClick = () => {
    router.push(`/admin/products/add-product`);
  };

  const handleEditClick = (product: Product) => {
    router.push(`/admin/products/edit-product?id=${product.id}`);
  };

  const handleDeleteClick = (product: Product) => {
    setSelectedProduct(product);
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (selectedProduct?.id) {
      try {
        await deleteProduct(selectedProduct?.id);
        toastSuccess('Deleted product successfully');
        setIsDeleteModalOpen(false);
        setCurrentPage(1);
        loadProducts();
      } catch (err) {
        toastFailed('Failed to delete product');
      }
    }
  };

  const userRole = localStorage.getItem('userRole') as Role;

  return (
    <div className="p-4">
      <div className="my-2 text-lg font-semibold">Products</div>
      <div className="my-2 gap-2 p-4 border border-gray-200 shadow-md bg-white rounded-md flex items-center">
        <Button
          isDisabled={userRole !== 'SUPER_ADMIN'}
          size="md"
          color="primary"
          className="p-2 mr-4"
          onClick={handleAddClick}
        >
          Add New
        </Button>
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

      <ProductsTable
        isAdmin={true}
        handleEditClick={handleEditClick}
        handleDeleteClick={handleDeleteClick}
        products={products}
        pagination={{ totalPage: Math.ceil(totalProducts ? totalProducts / pageSize : 1), currentPage }}
        onChangePage={setCurrentPage}
        userRole={userRole}
      />

      <DeleteConfirmationModal
        selected={selectedProduct}
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        handleConfirmDelete={handleConfirmDelete}
      />
    </div>
  );
};

export default ProductsPage;
