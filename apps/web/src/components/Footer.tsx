import { FaFacebookF, FaInstagram, FaTwitter, FaLinkedinIn } from 'react-icons/fa';

export const Footer = () => {
  return (
    <footer className="bg-primary text-white py-6 px-4 w-full">
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
          <a href="/about" className="hover:underline">
            About Us
          </a>
          <a href="/contact" className="hover:underline">
            Contact Us
          </a>
        </div>

        {/* Social Media */}
        <div className="flex space-x-4">
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:underline">
            <FaFacebookF />
          </a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:underline">
            <FaInstagram />
          </a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:underline">
            <FaTwitter />
          </a>
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:underline">
            <FaLinkedinIn />
          </a>
        </div>
      </div>
    </footer>
  );
};
