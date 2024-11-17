'use client';

import AddEditProductForm from '@/components/admin/AddEditProduct';

const AddProduct = () => {
  return (
    <div style={{ padding: '20px' }}>
      <div className="text-lg font-semibold">Add Product</div>
      <AddEditProductForm mode="add" />
    </div>
  );
};

export default AddProduct;
