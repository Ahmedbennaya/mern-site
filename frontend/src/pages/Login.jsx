import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { signin } from "../redux/userSlice";
import Footer from "../components/Footer"; // Import the Footer component

const Login = () => {
  const [user, setUser] = useState({
    email: "",
    password: "", // Changed from "Password" to "password" for consistency
  });
  const { loggedInUser } = useSelector((state) => state.user);

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const signInHandler = (e) => {
    e.preventDefault();
    dispatch(signin(user));
  };

  useEffect(() => {
    if (loggedInUser) {
      navigate("/");
    }
  }, [loggedInUser]);

  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex items-center justify-center flex-grow px-5 sm:px-0">
        <div className="flex bg-white rounded-lg shadow-lg border overflow-hidden max-w-sm lg:max-w-4xl w-full">
          <div
            className="hidden md:block lg:w-1/2 bg-cover bg-blue-700"
            style={{
              backgroundImage: `url(https://scontent.ftun4-2.fna.fbcdn.net/v/t39.30808-6/417513013_322833044070126_1597369421224813335_n.jpg?_nc_cat=107&ccb=1-7&_nc_sid=6ee11a&_nc_ohc=oD_5R6DfDb4Q7kNvgHrXn7p&_nc_ht=scontent.ftun4-2.fna&oh=00_AYCSsiehu5yvYNMRjxniIZRrhJh0uz4Bal0F8GAgMODTzA&oe=66C9A73C)`,
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
                  name="password" // Fixed the name attribute
                />
                <Link
                  to="#"
                  className="text-xs text-gray-500 hover:text-gray-900 text-end w-full mt-2"
                >
                  Forget Password?
                </Link>
              </div>
              <div className="mt-8">
                <button
                  type="submit" // Added type="submit" to trigger form submission
                  className="bg-blue-700 text-white font-bold py-2 px-4 w-full rounded hover:bg-blue-600"
                >
                  Login
                </button>
              </div>
            </form>
            <div className="mt-4 flex items-center w-full text-center">
              <Link
                to="/signup" // Changed to use `to` instead of `href`
                className="text-xs text-gray-500 capitalize text-center w-full"
              >
                Don&apos;t have any account yet?
                <span className="text-blue-700"> Sign Up</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
      <Footer /> {/* Add Footer component here */}
    </div>
  );
};

export default Login;