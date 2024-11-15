'use client';

import { Footer } from '@/components/Footer';
import { Header } from '@/components/Header';
import { NextUIProvider } from '@nextui-org/system';
import { useRouter, usePathname } from 'next/navigation';
import { ReactNode, useEffect, useState } from 'react';
import { Provider } from 'react-redux';
import store from '@/store';

export interface IMainProvidersProps {
  readonly children: ReactNode;
}

export function MainProviders({ children }: IMainProvidersProps) {
  const role = localStorage.getItem('userRole') as 'SUPER_ADMIN' | 'STORE_ADMIN' | 'USER';
  const router = useRouter();
  const pathName = usePathname();
  const hideHeaderFooter = pathName == '/no-permission' || pathName == '/login';

  useEffect(() => {
    if (!role) {
      router.push('/login');
      return;
    }
    if (role === 'USER' && pathName.includes('admin')) {
      router.push('/no-permission');
      return;
    }
    if (role !== 'USER' && pathName.includes('user')) {
      router.push('/no-permission');
      return;
    }
    if (role !== 'SUPER_ADMIN' && pathName == '/admin/store-admins') {
      router.push('/no-permission');
      return;
    }
  }, [pathName, role, router]);

  return (
    <Provider store={store}>
      <NextUIProvider navigate={router.push}>
        {!hideHeaderFooter && <Header />}
        <main className="flex-grow">{children}</main>
        {!hideHeaderFooter && <Footer />}
      </NextUIProvider>
    </Provider>
  );
}
