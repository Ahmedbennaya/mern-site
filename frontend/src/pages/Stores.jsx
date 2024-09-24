import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import './leaflet-custom.css'; // Import custom Leaflet CSS
import L from 'leaflet';
import { FiChevronDown } from 'react-icons/fi'; 

// Fix for default marker icon issue with Webpack
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
});

const mapContainerStyle = {
  width: '100%',
  height: '100%',
  flexGrow: 1, 
  position: 'relative',
};

const LocateUser = ({ mapRef }) => {
  const map = useMap();

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          const userLatLng = [latitude, longitude];
          map.setView(userLatLng, 14); 

          // Add a marker for the user's location
          L.marker(userLatLng).addTo(map).bindPopup("You are here").openPopup();

          mapRef.current = map;
        },
        (error) => {
          console.error("Error getting user location:", error);
        }
      );
    }
  }, [map, mapRef]);

  return null;
};

const Stores = () => {
  const [stores, setStores] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedStore, setSelectedStore] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const mapRef = useRef(null);

  useEffect(() => {
    const fetchStores = async () => {
      try {
        const { data } = await axios.get('https://mern-site-z5gs.onrender.com/api/stores'); 
        setStores(data);
        if (data.length > 0) {
          setSelectedStore(data[0]);
        }
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };
    fetchStores();
  }, []);

  const handleStoreClick = (store) => {
    setSelectedStore(store);
    if (mapRef.current) {
      mapRef.current.flyTo([store.latitude, store.longitude], 15);
      setTimeout(() => {
        mapRef.current.invalidateSize();
      }, 500);
    }
  };

  const handleMapInteraction = () => {
    if (mapRef.current) {
      mapRef.current.scrollWheelZoom.enable();
      mapRef.current.dragging.enable();
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="spinner">Loading...</div>
      </div>
    );
  }

  if (error) return <p>Error: {error}</p>;
  if (!stores.length) return <p>No stores available.</p>;

  return (
    <div className="flex flex-col lg:flex-row h-screen">
      <aside className={`bg-gray-100 p-4 lg:p-8 lg:w-1/4 overflow-y-auto ${isSidebarOpen ? 'block' : 'hidden'} lg:block`}>
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold mb-6">Our Stores</h2>
          <button
            className="lg:hidden p-2"
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          >
            <FiChevronDown className={`transform ${isSidebarOpen ? 'rotate-180' : ''}`} />
          </button>
        </div>
        <ul className="space-y-4 text-lg">
          {stores.map((store) => (
            <li
              key={store._id}
              onClick={() => handleStoreClick(store)}
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
            <div className="relative h-[40vh] lg:h-full" onClick={handleMapInteraction}>
              <MapContainer
                style={mapContainerStyle}
                center={[selectedStore.latitude || 0, selectedStore.longitude || 0]}
                zoom={15}
                whenCreated={(mapInstance) => { 
                  mapRef.current = mapInstance;
                  mapInstance.scrollWheelZoom.disable(); 
                  mapInstance.dragging.disable(); 
                }}
              >
                <TileLayer
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                />
                <LocateUser mapRef={mapRef} /> 
                {stores.map((store) => (
                  <Marker 
                    key={store._id} 
                    position={[store.latitude, store.longitude]}
                    opacity={selectedStore._id === store._id ? 1 : 0.5}
                  >
                    <Popup>
                      <img src={store.imageUrl} className="w-full h-auto" />
                      <h3>{store.name}</h3>
                    </Popup>
                  </Marker>
                ))}
              </MapContainer>
            </div>

            <div className="p-4 lg:p-6 bg-white shadow-lg">
              {selectedStore.imageUrl && (
                <img
                  src={selectedStore.imageUrl}
                  alt={selectedStore.name}
                  className="w-full h-64 object-cover mb-4 lg:h-80"
                />
              )}
              <h2 className="text-2xl font-bold mb-2">{selectedStore.name}</h2>
              <p className="text-gray-700 mb-4">{selectedStore.address}</p>
              <p className="text-gray-700 mb-4"><strong>Phone:</strong> {selectedStore.phone}</p>
              <div className="mb-4">
                <strong>Opening Hours:</strong>
                {selectedStore.hours && selectedStore.hours.map((hour, index) => (
                  <p key={index} className="text-gray-600">{hour}</p>
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Stores;
