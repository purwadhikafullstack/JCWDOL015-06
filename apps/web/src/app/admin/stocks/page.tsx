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
import { FaPencilAlt, FaTrash } from 'react-icons/fa';
import { Stock, Role } from '@/types/types';
import { fetchStocks, getStockById, createStock, updateStock, deleteStock } from '@/api/stock.api';
import { toastFailed, toastSuccess } from '@/utils/toastHelper';
import DeleteConfirmationModal from '@/components/common/DeleteConfirmationModal';
import AddEditStock from '@/components/admin/AddEditStock';
import { createStockHistory } from '@/api/stockHistory.api';

const StocksPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [stocks, setStocks] = useState<Stock[]>([]);
  const [addEditMode, setAddEditMode] = useState<'add' | 'edit'>('add');
  const [isAddEditModalOpen, setIsAddEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedStock, setSelectedStock] = useState<Stock | null>(null);
  const [totalStocks, setTotalStocks] = useState<number>();
  const [productNameFilter, setProductNameFilter] = useState<string | undefined>();
  const [storeNameFilter, setStoreNameFilter] = useState<string | undefined>();

  const pageSize = 10;
  const userRole = localStorage.getItem('userRole') as Role;

  const loadStocks = useCallback(async () => {
    try {
      const queryParams = { page: currentPage, pageSize } as { [key: string]: any };
      if (productNameFilter) {
        queryParams.productName = productNameFilter;
      }
      if (storeNameFilter) {
        queryParams.storeName = storeNameFilter;
      }

      const storeId = JSON.parse(localStorage.getItem('user') as string)?.store?.id;
      if (storeId && userRole === 'STORE_ADMIN') {
        queryParams.storeId = storeId;
      }
      const response = await fetchStocks(queryParams);
      setStocks(response.stocks);
      setTotalStocks(response.total);
    } catch (err) {
      toastFailed('Failed to fetch stocks');
      setStocks([]);
      setTotalStocks(0);
    }
  }, [currentPage, productNameFilter, storeNameFilter]);

  const onResetFilter = () => {
    setStoreNameFilter('');
    setProductNameFilter('');
  };

  useEffect(() => {
    setCurrentPage(1);
  }, [productNameFilter, storeNameFilter]);

  useEffect(() => {
    loadStocks();
  }, [loadStocks]);

  const handleAddClick = () => {
    setAddEditMode('add');
    setSelectedStock(null);
    setIsAddEditModalOpen(true);
  };

  const handleEditClick = async (stock: Stock) => {
    if (!stock.id) return;
    try {
      const response = await getStockById(stock.id);
      setSelectedStock(response);
      setAddEditMode('edit');
      setIsAddEditModalOpen(true);
    } catch (err) {
      toastFailed('Failed to fetch stock');
    }
  };

  const handleDeleteClick = (stock: Stock) => {
    setSelectedStock(stock);
    setIsDeleteModalOpen(true);
  };

  const handleSave = async (stock: Stock) => {
    if (selectedStock?.id) {
      try {
        //create stock history first
        try {
          const userId = JSON.parse(localStorage.getItem('user') as string).id;
          const stockBefore = selectedStock;
          const quantityChanged = Number(stock.quantity) - Number(stockBefore?.quantity);

          await createStockHistory({
            storeId: Number(stock.storeId),
            productId: Number(stock.productId),
            totalQuantity: Number(stock.quantity),
            userId: Number(userId),
            quantityChanged
          });
          setIsAddEditModalOpen(false);
          loadStocks();
        } catch (err) {
          toastFailed('Failed to update stock');
        }

        // chagne stock
        await updateStock(selectedStock?.id, {
          quantity: Number(stock.quantity)
        });
        toastSuccess('Updated stock successfully');
        setIsAddEditModalOpen(false);
        loadStocks();
      } catch (err) {
        toastFailed('Failed to update stock');
      }
    } else {
      try {
        const queryParams = { page: currentPage, pageSize } as { [key: string]: any };

        queryParams.storeId = Number(stock.storeId);
        queryParams.productId = Number(stock.productId);

        const response = await fetchStocks(queryParams);

        if (response.stocks.length > 0) {
          toastFailed('Stock for this store and product already exists');
          return;
        } else {
          //create stock history first
          try {
            const userId = JSON.parse(localStorage.getItem('user') as string).id;
            await createStockHistory({
              storeId: Number(stock.storeId),
              productId: Number(stock.productId),
              totalQuantity: Number(stock.quantity),
              userId: Number(userId),
              quantityChanged: Number(stock.quantity)
            });
            setIsAddEditModalOpen(false);
            loadStocks();
          } catch (err) {
            toastFailed('Failed to create stock');
          }

          //change stock
          try {
            await createStock({
              storeId: Number(stock.storeId),
              productId: Number(stock.productId),
              quantity: Number(stock.quantity)
            });
            toastSuccess('Created stock successfully');
            setIsAddEditModalOpen(false);
            loadStocks();
          } catch (err) {
            toastFailed('Failed to create stock');
          }
        }
      } catch (err) {
        toastFailed('Failed to create stock');
      }
    }
  };

  const handleConfirmDelete = async () => {
    if (selectedStock?.id) {
      try {
        await deleteStock(selectedStock?.id);
        toastSuccess('Deleted stock successfully');
        setIsDeleteModalOpen(false);
        setCurrentPage(1);
        loadStocks();
      } catch (err) {
        toastFailed('Failed to delete stock');
      }
    }
  };

  const onSortChange = (e: any) => {
    console.log(e);
  };

  return (
    <div className="p-4">
      <div className="my-2 text-lg font-semibold">Stocks</div>
      <div className="my-2 gap-2 p-4 border border-gray-200 shadow-md bg-white rounded-md flex items-center">
        <Button size="md" color="primary" className="p-2 mr-4" onClick={handleAddClick}>
          Add New
        </Button>
        {userRole == 'SUPER_ADMIN' && (
          <Input
            size="sm"
            label="Search by store name"
            value={storeNameFilter}
            onChange={(e) => setStoreNameFilter(e.target.value)}
          />
        )}

        <Input
          size="sm"
          label="Search by product name"
          value={productNameFilter}
          onChange={(e) => setProductNameFilter(e.target.value)}
        />
        <Button className="bg-gray-100" onClick={onResetFilter}>
          Reset
        </Button>
      </div>

      <Table
        onSortChange={(e) => {
          onSortChange(e);
        }}
        aria-label="Stocks Table"
      >
        <TableHeader>
          <TableColumn allowsSorting className="text-md text-gray-700">
            Store
          </TableColumn>
          <TableColumn allowsSorting className="text-md text-gray-700">
            Product
          </TableColumn>
          <TableColumn allowsSorting className="text-md text-gray-700">
            Quantity
          </TableColumn>
          <TableColumn className="text-md text-gray-700">Action</TableColumn>
        </TableHeader>
        <TableBody emptyContent={'No stock found'}>
          {stocks.map((stock) => (
            <TableRow key={stock.id}>
              <TableCell>{stock.store?.name}</TableCell>
              <TableCell>{stock.product?.productName}</TableCell>
              <TableCell>{stock.quantity}</TableCell>
              <TableCell>
                <div>
                  <Button size="sm" className="p-1 min-w-[22px] bg-white" onClick={() => handleEditClick(stock)}>
                    <div className="flex items-center gap-1 border rounded-md border-primary p-1">
                      <FaPencilAlt size={14} className="text-primary bg-white text-lg" />
                    </div>
                  </Button>
                  <Button size="sm" className="p-1 min-w-[22px] bg-white" onClick={() => handleDeleteClick(stock)}>
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
        total={Math.ceil(totalStocks ? totalStocks / pageSize : 1)}
        color="primary"
        page={currentPage}
        onChange={setCurrentPage}
      />

      <AddEditStock
        isOpen={isAddEditModalOpen}
        onClose={() => setIsAddEditModalOpen(false)}
        addEditMode={addEditMode}
        stock={{ ...selectedStock }}
        handleSave={handleSave}
      />

      <DeleteConfirmationModal
        selected={{ ...selectedStock }}
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        handleConfirmDelete={handleConfirmDelete}
      />
    </div>
  );
};

export default StocksPage;
