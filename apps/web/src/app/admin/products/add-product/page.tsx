'use client';

import AddEditProductForm from '@/components/admin/AddEditProduct';

const AddProduct = () => {
  const handleSubmit = async (product: {
    name: string;
    store: string;
    images: File[];
    discount: string;
    description: string;
    weight: string;
  }) => {
    console.log(product);
  };

  return (
    <div style={{ padding: '20px' }}>
      <div className="text-lg font-semibold">Add Product</div>
      <AddEditProductForm onSubmit={handleSubmit} mode="create" />
    </div>
  );
};

export default AddProduct;
