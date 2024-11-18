'use client';

import { useEffect } from 'react';
import useRoleBasedRedirect from '@/utils/redirectHelper';
import { Spinner } from '@nextui-org/react';
import { DecodedToken } from '@/types/account';
import { jwtDecode } from 'jwt-decode';
import { login, logout } from '@/store/slices/authSlice';
import { getToken } from '@/lib/cookie';
import { useAppDispatch, useAppSelector } from '@/store';

export default function Home() {
  const dispatch = useAppDispatch();

  // const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);

  useEffect(() => {
    const fetchingCredential = async () => {
      const token = await getToken();

      if (!token) {
        dispatch(logout());
      } 
      // else {
      //   const decodedToken: DecodedToken = jwtDecode<DecodedToken>(token);

      //   if (!isAuthenticated) {
      //     const setState: any = {
      //       userRole: decodedToken.userRole,
      //       id: decodedToken.id,
      //       email: decodedToken.email,
      //       isVerify: decodedToken.userRole
      //     };

      //     dispatch(login(setState));
      //   }
      // }
    };

    fetchingCredential();
  }, [dispatch]);

  useRoleBasedRedirect();

  return (
    <div className="min-w-[100vw] min-h-[100vh] flex gap-4 justify-center items-center">
      <Spinner size="lg" />
      <div className="text-xl font-bold self-center">Redirecting...</div>
    </div>
  );
}
