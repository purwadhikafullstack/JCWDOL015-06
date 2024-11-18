'use client';

import { Footer } from '@/components/Footer';
import { Header } from '@/components/Header';
import { NextUIProvider } from '@nextui-org/system';
import { useRouter, usePathname } from 'next/navigation';
import { ReactNode, useEffect, useState } from 'react';
import { Provider } from 'react-redux';
import store, { useAppSelector } from '@/store';
import { getToken } from '@/lib/cookie';
import { DecodedToken } from '@/types/account';
import { jwtDecode } from 'jwt-decode';
import { persistStore } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';

export interface IMainProvidersProps {
  readonly children: ReactNode;
}

const persistor = persistStore(store);

export function MainProviders({ children }: IMainProvidersProps) {
  // const role = localStorage.getItem('userRole') as 'SUPER_ADMIN' | 'STORE_ADMIN' | 'USER';
  const router = useRouter();
  const pathName = usePathname();
  const hideHeaderFooter =
    pathName == '/no-permission' ||
    pathName == '/login' ||
    pathName == '/user/change-password' ||
    pathName == '/register';

  useEffect(() => {
    const checkingAuthStatus = async () => {
      console.log('MAIN');

      const token = await getToken();

      console.log('GOT TOKEN');

      if (!token) {
        if (pathName !== '/user/change-password') {
          return;
        } else {
          console.log('MAIN DONE');
          router.push('/login');
          return;
        }
      } else {
        const decodedToken: DecodedToken = jwtDecode<DecodedToken>(token);

        console.log('TOKEN DECODED');

        console.log(decodedToken.userRole);

        if (decodedToken.userRole === 'USER' && pathName.includes('admin')) {
          console.log('MAIN DONE');
          router.push('/no-permission');
          return;
        }
        if (decodedToken.userRole !== 'USER' && pathName.includes('user')) {
          console.log('MAIN DONE');
          router.push('/no-permission');
          return;
        }
        if (decodedToken.userRole === 'USER' && decodedToken.isVerify === 0 && pathName == '/user/profile') {
          console.log('MAIN DONE');
          router.push('/not-verified');
          return;
        }

        if (
          decodedToken.userRole !== 'SUPER_ADMIN' &&
          (pathName == '/admin/store-admins' ||
            pathName == '/admin/producs/add-product' ||
            pathName.includes('/admin/producs/edit-product'))
        ) {
          console.log('MAIN DONE');
          router.push('/no-permission');
          return;
        }

        // if (decodedToken.userRole !== 'SUPER_ADMIN' && pathName.includes('admin')) {
        //   console.log('MAIN DONE');
        //   router.push('/no-permission');
        //   return;
        // }

        // if (decodedToken.userRole !== 'STORE_ADMIN' && pathName.includes('admin')) {
        //   console.log('MAIN DONE');
        //   router.push('/no-permission');
        //   return;
        // }

        if (decodedToken.userRole === 'USER' && pathName == '/') {
          router.push('/user');
          return;
        }

        if (decodedToken.userRole === 'STORE_ADMIN' && pathName == '/') {
          router.push('/admin');
          return;
        }

        if (decodedToken.userRole === 'SUPER_ADMIN' && pathName == '/') {
          router.push('/admin');
          return;
        }
      }
    };

    checkingAuthStatus();
  }, [pathName, router]);

  // useEffect(() => {
  //   if (!role) {
  //     router.push('/login');
  //     return;
  //   }
  //   if (role === 'USER' && pathName.includes('admin')) {
  //     router.push('/no-permission');
  //     return;
  //   }
  //   // if (role !== 'USER' && pathName.includes('user')) {
  //   //   router.push('/no-permission');
  //   //   return;
  //   // }
  //   if (
  //     role !== 'SUPER_ADMIN' &&
  //     (pathName == '/admin/store-admins' ||
  //       pathName == '/admin/producs/add-product' ||
  //       pathName.includes('/admin/producs/edit-product'))
  //   ) {
  //     router.push('/no-permission');
  //     return;
  //   }
  // }, [pathName, role, router]);

  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <NextUIProvider navigate={router.push}>
          {!hideHeaderFooter && <Header />}
          <main className="flex-grow">{children}</main>
          {!hideHeaderFooter && <Footer />}
        </NextUIProvider>
      </PersistGate>
    </Provider>
  );
}
