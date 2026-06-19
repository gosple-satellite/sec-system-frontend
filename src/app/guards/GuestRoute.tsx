// ============================================================
// Guest Route Guard - Redirects authenticated users away from auth pages
// ============================================================

import { Navigate, Outlet } from 'react-router-dom';
import { useAuthStore } from '@store/authStore';
import { PageLoader } from '@components/ui';
import { ROUTES, USER_ROLES } from '@constants/index';

export function GuestRoute() {
  const { isAuthenticated, isLoading, user } = useAuthStore();

  if (isLoading) {
    return <PageLoader />;
  }

  if (isAuthenticated && user) {
    // Redirect to role-appropriate dashboard
    if (user.role === USER_ROLES.SUPER_ADMIN)
      return <Navigate to={ROUTES.ADMIN.DASHBOARD} replace />;
    if (user.role === USER_ROLES.RESIDENT)
      return <Navigate to={ROUTES.RESIDENT.DASHBOARD} replace />;
    return <Navigate to={ROUTES.VISITOR.STATUS} replace />;
  }

  return <Outlet />;
}
