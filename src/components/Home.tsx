import React from 'react';
import { useAuth } from '../contexts/AuthContext';

const Home: React.FC = () => {
  const { username } = useAuth();

  return (
    <div>
      <h1>Welcome to the Home Page</h1>
      <p>Hello, {username}! This is a protected route.</p>
    </div>
  );
};

export default Home;
