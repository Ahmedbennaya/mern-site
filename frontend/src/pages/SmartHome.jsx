import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ClipLoader from 'react-spinners/ClipLoader';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../redux/features/cartSlice';
import { Link } from 'react-router-dom';

const sharedClasses = {
  card: 'bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300',
  button: 'px-4 py-2 rounded-lg font-semibold transition duration-300',
  primaryButton: 'bg-blue-600 text-white hover:bg-blue-700',
  formCheckbox: 'h-4 w-4 text-blue-600 border-gray-300 rounded',
};

const FilterCheckbox = ({ label, checked, onChange }) => (
  <label className="inline-flex items-center space-x-2 mt-2">
    <input
      type="checkbox"
      checked={checked}
      onChange={onChange}
      className={sharedClasses.formCheckbox}
    />
    <span className="text-gray-700">{label}</span>
  </label>
);

const FilterSection = ({ filters, handleFilterChange, handleClearFilters }) => (
  <div className="bg-white p-6 rounded-lg shadow-lg mb-8">
    <h2 className="text-2xl font-semibold mb-4 text-gray-900">Filter Products</h2>

    {/* Availability Filter */}
    <div className="mb-6">
      <h3 className="font-medium text-lg text-gray-700">Availability</h3>
      <FilterCheckbox
        label="In Stock"
        checked={filters.inStock}
        onChange={() => handleFilterChange({ target: { name: 'inStock', value: !filters.inStock } })}
      />
    </div>

    {/* Category Filter */}
    <div className="mb-6">
      <h3 className="font-medium text-lg text-gray-700">Product Category</h3>
      <FilterCheckbox
        label="Smart Home"
        checked={filters.category.includes('Smart Home')}
        onChange={() =>
          handleFilterChange({ target: { name: 'category', value: 'Smart Home' } })
        }
      />
    </div>

    {/* Clear All Button */}
    <button
      className={`${sharedClasses.primaryButton} ${sharedClasses.button} w-full mt-4`}
      onClick={handleClearFilters}
    >
      Clear All Filters
    </button>
  </div>
);

const ProductCard = ({ product, onAddToCart }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div className={`${sharedClasses.card} mb-8 transform hover:scale-105 transition-transform duration-300`}>
      <div className="relative w-full h-64 overflow-hidden rounded-lg mb-4 cursor-pointer" onClick={openModal}>
        <img
          src={product.imageUrl}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
        />
      </div>
      <h3 className="text-2xl font-bold mb-2 text-gray-900">{product.name}</h3>
      <h4 className="text-xl font-semibold mb-2 text-gray-900">From DT {product.price.toFixed(2)}</h4>
      <p className="text-gray-600 mb-4">{product.description}</p>
      
      <div className="flex justify-between items-center">
        <button
          onClick={onAddToCart}
          className={`${sharedClasses.primaryButton} ${sharedClasses.button} w-1/2 mr-2`}
        >
          Add to Cart
        </button>

        {/* Details Button */}
        <Link
          to={`/product/${product._id}`}  // Link to the product details page
          className={`${sharedClasses.primaryButton} ${sharedClasses.button} w-1/2 text-center`}
        >
          Details
        </Link>
      </div>

      {isModalOpen && (
        <ImageModal imageUrl={product.imageUrl} title={product.name} onClose={closeModal} />
      )}
    </div>
  );
};

const ProductGallery = ({ products, handleAddToCart }) => (
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
    {products.map((product) => (
      <ProductCard
        key={product._id}
        product={product}  // Pass product object to ProductCard
        onAddToCart={() => handleAddToCart(product)}
      />
    ))}
  </div>
);

const SmartHome = () => {
  const [products, setProducts] = useState([]);
  const [filters, setFilters] = useState({
    inStock: false,
    category: [],
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state.auth.userInfo);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const response = await axios.get('https://mern-site-z5gs.onrender.com/api/products/category/smart-home', {
          params: filters,
        });
        setProducts(response.data);
      } catch (error) {
        setError('Failed to load products');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [filters]);

  const handleAddToCart = (product) => {
    if (!userInfo || !userInfo._id) {
      console.error('User ID is required to add to cart');
      return;
    }

    if (!product || !product._id) {
      console.error('Product ID is required to add to cart');
      return;
    }

    // Dispatch action to add product to cart
    dispatch(addToCart({ userId: userInfo._id, productId: product._id, quantity: 1 }));
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => {
      if (Array.isArray(prevFilters[name])) {
        const newFilterValues = prevFilters[name].includes(value)
          ? prevFilters[name].filter((item) => item !== value)
          : [...prevFilters[name], value];
        return { ...prevFilters, [name]: newFilterValues };
      } else {
        return { ...prevFilters, [name]: value };
      }
    });
  };

  const handleClearFilters = () => {
    setFilters({
      inStock: false,
      category: [],
    });
  };

  if (loading)
    return (
      <div className="flex items-center justify-center h-screen bg-white">
        <ClipLoader color="#0000ff" size={50} />
      </div>
    );

  if (error)
    return <p className="text-center mt-10 text-red-600">{error}</p>;

  return (
    <div className="font-sans bg-gray-50 text-gray-900">
      {/* Hero section with the image */}
      <section
        className="relative w-full h-[600px] bg-cover bg-center text-white flex items-center justify-center p-6"
        style={{ backgroundImage: `url("https://res.cloudinary.com/dc1zy9h63/image/upload/v1726770948/RS_AUTO_AF02006_LIV_MODEL_03_zkllcm.webp")` }}
      >
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="relative z-10 text-center">
          <h1 className="text-5xl font-bold">Smart Home</h1>
          <p className="mt-4 text-lg">Enhance your home with smart technology.</p>
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
            <ProductGallery products={products} handleAddToCart={handleAddToCart} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SmartHome;
