import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { anamnesisTemplateService, anamnesisResponseService } from '@/services/anamnesisService';
import type { AnamnesisResponse } from '@/types/anamnesis';

// ─── Templates ───────────────────────────────────────────────────────────────

export const useAnamnesisTemplates = () =>
  useQuery({
    queryKey: ['anamnesis-templates'],
    queryFn: anamnesisTemplateService.list,
  });

export const useAnamnesisTemplate = (id: string) =>
  useQuery({
    queryKey: ['anamnesis-template', id],
    queryFn: () => anamnesisTemplateService.getById(id),
    enabled: !!id,
  });

export const useCreateAnamnesisTemplate = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (data: Parameters<typeof anamnesisTemplateService.create>[0]) =>
      anamnesisTemplateService.create(data),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['anamnesis-templates'] });
    },
  });
};

export const useUpdateAnamnesisTemplate = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Parameters<typeof anamnesisTemplateService.update>[1] }) =>
      anamnesisTemplateService.update(id, data),
    onSuccess: (_, { id }) => {
      qc.invalidateQueries({ queryKey: ['anamnesis-templates'] });
      qc.invalidateQueries({ queryKey: ['anamnesis-template', id] });
    },
  });
};

// ─── Responses ────────────────────────────────────────────────────────────────

export const useCreateAnamnesisResponse = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ templateId, patientId }: { templateId: string; patientId?: string }) =>
      anamnesisResponseService.create(templateId, patientId),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['anamnesis-responses'] });
    },
  });
};

export const useAnamnesisResponse = (id: string) =>
  useQuery({
    queryKey: ['anamnesis-response', id],
    queryFn: () => anamnesisResponseService.getById(id),
    enabled: !!id,
    retry: 1,
  });

export const usePatientAnamnesisResponses = (patientId: string) =>
  useQuery({
    queryKey: ['patient-anamnesis-responses', patientId],
    queryFn: () => anamnesisResponseService.listByPatient(patientId),
    enabled: !!patientId,
  });

export const useSaveAnamnesisResponse = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({
      id,
      answers,
      status,
    }: {
      id: string;
      answers: Record<string, unknown>;
      status?: AnamnesisResponse['status'];
    }) => anamnesisResponseService.update(id, answers, status),
    onSuccess: (data) => {
      qc.invalidateQueries({ queryKey: ['anamnesis-response', data.id] });
    },
  });
};
