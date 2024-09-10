import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ClipLoader from 'react-spinners/ClipLoader';
import { useDispatch } from 'react-redux';
import { addItemToCart } from '../redux/features/cartSlice';
import curtains from "../assets/imgs/curtain.jpg";  

const sharedClasses = {
  card: 'bg-card p-4 rounded-lg shadow-md',
  button: 'p-2 rounded-lg',
  primaryButton: 'bg-primary text-primary-foreground hover:bg-primary/80',
  secondaryButton: 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
  formCheckbox: 'form-checkbox',
};

const FilterCheckbox = ({ label, checked, onChange }) => (
  <label className="inline-flex items-center">
    <input
      type="checkbox"
      checked={checked}
      onChange={onChange}
      className={sharedClasses.formCheckbox}
    />
    <span className="ml-2">{label}</span>
  </label>
);

const FilterSection = ({ filters, handleFilterChange, handleClearFilters }) => (
  <div className="bg-white p-6 rounded-lg shadow-md mb-8">
    <h2 className="text-2xl font-semibold mb-4">Filter Products</h2>

    <div className="mb-4">
      <h3 className="font-medium text-lg">Size</h3>
      <label className="block mt-2">Width</label>
      <input
        type="range"
        name="width"
        min="100"
        max="300"
        value={filters.width}
        onChange={handleFilterChange}
        className="w-full"
      />
      <label className="block mt-2">Height</label>
      <input
        type="range"
        name="height"
        min="100"
        max="300"
        value={filters.height}
        onChange={handleFilterChange}
        className="w-full"
      />
    </div>

    <div className="mb-4">
      <h3 className="font-medium text-lg">Availability</h3>
      <FilterCheckbox
        label="In Stock"
        checked={filters.inStock}
        onChange={() => handleFilterChange({ target: { name: 'inStock', value: !filters.inStock } })}
      />
    </div>

    <div className="mb-4">
      <h3 className="font-medium text-lg">Product Category</h3>
      <FilterCheckbox
        label="Curtains & Drapes"
        checked={filters.category.includes('Curtains & Drapes')}
        onChange={() =>
          handleFilterChange({ target: { name: 'category', value: 'Curtains & Drapes' } })
        }
      />
      <ul className="mt-2">
        <li>
          <FilterCheckbox
            label="Pinch Pleat Curtains"
            checked={filters.subCategory.includes('Pinch Pleat Curtains')}
            onChange={() =>
              handleFilterChange({ target: { name: 'subCategory', value: 'Pinch Pleat Curtains' } })
            }
          />
        </li>
        <li>
          <FilterCheckbox
            label="Ripple Fold Curtains"
            checked={filters.subCategory.includes('Ripple Fold Curtains')}
            onChange={() =>
              handleFilterChange({ target: { name: 'subCategory', value: 'Ripple Fold Curtains' } })
            }
          />
        </li>
        <li>
          <FilterCheckbox
            label="Blackout Curtain"
            checked={filters.subCategory.includes('Blackout Curtain')}
            onChange={() =>
              handleFilterChange({ target: { name: 'subCategory', value: 'Blackout Curtain' } })
            }
          />
        </li>
      </ul>
    </div>

    <div className="mb-4">
      <h3 className="font-medium text-lg">Color</h3>
      <ul className="mt-2">
        <li>
          <FilterCheckbox
            label="White"
            checked={filters.color.includes('White')}
            onChange={() => handleFilterChange({ target: { name: 'color', value: 'White' } })}
          />
        </li>
        <li>
          <FilterCheckbox
            label="Beige"
            checked={filters.color.includes('Beige')}
            onChange={() => handleFilterChange({ target: { name: 'color', value: 'Beige' } })}
          />
        </li>
      </ul>
    </div>

    <button
      className={`${sharedClasses.primaryButton} ${sharedClasses.button} w-full`}
      onClick={handleClearFilters}
    >
      Clear All
    </button>
  </div>
);

const ProductCard = ({ imageUrl, alt, price, description, onAddToCart }) => (
  <div className={sharedClasses.card}>
    <img src={imageUrl} alt={alt} className="w-full h-40 object-cover rounded-md" />
    <h3 className="font-semibold mt-2">From {price}</h3>
    <p>{description}</p>
    <div className="mt-4 flex justify-between">
      <button className={`${sharedClasses.primaryButton} ${sharedClasses.button}`}>
        Select Options
      </button>
      <button
        onClick={onAddToCart}
        className={`${sharedClasses.primaryButton} ${sharedClasses.button}`}
      >
        Add to Cart
      </button>
    </div>
  </div>
);

const ProductGallery = ({ products, handleAddToCart }) => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    {products.map((product) => (
      <ProductCard
        key={product._id}
        imageUrl={product.imageUrl}
        alt={product.name}
        price={product.price}
        description={product.description}
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
        // Handle array filters (like categories and colors)
        const newFilterValues = prevFilters[name].includes(value)
          ? prevFilters[name].filter((item) => item !== value)
          : [...prevFilters[name], value];
        return { ...prevFilters, [name]: newFilterValues };
      } else {
        // Handle non-array filters (like width, height, inStock)
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
      className="relative bg-cover bg-center text-white flex items-center justify-center p-6 sm:p-12"
      style={{ backgroundImage: `url(${curtains})`, height: '500px' }}
    >
      <div className="absolute inset-0 bg-black opacity-50"></div>
      <div className="relative z-10 text-center">
        <h1 className="text-3xl sm:text-5xl font-bold">Curtains & Drapes</h1>
        <p className="mt-4 text-base sm:text-lg">Enhance your home's interior with our elegant curtains and drapes.</p>
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
    <div className="font-sans bg-white text-gray-900">
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
