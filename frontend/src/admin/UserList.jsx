import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsers, deleteUser } from '../redux/userSlice';  // Import actions
import { Link } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';  // Import toast

const UserList = () => {
  const dispatch = useDispatch();
  const { users, loading, error } = useSelector(state => state.user);

  // Fetch users when the component mounts
  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  // Handle user deletion with toast confirmation
  const handleDelete = (id) => {
    toast(
      (t) => (
        <span>
          Are you sure you want to delete this user?
          <button
            onClick={() => {
              dispatch(deleteUser(id));  // Dispatch the deleteUser action
              toast.dismiss(t.id);  // Close the confirmation toast
            }}
            style={{
              marginLeft: '10px',
              color: 'red',
              border: '1px solid red',
              padding: '5px',
              cursor: 'pointer',
            }}
          >
            Confirm
          </button>
          <button
            onClick={() => toast.dismiss(t.id)}
            style={{
              marginLeft: '10px',
              border: '1px solid gray',
              padding: '5px',
              cursor: 'pointer',
            }}
          >
            Cancel
          </button>
        </span>
      ),
      { duration: 5000 }  // Auto-dismiss after 5 seconds
    );
  };

  // Show loading state
  if (loading) {
    return <p>Loading...</p>;
  }

  // Show error state if fetching users fails
  if (error) {
    return <p>Error: {error.message || 'Failed to fetch users'}</p>;
  }

  return (
    <div className="max-w-4xl mx-auto py-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Manage Users</h1>
      <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Admin</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {users.map(user => (
            <tr key={user._id}>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{user.FirstName} {user.LastName}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{user.email}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{user.isAdmin ? 'Yes' : 'No'}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                <Link to={`/admin/users/edit/${user._id}`} className="text-blue-600 hover:text-blue-900 mr-4">Edit</Link>
                <button onClick={() => handleDelete(user._id)} className="text-red-600 hover:text-red-900">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserList;
