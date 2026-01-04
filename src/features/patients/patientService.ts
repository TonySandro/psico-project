import { api } from '../../services/api';

export interface Patient {
    id: string;
    name: string;
    email?: string;
    birthDate?: string; // Date string
    schoolGrade?: string;
    school?: string;
    status: string;
}

export const patientService = {
    getAllByAccount: async (accountId: string): Promise<Patient[]> => {
        const { data } = await api.get<Patient[]>(`/get-all-patients-by-account/${accountId}`);
        return data;
    },

    create: async (patientData: Partial<Patient> & { accountId: string }) => {
        const { data } = await api.post('/create-patient', patientData);
        return data;
    },

    getById: async (id: string): Promise<Patient> => {
        const { data } = await api.get<Patient>(`/get-patient-by-id/${id}`);
        return data;
    },

    delete: async (id: string) => {
        await api.delete(`/delete-patient/${id}`);
    },

    update: async (id: string, patientData: Partial<Patient>) => {
        const { data } = await api.patch(`/update-patient/${id}`, patientData);
        return data;
    },

    createAnamnesis: async (anamnesisData: any) => {
        const { data } = await api.post('/create-anamnesis', anamnesisData);
        return data;
    }
};
