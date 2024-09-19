// src/Home.js
import React, { useState, useEffect } from 'react';
import ClipLoader from 'react-spinners/ClipLoader';
import { useNavigate } from 'react-router-dom';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import video from "../assets/imgs/login.mp4"; // Corrected 'vedio' to 'video'

const Home = () => {
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState('Blinds & Shades'); // State to track selected category
  const navigate = useNavigate();

  const carouselData = {
    'Blinds & Shades': [
      { src: 'https://variations-cdn.figpii.com/variations/stoneside/plp_pdp_redesign/solar-shades1-low.webp?v=020219888', alt: 'Blinds Image 1', path: '/blinds-shades' },
      { src: 'https://res.cloudinary.com/dc1zy9h63/image/upload/v1726677158/transitional-shades-living-room-covert-cream-235_edcswd.webp', alt: 'Blinds Image 2', path: '/blinds-shades' },
      { src: 'https://res.cloudinary.com/dc1zy9h63/image/upload/v1726678982/front-fold-roman-shade-living-room-off-limits-pearl-teal-walls_v1eohj.webp', alt: 'Blinds Image 3', path: '/blinds-shades' },
    ],
    'Curtains & Drapes': [
      { src: 'https://res.cloudinary.com/dc1zy9h63/image/upload/v1726680359/roller-shades-dining-room-essential-eclipse-rafia-731-geometric-accent-wall-thumbnail_ruaq0r.webp', alt: 'Curtain Image 1', path: '/curtains-drapes' },
      { src: 'https://res.cloudinary.com/dc1zy9h63/image/upload/v1726680359/roman-shades-spencer-valance-entryway-cream-and-grey-overlapping-geometric-pattern-fabric-thumbnail_jgkq7x.webp', alt: 'Curtain Image 2', path: '/curtains-drapes' },
      { src: 'https://res.cloudinary.com/dc1zy9h63/image/upload/v1726680473/stoneside-custom-drapery-inverted-pleat-living-room-take-away-snow-thumbnail_ihrk2x.webp', alt: 'Curtain Image 3', path: '/curtains-drapes' },
    ],
    'Smart Home': [
      { src: 'https://example.com/smarthome1.jpg', alt: 'Smart Home Image 1', path: '/smart-home' },
      { src: 'https://example.com/smarthome2.jpg', alt: 'Smart Home Image 2', path: '/smart-home' },
      { src: 'https://example.com/smarthome3.jpg', alt: 'Smart Home Image 3', path: '/smart-home' },
    ],
  };

  const carouselItems = carouselData[category]; // Select carousel items based on selected category

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    autoplay: true,
    autoplaySpeed: 7000, // 7 seconds
  };

  return (
    <div className="relative overflow-hidden bg-gray-50">
      {loading ? (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-white">
          <div className="text-center">
            <ClipLoader color="#0000ff" size={50} />
            <p className="mt-4 text-blue-600 text-lg">Loading, please wait...</p>
          </div>
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
              <source src={video} type="video/mp4" />
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
                <button
                  onClick={() => setCategory('Blinds & Shades')}
                  className={`text-lg ${category === 'Blinds & Shades' ? 'text-blue-800 font-bold' : 'text-blue-600'} hover:underline`}
                >
                  Blinds & Shades
                </button>
                <span>|</span>
                <button
                  onClick={() => setCategory('Curtains & Drapes')}
                  className={`text-lg ${category === 'Curtains & Drapes' ? 'text-blue-800 font-bold' : 'text-blue-600'} hover:underline`}
                >
                  Curtains & Drapes
                </button>
                <span>|</span>
                <button
                  onClick={() => setCategory('Smart Home')}
                  className={`text-lg ${category === 'Smart Home' ? 'text-blue-800 font-bold' : 'text-blue-600'} hover:underline`}
                >
                  Smart Home
                </button>
              </div>
            </div>
          </section>

          {/* Slick Carousel Section */}
          <section className="relative p-8 bg-white text-center">
            <div className="max-w-6xl mx-auto flex items-center justify-between">
              {/* Left Side: Carousel */}
              <div className="w-2/3">
                <Slider {...settings}>
                  {carouselItems.map((item, index) => (
                    <div key={index} onClick={() => navigate(item.path)} className="cursor-pointer">
                      <div className="flex justify-center items-center">
                        <img src={item.src} alt={item.alt} className="w-full h-full object-cover" />
                      </div>
                    </div>
                  ))}
                </Slider>
              </div>

              {/* Right Side: Dynamic Text Based on Category */}
              <div className="w-1/3 text-left pl-8">
                <h3 className="text-2xl font-semibold mb-4 text-gray-800">About {category}</h3>
                <p className="text-gray-600">
                  {category === 'Blinds & Shades' && (
                    <>
                      Explore our wide selection of blinds and shades that offer privacy, light control, and style.
                    </>
                  )}
                  {category === 'Curtains & Drapes' && (
                    <>
                      Browse our elegant curtains and drapes to add a touch of luxury to your home.
                    </>
                  )}
                  {category === 'Smart Home' && (
                    <>
                      Discover smart solutions to enhance your home's comfort, security, and efficiency.
                    </>
                  )}
                </p>
              </div>
            </div>
          </section>

          {/* Consultation Section */}
          <section className="flex flex-col md:flex-row items-center bg-gray-100 text-gray-900 p-10 relative">
            {/* Left Section (Text) */}
            <div className="md:w-1/2 text-center md:text-left p-8">
              <p className="text-sm uppercase tracking-widest text-gray-600 mb-2">Let's bring our showroom to you!</p>
              <h2 className="text-4xl font-bold mb-4 font-serif leading-tight">
                Get a free in-home <br /> design consultation
              </h2>
              <p className="text-lg mb-6 font-light text-gray-700">
                Experience personalized design services at the comfort of your own home.
              </p>
              <button
                className="inline-flex items-center px-6 py-3 bg-black text-white font-semibold rounded-full hover:bg-gray-800 transition duration-300 shadow-lg"
                onClick={() => navigate('/book-consultation')}
              >
                {/* Icon in Button */}
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m-6-6h6m0 0h6" />
                </svg>
                Book a Free Consultation
              </button>
            </div>

            {/* Right Section (Image) */}
            <div className="md:w-1/2">
              <img src="https://res.cloudinary.com/dc1zy9h63/image/upload/v1726688230/agencement_rvnhmz.jpg" alt="Consultation" className="object-cover w-full h-full rounded-lg shadow-lg" />
            </div>
          </section>
        </>
      )}
    </div>
  );
};

export default Home;
