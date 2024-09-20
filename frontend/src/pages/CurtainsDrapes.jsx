import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ClipLoader from 'react-spinners/ClipLoader';
import { useDispatch } from 'react-redux';
import { addItemToCart } from '../redux/features/cartSlice';
import curtains from "../assets/imgs/curtain.jpg";

const sharedClasses = {
  card: 'bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300',
  button: 'px-4 py-2 rounded-lg font-semibold transition duration-300',
  primaryButton: 'bg-blue-600 text-white hover:bg-blue-700',
  secondaryButton: 'bg-gray-200 text-gray-700 hover:bg-gray-300',
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

    {/* Size Filter */}
    <div className="mb-6">
      <h3 className="font-medium text-lg text-gray-700">Size</h3>
      <div className="mt-4">
        <label className="block text-sm text-gray-600">Width ({filters.width}cm)</label>
        <input
          type="range"
          name="width"
          min="100"
          max="300"
          value={filters.width}
          onChange={handleFilterChange}
          className="w-full mt-1"
        />
      </div>
      <div className="mt-4">
        <label className="block text-sm text-gray-600">Height ({filters.height}cm)</label>
        <input
          type="range"
          name="height"
          min="100"
          max="300"
          value={filters.height}
          onChange={handleFilterChange}
          className="w-full mt-1"
        />
      </div>
    </div>

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
        label="Curtains & Drapes"
        checked={filters.category.includes('Curtains & Drapes')}
        onChange={() =>
          handleFilterChange({ target: { name: 'category', value: 'Curtains & Drapes' } })
        }
      />
      <ul className="mt-2 space-y-2">
        {['Pinch Pleat Curtains', 'Ripple Fold Curtains', 'Blackout Curtain'].map((subCategory) => (
          <li key={subCategory}>
            <FilterCheckbox
              label={subCategory}
              checked={filters.subCategory.includes(subCategory)}
              onChange={() =>
                handleFilterChange({ target: { name: 'subCategory', value: subCategory } })
              }
            />
          </li>
        ))}
      </ul>
    </div>

    {/* Color Filter */}
    <div className="mb-6">
      <h3 className="font-medium text-lg text-gray-700">Color</h3>
      <ul className="mt-2 space-y-2">
        {['White', 'Beige'].map((color) => (
          <li key={color}>
            <FilterCheckbox
              label={color}
              checked={filters.color.includes(color)}
              onChange={() => handleFilterChange({ target: { name: 'color', value: color } })}
            />
          </li>
        ))}
      </ul>
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

const ProductCard = ({ title, imageUrl, alt, price, description, material, onAddToCart }) => (
  <div className={`${sharedClasses.card} mb-8 transform hover:scale-105 transition-transform duration-300`}>
    {/* Product Title */}
    <img src={imageUrl} alt={alt} className="w-full h-56 object-cover rounded-lg mb-4" />
    <h3 className="text-2xl font-bold mb-2 text-gray-900">{title}</h3>
    <h4 className="text-xl font-semibold mb-2 text-gray-900">From ${price.toFixed(2)}</h4>
    <p className="text-gray-600 mb-4">{description}</p>
    {/* Additional Product Detail (Material, etc.) */}
    <p className="text-gray-500 mb-4"><strong>Material:</strong> {material}</p>
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
        alt={product.name}
        price={product.price}
        description={product.description}
        material={product.material} // Assuming material is included in the product data
        onAddToCart={() => handleAddToCart(product)}
      />
    ))}
  </div>
);

const CurtainsDrapes = () => {
  const [products, setProducts] = useState([]);
  const [filters, setFilters] = useState({
    width: 150,
    height: 150,
    inStock: false,
    category: [],
    subCategory: [],
    color: [],
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const response = await axios.get('http://localhost:5000/api/products/category/curtains-drapes', {
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
    dispatch(addItemToCart(product));
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
      width: 150,
      height: 150,
      inStock: false,
      category: [],
      subCategory: [],
      color: [],
    });
  };

  const HeroSection = () => (
    <section
    className="relative w-full h-[600px] bg-cover bg-center text-white flex items-center justify-center p-6"
    style={{ backgroundImage: `url(${curtains})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
    >
      <div className="absolute inset-0 bg-black opacity-50"></div>
      <div className="relative z-10 text-center">
        <h1 className="text-4xl sm:text-5xl font-bold">Curtains & Drapes</h1>
        <p className="mt-4 text-lg sm:text-xl">Enhance your home's interior with our elegant curtains and drapes.</p>
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

export default CurtainsDrapes;
