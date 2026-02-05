import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { api } from '@/services/api';
import type { Report } from '@/types/schema';

type CreateReportDTO = Omit<Report, 'id' | 'createdAt' | 'updatedAt'>;
type UpdateReportDTO = Partial<Omit<Report, 'id' | 'createdAt' | 'updatedAt'>>;

export const useGetReport = (reportId: string) => {
    return useQuery({
        queryKey: ['report', reportId],
        queryFn: async () => {
            const response = await api.get<Report>(`/get-report/${reportId}`);
            return response.data;
        },
        enabled: !!reportId,
        retry: 1
    });
};

export const useCreateReport = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (data: CreateReportDTO) => {
            const response = await api.post<Report>('/create-report', data);
            return response.data;
        },
        onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: ['reports'] });
            queryClient.invalidateQueries({ queryKey: ['patient', data.patientId] });
            queryClient.setQueryData(['report', data.id], data);
        }
    });
};

// Update existing report (for autosave)
export const useUpdateReport = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async ({ patientId, accountId, data }: { patientId: string; accountId: string; data: UpdateReportDTO }) => {
            const response = await api.put<Report>(`/report/${patientId}/${accountId}`, data);
            return response.data;
        },
        onSuccess: (data) => {
            queryClient.setQueryData(['report', data.id], data);
            queryClient.invalidateQueries({ queryKey: ['reports'] });
            queryClient.invalidateQueries({ queryKey: ['patient', data.patientId] });
        }
    });
};

export const useUploadImage = () => {
    return useMutation({
        mutationFn: async (file: File) => {
            const formData = new FormData();
            formData.append('file', file);

            const response = await api.post<{ url: string }>('/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            return response.data.url;
        }
    });
};
