// ============================================================
// Resident Layout - Sidebar + Header for Resident pages
// ============================================================

import { useState } from 'react';
import { Outlet, NavLink, useLocation } from 'react-router-dom';
import { cn } from '@utils/helpers';
import { ROUTES, APP_SHORT_NAME } from '@constants/index';
import { useAuth } from '@hooks/useAuth';
import { useThemeStore } from '@store/themeStore';
import { Breadcrumb } from '@components/common';
import type { BreadcrumbItem } from '@/types';

const navItems = [
  {
    label: 'Dashboard',
    href: ROUTES.RESIDENT.DASHBOARD,
    icon: '🏠',
  },
  {
    label: 'My Vehicles',
    href: ROUTES.RESIDENT.VEHICLES,
    icon: '🚗',
  },
  {
    label: 'Visitor Passes',
    href: ROUTES.RESIDENT.VISITORS,
    icon: '🎫',
  },
  {
    label: 'Access History',
    href: ROUTES.RESIDENT.ACCESS_HISTORY,
    icon: '📋',
  },
  {
    label: 'Smart Card',
    href: ROUTES.RESIDENT.SMART_CARD,
    icon: '🪪',
  },
];

function getBreadcrumbs(pathname: string): BreadcrumbItem[] {
  const base: BreadcrumbItem = { label: 'Home', href: ROUTES.RESIDENT.DASHBOARD };
  const map: Record<string, BreadcrumbItem[]> = {
    [ROUTES.RESIDENT.DASHBOARD]: [base],
    [ROUTES.RESIDENT.VEHICLES]: [base, { label: 'Vehicles' }],
    [ROUTES.RESIDENT.VEHICLES_CREATE]: [
      base,
      { label: 'Vehicles', href: ROUTES.RESIDENT.VEHICLES },
      { label: 'Add Vehicle' },
    ],
    [ROUTES.RESIDENT.VISITORS]: [base, { label: 'Visitor Passes' }],
    [ROUTES.RESIDENT.VISITORS_CREATE]: [
      base,
      { label: 'Visitor Passes', href: ROUTES.RESIDENT.VISITORS },
      { label: 'Create Pass' },
    ],
    [ROUTES.RESIDENT.ACCESS_HISTORY]: [base, { label: 'Access History' }],
    [ROUTES.RESIDENT.SMART_CARD]: [base, { label: 'Smart Card' }],
  };
  return map[pathname] ?? [base];
}

export function ResidentLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { user, logout } = useAuth();
  const { resolvedTheme, toggleTheme } = useThemeStore();
  const location = useLocation();
  const breadcrumbs = getBreadcrumbs(location.pathname);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 flex">
      {/* Sidebar Overlay (mobile) */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-20 bg-black/50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          'fixed top-0 left-0 z-30 h-full w-64 bg-white dark:bg-slate-800',
          'border-r border-slate-200 dark:border-slate-700 flex flex-col',
          'transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:z-auto',
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        {/* Logo */}
        <div className="px-6 py-5 border-b border-slate-200 dark:border-slate-700 flex items-center gap-3">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center shrink-0">
            <svg
              className="w-5 h-5 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z"
              />
            </svg>
          </div>
          <div className="min-w-0">
            <p className="font-bold text-slate-900 dark:text-white text-sm truncate">
              {APP_SHORT_NAME}
            </p>
            <p className="text-xs text-slate-500 dark:text-slate-400">Resident Portal</p>
          </div>
        </div>

        {/* Nav Items */}
        <nav className="flex-1 px-3 py-4 overflow-y-auto">
          <ul className="space-y-1">
            {navItems.map((item) => (
              <li key={item.href}>
                <NavLink
                  to={item.href}
                  className={({ isActive }) =>
                    cn(
                      'flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors',
                      isActive
                        ? 'bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400'
                        : 'text-slate-600 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-700'
                    )
                  }
                  onClick={() => setSidebarOpen(false)}
                >
                  <span className="text-lg w-5 text-center shrink-0">{item.icon}</span>
                  {item.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        {/* User Section */}
        <div className="px-3 py-4 border-t border-slate-200 dark:border-slate-700">
          <div className="flex items-center gap-3 px-3 py-2 rounded-lg">
            <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 font-bold text-sm shrink-0">
              {user?.firstName?.[0]}
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-sm font-medium text-slate-900 dark:text-slate-100 truncate">
                {user?.firstName} {user?.lastName}
              </p>
              <p className="text-xs text-slate-500 dark:text-slate-400">Resident</p>
            </div>
          </div>
          <button
            onClick={() => logout()}
            className="mt-2 w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
          >
            <span>🚪</span> Sign out
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Header */}
        <header className="bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 px-4 lg:px-6 py-4 flex items-center justify-between gap-4 sticky top-0 z-10">
          <div className="flex items-center gap-4">
            <button
              className="lg:hidden p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-400"
              onClick={() => setSidebarOpen(true)}
              aria-label="Open sidebar"
            >
              ☰
            </button>
            <Breadcrumb items={breadcrumbs} />
          </div>
          <button
            onClick={toggleTheme}
            className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-400 transition-colors"
            aria-label="Toggle theme"
          >
            {resolvedTheme === 'dark' ? '☀️' : '🌙'}
          </button>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-4 lg:p-6 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
