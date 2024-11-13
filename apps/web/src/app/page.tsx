'use client';

import Carousel from '@/components/LandingPage/CarouselHero';
import Categories from '@/components/LandingPage/Categories';
import NearestStoreWDiscounted from '@/components/LandingPage/NearestStoreWDiscounted';
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
    <Wrapper additional="gap-5 bg-slate-200 py-5 lg:px-5">
      <Carousel />
      <Categories categories={categories} />
      {/* <div className="w-full h-[15rem] p-4 relative">
        <Image
          alt="carousel-image"
          src="https://images.unsplash.com/photo-1549989476-69a92fa57c36?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60"
          sizes="100vw"
          fill
        />
      </div> */}
      <NearestStoreWDiscounted />
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
