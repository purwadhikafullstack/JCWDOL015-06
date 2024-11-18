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
  Input,
  Select,
  SelectItem
} from '@nextui-org/react';
import { FaPencilAlt, FaSearch, FaTrash } from 'react-icons/fa';
import { Discount, Role } from '@/types/types';
import { fetchDiscounts, getDiscountById, createDiscount, updateDiscount, deleteDiscount } from '@/api/discount.api';
import { toastFailed, toastSuccess } from '@/utils/toastHelper';
import DeleteConfirmationModal from '@/components/common/DeleteConfirmationModal';
import AddEditDiscount from '@/components/admin/AddEditDiscount';

const DiscountsPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [discounts, setDiscounts] = useState<Discount[]>([]);
  const [addEditMode, setAddEditMode] = useState<'add' | 'edit'>('add');
  const [isAddEditModalOpen, setIsAddEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedDiscount, setSelectedDiscount] = useState<Discount | null>(null);
  const [totalDiscounts, setTotalDiscounts] = useState<number>();
  const [nameFilter, setNameFilter] = useState<string | undefined>();
  const [selectedType, setSelectedType] = useState<Set<string>>(new Set([]));
  const [selectedAppliedType, setSelectedAppliedType] = useState<Set<string>>(new Set([]));

  const pageSize = 10;

  const loadDiscounts = useCallback(async () => {
    try {
      const queryParams = { page: currentPage, pageSize } as { [key: string]: any };
      if (nameFilter) {
        queryParams.name = nameFilter;
      }
      if (Array.from(selectedAppliedType)[0]) {
        queryParams.appliedDiscountType = Array.from(selectedAppliedType)[0];
      }
      if (Array.from(selectedType)[0]) {
        queryParams.discountType = Array.from(selectedType)[0];
      }
      const response = await fetchDiscounts(queryParams);
      setDiscounts(response.discounts);
      setTotalDiscounts(response.total);
    } catch (err) {
      toastFailed('Failed to fetch discounts');
      setDiscounts([]);
      setTotalDiscounts(0);
    }
  }, [currentPage, nameFilter, selectedAppliedType, selectedType]);

  const onResetFilter = () => {
    setNameFilter('');
    setSelectedType(new Set([]));
    setSelectedAppliedType(new Set([]));
  };

  useEffect(() => {
    setCurrentPage(1);
  }, [nameFilter]);

  useEffect(() => {
    loadDiscounts();
  }, [loadDiscounts]);

  const handleAddClick = () => {
    setAddEditMode('add');
    setSelectedDiscount(null);
    setIsAddEditModalOpen(true);
  };

  const handleEditClick = async (discount: Discount) => {
    try {
      const response = await getDiscountById(Number(discount.id));
      setSelectedDiscount(response);
      setAddEditMode('edit');
      setIsAddEditModalOpen(true);
    } catch (err) {
      toastFailed('Failed to fetch discount');
    }
  };

  const handleDeleteClick = (discount: Discount) => {
    setSelectedDiscount(discount);
    setIsDeleteModalOpen(true);
  };

  const handleSave = async (discount: Discount) => {
    if (selectedDiscount?.id) {
      const newDiscount = { ...discount };
      newDiscount.minimumPurchaseAmount = Number(newDiscount.minimumPurchaseAmount);
      if (newDiscount.selectedProductIds && newDiscount.selectedProductIds?.length > 0) {
        newDiscount.selectedProductIds = newDiscount.selectedProductIds?.map((val) => Number(val));
      } else {
        delete newDiscount.selectedProductIds;
      }
      delete newDiscount.selectedProducts;
      try {
        await updateDiscount(selectedDiscount?.id, { ...newDiscount });
        toastSuccess('Updated discount successfully');
        setIsAddEditModalOpen(false);
        loadDiscounts();
      } catch (err) {
        toastFailed('Failed to update discount');
      }
    } else {
      try {
        const newDiscount = { ...discount };
        newDiscount.minimumPurchaseAmount = Number(newDiscount.minimumPurchaseAmount);
        if (newDiscount.selectedProductIds && newDiscount.selectedProductIds?.length > 0) {
          newDiscount.selectedProductIds = newDiscount.selectedProductIds?.map((val) => Number(val));
        } else {
          delete newDiscount.selectedProductIds;
        }
        delete newDiscount.selectedProducts;
        delete newDiscount.id;
        await createDiscount({ ...newDiscount });
        toastSuccess('Created discount successfully');
        setIsAddEditModalOpen(false);
        loadDiscounts();
      } catch (err) {
        toastFailed('Failed to create discount');
      }
    }
  };

  const handleConfirmDelete = async () => {
    if (selectedDiscount?.id) {
      try {
        await deleteDiscount(selectedDiscount?.id);
        toastSuccess('Deleted discount successfully');
        setIsDeleteModalOpen(false);
        setCurrentPage(1);
        loadDiscounts();
      } catch (err) {
        toastFailed('Failed to delete discount');
      }
    }
  };

  const onSortChange = (e: any) => {
    console.log(e);
  };

  const userRole = localStorage.getItem('userRole') as Role;

  return (
    <div className="p-4">
      <div className="my-2 text-lg font-semibold">Discounts</div>
      <div className="my-2 gap-2 p-4 border border-gray-200 shadow-md bg-white rounded-md flex items-center">
        <Button size="md" color="primary" className="p-2 mr-4" onClick={handleAddClick}>
          Add New
        </Button>
        <Input size="sm" label="Search by Name" value={nameFilter} onChange={(e) => setNameFilter(e.target.value)} />
        <Select
          fullWidth
          label="Filter By Type"
          selectedKeys={selectedType}
          onSelectionChange={(e) => {
            const key = e.currentKey as string;
            setSelectedType(new Set([key]));
          }}
        >
          <SelectItem key={'PERCENTAGE'} value={'PERCENTAGE'}>
            Percentage
          </SelectItem>
          <SelectItem key={'AMOUNT'} value={'AMOUNT'}>
            Amount
          </SelectItem>
          <SelectItem key={'BUY_ONE_GET_ONE'} value={'BUY_ONE_GET_ONE'}>
            Buy One Get One
          </SelectItem>
        </Select>
        <Select
          fullWidth
          label="Filter By Applied Type"
          selectedKeys={selectedAppliedType}
          onSelectionChange={(e) => {
            const key = e.currentKey as string;
            setSelectedAppliedType(new Set([key]));
          }}
        >
          <SelectItem key={'ON_PRODUCT'} value={'ON_PRODUCT'}>
            On Product
          </SelectItem>
          <SelectItem key={'MINIMUM_PURCHASE'} value={'MINIMUM_PURCHASE'}>
            Minimum Purchase
          </SelectItem>
          <SelectItem key={'BUY_ONE_GET_ONE'} value={'BUY_ONE_GET_ONE'}>
            Buy One Get One
          </SelectItem>
        </Select>
        <Button className="bg-gray-100" onClick={onResetFilter}>
          Reset
        </Button>
      </div>

      <Table aria-label="Discounts Table">
        <TableHeader>
          <TableColumn allowsSorting className="text-md text-gray-700">
            Name
          </TableColumn>
          <TableColumn allowsSorting className="text-md text-gray-700">
            Type
          </TableColumn>
          <TableColumn allowsSorting className="text-md text-gray-700">
            Amount
          </TableColumn>
          <TableColumn allowsSorting className="text-md text-gray-700">
            Percentage
          </TableColumn>
          <TableColumn allowsSorting className="text-md text-gray-700">
            Applied Type
          </TableColumn>
          <TableColumn allowsSorting className="text-md text-gray-700">
            Action
          </TableColumn>
        </TableHeader>
        <TableBody emptyContent={'No discount found'}>
          {discounts.map((discount) => (
            <TableRow key={discount.id}>
              <TableCell>{discount.name}</TableCell>
              <TableCell>
                <span
                  className={`text-white p-2 rounded-md font-semibold text-xs ${discount.discountType == 'PERCENTAGE' ? 'bg-blue-500' : discount.discountType == 'BUY_ONE_GET_ONE' ? 'bg-green-500' : 'bg-yellow-500'}`}
                >
                  <span>
                    {discount.discountType.replace(/_/g, ' ').charAt(0) +
                      discount.discountType.replace(/_/g, ' ').slice(1).toLowerCase()}
                  </span>
                </span>
              </TableCell>
              <TableCell>
                {discount.discountAmount ? `Rp. ${discount.discountAmount.toLocaleString('id-ID')}` : '-'}
              </TableCell>
              <TableCell>{discount.discountPercentage ? `${discount.discountPercentage} %` : '-'}</TableCell>
              <TableCell>
                <span className={`text-gray-700 p-2 rounded-md font-semibold text-xs bg-gray-200`}>
                  {discount.appliedDiscountType.replace(/_/g, ' ').charAt(0) +
                    discount.appliedDiscountType.replace(/_/g, ' ').slice(1).toLowerCase()}
                </span>
              </TableCell>
              <TableCell>
                <div>
                  <Button size="sm" className="p-1 min-w-[22px] bg-white" onClick={() => handleEditClick(discount)}>
                    <div className="flex items-center gap-1 border rounded-md border-primary p-1">
                      <FaPencilAlt size={14} className="text-primary bg-white text-lg" />
                    </div>
                  </Button>
                  <Button size="sm" className="p-1 min-w-[22px] bg-white" onClick={() => handleDeleteClick(discount)}>
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
        total={Math.ceil(totalDiscounts ? totalDiscounts / pageSize : 1)}
        color="primary"
        page={currentPage}
        onChange={setCurrentPage}
      />

      <AddEditDiscount
        isOpen={isAddEditModalOpen}
        onClose={() => setIsAddEditModalOpen(false)}
        addEditMode={addEditMode}
        discount={selectedDiscount ?? undefined}
        handleSave={handleSave}
      />

      <DeleteConfirmationModal
        selected={selectedDiscount}
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        handleConfirmDelete={handleConfirmDelete}
      />
    </div>
  );
};

export default DiscountsPage;
