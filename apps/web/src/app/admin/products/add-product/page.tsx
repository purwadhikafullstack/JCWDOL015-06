'use client';

import AddEditProductForm from '@/components/admin/AddEditProduct';
import { Product } from '@/types/types';

const AddProduct = () => {
  const handleSubmit = async (product: Product) => {
    console.log(product);
  };

  return (
    <div style={{ padding: '20px' }}>
      <div className="text-lg font-semibold">Add Product</div>
      <AddEditProductForm onSubmit={handleSubmit} mode="add" />
    </div>
  );
};

export default AddProduct;
