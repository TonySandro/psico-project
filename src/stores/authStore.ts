import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Account, SubscriptionStatus } from '@/types/schema';

interface AuthState {
  user: Account | null;
  token: string | null;
  isAuthenticated: boolean;
  subscription: SubscriptionStatus | null;
  setUser: (user: Account, token: string) => void;
  updateUser: (user: Partial<Account>) => void;
  setToken: (token: string) => void;
  setSubscription: (subscription: SubscriptionStatus | null) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      subscription: null,

      setUser: (user, token) => {
        set({ user, token, isAuthenticated: true });
      },

      setToken: (token) => {
        set((state) => ({ token, isAuthenticated: !!token, user: state.user }));
      },

      updateUser: (data: Partial<Account>) => {
        set((state) => ({
          user: state.user ? { ...state.user, ...data } : null
        }));
      },

      setSubscription: (subscription) => {
        set({ subscription });
      },

      logout: () => {
        set({ user: null, token: null, isAuthenticated: false, subscription: null });
        localStorage.removeItem('auth-storage');
      }
    }),
    {
      name: 'auth-storage',
    }
  )
);