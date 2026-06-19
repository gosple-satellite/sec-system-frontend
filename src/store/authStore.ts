// ============================================================
// Auth Store (Zustand)
// ============================================================

import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import type { User, AuthTokens } from '@/types';
import { storageService } from '@services/storage';

interface AuthStoreState {
  user: User | null;
  tokens: AuthTokens | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

interface AuthStoreActions {
  setUser: (user: User) => void;
  setTokens: (tokens: AuthTokens) => void;
  setAuthenticated: (isAuthenticated: boolean) => void;
  setLoading: (isLoading: boolean) => void;
  setError: (error: string | null) => void;
  logout: () => void;
  initializeAuth: () => void;
}

type AuthStore = AuthStoreState & AuthStoreActions;

export const useAuthStore = create<AuthStore>()(
  devtools(
    (set) => ({
      // Initial State
      user: null,
      tokens: null,
      isAuthenticated: false,
      isLoading: true,
      error: null,

      // Actions
      setUser: (user) => set({ user }, false, 'auth/setUser'),

      setTokens: (tokens) => {
        storageService.setTokens(tokens);
        set({ tokens }, false, 'auth/setTokens');
      },

      setAuthenticated: (isAuthenticated) =>
        set({ isAuthenticated }, false, 'auth/setAuthenticated'),

      setLoading: (isLoading) => set({ isLoading }, false, 'auth/setLoading'),

      setError: (error) => set({ error }, false, 'auth/setError'),

      logout: () => {
        storageService.clearAll();
        set(
          { user: null, tokens: null, isAuthenticated: false, error: null },
          false,
          'auth/logout'
        );
      },

      initializeAuth: () => {
        const user = storageService.getUser();
        const accessToken = storageService.getAccessToken();
        const refreshToken = storageService.getRefreshToken();

        if (user && accessToken && refreshToken) {
          set(
            {
              user,
              tokens: { accessToken, refreshToken, expiresIn: 0 },
              isAuthenticated: true,
              isLoading: false,
            },
            false,
            'auth/initializeAuth'
          );
        } else {
          set({ isLoading: false }, false, 'auth/initializeAuth');
        }
      },
    }),
    { name: 'AuthStore' }
  )
);
