import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ClipLoader from 'react-spinners/ClipLoader';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../redux/features/cartSlice';

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
      <FilterCheckbox
        label="Blinds & Shades"
        checked={filters.category.includes('Blinds & Shades')}
        onChange={() =>
          handleFilterChange({ target: { name: 'category', value: 'Blinds & Shades' } })
        }
      />
    </div>

    <button
      className={`${sharedClasses.primaryButton} ${sharedClasses.button} w-full mt-4`}
      onClick={handleClearFilters}
    >
      Clear All Filters
    </button>
  </div>
);

const ProductCard = ({ title, imageUrl, price, description, onAddToCart }) => (
  <div className={`${sharedClasses.card} mb-8 transform hover:scale-105 transition-transform duration-300`}>
    <img src={imageUrl} alt={title} className="w-full h-56 object-cover rounded-lg mb-4" />
    <h3 className="text-2xl font-bold mb-2 text-gray-900">{title}</h3>
    <h4 className="text-xl font-semibold mb-2 text-gray-900">From DT {price.toFixed(2)}</h4>
    <p className="text-gray-600 mb-4">{description}</p>
    <button
      onClick={onAddToCart}
      className={`${sharedClasses.primaryButton} ${sharedClasses.button} w-full`}
    >
      Add to Cart
    </button>
  </div>
);

const ProductGallery = ({ products, handleAddToCart }) => (
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
    {products.map((product) => (
      <ProductCard
        key={product._id}  
        title={product.name}
        imageUrl={product.imageUrl}
        price={product.price}
        description={product.description}
        onAddToCart={() => handleAddToCart(product)}
      />
    ))}
  </div>
);

const BlindsShades = () => {
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
        // Fetch products based on filters
        const response = await axios.get('https://mern-site-z5gs.onrender.com/api/products/category/blinds-shades', {
          params: { inStock: filters.inStock ? 'true' : 'false' },  // Boolean inStock filter
        });
        setProducts(response.data);
      } catch (error) {
        setError('Failed to load products');
        console.error('Error fetching products:', error);
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

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-white">
        <ClipLoader color="#0000ff" size={50} />
      </div>
    );
  }

  if (error) {
    return <p className="text-center mt-10 text-red-600">{error}</p>;
  }

  return (
    <div className="font-sans bg-gray-50 text-gray-900">
      {/* Hero Section */}
      <section
        className="relative w-full h-[600px] bg-cover bg-center text-white flex items-center justify-center p-6"
        style={{ backgroundImage: `url("https://res.cloudinary.com/dc1zy9h63/image/upload/v1726770948/RS_AUTO_AF02006_LIV_MODEL_03_zkllcm.webp")`, backgroundSize: 'cover', backgroundPosition: 'center' }}
      >
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="relative z-10 text-center">
          <h1 className="text-5xl font-bold">BlindsShades</h1>
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

export default BlindsShades;
