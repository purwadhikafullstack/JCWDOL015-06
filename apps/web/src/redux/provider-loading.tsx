import React from 'react';

const Loading = () => {
  return (
    <div className="fixed inset-0 w-screen h-screen flex items-center justify-center z-50 bg-gray-900 bg-opacity-30">
      <div className="bg-white bg-opacity-60 flex flex-col w-fit h-fit p-7 rounded-xl shadow-lg relative overflow-y-auto items-center text-center text-5xl">
        <span className="loading loading-ring loading-lg">.</span>
        <h1>Loading</h1>
      </div>
    </div>
  );
};

export default Loading;
