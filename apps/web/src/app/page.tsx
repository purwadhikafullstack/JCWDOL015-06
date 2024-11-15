'use client';

import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { login } from '@/store/slices/authSlice';
import useRoleBasedRedirect from '@/utils/redirectHelper';
import { Spinner } from '@nextui-org/react';

export default function Home() {
  const dispatch = useDispatch();

  useEffect(() => {
    const role = localStorage.getItem('userRole') as 'SUPER_ADMIN' | 'STORE_ADMIN' | 'USER';

    if (role) {
      dispatch(login({ role }));
    }
  }, [dispatch]);

  useRoleBasedRedirect();

  return (
    <div className="min-w-[100vw] min-h-[100vh] flex gap-4 justify-center items-center">
      <Spinner size="lg" />
      <div className="text-xl font-bold self-center">Redirecting...</div>
    </div>
  );
}
