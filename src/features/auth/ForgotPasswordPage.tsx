// ============================================================
// Forgot Password Page
// ============================================================

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Link } from 'react-router-dom';
import { forgotPasswordSchema, type ForgotPasswordFormData } from '@utils/validation';
import { authService } from '@services/auth';
import { Button, Input, Alert } from '@components/ui';
import { ROUTES } from '@constants/index';

export function ForgotPasswordPage() {
  const [submitted, setSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordFormData>({
    resolver: zodResolver(forgotPasswordSchema),
  });

  const onSubmit = async (data: ForgotPasswordFormData) => {
    setIsLoading(true);
    setError(null);
    try {
      await authService.forgotPassword(data);
      setSubmitted(true);
    } catch (err) {
      setError((err as { message?: string })?.message || 'Failed to send reset email.');
    } finally {
      setIsLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="text-center">
        <div className="w-16 h-16 bg-emerald-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
          <span className="text-3xl">✉️</span>
        </div>
        <h2 className="text-2xl font-bold text-white mb-2">Check your email</h2>
        <p className="text-blue-200 mb-6">
          We've sent password reset instructions to your email address.
        </p>
        <Link to={ROUTES.AUTH.LOGIN}>
          <Button variant="outline" fullWidth>
            Back to Sign In
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-white mb-2">Reset your password</h2>
        <p className="text-blue-200">Enter your email and we'll send you a reset link.</p>
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

        <Button type="submit" fullWidth isLoading={isLoading} size="lg">
          Send Reset Link
        </Button>
      </form>

      <div className="mt-6 text-center">
        <Link
          to={ROUTES.AUTH.LOGIN}
          className="text-sm text-blue-300 hover:text-white transition-colors"
        >
          ← Back to Sign In
        </Link>
      </div>
    </div>
  );
}
