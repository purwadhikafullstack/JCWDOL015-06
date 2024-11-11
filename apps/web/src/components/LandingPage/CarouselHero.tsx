import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

const CarouselHero: React.FC = () => {
  const responsive = {
    desktop: {
      breakpoint: { max: 5000, min: 1024 },
      items: 2,
      slidesToSlide: 1, // optional, default to 1.
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
      slidesToSlide: 2, // optional, default to 1.
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
      slidesToSlide: 1, // optional, default to 1.
    },
  };

  return (
    <div className="w-screen h-fit px-0 border-2 border-red-600">
      {/* <Carousel
        swipeable={false}
        draggable={true}
        showDots={false}
        responsive={responsive}
        ssr={true} // means to render carousel on server-side.
        infinite={true}
        autoPlay={true}
        autoPlaySpeed={3000}
        keyBoardControl={false}
        customTransition="all .5"
        transitionDuration={500}
        containerClass="carousel-container"
        itemClass=""
        className="border-4 border-orange-600"
      >
        <div className="flex w-[90rem]  h-60 border-2 border-blue-400">
          <p>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Explicabo
            voluptates reiciendis, ducimus rem tenetur maxime illum nulla beatae
            aut minus cum repellendus qui ab. Aliquam pariatur obcaecati ea sit
            mollitia. Lorem ipsum dolor, sit amet consectetur adipisicing elit.
            Explicabo voluptates reiciendis, ducimus rem tenetur maxime illum
            nulla beatae aut minus cum repellendus qui ab. Aliquam pariatur
            obcaecati ea sit mollitia.
          </p>
        </div>
        <div className='flex w-full h-60 border-2 border-yellow-400'>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Explicabo voluptates reiciendis, ducimus rem tenetur maxime illum nulla beatae aut minus cum repellendus qui ab. Aliquam pariatur obcaecati ea sit mollitia.</div>
        <div className='flex w-full h-60 border-2 border-green-400'>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Explicabo voluptates reiciendis, ducimus rem tenetur maxime illum nulla beatae aut minus cum repellendus qui ab. Aliquam pariatur obcaecati ea sit mollitia.</div>
        <div className='flex w-full h-60 border-2 border-purple-400'>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Explicabo voluptates reiciendis, ducimus rem tenetur maxime illum nulla beatae aut minus cum repellendus qui ab. Aliquam pariatur obcaecati ea sit mollitia.</div>
      </Carousel> */}
      <Carousel
  additionalTransfrom={0}
  arrows
  autoPlaySpeed={3000}
  centerMode={false}
  className=""
  containerClass="carousel-container"
  dotListClass=""
  draggable
  focusOnSelect={false}
  infinite
  itemClass=""
  keyBoardControl
  minimumTouchDrag={80}
  pauseOnHover
  renderArrowsWhenDisabled={false}
  renderButtonGroupOutside={false}
  renderDotsOutside={false}
  responsive={{
    desktop: {
      breakpoint: {
        max: 3000,
        min: 1024
      },
      items: 1
    },
    mobile: {
      breakpoint: {
        max: 464,
        min: 0
      },
      items: 1
    },
    tablet: {
      breakpoint: {
        max: 1024,
        min: 464
      },
      items: 1
    }
  }}
  rewind={false}
  rewindWithAnimation={false}
  rtl={false}
  shouldResetAutoplay
  showDots
  sliderClass=""
  slidesToSlide={1}
  swipeable
>
  <img
    src="https://images.unsplash.com/photo-1549989476-69a92fa57c36?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60"
    style={{
      display: 'block',
      height: '50%',
      margin: 'auto',
      width: '100%'
    }}
  />
  <img
    src="https://images.unsplash.com/photo-1549396535-c11d5c55b9df?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60"
    style={{
      display: 'block',
      height: '50%',
      margin: 'auto',
      width: '100%'
    }}
  />
  <img
    src="https://images.unsplash.com/photo-1550133730-695473e544be?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60"
    style={{
      display: 'block',
      height: '50%',
      margin: 'auto',
      width: '100%'
    }}
  />
  <img
    src="https://images.unsplash.com/photo-1550167164-1b67c2be3973?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60"
    style={{
      display: 'block',
      height: '50%',
      margin: 'auto',
      width: '100%'
    }}
  />
  <img
    src="https://images.unsplash.com/photo-1550338861-b7cfeaf8ffd8?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60"
    style={{
      display: 'block',
      height: '50%',
      margin: 'auto',
      width: '100%'
    }}
  />
</Carousel>
    </div>
  );
};

export default CarouselHero;
