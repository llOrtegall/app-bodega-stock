import React, { createContext, useContext, useState } from 'react';
import { Auth, AuthContextData, AuthProviderProps, User } from '../interfaces/Interfaces';
import axios from 'axios';

const AuthContext = createContext<AuthContextData | undefined>(undefined);

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  const login = ({ auth, token }: Auth) => {
    if(auth === true){
      axios.get('/profile', { headers: { Authorization: `Bearer ${token}` } })
        .then(response => {
          setUser(response.data);
        })
        .catch(err => {
          console.error(err);
        })
    }
  };

  const logout = () => {
    setUser(null);
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