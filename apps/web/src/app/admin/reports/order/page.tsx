'use client';

import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Role, Order } from '@/types/types';
import {
  Input,
  DatePicker,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  Pagination,
  Button
} from '@nextui-org/react';
import { parseDate, getLocalTimeZone } from '@internationalized/date';
import { fetchOrders } from '@/api/order.api';
import { toastFailed } from '@/utils/toastHelper';
import { useAppSelector } from '@/store';

const OrderReport = () => {
  const storeId = useAppSelector((state) => state.auth.storeId);
  const userRole = useAppSelector((state) => state.auth.userRole) as Role;

  const filter = useRef({
    userName: '',
    // productName: '',
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
    const yearb = splitDate?.[2]?.slice(0, 4);
    const monthb = Number(splitDate?.[0]) > 9 ? splitDate?.[0] : `0${splitDate?.[0]}`;
    let dayb = Number(splitDate?.[1]) > 9 ? splitDate?.[1] : `0${splitDate?.[1]}`;

    const dateBefore = `${yearb}-${monthb}-${dayb}`;
    const adjustedDate = new Date(dateBefore);

    if (type === 'end_date') {
      adjustedDate.setDate(adjustedDate.getDate() + 1);
    } else {
      adjustedDate.setDate(adjustedDate.getDate() - 1);
    }

    const year = adjustedDate.getFullYear();
    const month = String(adjustedDate.getMonth() + 1).padStart(2, '0');
    const day = String(adjustedDate.getDate()).padStart(2, '0');

    const newDate = `${year}-${month}-${day}`;

    filter.current = {
      ...filter.current,
      [type]: date ? newDate : ''
    };
    onFilter();
  };

  const dateRender = (date: string, type: 'start_date' | 'end_date') => {
    const splitDate = date?.toLocaleString().split('-');
    const yearb = splitDate?.[0];
    let monthb = Number(splitDate?.[1]) > 9 ? splitDate?.[1] : `0${splitDate?.[1]}`;
    let dayb = Number(splitDate?.[2]) > 9 ? splitDate?.[2] : `0${splitDate?.[2]}`;

    const dateBefore = `${yearb}-${monthb}-${dayb}`;
    const adjustedDate = new Date(dateBefore);

    if (type === 'end_date') {
      adjustedDate.setDate(adjustedDate.getDate() - 1);
    } else {
      adjustedDate.setDate(adjustedDate.getDate() + 1);
    }

    const year = adjustedDate.getFullYear();
    const month = String(adjustedDate.getMonth() + 1).padStart(2, '0');
    const day = String(adjustedDate.getDate()).padStart(2, '0');

    const newDate = `${year}-${month}-${day}`;

    return parseDate(newDate);
  };

  const onFilter = () => {
    setCurrentPage(1);
    loadOrders();
  };

  const [currentPage, setCurrentPage] = useState(1);
  const [orders, setOrders] = useState<Order[]>([]);
  const [totalOrders, setTotalOrders] = useState<number>(0);

  const pageSize = 10;
  // const userRole = localStorage.getItem('userRole') as Role;

  const loadOrders = useCallback(async () => {
    try {
      const queryParams = { page: currentPage, pageSize } as { [key: string]: any };
      if (filter.current.userName) {
        queryParams.userName = filter.current.userName;
      }
      // if (filter.current.productName) {
      //   queryParams.productName = filter.current.productName;
      // }
      if (filter.current.storeName) {
        queryParams.storeName = filter.current.storeName;
      }
      if (filter.current.start_date) {
        queryParams.start_date = filter.current.start_date;
      }
      if (filter.current.end_date) {
        queryParams.end_date = filter.current.end_date;
      }

      // const storeId = JSON.parse(localStorage.getItem('user') as string)?.store?.id;

      if (storeId && userRole === 'STORE_ADMIN') {
        queryParams.storeId = storeId;
      }

      const response = await fetchOrders(queryParams);
      setOrders(response.orders);
      setTotalOrders(response.total);
    } catch (err) {
      toastFailed('Failed to fetch order reports');
      setOrders([]);
      setTotalOrders(0);
    }
  }, [currentPage, filter.current]);

  const onResetFilter = () => {
    filter.current = {
      userName: '',
      // productName: '',
      storeName: '',
      start_date: '',
      end_date: ''
    };
  };

  useEffect(() => {
    loadOrders();
  }, [loadOrders]);

  return (
    <div className="order-report">
      <div className="text-lg p-4 font-bold">Order Report</div>
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
        {/* <Input
          type="text"
          name="productName"
          placeholder="Filter by Product Name"
          value={filter.current.productName}
          onChange={handleFilterChange}
        /> */}
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
        <Button className="bg-gray-100" onClick={onResetFilter}>
          Reset
        </Button>
      </div>
      <div className="p-4">
        <Table aria-label="Order Report" className="min-w-[100%] h-auto">
          <TableHeader>
            <TableColumn allowsSorting>Date</TableColumn>
            <TableColumn allowsSorting>Products ordered</TableColumn>
            <TableColumn allowsSorting>Store Name</TableColumn>
            <TableColumn allowsSorting>Order Discount</TableColumn>
            <TableColumn allowsSorting>Order Total Discount</TableColumn>
            <TableColumn allowsSorting>Order Total Price</TableColumn>
          </TableHeader>
          <TableBody emptyContent={'No order found'}>
            {orders?.map((history, index) => (
              <TableRow key={index}>
                <TableCell>{new Date(String(history.createdAt)).toLocaleString('id-ID')}</TableCell>
                <TableCell>
                  <div className=" flex flex-col ">
                    <div className="grid grid-cols-12 ">
                      <div className="col-span-2 py-1 px-2 border">Product</div>
                      <div className="col-span-1 py-1 px-2 border">Qty</div>
                      <div className="col-span-2 py-1 px-2 border">Price</div>
                      <div className="col-span-3 py-1 px-2 border">Disc.</div>
                      <div className="col-span-2 py-1 px-2 border">Total Disc.</div>
                      <div className="col-span-2 py-1 px-2 border">Final Price </div>
                    </div>
                    {history.orderItems?.map((item) => {
                      return (
                        <div key={item.id} className="grid grid-cols-12 ">
                          {/* <div>{item.product?.productName}</div> */}
                          <div className="col-span-2 py-1 px-2 border">{item.product?.productName}</div>
                          <div className="col-span-1  py-1 px-2 border">{item.quantity}</div>
                          <div className="col-span-2 py-1 px-2 border">
                            <div>{item.product?.price?.toLocaleString('id-ID')}</div>
                            <div>
                              x {item.quantity} ={' '}
                              {(Number(item.product?.price) * Number(item.quantity))?.toLocaleString('id-ID')}
                            </div>
                          </div>
                          <div className="col-span-3 py-1 px-2 border">{item.discount?.name ?? '-'}</div>
                          <div className="col-span-2 py-1 px-2 border">
                            {item.discount?.discountType == 'BUY_ONE_GET_ONE'
                              ? ''
                              : item.discount?.discountType == 'PERCENTAGE'
                                ? '%'
                                : history.discount?.discountType == 'AMOUNT'
                                  ? 'Rp.'
                                  : ''}
                            {item.discount?.discountType == 'BUY_ONE_GET_ONE'
                              ? ''
                              : item.discount?.discountType == 'PERCENTAGE'
                                ? item.discount.discountPercentage
                                : item.discount?.discountAmount}{' '}
                            ({item.totalDiscount?.toLocaleString('id-ID')})
                          </div>
                          <div className="col-span-2 py-1 px-2 border">
                            Rp. {item.totalPrice?.toLocaleString('id-ID')}{' '}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </TableCell>
                <TableCell>{history.store?.name}</TableCell>
                <TableCell>{history.discount?.name ?? '-'}</TableCell>
                <TableCell>(Rp. {history.totalDiscount?.toLocaleString('id-ID')})</TableCell>
                <TableCell>Rp. {history.totalPrice?.toLocaleString('id-ID')}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <Pagination
          className="flex flex-col gap-5 my-2"
          showControls
          total={Math.ceil(totalOrders ? totalOrders / pageSize : 1)}
          color="primary"
          page={currentPage}
          onChange={setCurrentPage}
        />
      </div>
    </div>
  );
};

export default OrderReport;
