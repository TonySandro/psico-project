import axios from "axios";

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

export const getPatients = () => axios.get(`${API_URL}/all-patients`);

export const createPatient = (data: PatientPayload) =>
  axios.post(`${API_URL}/patients`, data);

export const deletePatient = (id: string) =>
  axios.delete(`${API_URL}/patients/${id}`);
