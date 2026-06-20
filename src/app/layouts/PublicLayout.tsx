// ============================================================
// Public Layout - Fixed sidebar + scrollable main for Visitor pages
// ============================================================

import { useState } from 'react';
import { Outlet, NavLink, useLocation, Link, useNavigate } from 'react-router-dom';
import { cn } from '@utils/helpers';
import { ROUTES, APP_SHORT_NAME, USER_ROLES } from '@constants/index';
import { useThemeStore } from '@store/themeStore';
import { useAuthStore } from '@store/authStore';
import { Breadcrumb } from '@components/common';
import type { BreadcrumbItem } from '@/types';

// ─── Nav items ────────────────────────────────────────────
const navItems = [
  { label: 'Overview', href: ROUTES.VISITOR.DASHBOARD, icon: '🏠', end: true },
  { label: 'Verify / Get Pass', href: ROUTES.VISITOR.PASS, icon: '🔍', end: false },
  { label: 'Track Status', href: ROUTES.VISITOR.STATUS, icon: '📍', end: false },
];

// ─── Breadcrumbs ──────────────────────────────────────────
function getBreadcrumbs(pathname: string): BreadcrumbItem[] {
  const base: BreadcrumbItem = { label: 'Visitor Portal', href: ROUTES.VISITOR.DASHBOARD };
  const map: Record<string, BreadcrumbItem[]> = {
    [ROUTES.VISITOR.DASHBOARD]: [base],
    [ROUTES.VISITOR.PASS]: [base, { label: 'Gate Pass' }],
    [ROUTES.VISITOR.STATUS]: [base, { label: 'Track Status' }],
  };
  return map[pathname] ?? [base];
}

