import axios from 'axios';

/**
 * Resolves and normalizes the backend API base URL:
 * - If VITE_API_URL is provided without '/api' (e.g. https://xxx.onrender.com),
 *   automatically appends '/api' so all mounted Express endpoints resolve correctly.
 * - Strips any trailing slashes to avoid double slashes.
 * - Defaults to '/api' for seamless Vite proxying in local development.
 */
const resolveBaseUrl = () => {
  const envUrl = (import.meta.env.VITE_API_URL || '').trim();
  if (!envUrl || envUrl === '/api') {
    return '/api';
  }

  const clean = envUrl.replace(/\/+$/, '');
  if (!clean.endsWith('/api')) {
    return `${clean}/api`;
  }
  return clean;
};

const api = axios.create({
  baseURL: resolveBaseUrl(),
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

export const getImageUrl = (url) => {
  if (!url) return '';
  if (url.startsWith('http://') || url.startsWith('https://') || url.startsWith('data:')) {
    return url;
  }
  const base = resolveBaseUrl().replace(/\/api$/, '');
  return `${base}${url.startsWith('/') ? '' : '/'}${url}`;
};

export default api;
