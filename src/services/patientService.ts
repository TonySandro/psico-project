import axios from "axios";

const API_URL = "http://localhost:3301/api";

export const getPatients = () => axios.get(`${API_URL}/all-patients`);
export const deletePatient = (id: string) =>
  axios.delete(`${API_URL}/patients/${id}`);
