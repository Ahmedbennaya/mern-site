import React, { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './redux/store';
import App from './App';
import Home from './pages/Home';
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
import ProductPage from './pages/ProductPage';
import './index.css';

// Import the AdminRoute component
import AdminRoute from './admin/AdminRoute';

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
      <Route path="product/:id" element={<ProductPage />} />

      {/* Public routes */}
      <Route path="book-consultation" element={<BookConsultation />} />
      <Route path="contact" element={<ContactUs />} />
      <Route path="our-story" element={<OurStory />} />

      {/* Admin Routes - Protected by AdminRoute */}
      <Route path="admin" element={<AdminRoute><AdminDashboard /></AdminRoute>}>
        <Route index element={<ProductList />} />
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
const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>
);
