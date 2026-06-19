// ============================================================
// Admin Layout - Sidebar + Header for Admin/Super Admin pages
// ============================================================

import { useState } from 'react';
import { Outlet, NavLink, useLocation } from 'react-router-dom';
import { cn } from '@utils/helpers';
import { ROUTES, APP_SHORT_NAME } from '@constants/index';
import { useAuth } from '@hooks/useAuth';
import { useThemeStore } from '@store/themeStore';
import { useNotificationStore } from '@store/notificationStore';
import { Breadcrumb } from '@components/common';
import type { BreadcrumbItem } from '@/types';

const navItems = [
  { label: 'Dashboard', href: ROUTES.ADMIN.DASHBOARD, icon: '📊' },
  { label: 'Users', href: ROUTES.ADMIN.USERS, icon: '👥' },
  { label: 'Estates', href: ROUTES.ADMIN.ESTATES, icon: '🏘️' },
  { label: 'Reports', href: ROUTES.ADMIN.REPORTS, icon: '📈' },
  { label: 'Programs', href: ROUTES.ADMIN.PROGRAMS, icon: '📅' },
  { label: 'Security', href: ROUTES.ADMIN.SECURITY, icon: '🛡️' },
];

function getBreadcrumbs(pathname: string): BreadcrumbItem[] {
  const base: BreadcrumbItem = { label: 'Admin', href: ROUTES.ADMIN.DASHBOARD };
  const map: Record<string, BreadcrumbItem[]> = {
    [ROUTES.ADMIN.DASHBOARD]: [base],
    [ROUTES.ADMIN.USERS]: [base, { label: 'Users' }],
    [ROUTES.ADMIN.ESTATES]: [base, { label: 'Estates' }],
    [ROUTES.ADMIN.REPORTS]: [base, { label: 'Reports' }],
    [ROUTES.ADMIN.PROGRAMS]: [base, { label: 'Programs' }],
    [ROUTES.ADMIN.SECURITY]: [base, { label: 'Security' }],
  };
  return map[pathname] ?? [base];
}

export function AdminLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { user, logout } = useAuth();
  const { resolvedTheme, toggleTheme } = useThemeStore();
  const { unreadCount } = useNotificationStore();
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
          'fixed top-0 left-0 z-30 h-full w-64 bg-slate-900 dark:bg-slate-950',
          'flex flex-col transition-transform duration-300 ease-in-out',
          'lg:translate-x-0 lg:static lg:z-auto',
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        {/* Logo */}
        <div className="px-6 py-5 border-b border-white/10 flex items-center gap-3">
          <div className="w-9 h-9 bg-blue-600 rounded-lg flex items-center justify-center shrink-0">
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
            <p className="font-bold text-white text-sm">{APP_SHORT_NAME}</p>
            <p className="text-xs text-slate-400">Admin Console</p>
          </div>
        </div>

        {/* Nav */}
        <nav className="flex-1 px-3 py-4 overflow-y-auto">
          <p className="px-3 mb-2 text-xs font-semibold text-slate-500 uppercase tracking-wider">
            Management
          </p>
          <ul className="space-y-1">
            {navItems.map((item) => (
              <li key={item.href}>
                <NavLink
                  to={item.href}
                  className={({ isActive }) =>
                    cn(
                      'flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors',
                      isActive
                        ? 'bg-blue-600 text-white'
                        : 'text-slate-400 hover:bg-white/5 hover:text-white'
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
        <div className="px-3 py-4 border-t border-white/10">
          <div className="flex items-center gap-3 px-3 py-2">
            <div className="w-8 h-8 rounded-full bg-blue-600/20 border border-blue-500/30 flex items-center justify-center text-blue-400 font-bold text-sm shrink-0">
              {user?.firstName?.[0]}
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-sm font-medium text-white truncate">
                {user?.firstName} {user?.lastName}
              </p>
              <p className="text-xs text-slate-400">Super Admin</p>
            </div>
          </div>
          <button
            onClick={() => logout()}
            className="mt-2 w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-red-400 hover:bg-red-900/20 transition-colors"
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
          <div className="flex items-center gap-2">
            {/* Notifications */}
            <button
              className="relative p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-400 transition-colors"
              aria-label={`Notifications${unreadCount > 0 ? ` (${unreadCount} unread)` : ''}`}
            >
              🔔
              {unreadCount > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 bg-red-500 rounded-full text-[10px] text-white flex items-center justify-center font-bold">
                  {unreadCount > 9 ? '9+' : unreadCount}
                </span>
              )}
            </button>
            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-400 transition-colors"
              aria-label="Toggle theme"
            >
              {resolvedTheme === 'dark' ? '☀️' : '🌙'}
            </button>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-4 lg:p-6 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
