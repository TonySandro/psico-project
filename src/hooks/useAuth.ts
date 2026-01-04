import { useMutation } from '@tanstack/react-query';
import { api } from '@/services/api';
import { useAuthStore } from '@/stores/authStore';
import type { Account } from '@/types/schema';

interface LoginCredentials {
  email: string;
  password: string;
}

interface SignupData {
  name: string;
  email: string;
  password: string;
  passwordConfirmation: string;
}

export const useLogin = () => {
  const setUser = useAuthStore((state) => state.setUser);
  
  return useMutation({
    mutationFn: async (credentials: LoginCredentials) => {
      const response = await api.post<Account>('/login', credentials);
      return response.data;
    },
    onSuccess: (data) => {
      if (data.accessToken) {
        setUser(data, data.accessToken);
      }
    }
  });
};

export const useSignup = () => {
  const setUser = useAuthStore((state) => state.setUser);
  
  return useMutation({
    mutationFn: async (data: SignupData) => {
      const response = await api.post<Account>('/signup', data);
      return response.data;
    },
    onSuccess: (data) => {
      if (data.accessToken) {
        setUser(data, data.accessToken);
      }
    }
  });
};