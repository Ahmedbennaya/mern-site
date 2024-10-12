import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import ClipLoader from 'react-spinners/ClipLoader';

const ProductPage = () => {
  const { id } = useParams();  // Get product ID from URL params
  const [product, setProduct] = useState(null);
  const [images, setImages] = useState({});
  const [activeImg, setActiveImage] = useState('');
  const [amount, setAmount] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
        setActiveImage(response.data.imageUrl);  // Set default image
        setLoading(false);
      } catch (error) {
        setError('Failed to load product details');
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  const handleAmountChange = (change) => {
    setAmount((prev) => Math.max(1, prev + change));  // Ensure amount doesn't go below 1
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <ClipLoader size={50} color="#4A90E2" />
      </div>
    );
  }

  if (error) {
    return <p className="text-center text-red-600 mt-10">{error}</p>;
  }

  return (
    <div className='flex flex-col justify-between lg:flex-row gap-16 lg:items-start p-6 lg:p-12'>
      {/* IMAGES */}
      <div className='flex flex-col gap-6 lg:w-2/4'>
        <img
          src={activeImg}
          alt={product.name}
          className='w-full h-full aspect-square object-cover rounded-xl transition-transform duration-300 ease-in-out'
        />
        <div className='flex gap-4 justify-center'>
          {Object.values(images).map((imageUrl, index) => (
            <img
              key={index}
              src={imageUrl}
              alt={`Product ${index + 1}`}
              className={`w-24 h-24 rounded-md cursor-pointer transition-transform duration-200 ${activeImg === imageUrl ? 'scale-110 border-2 border-violet-800' : ''}`}
              onClick={() => setActiveImage(imageUrl)}
            />
          ))}
        </div>
      </div>

      {/* ABOUT */}
      <div className='flex flex-col gap-4 lg:w-2/4'>
        <span className='text-violet-600 font-semibold uppercase'>Exclusive Collection</span>
        <h1 className='text-4xl font-bold text-gray-900'>{product.name}</h1>
        <p className='text-gray-700'>{product.description}</p>
        <h6 className='text-3xl font-semibold text-gray-900'>${product.price}</h6>

        {/* QUANTITY SELECTOR */}
        <div className='flex items-center gap-8 mt-4'>
          <div className='flex items-center'>
            <button
              className='bg-gray-300 px-4 py-2 rounded-l-lg text-violet-800 font-semibold'
              onClick={() => handleAmountChange(-1)}
            >
              -
            </button>
            <span className='px-6 py-3 text-xl font-semibold'>{amount}</span>
            <button
              className='bg-gray-300 px-4 py-2 rounded-r-lg text-violet-800 font-semibold'
              onClick={() => handleAmountChange(1)}
            >
              +
            </button>
          </div>

          <button className='bg-violet-800 text-white font-semibold py-3 px-16 rounded-lg h-full hover:bg-violet-900'>
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
