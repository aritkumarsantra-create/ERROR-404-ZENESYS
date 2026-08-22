import React, { createContext, useContext, useState, useEffect } from 'react';
import { useToast } from './ToastContext';

export interface UserProfile {
  name: string;
  email: string;
  role: string;
  avatar: string;
  team: string;
  quotaAttainment: string;
}

interface AuthContextType {
  isAuthenticated: boolean;
  user: UserProfile | null;
  login: (email: string, pass: string, remember: boolean) => Promise<boolean>;
  logout: () => void;
  isLoading: boolean;
  loginError: string | null;
  setLoginError: (err: string | null) => void;
  fillDemoCredentials: () => { email: string; pass: string };
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Check if session was saved
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    const saved = localStorage.getItem('c360_auth');
    return saved === 'true';
  });

  const [user, setUser] = useState<UserProfile | null>(() => {
    return {
      name: 'Arit Kumar',
      email: 'arit@zenesys.ai',
      role: 'Enterprise Sales Lead',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&auto=format&fit=crop&q=80',
      team: 'Team ERROR_404',
      quotaAttainment: '124% of Q3 Target'
    };
  });

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [loginError, setLoginError] = useState<string | null>(null);
  const { success, error, info } = useToast();

  const fillDemoCredentials = () => {
    return {
      email: 'arit.sales@zenesys.ai',
      pass: 'EnterpriseSales2026!'
    };
  };

  const login = async (emailInput: string, passInput: string, remember: boolean): Promise<boolean> => {
    setIsLoading(true);
    setLoginError(null);

    // Simulate network authentication request
    await new Promise(resolve => setTimeout(resolve, 1100));

    if (!emailInput || !passInput) {
      setIsLoading(false);
      setLoginError('Please enter both your work email and password.');
      error('Authentication Failed', 'Required fields are missing.');
      return false;
    }

    if (!emailInput.includes('@') || !emailInput.includes('.')) {
      setIsLoading(false);
      setLoginError('Please enter a valid corporate email address (e.g. rep@company.com).');
      error('Invalid Email Format', 'Corporate email address required.');
      return false;
    }

    if (passInput.length < 6) {
      setIsLoading(false);
      setLoginError('Password must contain at least 6 characters.');
      error('Invalid Password', 'Password too short.');
      return false;
    }

    // Success login
    setIsAuthenticated(true);
    if (remember) {
      localStorage.setItem('c360_auth', 'true');
    }
    setIsLoading(false);
    success('Welcome Back!', `Logged in as ${emailInput.split('@')[0] || 'Sales Rep'} (Enterprise Access).`);
    return true;
  };

  const logout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('c360_auth');
    info('Signed Out', 'You have been safely signed out of Customer 360.');
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        user,
        login,
        logout,
        isLoading,
        loginError,
        setLoginError,
        fillDemoCredentials
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
};
