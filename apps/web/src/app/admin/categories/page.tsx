'use client';

import React, { useCallback, useEffect, useState } from 'react';
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
import { FaPencilAlt, FaSearch, FaTrash } from 'react-icons/fa';
import { Category, Role } from '@/types/types';
import { fetchCategories, getCategoryById, createCategory, updateCategory, deleteCategory } from '@/api/category.api';
import { toastFailed, toastSuccess } from '@/utils/toastHelper';
import DeleteConfirmationModal from '@/components/common/DeleteConfirmationModal';
import AddEditCategory from '@/components/admin/AddEditCategory';

const CategoriesPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [categories, setCategories] = useState<Category[]>([]);
  const [addEditMode, setAddEditMode] = useState<'add' | 'edit'>('add');
  const [isAddEditModalOpen, setIsAddEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const [totalCategories, setTotalCategories] = useState<number>();
  const [nameFilter, setNameFilter] = useState<string | undefined>();

  const pageSize = 10;

  const loadCategories = useCallback(async () => {
    try {
      const queryParams = { page: currentPage, pageSize } as { [key: string]: any };
      if (nameFilter) {
        queryParams.name = nameFilter;
      }
      const response = await fetchCategories(queryParams);
      setCategories(response.categories);
      setTotalCategories(response.total);
    } catch (err) {
      toastFailed('Failed to fetch categories');
      setCategories([]);
      setTotalCategories(0);
    }
  }, [currentPage, nameFilter]);

  const onResetFilter = () => {
    setNameFilter('');
  };

  useEffect(() => {
    setCurrentPage(1);
  }, [nameFilter]);

  useEffect(() => {
    loadCategories();
  }, [loadCategories]);

  const handleAddClick = () => {
    setAddEditMode('add');
    setSelectedCategory(null);
    setIsAddEditModalOpen(true);
  };

  const handleEditClick = async (category: Category) => {
    try {
      const response = await getCategoryById(category.id);
      setSelectedCategory(response);
      setAddEditMode('edit');
      setIsAddEditModalOpen(true);
    } catch (err) {
      toastFailed('Failed to fetch category');
    }
  };

  const handleDeleteClick = (category: Category) => {
    setSelectedCategory(category);
    setIsDeleteModalOpen(true);
  };

  const handleSave = async (categoryName: string) => {
    if (selectedCategory?.id) {
      try {
        await updateCategory(selectedCategory?.id, { name: categoryName });
        toastSuccess('Updated category successfully');
        setIsAddEditModalOpen(false);
        loadCategories();
      } catch (err) {
        toastFailed('Failed to update category');
      }
    } else {
      try {
        await createCategory({ name: categoryName });
        toastSuccess('Created category successfully');
        setIsAddEditModalOpen(false);
        loadCategories();
      } catch (err) {
        toastFailed('Failed to create category');
      }
    }
  };

  const handleConfirmDelete = async () => {
    if (selectedCategory?.id) {
      try {
        await deleteCategory(selectedCategory?.id);
        toastSuccess('Deleted category successfully');
        setIsDeleteModalOpen(false);
        setCurrentPage(1);
        loadCategories();
      } catch (err) {
        toastFailed('Failed to delete category');
      }
    }
  };

  const onSortChange = (e: any) => {
    console.log(e);
  };

  const userRole = localStorage.getItem('userRole') as Role;

  return (
    <div className="p-4">
      <div className="my-2 text-lg font-semibold">Categories</div>
      <div className="my-2 gap-2 p-4 border border-gray-200 shadow-md bg-white rounded-md flex items-center">
        <Button
          isDisabled={userRole !== 'SUPER_ADMIN'}
          size="md"
          color="primary"
          className="p-2 mr-4"
          onClick={handleAddClick}
        >
          Add New
        </Button>
        <Input size="sm" label="Search by Name" value={nameFilter} onChange={(e) => setNameFilter(e.target.value)} />
        <Button className="bg-gray-100" onClick={onResetFilter}>
          Reset
        </Button>
      </div>

      <Table
        onSortChange={(e) => {
          onSortChange(e);
        }}
        aria-label="Categories Table"
      >
        <TableHeader>
          <TableColumn allowsSorting className="text-md text-gray-700">
            Name
          </TableColumn>
          <TableColumn className="text-md text-gray-700">Action</TableColumn>
        </TableHeader>
        <TableBody emptyContent={'No category found'}>
          {categories.map((category) => (
            <TableRow key={category.id}>
              <TableCell>{category.name}</TableCell>
              <TableCell>
                <div>
                  <Button
                    isDisabled={userRole !== 'SUPER_ADMIN'}
                    size="sm"
                    className="p-1 min-w-[22px] bg-white"
                    onClick={() => handleEditClick(category)}
                  >
                    <div className="flex items-center gap-1 border rounded-md border-primary p-1">
                      <FaPencilAlt size={14} className="text-primary bg-white text-lg" />
                    </div>
                  </Button>
                  <Button
                    isDisabled={userRole !== 'SUPER_ADMIN'}
                    size="sm"
                    className="p-1 min-w-[22px] bg-white"
                    onClick={() => handleDeleteClick(category)}
                  >
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
        className="flex flex-col gap-5 my-2"
        showControls
        total={Math.ceil(totalCategories ? totalCategories / pageSize : 1)}
        color="primary"
        page={currentPage}
        onChange={setCurrentPage}
      />

      <AddEditCategory
        isOpen={isAddEditModalOpen}
        onClose={() => setIsAddEditModalOpen(false)}
        addEditMode={addEditMode}
        name={selectedCategory?.name}
        handleSave={handleSave}
      />

      <DeleteConfirmationModal
        selected={selectedCategory}
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        handleConfirmDelete={handleConfirmDelete}
      />
    </div>
  );
};

export default CategoriesPage;
