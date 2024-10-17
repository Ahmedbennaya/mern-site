import React, { useState, useEffect } from 'react';
import ClipLoader from 'react-spinners/ClipLoader';
import { useNavigate } from 'react-router-dom';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import AOS from 'aos';
import 'aos/dist/aos.css';

const Home = () => {
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState('Blinds & Shades');
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
      { src: 'https://res.cloudinary.com/dc1zy9h63/image/upload/v1726745576/Tuya-Smart-Blind-Motor-Wifi-Automatic-Electric-Roller-Shutter-Shadows-App-Control-Lifting-Curtain-Opening-Closing_vg77e5.webp', alt: 'Smart Home Image 1', path: '/smart-home' },
      { src: 'https://res.cloudinary.com/dc1zy9h63/image/upload/v1726745626/Battery-Tuya-WiFi-Smart-Shade-Chain-Curtin-Motor-with-APP-WiFi-Remote-Control-Roller-Blinds-Drive-Motor_ua8dlk.webp', alt: 'Smart Home Image 2', path: '/smart-home' },
      { src: 'https://res.cloudinary.com/dc1zy9h63/image/upload/v1726745779/71gfPRvFqMS._AC_SL1500__xndpak.jpg', alt: 'Smart Home Image 3', path: '/smart-home' },
    ],
  };

  const carouselItems = carouselData[category];

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  return (
    <div className="relative overflow-hidden bg-white">
      {loading ? (
        <div className="flex items-center justify-center min-h-screen bg-white">
          <div className="text-center">
            <ClipLoader color="#0000ff" size={50} />
            <p className="mt-4 text-blue-600 text-lg" aria-live="polite">Loading, please wait...</p>
          </div>
        </div>
      ) : (
        <>
          {/* Hero Section with Parallax Effect */}
          <section
            className="relative h-screen flex items-center justify-center bg-cover bg-center bg-white"
            style={{ backgroundAttachment: 'fixed' }}
            data-aos="fade-up"
          >
            <video
              autoPlay
              loop
              muted
              className="absolute inset-0 w-full h-full object-cover"
            >
              <source src="https://res.cloudinary.com/dc1zy9h63/video/upload/v1727056844/login_ckvyiy.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
            <div className="absolute inset-0 bg-black opacity-50"></div>
            <div className="relative z-10 text-white text-center">
              <h1 className="text-4xl md:text-6xl font-bold mb-4" data-aos="fade-down">Discover Premium Curtains</h1>
              <p className="text-xl md:text-2xl mb-6" data-aos="fade-up">Tailored for your home and style</p>
              <button
                className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg"
                onClick={() => navigate('/blinds-shades')}
                data-aos="fade-right"
              >
                Shop Now
              </button>
            </div>
          </section>

          {/* Features Section */}
          <section id="features" className="p-4 bg-white text-left" data-aos="fade-up">
            <h5 className="text-2xl font-semibold text-gray-800 mb-5 ml-4 md:ml-72">
              <span className='text-red-700'>|</span> Bargaoui Products
            </h5>
            <p className="text-gray-600 ml-4 md:ml-72 italic hover:not-italic tracking-tight">
              Start decorating your space with Bargaoui Rideaux Tahar's wide range of blinds, curtains, shades, and more.
            </p>
          </section>

          {/* Links Section */}
          <section className="p-8 bg-white text-center" data-aos="fade-up">
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
          <section className="relative p-8 bg-white text-center" data-aos="zoom-in">
            <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between">
              {/* Left Side: Carousel */}
              <div className="md:w-2/3 w-full mb-8 md:mb-0">
                <Slider {...settings}>
                  {carouselItems.map((item, index) => (
                    <div key={index} onClick={() => navigate(item.path)} className="cursor-pointer">
                      <div className="relative flex justify-center items-center group">
                        <img
                          src={item.src}
                          alt={item.alt}
                          className="w-full h-full object-cover transition-transform duration-300 transform group-hover:scale-110 group-hover:opacity-80"
                        />
                      </div>
                    </div>
                  ))}
                </Slider>
              </div>

              {/* Right Side: Dynamic Text Based on Category */}
              <div className="md:w-1/3 w-full text-left md:pl-8">
                <h3 className="text-2xl font-semibold mb-4 text-gray-800" data-aos="fade-left"> {category}</h3>
                <p className="text-gray-600">
                  {category === 'Blinds & Shades' && (
                    <>
                      Explore our wide selection of blinds and shades for privacy, light control, and style.
                    </>
                  )}
                  {category === 'Curtains & Drapes' && (
                    <>
                      Browse our elegant curtains and drapes for a touch of luxury in your home.
                    </>
                  )}
                  {category === 'Smart Home' && (
                    <>
                      Discover smart home solutions to enhance comfort, security, and efficiency.
                    </>
                  )}
                </p>
              </div>
            </div>
          </section>

          {/* Instagram-style New Plants Section */}
<section className="container mx-auto px-4 mt-12 bg-white" data-aos="fade-up">
  <h2 className="text-2xl font-bold mb-6">New Plants</h2>
  <div className="grid grid-cols-3 sm:grid-cols-3 md:grid-cols-3 gap-2">
    <div className="relative bg-white rounded-lg overflow-hidden shadow-md">
      <img aria-hidden="true" alt="Bird's Nest Fern" src="https://res.cloudinary.com/dc1zy9h63/image/upload/v1729167719/Snapinsta.app_166841440_288889239262337_3816664965631122455_n_1080_shisys.jpg" className="w-full h-full object-cover" />
      <div className="absolute bottom-0 left-0 bg-black bg-opacity-50 text-white p-2">
     
      </div>
    </div>
    <div className="relative bg-white rounded-lg overflow-hidden shadow-md">
      <img aria-hidden="true" alt="Hoya Obovata" src="https://res.cloudinary.com/dc1zy9h63/image/upload/v1728548645/Plan_de_travail_2_f40a2v.png" className="w-full h-full object-cover" />
      <div className="absolute bottom-0 left-0 bg-black bg-opacity-50 text-white p-2">

      </div>
    </div>
    <div className="relative bg-white rounded-lg overflow-hidden shadow-md">
      <img aria-hidden="true" alt="Monstera Deliciosa" src="https://res.cloudinary.com/dc1zy9h63/image/upload/v1728548645/Plan_de_travail_1_myhnxo.png" className="w-full h-full object-cover" />
      <div className="absolute bottom-0 left-0 bg-black bg-opacity-50 text-white p-2">
   
      </div>
    </div>
    <div className="relative bg-white rounded-lg overflow-hidden shadow-md">
      <img aria-hidden="true" alt="Zamioculcas Zamiifolia" src="https://res.cloudinary.com/dc1zy9h63/image/upload/v1729167554/Snapinsta.app_260489055_312813233997546_3962508741415414694_n_1080_iuqr5e.jpg" className="w-full h-full object-cover" />
      <div className="absolute bottom-0 left-0 bg-black bg-opacity-50 text-white p-2">
 
      </div>
    </div>
    <div className="relative bg-white rounded-lg overflow-hidden shadow-md">
      <img aria-hidden="true" alt="Bird of Paradise" src="https://res.cloudinary.com/dc1zy9h63/image/upload/v1729167556/Snapinsta.app_259718490_431808181689158_164928793077677220_n_1080_hrakgb.jpg" className="w-full h-full object-cover" />
      <div className="absolute bottom-0 left-0 bg-black bg-opacity-50 text-white p-2">

      </div>
    </div>
    <div className="relative bg-white rounded-lg overflow-hidden shadow-md">
      <img aria-hidden="true" alt="Calathea Beauty Star" src="https://res.cloudinary.com/dc1zy9h63/image/upload/v1729167557/Snapinsta.app_259883577_111827747992732_4238635259253138411_n_1080_rkhqhq.jpg" className="w-full h-full object-cover" />
      <div className="absolute bottom-0 left-0 bg-black bg-opacity-50 text-white p-2">
   
      </div>
    </div>
  </div>
  <div className="mt-6 text-center">
    <a href="/curtains-drapes" className="bg-primary text-primary-foreground hover:bg-primary/80 py-2 px-4 rounded-lg">Shop Now</a>
  </div>
</section>

          {/* Consultation Section */}
          <section className="flex flex-col md:flex-row items-center bg-white text-gray-900 p-10 relative" data-aos="fade-up">
            {/* Left Section (Text) */}
            <div className="md:w-1/2 text-center md:text-left p-8">
              <p className="text-sm uppercase tracking-widest text-gray-600 mb-2">Let's bring our showroom to you!</p>
              <h2 className="text-4xl font-bold mb-4 font-serif leading-tight">
                Get a free in-home <br /> design consultation
              </h2>
              <p className="text-lg mb-6 font-light text-gray-700">
                Experience personalized design services at the comfort of your home.
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
            <div className="md:w-1/2 w-full mt-8 md:mt-0">
              <img src="https://res.cloudinary.com/dc1zy9h63/image/upload/v1726688230/agencement_rvnhmz.jpg" alt="Consultation" className="object-cover w-full h-full rounded-lg shadow-lg" />
            </div>
          </section>

          {/* Customer Reviews Section */}
          <section className="bg-white py-12" data-aos="fade-up">
            <h2 className="text-center text-4xl font-bold text-gray-800 mb-8">What Our Customers Say</h2>
            <div className="max-w-4xl mx-auto px-4 flex flex-col md:flex-row gap-8">
              <div className="bg-white p-6 rounded-lg shadow-md mb-6 md:mb-0">
                <p className="text-lg text-gray-700 italic">"The quality of the blinds was beyond my expectations. They fit perfectly in my living room!"</p>
                <p className="mt-4 text-sm text-gray-500">- Jawaher </p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md mb-6 md:mb-0">
                <p className="text-lg text-gray-700 italic">"The in-home consultation made choosing the right curtains easy and stress-free."</p>
                <p className="mt-4 text-sm text-gray-500">- Sara </p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md">
                <p className="text-lg text-gray-700 italic">"The smart home solutions have made my life so much easier. Highly recommend!"</p>
                <p className="mt-4 text-sm text-gray-500">- Aymen</p>
              </div>
            </div>
          </section>
        </>
      )}
    </div>
  );
};

export default Home;
