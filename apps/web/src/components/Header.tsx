'use client';

// import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/redux/store';
import { setLogoutState } from '@/redux/slice/accountSlice';
import Login from './authentication/Login';
import Register from './authentication/Register';
import { Wrapper } from './Wrapper';
import { IoSearch, IoCartOutline } from 'react-icons/io5';
import { useEffect } from 'react';
import { deleteToken, getToken } from '@/lib/cookie';

const Header: React.FC = () => {
  // const [isOpen, setIsOpen] = useState(false)
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
    <div className="flex flex-wrap mx-auto w-full h-full m-0 flex-col">
      {/*  block lg:hidden */}
      <div className="border-2 flex flex-col gap-2 border-black h-fit">
        <h1>Location</h1>
        {accountState ? <h1>Youre Logged IN</h1> : <h1>Youre Log OUT</h1>}

        <button onClick={logoutAction}>Log out</button>
        {/* {accountState && <button onClick={logoutAction}>Log out</button>} */}
        {accountState && <h1>{emailState} - sss</h1>}
      </div>
      {/* Mobile-Tablet Nav */}
      <div className="flex flex-wrap flex-col lg:hidden">
        <div className="h-14 p-1 flex flex-wrap justify-between">
          <div className="flex justify-between items-center text-center w-36 border-2">
            <button>sidebar</button>
            {/* <button onClick={() => {setIsOpen(true)}}>Login</button> */}
            <h1>Icon</h1>
          </div>
          <div className="flex gap-2 justify-between items-center w-36 border-2">
            <IoSearch />
            <Login />
            <Register />
            <IoCartOutline />
          </div>
        </div>
        <div className="p-2 sm:h-10 lg:h-12">Categories</div>
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
    </div>
  );
};

export default Header;
