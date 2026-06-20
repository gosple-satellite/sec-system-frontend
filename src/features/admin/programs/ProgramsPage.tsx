// ============================================================
// Programs - Admin Module
// ============================================================

import { Card, Table, Button, Badge } from '@components/ui';
import { CalendarPlus } from 'lucide-react';

const mockPrograms = [
  {
    id: '1',
    title: 'Holy Ghost Service',
    date: '2026-07-03',
    expectedGuests: '500,000+',
    status: 'UPCOMING',
  },
  {
    id: '2',
    title: 'Annual Convention',
    date: '2026-08-10',
    expectedGuests: '1,000,000+',
    status: 'PLANNING',
  },
  {
    id: '3',
    title: 'Special Ministers Conference',
    date: '2026-06-15',
    expectedGuests: '5,000',
    status: 'COMPLETED',
  },
];

export function ProgramsPage() {
  return (
    <div className="space-y-6 pb-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
            Programs & Events
          </h1>
          <p className="text-slate-500 dark:text-slate-400 mt-1">
            Manage mass-access protocols for upcoming events
          </p>
        </div>
        <Button leftIcon={<CalendarPlus className="w-4 h-4" />}>Schedule Program</Button>
      </div>

      <Card className="overflow-hidden border border-slate-200 dark:border-slate-700">
        <Table
          data={mockPrograms}
          columns={[
            {
              key: 'title',
              header: 'Program Title',
              render: (val: any) => (
                <span className="font-medium text-slate-900 dark:text-slate-100">
                  {String(val)}
                </span>
              ),
            },
            { key: 'date', header: 'Date' },
            { key: 'expectedGuests', header: 'Expected Traffic' },
            {
              key: 'status',
              header: 'Status',
              render: (status: any) => (
                <Badge
                  variant={
                    status === 'UPCOMING'
                      ? 'success'
                      : status === 'PLANNING'
                        ? 'warning'
                        : 'default'
                  }
                >
                  {String(status)}
                </Badge>
              ),
            },
            {
              key: 'actions',
              header: '',
              render: () => (
                <Button variant="outline" size="sm">
                  Manage Access Rules
                </Button>
              ),
            },
          ]}
        />
      </Card>
    </div>
  );
}
