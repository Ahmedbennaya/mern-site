import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateUser } from "../redux/userSlice";
import toast from "react-hot-toast";
import axios from "axios";

const Profile = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [user, setUser] = useState({
    firstName: userInfo?.firstName || "",
    lastName: userInfo?.lastName || "",
    age: userInfo?.age || "",
    email: userInfo?.email || "",
    password: "",
    confirmPassword: "",
  });
  const [file, setFile] = useState(null);

  const changeHandler = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const updateHandler = async (e) => {
    e.preventDefault();
    if (user.password !== user.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    let photoUrl = userInfo.photo;
    if (file) {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", "ec5cj3s7");

      try {
        const { data } = await axios.post(
          "https://api.cloudinary.com/v1_1/dl6o7cgmp/image/upload",
          formData
        );
        photoUrl = data.url;
      } catch (error) {
        toast.error("Image upload failed");
        return;
      }
    }

    dispatch(updateUser({ ...user, photo: photoUrl }));
  };

  return (
    <div className="container mx-auto mt-24 p-6 flex flex-col md:flex-row gap-6">
      <aside className="md:w-1/4">
        <div className="sticky top-16 p-4 border-r border-gray-200">
          <h2 className="text-2xl font-semibold mb-6">Settings</h2>
          <nav className="space-y-2">
            <a href="#" className="block py-2 font-semibold text-indigo-900 rounded-full hover:bg-indigo-50">
              Public Profile
            </a>
            <a href="#" className="block py-2 font-semibold text-indigo-900 rounded-full hover:bg-indigo-50">
              Account Settings
            </a>
            <a href="#" className="block py-2 font-semibold text-indigo-900 rounded-full hover:bg-indigo-50">
              Notifications
            </a>
            <a href="#" className="block py-2 font-semibold text-indigo-900 rounded-full hover:bg-indigo-50">
              PRO Account
            </a>
          </nav>
        </div>
      </aside>

      <form className="md:w-3/4 bg-white p-6 rounded-lg shadow-lg" onSubmit={updateHandler}>
        <h2 className="text-2xl font-bold mb-8">My Profile</h2>
        <div className="space-y-6">
          <div className="flex items-center">
            <img
              src={userInfo.photo || "https://via.placeholder.com/150"}
              alt="User avatar"
              className="w-24 h-24 rounded-full border-2 border-indigo-300"
            />
            <div className="ml-6">
              <label className="block text-sm font-medium mb-2">Change Picture</label>
              <input
                type="file"
                onChange={(e) => setFile(e.target.files[0])}
                className="block w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 cursor-pointer focus:outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label htmlFor="firstName" className="block text-sm font-medium text-gray-900">First Name</label>
              <input
                type="text"
                name="firstName"
                value={user.firstName}
                onChange={changeHandler}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                required
              />
            </div>
            <div>
              <label htmlFor="lastName" className="block text-sm font-medium text-gray-900">Last Name</label>
              <input
                type="text"
                name="lastName"
                value={user.lastName}
                onChange={changeHandler}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                required
              />
            </div>
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-900">Email</label>
            <input
              type="email"
              name="email"
              value={user.email}
              onChange={changeHandler}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              required
            />
          </div>

          <div>
            <label htmlFor="age" className="block text-sm font-medium text-gray-900">Age</label>
            <input
              type="number"
              name="age"
              value={user.age}
              onChange={changeHandler}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              required
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-900">Password</label>
              <input
                type="password"
                name="password"
                value={user.password}
                onChange={changeHandler}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>
            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-900">Confirm Password</label>
              <input
                type="password"
                name="confirmPassword"
                value={user.confirmPassword}
                onChange={changeHandler}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              className="py-2 px-4 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Update Profile
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Profile;
