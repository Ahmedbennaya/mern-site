import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { FaInstagram, FaYoutube, FaTiktok, FaPinterest } from 'react-icons/fa';

const Footer = () => {
  const footerNavLinks = [
    { name: 'CURTAINS & DRAPES', path: '/curtains-drapes' },
    { name: 'BLINDS & SHADES', path: '/blinds-shades' },
    { name: 'SMART HOME', path: '/smart-home' },
    { name: 'FURNISHINGS', path: '/furnishings' },
    { name: 'PROJECTS', path: '/projects' },
    { name: 'FRANCHISE', path: '/franchise' },
  ];

  return (
    <footer className="bg-gray-800 text-white py-6">
      <div className="container mx-auto text-center">
        <h2 className="text-2xl font-bold mb-4">Stay Connected</h2>

        {/* Navigation Links */}
        <div className="flex justify-center space-x-8 mb-4">
          {footerNavLinks.map((link) => (
            <RouterLink 
              key={link.name} 
              to={link.path} 
              className="text-white hover:text-blue-500 transition-all duration-150"
            >
              {link.name}
            </RouterLink>
          ))}
        </div>

        {/* Subscribe Form */}
        <p className="mb-4">Subscribe to our newsletter for the latest updates.</p>
        <form className="mb-4">
          <input
            type="email"
            placeholder="Enter your email"
            className="py-2 px-4 rounded-l-full border border-gray-300"
          />
          <button className="bg-blue-500 text-white py-2 px-4 rounded-r-full hover:bg-blue-600 transition-all duration-150">
            Subscribe
          </button>
        </form>

        {/* Social Media Links */}
        <div className="flex justify-center space-x-4 mb-4">
          <button
            onClick={() => window.location.href = 'https://www.instagram.com/bargaoui_rideaux_tahar/'}
            className="hover:text-blue-500 transition-all duration-150"
          >
            <FaInstagram className="w-8 h-8 inline-block" />
          </button>
          <button
            onClick={() => window.location.href = 'https://www.youtube.com/@BargaouiRideauxTahar'}
            className="hover:text-blue-500 transition-all duration-150"
          >
            <FaYoutube className="w-8 h-8 inline-block" />
          </button>
          <button
            onClick={() => window.location.href = 'https://www.tiktok.com/@bargaouirideauxtahar'}
            className="hover:text-blue-500 transition-all duration-150"
          >
            <FaTiktok className="w-8 h-8 inline-block" />
          </button>
          <button
            onClick={() => window.location.href = 'https://www.pinterest.com/BargaouiRideauxTahar/'}
            className="hover:text-blue-500 transition-all duration-150"
          >
            <FaPinterest className="w-8 h-8 inline-block" />
          </button>
        </div>

        {/* Copyright */}
        <p className="text-sm">
          &copy; {new Date().getFullYear()} Your Company. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
