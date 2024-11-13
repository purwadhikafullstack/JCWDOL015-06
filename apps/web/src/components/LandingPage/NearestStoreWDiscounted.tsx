import { Button, Card, CardBody, CardFooter, CardHeader, Image } from '@nextui-org/react';
import { Wrapper } from '../Wrapper';
import { IoStorefrontOutline } from 'react-icons/io5';

const NearestStoreWDiscounted: React.FC = () => {
  return (
    <Wrapper additional="h-fit">
      <div className="border-0 border-green-500 m-0 flex flex-col h-fit w-full radial-hero-lg">
        <div className="basis-2/6 lg:basis-1/6 h-full content-center items-center p-4 text-center text-xl lg:text-3xl font-semibold tracking-wide text-white bg-transparent lg:radial-hero-lg">
          <h1>Special Deal</h1>
        </div>
        <div className="basis-4/6 lg:basis-5/6 w-full h-full overflow-x-auto flex flex-nowrap gap-4 py-2 lg:px-4 bg-transparent lg:bg-white">
          <Card className="max-w-40 min-w-40 lg:max-w-80 lg:min-w-80 bg-white rounded-xl p-0 border-4">
            <CardHeader className="flex-col items-start p-0 border-4">
              <Image
                alt="Card background"
                className="object-cover rounded-xl w-full"
                src="https://nextui.org/images/hero-card-complete.jpeg"
                width={0}
                sizes='100vw'
              />
            </CardHeader>
            <CardBody className="overflow-visible py-2 flex flex-col gap-3">
              <h1 className="font-bold text-large">Product Name Lorem Ipsum Dolor Sit Amet</h1>
              <div className="flex gap-2 items-center text-center font-medium text-justify">
                <h2>
                  <IoStorefrontOutline />
                </h2>
                <h2>Store Name</h2>
              </div>
              <h2>Discount Original price</h2>
              <h2>Price</h2>
            </CardBody>
            <CardFooter className="">
              <Button color="primary" variant="ghost">
                + Add To Cart
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </Wrapper>
  );
};

export default NearestStoreWDiscounted;
