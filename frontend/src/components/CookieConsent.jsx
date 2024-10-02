// CookieConsent.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';  // Import useSelector to access Redux store

const CookieConsent = () => {
  const [isVisible, setIsVisible] = useState(true);  // Track banner visibility
  const [cookiesAccepted, setCookiesAccepted] = useState(null);  // Track cookie preferences
  
  // Get user info from Redux store
  const userInfo = useSelector((state) => state.auth.userInfo);

  useEffect(() => {
    const storedPreference = localStorage.getItem('cookiePreference');  // Check if preferences are saved
    if (storedPreference) {
      setIsVisible(false);  // Hide banner if preferences exist
      setCookiesAccepted(JSON.parse(storedPreference));  // Set preference state
    }
  }, []);

  // Function to save preferences locally and send them to the backend
  const savePreferences = async (preference) => {
    localStorage.setItem('cookiePreference', JSON.stringify(preference));
    setCookiesAccepted(preference);
    setIsVisible(false);

    // Send preferences to the backend API
    try {
      await axios.post('/api/preferences/savePreferences', {
        userId: userInfo ? userInfo.id : null,  // Use user ID from Redux store
        preference,
      });
    } catch (error) {
      console.error('Error saving preferences to backend:', error);  // Handle error gracefully
    }
  };

  const handleAcceptAll = () => {
    savePreferences({ thirdParty: true });
  };

  const handleRejectThirdParty = () => {
    savePreferences({ thirdParty: false });
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 right-0 mb-4 mr-4 w-64">
      <div className="bg-white rounded-lg shadow-lg p-4">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center">
            <img
              src="https://www.svgrepo.com/show/401340/cookie.svg"
              alt="Cookie"
              className="h-6 w-6 mr-2"
            />
            <span className="text-gray-700 font-bold text-sm">Cookie Policy</span>
          </div>
          <button
            className="text-gray-500 hover:text-gray-700 focus:outline-none"
            onClick={() => setIsVisible(false)}
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
        <p className="text-gray-600 text-sm">
          We use cookies to enhance your experience. By continuing to visit this site, you agree to
          our use of cookies.
        </p>
        <button
          className="mt-4 bg-teal-500 hover:bg-teal-600 text-white font-bold py-2 px-4 rounded"
          onClick={handleAcceptAll}
        >
          Accept
        </button>
        <button
          className="mt-2 bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded"
          onClick={handleRejectThirdParty}
        >
          Reject Third-Party Cookies
        </button>
      </div>
    </div>
  );
};

export default CookieConsent;
