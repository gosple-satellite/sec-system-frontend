// ============================================================
// 404 Not Found Page
// ============================================================

import { Link } from 'react-router-dom';
import { Button } from '@components/ui';
import { ROUTES } from '@constants/index';

export function NotFoundPage() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 flex items-center justify-center p-4">
      <div className="text-center max-w-md">
        <p className="text-8xl font-black text-blue-600 mb-4">404</p>
        <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-2">
          Page not found
        </h1>
        <p className="text-slate-500 dark:text-slate-400 mb-8">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <Link to={ROUTES.AUTH.LOGIN}>
          <Button>Back to Home</Button>
        </Link>
      </div>
    </div>
  );
}
