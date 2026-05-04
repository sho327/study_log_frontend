'use client';

import { MantineProvider, ColorSchemeScript } from '@mantine/core';
import { Notifications } from '@mantine/notifications';
import { theme } from '@/lib/theme';
import { useEffect, useState, createContext, useContext, ReactNode } from 'react';
import { useAppStore } from '@/stores';
import type { User } from '@/types';

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

  const store = useAppStore();

  useEffect(() => {
    store.initialize();
    const currentUser = store.getCurrentUser();
    setUser(currentUser);
    setMounted(true);
  }, [store]);

  const login = (userId: string) => {
    store.login(userId);
    const currentUser = store.getCurrentUser();
    setUser(currentUser);
  };

  const logout = () => {
    store.logout();
    setUser(null);
  };

  const refreshUser = () => {
    const currentUser = store.getCurrentUser();
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

export function MantineProviderWrapper({ children }: { children: ReactNode }) {
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
