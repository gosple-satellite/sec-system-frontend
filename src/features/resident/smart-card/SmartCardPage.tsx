// ============================================================
// Smart Card - Resident Module
// ============================================================

import { Card, Button, Badge } from '@components/ui';
import { CreditCard, ShieldCheck, AlertTriangle } from 'lucide-react';

export function SmartCardPage() {
  return (
    <div className="space-y-6 pb-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
            Smart Card Management
          </h1>
          <p className="text-slate-500 dark:text-slate-400 mt-1">
            Manage your physical NFC/RFID access card
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Virtual Card Representation */}
        <Card className="p-8 bg-gradient-to-br from-blue-600 to-indigo-800 border-none relative overflow-hidden flex flex-col justify-between min-h-[220px]">
          {/* Decorative circles */}
          <div className="absolute top-[-50px] right-[-50px] w-40 h-40 rounded-full bg-white/10 blur-xl"></div>
          <div className="absolute bottom-[-20px] left-[-20px] w-24 h-24 rounded-full bg-white/10 blur-lg"></div>

          <div className="flex justify-between items-start z-10">
            <h2 className="text-white text-xl font-bold tracking-wider">RCCG RESIDENT</h2>
            <CreditCard className="w-8 h-8 text-white/80" />
          </div>

          <div className="z-10 mt-8">
            <p className="text-blue-100 text-sm mb-1">Card Holder</p>
            <p className="text-white text-xl font-medium tracking-widest">GRACE OKONKWO</p>
            <p className="text-blue-200 font-mono mt-2 text-sm tracking-[0.2em]">
              1092 • 4410 • **** • 3412
            </p>
          </div>
        </Card>

        {/* Card Details & Actions */}
        <div className="space-y-4">
          <Card className="p-5 flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-500 dark:text-slate-400">Card Status</p>
              <div className="flex items-center gap-2 mt-1">
                <ShieldCheck className="w-5 h-5 text-emerald-500" />
                <span className="font-semibold text-slate-900 dark:text-slate-100">Active</span>
              </div>
            </div>
            <Badge variant="success">Secured</Badge>
          </Card>

          <Card className="p-5 flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-500 dark:text-slate-400">Linked Estate</p>
              <p className="font-semibold text-slate-900 dark:text-slate-100 mt-1">
                Zone A, House 42
              </p>
            </div>
          </Card>

          <Card className="p-5 border-l-4 border-l-amber-500">
            <div className="flex gap-3">
              <AlertTriangle className="w-5 h-5 text-amber-500 shrink-0" />
              <div>
                <h3 className="font-medium text-slate-900 dark:text-slate-100">Lost or Stolen?</h3>
                <p className="text-sm text-slate-500 mt-1 mb-3">
                  If you have misplaced your physical card, freeze it immediately to prevent
                  unauthorized access.
                </p>
                <Button variant="danger" size="sm">
                  Freeze Card
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
