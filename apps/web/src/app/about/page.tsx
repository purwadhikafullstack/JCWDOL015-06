/* eslint-disable @next/next/no-img-element */
import React from 'react';

const AboutPage: React.FC = () => {
  return (
    <div className="p-8 min-h-screen items-center">
      <h1 className="text-3xl font-bold text-center mb-8">About Us</h1>
      <div className="text-8xl font-bold text-primary my-5 text-center">GroceryStore</div>
      <div className="text-lg text-center text-gray-500 mx-auto" style={{ maxWidth: '50%' }}>
        Welcome to our online grocery shopping platform. We aim to provide you with the freshest produce and a seamless
        shopping experience. Thank you for choosing us for your grocery needs.
      </div>
      <div className="p-4 mx-auto" style={{ maxWidth: '75%' }}>
        <div className="flex items-center mt-4">
          <img
            src="https://www.firstchoiceproduce.com/wp-content/uploads/2020/03/shop-featured-1024x683.jpg"
            alt="Fresh Produce"
            style={{ width: '40%', marginRight: '20px' }}
          />
          <div className="text-xl w-2/3">
            Our produce is sourced from local farms to ensure the highest quality and freshness. We believe in
            supporting local farmers and providing our customers with the best products available.
          </div>
        </div>
        <div className="flex items-center mt-4">
          <img
            src="https://assets1.progressivegrocer.com/images/v/max_width_1440/files/s3fs-public/2024-10/amazon-deliveringthefuture-pharmacy-standard-hero-v1-2000x1125-jpg80.jpg"
            alt="Seamless Shopping"
            style={{ width: '40%', marginRight: '20px' }}
          />
          <div className="text-xl w-2/3">
            Our platform is designed to offer a seamless shopping experience. With easy navigation and quick checkout,
            you can get your groceries delivered to your doorstep in no time.
          </div>
        </div>
        <div className="flex items-center mt-4">
          <img
            src="https://www.posnation.com/hubfs/Blog%20Featured%20Images/POS%20Nation%20Blog/retail%20customer%20service%20training.webp"
            alt="Customer Service"
            style={{ width: '40%', marginRight: '20px' }}
          />
          <div className="text-xl w-2/3">
            We pride ourselves on excellent customer service. If you have any questions or concerns, our support team is
            here to help you 24/7.
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
