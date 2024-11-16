'use client';

import { Button } from '@nextui-org/react';
import { FaShoppingCart } from 'react-icons/fa';
import { usePathname } from 'next/navigation';

export const Header = () => {
  const role = localStorage.getItem('userRole') as 'SUPER_ADMIN' | 'STORE_ADMIN' | 'USER';
  const currentRoute = usePathname();

  return (
    <header className="bg-white shadow-md p-4">
      <div className="max-w-screen-xl mx-auto flex justify-between items-center">
        {/* Logo */}
        <div className="text-3xl font-bold text-primary">
          <a href="/">GroceryStore</a>
        </div>

        {/* Navigation */}
        <nav className="space-x-6 text-gray-700 invisible sm:visible">
          <a
            href={role == 'USER' ? '/user' : '/admin'}
            className={`hover:text-black ${currentRoute === (role == 'USER' ? '/user' : '/admin') ? 'text-primary' : ''}`}
          >
            Home
          </a>
          <a
            href={role == 'USER' ? '/user/products' : '/admin/products'}
            className={`hover:text-black ${currentRoute === (role == 'USER' ? '/user/products' : '/admin/products') ? 'text-primary' : ''}`}
          >
            Products
          </a>
          <a href="/about" className={`hover:text-black ${currentRoute === '/about' ? 'text-primary' : ''}`}>
            About
          </a>
          <a href="/contact" className={`hover:text-black ${currentRoute === '/contact' ? 'text-primary' : ''}`}>
            Contact
          </a>
          {role == 'USER' && (
            <Button className="relative">
              <FaShoppingCart />
              <span className="absolute top-0 right-0 text-xs bg-red-500 text-white rounded-full w-4 h-4 flex items-center justify-center">
                3
              </span>
            </Button>
          )}
        </nav>
      </div>
    </header>
  );
};
