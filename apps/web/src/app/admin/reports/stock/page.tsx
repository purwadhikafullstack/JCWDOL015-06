'use client';

import React, { useRef, useState } from 'react';
import { FaFilter } from 'react-icons/fa';
import { dummyStockHistories } from '@/data/dummyData';
import { Input, DatePicker, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from '@nextui-org/react';
import { parseDate, getLocalTimeZone } from '@internationalized/date';

const StockHistoryReport = () => {
  const filter = useRef({
    userName: '',
    productName: '',
    storeName: '',
    date: ''
  });

  const [filteredData, setFilteredData] = useState(dummyStockHistories);

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    filter.current = {
      ...filter.current,
      [name]: value
    };
    onFilter();
  };

  const handleDateChange = (date: Date | null) => {
    filter.current = {
      ...filter.current,
      date: date ? date.toISOString().split('T')[0] : ''
    };
    onFilter();
  };

  const onFilter = () => {
    let newDataSet = [...dummyStockHistories];
    newDataSet = dummyStockHistories.filter((history) => {
      return (
        (history.user.firstName.toLowerCase().includes(filter.current.userName.toLowerCase()) ||
          history.user.lastName.toLowerCase().includes(filter.current.userName.toLowerCase())) &&
        history.product.productName?.toLowerCase().includes(filter.current.productName.toLowerCase()) &&
        history.store.name.toLowerCase().includes(filter.current.storeName.toLowerCase()) &&
        history.createdAt.toISOString().includes(filter.current.date)
      );
    });
    setFilteredData(newDataSet);
  };

  return (
    <div className="stock-history-report">
      <div className="text-lg p-4 font-bold">Stock History Report</div>
      <div
        className="filter-section flex items-center gap-4 p-4 mx-auto  border rounded-sm shadow-md"
        style={{ maxWidth: '75%' }}
      >
        <FaFilter size={40} />
        <Input
          type="text"
          name="userName"
          placeholder="Filter by User Name"
          value={filter.current.userName}
          onChange={handleFilterChange}
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
          placeholder="Filter by Store Name"
          value={filter.current.storeName}
          onChange={handleFilterChange}
        />
        <DatePicker
          className="max-w-[284px]"
          label="Filter by Date"
          value={filter.current.date ? parseDate(filter.current.date) : null}
          onChange={(date) => handleDateChange(date ? date.toDate(getLocalTimeZone()) : null)}
        />
      </div>
      <div className="p-4">
        <Table aria-label="Stock History Report" className="min-w-[100%] h-auto">
          <TableHeader>
            <TableColumn>User Name</TableColumn>
            <TableColumn>Product Name</TableColumn>
            <TableColumn>Store Name</TableColumn>
            <TableColumn>Date</TableColumn>
          </TableHeader>
          <TableBody>
            {filteredData.map((history, index) => (
              <TableRow key={index}>
                <TableCell>{history.user.email}</TableCell>
                <TableCell>{history.product.productName}</TableCell>
                <TableCell>{history.store.name}</TableCell>
                <TableCell>{history.createdAt.toLocaleString('id-ID')}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default StockHistoryReport;
