import React from 'react';

const Franchise = () => {
  return (
    <div className="text-center p-6 bg-gray-100 border border-gray-300 rounded-lg">
      <h1 className="text-3xl font-bold text-gray-800">Franchise</h1>
      <p className="text-lg text-gray-600 mt-4">Interested in becoming a franchisee? Learn more here.</p>
      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <img src="https://source.unsplash.com/random/300x200" alt="Random 1" className="rounded-lg shadow-md" />
        <img src="https://source.unsplash.com/random/301x200" alt="Random 2" className="rounded-lg shadow-md" />
        <img src="https://source.unsplash.com/random/302x200" alt="Random 3" className="rounded-lg shadow-md" />
      </div>
    </div>
  );
};

export default Franchise;