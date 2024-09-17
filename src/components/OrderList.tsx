// src/components/OrderList.tsx
import React from 'react';
import { useOrders } from '../hooks/useOrders';

const OrderList: React.FC = () => {
  const { data: orders, isLoading, error } = useOrders();

  if (isLoading) return <div>Loading orders...</div>;
  if (error) return <div>Error loading orders: {error.message}</div>;
  if (!orders || orders.length === 0) return <div>No orders found</div>;

  return (
    <div>
      <h2>Your Orders</h2>
      {orders.map((order) => (
        <div
          key={order.id}
          style={{ marginBottom: '20px', border: '1px solid #ccc', padding: '10px' }}
        >
          <h3>Order #{order.id}</h3>
          <p>Status: {order.status}</p>
          <p>Created: {new Date(order.orderDate || '').toLocaleString()}</p>
          <p>Delivery: {new Date(order.deliveryDate || '').toLocaleString()}</p>
          <p>Total Price: ${order?.totalAmount?.toFixed(2)}</p>
          <h4>Items:</h4>
          <ul>
            {order?.orderItems?.map((item) => (
              <li key={item.product?.id}>
                {item.product?.name} - Quantity: {item.quantity} - Price: $
                {item.priceAtTime.toFixed(2)}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default OrderList;
