// ============================================================
// Application Providers
// ============================================================

import { RouterProvider } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { useEffect } from 'react';
import { router } from '@app/router';
import { useAuthStore } from '@store/authStore';
import { useThemeStore } from '@store/themeStore';
import { ToastContainer } from '@components/common';
import { envConfig } from '@config/index';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      retry: (failureCount, error) => {
        const apiError = error as { statusCode?: number };
        // Don't retry on 4xx errors
        if (apiError?.statusCode && apiError.statusCode >= 400 && apiError.statusCode < 500) {
          return false;
        }
        return failureCount < 2;
      },
      refetchOnWindowFocus: false,
    },
    mutations: {
      retry: false,
    },
  },
});

function AppInitializer({ children }: { children: React.ReactNode }) {
  const { initializeAuth } = useAuthStore();
  const { initializeTheme } = useThemeStore();

  useEffect(() => {
    initializeTheme();
    initializeAuth();
  }, [initializeAuth, initializeTheme]);

  return <>{children}</>;
}

export function AppProviders() {
  return (
    <QueryClientProvider client={queryClient}>
      <AppInitializer>
        <RouterProvider router={router} />
        <ToastContainer />
      </AppInitializer>
      {envConfig.isDevelopment && <ReactQueryDevtools initialIsOpen={false} />}
    </QueryClientProvider>
  );
}
