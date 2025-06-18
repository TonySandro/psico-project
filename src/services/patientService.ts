import axios from "axios";
import { Patient } from "../types/patient";

const API_URL = "http://localhost:3301/api";

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
  // return axios.get("http://localhost:3301/api/tests/available");
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

export const getPatients = () => axios.get(`${API_URL}/all-patients`);

export const createPatient = (data: Omit<Patient, "id">) =>
  axios.post(`${API_URL}/patients`, data);

export const deletePatient = (id: string) =>
  axios.delete(`${API_URL}/patients/${id}`);

export const updatePatient = (id: string, data: Partial<Patient>) => {
  return axios.put(`${API_URL}/${id}`, data);
};

export const addAnamnesis = (patientId: string, anamnesisData: any) => {
  return axios.post(`${API_URL}/${patientId}/anamnesis`, anamnesisData);
};
