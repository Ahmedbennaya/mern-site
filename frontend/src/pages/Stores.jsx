import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

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
};

const LocateUser = ({ mapRef }) => {
  const map = useMap();

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;
        const userLatLng = [latitude, longitude];
        map.setView(userLatLng, 14); // Center the map on the user's location

        // Optionally, add a marker for the user's location
        const userMarker = L.marker(userLatLng).addTo(map).bindPopup("You are here").openPopup();

        // Update mapRef to keep track of map instance
        mapRef.current = map;
      });
    }
  }, [map, mapRef]);

  return null;
};

const Stores = () => {
  const [stores, setStores] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedStore, setSelectedStore] = useState(null);
  const mapRef = useRef();

  useEffect(() => {
    const fetchStores = async () => {
      try {
        const { data } = await axios.get('http://localhost:5000/api/stores'); // Adjust to your backend URL
        setStores(data);
        if (data.length > 0) {
          setSelectedStore(data[0]); // Select the first store as default
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
      mapRef.current.flyTo([store.latitude, store.longitude], 15); // Smooth transition to store location
      setTimeout(() => {
        mapRef.current.invalidateSize(); // Refresh map layout to ensure the view updates
      }, 500); // Delay to ensure the map transitions first
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
    <div className="flex flex-col h-screen">
      <div className="flex flex-1">
        <aside className="w-1/4 bg-gray-100 p-8 overflow-y-auto">
          <h2 className="text-xl font-semibold mb-6">Our Stores</h2>
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
              <div className="flex-1">
                <MapContainer
                  style={mapContainerStyle}
                  center={[selectedStore.latitude || 0, selectedStore.longitude || 0]}
                  zoom={15}
                  whenCreated={(mapInstance) => { mapRef.current = mapInstance; }}
                >
                  <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  />
                  <LocateUser mapRef={mapRef} /> {/* User location tracking */}
                  {stores.map((store) => (
                    <Marker 
                      key={store._id} 
                      position={[store.latitude, store.longitude]}
                      opacity={selectedStore._id === store._id ? 1 : 0.5} // Highlight selected store's marker
                    >
                      <Popup>
                        {store.name}<br/>{store.address}<br/>{store.phone}
                      </Popup>
                    </Marker>
                  ))}
                </MapContainer>
              </div>

              <div className="p-6 bg-white shadow-lg">
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
    </div>
  );
};

export default Stores;