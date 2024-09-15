import React, { useState, useCallback } from 'react';
import { useQuery } from 'react-query'; // Updated import
import { PageDTOProductDTO, PublicService } from '../api';
import { useAuth } from '../contexts/AuthContext';
import { debounce } from '../utils/functions.ts';
import ProductItem from './ProductItem.tsx';

const ProductList: React.FC = () => {
  const { isAuthenticated } = useAuth();
  const [page, setPage] = useState(0);
  const perPage = 10;
  const [searchTerm, setSearchTerm] = useState('');

  const { data, isLoading, error } = useQuery<PageDTOProductDTO, Error>(
    ['products', page, searchTerm],
    () => PublicService.listProducts(searchTerm, page, perPage),
    { keepPreviousData: true },
  );

  const debouncedSearch = useCallback(
    debounce((value: string) => {
      setSearchTerm(value);
      setPage(0);
    }, 300),
    [],
  );

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    debouncedSearch(e.target.value);
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>An error occurred: {error.message}</div>;

  return (
    <div>
      <h2>Product List</h2>
      <label htmlFor={'search'}>Hledej </label>
      <input
        id='search'
        type='text'
        placeholder='Search products...'
        onChange={handleSearchChange}
        style={{ marginBottom: '1rem' }}
      />
      <div className='product-list'>
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
            {data?.content?.map((product) => (
              <ProductItem key={product.id} product={product} isAuthenticated={isAuthenticated} />
            ))}
          </tbody>
        </table>
        <div className='pagination'>
          {Array.from({ length: data?.totalPages || 0 }, (_, i) => (
            <button key={i} onClick={() => setPage(i)} disabled={i === data?.pageNumber}>
              {i + 1}
            </button>
          ))}
        </div>
      </div>

      {!isAuthenticated && <p>Please log in to add products to your cart.</p>}
    </div>
  );
};

export default ProductList;
