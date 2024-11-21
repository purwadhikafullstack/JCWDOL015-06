'use client';

import { Button, Card, CardBody, CardFooter, CardHeader, Image } from '@nextui-org/react';
import { Wrapper } from '../Wrapper';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { Skeleton } from '@nextui-org/react';
import { getSpecials } from '@/api/product.api';
import { useAppSelector } from '@/store';
import { useRouter } from 'next/navigation';

const NearestStoreWDiscounted: React.FC = () => {
  const [products, setProducts] = useState<any[] | null>(null);
  const userId = useAppSelector((state) => state.auth.id);
  const router = useRouter();

  useEffect(() => {
    const fetchingProducts = async () => {
      console.log('HOME GETTING PRODUCTS');

      const { result } = await getSpecials(userId);

      if (result.status == 'ok') {
        console.log(result);

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

  function currencyFormat(num: number) {
    return (
      'Rp. ' +
      num
        .toFixed(2)
        .replace(/\d(?=(\d{3})+(?!\d))/g, '$&,')
        .replace(',', '.')
    );
  }

  return (
    <Wrapper additional=" radial-hero-lg flex-col lg:flex-row mb-5">
      <div className="basis-2/6 lg:basis-1/6 lg:h-[30rem] p-4 flex items-center text-center justify-center  text-xl lg:text-3xl font-semibold tracking-wide text-white bg-transparent lg:radial-hero-lg">
        <p>Special Deal Near You</p>
      </div>
      <div className="basis-4/6 lg:basis-5/6 w-full h-[30rem] overflow-x-auto flex flex-nowrap gap-4 py-2 px-2 lg:px-4 bg-transparent lg:bg-white">
        {products
          ? products.flatMap((p) => (
              <Card key={p.id} className="max-w-40 min-w-40 lg:max-w-64 lg:min-w-64 bg-white rounded-xl p-0 ">
                <CardHeader className="flex-col items-start p-0 ">
                  <Image
                    alt="Card background"
                    className="object-cover rounded-xl w-full h-40"
                    src={`${process.env.NEXT_PUBLIC_IMAGE_API_URL}/${p.imageUrls}`}
                    width={0}
                    height={0}
                    sizes="100vw"
                  />
                </CardHeader>
                <CardBody className="overflow-visible py-2 flex flex-col gap-3">
                  <h1 className="font-bold lg:text-large min-h-12 max-h-12 max-w-60 line-clamp-2">{p.productName}</h1>
                  <h2 className="font-semibold text-medium">{p.productDiscounts.length} ~ Discounts Available</h2>
                  <h2 className="font-semibold text-medium">{currencyFormat(p.price)}</h2>
                </CardBody>
                <CardFooter className="flex flex-col gap-3">
                  <Button
                    color="primary"
                    variant="ghost"
                    onPress={() => router.push(`/user/products/detail?id=${p.id}`)}
                  >
                    Detail
                  </Button>
                  {/* <Button color="primary" variant="ghost">
              + Add To Cart
            </Button> */}
                </CardFooter>
              </Card>
            ))
          : displaySkeleton()}
      </div>
    </Wrapper>
  );
};

export default NearestStoreWDiscounted;
