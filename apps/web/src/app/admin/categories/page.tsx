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
import { dummyCategories } from '@/data/dummyData';

const CategoriesPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<{ id: number; name: string } | null>(null);
  const [editedCategoryName, setEditedCategoryName] = useState('');

  const categoriesPerPage = 10;

  const indexOfLastCategory = currentPage * categoriesPerPage;
  const indexOfFirstCategory = indexOfLastCategory - categoriesPerPage;
  const currentCategories = dummyCategories.slice(indexOfFirstCategory, indexOfLastCategory);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  const handleEditClick = (category: { id: number; name: string }) => {
    console.log('edit modal');
    setSelectedCategory(category);
    setEditedCategoryName(category.name);
    setIsEditModalOpen(true);
  };

  const handleDeleteClick = (category: { id: number; name: string }) => {
    console.log('delete modal');
    setSelectedCategory(category);
    setIsDeleteModalOpen(true);
  };

  const handleSaveEdit = () => {
    // Save the edited category name logic here
    setIsEditModalOpen(false);
  };

  const handleConfirmDelete = () => {
    // Delete the category logic here
    setIsDeleteModalOpen(false);
  };

  return (
    <div className="p-4">
      <div className="my-2 text-lg font-semibold">Categories</div>
      <Table aria-label="Categories Table">
        <TableHeader>
          <TableColumn className="text-md text-gray-700">Name</TableColumn>
          <TableColumn className="text-md text-gray-700">Action</TableColumn>
        </TableHeader>
        <TableBody>
          {currentCategories.map((category) => (
            <TableRow key={category.id}>
              <TableCell>{category.name}</TableCell>
              <TableCell>
                <div>
                  <Button size="sm" className="p-1 min-w-[22px] bg-white" onClick={() => handleEditClick(category)}>
                    <div className="flex items-center gap-1 border rounded-md border-primary p-1">
                      <FaPencilAlt size={14} className="text-primary bg-white text-lg" />
                    </div>
                  </Button>
                  <Button size="sm" className="p-1 min-w-[22px] bg-white" onClick={() => handleDeleteClick(category)}>
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
        total={Math.ceil(dummyCategories.length / categoriesPerPage)}
        initialPage={1}
        onChange={(page) => paginate(page)}
      />

      <Modal size="xl" isOpen={isEditModalOpen} onClose={() => setIsEditModalOpen(false)} closeButton>
        <ModalHeader>Edit Category</ModalHeader>
        <ModalBody>
          <Input
            fullWidth
            label="Category Name"
            value={editedCategoryName}
            onChange={(e) => setEditedCategoryName(e.target.value)}
          />
        </ModalBody>
        <ModalFooter>
          <Button onClick={() => setIsEditModalOpen(false)}>Cancel</Button>
          <Button onClick={handleSaveEdit}>Save</Button>
        </ModalFooter>
      </Modal>

      <Modal size="xl" isOpen={isDeleteModalOpen} onClose={() => setIsDeleteModalOpen(false)} closeButton>
        <ModalHeader>Confirm Delete</ModalHeader>
        <ModalBody>Are you sure you want to delete {selectedCategory?.name}?</ModalBody>
        <ModalFooter>
          <Button onClick={() => setIsDeleteModalOpen(false)}>No</Button>
          <Button onClick={handleConfirmDelete}>Yes</Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default CategoriesPage;
