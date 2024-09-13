import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';

interface LoginDialogProps {
  onClose: () => void;
}

const LoginDialog: React.FC<LoginDialogProps> = ({ onClose }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    try {
      await login(username, password);
      onClose();
    } catch (err) {
      setError('Login failed. Please check your credentials.');
    }
  };

  return (
    <div
      style={{
        position: 'absolute',
        top: '60px',
        right: '1rem',
        background: 'white',
        padding: '1rem',
        borderRadius: '4px',
        boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
      }}
    >
      <form onSubmit={handleSubmit}>
        <h2>Login</h2>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <div>
          <label htmlFor='username'>Username:</label>
          <input
            type='text'
            id='username'
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor='password'>Password:</label>
          <input
            type='password'
            id='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type='submit'>Login</button>
        <button type='button' onClick={onClose}>
          Cancel
        </button>
      </form>
    </div>
  );
};

export default LoginDialog;
