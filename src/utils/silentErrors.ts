import axios from 'axios';

// Utility to check if a value is an Axios/API error
const isApiError = (value: any): boolean => {
  if (!value) return false;

  // Check direct axios error properties
  if (value.isAxiosError || value.name === 'AxiosError') return true;
  if (axios.isAxiosError(value)) return true;

  // Check request or response indicators
  if (value.config && (value.request || value.response)) return true;

  // Check error message content
  const message = value.message || String(value);
  if (
    typeof message === 'string' &&
    (message.includes('AxiosError') ||
      message.includes('Network Error') ||
      message.includes('status code') ||
      message.includes('/api/'))
  ) {
    return true;
  }

  return false;
};

// 1. Intercept console.error to filter out API errors
const originalConsoleError = console.error;
console.error = (...args: any[]) => {
  const hasApiError = args.some((arg) => {
    // If it's a string, see if it contains typical API error text
    if (typeof arg === 'string') {
      const lowerArg = arg.toLowerCase();
      return (
        arg.includes('AxiosError') ||
        arg.includes('/api/') ||
        lowerArg.includes('refresh-token') ||
        lowerArg.includes('validating session') ||
        lowerArg.includes('fetching subscription') ||
        lowerArg.includes('failed to download report') ||
        lowerArg.includes('error creating report')
      );
    }
    // Check if the argument is an API error object
    return isApiError(arg);
  });

  if (hasApiError) {
    // Silently suppress logging this error to the console
    return;
  }

  originalConsoleError(...args);
};

// 2. Intercept console.warn to filter out API warnings if any
const originalConsoleWarn = console.warn;
console.warn = (...args: any[]) => {
  const hasApiError = args.some((arg) => {
    if (typeof arg === 'string') {
      return (
        arg.includes('AxiosError') ||
        arg.includes('/api/') ||
        arg.toLowerCase().includes('refresh-token')
      );
    }
    return isApiError(arg);
  });

  if (hasApiError) {
    return;
  }

  originalConsoleWarn(...args);
};

// 3. Register global unhandled promise rejection listener
if (typeof window !== 'undefined') {
  window.addEventListener('unhandledrejection', (event) => {
    const reason = event.reason;
    if (isApiError(reason)) {
      // Prevents the browser from logging the uncaught rejection
      event.preventDefault();
    }
  });
}
