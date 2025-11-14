// > User Types
export interface User {
  _id: string;
  username: string;
  email: string;
  role: 'user' | 'admin';
  createdAt: string;
  updatedAt: string;
}

export interface AuthUser {
  id: string;
  username: string;
  email: string;
  token: string;
}

// > Vote Types
export interface Vote {
  _id: string;
  user: string;
  type: 'positive' | 'negative';
  label?: string;
  score: number;  
  timestamp: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateVoteInput {
  type: 'positive' | 'negative';
  label?: string;
  score: number;
}

// > Statistics Types
export interface VoteStats {
    totalScore: number;
    positiveCount: number;
    negativeCount: number;
    labelCount: Record<string, number>;
    totalVotes: number;
    dailyBreakdown: DailyStats[];
}

export interface DailyStats {
  date: string;
  positive: number;
  negative: number;
  total: number;
}

// > API Response Types
export interface ApiResponse<T = any> {
  success: boolean;
  message?: string;
  data?: T;
  count?: number;
}

// > Form Types
export interface LoginFormData {
  username_email: string;
  password: string;
}

export interface RegisterFormData {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

// > Qury Parameters
export interface VoteQueryPrams {
    startDate?: string;
    endDate?: string;
}

export interface StatsQueryParams {
    period?: 'today' | 'week' | 'month' | 'all';
}