import React from 'react';
import { BrowserRouter as Router, Navigate, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import ProductList from './components/ProductList.tsx';
import { QueryClient, QueryClientProvider } from 'react-query';
import Basket from './components/Basket.tsx';
import Navigation from './components/Navigation.tsx';
import OrderList from './components/OrderList.tsx';

const App: React.FC = () => {
  const queryClient = new QueryClient();

  const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const { isAuthenticated } = useAuth();

    return isAuthenticated ? <>{children}</> : <Navigate to='/' />;
  };

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <Router>
          <div className='app-container'>
            <Header />
            <Navigation />
            <main className='main-container'>
              <Routes>
                <Route path='/' element={<ProductList />} />
                <Route path='/basket' element={<Basket />} />

                <Route
                  path='/orders'
                  element={
                    <ProtectedRoute>
                      <OrderList />
                    </ProtectedRoute>
                  }
                />
              </Routes>
            </main>
          </div>
        </Router>
      </AuthProvider>
    </QueryClientProvider>
  );
};

export default App;
