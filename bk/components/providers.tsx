'use client';

import { MantineProvider, ColorSchemeScript } from '@mantine/core';
import { Notifications } from '@mantine/notifications';
import { theme } from '@/lib/theme';
import { useEffect, useState, createContext, useContext, ReactNode } from 'react';
import { initializeStorage, getCurrentUser, setCurrentUser } from '@/lib/store';
import type { User } from '@/lib/types';

interface AuthContextType {
  user: User | null;
  login: (userId: string) => void;
  logout: () => void;
  refreshUser: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    initializeStorage();
    const currentUser = getCurrentUser();
    setUser(currentUser);
    setMounted(true);
  }, []);

  const login = (userId: string) => {
    setCurrentUser(userId);
    const currentUser = getCurrentUser();
    setUser(currentUser);
  };

  const logout = () => {
    setCurrentUser(null);
    setUser(null);
  };

  const refreshUser = () => {
    const currentUser = getCurrentUser();
    setUser(currentUser);
  };

  if (!mounted) {
    return null;
  }

  return (
    <AuthContext.Provider value={{ user, login, logout, refreshUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export function Providers({ children }: { children: ReactNode }) {
  return (
    <>
      <ColorSchemeScript defaultColorScheme="auto" />
      <MantineProvider theme={theme} defaultColorScheme="auto">
        <Notifications position="top-right" />
        <AuthProvider>{children}</AuthProvider>
      </MantineProvider>
    </>
  );
}
