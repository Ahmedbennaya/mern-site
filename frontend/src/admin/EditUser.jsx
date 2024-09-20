// components/EditUser.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const EditUser = () => {
  const { userId } = useParams();  // Get the userId from the URL
  const navigate = useNavigate();  // For navigation after updating
  const [user, setUser] = useState({ name: '', email: '', role: '' });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch user data when the component mounts
  useEffect(() => {
    const fetchUser = async () => {
      try {
        // Ensure the correct API URL for getting a single user
        const { data } = await axios.get(`http://localhost:5000/api/users/${userId}`);
        setUser(data);  // Populate form with user data
        setLoading(false);  // End loading
      } catch (error) {
        // Handle errors and 404 (User not found)
        if (error.response && error.response.status === 404) {
          setError('User not found');
        } else {
          setError('Failed to load user data');
        }
        setLoading(false);
      }
    };
    fetchUser();
  }, [userId]);  // Re-run the effect when userId changes

  // Handle form input changes
  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,  // Update the corresponding field
    });
  };

  // Handle form submission to update the user data
  const handleSubmit = async (e) => {
    e.preventDefault();  // Prevent default form submission
    try {
      // Call the API to update user details
      await axios.put(`http://localhost:5000/api/users/${userId}`, user);
      // On success, redirect to admin users page
      navigate('/admin/users');
    } catch (error) {
      // Handle update errors
      setError('Failed to update user');
    }
  };

  // Show loading spinner while fetching user data
  if (loading) return <p>Loading...</p>;
  
  // Show error message if there's any
  if (error) return <p>{error}</p>;

  return (
    <div className="max-w-lg mx-auto mt-10">
      <h2 className="text-2xl font-bold mb-6">Edit User</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700">Name</label>
          <input
            type="text"
            name="name"
            value={user.name}
            onChange={handleChange}
            className="w-full p-2 border rounded-lg"
            required  // Ensure name field is not empty
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Email</label>
          <input
            type="email"
            name="email"
            value={user.email}
            onChange={handleChange}
            className="w-full p-2 border rounded-lg"
            required  // Ensure email field is valid
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Role</label>
          <select
            name="role"
            value={user.role}
            onChange={handleChange}
            className="w-full p-2 border rounded-lg"
            required  // Ensure role is selected
          >
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>
        </div>
        <button
          type="submit"
          className="bg-blue-600 text-white px-6 py-2 rounded-lg"
        >
          Update User
        </button>
      </form>
    </div>
  );
};

export default EditUser;
