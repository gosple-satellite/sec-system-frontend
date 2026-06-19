// ============================================================
// Toast Notifications Container
// ============================================================

import { useNotificationStore } from '@store/notificationStore';
import { cn } from '@utils/helpers';

const typeClasses = {
  SUCCESS: 'bg-emerald-600',
  ERROR: 'bg-red-600',
  WARNING: 'bg-amber-500',
  INFO: 'bg-blue-600',
};

const typeIcons = {
  SUCCESS: '✓',
  ERROR: '✕',
  WARNING: '⚠',
  INFO: 'ℹ',
};

export function ToastContainer() {
  const { toasts, removeToast } = useNotificationStore();

  if (toasts.length === 0) return null;

  return (
    <div
      className="fixed top-4 right-4 z-[9999] flex flex-col gap-2 max-w-sm w-full"
      role="region"
      aria-label="Notifications"
      aria-live="polite"
    >
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={cn(
            'flex items-start gap-3 p-4 rounded-xl shadow-lg text-white',
            'animate-in slide-in-from-right-full duration-300',
            typeClasses[toast.type]
          )}
          role="alert"
        >
          <span className="shrink-0 w-5 h-5 rounded-full bg-white/20 flex items-center justify-center text-xs font-bold">
            {typeIcons[toast.type]}
          </span>
          <div className="flex-1 min-w-0">
            <p className="font-semibold text-sm">{toast.title}</p>
            {toast.message && <p className="text-sm text-white/80 mt-0.5">{toast.message}</p>}
          </div>
          <button
            onClick={() => removeToast(toast.id)}
            className="shrink-0 text-white/70 hover:text-white transition-colors"
            aria-label="Dismiss notification"
          >
            ✕
          </button>
        </div>
      ))}
    </div>
  );
}
