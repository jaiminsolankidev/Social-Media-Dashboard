import axios from 'axios';

/**
 * Centralized Axios client instance for VYBE application.
 * Configured with environment-based baseURL and comprehensive error handling.
 */
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3001',
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    // Demo session handling: Attach demo auth token if user is logged in
    const authUser = window.localStorage.getItem('vybe_auth_user');
    if (authUser) {
      try {
        const user = JSON.parse(authUser);
        config.headers.Authorization = `Bearer demo-token-${user.id}`;
      } catch {
        // Silently continue if parse fails
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Normalize and format error messages
    const message =
      error.response?.data?.message ||
      error.response?.statusText ||
      error.message ||
      'An unexpected network error occurred.';

    const enhancedError = new Error(message);
    enhancedError.status = error.response?.status;
    enhancedError.originalError = error;

    return Promise.reject(enhancedError);
  }
);

export default api;
