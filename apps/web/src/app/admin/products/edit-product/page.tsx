'use client';

import AddEditProductForm from '@/components/admin/AddEditProduct';
import { Product, dummyProducts } from '@/types/types';
import { Spinner } from '@nextui-org/react';
import { useSearchParams } from 'next/navigation';
import { useState, useEffect } from 'react';

const EditProduct = () => {
  const handleSubmit = async (product: Product) => {
    console.log(product);
  };
  const searchParams = useSearchParams();
  const id = searchParams.get('id');
  const [product, setProduct] = useState<Product | null>(null);

  useEffect(() => {
    if (id) {
      const foundProduct = dummyProducts.find((prod) => prod.id === Number(id));
      if (foundProduct) {
        setProduct(foundProduct);
      }
    }
  }, [id]);

  if (!product) {
    return (
      <div className="min-w-[100vw] min-h-[100vh] flex gap-4 justify-center items-center">
        <Spinner size="lg" />
        <div className="text-xl font-bold self-center">Redirecting...</div>
      </div>
    );
  }

  return (
    <div style={{ padding: '20px' }}>
      <div className="text-lg font-semibold">Edit Product</div>
      <AddEditProductForm onSubmit={handleSubmit} data={product} mode="edit" />
    </div>
  );
};

export default EditProduct;
