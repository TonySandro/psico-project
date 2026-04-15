import { api } from './api';
import type { AnamnesisTemplate, AnamnesisResponse } from '@/types/anamnesis';

// ─── Templates ───────────────────────────────────────────────────────────────

export const anamnesisTemplateService = {
  /** GET /anamnese/templates */
  list: async (): Promise<AnamnesisTemplate[]> => {
    const res = await api.get<AnamnesisTemplate[]>('/anamnese/templates');
    return res.data;
  },

  /** GET /anamnese/templates/:id */
  getById: async (id: string): Promise<AnamnesisTemplate> => {
    const res = await api.get<AnamnesisTemplate>(`/anamnese/templates/${id}`);
    return res.data;
  },

  /** POST /anamnese/templates */
  create: async (data: Omit<AnamnesisTemplate, 'id' | 'createdAt'>): Promise<AnamnesisTemplate> => {
    const res = await api.post<AnamnesisTemplate>('/anamnese/templates', data);
    return res.data;
  },

  /** PUT /anamnese/templates/:id */
  update: async (id: string, data: Partial<AnamnesisTemplate>): Promise<AnamnesisTemplate> => {
    const res = await api.put<AnamnesisTemplate>(`/anamnese/templates/${id}`, data);
    return res.data;
  },
};

// ─── Responses ────────────────────────────────────────────────────────────────

export const anamnesisResponseService = {
  /** POST /anamnese/responses  → cria uma nova resposta (draft) */
  create: async (templateId: string, patientId?: string): Promise<AnamnesisResponse> => {
    const res = await api.post<AnamnesisResponse>('/anamnese/responses', {
      templateId,
      patientId,
    });
    return res.data;
  },

  /** GET /anamnese/responses/:id */
  getById: async (id: string): Promise<AnamnesisResponse> => {
    const res = await api.get<AnamnesisResponse>(`/anamnese/responses/${id}`);
    return res.data;
  },

  /** GET /anamnese/patients/:patientId/responses */
  listByPatient: async (patientId: string): Promise<AnamnesisResponse[]> => {
    const res = await api.get<AnamnesisResponse[]>(`/anamnese/patients/${patientId}/responses`);
    return res.data;
  },

  /** PUT /anamnese/responses/:id  → salva rascunho/completo */
  update: async (
    id: string,
    answers: Record<string, unknown>,
    status?: 'draft' | 'completed',
  ): Promise<AnamnesisResponse> => {
    const res = await api.put<AnamnesisResponse>(`/anamnese/responses/${id}`, {
      answers,
      ...(status ? { status } : {}),
    });
    return res.data;
  },
};
