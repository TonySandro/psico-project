import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  teacherReportPublicService,
  teacherReportResponseService,
  teacherReportTemplateService,
} from '@/services/teacherReportService';
import type { TeacherReportResponse } from '@/types/teacherReport';

export const useTeacherReportTemplates = () =>
  useQuery({
    queryKey: ['teacher-report-templates'],
    queryFn: teacherReportTemplateService.list,
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
    mutationFn: teacherReportTemplateService.create,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['teacher-report-templates'] });
    },
  });
};

export const useCreateTeacherReportResponse = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ templateId, patientId }: { templateId: string; patientId?: string }) =>
      teacherReportResponseService.create(templateId, patientId),
    onSuccess: (_, variables) => {
      qc.invalidateQueries({ queryKey: ['teacher-report-responses'] });
      if (variables.patientId) {
        qc.invalidateQueries({ queryKey: ['patient-teacher-report-responses', variables.patientId] });
      }
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
      if (data.patientId) {
        qc.invalidateQueries({ queryKey: ['patient-teacher-report-responses', data.patientId] });
      }
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

export const useGenerateTeacherReportLink = () =>
  useMutation({
    mutationFn: ({ patientId, templateId }: { patientId: string; templateId?: string }) =>
      teacherReportPublicService.generateLink(patientId, templateId),
  });

export const useGetPublicTeacherReport = (token: string) =>
  useQuery({
    queryKey: ['public-teacher-report', token],
    queryFn: () => teacherReportPublicService.getByToken(token),
    enabled: !!token,
    retry: false,
  });

export const useSubmitPublicTeacherReport = () =>
  useMutation({
    mutationFn: ({ token, answers }: { token: string; answers: Record<string, unknown> }) =>
      teacherReportPublicService.submit(token, answers),
  });
