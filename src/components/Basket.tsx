// src/components/Basket.tsx
import React from 'react';
import { useBasket } from '../hooks/useBasket';

const Basket: React.FC = () => {
  const { basket, isLoading, error, removeItem, payBasket } = useBasket();

  if (isLoading) return <div>Loading basket...</div>;
  if (error) return <div>Error loading basket: {error.message}</div>;
  if (!basket || basket?.orderItems?.length === 0) return <div>Your basket is empty</div>;

  return (
    <div>
      <h2>Your Basket</h2>
      <ul>
        {basket?.orderItems?.map((item) => (
          <li key={item.id}>
            {item.product?.name} - Quantity: {item.quantity} - Price: {item.priceAtTime}
            <button onClick={() => removeItem({ productId: item.product?.id, quantity: 1 })}>
              Remove
            </button>
          </li>
        ))}
      </ul>
      <p>Total: {basket.totalAmount}</p>
      <button onClick={() => payBasket()}>Pay Now</button>
    </div>
  );
};

export default Basket;
