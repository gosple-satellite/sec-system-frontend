// ============================================================
// Loader Component
// ============================================================

import { cn } from '@utils/helpers';

interface LoaderProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  label?: string;
}

const sizeClasses = {
  sm: 'w-4 h-4 border-2',
  md: 'w-8 h-8 border-2',
  lg: 'w-12 h-12 border-[3px]',
};

export function Loader({ size = 'md', className, label }: LoaderProps) {
  return (
    <div
      className="flex flex-col items-center justify-center gap-3"
      role="status"
      aria-label={label ?? 'Loading...'}
    >
      <div
        className={cn(
          'rounded-full border-current border-t-transparent animate-spin',
          sizeClasses[size],
          className
        )}
      />
      {label && <p className="text-sm text-slate-500 dark:text-slate-400">{label}</p>}
    </div>
  );
}

export function PageLoader() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-900">
      <div className="flex flex-col items-center gap-4">
        <div className="w-16 h-16 rounded-full border-4 border-blue-600/20 border-t-blue-600 animate-spin" />
        <p className="text-slate-600 dark:text-slate-400 font-medium">Loading...</p>
      </div>
    </div>
  );
}
