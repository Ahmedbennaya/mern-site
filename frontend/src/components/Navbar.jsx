import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../redux/userSlice';
import CartSidebar from './CartSidebar';
import { clearCredentials } from '../redux/features/authSlice';
import { FiPhone, FiMail, FiMapPin, FiChevronDown } from 'react-icons/fi'; // Importing icons
import { FaShoppingCart } from 'react-icons/fa'; // Shopping cart icon

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [promotionText] = useState('Great Deals for 2024');
  const [language, setLanguage] = useState('EN');
  const [showLangDropdown, setShowLangDropdown] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const { userInfo } = useSelector((state) => state.auth);
  
  const cartItemsCount = useSelector((state) => state.cart?.length || 0);

  const toggleMenu = () => setIsOpen(!isOpen);
  const toggleLangDropdown = () => setShowLangDropdown(!showLangDropdown);
  const toggleCart = () => setIsCartOpen(!isCartOpen);
  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  const logoutHandler = (e) => {
    e.preventDefault();
    dispatch(logout(navigate));
    dispatch(clearCredentials());
  };

  useEffect(() => {}, [userInfo]);

  const navLinks = [
    { name: 'CURTAINS & DRAPES', id: 'curtains-drapes', path: '/curtains-drapes' },
    { name: 'BLINDS & SHADES', id: 'blinds-shades', path: '/blinds-shades' },
    { name: 'SMART HOME', id: 'smart-home', path: '/smart-home' },
    { name: 'FURNISHINGS', id: 'furnishings', path: '/furnishings' },
    { name: 'PROJECTS', id: 'projects', path: '/projects' },
    { name: 'FRANCHISE', id: 'franchise', path: '/franchise' },
  ];

  const translatedNavLinks = {
    EN: navLinks,
    FR: [
      { name: 'RIDEAUX ET DRAPERIES', id: 'curtains-drapes', path: '/curtains-drapes' },
      { name: 'STORES ET OMBRES', id: 'blinds-shades', path: '/blinds-shades' },
      { name: 'MAISON INTELLIGENTE', id: 'smart-home', path: '/smart-home' },
      { name: 'AMEUBLEMENT', id: 'furnishings', path: '/furnishings' },
      { name: 'PROJETS', id: 'projects', path: '/projects' },
      { name: 'FRANCHISE', id: 'franchise', path: '/franchise' },
    ],
    AR: [
      { name: 'الستائر', id: 'curtains-drapes', path: '/curtains-drapes' },
      { name: 'الستائر والظلال', id: 'blinds-shades', path: '/blinds-shades' },
      { name: 'المنزل الذكي', id: 'smart-home', path: '/smart-home' },
      { name: 'الأثاث', id: 'furnishings', path: '/furnishings' },
      { name: 'المشاريع', id: 'projects', path: '/projects' },
      { name: 'الامتياز', id: 'franchise', path: '/franchise' },
    ],
  };

  return (
     <header className="sticky top-0 z-50 bg-white shadow-md">
      {/* Top Bar with Promotion and Contact Info */}
      <div className="bg-gray-800 text-white py-2">
        <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
          <div className="text-center w-full md:w-auto">
            <span className="block text-sm">{promotionText}</span>
          </div>

          {/* Contact and Language Selector */}
          <div className="flex items-center justify-center md:justify-end space-x-4">
            <div className="flex items-center space-x-3">
              <button onClick={() => window.location.href = 'tel:+21650929292'} className="text-white hover:underline" aria-label="Call us">
                <FiPhone className="inline-block h-5 w-5" />
              </button>
              <button onClick={() => window.location.href = 'mailto:bargaoui_rideaux@yahoo.fr'} className="text-white hover:underline" aria-label="Email us">
                <FiMail className="inline-block h-5 w-5" />
              </button>
              <button onClick={() => navigate('/stores')} className="text-white hover:underline" aria-label="Find store">
                <FiMapPin className="inline-block h-5 w-5" />
              </button>
            </div>

            {/* Language Dropdown */}
            <div className="relative">
              <button onClick={toggleLangDropdown} className="text-white hover:underline flex items-center" aria-label="Change language">
                {language === 'EN' ? 'English' : language === 'FR' ? 'Français' : 'عربي'}
                <FiChevronDown className="ml-1" />
              </button>
              {showLangDropdown && (
                <div className="absolute mt-2 right-0 w-32 bg-white shadow-lg rounded-md text-gray-700 z-10 transition ease-out duration-200">
                  <button
                    onClick={() => { setLanguage('EN'); setShowLangDropdown(false); }}
                    className="block px-4 py-2 hover:bg-gray-100 w-full text-left"
                  >
                    English
                  </button>
                  <button
                    onClick={() => { setLanguage('FR'); setShowLangDropdown(false); }}
                    className="block px-4 py-2 hover:bg-gray-100 w-full text-left"
                  >
                    Français
                  </button>
                  <button
                    onClick={() => { setLanguage('AR'); setShowLangDropdown(false); }}
                    className="block px-4 py-2 hover:bg-gray-100 w-full text-left"
                  >
                    عربي
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <nav className="bg-white">
        <div className="container mx-auto px-4 lg:px-8 py-4 flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <img src="https://res.cloudinary.com/dc1zy9h63/image/upload/v1727057529/LOGONOIR_vuiuld.png" alt="Bargaoui Tahar Logo" className="h-10 w-auto" />
          </Link>

          {/* Primary Navigation */}
          <div className="hidden lg:flex space-x-8">
            {navLinks.map((link) => (
              <Link key={link.id} to={link.path} className="text-gray-700 hover:text-gray-900 font-medium transition duration-200 ease-in-out">
                {link.name}
              </Link>
            ))}
          </div>

          {/* Cart Button + Secondary Navigation */}
          <div className="lg:flex hidden items-center space-x-4">
            {userInfo ? (
              <div className="flex items-center gap-2">
                <h3>{userInfo.LastName?.toUpperCase() || 'User'}</h3>
                <Link to="/profile">
                  <img src={userInfo.profileImage || 'https://via.placeholder.com/150'} className="h-11 w-11 rounded-full object-cover" alt="User Profile" />
                </Link>
                <button
                  onClick={logoutHandler}
                  className="inline-flex items-center justify-center rounded-xl bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm transition-all duration-150 hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-3">
                <Link
                  className="inline-flex items-center justify-center rounded-xl bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 transition-all duration-150 hover:bg-gray-50 hover:ring-gray-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-600"
                  to="/signin"
                >
                  Login
                </Link>
                <Link
                  className="inline-flex items-center justify-center rounded-xl bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm transition-all duration-150 hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                  to="/signup"
                >
                  Sign Up
                </Link>
              </div>
            )}

            {/* Cart Icon: Aligned to the right on larger screens */}
            <button onClick={toggleCart} className="relative">
              <FaShoppingCart className="text-gray-700 w-6 h-6" />
              {cartItemsCount > 0 && (
                <span className="absolute top-0 right-0 inline-block w-5 h-5 bg-red-500 text-white text-xs font-bold rounded-full text-center">
                  {cartItemsCount}
                </span>
              )}
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMobileMenu}
            className="lg:hidden flex items-center text-gray-700 hover:text-gray-900 transition duration-200 ease-in-out"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5M3.75 17.25h16.5" />
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden bg-white">
            <div className="container mx-auto px-4 py-6 flex flex-col items-center space-y-3">
              {navLinks.map((link) => (
                <Link key={link.id} to={link.path} className="block text-gray-700 hover:text-gray-900 font-medium">
                  {link.name}
                </Link>
              ))}

              {/* Centered Cart Icon for Mobile */}
              <button onClick={toggleCart} className="relative mx-auto mt-4">
                <FaShoppingCart className="text-gray-700 w-8 h-8" />
                {cartItemsCount > 0 && (
                  <span className="absolute top-0 right-0 inline-block w-5 h-5 bg-red-500 text-white text-xs font-bold rounded-full text-center">
                    {cartItemsCount}
                  </span>
                )}
              </button>
            </div>
          </div>
        )}
      </nav>

      {/* Cart Sidebar */}
      <CartSidebar isCartOpen={isCartOpen} toggleCart={toggleCart} />
    </header>
  );
};

export default Navbar;