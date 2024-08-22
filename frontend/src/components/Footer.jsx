import React from 'react';
import { Link as RouterLink } from 'react-router-dom'; // Import Link from react-router-dom
import { FaInstagram, FaYoutube, FaTiktok, FaPinterest } from 'react-icons/fa'; // Import specific icons from react-icons

const Footer = () => {
  const handleExternalLink = (url) => {
    window.location.href = url;
  };

  return (
    <footer className="bg-gray-800 text-white py-6">
      <div className="container mx-auto text-center">
        <h2 className="text-2xl font-bold mb-4">Stay Connected</h2>
        <p className="mb-4">Subscribe to our newsletter for the latest updates.</p>
        <form className="mb-4">
          <input
            type="email"
            placeholder="Enter your email"
            className="py-2 px-4 rounded-l-full border border-gray-300"
          />
          <button className="bg-blue-500 text-white py-2 px-4 rounded-r-full hover:bg-blue-600">
            Subscribe
          </button>
        </form>
        <div className="flex justify-center space-x-4 mb-4">
          <button
            onClick={() => handleExternalLink('https://www.instagram.com/bargaoui_rideaux_tahar/')}
            className="hover:text-blue-500"
          >
            <FaInstagram className="w-8 h-8 inline-block" />
          </button>
          <button
            onClick={() => handleExternalLink('https://www.youtube.com/@BargaouiRideauxTahar')}
            className="hover:text-blue-500"
          >
            <FaYoutube className="w-8 h-8 inline-block" />
          </button>
          <button
            onClick={() => handleExternalLink('https://www.tiktok.com/@bargaouirideauxtahar')}
            className="hover:text-blue-500"
          >
            <FaTiktok className="w-8 h-8 inline-block" />
          </button>
          <button
            onClick={() => handleExternalLink('https://www.pinterest.com/BargaouiRideauxTahar/')}
            className="hover:text-blue-500"
          >
            <FaPinterest className="w-8 h-8 inline-block" />
          </button>
        </div>
        <p className="text-sm">
          &copy; {new Date().getFullYear()} Your Company. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
