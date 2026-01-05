import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { api } from '@/services/api';
import type { Anamnesis } from '@/types/schema';

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
            } catch (error) {
                return null;
            }
        },
        enabled: !!patientId,
        retry: false
    });
};
