'use client';

import { Button, Card, CardBody, CardFooter, CardHeader, Image } from '@nextui-org/react';
import { Wrapper } from '../Wrapper';
import { IoStorefrontOutline } from 'react-icons/io5';
import { getProductList } from '@/lib/product';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { Skeleton } from '@nextui-org/react';

const NearestStoreWTopProduct: React.FC = () => {
  const [products, setProducts] = useState<any[] | null>(null);
  useEffect(() => {
    const fetchingProducts = async () => {
      console.log('HOME GETTING PRODUCTS');

      const { result } = await getProductList();

      if (result.status == 'ok') {
        console.log(result);

        // toast.success('success products');

        setProducts(result.products);
      } else {
        toast.error(result.msg);
      }
    };

    fetchingProducts();
  }, []);

  function displaySkeleton() {
    let indents = [];
    for (let i = 0; i < 3; i++) {
      indents.push(<Skeleton className="flex max-w-40 min-w-40 lg:max-w-64 lg:min-w-64 bg-white rounded-xl" />);
    }
    return indents;
  }

  return (
    <Wrapper additional="flex-col px-2 py-5 gap-7 bg-white">
      <h1 className="pl-3 text-start text-xl tracking-widest font-bold ">Find Out Top Products</h1>
      <div className="flex gap-5 mx-auto w-full h-fit overflow-x-auto">
        {products
          ? products.flatMap((p) =>
              p.Stock.map((s: any) => (
                <Card key={p.id} className="max-w-40 min-w-40 lg:max-w-64 lg:min-w-64 bg-white rounded-xl p-0 ">
                  <CardHeader className="flex-col items-start p-0 ">
                    <Image
                      alt="Card background"
                      className="object-cover rounded-xl w-full"
                      src="https://nextui.org/images/hero-card-complete.jpeg"
                      width={0}
                      sizes="100vw"
                    />
                  </CardHeader>
                  <CardBody className="overflow-visible py-2 flex flex-col gap-3">
                    <h1 className="font-bold text-large min-h-14 max-h-14 max-w-60 line-clamp-2">{p.productName}</h1>
                    <div className="flex gap-2 items-center text-center font-medium">
                      <h2>
                        <IoStorefrontOutline />
                      </h2>
                      <h2>{s.store.name}</h2>
                    </div>
                    <h2>Discount Original price</h2>
                    <h2>Rp. {p.price}</h2>
                  </CardBody>
                  <CardFooter className="">
                    <Button color="primary" variant="ghost">
                      + Add To Cart
                    </Button>
                  </CardFooter>
                </Card>
              ))
            )
          : displaySkeleton()}
      </div>
    </Wrapper>
  );
};

export default NearestStoreWTopProduct;
