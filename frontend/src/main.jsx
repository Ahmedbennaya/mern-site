import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from "react-router-dom";
import Home from "./pages/Home.jsx";
import Register from "./pages/Register.jsx";
import Login from "./pages/Login.jsx";
import ForgotPassword from "./pages/ForgotPassword.jsx"; 
import ResetPassword from "./pages/ResetPassword.jsx"; 
import Stores from "./pages/Stores.jsx";
import CurtainsDrapes from "./pages/CurtainsDrapes.jsx";
import BlindsShades from "./pages/BlindsShades.jsx";
import SmartHome from "./pages/SmartHome.jsx";
import Furnishings from "./pages/Furnishings.jsx";
import Projects from "./pages/Projects.jsx";
import Franchise from "./pages/Franchise.jsx";
import { Provider } from "react-redux";
import store from "./redux/store.js";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index={true} path="/" element={<Home />} />
      <Route path="/signUp" element={<Register />} />
      <Route path="/signIn" element={<Login />} />
      <Route path="/forgot-password" element={<ForgotPassword />} /> 
      <Route path="/reset-password/:token" element={<ResetPassword />} />
      <Route path="/stores" element={<Stores />} />
      <Route path="/curtains-drapes" element={<CurtainsDrapes />} />
      <Route path="/blinds-shades" element={<BlindsShades />} />
      <Route path="/smart-home" element={<SmartHome />} />
      <Route path="/furnishings" element={<Furnishings />} />
      <Route path="/projects" element={<Projects />} />
      <Route path="/franchise" element={<Franchise />} />
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
);
