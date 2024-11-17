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
import { Discount, dummyDiscounts } from '@/data/dummyData';
import AddEditDiscount from '@/components/Admin/AddEditDiscount';

export default function DiscountsPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedDiscount, setSelectedDiscount] = useState<any | null>(null);
  const [editedDiscount, setEditedDiscount] = useState<Discount>();

  const discountsPerPage = 10;

  const indexOfLastDiscount = currentPage * discountsPerPage;
  const indexOfFirstDiscount = indexOfLastDiscount - discountsPerPage;
  const currentDiscounts = dummyDiscounts.slice(indexOfFirstDiscount, indexOfLastDiscount);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  const handleEditClick = (discount: any) => {
    setSelectedDiscount(discount);
    setEditedDiscount(discount);
    setIsEditModalOpen(true);
  };

  const handleDeleteClick = (discount: any) => {
    setSelectedDiscount(discount);
    setIsDeleteModalOpen(true);
  };

  const handleSaveEdit = () => {
    // Save the edited discount name logic here
    setIsEditModalOpen(false);
  };

  const handleConfirmDelete = () => {
    // Delete the discount logic here
    setIsDeleteModalOpen(false);
  };

  return (
    <div className="p-4">
      <div className="my-2 text-lg font-semibold">Discounts</div>
      <Table aria-label="Discounts Table">
        <TableHeader>
          <TableColumn className="text-md text-gray-700">Name</TableColumn>
          <TableColumn className="text-md text-gray-700">Type</TableColumn>
          <TableColumn className="text-md text-gray-700">Amount</TableColumn>
          <TableColumn className="text-md text-gray-700">Percentage</TableColumn>
          <TableColumn className="text-md text-gray-700">Applied Type</TableColumn>
          <TableColumn className="text-md text-gray-700">Action</TableColumn>
        </TableHeader>
        <TableBody>
          {currentDiscounts.map((discount) => (
            <TableRow key={discount.id}>
              <TableCell>{discount.name}</TableCell>
              <TableCell>
                <span
                  className={`text-white p-2 rounded-md font-semibold text-xs ${discount.discountType == 'PERCENTAGE' ? 'bg-blue-500' : 'bg-yellow-500'}`}
                >
                  {discount.discountType.charAt(0) + discount.discountType.slice(1).toLowerCase()}
                </span>
              </TableCell>
              <TableCell>
                {discount.discountAmount ? `Rp. ${discount.discountAmount.toLocaleString('id-ID')}` : '-'}
              </TableCell>
              <TableCell>{discount.discountPercentage ? `${discount.discountPercentage} %` : '-'}</TableCell>
              <TableCell>
                <span className={`text-gray-700 p-2 rounded-md font-semibold text-xs bg-gray-200`}>
                  {discount.appliedDiscountType.replace(/_/g, ' ').charAt(0) +
                    discount.appliedDiscountType.replace(/_/g, ' ').slice(1).toLowerCase()}
                </span>
              </TableCell>
              <TableCell>
                <div>
                  <Button size="sm" className="p-1 min-w-[22px] bg-white" onClick={() => handleEditClick(discount)}>
                    <div className="flex items-center gap-1 border rounded-md border-primary p-1">
                      <FaPencilAlt size={14} className="text-primary bg-white text-lg" />
                    </div>
                  </Button>
                  <Button size="sm" className="p-1 min-w-[22px] bg-white" onClick={() => handleDeleteClick(discount)}>
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
        total={Math.ceil(dummyDiscounts.length / discountsPerPage)}
        initialPage={1}
        onChange={(page) => paginate(page)}
      />

      <AddEditDiscount
        mode="edit"
        editedData={editedDiscount}
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        onSaveEdit={handleSaveEdit}
      />

      <Modal size="xl" isOpen={isDeleteModalOpen} onClose={() => setIsDeleteModalOpen(false)} closeButton>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader>Confirm Delete</ModalHeader>
              <ModalBody>Are you sure you want to delete {selectedDiscount?.name}?</ModalBody>
              <ModalFooter>
                <Button onClick={() => setIsDeleteModalOpen(false)}>No</Button>
                <Button onClick={handleConfirmDelete}>Yes</Button>
              </ModalFooter>{' '}
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
}
