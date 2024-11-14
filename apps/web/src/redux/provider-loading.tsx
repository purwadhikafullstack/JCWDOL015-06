import { Spinner } from '@nextui-org/react';
import React from 'react';

const Loading = () => {
  return (
    <div className="fixed inset-0 w-screen h-screen flex items-center justify-center z-50 bg-gray-700 bg-opacity-30">
      <div className="flex flex-col bg-white bg-opacity-60 w-40 h-56 p-7 rounded-xl shadow-lg relative overflow-y-auto items-center text-center text-5xl">
      <Spinner label="Loading" color="success" labelColor="success"/>
      </div>
    </div>
  );
};

export default Loading;
