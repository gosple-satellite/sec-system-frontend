// ============================================================
// Create Vehicle - Resident Module
// ============================================================

import { Card, Input, Button, Select } from '@components/ui';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '@constants/index';

export function CreateVehiclePage() {
  const navigate = useNavigate();

  return (
    <div className="space-y-6 pb-8 max-w-2xl mx-auto">
      <div>
        <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100">Register Vehicle</h1>
        <p className="text-slate-500 dark:text-slate-400 mt-1">
          Add a new vehicle to your profile for automated gate access
        </p>
      </div>

      <Card className="p-6">
        <div className="space-y-5">
          <Input label="Vehicle Make & Model" placeholder="e.g. Toyota Camry 2020" />
          <div className="grid grid-cols-2 gap-4">
            <Input label="License Plate Number" placeholder="e.g. ABJ-123-XY" />
            <Input label="Vehicle Color" placeholder="e.g. Silver" />
          </div>
          <Select
            label="Vehicle Type"
            options={[
              { label: 'Sedan', value: 'sedan' },
              { label: 'SUV', value: 'suv' },
              { label: 'Truck / Pickup', value: 'truck' },
              { label: 'Motorcycle', value: 'motorcycle' },
            ]}
          />

          <div className="pt-4 flex justify-end gap-3">
            <Button variant="outline" onClick={() => navigate(ROUTES.RESIDENT.VEHICLES)}>
              Cancel
            </Button>
            <Button onClick={() => navigate(ROUTES.RESIDENT.VEHICLES)}>Submit Registration</Button>
          </div>
        </div>
      </Card>
    </div>
  );
}
