import React, { useState } from "react";
import axios from "axios";

const BookConsultation = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    zipCode: "",
    textConsent: false,
  });
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccessMessage("");
    setErrorMessage("");

    try {
      const response = await axios.post(
        "http://localhost:5000/api/book-consultation",
        {
          name: `${formData.firstName} ${formData.lastName}`,
          email: formData.email,
          phone: formData.phone,
          message: `Zip Code: ${formData.zipCode}`,
        },
        { headers: { "Content-Type": "application/json" } }
      );
      setLoading(false);
      setSuccessMessage(response.data.message);
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        zipCode: "",
        textConsent: false,
      });
    } catch (error) {
      setLoading(false);
      setErrorMessage(error.response?.data?.message || "Error occurred.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
      <div className="bg-white w-full max-w-md p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-center mb-4">
          We do it all for you: design, measure & install.
        </h2>
        {successMessage && <p className="text-green-500">{successMessage}</p>}
        {errorMessage && <p className="text-red-500">{errorMessage}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                First Name *
              </label>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                required
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Last Name *
              </label>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                required
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email *
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Phone Number *
              </label>
              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Zip Code *
              </label>
              <input
                type="text"
                name="zipCode"
                value={formData.zipCode}
                onChange={handleChange}
                required
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              name="textConsent"
              checked={formData.textConsent}
              onChange={handleChange}
              className="h-4 w-4 border-gray-300"
            />
            <label className="text-sm text-gray-700">
              You may text me to assist in scheduling my appointment. I
              understand I may opt-out at any time.
            </label>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-teal-700 hover:bg-teal-800 text-white py-3 rounded mt-4"
          >
            {loading ? "Booking..." : "BOOK FREE CONSULTATION"}
          </button>
        </form>

        <div className="text-center mt-4 text-gray-500">
          or call <span className="font-semibold text-black">(216)50929292</span>
        </div>

        <div className="mt-6 text-center text-gray-500 text-sm">
          <p>
            Your information with Stoneside is secure. We will never sell or
            share your information.
          </p>
        </div>

        <div className="mt-6 text-center text-gray-500 text-sm">
          <p>As seen in</p>
          <p className="font-semibold text-black">Better Homes & Gardens</p>
        </div>
      </div>
    </div>
  );
};

export default BookConsultation;
