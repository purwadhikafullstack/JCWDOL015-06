'use client';

import { useAppDispatch, useAppSelector } from '@/redux/store';
import { setLogoutState } from '@/redux/slice/accountSlice';
import Login from './authentication/Login';
import Register from './authentication/Register';
import { Wrapper } from './Wrapper';
import { IoSearch, IoCartOutline } from 'react-icons/io5';
import { useEffect } from 'react';
import { deleteToken, getToken } from '@/lib/cookie';
import { Input, Button } from '@nextui-org/react';
import { FaShoppingCart } from 'react-icons/fa';

export const Header: React.FC = () => {
  const dispatch = useAppDispatch();

  const accountState = useAppSelector((state) => state.account.accountState);

  const emailState = useAppSelector((state) => state.account.email);

  useEffect(() => {
    console.log('Header Starts');

    const checkingLoginStatus = async () => {
      const token = await getToken();

      console.log('\n HEADER CHECKING TOKEN');
      console.log(token);      

      if (!token) dispatch(setLogoutState());
    };

    checkingLoginStatus();
  }, [dispatch]);

  const logoutAction = async () => {
    await deleteToken();

    dispatch(setLogoutState());
  };
  
  return (
    <header className="bg-white shadow-md p-4">
      <div className="max-w-screen-xl mx-auto flex justify-between items-center">
        {/* Logo */}
        <div className="text-3xl font-bold text-primary">
          <a href="/">GroceryStore</a>
        </div>

        {/* Navigation */}
        <nav className="space-x-6 text-gray-700">
          <a href="/" className="hover:text-primary">
            Home
          </a>
          <a href="/products" className="hover:text-primary">
            Products
          </a>
          <a href="/about" className="hover:text-primary">
            About
          </a>
          <a href="/contact" className="hover:text-primary">
            Contact
          </a>
        </nav>

        {/* Search Bar */}
        <div className="flex items-center space-x-4">
          <Input aria-label="Search products" placeholder="Search..." isClearable className="w-72" />
          <Button className="relative">
            <FaShoppingCart />
            <span className="absolute top-0 right-0 text-xs bg-red-500 text-white rounded-full w-4 h-4 flex items-center justify-center">
              3
            </span>
          </Button>
        </div>

        {accountState ? (
          <div className='p-3'>
            <button onClick={logoutAction}>Log out</button>
          </div>
        ) : (
          <div className='p-3 flex gap-2'>
            <Login />
            <Register />
          </div>
        )}

        
      </div>
    </header>
  );
};

export default Header;
