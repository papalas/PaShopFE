import React, {useCallback, useRef, useState} from 'react';
import { QueryClient, QueryClientProvider, useQuery } from '@tanstack/react-query';
import { PublicService } from './api';
import ProductList from './components/ProductList';
import {debounce} from "./utils/functions.ts";

const queryClient = new QueryClient();

function Products() {
    const [page, setPage] = useState(0);
    const [search, setSearch] = useState('');
    const perPage = 10;
    const searchInputRef = useRef<HTMLInputElement>(null);


    const debouncedSearch = useCallback(
        debounce((value: string) => {
            setSearch(value);
            setPage(0);
        }, 300),
        []
    );

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        debouncedSearch(value);
    };


    const { data, isLoading, error } = useQuery({
        queryKey: ['products', page, search],
        queryFn: () => PublicService.listProducts( search, page, perPage),
    });


    if (isLoading) return <div>Načítání...</div>;
    if (error) return <div>Nastala chyba: {(error as Error).message}</div>;

    return (
        <div>
            <input
                type="text"
                onChange={handleSearchChange}
                placeholder="Hledat produkty"
                ref={searchInputRef}
            />
            <ProductList
                products={data?.content || []}
                totalPages={data?.totalPages || 0}
                currentPage={page}
                onPageChange={setPage}
            />
        </div>
    );
}

function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <div className="App">
                <header>
                    <h1>Můj E-Shop</h1>
                </header>
                <main>
                    <Products />
                </main>
            </div>
        </QueryClientProvider>
    );
}

export default App;