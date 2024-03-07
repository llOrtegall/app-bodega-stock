import React, { createContext, useContext, useState } from 'react';
import { AuthContextData, AuthProviderProps, User } from '../interfaces/Interfaces';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const AuthContext = createContext<AuthContextData | undefined>(undefined);

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const navigate = useNavigate();

  const login = (token: string) => {
    if (token) {
      axios.get('/profile', { headers: { Authorization: `Bearer ${token}` } })
        .then(response => {
          console.log(response);
        })
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('bodega');
    navigate('/');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = (): AuthContextData => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};