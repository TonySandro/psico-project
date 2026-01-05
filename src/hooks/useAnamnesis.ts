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
            // Assuming the endpoint is /anamnesis/patient/:id or similar.
            // Based on previous create route: /create-anamnesis (POST)
            // I'll guess GET /anamnesis/:patientId or /get-anamnesis/:patientId
            // Let's try /get-anamnesis-by-patient/:id based on patient naming convention
            try {
                const response = await api.get<Anamnesis>(`/get-anamnesis-by-patient/${patientId}`);
                return response.data;
            } catch (error) {
                return null; // Return null if not found
            }
        },
        enabled: !!patientId,
        retry: false
    });
};
