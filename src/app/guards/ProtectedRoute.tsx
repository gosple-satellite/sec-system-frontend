// ============================================================
// Protected Route Guard
// ============================================================

import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuthStore } from '@store/authStore';
import { PageLoader } from '@components/ui';
import { ROUTES } from '@constants/index';

interface ProtectedRouteProps {
  allowedRoles?: string[];
  redirectTo?: string;
}

export function ProtectedRoute({
  allowedRoles,
  redirectTo = ROUTES.AUTH.LOGIN,
}: ProtectedRouteProps) {
  const { isAuthenticated, isLoading, user } = useAuthStore();
  const location = useLocation();

  if (isLoading) {
    return <PageLoader />;
  }

  if (!isAuthenticated) {
    return <Navigate to={redirectTo} state={{ from: location }} replace />;
  }

  if (allowedRoles && user && !allowedRoles.includes(user.role)) {
    // Redirect to appropriate dashboard based on role
    if (user.role === 'SUPER_ADMIN') return <Navigate to={ROUTES.ADMIN.DASHBOARD} replace />;
    if (user.role === 'RESIDENT') return <Navigate to={ROUTES.RESIDENT.DASHBOARD} replace />;
    return <Navigate to={ROUTES.VISITOR.STATUS} replace />;
  }

  return <Outlet />;
}
