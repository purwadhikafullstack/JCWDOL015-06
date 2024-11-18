'use client';

import React from 'react';
import { Button } from '@nextui-org/react';
import { Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from '@nextui-org/modal';

interface DeleteConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  handleConfirmDelete: () => void;
  selected: any;
}

const DeleteConfirmationModal: React.FC<DeleteConfirmationModalProps> = ({
  isOpen,
  onClose,
  handleConfirmDelete,
  selected
}) => {
  return (
    <Modal size="xl" isOpen={isOpen} onClose={onClose} closeButton>
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader>Confirm Delete</ModalHeader>
            <ModalBody>Are you sure you want to delete {selected?.name ?? selected.productName}?</ModalBody>
            <ModalFooter>
              <Button onClick={onClose}>No</Button>
              <Button onClick={handleConfirmDelete}>Yes</Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default DeleteConfirmationModal;
