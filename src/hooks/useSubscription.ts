import { useCallback } from 'react';
import { useQuery, useMutation } from '@tanstack/react-query';
import { api } from '@/services/api';
import { useAuthStore } from '@/stores/authStore';
import type { SubscriptionStatus } from '@/types/schema';

export const useSubscription = () => {
  const token = useAuthStore((state) => state.token);
  const subscription = useAuthStore((state) => state.subscription);
  const setSubscription = useAuthStore((state) => state.setSubscription);

  const query = useQuery({
    queryKey: ['subscriptionStatus', token],
    queryFn: async () => {
      if (!token) return null;
      const response = await api.get<SubscriptionStatus>('/payment/status');
      if (response.data) {
        setSubscription(response.data);
      }
      return response.data;
    },
    enabled: !!token,
    staleTime: 1000 * 60 * 5, // 5 minutes stale time
    retry: 1,
  });

  const initiatePaymentMutation = useMutation({
    mutationFn: async () => {
      const response = await api.post<{ checkoutUrl: string }>('/payment/preference', {
        description: 'Assinatura Premium NeuroPPAvalia',
        price: 29.90,
      });
      return response.data;
    },
    onSuccess: (data) => {
      if (data && data.checkoutUrl) {
        window.location.href = data.checkoutUrl;
      }
    },
  });

  const checkStatus = useCallback(async (paymentId?: string) => {
    try {
      const url = paymentId ? `/payment/status?payment_id=${paymentId}` : '/payment/status';
      const response = await api.get<SubscriptionStatus>(url);
      if (response.data) {
        setSubscription(response.data);
      }
      return response.data;
    } catch (error) {
      console.error('Error fetching subscription status:', error);
      throw error;
    }
  }, [setSubscription]);

  const activeSubscription = query.data || subscription;

  return {
    subscription: activeSubscription,
    loading: query.isLoading,
    error: query.error ? (query.error as Error).message : null,
    checkStatus,
    initiatePayment: () => initiatePaymentMutation.mutate(),
    subscribing: initiatePaymentMutation.isPending,
    isExpired: activeSubscription?.status === 'expired',
    isTrial: activeSubscription?.status === 'trial',
    isActive: activeSubscription?.status === 'active',
  };
};
