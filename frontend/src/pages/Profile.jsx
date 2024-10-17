import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateUser } from "../redux/userSlice";
import toast from "react-hot-toast";
import axios from "axios";

const Profile = () => {
  const { userInfo, token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    age: "",
    email: "",
    password: "",
    confirmPassword: "",
    profileImage: ""
  });
  const [file, setFile] = useState(null); // To store the selected image file
  const [loading, setLoading] = useState(false); // Loading state for updates

  // Load user info from state into the form
  useEffect(() => {
    if (userInfo) {
      setUser({
        firstName: userInfo.firstName || "",
        lastName: userInfo.lastName || "",
        age: userInfo.age || "",
        email: userInfo.email || "",
        password: "",
        confirmPassword: "",
        profileImage: userInfo.profileImage || ""
      });
    }
  }, [userInfo]);

  // Handle input changes for form fields
  const changeHandler = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const updateHandler = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Password validation
    if (user.password !== user.confirmPassword) {
      toast.error("Passwords do not match");
      setLoading(false);
      return;
    }

    let photoUrl = userInfo?.profileImage || ""; // Use existing image if no new one is uploaded
    if (file) {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", "ahmed"); // Use your Cloudinary unsigned preset

      try {
        const { data } = await axios.post(
          "https://api.cloudinary.com/v1_1/dc1zy9h63/image/upload", // Replace with your Cloudinary details
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        photoUrl = data.secure_url; // Update photo URL
      } catch (error) {
        toast.error("Image upload failed");
        setLoading(false);
        return;
      }
    }

    // Prepare user data, excluding password if it's not being changed
    const userData = { 
      ...user, 
      profileImage: photoUrl,
    };
    if (!user.password) {
      delete userData.password; // Don't send password if it's empty
    }
    
    try {
      const response = await axios.put(
        "https://mern-site-z5gs.onrender.com/api/users/update", // Backend API for updating user
        userData,
        {
          headers: {
            Authorization: `Bearer ${token}`, // Send token for authentication
          },
        }
      );

      dispatch(updateUser({ ...user, profileImage: photoUrl })); // Update Redux store with new user data
      toast.success("Profile updated successfully");
    } catch (error) {
      console.error("Failed to update profile:", error.response || error.message);
      handleErrorResponse(error);
    } finally {
      setLoading(false);
    }
  };

  // Handle errors during the profile update
  const handleErrorResponse = (error) => {
    if (error.response?.status === 401) {
      toast.error("Unauthorized: Please log in again.");
    } else if (error.response?.status === 500) {
      toast.error("Server error: Please try again later.");
    } else {
      toast.error("Failed to update profile.");
    }
  };

  return (
    <div className="container mx-auto mt-24 p-6 flex flex-col md:flex-row gap-6">
      <aside className="md:w-1/4">
        <div className="sticky top-16 p-4 border-r border-gray-200">
          <h2 className="text-2xl font-semibold mb-6">Settings</h2>
          <nav className="space-y-2">
            <button className="block py-2 font-semibold text-indigo-900 rounded-full hover:bg-indigo-50">
              Public Profile
            </button>
            <button className="block py-2 font-semibold text-indigo-900 rounded-full hover:bg-indigo-50">
              Account Settings
            </button>
            <button className="block py-2 font-semibold text-indigo-900 rounded-full hover:bg-indigo-50">
              Notifications
            </button>
            <button className="block py-2 font-semibold text-indigo-900 rounded-full hover:bg-indigo-50">
              PRO Account
            </button>
          </nav>
        </div>
      </aside>

      <form className="md:w-3/4 bg-white p-6 rounded-lg shadow-lg" onSubmit={updateHandler}>
        <h2 className="text-2xl font-bold mb-8">My Profile</h2>
        <div className="space-y-6">
          <div className="flex items-center">
            <img
              src={user.profileImage || "https://res.cloudinary.com/dc1zy9h63/image/upload/v1726415737/1000_F_346839683_6nAPzbhpSkIpb8pmAwufkC7c5eD7wYws_eqk1sd.jpg"}
              alt="User avatar"
              className="w-24 h-24 rounded-full border-2 border-indigo-300"
            />
            <div className="ml-6">
              <label className="block text-sm font-medium mb-2" htmlFor="file">Change Picture</label>
              <input
                id="file"
                type="file"
                onChange={(e) => setFile(e.target.files[0])} // Store the selected file
                className="block w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 cursor-pointer focus:outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label htmlFor="firstName" className="block text-sm font-medium text-gray-900">First Name</label>
              <input
                id="firstName"
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
                id="lastName"
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
              id="email"
              type="email"
              name="email"
              value={user.email}
              onChange={changeHandler}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              required
              autoComplete="email"
            />
          </div>

          <div>
            <label htmlFor="age" className="block text-sm font-medium text-gray-900">Age</label>
            <input
              id="age"
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
                id="password"
                type="password"
                name="password"
                value={user.password}
                onChange={changeHandler}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                autoComplete="new-password"
              />
            </div>
            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-900">Confirm Password</label>
              <input
                id="confirmPassword"
                type="password"
                name="confirmPassword"
                value={user.confirmPassword}
                onChange={changeHandler}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                autoComplete="new-password"
              />
            </div>
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              disabled={loading}
              className={`py-2 px-4 ${loading ? "bg-gray-400" : "bg-indigo-600"} text-white rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
            >
              {loading ? "Updating..." : "Update Profile"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Profile;
