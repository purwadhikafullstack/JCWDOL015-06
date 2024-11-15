'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@nextui-org/react';
import { Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from '@nextui-org/modal';
import { dummyProducts, Product } from '@/data/dummyData';
import ProductsTable from '@/components/common/ProductTable';

const ProductsPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [products, setProducts] = useState<Product[]>(dummyProducts);
  const router = useRouter();

  const productsPerPage = 10;

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  const handleEditClick = (product: Product) => {
    router.push(`/admin/products/edit-product?id=${product.id}`);
  };

  const handleDeleteClick = (product: Product) => {
    setSelectedProduct(product);
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = () => {
    const index = products.findIndex((product) => product.id === selectedProduct?.id);
    const updatedProducts = [...products];
    updatedProducts.splice(index, 1);
    setProducts(updatedProducts);
    setIsDeleteModalOpen(false);
  };

  return (
    <div className="p-4">
      <ProductsTable
        isAdmin={true}
        handleEditClick={handleEditClick}
        handleDeleteClick={handleDeleteClick}
        products={products}
        pagination={{ totalPage: Math.ceil(products.length / productsPerPage), currentPage }}
        onChangePage={paginate}
      />

      <Modal size="xl" isOpen={isDeleteModalOpen} onClose={() => setIsDeleteModalOpen(false)} closeButton>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader>Confirm Delete</ModalHeader>
              <ModalBody>Are you sure you want to delete {selectedProduct?.productName}?</ModalBody>
              <ModalFooter>
                <Button onClick={() => setIsDeleteModalOpen(false)}>No</Button>
                <Button onClick={handleConfirmDelete}>Yes</Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
};

export default ProductsPage;
