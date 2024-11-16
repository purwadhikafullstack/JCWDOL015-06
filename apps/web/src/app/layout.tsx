import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { MainProviders } from '../providers/main-providers';
import './globals.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'GroceryStore',
  description: 'Your one-stop shop for all your grocery needs'
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html suppressHydrationWarning lang="en" className="h-full">
      <head />
      <body className="flex flex-col">
        <MainProviders>{children}</MainProviders>
        <ToastContainer hideProgressBar={true} />
      </body>
    </html>
  );
}
