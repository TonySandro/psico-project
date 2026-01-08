import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Account } from '@/types/schema';

interface AuthState {
  user: Account | null;
  token: string | null;
  isAuthenticated: boolean;
  setUser: (user: Account, token: string) => void;
  setToken: (token: string) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      isAuthenticated: false,

      setUser: (user, token) => {
        set({ user, token, isAuthenticated: true });
      },

      setToken: (token) => {
        set((state) => ({ token, isAuthenticated: !!token, user: state.user }));
      },

      logout: () => {
        set({ user: null, token: null, isAuthenticated: false });
        localStorage.removeItem('auth-storage');
      }
    }),
    {
      name: 'auth-storage',
    }
  )
);