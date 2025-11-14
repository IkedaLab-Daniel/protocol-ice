import axios from "axios";
import type {
    ApiResponse,
    AuthUser,
    LoginFormData,
    RegisterFormData,
    User,
} from "../types";

// > Axios instance with base configuration
const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3000/api',
    headers: {
        'Content-Type': 'application/json',
    },
});

// > Request Interceptor -> Automatically add auth token
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config
    },
    (error) => {
        return Promise.reject(error);
    }
);

// > Request Interceptor -> handle 401 errors globally
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            // Clear the token
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            window.location.href = "/login";
        }

        return Promise.reject(error);
    }
);

// > ============== AUTH API ==============

export const authAPI = {
    register: async (data: Omit<RegisterFormData, 'confirmPassword'>): Promise<ApiResponse<AuthUser>> => {
        const response = await api.post<ApiResponse<AuthUser>>('/auth/register', data);
        return response.data;
    },

    login: async (data: LoginFormData): Promise<ApiResponse<AuthUser>> => {
        const response = await api.post<ApiResponse<AuthUser>>('/auth/login', data);
        return response.data;
    },

    getMe: async (): Promise<ApiResponse<User>> => {
        const response = await api.get<ApiResponse<User>>('/auth/me');
        return response.data;
    }


}