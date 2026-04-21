import { api } from './api';
import type { AnamnesisTemplate, AnamnesisResponse } from '@/types/anamnesis';

// ─── Templates ───────────────────────────────────────────────────────────────

export const anamnesisTemplateService = {
  /** GET /anamnesis/templates */
  list: async (): Promise<AnamnesisTemplate[]> => {
    const res = await api.get<AnamnesisTemplate[]>('/anamnesis/templates');
    return res.data;
  },

  /** GET /anamnesis/templates/:id */
  getById: async (id: string): Promise<AnamnesisTemplate> => {
    const res = await api.get<AnamnesisTemplate>(`/anamnesis/templates/${id}`);
    return res.data;
  },

  /** POST /anamnesis/templates */
  create: async (data: Omit<AnamnesisTemplate, 'id' | 'createdAt'>): Promise<AnamnesisTemplate> => {
    const res = await api.post<AnamnesisTemplate>('/anamnesis/templates', data);
    return res.data;
  },

  /** PUT /anamnesis/templates/:id */
  update: async (id: string, data: Partial<AnamnesisTemplate>): Promise<AnamnesisTemplate> => {
    const res = await api.put<AnamnesisTemplate>(`/anamnesis/templates/${id}`, data);
    return res.data;
  },
};

// ─── Responses ────────────────────────────────────────────────────────────────

export const anamnesisResponseService = {
  /** POST /anamnesis/responses  → cria uma nova resposta (draft) */
  create: async (templateId: string, patientId?: string): Promise<AnamnesisResponse> => {
    const res = await api.post<AnamnesisResponse>('/anamnesis/responses', {
      templateId,
      patientId,
    });
    return res.data;
  },

  /** GET /anamnesis/responses/:id */
  getById: async (id: string): Promise<AnamnesisResponse> => {
    const res = await api.get<AnamnesisResponse>(`/anamnesis/responses/${id}`);
    return res.data;
  },

  /** GET /anamnesis/patients/:patientId/responses */
  listByPatient: async (patientId: string): Promise<AnamnesisResponse[]> => {
    const res = await api.get<AnamnesisResponse[]>(`/anamnesis/patients/${patientId}/responses`);
    return res.data;
  },

  /** PUT /anamnesis/responses/:id  → salva rascunho/completo */
  update: async (
    id: string,
    answers: Record<string, unknown>,
    status?: 'draft' | 'completed',
  ): Promise<AnamnesisResponse> => {
    const res = await api.put<AnamnesisResponse>(`/anamnesis/responses/${id}`, {
      answers,
      ...(status ? { status } : {}),
    });
    return res.data;
  },

  /** DELETE /anamnesis/responses/:id */
  deleteResponse: async (id: string): Promise<void> => {
    await api.delete(`/anamnesis/responses/${id}`);
  },
};
