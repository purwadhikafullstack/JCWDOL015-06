'use client';

import React from 'react';
import { Spacer, Button } from '@nextui-org/react';
import { IoIosWarning, IoIosArrowBack } from 'react-icons/io';
import { useRouter } from 'next/navigation';

const NoPermissionPage: React.FC = () => {
  const router = useRouter();

  const handleGoBack = () => {
    router.back();
    router.back();
  };

  return (
    <div className="flex flex-col w-full h-[100vh] justify-center items-center gap-4">
      <IoIosWarning color="red" size={80} />
      <div className="flex flex-col items-center">
        <Spacer y={1} />
        <div className="text-lg font-bold">No Permission</div>
        <p>You are not allowed to see this page.</p>
        <Button className="bg-transparent text-black py-2" onClick={handleGoBack}>
          <IoIosArrowBack />
          <span>Go back</span>
        </Button>
      </div>
    </div>
  );
};

export default NoPermissionPage;
