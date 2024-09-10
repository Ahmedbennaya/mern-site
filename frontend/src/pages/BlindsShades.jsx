import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ClipLoader from 'react-spinners/ClipLoader';
import { useDispatch } from 'react-redux';
import curtain from "../assets/imgs/curtain.jpg";
import { addItemToCart } from '../redux/features/cartSlice';

const BlindsShades = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState({ minPrice: 0, maxPrice: 1000 }); // Added filter state
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/products/category/blinds-shades');
        setProducts(response.data);
      } catch (error) {
        setError('Failed to load products');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleAddToCart = (product) => {
    dispatch(addItemToCart(product));
  };

  // Filter products based on price range
  const filteredProducts = products.filter(
    (product) => product.price >= filter.minPrice && product.price <= filter.maxPrice
  );

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilter((prevFilter) => ({
      ...prevFilter,
      [name]: value,
    }));
  };

  const HeroSection = () => (
    <section className="relative h-screen bg-cover bg-center text-white flex items-center justify-center p-6" style={{ backgroundImage: `url(${curtain})` }}>
      <div className="absolute inset-0 bg-black opacity-50"></div>
      <div className="relative z-10 text-center">
        <h1 className="text-5xl font-bold">Blinds & Shades</h1>
        <p className="mt-4 text-lg">Discover our range of stylish blinds and shades for every room.</p>
      </div>
    </section>
  );

  const FeaturesSection = () => (
    <section className="py-16 text-center">
      <h2 className="text-4xl font-semibold mb-8">Features</h2>
      <div className="flex flex-wrap justify-center gap-8">
        <div className="w-80 p-6 bg-white shadow-lg rounded-lg mb-8">
          <h3 className="text-2xl font-bold mb-4">Light Control</h3>
          <p>Control the amount of light entering your room with our customizable blinds and shades.</p>
        </div>
        <div className="w-80 p-6 bg-white shadow-lg rounded-lg mb-8">
          <h3 className="text-2xl font-bold mb-4">Privacy</h3>
          <p>Enjoy enhanced privacy with our premium quality blinds.</p>
        </div>
        <div className="w-80 p-6 bg-white shadow-lg rounded-lg mb-8">
          <h3 className="text-2xl font-bold mb-4">Easy Installation</h3>
          <p>Quick and easy installation for all our blinds and shades.</p>
        </div>
      </div>
    </section>
  );

  const ProductGallery = ({ products, handleAddToCart }) => (
    <section className="py-16">
      <h2 className="text-4xl font-semibold text-center mb-8">Product Gallery</h2>
      <div className="flex flex-wrap justify-center gap-8">
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
              <button
                onClick={() => handleAddToCart(product)}
                className="mt-4 px-6 py-2 bg-green-600 hover:bg-green-500 text-white rounded-lg text-lg transition duration-300"
              >
                Add to Cart
              </button>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500">No products available.</p>
        )}
      </div>
    </section>
  );

  const FilterSection = () => (
    <section className="py-8 text-center">
      <h2 className="text-2xl font-semibold mb-4">Filter Products</h2>
      <div className="flex justify-center gap-4 mb-8">
        <div>
          <label className="block text-lg font-medium mb-2">Min Price</label>
          <input
            type="number"
            name="minPrice"
            value={filter.minPrice}
            onChange={handleFilterChange}
            className="border border-gray-300 rounded-lg p-2"
          />
        </div>
        <div>
          <label className="block text-lg font-medium mb-2">Max Price</label>
          <input
            type="number"
            name="maxPrice"
            value={filter.maxPrice}
            onChange={handleFilterChange}
            className="border border-gray-300 rounded-lg p-2"
          />
        </div>
      </div>
    </section>
  );

  const TestimonialsSection = () => (
    <section className="py-16 bg-gray-100 text-center">
      <h2 className="text-4xl font-semibold mb-8">What Our Customers Say</h2>
      <div className="flex flex-wrap justify-center gap-8">
        <div className="w-80 p-6 bg-white shadow-lg rounded-lg mb-8">
          <p>
            "These blinds have added a lot of style and functionality to my living room."
          </p>
          <span className="block mt-4 font-bold">- Jane S.</span>
        </div>
        <div className="w-80 p-6 bg-white shadow-lg rounded-lg mb-8">
          <p>
            "I can now control the lighting in my office with just a remote. Love it!"
          </p>
          <span className="block mt-4 font-bold">- Mike L.</span>
        </div>
      </div>
    </section>
  );

  if (loading)
    return (
      <div className="flex items-center justify-center h-screen bg-white">
        <ClipLoader color="#0000ff" size={50} />
      </div>
    );

  if (error)
    return <p className="text-center mt-10 text-red-600">{error}</p>;

  return (
    <div className="font-sans bg-white text-gray-900">
      <HeroSection />
      <FeaturesSection />
      <FilterSection /> {/* Filter section added */}
      <ProductGallery products={filteredProducts} handleAddToCart={handleAddToCart} />
      <TestimonialsSection />
    </div>
  );
};

export default BlindsShades;
