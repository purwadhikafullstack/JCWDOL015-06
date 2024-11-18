'use client';

import React, { useState, useEffect } from 'react';
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Input,
  Button,
  Select,
  SelectItem
} from '@nextui-org/react';
import { Store, StoreAdmin } from '@/types/types';
import { fetchStores } from '@/api/store.api';
import { IoMdEye, IoMdEyeOff } from 'react-icons/io';

interface AddEditStoreAdminProps {
  isOpen: boolean;
  addEditMode: 'add' | 'edit';
  storeAdmin?: StoreAdmin;
  handleSave: (storeAdmin: StoreAdmin) => void;
  onClose: () => void;
}

const AddEditStoreAdmin: React.FC<AddEditStoreAdminProps> = ({
  isOpen,
  storeAdmin,
  addEditMode,
  handleSave,
  onClose
}) => {
  const [storeAdminForm, setStoreAdminForm] = useState<StoreAdmin>(storeAdmin || {});
  const [stores, setStores] = useState<Store[]>([]);
  const [errors, setErrors] = useState<{
    username?: string;
    email?: string;
    password?: string;
    firstName?: string;
    lastName?: string;
    storeId?: string;
    mobileNum?: string;
  }>({});
  const [selectedStore, setSelectedStore] = useState(
    storeAdmin?.store?.id ? new Set([String(storeAdmin?.store?.id)]) : []
  );
  const [showPassword, setShowPassword] = useState<boolean>(false);

  useEffect(() => {
    setErrors({});
    setStoreAdminForm(storeAdmin || {});
    setSelectedStore(storeAdmin?.store?.id ? new Set([String(storeAdmin?.store?.id)]) : []);
  }, [storeAdmin]);

  useEffect(() => {
    setErrors({});
    const getStores = async () => {
      const response = await fetchStores();
      const stores = response.stores.map((store: any) => {
        return {
          ...store,
          id: String(store.id)
        };
      });
      setStores(stores);
    };

    getStores();
  }, []);

  const validateForm = () => {
    const newErrors = {} as {
      username?: string;
      email?: string;
      password?: string;
      firstName?: string;
      lastName?: string;
      storeId?: string;
      mobileNum?: string;
    };
    if (!storeAdminForm.username) newErrors.username = 'This field is required';
    if (!storeAdminForm.email) newErrors.email = 'This field is required';
    if (!storeAdminForm.password) newErrors.password = 'This field is required';
    if (!storeAdminForm.firstName) newErrors.firstName = 'This field is required';
    if (!storeAdminForm.lastName) newErrors.lastName = 'This field is required';
    if (!storeAdminForm.storeId) newErrors.storeId = 'This field is required';
    if (!storeAdminForm.mobileNum) newErrors.mobileNum = 'This field is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  return (
    <Modal size="xl" isOpen={isOpen} onClose={onClose} closeButton>
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader>{addEditMode === 'edit' ? 'Edit' : 'Add'} Store Admin</ModalHeader>
            <ModalBody>
              <Input
                fullWidth
                label="Store admin username"
                value={storeAdminForm.username || ''}
                onChange={(e) => {
                  const newStoreAdminForm = { ...storeAdminForm };
                  newStoreAdminForm.username = e.target.value;
                  setStoreAdminForm(newStoreAdminForm);
                }}
                errorMessage={errors.username}
                isInvalid={errors.username ? true : false}
              />
              <Input
                fullWidth
                label="Email"
                value={storeAdminForm.email || ''}
                onChange={(e) => {
                  const newStoreAdminForm = { ...storeAdminForm };
                  newStoreAdminForm.email = e.target.value;
                  setStoreAdminForm(newStoreAdminForm);
                }}
                errorMessage={errors.email}
                isInvalid={errors.email ? true : false}
              />
              <Input
                fullWidth
                label="Password"
                type={showPassword ? 'text' : 'password'}
                value={storeAdminForm.password || ''}
                onChange={(e) => {
                  const newStoreAdminForm = { ...storeAdminForm };
                  newStoreAdminForm.password = e.target.value;
                  setStoreAdminForm(newStoreAdminForm);
                }}
                endContent={
                  <Button className="bg-transparent" onClick={() => setShowPassword(!showPassword)}>
                    {showPassword ? <IoMdEye size={16} /> : <IoMdEyeOff size={16} />}
                  </Button>
                }
                errorMessage={errors.password}
                isInvalid={errors.password ? true : false}
              />
              <Input
                fullWidth
                label="First Name"
                value={storeAdminForm.firstName || ''}
                onChange={(e) => {
                  const newStoreAdminForm = { ...storeAdminForm };
                  newStoreAdminForm.firstName = e.target.value;
                  setStoreAdminForm(newStoreAdminForm);
                }}
                errorMessage={errors.firstName}
                isInvalid={errors.firstName ? true : false}
              />
              <Input
                fullWidth
                label="Last Name"
                value={storeAdminForm.lastName || ''}
                onChange={(e) => {
                  const newStoreAdminForm = { ...storeAdminForm };
                  newStoreAdminForm.lastName = e.target.value;
                  setStoreAdminForm(newStoreAdminForm);
                }}
                errorMessage={errors.lastName}
                isInvalid={errors.lastName ? true : false}
              />
              <Select
                fullWidth
                label="Store"
                selectedKeys={selectedStore}
                onSelectionChange={(e) => {
                  const newStoreAdminForm = { ...storeAdminForm };
                  newStoreAdminForm.storeId = Number(e.currentKey);
                  setStoreAdminForm(newStoreAdminForm);
                  setSelectedStore(new Set([String(e.currentKey)]));
                }}
                errorMessage={errors.storeId}
                isInvalid={errors.storeId ? true : false}
              >
                {stores.map((store) => (
                  <SelectItem key={store.id} textValue={store.name} value={store.id}>
                    {store.name}
                  </SelectItem>
                ))}
              </Select>
              <Input
                fullWidth
                label="Mobile Number"
                value={storeAdminForm.mobileNum || ''}
                onChange={(e) => {
                  const newStoreAdminForm = { ...storeAdminForm };
                  newStoreAdminForm.mobileNum = e.target.value;
                  setStoreAdminForm(newStoreAdminForm);
                }}
                errorMessage={errors.mobileNum}
                isInvalid={errors.mobileNum ? true : false}
              />
            </ModalBody>
            <ModalFooter>
              <Button onClick={onClose}>Cancel</Button>
              <Button
                onClick={() => {
                  if (validateForm()) {
                    handleSave({
                      ...storeAdminForm
                    });
                  }
                }}
                color="primary"
              >
                Save
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default AddEditStoreAdmin;
