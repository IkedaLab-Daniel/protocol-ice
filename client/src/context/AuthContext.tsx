import { 
    createContext, 
    useContext,
    useEffect,
    useState,
    type ReactNode
} from "react";
import type { LoginFormData, RegisterFormData, User } from "../types";
import { authAPI } from "../services/api";

interface AuthContextType {
    user: User | null;
    token: string | null;
    loading: boolean;
    login: (data: LoginFormData) => Promise<void>;
    register: (data: Omit<RegisterFormData, 'confirmPassword'>) => Promise<void>;
    logout: () => void;
    isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within AuthProvider');
    }
    return context;
}

interface AuthProviderProps {
    children: ReactNode
}

export const AuthProvider = ({ children }: AuthProviderProps) => {

    const [token, setToken] = useState<string | null>(null)
    const [user, setUser] = useState<User | null>(null)
    const [loading, setLoading] = useState<boolean>(true)

    // > Load user from local storage
    useEffect(() => {
        const loadUser = async () => {
            const savedToken = localStorage.getItem('token');

            if (savedToken) {
                setToken(savedToken);

                // > try to verify the token
                try {
                    const response = await authAPI.getMe();

                    if (response.success && response.data){
                        setUser(response.data)
                    } else {
                        localStorage.removeItem('token');
                        localStorage.removeItem('user');
                    }

                } catch (error) {
                    localStorage.removeItem('token');
                    localStorage.removeItem('user');
                    setToken(null);
                }
            }
            setLoading(false);
        }
        loadUser();
    }, [])

    const login = async (data: LoginFormData) => {
        try {
            const response = await authAPI.login(data);
            if (response.success && response.data){
                const { token: newToken } = response.data;
                setToken(newToken);
                localStorage.setItem('token', newToken);
                
                // Fetch full user data
                const userResponse = await authAPI.getMe();
                if (userResponse.success && userResponse.data) {
                    setUser(userResponse.data);
                    localStorage.setItem('user', JSON.stringify(userResponse.data));
                }
            }
        } catch (error: any) {
            const message = error.response?.data?.message || 'Login failed';
            throw new Error(message);
        }
    }

    const register = async (data: Omit<RegisterFormData, 'confirmPassword'>) => {
        try {
            const response = await authAPI.register(data);
            if (response.success && response.data) {
                const { token: newToken } = response.data;
                setToken(newToken);
                localStorage.setItem('token', newToken);
                
                // Fetch full user data
                const userResponse = await authAPI.getMe();
                if (userResponse.success && userResponse.data) {
                    setUser(userResponse.data);
                    localStorage.setItem('user', JSON.stringify(userResponse.data));
                }
            }
        } catch (error: any) {
            const message = error.response?.data?.message || 'Registration failed';
            throw new Error(message);
        }
    }

    const logout = () => {
        setUser(null);
        setToken(null);
        localStorage.removeItem('token');
        localStorage.removeItem('user');
    }

    const value: AuthContextType = {
        user,
        token,
        loading,
        login,
        register,
        logout,
        isAuthenticated: !!token && !!user,
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}