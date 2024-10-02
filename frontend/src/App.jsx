// App.js
import React, { useEffect } from "react";
import CookieConsent from "./components/CookieConsent"; // Import the CookieConsent component
import { Toaster } from "react-hot-toast";  // Import Toaster for notifications
import { Outlet } from "react-router-dom";  // Import Outlet for routing
import Navbar from "./components/Navbar";  // Import Navbar component
import Footer from "./components/Footer";  // Import Footer component

const App = () => {
  // Effect to load Google Analytics based on cookie preferences
  useEffect(() => {
    const cookiePreference = JSON.parse(localStorage.getItem("cookiePreference"));
    
    // Load Google Analytics only if third-party cookies are allowed
    if (cookiePreference && cookiePreference.thirdParty) {
      const script = document.createElement("script");
      script.src = "https://www.googletagmanager.com/gtag/js?id=G-PVX1S01KTB"; // Replace with your GA ID
      script.async = true;
      document.body.appendChild(script);

      window.dataLayer = window.dataLayer || [];
      function gtag() {
        window.dataLayer.push(arguments);
      }
      gtag("js", new Date());
      gtag("config", "G-PVX1S01KTB");  // Replace with your GA ID
    }
  }, []);  // Runs only once after the initial render

  return (
    <div className="App">
      {/* Include Navbar at the top */}
      <Navbar />

      {/* Include Toaster for showing notifications */}
      <Toaster position="top-right" />

      {/* Cookie Consent Banner */}
      <CookieConsent />

      {/* Dynamic content from routed components */}
      <Outlet />

      {/* Include Footer at the bottom */}
      <Footer />
    </div>
  );
};

export default App;
