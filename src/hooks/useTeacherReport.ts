import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { api } from '@/services/api';
import { useAuthStore } from '@/stores/authStore';
import type { PublicTeacherReportLink, PublicTeacherReportData } from '@/types/schema';
import type { TeacherReportResponse } from '@/types/teacherReport';

// Usamos TeacherReportResponse como o equivalente a Anamnesis para o endpoint legado/V1.
type CreateTeacherReportDTO = Omit<TeacherReportResponse, 'id' | 'createdAt'>;

export const useCreateTeacherReport = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (data: CreateTeacherReportDTO) => {
            const response = await api.post<TeacherReportResponse>('/create-teacher-report', data);
            return response.data;
        },
        onSuccess: (_, variables) => {
            queryClient.invalidateQueries({ queryKey: ['patient', variables.patientId] });
            queryClient.invalidateQueries({ queryKey: ['teacher-report', variables.patientId] });
        }
    });
};

export const useGetTeacherReport = (patientId: string) => {
    return useQuery({
        queryKey: ['teacher-report', patientId],
        queryFn: async () => {
            try {
                const response = await api.get<TeacherReportResponse>(`/get-teacher-report-by-patient/${patientId}`);
                return response.data;
            } catch (_) { // eslint-disable-line @typescript-eslint/no-unused-vars
                return null;
            }
        },
        enabled: !!patientId,
        retry: false
    });
};

export const useGenerateTeacherReportLink = () => {
    return useMutation({
        mutationFn: async (patientId: string) => {
            const accountId = useAuthStore.getState().user?.id;
            const response = await api.post<PublicTeacherReportLink>('/teacher-report/generate-link', { patientId, accountId });
            return response.data;
        }
    });
};

export const useGetPublicTeacherReport = (token: string) => {
    return useQuery({
        queryKey: ['public-teacher-report', token],
        queryFn: async () => {
            const response = await api.get<PublicTeacherReportData>(`/teacher-report/public/${token}`);
            return response.data;
        },
        enabled: !!token,
        retry: false
    });
};

export const useSubmitPublicTeacherReport = () => {
    return useMutation({
        mutationFn: async ({ token, answers }: { token: string, answers: Record<string, any> }) => {
            const response = await api.post(`/teacher-report/public/${token}/answer`, { answers });
            return response.data;
        }
    });
};

