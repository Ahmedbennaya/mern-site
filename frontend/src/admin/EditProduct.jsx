import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProductById, updateProduct } from '../redux/features/productsSlice';
import { useParams } from 'react-router-dom';

const EditProduct = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { product, loading, error } = useSelector(state => state.products);
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

  useEffect(() => {
    if (!product || product._id !== id) {
      dispatch(fetchProductById(id));
    }
  }, [dispatch, id, product]);

  useEffect(() => {
    if (product) {
      setFormData({
        name: product.name || '',
        description: product.description || '',
        price: product.price || '',
        imageUrl: product.imageUrl || '',
        category: product.category || '',
        width: product.dimensions?.width || '',
        height: product.dimensions?.height || '',
        inStock: product.inStock || false,
        subcategory: product.subcategory?.join(', ') || '',
        colors: product.colors?.join(', ') || '',
      });
    }
  }, [product]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validate required fields
    if (!id || !formData.name || !formData.price) {
      alert("Product ID, name, and price are required.");
      return;
    }

    dispatch(updateProduct({
      id,
      name: formData.name,
      description: formData.description,
      price: formData.price,
      imageUrl: formData.imageUrl,
    }));
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {typeof error === 'object' && error.message ? error.message : String(error)}</p>;

  return (
    <div className="max-w-2xl mx-auto bg-white p-8 shadow-lg rounded-lg mt-8">
      <h1 className="text-2xl font-semibold text-gray-700 mb-6">Edit Product</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
          <input name="name" value={formData.name} onChange={handleChange} className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg" required />
        </div>
        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
          <input name="description" value={formData.description} onChange={handleChange} className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg" required />
        </div>
        <div>
          <label htmlFor="price" className="block text-sm font-medium text-gray-700">Price</label>
          <input name="price" value={formData.price} type="number" onChange={handleChange} className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg" required />
        </div>
        <div>
          <label htmlFor="imageUrl" className="block text-sm font-medium text-gray-700">Image URL</label>
          <input name="imageUrl" value={formData.imageUrl} onChange={handleChange} className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg" required />
        </div>
        <div>
          <label htmlFor="category" className="block text-sm font-medium text-gray-700">Category</label>
          <input name="category" value={formData.category} onChange={handleChange} className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg" required />
        </div>
        <div>
          <label htmlFor="width" className="block text-sm font-medium text-gray-700">Width</label>
          <input name="width" value={formData.width} type="number" onChange={handleChange} className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg" required />
        </div>
        <div>
          <label htmlFor="height" className="block text-sm font-medium text-gray-700">Height</label>
          <input name="height" value={formData.height} type="number" onChange={handleChange} className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg" required />
        </div>
        <div>
          <label htmlFor="inStock" className="block text-sm font-medium text-gray-700">In Stock</label>
          <input name="inStock" type="checkbox" checked={formData.inStock} onChange={handleChange} className="mt-1" />
        </div>
        <div>
          <label htmlFor="subcategory" className="block text-sm font-medium text-gray-700">Subcategory (comma separated)</label>
          <input name="subcategory" value={formData.subcategory} onChange={handleChange} className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg" />
        </div>
        <div>
          <label htmlFor="colors" className="block text-sm font-medium text-gray-700">Colors (comma separated)</label>
          <input name="colors" value={formData.colors} onChange={handleChange} className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg" />
        </div>
        <button type="submit" className="w-full py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-500 transition-all" disabled={loading}>
          {loading ? 'Saving...' : 'Save Changes'}
        </button>
      </form>
    </div>
  );
};

export default EditProduct;