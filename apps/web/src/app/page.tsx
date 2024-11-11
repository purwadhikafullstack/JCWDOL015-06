'use client';

import Carousel from '@/components/LandingPage/CarouselHero';
import Categories from '@/components/LandingPage/Categories';
import NearestStoreWTopProduct from '@/components/LandingPage/NearestStoreWTopProduct';
import { Wrapper } from '@/components/Wrapper';
import { getProductList } from '@/lib/product';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

export default function Home() {
  const [products, setProducts] = useState<any[] | null>(null);
  const [categories, setCategoriess] = useState<any[] | null>(null);

  useEffect(() => {
    const fetchingProducts = async () => {
      console.log('HOME GETTING PRODUCTS');

      const { result } = await getProductList();

      if (result.status == 'ok') {
        console.log(result);

        toast.success('success products');

        setProducts(result.products);

        setCategoriess(result.categories);
      } else {
        toast.error(result.msg);
      }
    };

    fetchingProducts();
  }, []);

  return (
    <Wrapper additional="gap-5">
      <Carousel />
      <Categories categories={categories} />
      <NearestStoreWTopProduct />
      <div className="flex flex-col w-full h-fit p-4 border-2 border-blue-700">
        {!products ? (
          <h1>Here Is Product List</h1>
        ) : (
          products.map((p: any) => (
            <div key={p.id}>
              <h1>{p.productName}</h1>
            </div>
          ))
        )}

        {!categories ? (
          <h1>Here Is Product List</h1>
        ) : (
          categories.map((c: any) => (
            <div key={c.id}>
              <h1>{c.categoryName}</h1>
            </div>
          ))
        )}
      </div>
    </Wrapper>
  );
}
