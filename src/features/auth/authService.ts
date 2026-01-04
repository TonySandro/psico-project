import { api } from '../../services/api';
import { User } from '../../store/authStore';

interface LoginResponse {
    accessToken: string;
    user: User; // Assuming backend returns user object, otherwise we might need to fetch it
}

// Adapting to backend response structure
// From routes: router.post("/login", ...)
// Usually backend returns { accessToken: "...", name: "..." ... }

export const authService = {
    login: async (email: string, password: string): Promise<LoginResponse> => {
        const { data } = await api.post<LoginResponse>('/login', { email, password });
        return data;
    },

    register: async (userData: any) => {
        const { data } = await api.post('/signup', userData);
        return data;
    },
};
