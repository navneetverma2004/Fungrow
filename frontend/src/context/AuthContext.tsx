import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, UserRole, TeenProfile, CompanyProfile } from '@/types';
import { INITIAL_USERS } from '@/data/mockData';
import { storageService } from '@/services/storageService';

interface AuthContextType {
  user: User | null;
  role: UserRole | null;
  teenProfile: TeenProfile | null;
  companyProfile: CompanyProfile | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, role?: UserRole) => boolean;
  loginAsDemo: (role: UserRole) => void;
  logout: () => void;
  updateTeenProfileState: (updated: Partial<TeenProfile>) => void;
  updateCompanyProfileState: (updated: Partial<CompanyProfile>) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [teenProfile, setTeenProfile] = useState<TeenProfile | null>(null);
  const [companyProfile, setCompanyProfile] = useState<CompanyProfile | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Load from session on startup or default to teen demo
  useEffect(() => {
    try {
      const savedUser = localStorage.getItem('funngro_current_user');
      if (savedUser) {
        const parsed = JSON.parse(savedUser) as User;
        setUser(parsed);
        loadProfiles(parsed);
      } else {
        // Default login as Teen Demo for immediate demonstration
        const defaultTeen = INITIAL_USERS[0];
        setUser(defaultTeen);
        loadProfiles(defaultTeen);
        localStorage.setItem('funngro_current_user', JSON.stringify(defaultTeen));
      }
    } catch (e) {
      console.error('Failed to load user session', e);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const loadProfiles = (currentUser: User) => {
    if (currentUser.role === 'teen') {
      const profile = storageService.getTeenProfileByUserId(currentUser.id) || null;
      setTeenProfile(profile);
      setCompanyProfile(null);
    } else if (currentUser.role === 'company') {
      const profile = storageService.getCompanyProfileByUserId(currentUser.id) || null;
      setCompanyProfile(profile);
      setTeenProfile(null);
    } else {
      setTeenProfile(null);
      setCompanyProfile(null);
    }
  };

  const login = (email: string, roleHint?: UserRole): boolean => {
    const matched = INITIAL_USERS.find((u) => u.email.toLowerCase() === email.toLowerCase());
    if (matched) {
      setUser(matched);
      localStorage.setItem('funngro_current_user', JSON.stringify(matched));
      loadProfiles(matched);
      return true;
    }
    // Dynamic login creation
    const newUser: User = {
      id: `user-${Date.now()}`,
      email,
      role: roleHint || 'teen',
      fullName: email.split('@')[0],
      isVerified: true,
      createdAt: new Date().toISOString(),
    };
    setUser(newUser);
    localStorage.setItem('funngro_current_user', JSON.stringify(newUser));
    loadProfiles(newUser);
    return true;
  };

  const loginAsDemo = (role: UserRole) => {
    const demoUser = INITIAL_USERS.find((u) => u.role === role) || INITIAL_USERS[0];
    setUser(demoUser);
    localStorage.setItem('funngro_current_user', JSON.stringify(demoUser));
    loadProfiles(demoUser);
  };

  const logout = () => {
    setUser(null);
    setTeenProfile(null);
    setCompanyProfile(null);
    localStorage.removeItem('funngro_current_user');
  };

  const updateTeenProfileState = (updated: Partial<TeenProfile>) => {
    if (!teenProfile) return;
    const merged = { ...teenProfile, ...updated };
    setTeenProfile(merged);
    storageService.updateTeenProfile(merged);
  };

  const updateCompanyProfileState = (updated: Partial<CompanyProfile>) => {
    if (!companyProfile) return;
    const merged = { ...companyProfile, ...updated };
    setCompanyProfile(merged);
    storageService.updateCompanyProfile(merged);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        role: user?.role || null,
        teenProfile,
        companyProfile,
        isAuthenticated: !!user,
        isLoading,
        login,
        loginAsDemo,
        logout,
        updateTeenProfileState,
        updateCompanyProfileState,
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
