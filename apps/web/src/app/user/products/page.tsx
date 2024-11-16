'use client';

import React, { useState } from 'react';
import { dummyProducts, Product } from '@/types/types';
// import ProductsTable from '@/components/common/ProductTable';
import ProductGrid from '@/components/common/ProductGrid';

const ProductsPage = () => {
  const [currentPage, setCurrentPage] = useState(1);

  const productsPerPage = 20;

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <div className="p-4 mx-auto w-full items-center">
      <ProductGrid
        products={dummyProducts as Product[]}
        pagination={{ totalPage: Math.ceil(dummyProducts.length / productsPerPage), currentPage }}
        onChangePage={paginate}
      />
    </div>
  );
};

export default ProductsPage;
