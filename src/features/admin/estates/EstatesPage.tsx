// ============================================================
// Estate Management - Admin Module
// ============================================================

import { Card, Table, Button, Badge } from '@components/ui';
import { Plus, Home, MapPin } from 'lucide-react';

const mockEstates = [
  {
    id: '1',
    name: 'Redemption City Core',
    type: 'Main',
    address: 'KM 46 Lagos-Ibadan Exp',
    units: 450,
    status: 'ACTIVE',
  },
  {
    id: '2',
    name: 'Zone A',
    type: 'Residential',
    address: 'North Wing',
    units: 120,
    status: 'ACTIVE',
  },
  {
    id: '3',
    name: 'Zone B',
    type: 'Residential',
    address: 'South Wing',
    units: 150,
    status: 'MAINTENANCE',
  },
  {
    id: '4',
    name: 'Guest Chalets',
    type: 'Hospitality',
    address: 'East Wing',
    units: 85,
    status: 'ACTIVE',
  },
];

export function EstatesPage() {
  return (
    <div className="space-y-6 pb-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
            Estate Management
          </h1>
          <p className="text-slate-500 dark:text-slate-400 mt-1">
            Manage zones, housing units, and facility status
          </p>
        </div>
        <Button leftIcon={<Plus className="w-4 h-4" />}>Add New Estate</Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <Card className="p-5 flex items-center gap-4">
          <div className="p-3 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600">
            <Home className="w-6 h-6" />
          </div>
          <div>
            <p className="text-sm text-slate-500 dark:text-slate-400">Total Zones</p>
            <p className="text-2xl font-bold text-slate-900 dark:text-slate-100">12</p>
          </div>
        </Card>
        <Card className="p-5 flex items-center gap-4">
          <div className="p-3 rounded-full bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600">
            <MapPin className="w-6 h-6" />
          </div>
          <div>
            <p className="text-sm text-slate-500 dark:text-slate-400">Total Units</p>
            <p className="text-2xl font-bold text-slate-900 dark:text-slate-100">805</p>
          </div>
        </Card>
      </div>

      <Card className="overflow-hidden border border-slate-200 dark:border-slate-700">
        <Table
          data={mockEstates}
          columns={[
            {
              key: 'name',
              header: 'Estate / Zone Name',
              render: (val: any) => (
                <span className="font-medium text-slate-900 dark:text-slate-100">
                  {String(val)}
                </span>
              ),
            },
            { key: 'type', header: 'Type' },
            { key: 'address', header: 'Location' },
            { key: 'units', header: 'Total Units' },
            {
              key: 'status',
              header: 'Status',
              render: (status: any) => (
                <Badge variant={status === 'ACTIVE' ? 'success' : 'warning'}>
                  {String(status)}
                </Badge>
              ),
            },
            {
              key: 'actions',
              header: '',
              render: () => (
                <Button variant="outline" size="sm">
                  Manage
                </Button>
              ),
            },
          ]}
        />
      </Card>
    </div>
  );
}
