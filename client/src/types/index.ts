// > User Types
export interface User {
    _id: string;
    username: string;
    email: string;
    role: 'user' | 'admin';
    createdAt: string;
    updatedAt: string;
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