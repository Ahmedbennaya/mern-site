import React from 'react';
import img from '../assets/hero section img/bargaoui.jpg';
import Footer from '../components/Footer';

const Home = () => {
  return (
    <div className="relative overflow-hidden">
      <img src={img} alt="Hero Image" className="w-full h-auto" />
      <div className="absolute bottom-5 left-5">
        <button className="bg-transparent text-white text-lg py-3 px-6 rounded-full mb-2 hover:bg-gray-600">
          Explore Now
        </button>
        <button className="bg-transparent text-white text-lg py-3 px-6 rounded-full hover:bg-gray-600">
          Learn More
        </button>
       
      </div>
      <Footer />
    </div>
    
  );
};

export default Home;
