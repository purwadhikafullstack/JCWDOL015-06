'use client';

import React, { useEffect } from 'react';
import { useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { useRouter } from 'next/navigation';
import { FaBox, FaClipboardList, FaShoppingCart, FaChartBar, FaUser } from 'react-icons/fa';
import { Select, SelectItem } from '@nextui-org/react';
import { RiDiscountPercentLine } from 'react-icons/ri';
import { dummyData, dummyProducts, dummyStocks, dummyStores } from '@/data/dummyData';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

interface ProductQuantity {
  productId: number;
  totalQuantity: number;
}

const AdminDashboardPage = () => {
  const router = useRouter();
  const [selectedStoreId, setSelectedStoreId] = useState(dummyStores[0].id);
  const [selectedStore, setSelectedStore] = useState(dummyStores[0]);

  const sortProductsByTotalQuantity = (storeId?: number) => {
    const productQuantities: ProductQuantity[] = [];

    let stocks = [...dummyStocks];

    stocks.forEach((stock) => {
      //cek apakah stock.storeId == storeId || !storeId
      //jika ya, cek apakah di array productQuantities sudah ada productId ini
      //jika ya, cari di index ke berapa, totalQuantity = totalQuantity + stock.quantity
      //jika tidak, productQuantities.push({productId: stock.productId, totalQuantity: stock.quantity})
      //jika tidak, skip
      if (stock.storeId == storeId || !storeId) {
        const findIndex = productQuantities.findIndex((val) => val.productId == stock.productId);
        if (findIndex < 0) {
          productQuantities.push({ productId: stock.productId, totalQuantity: stock.quantity });
        } else {
          productQuantities[findIndex].totalQuantity = productQuantities[findIndex].totalQuantity + stock.quantity;
        }
      }
    });

    productQuantities.sort((a, b) => b.totalQuantity - a.totalQuantity);

    return productQuantities.slice(0, 5);
  };

  const [stockForChart, setStockForChart] = useState<ProductQuantity[]>(sortProductsByTotalQuantity(dummyStores[0].id));

  const handleStoreChange = (event: any) => {
    setSelectedStoreId(event.target.value);
    const selectedValue = dummyStores.find((val) => val.id == event.target.value);

    console.log(event.target.value);
    setStockForChart(sortProductsByTotalQuantity(event.target.value));

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
    labels: stockForChart.map((val) => {
      const name = dummyProducts.find((product) => product.id == val.productId)?.productName;
      return name ?? '';
    }),
    datasets: [
      {
        label: 'Stock',
        data: stockForChart.map((val) => {
          return val.totalQuantity;
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
      icon: RiDiscountPercentLine
    },
    {
      title: 'See Reports',
      path: '/admin/reports',
      description: 'See daily, weekly, and monthly report on reports',
      subTitles: [
        { subTitle: 'See reports on order', subTitlePath: '/admin/reports/sellings' },
        { subTitle: 'See reports on stock', subTitlePath: '/admin/reports/stocks' }
      ],
      icon: FaChartBar
    }
  ];

  if (localStorage.getItem('userRole') === 'SUPER_ADMIN') {
    adminMenus.push({
      title: 'Manage Store Admins',
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
                  onClick={() => {
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
            {dummyStores.map((store) => (
              <SelectItem key={store.id} value={store.name}>
                {store.name}
              </SelectItem>
            ))}
          </Select>
        </div>
      )}

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
