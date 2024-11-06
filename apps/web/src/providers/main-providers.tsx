'use client';

import { NextUIProvider } from '@nextui-org/system';
import { useRouter } from 'next/navigation';
import { ReactNode } from 'react';

export interface IMainProvidersProps {
  readonly children: ReactNode;
}

export function MainProviders({ children }: IMainProvidersProps) {
  const router = useRouter();

  return (
    <NextUIProvider navigate={router.push}>
      {children}
    </NextUIProvider>
  );
}
