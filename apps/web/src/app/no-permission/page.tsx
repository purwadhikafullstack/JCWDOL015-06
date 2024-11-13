import React from 'react';
import { Spacer } from '@nextui-org/react';
import { IoIosWarning } from 'react-icons/io';

const NoPermissionPage: React.FC = () => {
  return (
    <div className="flex flex-col w-full h-[100vh] justify-center items-center gap-4">
      <IoIosWarning color="red" size={80} />
      <div className="flex flex-col items-center">
        <Spacer y={1} />
        <div className="text-lg font-bold">No Permission</div>
        <p>You are not allowed to see this page.</p>
      </div>
    </div>
  );
};

export default NoPermissionPage;
