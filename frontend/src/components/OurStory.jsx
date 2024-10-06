import React from 'react';

const OurStory = () => {
  return (
    <section className="bg-gray-50 py-12">
      <div className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row items-center">
          {/* Image Section */}
          <div className="lg:w-1/2 w-full mb-6 lg:mb-0">
            <img
              src="https://via.placeholder.com/600x400" // Replace with an actual image URL
              alt="Bargaoui Rideaux Tahar"
              className="w-full h-auto rounded-lg shadow-lg object-cover"
            />
          </div>

          {/* Text Content Section */}
          <div className="lg:w-1/2 w-full lg:pl-12">
            <h1 className="text-4xl font-bold text-gray-800 mb-6">Bargaoui Rideaux Tahar</h1>
            <p className="text-gray-600 leading-relaxed mb-4">
              Bargaoui Rideaux Tahar is your best specialist in choosing high-quality fabrics. In addition to selling and installing curtains, we offer advice and support services in selecting your fabrics, curtain rods, accessories, and more.
            </p>
            <p className="text-gray-600 leading-relaxed mb-4">
              We offer a wide range of curtains: silk, wool, linen, velvet, jacquard, and many other exceptional fabrics that you will find exclusively at Bargaoui Rideaux Tahar stores.
            </p>
            <p className="text-gray-800 font-semibold mb-2">Our services include:</p>
            <ul className="list-disc list-inside text-gray-600 mb-6">
              <li>A team of decorators available to advise you</li>
              <li>A custom-made curtain service for creating curtains tailored to your measurements</li>
              <li>Free measurement service</li>
              <li>Free detailed quote</li>
              <li>Payment flexibility</li>
            </ul>
            <p className="text-gray-600 leading-relaxed mb-4">
              Do not hesitate to contact us for other services as well: dismantling, expert washing, ironing, reinstallation, alterations, or any other modifications you deem necessary.
            </p>
            <p className="text-gray-800 font-semibold mb-2">Our commitment:</p>
            <ul className="list-disc list-inside text-gray-600">
              <li>Clearly identifying the client's requirements</li>
              <li>Providing high-quality products</li>
              <li>Continuous improvement of products and services</li>
              <li>Qualified installers and seamstresses within the company</li>
              <li>Empowering staff to ensure a quality system specific to the company</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OurStory;
