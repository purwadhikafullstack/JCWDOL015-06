'use client';

import React, { useState } from 'react';

const Register: React.FC = () => {
  // Setting for modal
  const [isOpen, setIsOpen] = useState(false);
  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  return (
    <>
      <button className="btn btn-ghost btn-circle" onClick={openModal}>
        register
      </button>
      {/* isOpen &&  */}
      {isOpen && (
        <>
          <div className="fixed inset-0 w-screen h-screen flex items-center justify-center z-50 bg-gray-900 bg-opacity-50">
            <div className="bg-white flex flex-col w-11/12 h-[90%] lg:w-5/12 p-0 shadow-lg relative overflow-y-auto rounded-xl">
              {/* Close Button */}
              <div className="basis-4/12 border-2 border-red-600">
                <button
                  onClick={closeModal}
                  className="absolute top-2 right-4 rounded text-gray-600 hover:text-gray-900 text-xl "
                  aria-label="Close"
                >
                  &times;
                </button>
              </div>
              <div className="basis-8/12 border-2 border-black h-full">s</div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Register;
