import React from 'react';
import { Link } from 'react-router-dom';

const AdminDashboard = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center py-12 px-6">
      <h1 className="text-4xl font-bold text-gray-800 mb-12">Admin Dashboard</h1>

      <ul className="w-full max-w-lg space-y-6">
        <li>
          <Link 
            to="/admin/products" 
            className="block w-full text-center px-6 py-4 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-500 transition-all"
          >
            Manage Products
          </Link>
        </li>

        <li>
          <Link 
            to="/admin/users" 
            className="block w-full text-center px-6 py-4 bg-green-600 text-white font-semibold rounded-lg shadow-md hover:bg-green-500 transition-all"
          >
            Manage Users
          </Link>
        </li>

        <li>
          <Link 
            to="/admin/stores" 
            className="block w-full text-center px-6 py-4 bg-purple-600 text-white font-semibold rounded-lg shadow-md hover:bg-purple-500 transition-all"
          >
            Manage Stores
          </Link>
        </li>

        <li>
          <Link 
            to="/admin/orders" 
            className="block w-full text-center px-6 py-4 bg-yellow-600 text-white font-semibold rounded-lg shadow-md hover:bg-yellow-500 transition-all"
          >
            Manage Orders
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default AdminDashboard;
