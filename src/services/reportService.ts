import { api } from './api';
import type { Report } from '@/types/schema';

export const reportService = {
    /**
     * Cria um novo relatório.
     * Rota: POST /create-report
     */
    createReport: async (data: Omit<Report, 'id' | 'createdAt' | 'updatedAt'>) => {
        const response = await api.post<Report>('/create-report', data);
        return response.data;
    },

    /**
     * Busca um relatório pelo ID.
     * Rota: GET /get-report/:id
     */
    getReportById: async (id: string) => {
        const response = await api.get<Report>(`/get-report/${id}`);
        return response.data;
    },

    /**
     * Busca o relatório de um paciente específico (1-para-1).
     * Rota inferida: GET /report/:patientId/:accountId
     */
    getReportByPatient: async (patientId: string, accountId: string) => {
        const response = await api.get<Report>(`/report/${patientId}/${accountId}`);
        return response.data;
    },

    /**
     * Atualiza o relatório utilizando patientId e accountId.
     * Rota: PUT /report/:patientId/:accountId
     */
    updateReport: async (patientId: string, accountId: string, data: Partial<Report>) => {
        const response = await api.put<Report>(`/report/${patientId}/${accountId}`, data);
        return response.data;
    },

    /**
     * Upload de imagem.
     * Rota: POST /upload
     */
    uploadImage: async (formData: FormData) => {
        const response = await api.post<{ url: string }>('/upload', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return response.data;
    }
};
