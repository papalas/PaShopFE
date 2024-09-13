import React, { useState, useCallback } from 'react';
import { useQuery } from 'react-query'; // Updated import
import { PageDTOProductDTO, PublicService } from '../api';
import { useAuth } from '../contexts/AuthContext';
import { debounce } from '../utils/functions.ts';

const ProductList: React.FC = () => {
  const { isAuthenticated } = useAuth();
  const [page, setPage] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');

  const { data, isLoading, error } = useQuery<PageDTOProductDTO, Error>(
    ['content', page, searchTerm],
    () => PublicService.listProducts(searchTerm, page),
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
      <input
        type='text'
        placeholder='Search products...'
        onChange={handleSearchChange}
        style={{ marginBottom: '1rem' }}
      />
      <ul>
        {data?.content?.map((product) => (
          <li key={product.id}>
            {product.name} - ${product.price?.toFixed(2)} - Delivery in {product.deliveryDays} days
            {isAuthenticated && <button style={{ marginLeft: '1rem' }}>Add to Cart</button>}
          </li>
        ))}
      </ul>
      <div>
        <button onClick={() => setPage((old) => Math.max(old - 1, 0))} disabled={page === 0}>
          Previous Page
        </button>
        <span style={{ margin: '0 1rem' }}>
          Page {data?.pageNumber ? data.pageNumber + 1 : 1} of {data?.totalPages}
        </span>
        <button
          onClick={() =>
            setPage((old) => (data?.pageNumber === data?.totalPages || 0 - 1 ? old : old + 1))
          }
          disabled={!!(data?.pageNumber === data?.totalPages || 0 - 1)}
        >
          Next Page
        </button>
      </div>
      {!isAuthenticated && <p>Please log in to add products to your cart.</p>}
    </div>
  );
};

export default ProductList;
