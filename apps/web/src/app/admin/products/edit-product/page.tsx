'use client';

import { getProductById } from '@/lib/product.api';
import AddEditProductForm from '@/components/admin/AddEditProduct';
import { Product, dummyProducts } from '@/types/types';
import { toastFailed } from '@/utils/toastHelper';
import { Spinner } from '@nextui-org/react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useState, useEffect } from 'react';

const EditProduct = () => {
  const searchParams = useSearchParams();
  const id = searchParams.get('id');
  const [product, setProduct] = useState<Product | null>(null);
  const router = useRouter();

  useEffect(() => {
    const getDetails = async () => {
      if (id) {
        try {
          const response = await getProductById(Number(id));
          console.log(response);
          setProduct(response);
        } catch (err) {
          toastFailed('Failed to fetch product');
          router.back();
        }
      }
    };

    getDetails();
  }, [id, router]);

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
      <AddEditProductForm data={product} mode="edit" />
    </div>
  );
};

export default EditProduct;
