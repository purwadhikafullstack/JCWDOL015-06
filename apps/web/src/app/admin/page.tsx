'use client';

import React, { useCallback, useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { useRouter } from 'next/navigation';
import { FaBox, FaClipboardList, FaShoppingCart, FaChartBar, FaUser } from 'react-icons/fa';
import { Select, SelectItem } from '@nextui-org/react';
import { RiDiscountPercentLine } from 'react-icons/ri';
import { Role, Stock, Store, User } from '@/types/types';
import { fetchStocks } from '@/api/stock.api';
import { fetchStores } from '@/api/store.api';
import { toastFailed } from '@/utils/toastHelper';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const AdminDashboardPage = () => {
  const router = useRouter();
  const [selectedStoreId, setSelectedStoreId] = useState<string | null>(null);
  const [stores, setStores] = useState<Store[]>([]);
  const [stocks, setStocks] = useState<Stock[]>([]);

  const getStores = async () => {
    const response = await fetchStores();
    const stores = response.stores.map((store: any) => {
      return {
        ...store,
        id: String(store.id)
      };
    });
    setStores(stores);
  };

  const loadStocks = useCallback(async (storeId?: string) => {
    try {
      const user = JSON.parse(localStorage.getItem('user') ?? '{}') as unknown as User;
      const queryParams = { page: 1, pageSize: 5 } as { [key: string]: any };

      if (user.role === 'STORE_ADMIN') {
        storeId = String(user.store?.id);
      }
      if (storeId) {
        queryParams.storeId = Number(storeId);
      }
      const response = await fetchStocks(queryParams);
      setStocks(response.stocks);
    } catch (err) {
      toastFailed('Failed to fetch stock');
    }
  }, []);

  useEffect(() => {
    if (selectedStoreId) {
      loadStocks(String(selectedStoreId));
    }
  }, [selectedStoreId]);

  useEffect(() => {
    getStores();
    loadStocks();
  }, []);

  const [stockForChart, setStockForChart] = useState<Stock[]>(stocks.slice(0, 5));

  useEffect(() => {
    setStockForChart(stocks.slice(0, 5));
  }, [stocks]);

  const stockData = {
    labels: stockForChart.map((val) => {
      const name = val?.product?.productName;
      return name ?? '';
    }),
    datasets: [
      {
        label: 'Stock',
        data: stockForChart.map((val) => {
          return val.quantity;
        }),
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

  const userRole = localStorage.getItem('userRole') as Role;

  const adminMenus: AdminMenu[] = [
    {
      title: 'Products',
      path: '/admin/products',
      description:
        userRole == 'SUPER_ADMIN' ? 'Add, edit, delete, and see the list of your products' : 'See the list of products',
      icon: FaShoppingCart
    },
    {
      title: 'Stocks',
      path: '/admin/stocks',
      description: userRole == 'SUPER_ADMIN' ? 'Add and edit stocks in stores' : 'Add and edit stocks in your store',
      icon: FaBox
    },
    {
      title: 'Categories',
      path: '/admin/categories',
      description: 'Add, edit, delete, and see the list of product categories',
      icon: FaClipboardList
    },
    {
      title: 'Discounts',
      path: '/admin/discounts',
      description: 'Add, edit, delete, and see the list of discounts to be applied into product or order',
      icon: RiDiscountPercentLine
    },
    {
      title: 'Reports',
      path: '/admin/reports',
      description: 'See daily, weekly, and monthly report on reports',
      subTitles: [
        { subTitle: 'See reports on order', subTitlePath: '/admin/reports/order' },
        { subTitle: 'See reports on stock', subTitlePath: '/admin/reports/stock' }
      ],
      icon: FaChartBar
    }
  ];

  if (userRole == 'SUPER_ADMIN') {
    adminMenus.push({
      title: 'Store Admins',
      description: 'Add, edit, delete, and see the list of store admins',
      path: '/admin/store-admins',
      icon: FaUser
    });
  }

  const renderCard = (menu: AdminMenu) => {
    const Icon = menu.icon;

    return (
      <div
        key={menu.title}
        onClick={() => {
          router.push(menu.path);
        }}
        className="text-primary flex flex-row gap-5 border p-4 w-[300px] h-[150px] rounded-md hover:bg-[#22c55e1a] hover:cursor-pointer"
      >
        <div className="max-h-[50px] max-w-[50px]">
          <Icon className="w-[50px] h-[50px]" />
        </div>
        <div className="flex flex-col gap-2">
          <div className="textlg font-semibold">{menu.title}</div>
          <div>{menu.description}</div>
          <div>
            {menu.subTitles?.map((subTitle) => {
              return (
                <div
                  key={subTitle.subTitle}
                  onClick={(event) => {
                    event.stopPropagation();
                    router.push(subTitle.subTitlePath);
                  }}
                  className="text-primary hover:underline"
                >
                  {subTitle.subTitle}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  };

  const role = localStorage.getItem('userRole');

  return (
    <div className="p-4">
      <div className="text-lg font-semibold">Admin Dashboard</div>
      {role === 'SUPER_ADMIN' && (
        <div className="p-4 w-1/2">
          <Select
            fullWidth
            label="Select Store"
            placeholder="All store"
            onSelectionChange={(e) => {
              setSelectedStoreId(String(e.currentKey));
            }}
          >
            {stores.map((store) => (
              <SelectItem key={store.id} textValue={store?.name} value={store.name}>
                {store.name}
              </SelectItem>
            ))}
          </Select>
        </div>
      )}

      <div className="flex flex-row w-full p-4 justify-center items-center">
        <div className="h-[300px]">
          <div className="text-base font-semibold">Stock Report</div>
          <Bar className="h-full" data={stockData} />
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
