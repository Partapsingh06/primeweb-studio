import React, { createContext, useContext, useState, useEffect } from 'react';
import api from '../services/api';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    try {
      const savedUser = localStorage.getItem('pws_user');
      return savedUser ? JSON.parse(savedUser) : null;
    } catch {
      return null;
    }
  });
  const [token, setToken] = useState(() => localStorage.getItem('pws_token'));
  const [loading, setLoading] = useState(true);

  // Verify authentication on mount
  useEffect(() => {
    const initAuth = async () => {
      try {
        const storedToken = localStorage.getItem('pws_token');
        if (storedToken) {
          const res = await api.get('/auth/me');
          if (res.data?.data?.user) {
            setUser(res.data.data.user);
            localStorage.setItem('pws_user', JSON.stringify(res.data.data.user));
          }
        }
      } catch (err) {
        setUser(null);
        setToken(null);
        localStorage.removeItem('pws_token');
        localStorage.removeItem('pws_user');
      } finally {
        setLoading(false);
      }
    };

    initAuth();
  }, []);

  const login = async (email, password) => {
    const res = await api.post('/auth/login', { email, password });
    const { token: receivedToken, data } = res.data;
    if (receivedToken) {
      setToken(receivedToken);
      localStorage.setItem('pws_token', receivedToken);
    }
    if (data?.user) {
      setUser(data.user);
      localStorage.setItem('pws_user', JSON.stringify(data.user));
    }
    return data.user;
  };

  const register = async (userData) => {
    const res = await api.post('/auth/register', userData);
    const { token: receivedToken, data } = res.data;
    if (receivedToken) {
      setToken(receivedToken);
      localStorage.setItem('pws_token', receivedToken);
    }
    if (data?.user) {
      setUser(data.user);
      localStorage.setItem('pws_user', JSON.stringify(data.user));
    }
    return data.user;
  };

  const logout = async () => {
    try {
      await api.post('/auth/logout');
    } catch (e) {
      // Continue client cleanup even if network fails
    } finally {
      setUser(null);
      setToken(null);
      localStorage.removeItem('pws_token');
      localStorage.removeItem('pws_user');
    }
  };

  const updateProfile = async (profileData) => {
    const res = await api.put('/auth/profile', profileData);
    if (res.data?.data?.user) {
      setUser(res.data.data.user);
      localStorage.setItem('pws_user', JSON.stringify(res.data.data.user));
    }
    return res.data;
  };

  const value = {
    user,
    token,
    loading,
    isAuthenticated: Boolean(user),
    isAdmin: user?.role === 'admin',
    isClient: user?.role === 'client',
    login,
    register,
    logout,
    updateProfile,
    setUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
