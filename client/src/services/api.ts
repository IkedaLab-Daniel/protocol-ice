import axios from 'axios';
import type {
  ApiResponse,
  AuthUser,
  LoginFormData,
  RegisterFormData,
  User,
  Vote,
  CreateVoteInput,
  VoteStats,
  VoteQueryParams,
  StatsQueryParams
} from '../types';

// Create axios instance with base configuration
const api = axios.create({
  baseURL: '/api', // Use relative URL - Netlify will proxy to EC2
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      const token = localStorage.getItem('token');
      if (token){
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        window.location.href = '/login';
      }
        
    }
    return Promise.reject(error);
  }
);

// ============= AUTH API =============

export const authAPI = {
  // Register new user
  register: async (data: Omit<RegisterFormData, 'confirmPassword'>): Promise<ApiResponse<AuthUser>> => {
    const response = await api.post<ApiResponse<AuthUser>>('/auth/register', data);
    return response.data;
  },

  // Login user
  login: async (data: LoginFormData): Promise<ApiResponse<AuthUser>> => {
    const response = await api.post<ApiResponse<AuthUser>>('/auth/login', data);
    return response.data;
  },

  // Get current user
  getMe: async (): Promise<ApiResponse<User>> => {
    const response = await api.get<ApiResponse<User>>('/auth/me');
    return response.data;
  },
};

// ============= VOTE API =============

export const voteAPI = {
  // Create a new vote
  createVote: async (data: CreateVoteInput): Promise<ApiResponse<Vote>> => {
    const response = await api.post<ApiResponse<Vote>>('/votes', data);
    return response.data;
  },

  // Get all votes (admin only)
  getAllVotes: async (params?: VoteQueryParams): Promise<ApiResponse<Vote[]>> => {
    const response = await api.get<ApiResponse<Vote[]>>('/votes', { params });
    return response.data;
  },

  // Get user's own votes
  getMyVotes: async (): Promise<ApiResponse<Vote[]>> => {
    const response = await api.get<ApiResponse<Vote[]>>('/votes/my-votes');
    return response.data;
  },

  // Get vote statistics
  getStats: async (params?: StatsQueryParams): Promise<ApiResponse<VoteStats>> => {
    const response = await api.get<ApiResponse<VoteStats>>('/votes/stats', { params });
    return response.data;
  },

  // Delete a vote
  deleteVote: async (id: string): Promise<ApiResponse> => {
    const response = await api.delete<ApiResponse>(`/votes/${id}`);
    return response.data;
  },
};

// ============= HEALTH CHECK =============

export const healthCheck = async (): Promise<ApiResponse> => {
  const response = await axios.get('/health'); // Use relative URL
  return response.data;
};

export default api;