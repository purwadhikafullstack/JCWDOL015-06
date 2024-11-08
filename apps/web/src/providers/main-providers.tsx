'use client';

import { Footer } from '@/components/Footer';
import { Header } from '@/components/Header';
import { NextUIProvider } from '@nextui-org/system';
import { useRouter, usePathname } from 'next/navigation';
import { ReactNode } from 'react';

export interface IMainProvidersProps {
  readonly children: ReactNode;
}

export function MainProviders({ children }: IMainProvidersProps) {
  const router = useRouter();
  const pathName = usePathname();
  const hideHeaderFooter = pathName == '/no-permission';

  return (
    <NextUIProvider navigate={router.push}>
      {!hideHeaderFooter && <Header />}
      <main className="flex-grow">{children}</main>
      {!hideHeaderFooter && <Footer />}
    </NextUIProvider>
  );
}
