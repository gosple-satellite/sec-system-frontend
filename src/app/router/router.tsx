// ============================================================
// Application Router
// ============================================================

import { createBrowserRouter, Navigate } from 'react-router-dom';
import { ProtectedRoute, GuestRoute } from '@app/guards';
import { AuthLayout, PublicLayout, ResidentLayout, AdminLayout } from '@app/layouts';
import { USER_ROLES, ROUTES } from '@constants/index';

// Auth Pages
import { LoginPage } from '@features/auth/LoginPage';
import { ForgotPasswordPage } from '@features/auth/ForgotPasswordPage';

// Visitor Pages
import { VerifyPassPage } from '@features/visitor/verify-pass/VerifyPassPage';
import { VisitorStatusPage } from '@features/visitor/visitor-status/VisitorStatusPage';

// Resident Pages
import { ResidentDashboardPage } from '@features/resident/dashboard/ResidentDashboardPage';
import { VehiclesPage } from '@features/resident/vehicles/VehiclesPage';
import { CreateVehiclePage } from '@features/resident/vehicles/CreateVehiclePage';
import { VisitorsPage } from '@features/resident/visitors/VisitorsPage';
import { CreateVisitorPassPage } from '@features/resident/visitors/CreateVisitorPassPage';
import { AccessHistoryPage } from '@features/resident/access-history/AccessHistoryPage';
import { SmartCardPage } from '@features/resident/smart-card/SmartCardPage';

// Admin Pages
import { AdminDashboardPage } from '@features/admin/dashboard/AdminDashboardPage';
import { UsersPage } from '@features/admin/users/UsersPage';
import { EstatesPage } from '@features/admin/estates/EstatesPage';
import { ReportsPage } from '@features/admin/reports/ReportsPage';
import { ProgramsPage } from '@features/admin/programs/ProgramsPage';
import { SecurityPage } from '@features/admin/security/SecurityPage';

// 404
import { NotFoundPage } from './NotFoundPage';

export const router = createBrowserRouter([
  // ── Root Redirect ──────────────────────────────────────────
  {
    index: true,
    element: <Navigate to={ROUTES.AUTH.LOGIN} replace />,
  },

  // ── Auth Routes (Guest only) ───────────────────────────────
  {
    element: <GuestRoute />,
    children: [
      {
        element: <AuthLayout />,
        children: [
          { path: ROUTES.AUTH.LOGIN, element: <LoginPage /> },
          { path: ROUTES.AUTH.FORGOT_PASSWORD, element: <ForgotPasswordPage /> },
        ],
      },
    ],
  },

  // ── Public Visitor Routes (No auth required) ───────────────
  {
    element: <PublicLayout />,
    children: [
      { path: ROUTES.VISITOR.PASS, element: <VerifyPassPage /> },
      { path: ROUTES.VISITOR.STATUS, element: <VisitorStatusPage /> },
    ],
  },

  // ── Resident Routes ────────────────────────────────────────
  {
    element: <ProtectedRoute allowedRoles={[USER_ROLES.RESIDENT]} />,
    children: [
      {
        element: <ResidentLayout />,
        children: [
          { path: ROUTES.RESIDENT.DASHBOARD, element: <ResidentDashboardPage /> },
          { path: ROUTES.RESIDENT.VEHICLES, element: <VehiclesPage /> },
          { path: ROUTES.RESIDENT.VEHICLES_CREATE, element: <CreateVehiclePage /> },
          { path: ROUTES.RESIDENT.VISITORS, element: <VisitorsPage /> },
          { path: ROUTES.RESIDENT.VISITORS_CREATE, element: <CreateVisitorPassPage /> },
          { path: ROUTES.RESIDENT.ACCESS_HISTORY, element: <AccessHistoryPage /> },
          { path: ROUTES.RESIDENT.SMART_CARD, element: <SmartCardPage /> },
        ],
      },
    ],
  },

  // ── Admin Routes ───────────────────────────────────────────
  {
    element: <ProtectedRoute allowedRoles={[USER_ROLES.SUPER_ADMIN]} />,
    children: [
      {
        element: <AdminLayout />,
        children: [
          { path: ROUTES.ADMIN.DASHBOARD, element: <AdminDashboardPage /> },
          { path: ROUTES.ADMIN.USERS, element: <UsersPage /> },
          { path: ROUTES.ADMIN.ESTATES, element: <EstatesPage /> },
          { path: ROUTES.ADMIN.REPORTS, element: <ReportsPage /> },
          { path: ROUTES.ADMIN.PROGRAMS, element: <ProgramsPage /> },
          { path: ROUTES.ADMIN.SECURITY, element: <SecurityPage /> },
        ],
      },
    ],
  },

  // ── 404 Catch-all ──────────────────────────────────────────
  {
    path: '*',
    element: <NotFoundPage />,
  },
]);
