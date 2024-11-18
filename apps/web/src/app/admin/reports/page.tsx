'use client';

import React from 'react';
import { FaChartBar } from 'react-icons/fa';
import { useRouter } from 'next/navigation';

const NoPermissionPage: React.FC = () => {
  const router = useRouter();

  const handleGoBack = () => {
    router.back();
    router.back();
  };

  return (
    <div className="flex flex-col w-full h-[100vh] p-10 gap-4">
      <div className="text-xl font-semibold">Report</div>
      <div className="flex flex-row gap-2">
        <div
          onClick={() => {
            router.push('/admin/reports/order');
          }}
          className="text-primary flex flex-row gap-5 border p-4 w-[300px] h-[125px] rounded-md hover:bg-[#22c55e1a] hover:cursor-pointer"
        >
          <div className="max-h-[50px] max-w-[50px]">
            <FaChartBar className="w-[50px] h-[50px]" />
          </div>
          <div className="flex flex-col gap-2">
            <div className="textlg font-semibold">Reports on Order</div>
            <div>See daily, weekly, and monthly report on reports on stock</div>
          </div>
        </div>
        <div
          onClick={() => {
            router.push('/admin/reports/stock');
          }}
          className="text-primary flex flex-row gap-5 border p-4 w-[300px] h-[125px] rounded-md hover:bg-[#22c55e1a] hover:cursor-pointer"
        >
          <div className="max-h-[50px] max-w-[50px]">
            <FaChartBar className="w-[50px] h-[50px]" />
          </div>
          <div className="flex flex-col gap-2">
            <div className="textlg font-semibold">Reports on Stock</div>
            <div>See daily, weekly, and monthly report on reports on stock</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NoPermissionPage;
