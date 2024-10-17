import React, { StrictMode } from 'react';  // Import StrictMode
import ReactDOM from 'react-dom/client';   // Use createRoot for React 18
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom';
import { Provider } from 'react-redux';   // Import Redux provider
import store from './redux/store';        // Import the Redux store
import App from './App';                  // Main App component
import Home from './pages/Home';           // Example pages
import Register from './auth/Register';
import Login from './auth/Login';
import ForgotPassword from './auth/ForgotPassword';
import ResetPassword from './auth/ResetPassword';
import Stores from './pages/Stores';
import CurtainsDrapes from './pages/CurtainsDrapes';
import BlindsShades from './pages/BlindsShades';
import SmartHome from './pages/SmartHome';
import Furnishings from './pages/Furnishings';
import Projects from './pages/Projects';
import Franchise from './pages/Franchise';
import Profile from './pages/Profile';
import Checkout from './components/Checkout';
import AdminDashboard from './admin/AdminDashboard';
import EditProduct from './admin/EditProduct';
import ProductList from './admin/ProductList';
import UserList from './admin/UserList';
import CreateProduct from './admin/CreateProduct';
import StoreList from './admin/StoreList';
import EditUser from './admin/EditUser';
import EditStore from './admin/EditStore';
import AdminOrders from './admin/AdminOrders';
import BookConsultation from './components/BookConsultation';
import ContactUs from './components/ContactUs';
import OurStory from './components/OurStory';
import ProductPage from './pages/ProductPage';  // Import ProductPage component
import './index.css';  // Import global styles

// Create the router with your routes
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index element={<Home />} />
      <Route path="signup" element={<Register />} />
      <Route path="signin" element={<Login />} />
      <Route path="forgot-password" element={<ForgotPassword />} />
      <Route path="reset-password/:token" element={<ResetPassword />} />
      <Route path="stores" element={<Stores />} />
      <Route path="curtains-drapes" element={<CurtainsDrapes />} />
      <Route path="blinds-shades" element={<BlindsShades />} />
      <Route path="smart-home" element={<SmartHome />} />
      <Route path="furnishings" element={<Furnishings />} />
      <Route path="projects" element={<Projects />} />
      <Route path="franchise" element={<Franchise />} />
      <Route path="profile" element={<Profile />} />
      <Route path="checkout" element={<Checkout />} />
      <Route path="product/:id" element={<ProductPage />} /> {/* Dynamic route for product details */}

      {/* New route for the Book Consultation form */}
      <Route path="book-consultation" element={<BookConsultation />} />
      <Route path="contact" element={<ContactUs />} />
      <Route path="our-story" element={<OurStory />} />

      {/* Admin Routes - Nested under "/admin" */}
      <Route path="admin" element={<AdminDashboard />}>
        <Route index element={<ProductList />} />  {/* Default admin dashboard */}
        <Route path="products" element={<ProductList />} />
        <Route path="products/create" element={<CreateProduct />} />
        <Route path="products/edit/:id" element={<EditProduct />} />
        <Route path="users" element={<UserList />} />
        <Route path="users/edit/:userId" element={<EditUser />} />
        <Route path="stores" element={<StoreList />} />
        <Route path="stores/edit/:storeId" element={<EditStore />} />
        <Route path="orders" element={<AdminOrders />} />
      </Route>
    </Route>
  )
);

// Create root element and render the app with StrictMode
const root = ReactDOM.createRoot(document.getElementById("root"));  // Ensure the root element exists in HTML

root.render(
  <StrictMode>   {/* StrictMode wraps the entire application */}
    <Provider store={store}>    {/* Redux provider to pass down the store */}
      <RouterProvider router={router} />  {/* Router provider for navigation */}
    </Provider>
  </StrictMode>
);
