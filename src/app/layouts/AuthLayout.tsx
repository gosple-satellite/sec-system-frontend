// ============================================================
// Auth Layout - For Login, Forgot Password pages
// ============================================================

import { Outlet } from 'react-router-dom';
import { APP_NAME } from '@constants/index';

export function AuthLayout() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 flex">
      {/* Left Panel - Branding */}
      <div className="hidden lg:flex lg:w-1/2 flex-col items-center justify-center p-12 relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-20 w-72 h-72 bg-blue-500 rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-indigo-500 rounded-full blur-3xl" />
        </div>

        <div className="relative z-10 text-center">
          {/* Logo Placeholder */}
          <div className="w-24 h-24 bg-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-8 shadow-2xl shadow-blue-600/30">
            <svg
              className="w-12 h-12 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z"
              />
            </svg>
          </div>

          <h1 className="text-3xl font-bold text-white mb-3">{APP_NAME}</h1>
          <p className="text-blue-200 text-lg mb-8 max-w-sm">
            Secure, intelligent estate management for the RCCG community.
          </p>

          <div className="grid grid-cols-2 gap-4 max-w-xs mx-auto text-left">
            {[
              { icon: '🏠', label: 'Resident Management' },
              { icon: '🚗', label: 'Vehicle Control' },
              { icon: '🪪', label: 'Smart Card Access' },
              { icon: '📊', label: 'Real-time Reports' },
            ].map(({ icon, label }) => (
              <div key={label} className="flex items-center gap-2 text-blue-200">
                <span className="text-xl">{icon}</span>
                <span className="text-sm">{label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right Panel - Form */}
      <div className="flex-1 flex items-center justify-center p-6 lg:p-12">
        <div className="w-full max-w-md">
          {/* Mobile Logo */}
          <div className="flex items-center gap-3 mb-8 lg:hidden">
            <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center">
              <svg
                className="w-6 h-6 text-white"
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
            <span className="font-bold text-white text-lg">RCCG SMS</span>
          </div>

          <Outlet />

          <p className="mt-8 text-center text-xs text-blue-300/60">
            © {new Date().getFullYear()} RCCG Security Management System. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
}
