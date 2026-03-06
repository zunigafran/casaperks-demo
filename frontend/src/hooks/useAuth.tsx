import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { api, Resident } from '../api';

interface AuthContextType {
  resident: Resident | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  updateBalance: (newBalance: number) => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [resident, setResident] = useState<Resident | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('casaperks_token');
    if (token) {
      api.getMe()
        .then(setResident)
        .catch(() => localStorage.removeItem('casaperks_token'))
        .finally(() => setIsLoading(false));
    } else {
      setIsLoading(false);
    }
  }, []);

  const login = async (email: string, password: string) => {
    const { token, resident } = await api.login(email, password);
    localStorage.setItem('casaperks_token', token);
    setResident(resident);
  };

  const logout = () => {
    localStorage.removeItem('casaperks_token');
    setResident(null);
  };

  const updateBalance = (newBalance: number) => {
    if (resident) setResident({ ...resident, pointsBalance: newBalance });
  };

  return (
    <AuthContext.Provider value={{ resident, login, logout, updateBalance, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
