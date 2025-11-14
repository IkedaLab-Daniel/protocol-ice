import { 
    createContext, 
    useContext,
    useEffect,
    useState,
    type ReactNode
} from "react";
import type { User } from "../types";
import { authAPI } from "../services/api";

interface AuthContextType {
    user: User;
    token: string;
    loading: boolean;
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
        console.log('working')
        
        const loadUser = async () => {
            const savedToken = localStorage.getItem('token');

            if (savedToken) {
                setToken(savedToken);

                // > try to verify the token
                try {
                    const response = await authAPI.getMe();

                    if (response.success){
                        setUser(response.data ?? null)
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

}