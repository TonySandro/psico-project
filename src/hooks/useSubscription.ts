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
      const response = await api.post<{ checkoutUrl: string }>('/payment/subscribe', {
        description: 'Assinatura Premium NPPAvalia',
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

  const cancelSubscriptionMutation = useMutation({
    mutationFn: async () => {
      const response = await api.post<{ message: string; endsAt?: string; status?: string }>('/payment/cancel');
      return response.data;
    },
    onSuccess: (data) => {
      const endsAtStr = data?.endsAt
        ? (typeof data.endsAt === 'string' ? data.endsAt : new Date(data.endsAt).toISOString())
        : undefined;

      useAuthStore.getState().updateUser({
        subscriptionStatus: 'cancelled',
        ...(endsAtStr ? { subscriptionEndsAt: endsAtStr } : {}),
      });

      const currentSub = useAuthStore.getState().subscription;
      if (currentSub) {
        useAuthStore.getState().setSubscription({
          ...currentSub,
          status: 'cancelled',
          endsAt: endsAtStr || currentSub.endsAt,
        });
      }

      // Refetch subscription status after cancellation
      query.refetch();
    },
  });

  const checkStatus = useCallback(async (preapprovalId?: string) => {
    try {
      const url = preapprovalId ? `/payment/status?preapproval_id=${preapprovalId}` : '/payment/status';
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

  const isCancelled = activeSubscription?.status === 'cancelled';
  const isCancelledActive = isCancelled && !!activeSubscription?.endsAt && new Date() <= new Date(activeSubscription.endsAt);
  const isExpired = activeSubscription?.status === 'expired' || (isCancelled && !!activeSubscription?.endsAt && new Date() > new Date(activeSubscription.endsAt));

  return {
    subscription: activeSubscription,
    loading: query.isLoading,
    error: query.error ? (query.error as Error).message : null,
    checkStatus,
    initiatePayment: () => initiatePaymentMutation.mutate(),
    subscribing: initiatePaymentMutation.isPending,
    cancelSubscription: () => cancelSubscriptionMutation.mutateAsync(),
    cancelling: cancelSubscriptionMutation.isPending,
    isExpired,
    isTrial: activeSubscription?.status === 'trial',
    isActive: activeSubscription?.status === 'active' || isCancelledActive,
    isCancelled: isCancelledActive,
    isPaused: activeSubscription?.status === 'paused',
  };
};
