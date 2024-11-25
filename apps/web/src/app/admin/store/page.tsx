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
import { Stock, Role, Store } from '@/types/types';
import { fetchStocks, getStockById, createStock, updateStock, deleteStock } from '@/api/stock.api';
import { fetchStores, getStoreById, createStore, updateStore, deleteStore } from '@/api/store.api';
import { toastFailed, toastSuccess } from '@/utils/toastHelper';
import DeleteConfirmationModal from '@/components/common/DeleteConfirmationModal';
import AddEditStock from '@/components/admin/AddEditStock';
import { createStockHistory } from '@/api/stockHistory.api';
import { useAppSelector } from '@/store';

const StorePage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [store, setStore] = useState<Store[]>([]);
  const [addEditMode, setAddEditMode] = useState<'add' | 'edit'>('add');
  const [isAddEditModalOpen, setIsAddEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedStore, setSelectedStore] = useState<Store | null>(null);
  const [totalStores, setTotalStores] = useState<number>();
  const [storeNameFilter, setStoreNameFilter] = useState<string | undefined>();

  const pageSize = 10;
  // const userRole = localStorage.getItem('userRole') as Role;
  const userRole = useAppSelector((state) => state.auth.userRole) as Role;
  const storeId = useAppSelector((state) => state.auth.storeId);

  const loadStocks = useCallback(async () => {
    try {
      const queryParams = { page: currentPage, pageSize } as { [key: string]: any };
      if (storeNameFilter) {
        queryParams.storeName = storeNameFilter;
      }

      // const storeId = JSON.parse(localStorage.getItem('user') as string)?.store?.id;
      if (storeId && userRole === 'STORE_ADMIN') {
        queryParams.storeId = storeId;
      }
      const response = await fetchStores(queryParams);
      setStore(response.stores);
      setTotalStores(response.total);
    } catch (err) {
      toastFailed('Failed to fetch stocks');
      setStore([]);
      setTotalStores(0);
    }
  }, [currentPage,  storeNameFilter]);

  const onResetFilter = () => {
    setStoreNameFilter('');
  };

  useEffect(() => {
    setCurrentPage(1);
  }, [storeNameFilter]);

  useEffect(() => {
    loadStocks();
  }, [loadStocks]);

  const handleAddClick = () => {
    setAddEditMode('add');
    setSelectedStore(null);
    setIsAddEditModalOpen(true);
  };

  const handleEditClick = async (store: Store) => {
    if (!store.id) return;
    try {
      const response = await getStoreById(store.id);
      setSelectedStore(response);
      setAddEditMode('edit');
      setIsAddEditModalOpen(true);
    } catch (err) {
      toastFailed('Failed to fetch store');
    }
  };

  const handleDeleteClick = (store: Store) => {
    setSelectedStore(store);
    setIsDeleteModalOpen(true);
  };

  const userId = useAppSelector((state) => state.auth.id);

  // const handleSave = async (stock: Stock) => {
  //   if (selectedStore?.id) {
  //     try {
  //       //create stock history first
  //       try {
  //         // const userId = JSON.parse(localStorage.getItem('user') as string).id;
  //         const stockBefore = selectedStore;
  //         const quantityChanged = Number(stock.quantity) - Number(stockBefore?.quantity);

  //         await createStockHistory({
  //           storeId: Number(stock.storeId),
  //           productId: Number(stock.productId),
  //           totalQuantity: Number(stock.quantity),
  //           userId: Number(userId),
  //           quantityChanged
  //         });
  //         setIsAddEditModalOpen(false);
  //         loadStocks();
  //       } catch (err) {
  //         toastFailed('Failed to update stock');
  //       }

  //       // chagne stock
  //       await updateStock(selectedStore?.id, {
  //         quantity: Number(stock.quantity)
  //       });
  //       toastSuccess('Updated stock successfully');
  //       setIsAddEditModalOpen(false);
  //       loadStocks();
  //     } catch (err) {
  //       toastFailed('Failed to update stock');
  //     }
  //   } else {
  //     try {
  //       const queryParams = { page: currentPage, pageSize } as { [key: string]: any };

  //       queryParams.storeId = Number(stock.storeId);
  //       queryParams.productId = Number(stock.productId);

  //       const response = await fetchStocks(queryParams);

  //       if (response.stocks.length > 0) {
  //         toastFailed('Stock for this store and product already exists');
  //         return;
  //       } else {
  //         //create stock history first
  //         try {
  //           // const userId = JSON.parse(localStorage.getItem('user') as string).id;
  //           await createStockHistory({
  //             storeId: Number(stock.storeId),
  //             productId: Number(stock.productId),
  //             totalQuantity: Number(stock.quantity),
  //             userId: Number(userId),
  //             quantityChanged: Number(stock.quantity)
  //           });
  //           setIsAddEditModalOpen(false);
  //           loadStocks();
  //         } catch (err) {
  //           toastFailed('Failed to create stock');
  //         }

  //         //change stock
  //         try {
  //           await createStock({
  //             storeId: Number(stock.storeId),
  //             productId: Number(stock.productId),
  //             quantity: Number(stock.quantity)
  //           });
  //           toastSuccess('Created stock successfully');
  //           setIsAddEditModalOpen(false);
  //           loadStocks();
  //         } catch (err) {
  //           toastFailed('Failed to create stock');
  //         }
  //       }
  //     } catch (err) {
  //       toastFailed('Failed to create stock');
  //     }
  //   }
  // };

  // const handleConfirmDelete = async () => {
  //   if (selectedStore?.id) {
  //     try {
  //       await deleteStock(selectedStore?.id);
  //       toastSuccess('Deleted stock successfully');
  //       setIsDeleteModalOpen(false);
  //       setCurrentPage(1);
  //       loadStocks();
  //     } catch (err) {
  //       toastFailed('Failed to delete stock');
  //     }
  //   }
  // };

  const onSortChange = (e: any) => {
    console.log(e);
  };

  return (
    <div className="p-4">
      <div className="my-2 text-lg font-semibold">Stores</div>
      {/* <div className="my-2 gap-2 p-4 border border-gray-200 shadow-md bg-white rounded-md flex items-center">
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
        <Button className="bg-gray-100" onClick={onResetFilter}>
          Reset
        </Button>
      </div> */}

      <Table
        onSortChange={(e) => {
          onSortChange(e);
        }}
        aria-label="Stocks Table"
      >
        <TableHeader>
          <TableColumn allowsSorting className="text-md text-gray-700">
            Name
          </TableColumn>
          <TableColumn allowsSorting className="text-md text-gray-700">
            City
          </TableColumn>
          {/* <TableColumn allowsSorting className="text-md text-gray-700">
            Province
          </TableColumn> */}
          {/* <TableColumn className="text-md text-gray-700">Action</TableColumn> */}
        </TableHeader>
        <TableBody emptyContent={'No stock found'}>
          {store.map((s) => (
            <TableRow key={s.id}>
              <TableCell>{s.name}</TableCell>
              <TableCell>{s.address}</TableCell>
              {/* <TableCell>{s.quantity}</TableCell> */}
              {/* <TableCell>
                <div>
                  <Button size="sm" className="p-1 min-w-[22px] bg-white" onClick={() => handleEditClick(s)}>
                    <div className="flex items-center gap-1 border rounded-md border-primary p-1">
                      <FaPencilAlt size={14} className="text-primary bg-white text-lg" />
                    </div>
                  </Button>
                  <Button size="sm" className="p-1 min-w-[22px] bg-white" onClick={() => handleDeleteClick(s)}>
                    <div className="flex items-center gap-1 border rounded-md border-danger p-1">
                      <FaTrash size={14} className="text-danger bg-white text-lg" />
                    </div>
                  </Button>
                </div>
              </TableCell> */}
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Pagination
        className="flex flex-col gap-5 my-2"
        showControls
        total={Math.ceil(totalStores ? totalStores / pageSize : 1)}
        color="primary"
        page={currentPage}
        onChange={setCurrentPage}
      />

      {/* <AddEditStore
        isOpen={isAddEditModalOpen}
        onClose={() => setIsAddEditModalOpen(false)}
        addEditMode={addEditMode}
        store={{ ...selectedStore }}
        handleSave={handleSave}
      />

      <DeleteConfirmationModal
        selected={{ ...selectedStore }}
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        handleConfirmDelete={handleConfirmDelete}
      /> */}
    </div>
  );
};

export default StorePage;
