import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { GoogleMap, LoadScriptNext } from '@react-google-maps/api';
import Footer from '../components/Footer'; // Import the Footer component

const mapContainerStyle = {
  width: '100%',
  height: '100%',
};

const Stores = () => {
  const [stores, setStores] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedStore, setSelectedStore] = useState(null);

  useEffect(() => {
    const fetchStores = async () => {
      try {
        const { data } = await axios.get('http://localhost:5000/api/stores'); // Replace with your API endpoint
        setStores(data);
        setSelectedStore(data[0]); // Select the first store by default
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchStores();
  }, []);

  const handleMapLoad = (map) => {
    if (google.maps.marker && google.maps.marker.AdvancedMarkerElement) {
      new google.maps.marker.AdvancedMarkerElement({
        position: {
          lat: selectedStore.latitude || 0,
          lng: selectedStore.longitude || 0,
        },
        map: map,
        title: selectedStore.name,
      });
    }
  };

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <div className="spinner">Loading...</div>
      </div>
    );
  }

  if (error) return <p>Error: {error}</p>;

  if (!selectedStore) return <p>No store selected or no valid coordinates.</p>;

  return (
    <div className="flex flex-col h-screen">
      <div className="flex flex-1">
        <aside className="w-1/4 bg-gray-100 p-8 overflow-y-auto">
          <h2 className="text-xl font-semibold mb-6">Our Stores</h2>
          <ul className="space-y-4 text-lg">
            {stores.map((store) => (
              <li
                key={store._id}
                onClick={() => setSelectedStore(store)}
                className={`cursor-pointer hover:text-blue-500 transition ${
                  selectedStore && selectedStore._id === store._id ? 'font-bold text-blue-700' : ''
                }`}
              >
                {store.name}
              </li>
            ))}
          </ul>
        </aside>

        <div className="flex-1 flex flex-col">
          {selectedStore && (
            <>
              <div className="flex-1">
                <LoadScriptNext
                  googleMapsApiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY} // Ensure this is set correctly
                  loadingElement={<div>Loading Maps...</div>}
                  async
                  defer
                >
                  <GoogleMap
                    mapContainerStyle={mapContainerStyle}
                    center={{
                      lat: selectedStore.latitude || 0,
                      lng: selectedStore.longitude || 0,
                    }}
                    zoom={15}
                    onLoad={handleMapLoad}
                  />
                </LoadScriptNext>
              </div>

              <div className="p-6 bg-white shadow-lg">
                <h2 className="text-2xl font-bold mb-2">{selectedStore.name}</h2>
                <p className="text-gray-700 mb-4">{selectedStore.address}</p>
                <p className="text-gray-700 mb-4"><strong>Phone:</strong> {selectedStore.phone}</p>
                <div className="mb-4">
                  <strong>Opening Hours:</strong>
                  {selectedStore.hours.map((hour, index) => (
                    <p key={index} className="text-gray-600">{hour}</p>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>
      </div>

      <Footer /> {/* Add Footer component here */}
    </div>
  );
};

export default Stores;