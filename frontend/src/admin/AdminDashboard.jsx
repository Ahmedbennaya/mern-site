import React from 'react';
import { Link } from 'react-router-dom';

const AdminDashboard = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center py-10 px-4">
      <h1 className="text-4xl font-bold text-gray-800 mb-10">Admin Dashboard</h1>
      <ul className="w-full max-w-lg space-y-6">
        <li>
          <Link to="/admin/products" className="block w-full text-center px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-lg hover:bg-blue-500 transition-all">
            Manage Products
          </Link>
        </li>
        <li>
          <Link to="/admin/users" className="block w-full text-center px-6 py-3 bg-green-600 text-white font-semibold rounded-lg shadow-lg hover:bg-green-500 transition-all">
            Manage Users
          </Link>
        </li>
        <li>
          <Link to="/admin/stores" className="block w-full text-center px-6 py-3 bg-purple-600 text-white font-semibold rounded-lg shadow-lg hover:bg-purple-500 transition-all">
            Manage Stores
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default AdminDashboard;
