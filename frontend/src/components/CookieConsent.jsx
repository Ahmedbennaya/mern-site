// CookieConsent.js
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { savePreferences, loadPreferences } from '../redux/features/preferenceSlice'; // Import the Redux actions

const CookieConsent = () => {
  const dispatch = useDispatch();
  const { preferences, loading, error } = useSelector((state) => state.preference);
  const [isVisible, setIsVisible] = useState(true);  // Track banner visibility

  // Effect to load preferences from Redux store and localStorage on component mount
  useEffect(() => {
    dispatch(loadPreferences());
  }, [dispatch]);

  // Effect to hide the banner if preferences already exist
  useEffect(() => {
    // Check if preferences are already set and banner should be hidden
    if (preferences && preferences.thirdParty !== undefined && isVisible) {
      setIsVisible(false);
    }
  }, [preferences, isVisible]);  // Depend on preferences and isVisible to avoid infinite loop

  // Handle acceptance of all cookies
  const handleAcceptAll = () => {
    dispatch(savePreferences({ thirdParty: true }));
    setIsVisible(false);  // Hide the banner after accepting
  };

  // Handle rejection of third-party cookies
  const handleRejectThirdParty = () => {
    dispatch(savePreferences({ thirdParty: false }));
    setIsVisible(false);  // Hide the banner after rejecting
  };

  // Prevent the banner from rendering if it's not visible
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
        {loading && <p>Saving preferences...</p>}
        {error && <p>{error}</p>}
      </div>
    </div>
  );
};

export default CookieConsent;
