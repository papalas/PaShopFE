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
        borderRadius: '8px',
        boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
      }}
    >
      <form
        onSubmit={handleSubmit}
        style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}
      >
        <h2 style={{ marginTop: 0, marginBottom: '1rem', textAlign: 'center' }}>Login</h2>
        {error && <p style={{ color: 'red', textAlign: 'center', margin: 0 }}>{error}</p>}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          <label htmlFor='username' style={{ fontWeight: 'bold' }}>
            Username:
          </label>
          <input
            type='text'
            id='username'
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            style={{
              padding: '0.5rem',
              borderRadius: '4px',
              border: '1px solid #ccc',
              fontSize: '1rem',
            }}
          />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          <label htmlFor='password' style={{ fontWeight: 'bold' }}>
            Password:
          </label>
          <input
            type='password'
            id='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{
              padding: '0.5rem',
              borderRadius: '4px',
              border: '1px solid #ccc',
              fontSize: '1rem',
            }}
          />
        </div>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', marginTop: '1rem' }}>
          <button
            type='submit'
            style={{
              padding: '0.5rem 1rem',
              borderRadius: '4px',
              border: 'none',
              background: '#4a90e2',
              color: 'white',
              cursor: 'pointer',
              fontSize: '1rem',
            }}
          >
            Login
          </button>
          <button
            type='button'
            onClick={onClose}
            style={{
              padding: '0.5rem 1rem',
              borderRadius: '4px',
              border: '1px solid #4a90e2',
              background: 'white',
              color: '#4a90e2',
              cursor: 'pointer',
              fontSize: '1rem',
              fontWeight: 'bold',
            }}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default LoginDialog;
