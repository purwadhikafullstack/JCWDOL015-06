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
import { User, dummyStoreAdmins } from '@/data/dummyData';

const StoreAdminsPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedAdmin, setSelectedAdmin] = useState<User | null>(null);
  const [editedAdminName, setEditedAdminName] = useState<string | undefined>('');
  const [admins, setAdmins] = useState<User[]>(dummyStoreAdmins);

  const adminsPerPage = 10;

  const indexOfLastAdmin = currentPage * adminsPerPage;
  const indexOfFirstAdmin = indexOfLastAdmin - adminsPerPage;
  const currentAdmins = admins.slice(indexOfFirstAdmin, indexOfLastAdmin);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  const handleEditClick = (admin: User) => {
    setSelectedAdmin(admin);
    setEditedAdminName(`${admin.firstName} ${admin.lastName}`);
    setIsEditModalOpen(true);
  };

  const handleDeleteClick = (admin: User) => {
    setSelectedAdmin(admin);
    setIsDeleteModalOpen(true);
  };

  const handleSaveEdit = () => {
    const index = admins.findIndex((admin) => admin.id === selectedAdmin?.id);
    const updatedAdmins = [...admins];
    const [firstName, lastName] = editedAdminName?.split(' ') || ['', ''];
    updatedAdmins[index].firstName = firstName;
    updatedAdmins[index].lastName = lastName;
    setAdmins(updatedAdmins);
    setIsEditModalOpen(false);
  };

  const handleConfirmDelete = () => {
    const index = admins.findIndex((admin) => admin.id === selectedAdmin?.id);
    const updatedAdmins = [...admins];
    updatedAdmins.splice(index, 1);
    setAdmins(updatedAdmins);
    setIsDeleteModalOpen(false);
  };

  return (
    <div className="p-4">
      <div className="my-2 text-lg font-semibold">Store Admins</div>
      <Table aria-label="Store Admins Table">
        <TableHeader>
          <TableColumn className="text-md text-gray-700">Name</TableColumn>
          <TableColumn className="text-md text-gray-700">Email</TableColumn>
          <TableColumn className="text-md text-gray-700">Store</TableColumn>
          <TableColumn className="text-md text-gray-700">Action</TableColumn>
        </TableHeader>
        <TableBody>
          {currentAdmins.map((admin) => (
            <TableRow key={admin.id}>
              <TableCell>{`${admin.firstName} ${admin.lastName}`}</TableCell>
              <TableCell>{admin.email}</TableCell>
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
        showControls
        className="my-2 shadow-sm"
        total={Math.ceil(dummyStoreAdmins.length / adminsPerPage)}
        initialPage={1}
        onChange={(page) => paginate(page)}
      />

      <Modal size="xl" isOpen={isEditModalOpen} onClose={() => setIsEditModalOpen(false)} closeButton>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader>Edit Admin</ModalHeader>
              <ModalBody>
                <Input
                  fullWidth
                  label="Admin Name"
                  value={editedAdminName}
                  onChange={(e) => setEditedAdminName(e.target.value)}
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
              <ModalBody>
                Are you sure you want to delete {selectedAdmin?.firstName} {selectedAdmin?.lastName}?
              </ModalBody>
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

export default StoreAdminsPage;
