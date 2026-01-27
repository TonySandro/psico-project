import { useQuery } from '@tanstack/react-query';
import { api } from '@/services/api';
import type { Account } from '@/types/schema';
import { useAuthStore } from '@/stores/authStore';

export const useAccount = (accountId: string | undefined) => {
    const updateUser = useAuthStore((state) => state.updateUser);

    return useQuery({
        queryKey: ['account', accountId],
        queryFn: async () => {
            if (!accountId) throw new Error('Account ID is required');
            const response = await api.get<Account>(`/get-account/${accountId}`);

            if (response.data) {
                updateUser(response.data);
            }

            return response.data;
        },
        enabled: !!accountId
    });
};
