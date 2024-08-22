import React from "react";
import { Toaster } from "react-hot-toast";
import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";

function App() {
  return (
    <div>
      <Navbar/>
      <Toaster position="top-right"/>
      <Outlet /> 
    </div>
  );
}

export default App;
