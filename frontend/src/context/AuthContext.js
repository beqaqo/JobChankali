// Shares the logged-in user with the whole app:  const { user } = useAuth();
import { createContext, useContext, useState } from 'react';
import * as api from '../services/api';

const AuthContext = createContext(null);
export const useAuth = () => useContext(AuthContext);

// Read the saved user from localStorage, so a page refresh keeps the login
function getSavedUser() {
  const saved = localStorage.getItem('user');
  return saved ? JSON.parse(saved) : null;
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(getSavedUser);

  // Save the user + token after login or register
  function saveLogin(data) {
    localStorage.setItem('token', data.token);
    localStorage.setItem('user', JSON.stringify(data.user));
    setUser(data.user);
  }

  async function login(formData) {
    const data = await api.login(formData);
    saveLogin(data);
  }

  async function register(formData) {
    const data = await api.register(formData);
    saveLogin(data);
  }

  function logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
  }

  const value = { user, login, register, logout };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
