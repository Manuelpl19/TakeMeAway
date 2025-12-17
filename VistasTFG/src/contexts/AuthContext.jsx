import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api.js';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  // Al montar, comprueba si hay token y carga usuario
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      api.get('/usuarios/me')
        .then(({ data }) => setUser(data))
        .catch(() => {
          localStorage.removeItem('token');
          setUser(null);
        });
    }
  }, []);

  const login = async (credentials) => {
    const { data } = await api.post('/login', credentials);
    localStorage.setItem('token', data.token);
    setUser(data.user);
    navigate('/', { replace: true });
  };

  const register = async (payload) => {
    // Llamamos al endpoint público de registro
    const { data } = await api.post('/register', payload);

    // Asumimos respuesta { user: {...}, token: '...' }
    localStorage.setItem('token', data.token);
    setUser(data.user);

    navigate('/', { replace: true });
  };

  const logout = async () => {
    await api.post('/logout');
    localStorage.removeItem('token');
    setUser(null);
    navigate('/login', { replace: true });
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth debe usarse dentro de AuthProvider');
  return ctx;
}
