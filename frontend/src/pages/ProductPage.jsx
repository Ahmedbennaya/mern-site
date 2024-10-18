import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../redux/features/cartSlice'; // Import addToCart action
import ClipLoader from 'react-spinners/ClipLoader';
import toast from 'react-hot-toast';

const ProductPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [images, setImages] = useState({});
  const [activeImg, setActiveImage] = useState('');
  const [amount, setAmount] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.auth); 

  // Fetch product details
  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`https://mern-site-z5gs.onrender.com/api/products/${id}`);
        setProduct(response.data);
        setImages({
          img1: response.data.imageUrl,
          img2: response.data.imageUrl2,
          img3: response.data.imageUrl3,
          img4: response.data.imageUrl4,
        });
        setActiveImage(response.data.imageUrl);
      } catch (error) {
        toast.error(`Please log in to add ${product.name} to your cart.`);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  // Handle quantity change
  const handleAmountChange = (change) => {
    setAmount((prev) => Math.max(1, prev + change));
  };

  // Handle add to cart
  const handleAddToCart = () => {
    if (!userInfo) {
      toast.error(`Please log in to add ${product.name} to your cart.`);
      return;
    }
    // Dispatch the addToCart action
    dispatch(addToCart({ userId: userInfo._id, productId: product._id, quantity: amount }));
  };

  // Loading spinner while product details are fetched
  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <ClipLoader size={50} color="#4A90E2" />
      </div>
    );
  }

  // Show error if product details couldn't be loaded
  if (error) {
    return <p className="text-center text-red-600 mt-10">{error}</p>;
  }

  return (
    <div className="container mx-auto px-4 py-10">
      <div className="flex flex-col lg:flex-row gap-16 items-start justify-center">
        {/* IMAGES */}
        <div className="lg:w-1/2 flex flex-col gap-6">
          <img
            src={activeImg}
            alt={product.name}
            className="w-full h-full aspect-square object-cover rounded-xl transition-transform duration-500 ease-in-out shadow-xl"
          />
          <div className="flex gap-4 justify-center mt-4">
            {Object.values(images).map((imageUrl, index) => (
              <img
                key={index}
                src={imageUrl}
                alt={`Product ${index + 1}`}
                className={`w-20 h-20 rounded-full border-2 border-transparent cursor-pointer transition-transform duration-300 ease-in-out hover:scale-110 hover:border-violet-800 ${
                  activeImg === imageUrl ? 'scale-110 border-violet-800' : ''
                }`}
                onClick={() => setActiveImage(imageUrl)}
              />
            ))}
          </div>
        </div>

        {/* PRODUCT DETAILS */}
        <div className="lg:w-1/2 flex flex-col gap-4">
          <span className="text-lg font-semibold text-gray-600 uppercase tracking-wide">
            Exclusive Collection
          </span>
          <h1 className="text-5xl font-extrabold text-gray-900 tracking-tight">
            {product.name}
          </h1>
          <p className="text-xl text-gray-700 leading-relaxed">
            {product.description}
          </p>
          <h2 className="text-4xl font-bold text-gray-900 my-4">DT: {product.price}</h2>

          {/* QUANTITY SELECTOR */}
          <div className="flex items-center gap-8">
            <div className="flex items-center border rounded-lg overflow-hidden">
              <button
                className="bg-gray-200 text-gray-600 px-4 py-2 text-xl font-semibold focus:outline-none hover:bg-gray-300 transition-all"
                onClick={() => handleAmountChange(-1)}
              >
                -
              </button>
              <span className="px-6 py-2 text-2xl font-semibold text-gray-900">
                {amount}
              </span>
              <button
                className="bg-gray-200 text-gray-600 px-4 py-2 text-xl font-semibold focus:outline-none hover:bg-gray-300 transition-all"
                onClick={() => handleAmountChange(1)}
              >
                +
              </button>
            </div>

            {/* ADD TO CART */}
            <button
              className="bg-violet-800 text-white font-bold py-3 px-16 rounded-lg shadow-lg hover:bg-violet-900 transition-transform duration-300 transform hover:scale-105"
              onClick={handleAddToCart}
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
