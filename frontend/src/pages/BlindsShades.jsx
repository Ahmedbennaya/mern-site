import React, { useState, useEffect } from 'react';
import axios from 'axios';

const SmartHome = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/products');
        console.log('Fetched products:', response.data);
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
        setError('Failed to load products');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="font-sans">
      {/* Hero Section */}
      <section
        className="bg-cover bg-center h-screen text-white flex items-center justify-center text-center p-6"
        style={{ backgroundImage: 'url(/path-to-your-image.jpg)' }}
      >
        <div>
          <h1 className="text-5xl font-bold">Smart Home Curtains</h1>
          <p className="text-2xl mt-4">Enhance your home with cutting-edge smart curtain technology.</p>
          <button className="mt-8 px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-lg">
            Learn More
          </button>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 text-center bg-gray-100">
        <h2 className="text-4xl font-semibold mb-8">Features</h2>
        <div className="flex flex-wrap justify-center space-x-8">
          <div className="w-80 p-6 bg-white shadow-lg rounded-lg mb-8">
            <h3 className="text-2xl font-bold mb-4">Voice Control</h3>
            <p>Control your curtains with voice commands through your favorite smart assistants.</p>
          </div>
          <div className="w-80 p-6 bg-white shadow-lg rounded-lg mb-8">
            <h3 className="text-2xl font-bold mb-4">Remote Access</h3>
            <p>Open and close your curtains from anywhere with your smartphone.</p>
          </div>
          <div className="w-80 p-6 bg-white shadow-lg rounded-lg mb-8">
            <h3 className="text-2xl font-bold mb-4">Energy Efficiency</h3>
            <p>Automatically adjust your curtains to optimize energy savings.</p>
          </div>
        </div>
      </section>

      {/* Product Gallery Section */}
      <section className="py-16">
        <h2 className="text-4xl font-semibold text-center mb-8">Product Gallery</h2>
        <div className="flex flex-wrap justify-center space-x-8">
          {products.length > 0 ? (
            products.map((product) => (
              <div key={product._id} className="w-80 p-6 bg-white shadow-lg rounded-lg mb-8">
                <img
                  className="w-full h-56 object-cover rounded-lg mb-4"
                  src={product.imageUrl}
                  alt={product.name}
                />
                <h3 className="text-2xl font-bold mb-4">{product.name}</h3>
                <p>{product.description}</p>
                <p className="mt-4 font-bold">${product.price.toFixed(2)}</p>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500">No products available.</p>
          )}
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 bg-gray-100 text-center">
        <h2 className="text-4xl font-semibold mb-8">What Our Customers Say</h2>
        <div className="flex flex-wrap justify-center space-x-8">
          <div className="w-80 p-6 bg-white shadow-lg rounded-lg mb-8">
            <p>"These smart curtains have changed the way I control light in my home. So convenient!"</p>
            <span className="block mt-4 font-bold">- Sarah K.</span>
          </div>
          <div className="w-80 p-6 bg-white shadow-lg rounded-lg mb-8">
            <p>"I love being able to close my curtains with a voice command. It's a game-changer!"</p>
            <span className="block mt-4 font-bold">- John D.</span>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SmartHome;
