import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ClipLoader from 'react-spinners/ClipLoader';
import { useDispatch } from 'react-redux';
import furnishings from "../assets/imgs/curtain.jpg";  
import { addItemToCart } from '../redux/features/cartSlice';

const FilterCheckbox = ({ label, checked, onChange }) => (
  <label className="inline-flex items-center space-x-2 mt-2">
    <input
      type="checkbox"
      checked={checked}
      onChange={onChange}
      className="h-4 w-4 text-blue-600 border-gray-300 rounded"
    />
    <span className="text-gray-700">{label}</span>
  </label>
);

const FilterSection = ({ filters, handleFilterChange, handleClearFilters }) => (
  <div className="bg-white p-6 rounded-lg shadow-lg mb-8">
    <h2 className="text-2xl font-semibold mb-4 text-gray-900">Filter Products</h2>
    <div className="mb-6">
      <h3 className="font-medium text-lg text-gray-700">Availability</h3>
      <FilterCheckbox
        label="In Stock"
        checked={filters.inStock}
        onChange={() => handleFilterChange({ target: { name: 'inStock', value: !filters.inStock } })}
      />
    </div>
    <button
      className="bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold w-full mt-4 hover:bg-blue-700 transition"
      onClick={handleClearFilters}
    >
      Clear All Filters
    </button>
  </div>
);

const Furnishings = () => {
  const [products, setProducts] = useState([]);
  const [filters, setFilters] = useState({ inStock: false });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 10; // Set number of products per page
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const response = await axios.get('http://localhost:5000/api/products/category/furnishings', {
          params: {
            ...filters,
            page: currentPage,
            limit: productsPerPage, // Add pagination params
          },
        });
        setProducts(response.data);
      } catch (error) {
        setError('Failed to load products');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [filters, currentPage]); // Include currentPage in dependency array

  const handleAddToCart = (product) => {
    dispatch(addItemToCart(product));
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({ ...prevFilters, [name]: value }));
  };

  const handleClearFilters = () => {
    setFilters({ inStock: false });
  };

  const handleNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const handlePrevPage = () => {
    setCurrentPage((prevPage) => (prevPage > 1 ? prevPage - 1 : 1));
  };
  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <ClipLoader color="#0000ff" size={50} />
      </div>
    );
  }

  return (
    <div className="font-sans bg-white text-gray-900">
      <section className="relative w-full h-[600px] bg-cover bg-center text-white flex items-center justify-center p-6" style={{ backgroundImage: `url(${furnishings})` }}>
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="relative z-10 text-center">
          <h1 className="text-5xl font-bold">Furnishings</h1>
          <p className="mt-4 text-lg">Explore our premium collection of home furnishings.</p>
        </div>
      </section>

      <div className="container mx-auto px-4 py-8">
        <div className="md:flex gap-8">
          <div className="md:w-1/4">
            <FilterSection
              filters={filters}
              handleFilterChange={handleFilterChange}
              handleClearFilters={handleClearFilters}
            />
          </div>
          <div className="md:w-3/4">
            <div className="flex flex-wrap justify-center gap-8">
              {products.length > 0 ? (
                products.map((product) => (
                  <div key={product._id} className="w-80 p-6 bg-white shadow-lg rounded-lg mb-8">
                    <img className="w-full h-56 object-cover rounded-lg mb-4" src={product.imageUrl} alt={product.name} />
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

            {/* Pagination Controls */}
            <div className="flex justify-between mt-8">
              <button
                onClick={handlePrevPage}
                className="bg-gray-300 text-gray-700 px-4 py-2 rounded disabled:opacity-50"
                disabled={currentPage === 1}
              >
                Previous
              </button>
              <span className="self-center">Page {currentPage}</span>
              <button
                onClick={handleNextPage}
                className="bg-gray-300 text-gray-700 px-4 py-2 rounded"
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Furnishings;
