// ============================================================
// Alert Component
// ============================================================

import { cn } from '@utils/helpers';
import type { AlertVariant } from '@/types';

interface AlertProps {
  variant?: AlertVariant;
  title?: string;
  children: React.ReactNode;
  className?: string;
  onDismiss?: () => void;
}

const variantConfig: Record<AlertVariant, { container: string; icon: string; title: string }> = {
  info: {
    container: 'bg-blue-50 border-blue-200 dark:bg-blue-900/20 dark:border-blue-800',
    icon: 'ℹ️',
    title: 'text-blue-800 dark:text-blue-300',
  },
  success: {
    container: 'bg-emerald-50 border-emerald-200 dark:bg-emerald-900/20 dark:border-emerald-800',
    icon: '✅',
    title: 'text-emerald-800 dark:text-emerald-300',
  },
  warning: {
    container: 'bg-amber-50 border-amber-200 dark:bg-amber-900/20 dark:border-amber-800',
    icon: '⚠️',
    title: 'text-amber-800 dark:text-amber-300',
  },
  error: {
    container: 'bg-red-50 border-red-200 dark:bg-red-900/20 dark:border-red-800',
    icon: '❌',
    title: 'text-red-800 dark:text-red-300',
  },
};

export function Alert({ variant = 'info', title, children, className, onDismiss }: AlertProps) {
  const config = variantConfig[variant];

  return (
    <div
      role="alert"
      className={cn('flex gap-3 p-4 rounded-lg border', config.container, className)}
    >
      <span className="text-lg shrink-0 mt-0.5">{config.icon}</span>
      <div className="flex-1 min-w-0">
        {title && <p className={cn('font-semibold text-sm mb-1', config.title)}>{title}</p>}
        <div className="text-sm text-slate-600 dark:text-slate-400">{children}</div>
      </div>
      {onDismiss && (
        <button
          onClick={onDismiss}
          className="shrink-0 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors"
          aria-label="Dismiss alert"
        >
          ✕
        </button>
      )}
    </div>
  );
}
