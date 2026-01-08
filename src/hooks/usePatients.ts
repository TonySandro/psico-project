import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '@/services/api';
import type { Patient } from '@/types/schema';

export const usePatients = (accountId: string) => {
  return useQuery({
    queryKey: ['patients', accountId],
    queryFn: async () => {
      const response = await api.get<Patient[]>(`/get-all-patients-by-account/${accountId}`);
      return response.data;
    },
    enabled: !!accountId
  });
};

export const usePatient = (id: string) => {
  return useQuery({
    queryKey: ['patient', id],
    queryFn: async () => {
      const response = await api.get<Patient>(`/get-patient-by-id/${id}`);
      return response.data;
    },
    enabled: !!id
  });
};

export const useCreatePatient = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (patient: Partial<Patient>) => {
      const response = await api.post<Patient>('/create-patient', patient);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['patients'] });
    }
  });
};

export const useUpdatePatient = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, data }: { id: string; data: Partial<Patient> }) => {
      const response = await api.put<Patient>(`/update-patient/${id}`, data);
      return response.data;
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['patients'] });
      queryClient.invalidateQueries({ queryKey: ['patient', variables.id] });
    }
  });
};

export const useDeletePatient = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      await api.delete(`/delete-patient/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['patients'] });
    }
  });
};