'use client';

import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Role, StockHistory } from '@/types/types';
import {
  Input,
  DatePicker,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  Pagination
} from '@nextui-org/react';
import { parseDate, getLocalTimeZone } from '@internationalized/date';
import { fetchStockHistories } from '@/api/stockHistory.api';
import { toastFailed } from '@/utils/toastHelper';

const StockHistoryReport = () => {
  const filter = useRef({
    userName: '',
    productName: '',
    storeName: '',
    start_date: '',
    end_date: ''
  });

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    filter.current = {
      ...filter.current,
      [name]: value
    };
    onFilter();
  };

  const handleDateChange = (date: Date | null, type: 'start_date' | 'end_date') => {
    const splitDate = date?.toLocaleString().split('/');
    const year = splitDate?.[2]?.slice(0, 4);
    const month = Number(splitDate?.[0]) > 9 ? splitDate?.[0] : `0${splitDate?.[0]}`;
    let day = Number(splitDate?.[1]) > 9 ? splitDate?.[1] : `0${splitDate?.[1]}`;
    if (type === 'end_date') {
      day = `${Number(day) + 1}`;
    } else {
      day = `${Number(day) - 1}`;
    }
    const newDate = `${year}-${month}-${day}`;
    filter.current = {
      ...filter.current,
      [type]: date ? newDate : ''
    };
    onFilter();
  };

  const dateRender = (date: string, type: 'start_date' | 'end_date') => {
    const splitDate = date?.toLocaleString().split('-');
    const year = splitDate?.[0];
    const month = Number(splitDate?.[1]) > 9 ? splitDate?.[1] : `0${splitDate?.[1]}`;
    let day = Number(splitDate?.[2]) > 9 ? splitDate?.[2] : `0${splitDate?.[2]}`;
    if (type === 'end_date') {
      day = `${Number(day) - 1}`;
    } else {
      day = `${Number(day) + 1}`;
    }
    const newDate = `${year}-${month}-${day}`;

    return parseDate(newDate);
  };

  const onFilter = () => {
    setCurrentPage(1);
    loadStockHistories();
  };

  const [currentPage, setCurrentPage] = useState(1);
  const [stockHistories, setStockHistories] = useState<StockHistory[]>([]);
  const [totalStockHistories, setTotalStockHistories] = useState<number>(0);

  const pageSize = 10;
  const userRole = localStorage.getItem('userRole') as Role;

  const loadStockHistories = useCallback(async () => {
    try {
      const queryParams = { page: currentPage, pageSize } as { [key: string]: any };
      if (filter.current.userName) {
        queryParams.userName = filter.current.userName;
      }
      if (filter.current.productName) {
        queryParams.productName = filter.current.productName;
      }
      if (filter.current.storeName) {
        queryParams.storeName = filter.current.storeName;
      }
      if (filter.current.start_date) {
        queryParams.start_date = filter.current.start_date;
      }
      if (filter.current.end_date) {
        queryParams.end_date = filter.current.end_date;
      }

      const storeId = JSON.parse(localStorage.getItem('user') as string)?.store?.id;
      if (storeId && userRole === 'STORE_ADMIN') {
        queryParams.storeId = storeId;
      }

      const response = await fetchStockHistories(queryParams);
      setStockHistories(response.stockHistories);
      setTotalStockHistories(response.total);
    } catch (err) {
      toastFailed('Failed to fetch stock reports');
      setStockHistories([]);
      setTotalStockHistories(0);
    }
  }, [currentPage, filter.current]);

  useEffect(() => {
    loadStockHistories();
  }, [loadStockHistories]);

  return (
    <div className="stock-history-report">
      <div className="text-lg p-4 font-bold">Stock History Report</div>
      <div
        className="filter-section flex items-center gap-4 p-4 mx-auto  border rounded-sm shadow-md"
        style={{ maxWidth: '75%' }}
      >
        <DatePicker
          className="max-w-[284px]"
          label="Start Date"
          value={filter.current.start_date ? dateRender(filter.current.start_date, 'start_date') : null}
          onChange={(date) => {
            handleDateChange(date ? date.toDate(getLocalTimeZone()) : null, 'start_date');
          }}
        />
        <DatePicker
          className="max-w-[284px]"
          label="End Date"
          value={filter.current.end_date ? dateRender(filter.current.end_date, 'end_date') : null}
          onChange={(date) => {
            handleDateChange(date ? date.toDate(getLocalTimeZone()) : null, 'end_date');
          }}
        />
        <Input
          type="text"
          name="productName"
          placeholder="Filter by Product Name"
          value={filter.current.productName}
          onChange={handleFilterChange}
        />
        <Input
          type="text"
          name="storeName"
          isDisabled={userRole !== 'SUPER_ADMIN'}
          placeholder="Filter by Store Name"
          value={filter.current.storeName}
          onChange={handleFilterChange}
        />
        <Input
          type="text"
          name="userName"
          placeholder="Filter by User username"
          value={filter.current.userName}
          onChange={handleFilterChange}
        />
      </div>
      <div className="p-4">
        <Table aria-label="Stock History Report" className="min-w-[100%] h-auto">
          <TableHeader>
            <TableColumn>Date</TableColumn>
            <TableColumn>Product Name</TableColumn>
            <TableColumn>Store Name</TableColumn>
            <TableColumn>Quantity changed</TableColumn>
            <TableColumn>Quantity after</TableColumn>
            <TableColumn>User</TableColumn>
          </TableHeader>
          <TableBody>
            {stockHistories?.map((history, index) => (
              <TableRow key={index}>
                <TableCell>{new Date(history.createdAt).toLocaleString('id-ID')}</TableCell>
                <TableCell>{history.product.productName}</TableCell>
                <TableCell>{history.store.name}</TableCell>
                <TableCell>{history.quantityChanged}</TableCell>
                <TableCell>{history.totalQuantity}</TableCell>
                <TableCell>{history.user.username}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <Pagination
          className="flex flex-col gap-5 my-2"
          showControls
          total={Math.ceil(totalStockHistories ? totalStockHistories / pageSize : 1)}
          color="primary"
          page={currentPage}
          onChange={setCurrentPage}
        />
      </div>
    </div>
  );
};

export default StockHistoryReport;
