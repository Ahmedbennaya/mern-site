import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { signUp } from '../redux/userSlice';

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
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

    if (!FirstName || !LastName || !email || !password) {
      toast.error('All fields are required.');
      return;
    }

    if (password !== confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }

    dispatch(signUp({ user, navigate }))
      .unwrap()
      .then(() => {
        navigate('/signIn'); // Navigate to login page on success
      })
      .catch((error) => {
        // Do not navigate if there's an error
      });
  };

  return (
    <div className="flex flex-col min-h-screen"> {/* Set flex column to allow footer at bottom */}
      <div className="flex items-center justify-center flex-grow px-5 sm:px-0">
        <div className="flex bg-white rounded-lg shadow-lg border overflow-hidden max-w-sm lg:max-w-4xl w-full">
          <div
            className="hidden md:block lg:w-1/2 bg-cover bg-blue-700"
            style={{
              backgroundImage: `url(https://scontent.ftun4-2.fna.fbcdn.net/v/t39.30808-6/417513013_322833044070126_1597369421224813335_n.jpg?_nc_cat=107&ccb=1-7&_nc_sid=6ee11a&_nc_ohc=oD_5R6DfDb4Q7kNvgHrXn7p&_nc_ht=scontent.ftun4-2.fna&oh=00_AYCSsiehu5yvYNMRjxniIZRrhJh0uz4Bal0F8GAgMODTzA&oe=66C9A73C)`,
            }}
          ></div>
          <div className="w-full p-8 lg:w-1/2">
            <p className="text-xl text-gray-600 text-center">Create your account</p>
            <form onSubmit={registerHandler}>
              <div className="mt-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">FirstName</label>
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
                <label className="block text-gray-700 text-sm font-bold mb-2">LastName</label>
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
              <div className="mt-8">
                <button
                  type="submit"
                  className="bg-blue-700 text-white font-bold py-2 px-4 w-full rounded hover:bg-blue-600"
                >
                  Register
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