import { create } from 'zustand';
import type { Account } from '@/types/schema';

interface AuthState {
  user: Account | null;
  token: string | null;
  isAuthenticated: boolean;
  setUser: (user: Account, token: string) => void;
  logout: () => void;
  initializeAuth: () => void;
}

export const useAuthStore = create<AuthState>((set) => {
  // Initialize state from localStorage immediately
  const storedUser = localStorage.getItem('user');
  const storedToken = localStorage.getItem('accessToken');

  let initialUser = null;
  let initialIsAuthenticated = false;

  if (storedUser && storedToken) {
    try {
      initialUser = JSON.parse(storedUser);
      initialIsAuthenticated = true;
    } catch {
      localStorage.removeItem('user');
      localStorage.removeItem('accessToken');
    }
  }

  return {
    user: initialUser,
    token: storedToken,
    isAuthenticated: initialIsAuthenticated,

    setUser: (user, token) => {
      localStorage.setItem('user', JSON.stringify(user));
      localStorage.setItem('accessToken', token);
      set({ user, token, isAuthenticated: true });
    },

    logout: () => {
      localStorage.removeItem('user');
      localStorage.removeItem('accessToken');
      set({ user: null, token: null, isAuthenticated: false });
    },

    initializeAuth: () => {
      const storedUser = localStorage.getItem('user');
      const storedToken = localStorage.getItem('accessToken');

      if (storedUser && storedToken) {
        try {
          const user = JSON.parse(storedUser);
          set({ user, token: storedToken, isAuthenticated: true });
        } catch {
          localStorage.removeItem('user');
          localStorage.removeItem('accessToken');
        }
      }
    }
  };
});