// ============================================================
// Login Page
// ============================================================

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Link, useNavigate } from 'react-router-dom';
import { loginSchema, type LoginFormData } from '@utils/validation';
import { useAuth } from '@hooks/useAuth';
import { Button, Input, Alert } from '@components/ui';
import { ROUTES } from '@constants/index';
import { useAuthStore } from '@store/authStore';
import { storageService } from '@services/storage';
import type { User, AuthTokens } from '@/types';

// ── Demo users (no backend required) ─────────────────────────
const DEMO_USERS: Record<string, { user: User; tokens: AuthTokens }> = {
  SUPER_ADMIN: {
    user: {
      id: 'demo-admin-001',
      firstName: 'Samuel',
      lastName: 'Adeyemi',
      email: 'admin@rccg.com',
      phone: '08012345678',
      role: 'SUPER_ADMIN',
      status: 'ACTIVE',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    tokens: {
      accessToken: 'demo-access-token',
      refreshToken: 'demo-refresh-token',
      expiresIn: 3600,
    },
  },
  RESIDENT: {
    user: {
      id: 'demo-resident-001',
      firstName: 'Grace',
      lastName: 'Okonkwo',
      email: 'resident@rccg.com',
      phone: '08023456789',
      role: 'RESIDENT',
      status: 'ACTIVE',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    tokens: {
      accessToken: 'demo-access-token',
      refreshToken: 'demo-refresh-token',
      expiresIn: 3600,
    },
  },
  VISITOR: {
    user: {
      id: 'demo-visitor-001',
      firstName: 'Emeka',
      lastName: 'Nwosu',
      email: 'visitor@rccg.com',
      phone: '08034567890',
      role: 'VISITOR',
      status: 'ACTIVE',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    tokens: {
      accessToken: 'demo-access-token',
      refreshToken: 'demo-refresh-token',
      expiresIn: 3600,
    },
  },
};

const DEMO_REDIRECT: Record<string, string> = {
  SUPER_ADMIN: ROUTES.ADMIN.DASHBOARD,
  RESIDENT: ROUTES.RESIDENT.DASHBOARD,
  VISITOR: ROUTES.VISITOR.STATUS,
};

export function LoginPage() {
  const navigate = useNavigate();
  const { login, isLoading, error } = useAuth();
  const { setUser, setTokens, setAuthenticated } = useAuthStore();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = (data: LoginFormData) => login(data);

  // Demo login — seeds the store without touching the backend
  const loginAsDemo = (role: keyof typeof DEMO_USERS) => {
    const { user, tokens } = DEMO_USERS[role];
    storageService.setUser(user);
    storageService.setTokens(tokens);
    setUser(user);
    setTokens(tokens);
    setAuthenticated(true);
    navigate(DEMO_REDIRECT[role]);
  };

  return (
    <div>
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-white mb-2">Welcome back</h2>
        <p className="text-blue-200">Sign in to your account to continue</p>
      </div>

      {/* ── Demo Mode Banner ─────────────────────────────────── */}
      <div className="mb-6 rounded-xl border border-amber-500/30 bg-amber-500/10 p-4">
        <p className="text-xs font-semibold text-amber-300 uppercase tracking-wider mb-3">
          🚧 Demo Mode — Quick Access
        </p>
        <div className="grid grid-cols-3 gap-2">
          <button
            onClick={() => loginAsDemo('SUPER_ADMIN')}
            className="flex flex-col items-center gap-1.5 rounded-lg bg-white/10 hover:bg-white/20 border border-white/10 hover:border-white/20 px-2 py-3 transition-all duration-150 group"
          >
            <span className="text-2xl">🛡️</span>
            <span className="text-xs font-medium text-white">Super Admin</span>
            <span className="text-[10px] text-blue-300/70">Full Access</span>
          </button>

          <button
            onClick={() => loginAsDemo('RESIDENT')}
            className="flex flex-col items-center gap-1.5 rounded-lg bg-white/10 hover:bg-white/20 border border-white/10 hover:border-white/20 px-2 py-3 transition-all duration-150 group"
          >
            <span className="text-2xl">🏠</span>
            <span className="text-xs font-medium text-white">Resident</span>
            <span className="text-[10px] text-blue-300/70">My Estate</span>
          </button>

          <button
            onClick={() => loginAsDemo('VISITOR')}
            className="flex flex-col items-center gap-1.5 rounded-lg bg-white/10 hover:bg-white/20 border border-white/10 hover:border-white/20 px-2 py-3 transition-all duration-150 group"
          >
            <span className="text-2xl">🎫</span>
            <span className="text-xs font-medium text-white">Visitor</span>
            <span className="text-[10px] text-blue-300/70">Check Status</span>
          </button>
        </div>
      </div>

      {/* ── Divider ──────────────────────────────────────────── */}
      <div className="flex items-center gap-3 mb-6">
        <div className="flex-1 h-px bg-white/10" />
        <span className="text-xs text-blue-300/50 font-medium">OR SIGN IN WITH ACCOUNT</span>
        <div className="flex-1 h-px bg-white/10" />
      </div>

      {error && (
        <Alert variant="error" className="mb-6">
          {error}
        </Alert>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
        <div className="[&_label]:text-blue-200 [&_input]:bg-white/10 [&_input]:border-white/20 [&_input]:text-white [&_input::placeholder]:text-blue-300/50">
          <Input
            label="Email Address"
            type="email"
            placeholder="you@example.com"
            autoComplete="email"
            error={errors.email?.message}
            {...register('email')}
          />
        </div>

        <div className="[&_label]:text-blue-200 [&_input]:bg-white/10 [&_input]:border-white/20 [&_input]:text-white [&_input::placeholder]:text-blue-300/50">
          <Input
            label="Password"
            type="password"
            placeholder="••••••••"
            autoComplete="current-password"
            error={errors.password?.message}
            {...register('password')}
          />
        </div>

        <div className="flex items-center justify-end">
          <Link
            to={ROUTES.AUTH.FORGOT_PASSWORD}
            className="text-sm text-blue-300 hover:text-white transition-colors"
          >
            Forgot password?
          </Link>
        </div>

        <Button type="submit" fullWidth isLoading={isLoading} size="lg">
          Sign In
        </Button>
      </form>

      <p className="mt-6 text-center text-sm text-blue-300/70">
        Need access? Contact your estate administrator.
      </p>
    </div>
  );
}
