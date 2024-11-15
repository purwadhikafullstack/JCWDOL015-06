'use client';

import React from 'react';
import { Table, Pagination, Button, TableHeader, TableBody, TableCell, TableColumn, TableRow } from '@nextui-org/react';
import { FaPencilAlt, FaTrash } from 'react-icons/fa';
import { dummyCategories, Product, dummyStocks } from '@/data/dummyData';

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
}

export default function ProductsTable({
  isAdmin,
  handleEditClick,
  handleDeleteClick,
  products,
  pagination,
  onChangePage
}: ProductsTableProps) {
  const currentProducts = products.slice((pagination.currentPage - 1) * 10, pagination.currentPage * 10);

  const calculateTotalStock = (productId: number) => {
    return dummyStocks
      .filter((stock) => stock.productId === productId)
      .reduce((total, stock) => total + stock.quantity, 0);
  };

  const renderTableHeader = () => {
    const header = ['Name', 'Price', 'Category', 'Description', 'Stock'];

    if (isAdmin) {
      header.push('Action');
    }

    return (
      <TableHeader>
        {header.map((item, index) => (
          <TableColumn key={index} className="text-md text-gray-700">
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
        {String(dummyCategories.find((val) => val.id == product.category?.id)?.name)}
      </TableCell>,
      <TableCell key={product.id} className="max-w-[100px] truncate">
        <span className="truncate">{product.desc}</span>
      </TableCell>,
      <TableCell key={product.id}>{Number(calculateTotalStock(Number(product.id)))}</TableCell>
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
            >
              <div className="flex items-center gap-1 border rounded-md border-primary p-1">
                <FaPencilAlt size={14} className="text-primary bg-white text-lg" />
              </div>
            </Button>
            <Button
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
      <div className="my-2 text-lg font-semibold">Products</div>
      <Table aria-label="Products Table">
        {renderTableHeader()}
        <TableBody>{currentProducts.map((product) => renderTableRow(product))}</TableBody>
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
