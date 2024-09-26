import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchOrders, confirmOrder } from '../redux/features/orderSlice';

const AdminOrders = () => {
  const dispatch = useDispatch();
  const { orders, loading, error } = useSelector((state) => state.order);
  const { userInfo } = useSelector((state) => state.auth); // Check if user is an admin

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(fetchOrders());
    }
  }, [dispatch, userInfo]);

  const handleConfirm = (orderId) => {
    dispatch(confirmOrder(orderId));
  };

  if (loading) return <p>Loading orders...</p>;
  if (error) return <p>Error fetching orders: {error}</p>;

  return (
    <div>
      <h1>Admin Order Management</h1>
      <table>
        <thead>
          <tr>
            <th>Order ID</th>
            <th>Customer</th>
            <th>Status</th>
            <th>Total</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order._id}>
              <td>{order._id}</td>
              <td>{order.customer.name}</td>
              <td>{order.status}</td>
              <td>${order.total}</td>
              <td>
                {order.status !== 'Confirmed' && (
                  <button onClick={() => handleConfirm(order._id)}>Confirm</button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminOrders;
