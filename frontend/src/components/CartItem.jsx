import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { addToCart, removeFromCart } from '../redux/features/cartSlice'; // Adjust the path to your cartSlice file

const CartItem = ({ item }) => {
  const { product, quantity } = item;
  const [showConfirmation, setShowConfirmation] = useState(false);
  const dispatch = useDispatch();

  const handleQuantityChange = (e) => {
    const newQuantity = Number(e.target.value);
    if (newQuantity > 0) {
      // Dispatch the addToCart action with the new quantity
      dispatch(addToCart({ userId: 'userId', productId: product._id, quantity: newQuantity }));
    }
  };

  const handleRemoveClick = () => {
    setShowConfirmation(true); // Show confirmation before removal
  };

  const confirmRemove = () => {
    // Dispatch the removeFromCart action
    dispatch(removeFromCart({ productId: product._id }));
    setShowConfirmation(false); // Hide the confirmation dialog
  };

  const cancelRemove = () => {
    setShowConfirmation(false); // Cancel removal
  };

  return (
    <div className="flex items-center justify-between mb-6 p-4 border-b-2">
      <div className="flex items-center space-x-4">
        {/* Product Image */}
        <img
          src={product?.imageUrl || 'default-image-url.jpg'} // Fallback if image is missing
          alt={product?.name || 'Unnamed Product'}
          className="w-16 h-16 object-cover rounded"
        />
        
        <div className="flex flex-col space-y-2">
          <h4 className="font-semibold text-lg">{product?.name || 'Unnamed Product'}</h4>
          <p className="text-gray-600">
            Price: <span className="font-medium"> {(product?.price ?? 0).toFixed(2)} DT</span>
          </p>
          <div className="flex items-center space-x-2">
            <label htmlFor={`quantity_${product._id}`} className="text-sm text-gray-600">Qty:</label>
            <input
              id={`quantity_${product._id}`}
              type="number"
              value={quantity}
              min="1"
              onChange={handleQuantityChange} // Handle quantity change
              className="w-16 px-2 py-1 border rounded"
            />
          </div>
        </div>
      </div>

      <div className="flex items-center space-x-2">
        <button
          onClick={handleRemoveClick}
          className="text-red-500 hover:text-red-700 transition-all duration-300 flex items-center"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
          <span className="ml-1">Remove</span>
        </button>
      </div>

      {showConfirmation && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded shadow-lg">
            <p className="mb-4">
              Are you sure you want to remove <strong>{product?.name || 'this item'}</strong> from the cart?
            </p>
            <div className="flex justify-end space-x-2">
              <button
                onClick={cancelRemove}
                className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
              >
                Cancel
              </button>
              <button
                onClick={confirmRemove}
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

CartItem.propTypes = {
  item: PropTypes.shape({
    product: PropTypes.shape({
      _id: PropTypes.string.isRequired,
      name: PropTypes.string,
      price: PropTypes.number,
      imageUrl: PropTypes.string, 
    }).isRequired,  
    quantity: PropTypes.number.isRequired,
  }).isRequired,
};

export default CartItem;
