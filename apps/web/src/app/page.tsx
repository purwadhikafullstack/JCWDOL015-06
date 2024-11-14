// 'use client';

import CarouselHero from '@/components/LandingPage/CarouselHero';
import Categories from '@/components/LandingPage/Categories';
import NearestStoreWDiscounted from '@/components/LandingPage/NearestStoreWDiscounted';
import NearestStoreWTopProduct from '@/components/LandingPage/NearestStoreWTopProduct';
import { Wrapper } from '@/components/Wrapper';
// import { getCategoriesList } from '@/lib/category';
// import { getProductList } from '@/lib/product';
// import Image from 'next/image';
// import { useEffect, useState } from 'react';
// import { toast } from 'react-toastify';

export default function Home() {
  // const [products, setProducts] = useState<any[] | null>(null);
  // const [categories, setCategoriess] = useState<any[] | null>(null);

  // useEffect(() => {
  //   const fetchingProducts = async () => {
  //     console.log('HOME GETTING PRODUCTS');

  //     const { result } = await getProductList();

  //     if (result.status == 'ok') {
  //       console.log(result);

  //       toast.success('success products');

  //       setProducts(result.products);

  //       setCategoriess(result.categories);
  //     } else {
  //       toast.error(result.msg);
  //     }
  //   };

  //   fetchingProducts();
  // }, []);

  // useEffect(() => {
  //   const fetchingProducts = async () => {
  //     console.log('HOME GETTING PRODUCTS');

  //     const { result } = await getProductList();

  //     if (result.status == 'ok') {
  //       console.log(result);

  //       toast.success('success products');

  //       setProducts(result.products);
  //     } else {
  //       toast.error(result.msg);
  //     }
  //   };

  //   fetchingProducts();
  // }, []);

  // useEffect(() => {
  //   const fetchingCategories = async () => {
  //     console.log('HOME GETTING PRODUCTS');

  //     const { result } = await getCategoriesList();

  //     if (result.status == 'ok') {
  //       console.log(result);

  //       toast.success('success categories');

  //       setCategoriess(result.categories);
  //     } else {
  //       toast.error(result.msg);
  //     }
  //   };

  //   fetchingCategories();
  // }, []);

  return (
    <Wrapper additional="gap-5 bg-slate-200 py-5 lg:px-5">
      <CarouselHero />
      {/* <Categories categories={categories} /> */}
      <Categories />
      <NearestStoreWDiscounted />
      <NearestStoreWTopProduct />
    </Wrapper>
  );
}
