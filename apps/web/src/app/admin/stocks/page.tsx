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
import { FaPencilAlt } from 'react-icons/fa';
import { Stock, dummyStocks } from '@/data/dummyData';

const StocksPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedStock, setSelectedStock] = useState<Stock | null>(null);
  const [editedStockQuantity, setEditedStockQuantity] = useState<number | undefined>(0);
  const [stocks, setStocks] = useState<Stock[]>(dummyStocks);

  const stocksPerPage = 10;

  const indexOfLastStock = currentPage * stocksPerPage;
  const indexOfFirstStock = indexOfLastStock - stocksPerPage;
  const currentStocks = stocks.slice(indexOfFirstStock, indexOfLastStock);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  const handleEditClick = (stock: Stock) => {
    setSelectedStock(stock);
    setEditedStockQuantity(stock.quantity);
    setIsEditModalOpen(true);
  };

  const handleSaveEdit = () => {
    const index = stocks.findIndex((stock) => stock.id === selectedStock?.id);
    const updatedStocks = [...stocks];
    updatedStocks[index].quantity = Number(editedStockQuantity);
    setStocks(updatedStocks);
    setIsEditModalOpen(false);
  };

  return (
    <div className="p-4">
      <div className="my-2 text-lg font-semibold">Stocks</div>
      <Table aria-label="Stocks Table">
        <TableHeader>
          <TableColumn className="text-md text-gray-700">Product</TableColumn>
          <TableColumn className="text-md text-gray-700">Store</TableColumn>
          <TableColumn className="text-md text-gray-700">Quantity</TableColumn>
          <TableColumn className="text-md text-gray-700">Action</TableColumn>
        </TableHeader>
        <TableBody>
          {currentStocks.map((stock) => (
            <TableRow key={stock.id}>
              <TableCell>{stock.product.productName}</TableCell>
              <TableCell>{stock.store.name}</TableCell>
              <TableCell>{stock.quantity}</TableCell>
              <TableCell>
                <div>
                  <Button size="sm" className="p-1 min-w-[22px] bg-white" onClick={() => handleEditClick(stock)}>
                    <div className="flex items-center gap-1 border rounded-md border-primary p-1">
                      <FaPencilAlt size={14} className="text-primary bg-white text-lg" />
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
        total={Math.ceil(dummyStocks.length / stocksPerPage)}
        initialPage={1}
        onChange={(page) => paginate(page)}
      />

      <Modal size="xl" isOpen={isEditModalOpen} onClose={() => setIsEditModalOpen(false)} closeButton>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader>Edit Stock</ModalHeader>
              <ModalBody>
                <div className="flex flex-col mb-3 gap-2">
                  <div className="font-bold text-base">{selectedStock?.product.productName}</div>
                  <div>
                    <span className="bg-primary text-white px-3 py-2 rounded-md shadow-sm">
                      {selectedStock?.store.name}
                    </span>
                  </div>
                </div>
                <Input
                  fullWidth
                  label="Quantity"
                  value={String(editedStockQuantity)}
                  onChange={(e) => setEditedStockQuantity(Number(e.target.value))}
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
    </div>
  );
};

export default StocksPage;
