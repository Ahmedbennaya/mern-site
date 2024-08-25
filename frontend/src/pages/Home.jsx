import React, { useState, useEffect } from 'react';
import img from '../assets/hero section img/bargaoui.jpg';
import Footer from '../components/Footer';
import ClipLoader from 'react-spinners/ClipLoader'; // Import the spinner
import vedio from "../assets/imgs/login.mp4";

const Home = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate a loading delay (e.g., for data fetching or image loading)
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000); // Adjust the delay as needed

    return () => clearTimeout(timer); // Cleanup on component unmount
  }, []);

  return (
    <div className="relative overflow-hidden bg-gray-100">
      {loading ? (
        <div className="flex items-center justify-center h-screen bg-white">
          <ClipLoader color="#0000ff" size={50} />
        </div>
      ) : (
        <>
          {/* Hero Section */}
          <section className="relative h-screen bg-cover bg-center text-white flex items-center justify-center p-6">
          <video autoPlay loop muted className="absolute inset-0 w-full h-full object-cover">
        <source src={vedio} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
            
    
          </section>

          {/* Features Section */}
          <section className="py-16 text-center">
            <h2 className="text-4xl font-semibold mb-8">Why Choose Us?</h2>
            <div className="flex flex-wrap justify-center gap-8">
              <div className="w-80 p-6 bg-white shadow-lg rounded-lg mb-8">
                <h3 className="text-2xl font-bold mb-4">Premium Quality</h3>
                <p>Our curtains are made from the highest quality materials to ensure durability and style.</p>
              </div>
              <div className="w-80 p-6 bg-white shadow-lg rounded-lg mb-8">
                <h3 className="text-2xl font-bold mb-4">Custom Designs</h3>
                <p>Choose from a wide range of designs and fabrics to match your unique style.</p>
              </div>
              <div className="w-80 p-6 bg-white shadow-lg rounded-lg mb-8">
                <h3 className="text-2xl font-bold mb-4">Fast Delivery</h3>
                <p>Enjoy prompt delivery and hassle-free installation services.</p>
              </div>
            </div>
          </section>

          {/* Product Gallery Section */}
          <section className="py-16 bg-gray-200">
            <h2 className="text-4xl font-semibold text-center mb-8">Our Collection</h2>
            <div className="flex flex-wrap justify-center gap-8">
              {/* Example Product Card */}
              <div className="w-80 p-6 bg-white shadow-lg rounded-lg mb-8">
                <img className="w-full h-56 object-cover rounded-lg mb-4" src="path-to-your-product-image.jpg" alt="Product Name" />
                <h3 className="text-2xl font-bold mb-4">Product Name</h3>
                <p>Description of the product goes here.</p>
                <p className="mt-4 font-bold">$99.99</p>
                <button className="mt-4 px-6 py-2 bg-green-600 hover:bg-green-500 text-white rounded-lg text-lg transition duration-300">
                  Add to Cart
                </button>
              </div>
              {/* Add more product cards as needed */}
            </div>
          </section>

          {/* Testimonials Section */}
          <section className="py-16 text-center">
            <h2 className="text-4xl font-semibold mb-8">What Our Customers Say</h2>
            <div className="flex flex-wrap justify-center gap-8">
              <div className="w-80 p-6 bg-white shadow-lg rounded-lg mb-8">
                <p>"The curtains are absolutely beautiful and the service was excellent!"</p>
                <span className="block mt-4 font-bold">- Alice M.</span>
              </div>
              <div className="w-80 p-6 bg-white shadow-lg rounded-lg mb-8">
                <p>"I am very impressed with the quality and design. Highly recommend!"</p>
                <span className="block mt-4 font-bold">- Brian T.</span>
              </div>
            </div>
          </section>

          {/* Footer */}
          <Footer />
        </>
      )}
    </div>
  );
};

export default Home;
