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

const handleResponseError = async (error: any) => {
  const originalRequest = error.config;

  if (error.response?.status === 403) {
    const currentPath = window.location.pathname;
    if (!currentPath.startsWith('/payment')) {
      sessionStorage.setItem('redirectAfterPayment', currentPath);
      window.location.href = '/payment/subscribe';
    }
    return Promise.reject(error);
  }

  const token = useAuthStore.getState().token;
  const isAuthRequest = originalRequest?.url?.includes('/login') ||
    originalRequest?.url?.includes('/signup') ||
    originalRequest?.url?.includes('/refresh-token');

  if (error.response?.status === 401 && !originalRequest?._retry && token && !isAuthRequest) {
    originalRequest._retry = true;

    try {
      const response = await axios.post(`${API_BASE_URL}/refresh-token`, {}, {
        withCredentials: true
      });

      const { accessToken } = response.data;

      if (accessToken) {
        useAuthStore.getState().setToken(accessToken);

        originalRequest.headers['Authorization'] = `Bearer ${accessToken}`;

        return api(originalRequest);
      }
    } catch (refreshError) {
      useAuthStore.getState().logout();
      return Promise.reject(refreshError);
    }
  }

  return Promise.reject(error);
};

api.interceptors.response.use(
  (response) => {
    const mockStatus = response.headers?.['x-mock-status'];
    if (mockStatus) {
      const status = parseInt(mockStatus, 10);
      const statusText = response.headers?.['x-mock-status-text'] || '';

      const error = new Error(`Request failed with status code ${status}`) as any;
      error.name = 'AxiosError';
      error.code = status >= 500 ? 'ERR_BAD_RESPONSE' : 'ERR_BAD_REQUEST';
      error.status = status;
      error.isAxiosError = true;
      error.response = {
        data: response.data,
        status: status,
        statusText: statusText,
        headers: response.headers,
        config: response.config
      };
      error.config = response.config;
      error.request = response.request;

      return handleResponseError(error);
    }
    return response;
  },
  async (error) => {
    return handleResponseError(error);
  }
);