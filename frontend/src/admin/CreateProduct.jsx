// components/CreateProduct.js
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createProduct } from '../redux/features/productsSlice';

const CreateProduct = () => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    imageUrl: '',
    imageUrl2: '',
    imageUrl3: '',
    imageUrl4: '',
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

    const dimensions = {
      width: Number(formData.width),
      height: Number(formData.height),
    };

    if (!formData.name || !formData.price || !formData.category || !dimensions.width || !dimensions.height || !formData.imageUrl || !formData.imageUrl2 || !formData.imageUrl3 || !formData.imageUrl4) {
      alert('Please fill out all required fields');
      return;
    }

    dispatch(createProduct({
      category: formData.category,
      name: formData.name,
      description: formData.description,
      price: formData.price,
      imageUrl: formData.imageUrl,
      imageUrl2: formData.imageUrl2,
      imageUrl3: formData.imageUrl3,
      imageUrl4: formData.imageUrl4,
      dimensions,
      inStock: formData.inStock,
      subcategory: formData.subcategory.split(',').map(item => item.trim()),
      colors: formData.colors.split(',').map(item => item.trim()),
    }));
  };

  return (
    <div className="max-w-2xl mx-auto bg-white p-8 shadow-lg rounded-lg mt-8">
      <h1 className="text-2xl font-semibold text-gray-700 mb-6">Create Product</h1>

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
            placeholder="Product Name"
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
            placeholder="Product Description"
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
            placeholder="Product Price"
            onChange={handleChange}
            value={formData.price}
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg"
            required
          />
        </div>
        <div>
          <label htmlFor="imageUrl" className="block text-sm font-medium text-gray-700">Main Image URL</label>
          <input
            name="imageUrl"
            placeholder="Main Image URL"
            onChange={handleChange}
            value={formData.imageUrl}
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg"
            required
          />
        </div>
        <div>
          <label htmlFor="imageUrl2" className="block text-sm font-medium text-gray-700">Image URL 2</label>
          <input
            name="imageUrl2"
            placeholder="Image URL 2"
            onChange={handleChange}
            value={formData.imageUrl2}
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg"
            required
          />
        </div>
        <div>
          <label htmlFor="imageUrl3" className="block text-sm font-medium text-gray-700">Image URL 3</label>
          <input
            name="imageUrl3"
            placeholder="Image URL 3"
            onChange={handleChange}
            value={formData.imageUrl3}
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg"
            required
          />
        </div>
        <div>
          <label htmlFor="imageUrl4" className="block text-sm font-medium text-gray-700">Image URL 4</label>
          <input
            name="imageUrl4"
            placeholder="Image URL 4"
            onChange={handleChange}
            value={formData.imageUrl4}
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg"
            required
          />
        </div>
        <div>
          <label htmlFor="category" className="block text-sm font-medium text-gray-700">Category</label>
          <input
            name="category"
            placeholder="Product Category"
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
            placeholder="Product Width"
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
            placeholder="Product Height"
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
