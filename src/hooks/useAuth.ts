// ============================================================
// useAuth Hook - Authentication state and actions
// ============================================================

import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '@store/authStore';
import { authService } from '@services/auth';
import { useNotificationStore } from '@store/notificationStore';
import { ROUTES, USER_ROLES } from '@constants/index';
import type { LoginCredentials } from '@/types';
import { storageService } from '@services/storage';

export function useAuth() {
  const navigate = useNavigate();
  const {
    user,
    isAuthenticated,
    isLoading,
    error,
    setUser,
    setTokens,
    setAuthenticated,
    setLoading,
    setError,
    logout: storeLogout,
  } = useAuthStore();
  const { success, error: notifyError } = useNotificationStore();

  const login = useCallback(
    async (credentials: LoginCredentials) => {
      setLoading(true);
      setError(null);
      try {
        const response = await authService.login(credentials);
        const { user: userData, tokens } = response.data;

        setUser(userData);
        setTokens(tokens);
        setAuthenticated(true);
        storageService.setUser(userData);

        success('Welcome back!', `Hello, ${userData.firstName}`);

        // Role-based redirect
        if (userData.role === USER_ROLES.SUPER_ADMIN) {
          navigate(ROUTES.ADMIN.DASHBOARD);
        } else if (userData.role === USER_ROLES.RESIDENT) {
          navigate(ROUTES.RESIDENT.DASHBOARD);
        } else {
          navigate(ROUTES.VISITOR.STATUS);
        }
      } catch (err) {
        const message = (err as { message?: string })?.message || 'Login failed. Please try again.';
        setError(message);
        notifyError('Login Failed', message);
      } finally {
        setLoading(false);
      }
    },
    [navigate, setUser, setTokens, setAuthenticated, setLoading, setError, success, notifyError]
  );

  const logout = useCallback(async () => {
    try {
      await authService.logout();
    } catch {
      // Fail silently - still clear local state
    } finally {
      storeLogout();
      navigate(ROUTES.AUTH.LOGIN);
    }
  }, [navigate, storeLogout]);

  const hasRole = useCallback(
    (role: string | string[]) => {
      if (!user) return false;
      if (Array.isArray(role)) return role.includes(user.role);
      return user.role === role;
    },
    [user]
  );

  const isAdmin = user?.role === USER_ROLES.SUPER_ADMIN;
  const isResident = user?.role === USER_ROLES.RESIDENT;
  const isVisitor = user?.role === USER_ROLES.VISITOR;

  return {
    user,
    isAuthenticated,
    isLoading,
    error,
    login,
    logout,
    hasRole,
    isAdmin,
    isResident,
    isVisitor,
  };
}
