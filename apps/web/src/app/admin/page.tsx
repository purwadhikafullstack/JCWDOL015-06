'use client';

import React, { useEffect } from 'react';
import { useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { useRouter } from 'next/navigation';
import { FaBox, FaClipboardList, FaShoppingCart, FaChartBar, FaUser } from 'react-icons/fa';
import { Select, SelectItem } from '@nextui-org/react';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

interface DummyData {
  stores: { id: number; name: string }[];
  sales: { [key: string]: number[] };
  stock: { [key: string]: number[] };
}

const dummyData: DummyData = {
  stores: [
    { id: 0, name: 'All' },
    { id: 1, name: 'Store Jakarta' },
    { id: 2, name: 'Store Bandung' }
  ],
  sales: {
    All: [14, 22, 23, 10, 3, 7],
    'Store Jakarta': [12, 19, 3, 5, 2, 3],
    'Store Bandung': [2, 3, 20, 5, 1, 4]
  },
  stock: {
    All: [190, 380, 280, 150, 130, 170],
    'Store Jakarta': [100, 200, 150, 80, 70, 90],
    'Store Bandung': [90, 180, 130, 70, 60, 80]
  }
};

const AdminDashboardPage = () => {
  const [selectedStoreId, setSelectedStoreId] = useState(dummyData.stores[0].id);
  const [selectedStore, setSelectedStore] = useState(dummyData.stores[0]);
  const router = useRouter();

  const handleStoreChange = (event: any) => {
    console.log(event.target.value);

    setSelectedStoreId(event.target.value);
    const selectedValue = dummyData.stores.find((val) => val.id == event.target.value);
    if (selectedValue) {
      setSelectedStore(selectedValue);
    }
  };

  const salesData = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June'],
    datasets: [
      {
        label: 'Sales',
        data: dummyData.sales[selectedStore.name],
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1
      }
    ]
  };

  const stockData = {
    labels: ['Product 1', 'Product 2', 'Product 3', 'Product 4', 'Product 5', 'Product 6'],
    datasets: [
      {
        label: 'Stock',
        data: dummyData.stock[selectedStore.name],
        backgroundColor: 'rgba(153, 102, 255, 0.2)',
        borderColor: 'rgba(153, 102, 255, 1)',
        borderWidth: 1
      }
    ]
  };

  interface AdminMenu {
    title: string;
    path: string;
    description: string;
    subTitles?: {
      subTitle: string;
      subTitlePath: string;
    }[];
    icon: any;
  }

  const adminMenus: AdminMenu[] = [
    {
      title: 'Manage Products',
      path: '/admin/products',
      description: 'Add, edit, delete, and see the list of your products',
      icon: FaShoppingCart
    },
    {
      title: 'Manage Stocks',
      path: '/admin/stocks',
      description: 'Add and edit stocks in stores',
      icon: FaBox
    },
    {
      title: 'Manage Categories',
      path: '/admin/categories',
      description: 'Add, edit, delete, and see the list of product categories',
      icon: FaClipboardList
    },
    {
      title: 'Manage Discounts',
      path: '/admin/discounts',
      description: 'Add, edit, delete, and see the list of discounts to be applied into product or order',
      icon: FaClipboardList
    },
    {
      title: 'See Reports',
      path: '/admin/reports',
      description: 'See daily, weekly, and monthly report on reports',
      subTitles: [
        { subTitle: 'See reports on selling', subTitlePath: '/admin/reports/sellings' },
        { subTitle: 'See reports on stock', subTitlePath: '/admin/reports/stocks' }
      ],
      icon: FaChartBar
    },
    {
      title: 'Manage Store Admins',
      description: 'Add, edit, delete, and see the list of store admins',
      path: '/admin/store-admins',
      icon: FaUser
    }
  ];

  const renderCard = (menu: AdminMenu) => {
    const Icon = menu.icon;

    return (
      <div
        key={menu.title}
        onClick={() => {
          router.push(menu.path);
        }}
        className="text-primary flex flex-row gap-5 border p-4 w-[300px] h-[100px] rounded-md hover:bg-[#22c55e1a] hover:cursor-pointer"
      >
        <Icon size={40} />
        <div className="flex flex-col gap-2">
          <div className="textlg font-semibold">{menu.title}</div>
          <div>{menu.description}</div>
        </div>
      </div>
    );
  };

  return (
    <div className="p-4">
      <div className="text-lg font-semibold">Admin Dashboard</div>
      <div className="p-4 w-1/2">
        <Select
          label="Store"
          labelPlacement="outside"
          placeholder="Select store"
          value={selectedStoreId}
          defaultSelectedKeys={selectedStoreId.toString()}
          renderValue={() => {
            return <span>{selectedStore.name}</span>;
          }}
          onChange={handleStoreChange}
        >
          {dummyData.stores.map((store) => (
            <SelectItem key={store.id} value={store.name}>
              {store.name}
            </SelectItem>
          ))}
        </Select>
      </div>
      <div className="flex flex-row gap-10 w-full p-4">
        <div className="w-full">
          <div className="text-base font-semibold">Sales Report</div>
          <Bar data={salesData} />
        </div>
        <div className="w-full">
          <div className="text-base font-semibold">Stock Report</div>
          <Bar data={stockData} />
        </div>
      </div>

      <div className="flex flex-wrap gap-4 justify-center py-5 my- w-full">
        {adminMenus.map((adminMenu) => {
          return renderCard(adminMenu);
        })}
      </div>
    </div>
  );
};

export default AdminDashboardPage;
