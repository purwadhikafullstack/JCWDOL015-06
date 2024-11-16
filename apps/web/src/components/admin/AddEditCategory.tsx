'use client';

import React, { useState } from 'react';
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Input, Button } from '@nextui-org/react';

interface AddEditCategoryProps {
  isOpen: boolean;
  addEditMode: 'add' | 'edit';
  name?: string;
  handleSave: (categoryName: string) => void;
  onClose: () => void;
}

const AddEditCategory: React.FC<AddEditCategoryProps> = ({ isOpen, name, addEditMode, handleSave, onClose }) => {
  const [categoryName, setCategoryName] = useState<string>(name ?? '');

  return (
    <Modal size="xl" isOpen={isOpen} onClose={onClose} closeButton>
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader>{addEditMode === 'edit' ? 'Edit' : 'Add'} Category</ModalHeader>
            <ModalBody>
              <Input
                fullWidth
                label="Category Name"
                value={categoryName}
                onChange={(e) => setCategoryName(e.target.value)}
              />
            </ModalBody>
            <ModalFooter>
              <Button onClick={onClose}>Cancel</Button>
              <Button
                onClick={() => {
                  handleSave(categoryName);
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

export default AddEditCategory;
