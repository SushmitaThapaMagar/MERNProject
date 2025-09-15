"use client";
import { FaMapPin } from "react-icons/fa";
import { FaPhone } from "react-icons/fa";
import { CiMail } from "react-icons/ci";

const ContactUs = () => {
  return (
    <div className="mt-30 min-h-screen flex flex-col">
      {/* Main content */}
      <main className="flex-grow px-8 py-12 max-w-4xl mx-auto">
        {/* <h1 className="text-4xl font-bold text-center text-indigo-800 mb-6">
          Contact Us
        </h1> */}
        <p className="text-lg text-gray-700 text-center mb-10">
          Have questions or need support? We’d love to hear from you. Reach out
          to us anytime usin g the details below or send us a message.
        </p>

        {/* Contact details */}
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-white shadow-md rounded-xl p-6">
            <h2 className="text-xl font-semibold text-orange-600 mb-2">
              Get in Touch
            </h2>
            <p className=" flex items-center text-gray-600 mb-2 gap-2">
              <FaMapPin />
              Lalitpur, Nepal
            </p>
            <p className="flex items-center text-gray-600 mb-2 gap-2">
              <FaPhone /> +977-9829010000
            </p>
            <p className="flex items-center text-gray-600 mb-2 gap-2">
              <CiMail size={22} />
              collab@shopcartnepal.com
            </p>
          </div>

          {/* Contact form */}
          <div className="bg-white shadow-md rounded-xl p-6">
            <h2 className="text-xl font-semibold text-orange-600 mb-4">
              Send a Message
            </h2>
            <form className="flex flex-col gap-4">
              <input
                type="text"
                placeholder="Your Name"
                className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              <input
                type="email"
                placeholder="Your Email"
                className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              <textarea
                rows={4}
                placeholder="Your Message"
                className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              <button
                type="submit"
                className="bg-orange-600 text-white py-2 px-6 rounded-md font-semibold hover:bg-orange-700 transition-colors"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ContactUs;
