import React from 'react';
import { ProductDTO } from '../api';
import { useAuth } from '../hooks/useAuth.tsx';

interface ProductItemProps {
  product: ProductDTO;
}

const ProductItem: React.FC<ProductItemProps> = ({ product }) => {
  const { isAuthenticated } = useAuth();
  return (
    <tr className='product-item'>
      <td>{product.name}</td>
      <td>${product.price?.toFixed(2)}</td>
      <td>{product.stockQuantity}</td>
      <td>{product.deliveryDays} days</td>
      <td>{isAuthenticated && <button>Do košíku!</button>}</td>
    </tr>
  );
};

export default ProductItem;
