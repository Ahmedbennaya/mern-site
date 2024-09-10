import React from "react";
import { Toaster } from "react-hot-toast";
import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

function App() {
  return (
    <div>
      <Navbar/>
      <Toaster position="top-right"/>
      <Outlet /> 
      <Footer/>
    </div>
  );
}

export default App;
