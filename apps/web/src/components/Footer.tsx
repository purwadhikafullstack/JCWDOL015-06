// components/Footer.tsx
import { FaFacebookF, FaInstagram, FaTwitter, FaLinkedinIn } from 'react-icons/fa';

export const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-6 mt-8">
      <div className="max-w-screen-xl mx-auto flex justify-between items-start">
        {/* Contact Info */}
        <div className="space-y-2">
          <h3 className="text-lg font-bold">Contact Us</h3>
          <p>123 Grocery St., City, Country</p>
          <p>Email: contact@grocerystore.com</p>
          <p>Phone: +1 (234) 567-890</p>
        </div>

        {/* Quick Links */}
        <div className="space-y-2 flex flex-col">
          <h3 className="text-lg font-bold">Quick Links</h3>
          <a href="/about" className="hover:text-green-500">About Us</a>
          <a href="/contact" className="hover:text-green-500">Contact Us</a>
          <a href="/privacy-policy" className="hover:text-green-500">Privacy Policy</a>
          <a href="/terms" className="hover:text-green-500">Terms & Conditions</a>
        </div>

        {/* Social Media */}
        <div className="flex space-x-4">
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-green-500">
            <FaFacebookF size={24} />
          </a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-green-500">
            <FaInstagram size={24} />
          </a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-green-500">
            <FaTwitter size={24} />
          </a>
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-green-500">
            <FaLinkedinIn size={24} />
          </a>
        </div>
      </div>

      {/* Copyright */}
      <div className="text-center mt-6 text-sm">
        &copy; {new Date().getFullYear()} GroceryStore. All Rights Reserved.
      </div>
    </footer>
  );
};
