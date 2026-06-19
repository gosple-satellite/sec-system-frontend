// ============================================================
// Theme Store (Zustand)
// ============================================================

import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { storageService } from '@services/storage';
import type { Theme } from '@/types';

interface ThemeStoreState {
  theme: Theme;
  resolvedTheme: 'light' | 'dark';
}

interface ThemeStoreActions {
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
  initializeTheme: () => void;
}

type ThemeStore = ThemeStoreState & ThemeStoreActions;

function resolveTheme(theme: Theme): 'light' | 'dark' {
  if (theme === 'system') {
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }
  return theme;
}

function applyTheme(resolved: 'light' | 'dark') {
  const root = document.documentElement;
  root.classList.remove('light', 'dark');
  root.classList.add(resolved);
}

export const useThemeStore = create<ThemeStore>()(
  devtools(
    (set) => ({
      theme: 'system',
      resolvedTheme: 'light',

      setTheme: (theme) => {
        const resolved = resolveTheme(theme);
        storageService.setTheme(theme);
        applyTheme(resolved);
        set({ theme, resolvedTheme: resolved }, false, 'theme/setTheme');
      },

      toggleTheme: () => {
        const { resolvedTheme } = useThemeStore.getState();
        const next = resolvedTheme === 'light' ? 'dark' : 'light';
        useThemeStore.getState().setTheme(next);
      },

      initializeTheme: () => {
        const stored = storageService.getTheme() as Theme | null;
        const theme: Theme = stored ?? 'system';
        const resolved = resolveTheme(theme);
        applyTheme(resolved);
        set({ theme, resolvedTheme: resolved }, false, 'theme/initializeTheme');

        // Watch system preference changes
        if (theme === 'system') {
          window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
            const systemResolved = e.matches ? 'dark' : 'light';
            applyTheme(systemResolved);
            set({ resolvedTheme: systemResolved }, false, 'theme/systemChange');
          });
        }
      },
    }),
    { name: 'ThemeStore' }
  )
);
