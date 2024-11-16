'use client';

import React from 'react';
import { Table, Pagination, Button, TableHeader, TableBody, TableCell, TableColumn, TableRow } from '@nextui-org/react';
import { FaPencilAlt, FaTrash } from 'react-icons/fa';
import { Product, Role } from '@/types/types';

interface PaginationProps {
  totalPage: number;
  currentPage: number;
}

interface ProductsTableProps {
  isAdmin: boolean;
  handleEditClick?: (product: Product) => void;
  handleDeleteClick?: (product: Product) => void;
  products: Product[];
  pagination: PaginationProps;
  onChangePage: (pageNumber: number) => void;
  userRole: Role;
}

export default function ProductsTable({
  isAdmin,
  handleEditClick,
  handleDeleteClick,
  products,
  pagination,
  onChangePage,
  userRole
}: Readonly<ProductsTableProps>) {
  const renderTableHeader = () => {
    const header = ['Name', 'Price', 'Category', 'Description', 'Stock'];

    if (isAdmin) {
      header.push('Action');
    }

    return (
      <TableHeader>
        {header.map((item, index) => (
          <TableColumn key={item} className="text-md text-gray-700">
            {item}
          </TableColumn>
        ))}
      </TableHeader>
    );
  };

  const renderTableRow = (product: Product) => {
    const tableCells = [
      <TableCell key={product.id}>{product.productName}</TableCell>,
      <TableCell key={product.id}>Rp. {product.price?.toLocaleString('id-ID')}</TableCell>,
      <TableCell key={product.id} className="max-w-[100px]">
        {product?.category?.name ?? '-'}
      </TableCell>,
      <TableCell key={product.id} className="max-w-[100px] truncate">
        <span className="truncate">{product.desc}</span>
      </TableCell>,
      <TableCell key={product.id}>
        <div className="flex flex-col gap-1 bg-gray-100 p-2 m-1 rounded-md">
          {product.Stock?.map((stock) => {
            return (
              <div>
                <span key={stock.id} className="text-xs bg-gray-200 px-2 py-1 rounded-md">
                  {stock.store?.name}: {stock.quantity}
                </span>
              </div>
            );
          })}
        </div>
      </TableCell>
    ];

    if (isAdmin) {
      tableCells.push(
        <TableCell key={product.id}>
          <div className="flex gap-2">
            <Button
              size="sm"
              className="p-1 min-w-[22px] bg-white"
              onClick={() => {
                if (handleEditClick) {
                  handleEditClick(product);
                }
              }}
              isDisabled={userRole !== 'SUPER_ADMIN'}
            >
              <div className="flex items-center gap-1 border rounded-md border-primary p-1">
                <FaPencilAlt size={14} className="text-primary bg-white text-lg" />
              </div>
            </Button>
            <Button
              isDisabled={userRole !== 'SUPER_ADMIN'}
              size="sm"
              className="p-1 min-w-[22px] bg-white"
              onClick={() => {
                if (handleDeleteClick) {
                  handleDeleteClick(product);
                }
              }}
            >
              <div className="flex items-center gap-1 border rounded-md border-danger p-1">
                <FaTrash size={14} className="text-danger bg-white text-lg" />
              </div>
            </Button>
          </div>
        </TableCell>
      );
    }

    return <TableRow key={product.id}>{tableCells.map((cell) => cell)}</TableRow>;
  };

  return (
    <>
      <Table aria-label="Products Table">
        {renderTableHeader()}
        <TableBody>{products.map((product) => renderTableRow(product))}</TableBody>
      </Table>
      <Pagination
        showControls
        className="my-2 shadow-sm"
        total={pagination.totalPage}
        initialPage={pagination.currentPage}
        onChange={(page) => onChangePage(page)}
      />
    </>
  );
}
