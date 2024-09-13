import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import LoginDialog from './LoginDialog';

const Header: React.FC = () => {
  const { isAuthenticated, username, logout } = useAuth();
  const [showLoginDialog, setShowLoginDialog] = useState(false);

  return (
    <header
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '1rem',
      }}
    >
      <h1>My Store</h1>
      <div>
        {isAuthenticated ? (
          <>
            <span>Welcome, {username}!</span>
            <button onClick={logout} style={{ marginLeft: '1rem' }}>
              Logout
            </button>
          </>
        ) : (
          <button onClick={() => setShowLoginDialog(true)}>Login</button>
        )}
      </div>
      {showLoginDialog && !isAuthenticated && (
        <LoginDialog onClose={() => setShowLoginDialog(false)} />
      )}
    </header>
  );
};

export default Header;
