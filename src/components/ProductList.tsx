import React from 'react';
import { ProductDTO } from '../api';
import ProductItem from './ProductItem';

interface ProductListProps {
  products: ProductDTO[];
  totalPages: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

const ProductList: React.FC<ProductListProps> = ({
  products,
  totalPages,
  currentPage,
  onPageChange,
}) => {
  return (
    <div className='product-list'>
      <h2>Our Products</h2>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Price</th>
            <th>Stock</th>
            <th>Delivery</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <ProductItem key={product.id} product={product} />
          ))}
        </tbody>
      </table>
      <div className='pagination'>
        {Array.from({ length: totalPages }, (_, i) => (
          <button key={i} onClick={() => onPageChange(i)} disabled={i === currentPage}>
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ProductList;
