import { FaFacebookF, FaTwitter, FaInstagram } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white px-10 py-10 mt-20">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 items-center">
          <div className="text-center md:text-center">
            <h5 className="text-lg font-bold mb-4">About Us</h5>
            <p className="mb-4">
              Shop Cart Nepal is dedicated to providing the best online shopping
              experience. We value our customers and strive to meet their needs.
            </p>
            <p>Contact us for more information or inquiries.</p>
          </div>
          <div className="text-center md:text-center">
            <h5 className="text-lg font-bold mb-4">Quick Links</h5>
            <ul className="space-y-2">
              <li>
                <a href="#" className="hover:underline transition duration-300">
                  Home
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline transition duration-300">
                  Shop
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline transition duration-300">
                  About
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline transition duration-300">
                  Contact
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline transition duration-300">
                  FAQs
                </a>
              </li>
            </ul>
          </div>
          <div className="text-center md:text-center">
            <h5 className="text-lg font-bold mb-4">Customer Service</h5>
            <ul className="space-y-2">
              <li>
                <a href="#" className="hover:underline transition duration-300">
                  Returns
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline transition duration-300">
                  Shipping
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline transition duration-300">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline transition duration-300">
                  Terms of Service
                </a>
              </li>
            </ul>
          </div>
          <div className="text-center md:text-center">
            <h5 className="text-lg font-bold mb-4">Follow Us</h5>
            <div className="flex justify-center md:justify-center space-x-4">
              <a
                href="#"
                className="hover:text-blue-500 transition duration-300"
              >
                <FaFacebookF />
              </a>
              <a
                href="#"
                className="hover:text-blue-400 transition duration-300"
              >
                <FaTwitter />
              </a>
              <a
                href="#"
                className="hover:text-pink-500 transition duration-300"
              >
                <FaInstagram />
              </a>
            </div>
          </div>
        </div>
        <div className="mt-8 border-t border-gray-700 pt-4 text-center">
          <p className="text-sm">
            &copy; 2025 Shop Cart Nepal. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
