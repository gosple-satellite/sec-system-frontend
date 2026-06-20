// ============================================================
// Resident Dashboard
// ============================================================

import { Card, Badge, Button } from '@components/ui';
import { Car, Ticket, History, CreditCard, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { ROUTES } from '@constants/index';

export function ResidentDashboardPage() {
  return (
    <div className="space-y-6 pb-8">
      <div>
        <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
          Resident Dashboard
        </h1>
        <p className="text-slate-500 dark:text-slate-400 mt-1">
          Welcome back! Here is a quick overview of your estate access.
        </p>
      </div>

      {/* ── Quick Actions / Stats ──────────────────────────────── */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          {
            label: 'Registered Vehicles',
            value: '2',
            icon: Car,
            color: 'text-blue-600',
            bg: 'bg-blue-100 dark:bg-blue-900/30',
            route: ROUTES.RESIDENT.VEHICLES,
          },
          {
            label: 'Active Visitor Passes',
            value: '3',
            icon: Ticket,
            color: 'text-emerald-600',
            bg: 'bg-emerald-100 dark:bg-emerald-900/30',
            route: ROUTES.RESIDENT.VISITORS,
          },
          {
            label: 'Recent Access Logs',
            value: '14',
            icon: History,
            color: 'text-purple-600',
            bg: 'bg-purple-100 dark:bg-purple-900/30',
            route: ROUTES.RESIDENT.ACCESS_HISTORY,
          },
          {
            label: 'Smart Card Status',
            value: 'Active',
            icon: CreditCard,
            color: 'text-indigo-600',
            bg: 'bg-indigo-100 dark:bg-indigo-900/30',
            route: ROUTES.RESIDENT.SMART_CARD,
          },
        ].map((stat, i) => (
          <Link key={i} to={stat.route} className="block group">
            <Card className="p-5 border-transparent group-hover:border-blue-500/50 transition-colors h-full">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className={`p-3 rounded-xl ${stat.bg}`}>
                    <stat.icon className={`w-6 h-6 ${stat.color}`} />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
                      {stat.label}
                    </p>
                    <p className="text-xl font-bold text-slate-900 dark:text-slate-100">
                      {stat.value}
                    </p>
                  </div>
                </div>
                <ChevronRight className="w-5 h-5 text-slate-400 group-hover:text-blue-500 transition-colors" />
              </div>
            </Card>
          </Link>
        ))}
      </div>

      {/* ── Split Layout: Visitors & Activity ──────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Active Visitor Passes */}
        <Card className="flex flex-col">
          <div className="p-5 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
            <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
              Upcoming Visitors
            </h2>
            <Link to={ROUTES.RESIDENT.VISITORS_CREATE}>
              <Button size="sm" variant="outline">
                + New Pass
              </Button>
            </Link>
          </div>
          <div className="p-5 flex-1">
            <div className="space-y-4">
              {[
                {
                  name: 'Michael Johnson',
                  type: 'Family',
                  date: 'Today, 2:00 PM',
                  pass: 'RC-9831-ABCD',
                },
                {
                  name: 'Ikea Delivery',
                  type: 'Service',
                  date: 'Tomorrow, 10:00 AM',
                  pass: 'RC-4451-XYZK',
                },
              ].map((visitor, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between p-3 rounded-lg border border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/30"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center text-emerald-600 font-bold shrink-0">
                      {visitor.name[0]}
                    </div>
                    <div>
                      <p className="font-medium text-slate-900 dark:text-slate-100">
                        {visitor.name}
                      </p>
                      <p className="text-xs text-slate-500 dark:text-slate-400">
                        {visitor.date} &bull; {visitor.type}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <Badge variant="success">Valid</Badge>
                    <p className="text-[10px] font-mono text-slate-400 mt-1">{visitor.pass}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Card>

        {/* Recent Access History */}
        <Card className="flex flex-col">
          <div className="p-5 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
            <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
              Recent Gate Access
            </h2>
            <Link to={ROUTES.RESIDENT.ACCESS_HISTORY}>
              <Button size="sm" variant="ghost">
                View All
              </Button>
            </Link>
          </div>
          <div className="p-5 flex-1">
            <div className="space-y-4">
              {[
                {
                  label: 'Toyota Camry (ABJ-123-XY)',
                  action: 'Exited Main Gate',
                  time: '10 mins ago',
                  type: 'vehicle',
                },
                {
                  label: 'John Doe (Visitor)',
                  action: 'Entered North Gate',
                  time: '2 hours ago',
                  type: 'visitor',
                },
                {
                  label: 'Resident Smart Card',
                  action: 'Entered Main Gate',
                  time: 'Yesterday, 8:00 PM',
                  type: 'card',
                },
              ].map((log, i) => (
                <div key={i} className="flex gap-4 relative">
                  {/* Timeline line */}
                  {i !== 2 && (
                    <div className="absolute left-[11px] top-6 bottom-[-16px] w-0.5 bg-slate-200 dark:bg-slate-700" />
                  )}

                  <div
                    className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 z-10 ${
                      log.type === 'vehicle'
                        ? 'bg-blue-100 text-blue-600 dark:bg-blue-900/30'
                        : log.type === 'visitor'
                          ? 'bg-emerald-100 text-emerald-600 dark:bg-emerald-900/30'
                          : 'bg-purple-100 text-purple-600 dark:bg-purple-900/30'
                    }`}
                  >
                    {log.type === 'vehicle' ? (
                      <Car className="w-3.5 h-3.5" />
                    ) : log.type === 'visitor' ? (
                      <Ticket className="w-3.5 h-3.5" />
                    ) : (
                      <CreditCard className="w-3.5 h-3.5" />
                    )}
                  </div>
                  <div className="pb-2">
                    <p className="text-sm font-medium text-slate-900 dark:text-slate-100">
                      {log.action}
                    </p>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                      {log.label} &bull; {log.time}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
