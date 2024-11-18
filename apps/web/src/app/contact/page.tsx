import React from 'react';
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaBuilding } from 'react-icons/fa';

const ContactCard = ({
  title,
  address,
  phone,
  email
}: {
  title: string;
  address: string;
  phone: string;
  email: string;
}) => (
  <div className="border rounded-lg shadow-md p-6 m-4 w-full max-w-sm text-gray-700 bg-white">
    <h2 className="text-xl font-semibold mb-4">{title}</h2>
    <div className="flex items-center mb-2">
      <FaMapMarkerAlt className="mr-2 text-gray-700" />
      <p>{address}</p>
    </div>
    <div className="flex items-center mb-2">
      <FaPhone className="mr-2 text-gray-700" />
      <p>{phone}</p>
    </div>
    <div className="flex items-center">
      <FaEnvelope className="mr-2 text-gray-700" />
      <p>{email}</p>
    </div>
  </div>
);

const ContactPage = () => {
  return (
    <div className="p-8 min-h-screen">
      <h1 className="text-3xl font-bold text-center mb-8">Contact Us</h1>

      <div className="flex justify-center mb-8 text-white">
        <div className="border rounded-lg shadow-lg p-8 bg-primary w-full max-w-md">
          <div className="flex items-center mb-4">
            <FaBuilding className="text-2xl mr-2 text-white" />
            <h2 className="text-2xl font-semibold">Head Office</h2>
          </div>
          <div className="flex items-center mb-2">
            <FaMapMarkerAlt className="mr-2 text-white" />
            <p>123 Main St, Downtown, City Center</p>
          </div>
          <div className="flex items-center mb-2">
            <FaPhone className="mr-2 text-white" />
            <p>+1 (234) 567-890</p>
          </div>
          <div className="flex items-center">
            <FaEnvelope className="mr-2 text-white" />
            <p>info@head-office.com</p>
          </div>
        </div>
      </div>

      <div className="flex flex-col md:flex-row justify-center gap-4">
        <ContactCard
          title="Store Jakarta"
          address="Jl. Thamrin No. 10, Jakarta"
          phone="+62 21 1234 5678"
          email="jakarta@store.com"
        />
        <ContactCard
          title="Store Bandung"
          address="Jl. Asia Afrika No. 15, Bandung"
          phone="+62 22 8765 4321"
          email="bandung@store.com"
        />
      </div>
    </div>
  );
};

export default ContactPage;
