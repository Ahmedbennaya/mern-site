import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const EditStore = () => {
  const { storeId } = useParams();
  const history = useNavigate();
  const [store, setStore] = useState({
    name: '',
    address: '',
    phone: '',
    latitude: '',
    longitude: '',
    hours: [],
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStore = async () => {
      try {
        const { data } = await axios.get(`http://localhost:5000/api/stores/${storeId}`);
        setStore(data);
        setLoading(false);
      } catch (error) {
        setError('Failed to load store data');
        setLoading(false);
      }
    };

    fetchStore();
  }, [storeId]);

  const handleChange = (e) => {
    setStore({
      ...store,
      [e.target.name]: e.target.value,
    });
  };

  const handleHoursChange = (e, index) => {
    const newHours = [...store.hours];
    newHours[index] = e.target.value;
    setStore({
      ...store,
      hours: newHours,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:5000/api/stores/${storeId}`, store);
      history.push('/admin/stores'); // Redirect to stores list
    } catch (error) {
      setError('Failed to update store');
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="max-w-lg mx-auto mt-10">
      <h2 className="text-2xl font-bold mb-6">Edit Store</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700">Store Name</label>
          <input
            type="text"
            name="name"
            value={store.name}
            onChange={handleChange}
            className="w-full p-2 border rounded-lg"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Address</label>
          <input
            type="text"
            name="address"
            value={store.address}
            onChange={handleChange}
            className="w-full p-2 border rounded-lg"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Phone</label>
          <input
            type="text"
            name="phone"
            value={store.phone}
            onChange={handleChange}
            className="w-full p-2 border rounded-lg"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Latitude</label>
          <input
            type="number"
            name="latitude"
            value={store.latitude}
            onChange={handleChange}
            className="w-full p-2 border rounded-lg"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Longitude</label>
          <input
            type="number"
            name="longitude"
            value={store.longitude}
            onChange={handleChange}
            className="w-full p-2 border rounded-lg"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Opening Hours</label>
          {store.hours.map((hour, index) => (
            <input
              key={index}
              type="text"
              value={hour}
              onChange={(e) => handleHoursChange(e, index)}
              className="w-full p-2 border rounded-lg mb-2"
            />
          ))}
        </div>
        <button
          type="submit"
          className="bg-purple-600 text-white px-6 py-2 rounded-lg"
        >
          Update Store
        </button>
      </form>
    </div>
  );
};

export default EditStore;
