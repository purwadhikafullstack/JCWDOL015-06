'use client';

import React, { useState, useEffect } from 'react';
import { dummyProducts } from '@/data/dummyData';
import { useRouter } from 'next/navigation';
import { MdOutlineKeyboardArrowLeft, MdOutlineKeyboardArrowRight } from 'react-icons/md';

const Carousel: React.FC = () => {
  const router = useRouter();
  const promoProducts = dummyProducts.slice(0, 3);

  const [currentIndex, setCurrentIndex] = useState(0);

  const handleClick = (id: number) => {
    router.push(`/product/${id}`);
  };

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % promoProducts.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? promoProducts.length - 1 : prevIndex - 1));
  };

  useEffect(() => {
    const interval = setInterval(nextSlide, 3000);
    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="relative w-full p-4 mx-auto overflow-hidden">
      <div
        className="flex w-full transition-transform duration-700 ease-in-out"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {promoProducts.map((product) => (
          <div key={product.id} className="w-full flex-shrink-0 relative" onClick={() => handleClick(product.id)}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={product.imageUrls[0]} alt={product.productName} className="w-full h-[60vh] object-cover" />
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
        {promoProducts.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`h-2 w-2 rounded-full ${currentIndex === index ? 'bg-gray-800' : 'bg-gray-400'}`}
          ></button>
        ))}
      </div>
    </div>
  );
};

export default Carousel;
