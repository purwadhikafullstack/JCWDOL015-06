import Image from 'next/image';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

const CarouselHero: React.FC = () => {
  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 1
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 1
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 1
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1
    }
  };

  return (
    <Carousel responsive={responsive} slidesToSlide={1} swipeable={true} infinite={true} centerMode={false} focusOnSelect={false} showDots={true}  className='border-4 border-orange-600 w-screen'>
      <div className="w-full h-[30rem] flex gap-5">
        <Image
          alt="carousel-image"
          src="https://images.unsplash.com/photo-1549396535-c11d5c55b9df?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60"
          sizes="100vw"
          fill
        />
      </div>
      <div className="w-full h-[30rem]">
        <Image
          alt="carousel-image"
          src="https://images.unsplash.com/photo-1549396535-c11d5c55b9df?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60"
          sizes="100vw"
          fill
        />
      </div>
      <div className="w-full h-[30rem]">
        <Image
          alt="carousel-image"
          src="https://images.unsplash.com/photo-1549396535-c11d5c55b9df?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60"
          sizes="100vw"
          fill
        />
      </div>
      <div className="w-full h-[30rem]">
        <Image
          alt="carousel-image"
          src="https://images.unsplash.com/photo-1549396535-c11d5c55b9df?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60"
          sizes="100vw"
          fill
        />
      </div>
    </Carousel>
  );
};

export default CarouselHero;
