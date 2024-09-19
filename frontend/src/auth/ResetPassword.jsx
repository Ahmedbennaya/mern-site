import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';

const ResetPassword = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const { token } = useParams(); // Token from URL
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }

    try {
      const response = await fetch(`http://localhost:5000/api/users/reset-password/${token}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ password }),
      });

      if (!response.ok) throw new Error('Failed to reset password');

      toast.success('Password reset successfully');
      navigate('/signin');
    } catch (error) {
      toast.error(error.message || 'Failed to reset password');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-5">
      <div className="bg-white p-6 rounded shadow-md w-full max-w-sm">
        <h2 className="text-xl text-gray-700 text-center mb-6">Enter New Password</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4 relative">
            <label className="block text-gray-700 text-sm font-bold mb-2">New Password</label>
            <input
              type={showPassword ? 'text' : 'password'}
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              required
              className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-0 flex items-center pr-3"
            >
              <svg
                className={`w-5 h-5 ${showPassword ? 'text-blue-600' : 'text-gray-400'}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                {showPassword ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3 10c1.25-1.8 3.1-3 5-3s3.75 1.2 5 3m-5 0a5 5 0 015 5m-5-5a5 5 0 00-5 5m5 0a5 5 0 005 5m0-5a5 5 0 00-5-5"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 19c-7 0-10-7-10-7s3-7 10-7 10 7 10 7-3 7-10 7z"
                  />
                )}
              </svg>
            </button>
          </div>
          <div className="mb-4 relative">
            <label className="block text-gray-700 text-sm font-bold mb-2">Confirm Password</label>
            <input
              type={showPassword ? 'text' : 'password'}
              onChange={(e) => setConfirmPassword(e.target.value)}
              value={confirmPassword}
              required
              className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button
            type="submit"
            className={`bg-blue-700 text-white py-2 px-4 rounded w-full hover:bg-blue-600`}
          >
            Reset Password
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
