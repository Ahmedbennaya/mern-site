import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { savePreferences, loadPreferences } from '../redux/features/preferenceSlice';

const CookieConsent = () => {
  const dispatch = useDispatch();
  const { preferences, loading, error } = useSelector((state) => state.preference);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    dispatch(loadPreferences());
  }, [dispatch]);

  useEffect(() => {
    if (preferences && preferences.thirdParty !== undefined && isVisible) {
      setIsVisible(false);
    }
  }, [preferences, isVisible]);

  const handleAcceptAll = () => {
    dispatch(savePreferences({ thirdParty: true }));
    setIsVisible(false);
  };

  const handleRejectThirdParty = () => {
    dispatch(savePreferences({ thirdParty: false }));
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-4 right-20 w-full sm:w-80 p-4 bg-white rounded-lg shadow-lg z-40">
      <div className="flex justify-between items-center">
        <div className="flex items-center">
          <img
            src="https://www.svgrepo.com/show/401340/cookie.svg"
            alt="Cookie"
            className="h-6 w-6 mr-2"
          />
          <span className="text-gray-700 font-bold">Cookie Policy</span>
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
      <p className="mt-2 text-gray-600">
        We use cookies to enhance your experience. By continuing to visit this site, you agree to
        our use of cookies.
      </p>
      <div className="mt-4 flex space-x-2">
        <button
          className="bg-teal-500 hover:bg-teal-600 text-white font-bold py-2 px-4 rounded"
          onClick={handleAcceptAll}
        >
          Accept
        </button>
        <button
          className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded"
          onClick={handleRejectThirdParty}
        >
          Reject Third-Party Cookies
        </button>
      </div>
      {loading && <p className="mt-2 text-sm text-gray-500">Saving preferences...</p>}
      {error && <p className="mt-2 text-sm text-red-500">{error}</p>}
    </div>
  );
};

export default CookieConsent;