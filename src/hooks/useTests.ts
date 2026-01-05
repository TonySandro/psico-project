import { api } from "@/services/api";
import { useMutation, useQuery } from "@tanstack/react-query";
import type { Protocol } from '@/types/schema';

// Result interfaces based on the mock endpoints
export interface StroopResult {
    age: number;
    task1Time: number;
    task2Time: number;
    task3Time: number;
    task1Errors: number;
    task2Errors: number;
    task3Errors: number;
}

export interface ATAResult {
    patientName: string;
    age: number;
    scores: {
        focusedAttention: number;
        sustainedAttention: number;
        alternatingAttention: number;
    };
}

export interface CARSResult {
    patientName: string;
    age: number;
    scores: number[];
}

export interface SNAPResult {
    patientName: string;
    age: number;
    answers: number[];
}

export interface TokenResult {
    name: string;
    age: number;
    correctAnswers: number;
}

export interface TDEResult {
    patientName: string;
    age: number;
    schoolGrade: string;
    writingScore: number;
    readingScore: number;
    arithmeticScore: number;
}

export const useTestResult = () => {
    return useMutation({
        mutationFn: async ({ testType, data }: { testType: string; data: any }) => {
            try {
                console.log("testType: ", testType);
                console.log("data: ", data);
                const type = testType.toLowerCase();
                const response = await api.post(`/${type}`, data);
                return response.data;
            } catch (error) {
                console.error('Error fetching test result:', error);
                throw error;
            }
        }
    });
};

export const useGetProtocols = (patientId: string) => {
    return useQuery({
        queryKey: ['protocols', patientId],
        queryFn: async () => {
            try {
                const response = await api.get<Protocol[]>(`/get-protocols-by-patient/${patientId}`);
                return response.data;
            } catch (error) {
                return [];
            }
        },
        enabled: !!patientId,
        retry: false
    });
};

export const useAddProtocol = () => {
    return useMutation({
        mutationFn: async ({ patientId, accountId, data }: { patientId: string; accountId: string; data: { name: string; type: string; data: any } }) => {
            const response = await api.post(`/patient/${patientId}/${accountId}/protocols`, data);
            return response.data;
        }
    });
};
