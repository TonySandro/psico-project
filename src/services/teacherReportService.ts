import { api } from './api';
import type {
  PublicTeacherReportData,
  PublicTeacherReportLink,
  TeacherReportResponse,
  TeacherReportTemplate,
  TeacherReportTemplateForm,
} from '@/types/teacherReport';
import { toTeacherReportTemplatePayload } from '@/utils/teacherReportSchema';

export const teacherReportTemplateService = {
  list: async (): Promise<TeacherReportTemplate[]> => {
    const res = await api.get<TeacherReportTemplate[]>('/teacher-report/templates');
    return res.data;
  },

  getById: async (id: string): Promise<TeacherReportTemplate> => {
    const res = await api.get<TeacherReportTemplate>(`/teacher-report/templates/${id}`);
    return res.data;
  },

  create: async (data: TeacherReportTemplateForm): Promise<TeacherReportTemplate> => {
    const res = await api.post<TeacherReportTemplate>(
      '/teacher-report/templates',
      toTeacherReportTemplatePayload(data),
    );
    return res.data;
  },
};

export const teacherReportResponseService = {
  create: async (templateId: string, patientId?: string): Promise<TeacherReportResponse> => {
    const res = await api.post<TeacherReportResponse>('/teacher-report/responses', {
      templateId,
      patientId,
    });
    return res.data;
  },

  getById: async (id: string): Promise<TeacherReportResponse> => {
    const res = await api.get<TeacherReportResponse>(`/teacher-report/responses/${id}`);
    return res.data;
  },

  listByPatient: async (patientId: string): Promise<TeacherReportResponse[]> => {
    const res = await api.get<TeacherReportResponse[]>(`/teacher-report/patients/${patientId}/responses`);
    return res.data;
  },

  update: async (
    id: string,
    answers: Record<string, unknown>,
    status?: TeacherReportResponse['status'],
  ): Promise<TeacherReportResponse> => {
    const res = await api.put<TeacherReportResponse>(`/teacher-report/responses/${id}`, {
      answers,
      ...(status ? { status } : {}),
    });
    return res.data;
  },

  deleteResponse: async (id: string): Promise<void> => {
    await api.delete(`/teacher-report/responses/${id}`);
  },
};

export const teacherReportPublicService = {
  generateLink: async (patientId: string, templateId?: string): Promise<PublicTeacherReportLink> => {
    const res = await api.post<PublicTeacherReportLink>('/teacher-report/generate-link', {
      patientId,
      ...(templateId ? { templateId } : {}),
    });
    return res.data;
  },

  getByToken: async (token: string): Promise<PublicTeacherReportData> => {
    const res = await api.get<PublicTeacherReportData>(`/teacher-report/public/${token}`);
    return res.data;
  },

  submit: async (token: string, answers: Record<string, unknown>) => {
    const res = await api.post(`/teacher-report/public/${token}/answer`, { answers });
    return res.data;
  },
};
