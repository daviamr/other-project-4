import React, { useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import { AuthContext, type AuthContextType, type User } from './auth-context';

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const savedToken = localStorage.getItem('@bearer');
    
    if (savedToken) {
      try {
        setToken(savedToken);
      } catch (error) {
        localStorage.removeItem('@bearer');
        localStorage.removeItem('userData');
        console.error('Erro ao carregar dados do usuário:', error);
      }
    }
    setLoading(false);
  }, []);

  const value: AuthContextType = {
    user,
    token,
    loading,
    setUser,
    setToken,
    setLoading,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};