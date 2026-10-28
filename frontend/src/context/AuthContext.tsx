import {
    createContext,
    useContext,
    useEffect,
    useState,
    type ReactNode,
  } from "react";
  
  import { api } from "../services/api";
  
  export type CurrentUser = {
    id: number;
    ngo_id: number;
    full_name: string;
    email: string;
    role: string;
    ngo: {
      id: number;
      name: string;
      location: string;
      focus_area: string;
    };
  };
  
  type AuthContextValue = {
    user: CurrentUser | null;
    loading: boolean;
    login: (email: string, password: string) => Promise<void>;
    logout: () => void;
  };
  
  const AuthContext = createContext<AuthContextValue | undefined>(
    undefined,
  );
  
  const TOKEN_KEY = "impact_bhoomi_token";
  
  export function AuthProvider({
    children,
  }: {
    children: ReactNode;
  }) {
    const [user, setUser] = useState<CurrentUser | null>(null);
    const [loading, setLoading] = useState(true);
  
    useEffect(() => {
      const token = localStorage.getItem(TOKEN_KEY);
  
      if (!token) {
        setLoading(false);
        return;
      }
  
      api
        .get<CurrentUser>("/auth/me", {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => setUser(response.data))
        .catch(() => localStorage.removeItem(TOKEN_KEY))
        .finally(() => setLoading(false));
    }, []);
  
    async function login(email: string, password: string) {
      const tokenResponse = await api.post<{
        access_token: string;
      }>("/auth/login", { email, password });
  
      const token = tokenResponse.data.access_token;
  
      const userResponse = await api.get<CurrentUser>(
        "/auth/me",
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );
  
      localStorage.setItem(TOKEN_KEY, token);
      setUser(userResponse.data);
    }
  
    function logout() {
      localStorage.removeItem(TOKEN_KEY);
      setUser(null);
    }
  
    return (
      <AuthContext.Provider
        value={{ user, loading, login, logout }}
      >
        {children}
      </AuthContext.Provider>
    );
  }
  
  export function useAuth() {
    const context = useContext(AuthContext);
  
    if (!context) {
      throw new Error(
        "useAuth must be used inside AuthProvider",
      );
    }
  
    return context;
  }
  
  export function getAuthToken() {
    return localStorage.getItem(TOKEN_KEY);
  }
  