import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { signUp } from '../redux/userSlice';
import ReCAPTCHA from 'react-google-recaptcha'; // Import reCAPTCHA
import toast from 'react-hot-toast';

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [recaptchaToken, setRecaptchaToken] = useState(null); // reCAPTCHA state
  const [loading, setLoading] = useState(false); // Loading state for the form

  const [user, setUser] = useState({
    FirstName: '',
    LastName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const formHandler = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const { FirstName, LastName, email, password, confirmPassword } = user;

  const registerHandler = (e) => {
    e.preventDefault();

    // Verify that reCAPTCHA is completed
    if (!recaptchaToken) {
      toast.error("Please complete the reCAPTCHA.");
      return;
    }

    if (!FirstName || !LastName || !email || !password) {
      toast.error('All fields are required.');
      return;
    }

    if (password !== confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }

    setLoading(true); // Set loading state
    dispatch(signUp({ user, navigate }))
      .unwrap()
      .then(() => {
        navigate('/signIn'); // Navigate to login page on success
        setLoading(false); // Reset loading
      })
      .catch((error) => {
        setLoading(false); // Reset loading on error
        toast.error(error?.message || "Registration failed."); // Show error
      });
  };

  // Handle reCAPTCHA token change
  const handleRecaptchaChange = (token) => {
    setRecaptchaToken(token);
  };

  return (
    <div className="flex flex-col min-h-screen"> {/* Set flex column to allow footer at bottom */}
      <div className="flex items-center justify-center flex-grow px-5 sm:px-0">
        <div className="flex bg-white rounded-lg shadow-lg border overflow-hidden max-w-sm lg:max-w-4xl w-full">
          <div
            className="hidden md:block lg:w-1/2 bg-cover bg-blue-700"
            style={{
              backgroundImage: `url(${"https://res.cloudinary.com/dc1zy9h63/image/upload/v1727057161/img-BzaXGVBN_trot2k.jpg"})`,
            }}
          ></div>
          <div className="w-full p-8 lg:w-1/2">
            <p className="text-xl text-gray-600 text-center">Create your account</p>
            <form onSubmit={registerHandler}>
              <div className="mt-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">First Name</label>
                <input
                  onChange={formHandler}
                  className="text-gray-700 border border-gray-300 rounded py-2 px-4 block w-full focus:outline-2 focus:outline-blue-700"
                  type="text"
                  name="FirstName"
                  value={FirstName}
                  required
                />
              </div>
              <div className="mt-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">Last Name</label>
                <input
                  onChange={formHandler}
                  className="text-gray-700 border border-gray-300 rounded py-2 px-4 block w-full focus:outline-2 focus:outline-blue-700"
                  type="text"
                  name="LastName"
                  value={LastName}
                  required
                />
              </div>
              <div className="mt-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">Email Address</label>
                <input
                  onChange={formHandler}
                  className="text-gray-700 border border-gray-300 rounded py-2 px-4 block w-full focus:outline-2 focus:outline-blue-700"
                  type="email"
                  name="email"
                  value={email}
                  required
                />
              </div>
              <div className="mt-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">Password</label>
                <input
                  onChange={formHandler}
                  className="text-gray-700 border border-gray-300 rounded py-2 px-4 block w-full focus:outline-2 focus:outline-blue-700"
                  type="password"
                  name="password"
                  value={password}
                  required
                />
              </div>
              <div className="mt-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">Confirm Password</label>
                <input
                  onChange={formHandler}
                  className="text-gray-700 border border-gray-300 rounded py-2 px-4 block w-full focus:outline-2 focus:outline-blue-700"
                  type="password"
                  name="confirmPassword"
                  value={confirmPassword}
                  required
                />
              </div>

              {/* reCAPTCHA */}
              <ReCAPTCHA
                sitekey="6Ldc-1UqAAAAAOZdWFyGcolXctfpPEDdaBI-ujPL" // Replace with your site key
                onChange={handleRecaptchaChange}
              />

              <div className="mt-8">
                <button
                  type="submit"
                  disabled={loading || !recaptchaToken} // Disable button when loading or reCAPTCHA not completed
                  className="bg-blue-700 text-white font-bold py-2 px-4 w-full rounded hover:bg-blue-600"
                >
                  {loading ? "Registering..." : "Register"}
                </button>
              </div>
            </form>
            <div className="mt-4 flex items-center w-full text-center">
              <Link to="/signIn" className="text-xs text-gray-500 capitalize text-center w-full">
                Already have an account? <span className="text-blue-700">Login Here</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
