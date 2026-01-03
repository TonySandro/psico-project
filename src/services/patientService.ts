import api from "./api";
import { Patient } from "../types/patient";
import { PatientRequestDto } from "../types/patient-request-dto";

export interface PatientPayload {
  name: string;
  age: number;
  schoolYear: string;
  dateOfBirth: string;
  gender: string;
  address?: string;
  phoneNumber?: string;
  motherName?: string;
  fatherName?: string;
}

export const getAvailableTests = () => {
  // return api.get(`/tests/available`);
  return {
    data: [
      {
        id: "tde-ii",
        name: "TDE-II (Teste de Desempenho Escolar)",
        description:
          "Avaliação do desempenho em leitura, escrita e aritmética.",
      },
      {
        id: "token-test",
        name: "Token Test",
        description: "Teste de compreensão auditiva de comandos verbais.",
      },
      {
        id: "snap-iv",
        name: "SNAP-IV",
        description:
          "Escala de avaliação para sintomas de TDAH e transtornos de conduta.",
      },
      {
        id: "cars",
        name: "CARS (Childhood Autism Rating Scale)",
        description: "Escala de avaliação para diagnóstico de TEA.",
      },
    ],
  };
};

export const getPatients = async (accountId: string) =>
  await api.get(`/get-all-patients-by-account/${accountId}`);

export const createPatient = async (data: PatientRequestDto): Promise<void> => {
  try {
    await api.post(`/create-patient`, data);
  } catch (error) {
    console.error("Erro ao criar paciente:", error);
    throw error;
  }
};

export const deletePatient = (id: string) =>
  api.delete(`/delete-patient/${id}`);

export const updatePatient = (id: string, data: Partial<Patient>) => {
  try {
    return api.patch(`/update-patient/${id}`, data);
  } catch (error) {
    console.error("Erro ao atualizar paciente:", error);
    throw error;
  }
};

export const addAnamnesis = (patientId: string, anamnesisData: any) => {
  // Ajustando para o endpoint correto. Assumindo que o patientId deve ir no corpo ou a rota mudou.
  // Baseado em anamnesis-routes.ts: router.post("/create-anamnesis", ...)
  // Provavelmente o patientId deve ser parte do anamnesisData no backend.
  return api.post(`/create-anamnesis`, { ...anamnesisData, patientId });
};
