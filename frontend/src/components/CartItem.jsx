import React from 'react';
import PropTypes from 'prop-types';

const CartItem = ({ item, onUpdateQuantity, onRemove }) => {
  const { product, quantity } = item; // Assuming item has product and quantity

  const handleQuantityChange = (e) => {
    const newQuantity = Number(e.target.value);
    onUpdateQuantity(product._id, newQuantity); // Update quantity
  };

  return (
    <div className="flex items-center justify-between mb-4">
      <div>
        <h4 className="font-semibold">{product.name}</h4> {/* Assuming product has a name */}
        <p>Price: ${product.price}</p> {/* Assuming product has a price */}
        <input
          type="number"
          value={quantity}
          min="1"
          onChange={handleQuantityChange}
          className="w-16 mt-2 border rounded"
        />
      </div>
      <button
        onClick={() => onRemove(product._id)}
        className="text-red-500 hover:text-red-700"
      >
        Remove
      </button>
    </div>
  );
};

CartItem.propTypes = {
  item: PropTypes.object.isRequired,
  onUpdateQuantity: PropTypes.func.isRequired,
  onRemove: PropTypes.func.isRequired,
};

export default CartItem;
