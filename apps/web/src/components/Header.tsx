'use client';

import { Avatar, Button, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from '@nextui-org/react';
import { FaShoppingCart } from 'react-icons/fa';
import { usePathname } from 'next/navigation';
import { useAppDispatch, useAppSelector } from '@/store';
import { logout } from '@/store/slices/authSlice';
import { deleteToken } from '@/lib/cookie';
import Swal from 'sweetalert2';
import { PiListMagnifyingGlassLight } from 'react-icons/pi';
import { useRouter } from 'next/navigation';

export const Header = () => {
  const currentRoute = usePathname();
  const dispatch = useAppDispatch();
  const userRole = useAppSelector((state) => state.auth.userRole);

  const router = useRouter();

  const logoutAction = async () => {
    const currentRole = userRole;

    dispatch(logout());

    await deleteToken();

    Swal.fire({
      titleText: `Successfully Logged Out`,
      icon: 'success',
      confirmButtonText: 'Ok',
      timer: 4000
    });

    router.push(currentRole == 'USER' ? '/user' : '/login');
  };

  return (
    <header className="bg-white shadow-md p-4">
      <div className="max-w-screen-xl mx-auto flex justify-between items-center">
        {/* Logo */}
        <div className="md:text-3xl font-bold text-primary flex gap-2">
          <div className="visible md:hidden w-fit h-fit">
            <Dropdown placement="bottom-start">
              <DropdownTrigger>
                <PiListMagnifyingGlassLight size={'1.4rem'} />
              </DropdownTrigger>
              <DropdownMenu aria-label="Static Actions">
                <DropdownItem key="new" onPress={() => router.push('/user')}>
                  Home
                </DropdownItem>
                <DropdownItem key="new" onPress={() => router.push('/user/products')}>
                  Products
                </DropdownItem>
                <DropdownItem key="new" onPress={() => router.push('/about')}>
                  About
                </DropdownItem>
                <DropdownItem key="new" onPress={() => router.push('/contact')}>
                  Contact
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </div>
          <a href="/">GroceryStore</a>
        </div>

        <div className="visible md:hidden w-fit">
          <Dropdown>
            <DropdownTrigger>
              <Avatar isBordered color="success" src="https://i.pravatar.cc/150?u=a042581f4e29026704d" size="sm" />
            </DropdownTrigger>
            <DropdownMenu aria-label="Static Actions">
              <DropdownItem key="new" onPress={() => router.push('/user/profile')}>
                Profile
              </DropdownItem>
              <DropdownItem key="delete" onPress={logoutAction} className="text-danger" color="danger">
                Logout
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </div>

        {/* Navigation */}
        <nav className="space-x-6 text-gray-700 hidden md:flex items-center sm:visible w-fit">
          <a
            href={userRole == 'USER' ? '/user' : '/admin'}
            className={`hover:text-black ${currentRoute === (userRole == 'USER' ? '/user' : '/admin') ? 'text-primary' : ''}`}
          >
            Home
          </a>
          <a
            href={userRole == 'USER' ? '/user/products' : '/admin/products'}
            className={`hover:text-black ${currentRoute === (userRole == 'USER' ? '/user/products' : '/admin/products') ? 'text-primary' : ''}`}
          >
            Products
          </a>
          <a href="/about" className={`hover:text-black ${currentRoute === '/about' ? 'text-primary' : ''}`}>
            About
          </a>
          <a href="/contact" className={`hover:text-black ${currentRoute === '/contact' ? 'text-primary' : ''}`}>
            Contact
          </a>
          {userRole == 'USER' && (
            <Button className="relative">
              <FaShoppingCart />
              <span className="absolute top-0 right-0 text-xs bg-red-500 text-white rounded-full w-4 h-4 flex items-center justify-center">
                3
              </span>
            </Button>
          )}

          {userRole === 'USER' && (
            <div className="w-fit">
              <Dropdown>
                <DropdownTrigger>
                  <Avatar isBordered color="success" src="https://i.pravatar.cc/150?u=a042581f4e29026704d" size="md" />
                </DropdownTrigger>
                <DropdownMenu aria-label="Static Actions">
                  <DropdownItem key="new" onPress={() => router.push('/user/profile')}>
                    Profile
                  </DropdownItem>
                  <DropdownItem key="delete" onPress={logoutAction} className="text-danger" color="danger">
                    Logout
                  </DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </div>
          )}

          {(userRole === 'STORE_ADMIN' || userRole === 'SUPER_ADMIN') && (
            <div className="w-fit">
              <Dropdown>
                <DropdownTrigger>
                  <Avatar isBordered color="success" src="https://i.pravatar.cc/150?u=a042581f4e29026704d" size="md" />
                </DropdownTrigger>
                <DropdownMenu aria-label="Static Actions">
                  <DropdownItem key="delete" onPress={logoutAction} className="text-danger" color="danger">
                    Logout
                  </DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </div>
          )}

          {!userRole && (
            <a href="/login">
              <Button color="primary" variant="ghost">
                Sign In/Sign Up
              </Button>
            </a>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
