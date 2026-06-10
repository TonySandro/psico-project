import { api } from './api';
import type { TeacherReportTemplate, TeacherReportResponse } from '@/types/teacherReport';

// ─── Templates ───────────────────────────────────────────────────────────────

export const teacherReportTemplateService = {
  /** GET /teacher-report/templates */
  list: async (): Promise<TeacherReportTemplate[]> => {
    const res = await api.get<TeacherReportTemplate[]>('/teacher-report/templates');
    return res.data;
  },

  /** GET /teacher-report/templates/:id */
  getById: async (id: string): Promise<TeacherReportTemplate> => {
    const res = await api.get<TeacherReportTemplate>(`/teacher-report/templates/${id}`);
    return res.data;
  },

  /** POST /teacher-report/templates */
  create: async (data: Omit<TeacherReportTemplate, 'id' | 'createdAt'>): Promise<TeacherReportTemplate> => {
    const res = await api.post<TeacherReportTemplate>('/teacher-report/templates', data);
    return res.data;
  },

  /** PUT /teacher-report/templates/:id */
  update: async (id: string, data: Partial<TeacherReportTemplate>): Promise<TeacherReportTemplate> => {
    const res = await api.put<TeacherReportTemplate>(`/teacher-report/templates/${id}`, data);
    return res.data;
  },
};

// ─── Responses ────────────────────────────────────────────────────────────────

export const teacherReportResponseService = {
  /** POST /teacher-report/responses  → cria uma nova resposta (draft) */
  create: async (templateId: string, patientId?: string): Promise<TeacherReportResponse> => {
    const res = await api.post<TeacherReportResponse>('/teacher-report/responses', {
      templateId,
      patientId,
    });
    return res.data;
  },

  /** GET /teacher-report/responses/:id */
  getById: async (id: string): Promise<TeacherReportResponse> => {
    const res = await api.get<TeacherReportResponse>(`/teacher-report/responses/${id}`);
    return res.data;
  },

  /** GET /teacher-report/patients/:patientId/responses */
  listByPatient: async (patientId: string): Promise<TeacherReportResponse[]> => {
    const res = await api.get<TeacherReportResponse[]>(`/teacher-report/patients/${patientId}/responses`);
    return res.data;
  },

  /** PUT /teacher-report/responses/:id  → salva rascunho/completo */
  update: async (
    id: string,
    answers: Record<string, unknown>,
    status?: 'draft' | 'completed',
  ): Promise<TeacherReportResponse> => {
    const res = await api.put<TeacherReportResponse>(`/teacher-report/responses/${id}`, {
      answers,
      ...(status ? { status } : {}),
    });
    return res.data;
  },

  /** DELETE /teacher-report/responses/:id */
  deleteResponse: async (id: string): Promise<void> => {
    await api.delete(`/teacher-report/responses/${id}`);
  },
};
