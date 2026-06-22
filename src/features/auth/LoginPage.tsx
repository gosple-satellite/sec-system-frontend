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

  return (
    <div>
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-white mb-2">Welcome back</h2>
        <p className="text-blue-200">Sign in to your account to continue</p>
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
