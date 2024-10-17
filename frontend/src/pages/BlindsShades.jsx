import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import ClipLoader from 'react-spinners/ClipLoader';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../redux/features/cartSlice';

const sharedClasses = {
  card: 'bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300',
  button: 'px-4 py-2 rounded-lg font-semibold transition duration-300',
  primaryButton: 'bg-blue-600 text-white hover:bg-blue-700',
  formCheckbox: 'h-4 w-4 text-blue-600 border-gray-300 rounded',
  modal: 'fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-75',
};

const ImageModal = ({ imageUrl, title, onClose }) => (
  <div className={sharedClasses.modal} onClick={onClose}>
    <div className="relative">
      <img src={imageUrl} alt={title} className="max-w-full max-h-screen" />
      <button
        className="absolute top-2 right-2 bg-white text-black px-4 py-2 rounded-lg"
        onClick={onClose}
      >
        Close
      </button>
    </div>
  </div>
);

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

    <div className="mb-6">
      <h3 className="font-medium text-lg text-gray-700">Availability</h3>
      <FilterCheckbox
        label="In Stock"
        checked={filters.inStock}
        onChange={() => handleFilterChange({ target: { name: 'inStock', value: !filters.inStock } })}
      />
    </div>

    <div className="mb-6">
      <h3 className="font-medium text-lg text-gray-700">Product Category</h3>
      <div className="flex flex-col space-y-2">
        <FilterCheckbox
          label="Blinds"
          checked={filters.category.includes('Blinds')}
          onChange={() => handleFilterChange({ target: { name: 'category', value: 'Blinds' } })}
        />
        <FilterCheckbox
          label="Shades"
          checked={filters.category.includes('Shades')}
          onChange={() => handleFilterChange({ target: { name: 'category', value: 'Shades' } })}
        />
      </div>
    </div>

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
      <div className="relative w-full aspect-w-16 aspect-h-9 overflow-hidden rounded-lg mb-4 cursor-pointer" onClick={openModal}>
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

        <Link
          to={`/product/${product._id}`}
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
        product={product}
        onAddToCart={() => handleAddToCart(product)}
      />
    ))}
  </div>
);

const BlindsShades = () => {
  const [products, setProducts] = useState([]);
  const [filters, setFilters] = useState({
    inStock: true,
    category: [],
    subcategory: [],
    search: '',
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state.auth.userInfo);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const params = new URLSearchParams();

        if (filters.inStock) {
          params.append('inStock', 'true');
        }

        if (filters.category.length > 0) {
          params.append('category', filters.category.join(','));
        }

        if (filters.subcategory.length > 0) {
          params.append('subcategory', filters.subcategory.join(','));
        }

        if (filters.search) {
          params.append('search', filters.search);
        }

        const response = await axios.get('https://mern-site-z5gs.onrender.com/api/products/category/blinds-shades', {
          params,
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
      subcategory: [],
      search: '',
    });
  };

  const handleSearchChange = (e) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      search: e.target.value,
    }));
  };

  const HeroSection = () => (
    <section
      className="relative w-full h-[600px] bg-cover bg-center text-white flex items-center justify-center p-6"
      style={{ backgroundImage: `url(${"https://res.cloudinary.com/dc1zy9h63/image/upload/v1727056323/blinds_shades.jpg"})` }}
    >
      <div className="absolute inset-0 bg-black opacity-50"></div>
      <div className="relative z-10 text-center">
        <h1 className="text-4xl sm:text-5xl font-bold">Blinds & Shades</h1>
        <p className="mt-4 text-lg sm:text-xl">Discover our range of stylish blinds and shades.</p>
      </div>
    </section>
  );

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
      <HeroSection />
      <div className="container mx-auto px-4 py-8">
        <div className="md:flex gap-8">
          <div className="md:w-1/4">
            <input
              type="text"
              placeholder="Search Products"
              value={filters.search}
              onChange={handleSearchChange}
              className="w-full px-4 py-2 mb-4 rounded-lg border border-gray-300"
            />
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

export default BlindsShades;