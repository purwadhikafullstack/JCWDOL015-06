'use client';

import Carousel from '@/components/user/Carousel';
import { Button } from '@nextui-org/react';
import { useRouter } from 'next/navigation';
import { FaArrowRight } from 'react-icons/fa';

export default function HomePage() {
  const router = useRouter();

  return (
    <div className="max-w-[100vw] max-h-[100vh] p-4 flex flex-row gap-4">
      <div className="w-1/2 min-h-[100%] ml-10 flex flex-col gap-4 justify-center align-middle">
        <div className="text-3xl font-bold text-primary">GroceryStore</div>
        <div className="text-base text-black font-semibold">Your One-Stop Shop for Fresh and Organic Groceries</div>
        <div className="text-gray-700 pr-4">
          Save time and money with our unbeatable prices on top-quality groceries. Shop today and enjoy exclusive
          discounts.
        </div>
        <div>
          <Button
            onClick={() => {
              router.push('/user/products');
            }}
            className="text-white bg-primary border"
          >
            <span>See products</span>
            <FaArrowRight size={14} />
          </Button>
        </div>
      </div>

      <div className="w-full">
        <Carousel />
      </div>
    </div>
  );
}