// ─── Sidebar ──────────────────────────────────────────────
function Sidebar({ onNavClick }: { onNavClick: () => void }) {
  const { isAuthenticated, user, logout } = useAuthStore();
  const navigate = useNavigate();

  const dashboardRoute =
    user?.role === USER_ROLES.SUPER_ADMIN
      ? ROUTES.ADMIN.DASHBOARD
      : user?.role === USER_ROLES.RESIDENT
        ? ROUTES.RESIDENT.DASHBOARD
        : null;

  return (
    // Sidebar is a full-height flex column — logo shrinks, nav scrolls, footer shrinks
    <div className="flex flex-col h-full overflow-hidden">
      {/* ── Logo ─────────────────────────────────────── */}
      <div className="px-5 py-5 border-b border-slate-200 dark:border-slate-700 flex items-center gap-3 shrink-0">
        <Link
          to={ROUTES.VISITOR.DASHBOARD}
          className="flex items-center gap-3 min-w-0"
          onClick={onNavClick}
        >
          <div className="w-9 h-9 bg-blue-600 rounded-xl flex items-center justify-center shrink-0 shadow-md">
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
            <p className="text-xs text-slate-500 dark:text-slate-400">Visitor Portal</p>
          </div>
        </Link>
      </div>

      {/* ── Scrollable nav area ─────────────────────── */}
      <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-5 min-h-0">
        {/* Back to dashboard — authenticated users only */}
        {isAuthenticated && dashboardRoute && (
          <div>
            <Link
              to={dashboardRoute}
              onClick={onNavClick}
              className="flex items-center gap-2.5 w-full px-3 py-2.5 rounded-lg text-sm font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700/50 transition-colors border border-slate-200 dark:border-slate-700"
            >
              <svg
                className="w-4 h-4 shrink-0"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 19l-7-7m0 0l7-7m-7 7h18"
                />
              </svg>
              Back to Your Dashboard
            </Link>
          </div>
        )}

        {/* Main nav links */}
        <div>
          <p className="px-3 mb-2 text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
            Navigation
          </p>
          <ul className="space-y-0.5">
            {navItems.map((item) => (
              <li key={item.href}>
                <NavLink
                  to={item.href}
                  end={item.end}
                  className={({ isActive }) =>
                    cn(
                      'flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-150',
                      isActive
                        ? 'bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400 shadow-sm'
                        : 'text-slate-600 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-700/50'
                    )
                  }
                  onClick={onNavClick}
                >
                  <span className="text-lg w-5 text-center shrink-0">{item.icon}</span>
                  {item.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>

        {/* Estate quick info */}
        <div>
          <p className="px-3 mb-2 text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
            Estate Info
          </p>
          <div className="mx-1 rounded-xl border border-slate-200 dark:border-slate-700 overflow-hidden divide-y divide-slate-100 dark:divide-slate-700/50">
            {[
              { icon: '🕐', label: 'Gate Hours', value: '24 / 7' },
              { icon: '🏙️', label: 'Estate', value: 'Redemption City' },
              { icon: '📍', label: 'Location', value: 'Mowe, Ogun State' },
            ].map((info) => (
              <div key={info.label} className="flex items-center gap-3 px-3 py-2.5">
                <span className="text-base shrink-0">{info.icon}</span>
                <div className="min-w-0">
                  <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">
                    {info.label}
                  </p>
                  <p className="text-xs font-medium text-slate-700 dark:text-slate-300 truncate">
                    {info.value}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Help notice */}
        <div className="mx-1 rounded-xl bg-blue-50 dark:bg-blue-950/30 border border-blue-100 dark:border-blue-900/40 p-3">
          <p className="text-xs font-semibold text-blue-700 dark:text-blue-400 mb-1">Need Help?</p>
          <p className="text-xs text-blue-600 dark:text-blue-500 leading-relaxed">
            Security line: <span className="font-mono font-semibold">+234 801 SEC RCCG</span>
          </p>
        </div>
      </nav>

      {/* ── Footer — always visible ──────────────────── */}
      <div className="px-3 py-3 border-t border-slate-200 dark:border-slate-700 shrink-0 space-y-2">
        {/* Authenticated user info */}
        {isAuthenticated && user && (
          <div className="flex items-center gap-2.5 px-2 py-1.5 rounded-lg bg-slate-50 dark:bg-slate-700/30">
            <div className="w-7 h-7 rounded-full bg-blue-100 dark:bg-blue-900/40 flex items-center justify-center text-blue-600 text-xs font-bold shrink-0">
              {user.firstName?.[0] ?? '?'}
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-xs font-semibold text-slate-700 dark:text-slate-300 truncate">
                {user.firstName} {user.lastName}
              </p>
              <p className="text-[10px] text-slate-400 capitalize">{user.role?.toLowerCase()}</p>
            </div>
          </div>
        )}

        {/* Exit/Login link — ALWAYS shown to all users */}
        {isAuthenticated ? (
          <button
            onClick={() => {
              onNavClick();
              logout();
              navigate(ROUTES.AUTH.LOGIN);
            }}
            className="flex items-center gap-2.5 w-full px-3 py-2.5 rounded-lg text-sm font-medium text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/20 transition-colors text-left"
          >
            <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9"
              />
            </svg>
            Sign Out / Exit
          </button>
        ) : (
          <Link
            to={ROUTES.AUTH.LOGIN}
            onClick={onNavClick}
            className="flex items-center gap-2.5 w-full px-3 py-2.5 rounded-lg text-sm font-medium text-slate-500 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-950/30 transition-colors"
          >
            <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9"
              />
            </svg>
            Staff / Resident Login
          </Link>
        )}
      </div>
    </div>
  );
}

// ─── Main Layout ──────────────────────────────────────────
export function PublicLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { resolvedTheme, toggleTheme } = useThemeStore();
  const { isAuthenticated, logout } = useAuthStore();
  const navigate = useNavigate();
  const location = useLocation();
  const breadcrumbs = getBreadcrumbs(location.pathname);

  const closeSidebar = () => setSidebarOpen(false);

  return (
    /*
     * h-screen + overflow-hidden on the root wrapper is the key to the
     * sidebar being fully independent:
     *   - The viewport height is locked to the screen
     *   - Only the <main> element scrolls (overflow-y-auto)
     *   - The sidebar is always visible, never scrolls with the page
     */
    <div className="h-screen overflow-hidden flex bg-slate-50 dark:bg-slate-900">
      {/* ── Mobile overlay backdrop ──────────────────── */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-20 bg-black/50 backdrop-blur-sm lg:hidden"
          onClick={closeSidebar}
          aria-hidden="true"
        />
      )}

      {/* ── Sidebar ─────────────────────────────────── */}
      {/*
       * Mobile:  fixed overlay that slides in/out (z-30)
       * Desktop: static flex column — part of the page flow (lg:relative)
       * Height:  always h-full (inherits from h-screen root)
       */}
      <aside
        className={cn(
          'fixed top-0 left-0 z-30 h-full w-64',
          'bg-white dark:bg-slate-800',
          'border-r border-slate-200 dark:border-slate-700',
          'transition-transform duration-300 ease-in-out',
          sidebarOpen ? 'translate-x-0' : '-translate-x-full',
          'lg:relative lg:translate-x-0 lg:z-auto lg:shrink-0'
        )}
      >
        <Sidebar onNavClick={closeSidebar} />
      </aside>

      {/* ── Main content column ──────────────────────── */}
      {/* flex-1 takes remaining width; overflow-hidden prevents horizontal overflow */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Sticky top header — never scrolls */}
        <header className="bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 px-4 lg:px-6 py-3.5 flex items-center justify-between gap-4 shrink-0 z-10">
          <div className="flex items-center gap-3">
            {/* Hamburger (mobile only) */}
            <button
              className="lg:hidden p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-400 transition-colors"
              onClick={() => setSidebarOpen(true)}
              aria-label="Open sidebar"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
            <Breadcrumb items={breadcrumbs} />
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-400 transition-colors"
              aria-label="Toggle theme"
            >
              {resolvedTheme === 'dark' ? '☀️' : '🌙'}
            </button>

            {/* Get Pass CTA — desktop only */}
            <Link
              to={ROUTES.VISITOR.PASS}
              className="hidden sm:flex items-center gap-2 bg-blue-600 hover:bg-blue-700 active:scale-95 text-white text-sm font-semibold px-4 py-2 rounded-lg transition-all shadow-sm"
            >
              <span>🎫</span>
              Get Entry Pass
            </Link>

            {/* Sign Out CTA — always visible in header if logged in */}
            {isAuthenticated && (
              <button
                onClick={() => {
                  logout();
                  navigate(ROUTES.AUTH.LOGIN);
                }}
                className="flex items-center gap-2 bg-red-50 hover:bg-red-100 dark:bg-red-950/30 dark:hover:bg-red-900/40 text-red-600 dark:text-red-400 text-sm font-semibold px-4 py-2 rounded-lg transition-all active:scale-95 shadow-sm border border-red-100 dark:border-red-900/30"
              >
                <span>🚪</span>
                <span>Sign Out</span>
              </button>
            )}
          </div>
        </header>

        {/*
         * flex-1 + overflow-y-auto = this is the ONLY scrolling region.
         * The sidebar and header stay fixed on screen.
         */}
        <main className="flex-1 overflow-y-auto p-4 lg:p-8">
          <div className="max-w-5xl mx-auto">
            <Outlet />
          </div>
        </main>

        {/* Footer — never scrolls, always at bottom */}
        <footer className="shrink-0 border-t border-slate-200 dark:border-slate-700 py-3 px-6 text-center text-xs text-slate-400">
          © {new Date().getFullYear()} RCCG Security Management System · Visitor Portal
        </footer>
      </div>
    </div>
  );
}
