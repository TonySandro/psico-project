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
    onSuccess: (data: any) => {
      console.log('Login API Response:', data);
      const accessToken = data.accessToken;
      // Try to find the user object: could be the data itself (flat), or inside 'user' or 'account' property
      // We check for 'id' to confirm it's a valid user object
      let userObj = data.user || data.account || data;

      // If we have a token but no explicit user ID in the response body, try to decode the token
      if (accessToken && (!userObj || !userObj.id)) {
        try {
          // Decode JWT payload (standard format: header.payload.signature)
          const payload = JSON.parse(atob(accessToken.split('.')[1]));
          console.log('Decoded Token Payload:', payload);

          // Map payload fields to User object
          // Assuming payload has id, name, email
          userObj = {
            ...userObj,
            id: payload.id || payload.sub || payload.accountId,
            name: payload.name || userObj.name,
            email: payload.email || userObj.email
          };
        } catch (e) {
          console.error('Failed to decode token:', e);
        }
      }

      if (accessToken) {
        setUser(userObj, accessToken);
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