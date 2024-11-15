'use client';

import React, { useState } from 'react';
import {
  Table,
  Pagination,
  Button,
  TableHeader,
  TableBody,
  TableCell,
  TableColumn,
  TableRow,
  Input
} from '@nextui-org/react';
import { Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from '@nextui-org/modal';
import { FaPencilAlt, FaTrash } from 'react-icons/fa';
import { dummyProducts, dummyCategories } from '@/data/dummyData';

const ProductsPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<any | null>(null);
  const [editedProductName, setEditedProductName] = useState('');
  const [editedProductPrice, setEditedProductPrice] = useState(0);

  const productsPerPage = 10;

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = dummyProducts.slice(indexOfFirstProduct, indexOfLastProduct);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  const handleEditClick = (product: any) => {
    setSelectedProduct(product);
    setEditedProductName(product.productName);
    setEditedProductPrice(product.price);
    setIsEditModalOpen(true);
  };

  const handleDeleteClick = (product: any) => {
    setSelectedProduct(product);
    setIsDeleteModalOpen(true);
  };

  const handleSaveEdit = () => {
    // Save the edited product logic here
    setIsEditModalOpen(false);
  };

  const handleConfirmDelete = () => {
    // Delete the product logic here
    setIsDeleteModalOpen(false);
  };

  return (
    <div className="p-4">
      <div className="my-2 text-lg font-semibold">Products</div>
      <Table aria-label="Products Table">
        <TableHeader>
          <TableColumn className="text-md text-gray-700">Name</TableColumn>
          <TableColumn className="text-md text-gray-700">Price</TableColumn>
          <TableColumn className="text-md text-gray-700">Category</TableColumn>
          <TableColumn className="text-md text-gray-700">Description</TableColumn>
          <TableColumn className="text-md text-gray-700">Stock</TableColumn>
          <TableColumn className="text-md text-gray-700">Action</TableColumn>
        </TableHeader>
        <TableBody>
          {currentProducts.map((product) => (
            <TableRow key={product.id}>
              <TableCell>{product.productName}</TableCell>
              <TableCell>Rp. {product.price.toLocaleString('id-ID')}</TableCell>
              <TableCell className="max-w-[100px]">
                {String(dummyCategories.find((val) => val.id == product.category.id)?.name)}
              </TableCell>
              <TableCell className="max-w-[100px] truncate">
                <span className="truncate">{product.desc}</span>
              </TableCell>
              <TableCell>{product.stock}</TableCell>
              <TableCell>
                <div>
                  <Button size="sm" className="p-1 min-w-[22px] bg-white" onClick={() => handleEditClick(product)}>
                    <div className="flex items-center gap-1 border rounded-md border-primary p-1">
                      <FaPencilAlt size={14} className="text-primary bg-white text-lg" />
                    </div>
                  </Button>
                  <Button size="sm" className="p-1 min-w-[22px] bg-white" onClick={() => handleDeleteClick(product)}>
                    <div className="flex items-center gap-1 border rounded-md border-danger p-1">
                      <FaTrash size={14} className="text-danger bg-white text-lg" />
                    </div>
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Pagination
        showControls
        className="my-2 shadow-sm"
        total={Math.ceil(dummyProducts.length / productsPerPage)}
        initialPage={1}
        onChange={(page) => paginate(page)}
      />

      <Modal size="xl" isOpen={isEditModalOpen} onClose={() => setIsEditModalOpen(false)} closeButton>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader>Edit Product</ModalHeader>
              <ModalBody>
                <Input
                  fullWidth
                  label="Product Name"
                  value={editedProductName}
                  onChange={(e) => setEditedProductName(e.target.value)}
                />
                <Input
                  fullWidth
                  label="Product Price"
                  type="number"
                  value={String(editedProductPrice)}
                  onChange={(e) => setEditedProductPrice(Number(e.target.value))}
                />
              </ModalBody>
              <ModalFooter>
                <Button onClick={() => setIsEditModalOpen(false)}>Cancel</Button>
                <Button onClick={handleSaveEdit}>Save</Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>

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
