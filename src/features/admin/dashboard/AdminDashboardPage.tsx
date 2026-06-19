// ============================================================
// Admin Dashboard - Admin Module
// TODO: Assigned to Developer 3
// ============================================================

import { Card, CardHeader } from '@components/ui';

export function AdminDashboardPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100">Admin Dashboard</h1>
        <p className="text-slate-500 dark:text-slate-400 mt-1">
          Admin module &mdash; implementation pending
        </p>
      </div>

      <Card>
        <CardHeader
          title="Admin Dashboard"
          subtitle="This page is under development. Assigned to Developer 3."
        />
        <div className="mt-6 flex items-center justify-center py-12 border-2 border-dashed border-slate-200 dark:border-slate-700 rounded-lg">
          <div className="text-center">
            <p className="text-4xl mb-3">🚧</p>
            <p className="text-slate-500 dark:text-slate-400 text-sm">
              Feature coming soon &mdash; Developer 3
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
}
