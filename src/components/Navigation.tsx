// src/components/Navigation.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const Navigation: React.FC = () => {
  const { isAuthenticated } = useAuth();

  return (
    <nav>
      <ul>
        <li>
          <Link to='/'>Home</Link>
        </li>
        {isAuthenticated && (
          <>
            <li>
              <Link to='/basket'>Basket</Link>
            </li>
            <li>
              <Link to='/orders'>Orders</Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navigation;
