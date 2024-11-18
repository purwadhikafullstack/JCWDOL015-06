'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { Product } from '@/types/types';
import { useRouter } from 'next/navigation';
import { MdOutlineKeyboardArrowLeft, MdOutlineKeyboardArrowRight } from 'react-icons/md';
import { fetchProducts } from '@/api/product.api';
import { toastFailed } from '@/utils/toastHelper';
import { FaCircle } from 'react-icons/fa';

const Carousel: React.FC = () => {
  const router = useRouter();
  const [products, setProducts] = useState<Product[]>([]);

  const loadProducts = useCallback(async () => {
    try {
      const queryParams = { page: 1, pageSize: 5 } as { [key: string]: any };

      const response = await fetchProducts(queryParams);
      setProducts(response.products);
    } catch (err) {
      toastFailed('Failed to fetch products');
      setProducts([]);
    }
  }, []);

  useEffect(() => {
    loadProducts();
  }, [loadProducts]);

  const [currentIndex, setCurrentIndex] = useState(0);

  const handleClick = (id: number) => {
    router.push(`/product/${id}`);
  };

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % products.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? products.length - 1 : prevIndex - 1));
  };

  return (
    <div className="relative w-full p-4 mx-auto overflow-hidden">
      <div
        className="flex w-full transition-transform duration-700 ease-in-out"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {products.map((product) => (
          <div
            key={product.id}
            className="w-full flex-shrink-0 relative"
            onClick={() => handleClick(Number(product.id))}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={`http://localhost:8000/uploads/${product.imageUrls?.split(',')?.[0]}`}
              alt={product.productName}
              className="w-full h-[60vh] object-cover"
            />
          </div>
        ))}
      </div>

      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 p-2 text-white rounded-full hover:text-gray-800 z-10"
      >
        <MdOutlineKeyboardArrowLeft size={40} />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 p-2 text-white rounded-full hover:text-gray-800 z-10"
      >
        <MdOutlineKeyboardArrowRight size={40} />
      </button>

      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex justify-center space-x-2 z-10">
        {products.map((_, index) => (
          <button key={index} onClick={() => setCurrentIndex(index)}>
            <FaCircle size={12} className={`${currentIndex === index ? 'text-gray-800' : 'text-gray-400'}`} />
          </button>
        ))}
      </div>
    </div>
  );
};

export default Carousel;
