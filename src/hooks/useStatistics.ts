import { useQuery } from '@tanstack/react-query';
import { api } from '@/services/api';
import type { Statistics } from '@/types/schema';

export const useStatistics = (accountId: string) => {
  return useQuery({
    queryKey: ['statistics', accountId],
    queryFn: async () => {
      const response = await api.get<Statistics>(`/statistics/${accountId}`);
      return response.data;
    },
    enabled: !!accountId
  });
};