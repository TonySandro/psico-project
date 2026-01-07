import axios from 'axios';

let API_BASE_URL = import.meta.env.VITE_API_URL || '/api';

if (API_BASE_URL && !API_BASE_URL.startsWith('http') && !API_BASE_URL.startsWith('/')) {
  API_BASE_URL = `https://${API_BASE_URL}`;
}

export const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json'
  }
});

import { useAuthStore } from '@/stores/authStore';

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = useAuthStore.getState().token;
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for error handling and token refresh
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Prevent infinite loops
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        // Attempt to refresh token
        // usage of direct axios call to avoid circular dependency loop if using 'api' instance recursively without care
        // However, we can use the same interceptor instance if we are careful, or a fresh one.
        // Using 'api' might re-trigger 401 if refresh fails? Yes. 
        // But /refresh-token endpoint shouldn't require auth header usually, just cookies.
        // It's safer to use a clean axios instance or the same one if we know /refresh-token is public/cookie-based

        const response = await axios.post(`${API_BASE_URL}/refresh-token`, {}, {
          withCredentials: true // Important for sending cookies
        });

        const { accessToken } = response.data;

        if (accessToken) {
          useAuthStore.getState().setToken(accessToken);

          // Update the header for the original request
          originalRequest.headers['Authorization'] = `Bearer ${accessToken}`;

          // Retry the original request
          return api(originalRequest);
        }
      } catch (refreshError) {
        // Refresh failed (token expired or invalid)
        useAuthStore.getState().logout();
        // Optionally redirect or let the UI handle the logged-out state
        // window.location.href = '/login'; // Let the PrivateRoute handle redirection based on state
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);