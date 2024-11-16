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
import { StoreAdmin } from '@/types/types';
import {
  fetchStoreAdmins,
  getStoreAdminById,
  createStoreAdmin,
  updateStoreAdmin,
  deleteStoreAdmin
} from '@/api/storeAdmin.api';
import { toastFailed, toastSuccess } from '@/utils/toastHelper';
import DeleteConfirmationModal from '@/components/common/DeleteConfirmationModal';
import AddEditStoreAdmin from '@/components/admin/AddEditStoreAdmin';

const StoreAdminsPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [storeAdmin, setStoreAdmins] = useState<StoreAdmin[]>([]);
  const [addEditMode, setAddEditMode] = useState<'add' | 'edit'>('add');
  const [isAddEditModalOpen, setIsAddEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedStoreAdmin, setSelectedStoreAdmin] = useState<StoreAdmin>();
  const [totalStoreAdmins, setTotalStoreAdmins] = useState<number>();
  const [nameFilter, setNameFilter] = useState<string | undefined>();

  const pageSize = 10;

  const loadStoreAdmins = useCallback(async () => {
    try {
      const queryParams = { page: currentPage, pageSize } as { [key: string]: any };
      if (nameFilter) {
        queryParams.name = nameFilter;
      }
      const response = await fetchStoreAdmins(queryParams);
      setStoreAdmins(response.storeAdmins);
      setTotalStoreAdmins(response.total);
    } catch (err) {
      toastFailed('Failed to fetch store admin');
      setStoreAdmins([]);
      setTotalStoreAdmins(0);
    }
  }, [currentPage, nameFilter]);

  useEffect(() => {
    setCurrentPage(1);
  }, [nameFilter]);

  useEffect(() => {
    loadStoreAdmins();
  }, [loadStoreAdmins]);

  const handleAddClick = () => {
    setAddEditMode('add');
    setSelectedStoreAdmin(undefined);
    setIsAddEditModalOpen(true);
  };

  const handleEditClick = async (storeAdmin: StoreAdmin) => {
    if (storeAdmin.id) {
      try {
        const response = await getStoreAdminById(storeAdmin.id);
        setSelectedStoreAdmin(response);
        setAddEditMode('edit');
        setIsAddEditModalOpen(true);
      } catch (err) {
        toastFailed('Failed to fetch store admin');
      }
    }
  };

  const handleDeleteClick = (storeAdmin: StoreAdmin) => {
    setSelectedStoreAdmin(storeAdmin);
    setIsDeleteModalOpen(true);
  };

  const handleSave = async (storeAdmin: StoreAdmin) => {
    if (selectedStoreAdmin?.id) {
      const updateStoreAdminData = {
        ...storeAdmin
      } as { firstName: string; lastName: string; storeId?: number };

      try {
        await updateStoreAdmin(selectedStoreAdmin?.id, updateStoreAdminData);
        toastSuccess('Updated store admin successfully');
        setIsAddEditModalOpen(false);
        loadStoreAdmins();
      } catch (err) {
        toastFailed('Failed to update store admin');
      }
    } else {
      const createStoreAdminData = {
        ...storeAdmin
      } as {
        username: string;
        email: string;
        password: string;
        firstName: string;
        lastName: string;
        storeId: number;
        mobileNum: string;
      };
      try {
        await createStoreAdmin(createStoreAdminData);
        toastSuccess('Created store admin successfully');
        setIsAddEditModalOpen(false);
        loadStoreAdmins();
      } catch (err) {
        toastFailed('Failed to create store admin');
      }
    }
  };

  const handleConfirmDelete = async () => {
    if (selectedStoreAdmin?.id) {
      try {
        await deleteStoreAdmin(selectedStoreAdmin?.id);
        toastSuccess('Deleted store admin successfully');
        setIsDeleteModalOpen(false);
        loadStoreAdmins();
      } catch (err) {
        toastFailed('Failed to delete store admin');
      }
    }
  };

  const onSortChange = (e: any) => {
    console.log(e);
  };

  return (
    <div className="p-4">
      <div className="my-2 text-lg font-semibold">Store Admins</div>
      <div className="my-2 gap-2 p-4 border border-gray-200 shadow-md bg-white rounded-md flex items-center">
        <Button size="md" color="primary" className="p-2 mr-4" onClick={handleAddClick}>
          Add New
        </Button>
        <Input
          size="sm"
          label="Search by username, first name, or last name"
          value={nameFilter}
          onChange={(e) => setNameFilter(e.target.value)}
        />
        <FaSearch className="ml-2 text-gray-500" />
      </div>

      <Table
        onSortChange={(e) => {
          onSortChange(e);
        }}
        aria-label="Store Admins Table"
      >
        <TableHeader>
          <TableColumn allowsSorting className="text-md text-gray-700">
            Name
          </TableColumn>
          <TableColumn allowsSorting className="text-md text-gray-700">
            Email
          </TableColumn>
          <TableColumn allowsSorting className="text-md text-gray-700">
            Username
          </TableColumn>
          <TableColumn allowsSorting className="text-md text-gray-700">
            Store
          </TableColumn>
          <TableColumn allowsSorting className="text-md text-gray-700">
            Action
          </TableColumn>
        </TableHeader>
        <TableBody>
          {storeAdmin?.map((admin) => (
            <TableRow key={admin.id}>
              <TableCell>{`${admin.firstName} ${admin.lastName}`}</TableCell>
              <TableCell>{admin.email}</TableCell>
              <TableCell>{admin.username}</TableCell>
              <TableCell>{admin.store?.name}</TableCell>
              <TableCell>
                <div>
                  <Button size="sm" className="p-1 min-w-[22px] bg-white" onClick={() => handleEditClick(admin)}>
                    <div className="flex items-center gap-1 border rounded-md border-primary p-1">
                      <FaPencilAlt size={14} className="text-primary bg-white text-lg" />
                    </div>
                  </Button>
                  <Button size="sm" className="p-1 min-w-[22px] bg-white" onClick={() => handleDeleteClick(admin)}>
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
        total={Math.ceil(totalStoreAdmins ? totalStoreAdmins / pageSize : 1)}
        color="primary"
        page={currentPage}
        onChange={setCurrentPage}
      />

      <AddEditStoreAdmin
        isOpen={isAddEditModalOpen}
        onClose={() => setIsAddEditModalOpen(false)}
        addEditMode={addEditMode}
        storeAdmin={selectedStoreAdmin}
        handleSave={handleSave}
      />

      <DeleteConfirmationModal
        selected={selectedStoreAdmin}
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        handleConfirmDelete={handleConfirmDelete}
      />
    </div>
  );
};

export default StoreAdminsPage;
