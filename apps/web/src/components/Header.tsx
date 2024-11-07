
import { Input, Button } from "@nextui-org/react";
import { FaShoppingCart } from 'react-icons/fa';

export const Header = () => {
  return (
    <header className="bg-white shadow-md p-4">
      <div className="max-w-screen-xl mx-auto flex justify-between items-center">
        {/* Logo */}
        <div className="text-3xl font-bold text-green-500">
          <a href="/">GroceryStore</a>
        </div>

        {/* Navigation */}
        <nav className="space-x-6 text-gray-700">
          <a href="/" className="hover:text-green-500">Home</a>
          <a href="/products" className="hover:text-green-500">Products</a>
          <a href="/about" className="hover:text-green-500">About</a>
          <a href="/contact" className="hover:text-green-500">Contact</a>
        </nav>

        {/* Search Bar */}
        <div className="flex items-center space-x-4">
          <Input
            aria-label="Search products"
            placeholder="Search..."
            isClearable
            className="w-72"
          />
          <Button className="relative">
            <FaShoppingCart />
            <span className="absolute top-0 right-0 text-xs bg-red-500 text-white rounded-full w-4 h-4 flex items-center justify-center">3</span>
          </Button>
        </div>
      </div>
    </header>
  );
};
