import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    user: null,
    isAuthenticated: false,
    isLoading: true,
  });

  // Verify user on initial load
  useEffect(() => {
    const verifyUser = async () => {
      try {
        const { data } = await axios.get('http://localhost:4000/api/auth/verify', {
          withCredentials: true,
        });
        
        if (data.status) {
          setAuth({
            user: data.user,
            isAuthenticated: true,
            isLoading: false,
          });
        } else {
          setAuth({
            user: null,
            isAuthenticated: false,
            isLoading: false,
          });
        }
      } catch (error) {
        console.error('Authentication error:', error);
        setAuth({
          user: null,
          isAuthenticated: false,
          isLoading: false,
        });
      }
    };

    verifyUser();
  }, []);

  // Logout function
  const logout = async () => {
    try {
      await axios.get('http://localhost:4000/api/auth/logout', {
        withCredentials: true,
      });
      
      setAuth({
        user: null,
        isAuthenticated: false,
        isLoading: false,
      });
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <AuthContext.Provider value={{ auth, setAuth, logout }}>
      {children}
    </AuthContext.Provider>
  );
};