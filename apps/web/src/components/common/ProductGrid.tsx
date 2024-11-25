'use client';

import React from 'react';
import { Pagination } from '@nextui-org/react';
import { Product } from '@/types/types';
import { useRouter } from 'next/navigation';

interface PaginationProps {
  totalPage: number;
  currentPage: number;
}

interface ProductsGridProps {
  products: Product[];
  pagination: PaginationProps;
  onChangePage: (pageNumber: number) => void;
}

export default function ProductsGrid({ products, pagination, onChangePage }: Readonly<ProductsGridProps>) {
  let baseImagePath = `${process.env.NEXT_PUBLIC_IMAGE_API_URL}/`;
  const router = useRouter();

  return (
    <div className="flex flex-col ">
      <div className="my-2 text-lg font-semibold">Products</div>
      <div className="flex flex-wrap gap-4">
        {products.map((product) => (
          <div
            onClick={() => {
              router.push(`/user/products/detail?id=${product.id}`);
            }}
            key={product.id}
            className="flex flex-col items-center p-4 border rounded-lg shadow-md min-w-[200px] h-[220px] transition-transform transform hover:cursor-pointer hover:scale-105"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={`${baseImagePath}${product.imageUrls?.split(',')?.[0]}`}
              alt={product.productName}
              className="w-64 h-32 object-cover mb-2 rounded-md"
            />
            <div className="text-md font-semibold">{product.productName}</div>
            <div className="text-sm text-gray-700">Rp. {product.price?.toLocaleString('id-ID')}</div>
          </div>
        ))}
      </div>
      <Pagination
        showControls
        className="my-2 shadow-sm"
        total={pagination.totalPage}
        initialPage={pagination.currentPage}
        onChange={(page) => onChangePage(page)}
      />
    </div>
  );
}
