import React from 'react';
import { ProductDTO } from '../api';
import { useBasket } from '../hooks/useBasket.ts';

interface ProductItemProps {
  product: ProductDTO;
  isAuthenticated: boolean;
}

const ProductItem: React.FC<ProductItemProps> = ({ product, isAuthenticated = false }) => {
  const { addItem } = useBasket();

  const handleAddToBasket = () => {
    addItem({ productId: product.id, quantity: 1 });
  };

  return (
    <tr className='product-item'>
      <td>{product.name}</td>
      <td>${product.price?.toFixed(2)}</td>
      <td>{product.stockQuantity}</td>
      <td>{product.deliveryDays} days</td>
      <td>{isAuthenticated && <button onClick={handleAddToBasket}>Do košíku!</button>}</td>
    </tr>
  );
};

export default ProductItem;
