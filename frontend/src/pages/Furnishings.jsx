import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ClipLoader from 'react-spinners/ClipLoader';
import { useDispatch } from 'react-redux';
import furnishings from "../assets/imgs/curtain.jpg";  // Example image
import { addItemToCart } from '../redux/features/cartSlice';
addItemToCart
const Furnishings = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/products/category/furnishings');
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

  const HeroSection = () => (
    <section className="relative h-screen bg-cover bg-center text-white flex items-center justify-center p-6" style={{ backgroundImage: `url(${furnishings})` }}>
      <div className="absolute inset-0 bg-black opacity-50"></div>
      <div className="relative z-10 text-center">
        <h1 className="text-5xl font-bold">Furnishings</h1>
        <p className="mt-4 text-lg">Explore our premium collection of home furnishings.</p>
      </div>
    </section>
  );

  const FeaturesSection = () => (
    <section className="py-16 text-center">
      <h2 className="text-4xl font-semibold mb-8">Features</h2>
      <div className="flex flex-wrap justify-center gap-8">
        <div className="w-80 p-6 bg-white shadow-lg rounded-lg mb-8">
          <h3 className="text-2xl font-bold mb-4">Premium Quality</h3>
          <p>All our furnishings are made from high-quality materials.</p>
        </div>
        <div className="w-80 p-6 bg-white shadow-lg rounded-lg mb-8">
          <h3 className="text-2xl font-bold mb-4">Stylish Designs</h3>
          <p>We offer a wide range of stylish designs to suit any home.</p>
        </div>
        <div className="w-80 p-6 bg-white shadow-lg rounded-lg mb-8">
          <h3 className="text-2xl font-bold mb-4">Affordable Prices</h3>
          <p>Get premium quality furnishings at affordable prices.</p>
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

  const TestimonialsSection = () => (
    <section className="py-16 bg-gray-100 text-center">
      <h2 className="text-4xl font-semibold mb-8">What Our Customers Say</h2>
      <div className="flex flex-wrap justify-center gap-8">
        <div className="w-80 p-6 bg-white shadow-lg rounded-lg mb-8">
          <p>
            "The sofa I bought is so comfortable and stylish. It fits perfectly in my living room."
          </p>
          <span className="block mt-4 font-bold">- Lisa M.</span>
        </div>
        <div className="w-80 p-6 bg-white shadow-lg rounded-lg mb-8">
          <p>
            "Great quality at an unbeatable price. I highly recommend these furnishings!"
          </p>
          <span className="block mt-4 font-bold">- Alex T.</span>
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
      <ProductGallery products={products} handleAddToCart={handleAddToCart} />
      <TestimonialsSection />
    </div>
  );
};

export default Furnishings;
