// src/components/AdminRoute.js
import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';

const AdminRoute = ({ children }) => {
  const { userInfo } = useSelector((state) => state.auth);
  const location = useLocation();

  // Check if user is authenticated and has the admin role
  if (!userInfo || !userInfo.isAdmin) {
    // Show an alert and redirect unauthorized users
    alert('You must be an admin to access this page.');
    return <Navigate to="/signin" state={{ from: location }} />;
  }

  return children; // Render the children components (AdminDashboard)
};

export default AdminRoute;
