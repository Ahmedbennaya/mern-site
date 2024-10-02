import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { signin } from "../redux/userSlice";
import ReCAPTCHA from "react-google-recaptcha";
import toast from "react-hot-toast";

const Login = () => {
  const [user, setUser] = useState({
    email: "",
    password: "", 
  });
  const { loggedInUser } = useSelector((state) => state.user);
  const [recaptchaToken, setRecaptchaToken] = useState(null); // Store reCAPTCHA token
  const [loading, setLoading] = useState(false); // Loading state for the form

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const signInHandler = (e) => {
    e.preventDefault();

    // Verify that reCAPTCHA is completed
    if (!recaptchaToken) {
      toast.error("Please complete the reCAPTCHA.");
      return;
    }

    // Dispatch the login action
    setLoading(true);
    dispatch(signin(user)).then(() => setLoading(false));
  };

  useEffect(() => {
    if (loggedInUser) {
      if (loggedInUser.isAdmin) {
        navigate("/admin"); 
      } else {
        navigate("/");
      }
    }
  }, [loggedInUser, navigate]);

  // Handle reCAPTCHA token change
  const handleRecaptchaChange = (token) => {
    setRecaptchaToken(token);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex items-center justify-center flex-grow px-5 sm:px-0">
        <div className="flex bg-white rounded-lg shadow-lg border overflow-hidden max-w-sm lg:max-w-4xl w-full">
          <div
            className="hidden md:block lg:w-1/2 bg-cover bg-blue-700"
            style={{
              backgroundImage: `url(${"https://res.cloudinary.com/dc1zy9h63/image/upload/v1727057161/img-BzaXGVBN_trot2k.jpg"})`,
            }}
          ></div>
          <div className="w-full p-8 lg:w-1/2">
            <p className="text-xl text-gray-600 text-center">Welcome back!</p>
            <form onSubmit={signInHandler}>
              <div className="mt-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Email Address
                </label>
                <input
                  onChange={handleChange}
                  className="text-gray-700 border border-gray-300 rounded py-2 px-4 block w-full focus:outline-2 focus:outline-blue-700"
                  type="email"
                  name="email"
                  required
                />
              </div>
              <div className="mt-4 flex flex-col justify-between">
                <div className="flex justify-between">
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Password
                  </label>
                </div>
                <input
                  onChange={handleChange}
                  className="text-gray-700 border border-gray-300 rounded py-2 px-4 block w-full focus:outline-2 focus:outline-blue-700"
                  type="password"
                  name="password" 
                  required
                />
                <Link
                  to="/forgot-password"
                  className="text-xs text-gray-500 hover:text-gray-900 text-end w-full mt-2"
                >
                  Forget Password?
                </Link>
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
                  {loading ? "Logging in..." : "Login"}
                </button>
              </div>
            </form>
            <div className="mt-4 flex items-center w-full text-center">
              <Link
                to="/signup" 
                className="text-xs text-gray-500 capitalize text-center w-full"
              >
                Don&apos;t have any account yet?
                <span className="text-blue-700"> Sign Up</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
