// ============================================================
// Access History - Resident Module
// ============================================================

import { Card, Table, Badge, Input } from '@components/ui';
import { Search, ArrowRight, ArrowLeft } from 'lucide-react';
import { useState } from 'react';

const mockLogs = [
  {
    id: '1',
    type: 'EXIT',
    method: 'VEHICLE',
    subject: 'Toyota Camry (ABJ-123-XY)',
    time: '2026-06-20 10:15 AM',
    gate: 'Main Gate',
  },
  {
    id: '2',
    type: 'ENTRY',
    method: 'VISITOR',
    subject: 'Michael Johnson (Pass: RC-9831)',
    time: '2026-06-20 09:30 AM',
    gate: 'North Wing',
  },
  {
    id: '3',
    type: 'ENTRY',
    method: 'SMART_CARD',
    subject: 'Grace Okonkwo (Card: **3412)',
    time: '2026-06-19 08:45 PM',
    gate: 'Main Gate',
  },
  {
    id: '4',
    type: 'EXIT',
    method: 'SMART_CARD',
    subject: 'Grace Okonkwo (Card: **3412)',
    time: '2026-06-19 07:10 AM',
    gate: 'Main Gate',
  },
  {
    id: '5',
    type: 'ENTRY',
    method: 'VISITOR',
    subject: 'Ikea Delivery (Pass: RC-4451)',
    time: '2026-06-18 02:00 PM',
    gate: 'Service Gate',
  },
];

export function AccessHistoryPage() {
  const [search, setSearch] = useState('');

  return (
    <div className="space-y-6 pb-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
            Access History logs
          </h1>
          <p className="text-slate-500 dark:text-slate-400 mt-1">
            Track all entries and exits connected to your apartment
          </p>
        </div>
      </div>

      <Card className="p-4">
        <Input
          placeholder="Search by name, vehicle, or pass code..."
          leftElement={<Search className="w-4 h-4" />}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          fullWidth
        />
      </Card>

      <Card className="overflow-hidden border border-slate-200 dark:border-slate-700">
        <Table
          data={mockLogs}
          columns={[
            {
              key: 'type',
              header: 'Event',
              render: (type: any) => (
                <div
                  className={`flex items-center gap-1.5 font-medium ${type === 'ENTRY' ? 'text-emerald-600' : 'text-blue-600'}`}
                >
                  {type === 'ENTRY' ? (
                    <ArrowRight className="w-4 h-4" />
                  ) : (
                    <ArrowLeft className="w-4 h-4" />
                  )}
                  {String(type)}
                </div>
              ),
            },
            {
              key: 'method',
              header: 'Access Method',
              render: (method: any) => (
                <Badge variant="default">{String(method).replace('_', ' ')}</Badge>
              ),
            },
            {
              key: 'subject',
              header: 'Subject Details',
              render: (val: any) => (
                <span className="font-medium text-slate-900 dark:text-slate-100">
                  {String(val)}
                </span>
              ),
            },
            { key: 'time', header: 'Timestamp' },
            { key: 'gate', header: 'Gate / Terminal' },
          ]}
        />
      </Card>
    </div>
  );
}
