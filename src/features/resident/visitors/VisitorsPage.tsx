// ============================================================
// Visitors Management - Resident Module
// ============================================================

import { Card, Table, Button, Badge } from '@components/ui';
import { Plus, Ticket, Copy } from 'lucide-react';
import { Link } from 'react-router-dom';
import { ROUTES } from '@constants/index';

const mockVisitors = [
  {
    id: '1',
    name: 'Michael Johnson',
    type: 'Family',
    date: '2026-06-20',
    passCode: 'RC-9831-ABCD',
    status: 'UNUSED',
  },
  {
    id: '2',
    name: 'Ikea Delivery',
    type: 'Service',
    date: '2026-06-21',
    passCode: 'RC-4451-XYZK',
    status: 'UNUSED',
  },
  {
    id: '3',
    name: 'Sarah Adams',
    type: 'Friend',
    date: '2026-06-15',
    passCode: 'RC-1122-PQRS',
    status: 'USED',
  },
];

export function VisitorsPage() {
  return (
    <div className="space-y-6 pb-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100">Visitor Passes</h1>
          <p className="text-slate-500 dark:text-slate-400 mt-1">
            Generate and manage access passes for your guests
          </p>
        </div>
        <Link to={ROUTES.RESIDENT.VISITORS_CREATE}>
          <Button leftIcon={<Plus className="w-4 h-4" />}>Generate Pass</Button>
        </Link>
      </div>

      <Card className="overflow-hidden border border-slate-200 dark:border-slate-700">
        <Table
          data={mockVisitors}
          columns={[
            {
              key: 'name',
              header: 'Visitor Name',
              render: (_, visitor: any) => (
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-emerald-50 dark:bg-emerald-900/20 text-emerald-500 rounded-lg shrink-0">
                    <Ticket className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="font-medium text-slate-900 dark:text-slate-100">
                      {String(visitor.name)}
                    </span>
                    <p className="text-xs text-slate-500">{String(visitor.type)}</p>
                  </div>
                </div>
              ),
            },
            { key: 'date', header: 'Expected Date' },
            {
              key: 'passCode',
              header: 'Passcode',
              render: (val: any) => (
                <div className="flex items-center gap-2">
                  <span className="font-mono font-medium text-slate-900 dark:text-slate-100">
                    {String(val)}
                  </span>
                  <button className="text-slate-400 hover:text-blue-500 transition-colors">
                    <Copy className="w-3.5 h-3.5" />
                  </button>
                </div>
              ),
            },
            {
              key: 'status',
              header: 'Status',
              render: (status: any) => (
                <Badge variant={status === 'UNUSED' ? 'success' : 'default'}>
                  {String(status)}
                </Badge>
              ),
            },
            {
              key: 'actions',
              header: '',
              render: (_: any, visitor: any) => (
                <div className="flex items-center justify-end gap-2">
                  {visitor.status === 'UNUSED' && (
                    <Button variant="outline" size="sm">
                      Share
                    </Button>
                  )}
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-red-500 hover:bg-red-50 hover:text-red-600"
                  >
                    Revoke
                  </Button>
                </div>
              ),
            },
          ]}
        />
      </Card>
    </div>
  );
}
