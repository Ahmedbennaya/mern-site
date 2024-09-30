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
    dispatch(confirmOrder(orderId)); // Dispatch confirmation action
  };

  if (loading) return <p className="text-center text-gray-500">Loading orders...</p>;
  if (error) return <p className="text-center text-red-500">Error fetching orders: {error}</p>;

  return (
    <div className="p-4 sm:p-6 lg:p-8 bg-gray-50 min-h-screen">
      <h1 className="text-2xl font-bold text-gray-700 mb-6 text-center">Admin Order Management</h1>
      
      <div className="overflow-x-auto">
        <table className="min-w-full table-auto bg-white shadow-md rounded-lg overflow-hidden">
          <thead className="bg-gray-100 text-gray-600 uppercase text-sm leading-normal">
            <tr>
              <th className="py-3 px-6 text-left">Order ID</th>
              <th className="py-3 px-6 text-left">Customer</th>
              <th className="py-3 px-6 text-left">Status</th>
              <th className="py-3 px-6 text-right">Total</th>
              <th className="py-3 px-6 text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="text-gray-700 text-sm font-light">
            {orders.map((order) => (
              <tr key={order._id} className="border-b border-gray-200 hover:bg-gray-100">
                <td className="py-3 px-6 text-left whitespace-nowrap">
                  <span className="font-medium">{order._id}</span>
                </td>
                <td className="py-3 px-6 text-left">
                  <span>{order.user?.FirstName || 'Unknown Customer'}</span>
                </td>
                <td className="py-3 px-6 text-left">
                  <span className={`py-1 px-3 rounded-full text-xs ${order.isConfirmed ? 'bg-green-200 text-green-600' : 'bg-yellow-200 text-yellow-600'}`}>
                    {order.isConfirmed ? 'Confirmed' : 'Pending'}
                  </span>
                </td>
                <td className="py-3 px-6 text-right">
                  <span className="font-semibold">${(order.totalAmount ?? 0).toFixed(2)}</span> {/* Fix applied here */}
                </td>
                <td className="py-3 px-6 text-center">
                  {!order.isConfirmed && (
                    <button
                      onClick={() => handleConfirm(order._id)}
                      className="bg-blue-500 text-white py-1 px-3 rounded-md hover:bg-blue-600 transition duration-200"
                    >
                      Confirm
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminOrders;
