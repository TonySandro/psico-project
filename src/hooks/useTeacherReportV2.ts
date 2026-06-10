import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { teacherReportTemplateService, teacherReportResponseService } from '@/services/teacherReportService';
import type { TeacherReportResponse } from '@/types/teacherReport';
import { DEFAULT_TEACHER_REPORT } from '@/constants/defaultTeacherReport';

// ─── Templates ───────────────────────────────────────────────────────────────

export const useTeacherReportTemplates = () =>
  useQuery({
    queryKey: ['teacher-report-templates'],
    queryFn: async () => {
      const templates = await teacherReportTemplateService.list();
      if (templates.length === 0) {
        try {
          const defaultTemplate = await teacherReportTemplateService.create(DEFAULT_TEACHER_REPORT);
          return [defaultTemplate];
        } catch (error) {
          console.error('Failed to auto-initialize default teacher report template:', error);
        }
      }
      return templates;
    },
  });


export const useTeacherReportTemplate = (id: string) =>
  useQuery({
    queryKey: ['teacher-report-template', id],
    queryFn: () => teacherReportTemplateService.getById(id),
    enabled: !!id,
  });

export const useCreateTeacherReportTemplate = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (data: Parameters<typeof teacherReportTemplateService.create>[0]) =>
      teacherReportTemplateService.create(data),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['teacher-report-templates'] });
    },
  });
};

export const useUpdateTeacherReportTemplate = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Parameters<typeof teacherReportTemplateService.update>[1] }) =>
      teacherReportTemplateService.update(id, data),
    onSuccess: (_, { id }) => {
      qc.invalidateQueries({ queryKey: ['teacher-report-templates'] });
      qc.invalidateQueries({ queryKey: ['teacher-report-template', id] });
    },
  });
};

// ─── Responses ────────────────────────────────────────────────────────────────

export const useCreateTeacherReportResponse = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ templateId, patientId }: { templateId: string; patientId?: string }) =>
      teacherReportResponseService.create(templateId, patientId),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['teacher-report-responses'] });
    },
  });
};

export const useTeacherReportResponse = (id: string) =>
  useQuery({
    queryKey: ['teacher-report-response', id],
    queryFn: () => teacherReportResponseService.getById(id),
    enabled: !!id,
    retry: 1,
  });

export const usePatientTeacherReportResponses = (patientId: string) =>
  useQuery({
    queryKey: ['patient-teacher-report-responses', patientId],
    queryFn: () => teacherReportResponseService.listByPatient(patientId),
    enabled: !!patientId,
  });

export const useSaveTeacherReportResponse = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({
      id,
      answers,
      status,
    }: {
      id: string;
      answers: Record<string, unknown>;
      status?: TeacherReportResponse['status'];
    }) => teacherReportResponseService.update(id, answers, status),
    onSuccess: (data) => {
      qc.invalidateQueries({ queryKey: ['teacher-report-response', data.id] });
    },
  });
};

export const useDeleteTeacherReportResponse = (patientId: string) => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => teacherReportResponseService.deleteResponse(id),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['patient-teacher-report-responses', patientId] });
    },
  });
};
