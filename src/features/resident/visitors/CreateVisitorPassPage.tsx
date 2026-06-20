// ============================================================
// Generate Visitor Pass - Resident Module
// ============================================================

import { Card, Input, Button, Select } from '@components/ui';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '@constants/index';

export function CreateVisitorPassPage() {
  const navigate = useNavigate();

  return (
    <div className="space-y-6 pb-8 max-w-2xl mx-auto">
      <div>
        <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
          Generate Visitor Pass
        </h1>
        <p className="text-slate-500 dark:text-slate-400 mt-1">
          Create a digital gate pass for your upcoming guest
        </p>
      </div>

      <Card className="p-6">
        <div className="space-y-5">
          <Input label="Visitor Full Name" placeholder="e.g. Michael Johnson" />
          <div className="grid grid-cols-2 gap-4">
            <Input label="Phone Number" placeholder="e.g. 08012345678" />
            <Select
              label="Visitor Category"
              options={[
                { label: 'Family Member', value: 'family' },
                { label: 'Friend', value: 'friend' },
                { label: 'Service / Artisan', value: 'service' },
                { label: 'Delivery', value: 'delivery' },
              ]}
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <Input label="Expected Arrival Date" type="date" />
            <Input label="Expected Arrival Time" type="time" />
          </div>

          <div className="pt-4 flex justify-end gap-3">
            <Button variant="outline" onClick={() => navigate(ROUTES.RESIDENT.VISITORS)}>
              Cancel
            </Button>
            <Button onClick={() => navigate(ROUTES.RESIDENT.VISITORS)}>Generate Passcode</Button>
          </div>
        </div>
      </Card>
    </div>
  );
}
