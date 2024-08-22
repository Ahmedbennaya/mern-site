import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Import useNavigate for programmatic navigation
import logo from '../assets/logo/LOGONOIR.png';
import shopping from '../assets/logo/shoping.png';
import img from '../assets/logo/img1.webp';
import img1 from '../assets/imgs/img.jpg';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [promotionText, setPromotionText] = useState('PROMOTION 2024');
  const [showingPromotion1, setShowingPromotion1] = useState(true);
  const [language, setLanguage] = useState('EN');
  const [showLangDropdown, setShowLangDropdown] = useState(false);
  
  const navigate = useNavigate(); // Create a navigate function to use for navigation

  const toggleMenu = () => setIsOpen(!isOpen);
  const toggleLangDropdown = () => setShowLangDropdown(!showLangDropdown);

  useEffect(() => {
    const interval = setInterval(() => {
      setShowingPromotion1(prev => !prev);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (showingPromotion1) {
      setPromotionText(
        language === 'EN'
          ? 'PROMOTION 2024 Choix et Qualité'
          : language === 'FR'
          ? 'PROMOTION 2024 Choix et Qualité'
          : '👌👌 تنوّر العين و الخلاص على عامين'
      );
    } else {
      setPromotionText(
        language === 'EN'
          ? 'Great Deals for 2024'
          : language === 'FR'
          ? 'Grandes Affaires pour 2024'
          : '👌👌 عروض رائعة لعام 2024'
      );
    }
  }, [showingPromotion1, language]);

  const handlePhoneClick = () => {
    window.location.href = 'tel:+21650929292';
  };

  const handleEmailClick = () => {
    window.location.href = 'mailto:bargaoui_rideaux@yahoo.fr';
  };

  const handleFindStoreClick = () => {
    navigate('/stores'); // Navigate to the Stores component
  };

  const navLinks = [
    { name: 'CURTAINS & DRAPES', id: 'curtains-drapes-dropdown', path: '/curtains-drapes' },
    { name: 'BLINDS & SHADES', id: 'blinds-shades-dropdown', path: '/blinds-shades' },
    { name: 'SMART HOME', id: 'smart-home-dropdown', path: '/smart-home' },
    { name: 'FURNISHINGS', id: 'furnishings-dropdown', path: '/furnishings' },
    { name: 'PROJECTS', id: 'projects', path: '/projects' },
    { name: 'FRANCHISE', id: 'franchise', path: '/franchise' },
  ];

  const translatedNavLinks = {
    EN: navLinks,
    FR: [
      { name: 'RIDEAUX ET DRAPERIES', id: 'curtains-drapes-dropdown', path: '/curtains-drapes' },
      { name: 'STORES ET OMBRES', id: 'blinds-shades-dropdown', path: '/blinds-shades' },
      { name: 'MAISON INTELLIGENTE', id: 'smart-home-dropdown', path: '/smart-home' },
      { name: 'AMEUBLEMENT', id: 'furnishings-dropdown', path: '/furnishings' },
      { name: 'PROJETS', id: 'projects', path: '/projects' },
      { name: 'FRANCHISE', id: 'franchise', path: '/franchise' },
    ],
    AR: [
      { name: 'الستائر', id: 'curtains-drapes-dropdown', path: '/curtains-drapes' },
      { name: 'الستائر والظلال', id: 'blinds-shades-dropdown', path: '/blinds-shades' },
      { name: 'المنزل الذكي', id: 'smart-home-dropdown', path: '/smart-home' },
      { name: 'الأثاث', id: 'furnishings-dropdown', path: '/furnishings' },
      { name: 'المشاريع', id: 'projects', path: '/projects' },
      { name: 'الامتياز', id: 'franchise', path: '/franchise' },
    ],
  };

  return (
    <header>
      {/* Promotion Widget */}
      <div className="bg-gray-800 text-white py-2">
        <div className="container mx-auto flex justify-between items-center">
          <div className="text-center w-full lg:w-auto">
            <span className={`block text-sm ${showingPromotion1 ? 'animate-slide-up' : 'animate-slide-up-reverse'}`}>
              {promotionText}
            </span>
          </div>
          <div className="hidden lg:flex items-center space-x-4">
            <button onClick={handlePhoneClick} className="text-white hover:underline">
              {language === 'EN' ? 'Call Us' : language === 'FR' ? 'Appelez-nous' : 'اتصل بنا'} +216 50929292
            </button>
            <span>|</span>
            <button onClick={handleEmailClick} className="text-white hover:underline">
              {language === 'EN' ? 'Email Us' : language === 'FR' ? 'Envoyez-nous un email' : 'أرسل لنا بريدًا إلكترونيًا'}
            </button>
            <span>|</span>
            <button onClick={handleFindStoreClick} className="text-white hover:underline">
              {language === 'EN' ? 'Find Your Store' : language === 'FR' ? 'Trouvez Votre Magasin' : 'ابحث عن المتجر الخاص بك'}
            </button>
            <span>|</span>
            <div className="relative">
              <button onClick={toggleLangDropdown} className="text-white hover:underline">
                {language === 'EN' ? 'English' : language === 'FR' ? 'Français' : 'عربي'}
              </button>
              {showLangDropdown && (
                <div className="absolute mt-2 right-0 w-32 bg-white shadow-lg rounded-md text-gray-700 z-10">
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
            <span className="font-bold text-xl text-gray-900">Bargaoui Rideaux Tahar</span>
          </Link>

          {/* Primary Navigation */}
          <div className="hidden lg:flex space-x-8">
            {translatedNavLinks[language].map(link => (
              <div key={link.id} className="relative group">
                <Link to={link.path} className="text-gray-700 hover:text-gray-900 font-medium">
                  {link.name}
                </Link>
                {link.id !== 'projects' && link.id !== 'franchise' && (
                  <div className="absolute left-0 top-full mt-2 w-full bg-white shadow-lg rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    <div className="grid grid-cols-2 gap-4 p-4">
                      <div>
                        <h2 className="text-lg font-bold mb-2">{link.name}</h2>
                        <div className="space-y-2">
                          {['Pinch Pleat Curtains', 'Eyelet Curtains', 'Rod Pocket Curtains', 'Tab Top Curtains'].map(
                            (item, index) => (
                              <div key={index} className="flex items-center">
                                <img src={img} alt={item} className="h-12 w-12 mr-3 rounded-md" />
                                <span className="text-sm text-gray-700">{item}</span>
                              </div>
                            )
                          )}
                        </div>
                      </div>
                      <div className="flex flex-col items-center">
                        <img src={img1} alt="Curtains Image" className="h-32 w-auto mb-2 rounded-md" />
                        <a href="#" className="text-blue-600 hover:text-blue-700 font-medium">
                          Shop All
                        </a>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Secondary Navigation */}
          <div className="hidden lg:flex items-center space-x-4">
            <Link to="/signIn" className="text-gray-700 hover:text-gray-900 font-medium">
              {language === 'EN' ? 'Login' : language === 'FR' ? 'Connexion' : 'تسجيل الدخول'}
            </Link>
            <Link to="#" className="text-gray-700 hover:text-gray-900 font-medium flex items-center">
              {language === 'EN' ? 'Cart' : language === 'FR' ? 'Panier' : 'عربة التسوق'}{' '}
              <img src={shopping} alt="Shopping Cart" className="h-6 ml-2" />
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden flex items-center">
            <button onClick={toggleMenu} className="text-gray-700 hover:text-gray-900 focus:outline-none">
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
              {translatedNavLinks[language].map(link => (
                <Link key={link.id} to={link.path} className="block text-gray-700 hover:text-gray-900 font-medium">
                  {link.name}
                </Link>
              ))}
              <Link to="/signIn" className="block text-gray-700 hover:text-gray-900 font-medium">
                {language === 'EN' ? 'Login' : language === 'FR' ? 'Connexion' : 'تسجيل الدخول'}
              </Link>
              <Link to="#" className="block text-gray-700 hover:text-gray-900 font-medium flex items-center">
                {language === 'EN' ? 'Cart' : language === 'FR' ? 'Panier' : 'عربة التسوق'}{' '}
                <img src={shopping} alt="Shopping Cart" className="h-6 ml-2" />
              </Link>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Navbar;
