import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { api } from '@/services/api';
import { useAuthStore } from '@/stores/authStore';
import type { Anamnesis, PublicAnamnesisLink, PublicAnamnesisData } from '@/types/schema';

type CreateAnamnesisDTO = Omit<Anamnesis, 'id' | 'createdAt'>;

export const useCreateAnamnesis = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (data: CreateAnamnesisDTO) => {
            const response = await api.post<Anamnesis>('/create-anamnesis', data);
            return response.data;
        },
        // ... existing code ...
        onSuccess: (_, variables) => {
            queryClient.invalidateQueries({ queryKey: ['patient', variables.patientId] });
            queryClient.invalidateQueries({ queryKey: ['anamnesis', variables.patientId] });
        }
    });
};

export const useGetAnamnesis = (patientId: string) => {
    return useQuery({
        queryKey: ['anamnesis', patientId],
        queryFn: async () => {
            try {
                const response = await api.get<Anamnesis>(`/get-anamnesis-by-patient/${patientId}`);
                return response.data;
            } catch (_) { // eslint-disable-line @typescript-eslint/no-unused-vars
                return null;
            }
        },
        enabled: !!patientId,
        retry: false
    });
};

export const useGenerateAnamnesisLink = () => {
    return useMutation({
        mutationFn: async (patientId: string) => {
            const accountId = useAuthStore.getState().user?.id;
            const response = await api.post<PublicAnamnesisLink>('/generate-link', { patientId, accountId });
            return response.data;
        }
    });
};

export const useGetPublicAnamnesis = (token: string) => {
    return useQuery({
        queryKey: ['public-anamnesis', token],
        queryFn: async () => {
            const response = await api.get<PublicAnamnesisData>(`/public/${token}`);
            return response.data;
        },
        enabled: !!token,
        retry: false
    });
};

export const useSubmitPublicAnamnesis = () => {
    return useMutation({
        mutationFn: async ({ token, answers }: { token: string, answers: Record<string, any> }) => {
            const response = await api.post(`/public/${token}/answer`, { answers });
            return response.data;
        }
    });
};
