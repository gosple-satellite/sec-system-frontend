// ============================================================
// Vehicles Management - Resident Module
// ============================================================

import { Card, Table, Button, Badge } from '@components/ui';
import { Plus, Car } from 'lucide-react';
import { Link } from 'react-router-dom';
import { ROUTES } from '@constants/index';

const mockVehicles = [
  {
    id: '1',
    make: 'Toyota Camry',
    plate: 'ABJ-123-XY',
    color: 'Silver',
    status: 'VERIFIED',
    registered: '2026-01-10',
  },
  {
    id: '2',
    make: 'Honda Accord',
    plate: 'LND-456-ZA',
    color: 'Black',
    status: 'PENDING',
    registered: '2026-06-18',
  },
];

export function VehiclesPage() {
  return (
    <div className="space-y-6 pb-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100">My Vehicles</h1>
          <p className="text-slate-500 dark:text-slate-400 mt-1">
            Manage your registered vehicles for automated gate access
          </p>
        </div>
        <Link to={ROUTES.RESIDENT.VEHICLES_CREATE}>
          <Button leftIcon={<Plus className="w-4 h-4" />}>Register Vehicle</Button>
        </Link>
      </div>

      <Card className="overflow-hidden border border-slate-200 dark:border-slate-700">
        <Table
          data={mockVehicles}
          columns={[
            {
              key: 'make',
              header: 'Vehicle',
              render: (_, vehicle: any) => (
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-blue-50 dark:bg-blue-900/20 text-blue-500 rounded-lg">
                    <Car className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="font-medium text-slate-900 dark:text-slate-100">
                      {String(vehicle.make)}
                    </span>
                    <p className="text-xs text-slate-500">{String(vehicle.color)}</p>
                  </div>
                </div>
              ),
            },
            {
              key: 'plate',
              header: 'License Plate',
              render: (val: any) => (
                <span className="font-mono text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded">
                  {String(val)}
                </span>
              ),
            },
            { key: 'registered', header: 'Date Registered' },
            {
              key: 'status',
              header: 'Status',
              render: (status: any) => (
                <Badge variant={status === 'VERIFIED' ? 'success' : 'warning'}>
                  {String(status)}
                </Badge>
              ),
            },
            {
              key: 'actions',
              header: '',
              render: () => (
                <Button variant="outline" size="sm">
                  Edit
                </Button>
              ),
            },
          ]}
        />
      </Card>
    </div>
  );
}
