import { api } from '../../services/api';

export interface UserStatistics {
    totalPatients: number;
    totalPatientsWithAnamnesis: number;
    totalActiveProtocols: number;
    averagePatientAge: number;
    patientsByGender: Record<string, number>;
}

export const statisticsService = {
    getUserStatistics: async (accountId: string): Promise<UserStatistics> => {
        const { data } = await api.get<UserStatistics>(`/statistics/${accountId}`);
        return data;
    }
};
