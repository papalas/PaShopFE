import { useState, useEffect } from 'react';
import { AuthControllerService, OpenAPI } from '../api';
import CryptoJS from 'crypto-js';

const STORAGE_KEY = 'auth_credentials';
const ENCRYPTION_KEY = 'your-secret-key'; // Replace with a secure, environment-specific key

interface AuthState {
  isAuthenticated: boolean;
  username: string | null;
}

export function useAuth() {
  const [authState, setAuthState] = useState<AuthState>({
    isAuthenticated: false,
    username: null,
  });

  useEffect(() => {
    const storedCredentials = localStorage.getItem(STORAGE_KEY);
    if (storedCredentials) {
      try {
        const decrypted = CryptoJS.AES.decrypt(storedCredentials, ENCRYPTION_KEY).toString(
          CryptoJS.enc.Utf8,
        );
        const { username, password } = JSON.parse(decrypted);
        setCredentials(username, password);
        setAuthState({ isAuthenticated: true, username });
      } catch (error) {
        console.error('Failed to decrypt stored credentials:', error);
      }
    }
  }, []);

  const setCredentials = (username: string, password: string) => {
    OpenAPI.USERNAME = username;
    OpenAPI.PASSWORD = password;
  };

  const login = async (username: string, password: string): Promise<void> => {
    setCredentials(username, password);
    AuthControllerService.hello()
      .then((response) => {
        console.log(response);
        const encrypted = CryptoJS.AES.encrypt(
          JSON.stringify({ username, password }),
          ENCRYPTION_KEY,
        ).toString();
        localStorage.setItem(STORAGE_KEY, encrypted);

        setAuthState({ isAuthenticated: true, username });
      })
      .catch((error) => {
        console.error('Login failed:', error);
        logout();
        throw error;
      });
  };

  const logout = () => {
    localStorage.removeItem(STORAGE_KEY);
    OpenAPI.USERNAME = undefined;
    OpenAPI.PASSWORD = undefined;
    setAuthState({ isAuthenticated: false, username: null });
  };

  return {
    isAuthenticated: authState.isAuthenticated,
    username: authState.username,
    login,
    logout,
  };
}
