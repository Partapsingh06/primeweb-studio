import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || '/api',
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to attach JWT token if present in localStorage or memory
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('pws_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor to handle errors gracefully
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const message =
      error.response?.data?.message ||
      error.message ||
      'An unexpected network error occurred.';
    
    // If unauthorized and session expired, clear token
    if (error.response?.status === 401 && !window.location.pathname.includes('/login')) {
      localStorage.removeItem('pws_token');
      localStorage.removeItem('pws_user');
    }

    return Promise.reject(new Error(message));
  }
);

export default api;
