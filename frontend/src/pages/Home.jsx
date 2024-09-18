import React, { useState, useEffect } from 'react';
import ClipLoader from 'react-spinners/ClipLoader';
import { useNavigate } from 'react-router-dom';
import vedio from "../assets/imgs/login.mp4";

const Home = () => {
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const navigate = useNavigate();

  const carouselItems = [
    { src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQiRLZHmrG6FgrzVZbW5GthE6khBs0cLIqveQ&s', alt: 'Image 1', text: 'Slide 1' },
    { src: 'path-to-your-image2.jpg', alt: 'Image 2', text: 'Slide 2' },
    { src: 'path-to-your-image3.jpg', alt: 'Image 3', text: 'Slide 3' },
    { src: 'path-to-your-image3.jpg', alt: 'Image 3', text: 'Slide 3' },
    { src: 'path-to-your-image3.jpg', alt: 'Image 3', text: 'Slide 3' },
    { src: 'path-to-your-image3.jpg', alt: 'Image 3', text: 'Slide 3' },
    { src: 'path-to-your-image3.jpg', alt: 'Image 3', text: 'Slide 3' },
    { src: 'path-to-your-image3.jpg', alt: 'Image 3', text: 'Slide 3' },
    { src: 'path-to-your-image3.jpg', alt: 'Image 3', text: 'Slide 3' },
    { src: 'path-to-your-image3.jpg', alt: 'Image 3', text: 'Slide 3' },
    { src: 'path-to-your-image3.jpg', alt: 'Image 3', text: 'Slide 3' },
    { src: 'path-to-your-image3.jpg', alt: 'Image 3', text: 'Slide 3' },
    // Add more items as needed
  ];

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? carouselItems.length - 1 : prevIndex - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex === carouselItems.length - 1 ? 0 : prevIndex + 1));
  };

  return (
    <div className="relative overflow-hidden bg-gray-50">
      {loading ? (
        <div className="flex items-center justify-center min-h-screen bg-white">
          <ClipLoader color="#0000ff" size={50} />
        </div>
      ) : (
        <>
          {/* Hero Section */}
          <section className="relative h-screen flex items-center justify-center bg-cover bg-center">
            <video
              autoPlay
              loop
              muted
              className="absolute inset-0 w-full h-full object-cover"
            >
              <source src={vedio} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
            <div className="absolute inset-0 bg-black opacity-50"></div>
            <div className="relative z-10 text-white text-center">
              <h1 className="text-4xl font-bold mb-4">Discover Premium Curtains</h1>
              <p className="text-xl mb-6">Tailored for your home and style</p>
              <button
                className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg"
                onClick={() => navigate('/blinds-shades')}
              >
                Shop Now
              </button>
            </div>
          </section>

          {/* Features Section */}
          <section className="p-4 bg-white text-left">
            <h5 className="text-2xl font-semibold text-gray-800 mb-5 ml-72">
              <span className='text-red-700'>|</span> Bargaoui Products
            </h5>
            <p className="text-gray-600 ml-72 italic hover:not-italic tracking-tight">
              Start decorating your space the way you love with Bargaoui Rideaux Tahar's wide range of blinds, curtains, drapes, shades, wallpapers, folding doors, and more. <br /> Explore more to enjoy custom window coverings from Bargaoui Rideaux Tahar and bring your imagination to life.
            </p>
          </section>

          {/* Links Section */}
          <section className="p-8 bg-white text-center">
            <div className="max-w-4xl mx-auto">
              <div className="flex flex-wrap justify-center gap-4">
                <a href="/blinds-shades" className="text-lg text-blue-600 hover:underline">
                  Blinds & Shades
                </a>
                <span>|</span>
                <a href="/curtains-drapes" className="text-lg text-blue-600 hover:underline">
                  Curtains & Drapes
                </a>
                <span>|</span>
                <a href="/smart-home" className="text-lg text-blue-600 hover:underline">
                  Smart Home
                </a>
              </div>
            </div>
          </section>

          {/* Carousel Section */}
          <section className="relative p-8 bg-white text-center">
            <div className="max-w-4xl mx-auto relative overflow-hidden" style={{ width: '235px', height: '330.1px' }}>
              <div className="flex transition-transform duration-500" style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
                {carouselItems.map((item, index) => (
                  <div key={index} className="min-w-full flex justify-center items-center">
                    <img src={item.src} alt={item.alt} className="w-full h-full object-cover" />
                    <div className="absolute bottom-0 bg-black bg-opacity-50 text-white p-4">
                      {item.text}
                    </div>
                  </div>
                ))}
              </div>
              <button onClick={handlePrev} className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white px-2 py-1">Prev</button>
              <button onClick={handleNext} className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white px-2 py-1">Next</button>
            </div>
          </section>

          {/* Product Gallery Section */}
          <section className="py-16 bg-white">
            <h2 className="text-3xl font-semibold text-center mb-8 text-gray-800">Our Collection</h2>
            <div className="flex flex-wrap justify-center gap-8 px-4">
              <div className="w-64 bg-white p-4 rounded-lg shadow-sm">
                <img
                  className="w-full h-40 object-cover rounded-lg mb-4"
                  src="path-to-your-product-image.jpg"
                  alt="Product Name"
                />
                <h3 className="text-lg font-bold mb-2 text-gray-800">Product Name</h3>
                <p className="text-gray-600">Description of the product goes here.</p>
                <p className="mt-4 font-bold text-green-600 text-lg">$99.99</p>
                <button className="mt-2 px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg">
                  Add to Cart
                </button>
              </div>
            </div>
          </section>

          {/* Testimonials Section */}
          <section className="py-16 bg-white text-center">
            <h2 className="text-3xl font-semibold mb-8 text-gray-800">What Our Customers Say</h2>
            <div className="flex flex-wrap justify-center gap-8 px-4">
              {[
                { text: 'Absolutely beautiful curtains and excellent service!', author: 'Alice M.' },
                { text: 'High quality and impressive designs. Highly recommended!', author: 'Brian T.' },
              ].map((testimonial, index) => (
                <div
                  key={index}
                  className="w-64 p-4 bg-gray-100 rounded-lg shadow-sm"
                >
                  <p className="text-lg text-gray-700 mb-4">"{testimonial.text}"</p>
                  <span className="block text-gray-800 font-semibold">
                    - {testimonial.author}
                  </span>
                </div>
              ))}
            </div>
          </section>
        </>
      )}
    </div>
  );
};

export default Home;