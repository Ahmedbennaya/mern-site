import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../redux/userSlice';
import logo from '../assets/logo/LOGONOIR.png';
import shopping from '../assets/logo/shoping.png';
import CartSidebar from './CartSidebar';
import { clearCredentials } from '../redux/features/authSlice';
import { FiPhone, FiMail, FiMapPin, FiChevronDown } from 'react-icons/fi'; // Importing icons

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [promotionText, setPromotionText] = useState('Great Deals for 2024');
  const [language, setLanguage] = useState('EN');
  const [showLangDropdown, setShowLangDropdown] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userInfo } = useSelector((state) => state.auth);

  // Safely check if cart exists before accessing length
  const cartItemsCount = useSelector((state) => state.cart?.length || 0);

  const toggleMenu = () => setIsOpen(!isOpen);
  const toggleLangDropdown = () => setShowLangDropdown(!showLangDropdown);
  const toggleCart = () => setIsCartOpen(!isCartOpen);

  const handlePhoneClick = () => {
    window.location.href = 'tel:+21650929292';
  };

  const handleEmailClick = () => {
    window.location.href = 'mailto:bargaoui_rideaux@yahoo.fr';
  };

  const handleFindStoreClick = () => {
    navigate('/stores');
  };

  const logoutHandler = (e) => {
    e.preventDefault();
    dispatch(logout(navigate));
    dispatch(clearCredentials());
  };

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
    <header>
      {/* Top Bar with Promotion and Contact Info */}
      <div className="bg-gray-800 text-white py-2">
        <div className="container mx-auto flex justify-between items-center">
          {/* Promotion Text */}
          <div className="text-center w-full lg:w-auto">
            <span className="block text-sm">{promotionText}</span>
          </div>

          {/* Contact and Language Selector */}
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-3">
              <button onClick={handlePhoneClick} className="text-white hover:underline" aria-label="Call us">
                <FiPhone className="inline-block h-5 w-5" />
              </button>
              <button onClick={handleEmailClick} className="text-white hover:underline" aria-label="Email us">
                <FiMail className="inline-block h-5 w-5" />
              </button>
              <button onClick={handleFindStoreClick} className="text-white hover:underline" aria-label="Find store">
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
                    onClick={() => {
                      setLanguage('EN');
                      setShowLangDropdown(false);
                    }}
                    className="block px-4 py-2 hover:bg-gray-100 w-full text-left"
                  >
                    English
                  </button>
                  <button
                    onClick={() => {
                      setLanguage('FR');
                      setShowLangDropdown(false);
                    }}
                    className="block px-4 py-2 hover:bg-gray-100 w-full text-left"
                  >
                    Français
                  </button>
                  <button
                    onClick={() => {
                      setLanguage('AR');
                      setShowLangDropdown(false);
                    }}
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
      <nav className="bg-white shadow-md">
        <div className="container mx-auto px-4 lg:px-8 py-4 flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <img src={logo} alt="Bargaoui Tahar Logo" className="h-10" />
          </Link>

          {/* Primary Navigation */}
          <div className="hidden lg:flex space-x-8">
            {translatedNavLinks[language].map((link) => (
              <Link key={link.id} to={link.path} className="text-gray-700 hover:text-gray-900 font-medium transition duration-200 ease-in-out">
                {link.name}
              </Link>
            ))}

            {/* Add Admin Link for Admin Users */}
            {userInfo?.isAdmin && (
              <Link to="/admin" className="text-gray-700 hover:text-gray-900 font-medium transition duration-200 ease-in-out">
                Admin
              </Link>
            )}
          </div>

          {/* Secondary Navigation */}
          <div className="hidden lg:flex items-center space-x-4">
            {userInfo ? (
              <div className="flex items-center gap-2">
                <h3>{userInfo.firstName ? userInfo.firstName.toUpperCase() : 'User'}</h3>
                <Link to="/profile">
                  <img src={userInfo.photo} className="h-11 rounded-full" alt="User Profile" />
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
                  className="inline-flex items-center justify-center rounded-xl bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 transition-all duration-150 hover:bg-gray-50"
                  to="/signup"
                >
                  SignUp
                </Link>
                <Link
                  className="inline-flex items-center justify-center rounded-xl bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm transition-all duration-150 hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                  to="/signin"
                >
                  SignIn
                </Link>
              </div>
            )}

            <button onClick={toggleCart} className="relative text-gray-700 hover:text-gray-900 font-medium flex items-center transition duration-200 ease-in-out">
              {language === 'EN' ? 'Cart' : language === 'FR' ? 'Panier' : 'عربة التسوق'}
              <img src={shopping} alt="Shopping Cart" className="h-6 ml-2" />
              {cartItemsCount > 0 && (
                <span className="absolute top-0 right-0 bg-red-500 text-white text-xs font-semibold rounded-full h-5 w-5 flex items-center justify-center transition duration-200 ease-in-out">
                  {cartItemsCount}
                </span>
              )}
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden flex items-center">
            <button onClick={toggleMenu} className="text-gray-700 hover:text-gray-900 focus:outline-none transition duration-200 ease-in-out">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="lg:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {translatedNavLinks[language].map((link) => (
                <Link key={link.id} to={link.path} className="block text-gray-700 hover:text-gray-900 font-medium transition duration-200 ease-in-out">
                  {link.name}
                </Link>
              ))}

              {/* Admin Link for Mobile View */}
              {userInfo?.isAdmin && (
                <Link to="/admin" className="block text-gray-700 hover:text-gray-900 font-medium">
                  Admin
                </Link>
              )}

              {userInfo ? (
                <>
                  <Link to="/profile" className="block text-gray-700 hover:text-gray-900 font-medium">
                    {userInfo.firstName || 'User'}
                  </Link>
                  <button
                    onClick={logoutHandler}
                    className="block text-gray-700 hover:text-gray-900 font-medium"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link to="/signup" className="block text-gray-700 hover:text-gray-900 font-medium">
                    SignUp
                  </Link>
                  <Link to="/signin" className="block text-gray-700 hover:text-gray-900 font-medium">
                    SignIn
                  </Link>
                </>
              )}
              <button onClick={toggleCart} className="block text-gray-700 hover:text-gray-900 font-medium flex items-center transition duration-200 ease-in-out">
                <img src={shopping} alt="Shopping Cart" className="h-6 ml-2" />
                {cartItemsCount > 0 && (
                  <span className="ml-2 bg-red-500 text-white text-xs font-semibold rounded-full h-5 w-5 flex items-center justify-center transition duration-200 ease-in-out">
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
