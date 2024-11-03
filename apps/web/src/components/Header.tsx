// 'use client'

// import { useState } from 'react';
import Login from './authentication/Login';
import Register from './authentication/Register';
import { Wrapper } from './Wrapper';
import { IoSearch, IoCartOutline } from "react-icons/io5";

const Header = () => {
  // const [isOpen, setIsOpen] = useState(false)
  return (
    <>
      <Wrapper additional="flex-col">
        {/*  block lg:hidden */}
        <div className="border-2 border-black sm:h-9 lg:h-10">
          Location
        </div>
        {/* Mobile-Tablet Nav */}
        <div className="flex flex-wrap flex-col lg:hidden">
          <div className="h-14 p-1 flex flex-wrap justify-between">
            <div className='flex justify-between items-center text-center w-36 border-2'>
              <button>sidebar</button>
              {/* <button onClick={() => {setIsOpen(true)}}>Login</button> */}
              <h1>Icon</h1>
            </div>
            <div className='flex gap-2 justify-between items-center w-36 border-2'>
              <IoSearch />
              <Login />
              <Register />
              <IoCartOutline />
            </div>
          </div>
          <div className="p-2 sm:h-10 lg:h-12">
            Categories
          </div>
        </div>
        {/* Dekstop Nav */}
        <div className="hidden lg:flex flex-wrap flex-col ">
          <div className="h-14 p-2">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit.
          </div>
          <div className="flex border-2 p-2 gap-4 border-black sm:h-10 lg:h-12">
            Cate
            <Login />
            <Register />
          </div>
        </div>
      </Wrapper>
    </>
  );
};

export default Header;
