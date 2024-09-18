import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createProduct } from '../redux/features/productsSlice';

const CreateProduct = () => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    imageUrl: '',
    category: '',
    width: '',
    height: '',
    inStock: false,
    subcategory: '',
    colors: '',
  });

  const dispatch = useDispatch();
  const { error, loading } = useSelector(state => state.products);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.price || !formData.category || !formData.width || !formData.height) {
      alert("Please fill out all required fields");
      return;
    }

    // Dispatch the thunk with the correctly structured data
    dispatch(createProduct({
      category: formData.category,
      name: formData.name,
      description: formData.description,
      price: formData.price,
      imageUrl: formData.imageUrl,
      dimensions: {
        width: formData.width,
        height: formData.height,
      },
      inStock: formData.inStock,
      subcategory: formData.subcategory.split(',').map(item => item.trim()),
      colors: formData.colors.split(',').map(item => item.trim()),
    }));
  };

  return (
    <div className="max-w-2xl mx-auto bg-white p-8 shadow-lg rounded-lg mt-8">
      <h1 className="text-2xl font-semibold text-gray-700 mb-6">Create Product</h1>

      {/* Check if error is an object or a string and display appropriately */}
      {error && (
        <p className="text-red-500 mb-4">
          Error: {typeof error === 'object' && error.message ? error.message : String(error)}
        </p>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
          <input
            name="name"
            placeholder="Name"
            onChange={handleChange}
            value={formData.name}
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg"
            required
          />
        </div>
        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
          <input
            name="description"
            placeholder="Description"
            onChange={handleChange}
            value={formData.description}
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg"
          />
        </div>
        <div>
          <label htmlFor="price" className="block text-sm font-medium text-gray-700">Price (DT)</label>
          <input
            name="price"
            type="number"
            placeholder="Price (DT)"
            onChange={handleChange}
            value={formData.price}
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg"
            required
          />
        </div>
        <div>
          <label htmlFor="imageUrl" className="block text-sm font-medium text-gray-700">Image URL</label>
          <input
            name="imageUrl"
            placeholder="Image URL"
            onChange={handleChange}
            value={formData.imageUrl}
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg"
          />
        </div>
        <div>
          <label htmlFor="category" className="block text-sm font-medium text-gray-700">Category</label>
          <input
            name="category"
            placeholder="Category"
            onChange={handleChange}
            value={formData.category}
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg"
            required
          />
        </div>
        <div>
          <label htmlFor="width" className="block text-sm font-medium text-gray-700">Width</label>
          <input
            name="width"
            type="number"
            placeholder="Width"
            onChange={handleChange}
            value={formData.width}
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg"
            required
          />
        </div>
        <div>
          <label htmlFor="height" className="block text-sm font-medium text-gray-700">Height</label>
          <input
            name="height"
            type="number"
            placeholder="Height"
            onChange={handleChange}
            value={formData.height}
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg"
            required
          />
        </div>
        <div>
          <label htmlFor="inStock" className="block text-sm font-medium text-gray-700">In Stock</label>
          <input
            name="inStock"
            type="checkbox"
            onChange={handleChange}
            checked={formData.inStock}
            className="mt-1"
          />
        </div>
        <div>
          <label htmlFor="subcategory" className="block text-sm font-medium text-gray-700">Subcategory (comma separated)</label>
          <input
            name="subcategory"
            placeholder="Subcategory"
            onChange={handleChange}
            value={formData.subcategory}
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg"
          />
        </div>
        <div>
          <label htmlFor="colors" className="block text-sm font-medium text-gray-700">Colors (comma separated)</label>
          <input
            name="colors"
            placeholder="Colors"
            onChange={handleChange}
            value={formData.colors}
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg"
          />
        </div>
        <button
          type="submit"
          className="w-full py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-500 transition-all"
          disabled={loading}
        >
          {loading ? 'Creating...' : 'Create'}
        </button>
      </form>
    </div>
  );
};

export default CreateProduct;