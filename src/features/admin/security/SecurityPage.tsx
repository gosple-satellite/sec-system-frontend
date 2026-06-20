// ============================================================
// Security Management - Admin Module
// ============================================================

import { Card, Button, Badge, Table } from '@components/ui';
import { ShieldAlert, Key, Server, Lock } from 'lucide-react';

export function SecurityPage() {
  return (
    <div className="space-y-6 pb-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
            Security & Access Control
          </h1>
          <p className="text-slate-500 dark:text-slate-400 mt-1">
            Configure system-wide security policies and device integrations
          </p>
        </div>
      </div>

      {/* Stats/Status Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          {
            label: 'System Status',
            value: 'SECURE',
            icon: ShieldAlert,
            color: 'text-emerald-500',
            bg: 'bg-emerald-100 dark:bg-emerald-900/30',
          },
          {
            label: 'Active Gates',
            value: '4 / 4',
            icon: Server,
            color: 'text-blue-500',
            bg: 'bg-blue-100 dark:bg-blue-900/30',
          },
          {
            label: 'Failed Logins (24h)',
            value: '12',
            icon: Lock,
            color: 'text-amber-500',
            bg: 'bg-amber-100 dark:bg-amber-900/30',
          },
          {
            label: 'Revoked Cards',
            value: '8',
            icon: Key,
            color: 'text-red-500',
            bg: 'bg-red-100 dark:bg-red-900/30',
          },
        ].map((stat, i) => (
          <Card key={i} className="p-5 flex items-center gap-4">
            <div className={`p-3 rounded-lg ${stat.bg}`}>
              <stat.icon className={`w-6 h-6 ${stat.color}`} />
            </div>
            <div>
              <p className="text-sm font-medium text-slate-500 dark:text-slate-400">{stat.label}</p>
              <p className="text-xl font-bold text-slate-900 dark:text-slate-100">{stat.value}</p>
            </div>
          </Card>
        ))}
      </div>

      {/* Gate Terminals */}
      <Card className="mt-6">
        <div className="p-5 border-b border-slate-200 dark:border-slate-700 flex justify-between items-center">
          <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
            Connected Gate Terminals
          </h2>
          <Button variant="outline" size="sm" leftIcon={<Plus className="w-4 h-4" />}>
            Register Terminal
          </Button>
        </div>
        <Table
          data={[
            {
              id: 'TERM-001',
              location: 'Main Gate (Entry)',
              ip: '192.168.1.101',
              status: 'ONLINE',
              lastPing: 'Just now',
            },
            {
              id: 'TERM-002',
              location: 'Main Gate (Exit)',
              ip: '192.168.1.102',
              status: 'ONLINE',
              lastPing: 'Just now',
            },
            {
              id: 'TERM-003',
              location: 'North Wing Gate',
              ip: '192.168.1.105',
              status: 'OFFLINE',
              lastPing: '2 hours ago',
            },
          ]}
          columns={[
            {
              key: 'id',
              header: 'Terminal ID',
              render: (val: any) => <span className="font-mono text-sm">{String(val)}</span>,
            },
            { key: 'location', header: 'Location' },
            {
              key: 'ip',
              header: 'IP Address',
              render: (val: any) => (
                <span className="font-mono text-xs text-slate-500">{String(val)}</span>
              ),
            },
            {
              key: 'status',
              header: 'Status',
              render: (val: any) => (
                <Badge variant={val === 'ONLINE' ? 'success' : 'error'}>{String(val)}</Badge>
              ),
            },
            { key: 'lastPing', header: 'Last Ping' },
            {
              key: 'actions',
              header: '',
              render: () => (
                <Button variant="outline" size="sm">
                  Configure
                </Button>
              ),
            },
          ]}
        />
      </Card>
    </div>
  );
}

// Temporary import placeholder to make the icon work above without breaking
import { Plus } from 'lucide-react';
