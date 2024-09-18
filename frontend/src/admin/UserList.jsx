import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchStores, deleteStore } from '../redux/storesSlice';
import { Link } from 'react-router-dom';

const StoreList = () => {
  const dispatch = useDispatch();
  const { stores, loading, error } = useSelector(state => state.stores);

  useEffect(() => {
    dispatch(fetchStores());
  }, [dispatch]);

  const handleDelete = (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this store?");
    if (confirmDelete) {
      dispatch(deleteStore(id));
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="max-w-4xl mx-auto py-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Manage Stores</h1>
      <Link to="/admin/stores/create" className="mb-4 inline-block px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-500 transition-all">
        Create Store
      </Link>
      <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Address</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {stores.map(store => (
            <tr key={store._id}>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{store.name}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{store.address}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                <Link to={`/admin/stores/edit/${store._id}`} className="text-blue-600 hover:text-blue-900 mr-4">Edit</Link>
                <button onClick={() => handleDelete(store._id)} className="text-red-600 hover:text-red-900">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StoreList;
