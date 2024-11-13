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
import { Modal, ModalBody, ModalFooter, ModalHeader } from '@nextui-org/modal';
import { FaPencilAlt, FaTrash } from 'react-icons/fa';

enum AppliedDiscountType {
  ON_PRODUCT = 'ON_PRODUCT',
  MINIMUM_PURCHASE = 'MINIMUM_PURCHASE',
  BUY_ONE_GET_ONE = 'BUY_ONE_GET_ONE'
}

enum DiscountType {
  PERCENTAGE = 'PERCENTAGE',
  AMOUNT = 'AMOUNT'
}

const dummyDiscounts = [
  {
    id: 1,
    name: 'Summer Sale',
    discountType: DiscountType.PERCENTAGE,
    discountAmount: null,
    discountPercentage: 20,
    appliedDiscountType: AppliedDiscountType.ON_PRODUCT
  },
  {
    id: 2,
    name: 'Winter Sale',
    discountType: DiscountType.AMOUNT,
    discountAmount: 50,
    discountPercentage: null,
    appliedDiscountType: AppliedDiscountType.MINIMUM_PURCHASE
  },
  {
    id: 3,
    name: 'Black Friday',
    discountType: DiscountType.PERCENTAGE,
    discountAmount: null,
    discountPercentage: 30,
    appliedDiscountType: AppliedDiscountType.BUY_ONE_GET_ONE
  },
  {
    id: 4,
    name: 'Cyber Monday',
    discountType: DiscountType.AMOUNT,
    discountAmount: 100,
    discountPercentage: null,
    appliedDiscountType: AppliedDiscountType.ON_PRODUCT
  },
  {
    id: 5,
    name: 'New Year Sale',
    discountType: DiscountType.PERCENTAGE,
    discountAmount: null,
    discountPercentage: 25,
    appliedDiscountType: AppliedDiscountType.MINIMUM_PURCHASE
  },
  {
    id: 6,
    name: "Valentine's Day",
    discountType: DiscountType.AMOUNT,
    discountAmount: 75,
    discountPercentage: null,
    appliedDiscountType: AppliedDiscountType.BUY_ONE_GET_ONE
  },
  {
    id: 7,
    name: 'Easter Sale',
    discountType: DiscountType.PERCENTAGE,
    discountAmount: null,
    discountPercentage: 15,
    appliedDiscountType: AppliedDiscountType.ON_PRODUCT
  },
  {
    id: 8,
    name: 'Halloween Sale',
    discountType: DiscountType.AMOUNT,
    discountAmount: 60,
    discountPercentage: null,
    appliedDiscountType: AppliedDiscountType.MINIMUM_PURCHASE
  },
  {
    id: 9,
    name: 'Thanksgiving Sale',
    discountType: DiscountType.PERCENTAGE,
    discountAmount: null,
    discountPercentage: 10,
    appliedDiscountType: AppliedDiscountType.BUY_ONE_GET_ONE
  },
  {
    id: 10,
    name: 'Christmas Sale',
    discountType: DiscountType.AMOUNT,
    discountAmount: 150,
    discountPercentage: null,
    appliedDiscountType: AppliedDiscountType.ON_PRODUCT
  }
];

const DiscountsPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedDiscount, setSelectedDiscount] = useState<any | null>(null);
  const [editedDiscountName, setEditedDiscountName] = useState('');

  const discountsPerPage = 10;

  const indexOfLastDiscount = currentPage * discountsPerPage;
  const indexOfFirstDiscount = indexOfLastDiscount - discountsPerPage;
  const currentDiscounts = dummyDiscounts.slice(indexOfFirstDiscount, indexOfLastDiscount);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  const handleEditClick = (discount: any) => {
    setSelectedDiscount(discount);
    setEditedDiscountName(discount.name);
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
              <TableCell>{discount.discountType}</TableCell>
              <TableCell>{discount.discountAmount ?? '-'}</TableCell>
              <TableCell>{discount.discountPercentage ?? '-'}</TableCell>
              <TableCell>{discount.appliedDiscountType}</TableCell>
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

      <Modal size="xl" isOpen={isEditModalOpen} onClose={() => setIsEditModalOpen(false)} closeButton>
        <ModalHeader>Edit Discount</ModalHeader>
        <ModalBody>
          <Input
            fullWidth
            label="Discount Name"
            value={editedDiscountName}
            onChange={(e) => setEditedDiscountName(e.target.value)}
          />
        </ModalBody>
        <ModalFooter>
          <Button onClick={() => setIsEditModalOpen(false)}>Cancel</Button>
          <Button onClick={handleSaveEdit}>Save</Button>
        </ModalFooter>
      </Modal>

      <Modal size="xl" isOpen={isDeleteModalOpen} onClose={() => setIsDeleteModalOpen(false)} closeButton>
        <ModalHeader>Confirm Delete</ModalHeader>
        <ModalBody>Are you sure you want to delete {selectedDiscount?.name}?</ModalBody>
        <ModalFooter>
          <Button onClick={() => setIsDeleteModalOpen(false)}>No</Button>
          <Button onClick={handleConfirmDelete}>Yes</Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default DiscountsPage;
