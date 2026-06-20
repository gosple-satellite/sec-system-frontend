// ============================================================
// Admin Dashboard - Admin Module
// ============================================================

import { Card, Badge } from '@components/ui';
import { Users, ShieldCheck, Activity, Car, AlertTriangle } from 'lucide-react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
} from 'recharts';

const mockChartData = [
  { name: 'Mon', visitors: 120, residents: 400 },
  { name: 'Tue', visitors: 150, residents: 410 },
  { name: 'Wed', visitors: 180, residents: 420 },
  { name: 'Thu', visitors: 140, residents: 380 },
  { name: 'Fri', visitors: 250, residents: 450 },
  { name: 'Sat', visitors: 350, residents: 480 },
  { name: 'Sun', visitors: 300, residents: 460 },
];

const mockRecentActivity = [
  {
    id: 1,
    user: 'John Doe',
    action: 'Visitor Pass Scanned',
    time: '5 mins ago',
    status: 'SUCCESS',
  },
  {
    id: 2,
    user: 'Jane Smith',
    action: 'Smart Card Access Denied',
    time: '12 mins ago',
    status: 'DENIED',
  },
  {
    id: 3,
    user: 'Admin User',
    action: 'Created New Estate Zone',
    time: '1 hour ago',
    status: 'INFO',
  },
  {
    id: 4,
    user: 'Michael Obi',
    action: 'Vehicle Registered',
    time: '2 hours ago',
    status: 'SUCCESS',
  },
  {
    id: 5,
    user: 'Sarah Lee',
    action: 'Visitor Pass Expired',
    time: '3 hours ago',
    status: 'WARNING',
  },
];

export function AdminDashboardPage() {
  return (
    <div className="space-y-6 pb-8">
      <div>
        <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100">Overview</h1>
        <p className="text-slate-500 dark:text-slate-400 mt-1">
          Welcome to the RCCG Security Management Console
        </p>
      </div>

      {/* ── Stats Row ────────────────────────────────────────── */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          {
            label: 'Total Residents',
            value: '4,521',
            icon: Users,
            color: 'text-blue-600',
            bg: 'bg-blue-100 dark:bg-blue-900/30',
          },
          {
            label: 'Active Passes',
            value: '842',
            icon: ShieldCheck,
            color: 'text-emerald-600',
            bg: 'bg-emerald-100 dark:bg-emerald-900/30',
          },
          {
            label: 'Registered Vehicles',
            value: '3,105',
            icon: Car,
            color: 'text-indigo-600',
            bg: 'bg-indigo-100 dark:bg-indigo-900/30',
          },
          {
            label: 'Security Alerts',
            value: '12',
            icon: AlertTriangle,
            color: 'text-red-600',
            bg: 'bg-red-100 dark:bg-red-900/30',
          },
        ].map((stat, i) => (
          <Card key={i} className="p-5 border-l-4 border-l-blue-600 dark:border-l-blue-500">
            <div className="flex items-center gap-4">
              <div className={`p-3 rounded-xl ${stat.bg}`}>
                <stat.icon className={`w-6 h-6 ${stat.color}`} />
              </div>
              <div>
                <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
                  {stat.label}
                </p>
                <p className="text-2xl font-bold text-slate-900 dark:text-slate-100">
                  {stat.value}
                </p>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* ── Charts Row ───────────────────────────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Chart */}
        <Card className="p-5 lg:col-span-2">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-base font-semibold text-slate-900 dark:text-slate-100">
              Access Trends (This Week)
            </h2>
            <select className="text-sm bg-transparent border-none text-slate-500 focus:ring-0 cursor-pointer outline-none">
              <option>Last 7 Days</option>
              <option>Last 30 Days</option>
            </select>
          </div>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={mockChartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorVisitors" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid
                  strokeDasharray="3 3"
                  vertical={false}
                  stroke="#334155"
                  opacity={0.2}
                />
                <XAxis
                  dataKey="name"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 12, fill: '#64748b' }}
                  dy={10}
                />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#1e293b',
                    border: 'none',
                    borderRadius: '8px',
                    color: '#f8fafc',
                  }}
                  itemStyle={{ color: '#e2e8f0' }}
                />
                <Area
                  type="monotone"
                  dataKey="visitors"
                  stroke="#3b82f6"
                  strokeWidth={3}
                  fillOpacity={1}
                  fill="url(#colorVisitors)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* Secondary Chart */}
        <Card className="p-5">
          <div className="mb-4">
            <h2 className="text-base font-semibold text-slate-900 dark:text-slate-100">
              Visitor Types
            </h2>
          </div>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={[
                  { name: 'Family', value: 400 },
                  { name: 'Service', value: 300 },
                  { name: 'Event', value: 550 },
                  { name: 'Delivery', value: 200 },
                ]}
                margin={{ top: 0, right: 0, left: -20, bottom: 0 }}
              >
                <CartesianGrid
                  strokeDasharray="3 3"
                  vertical={false}
                  stroke="#334155"
                  opacity={0.2}
                />
                <XAxis
                  dataKey="name"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 12, fill: '#64748b' }}
                  dy={10}
                />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} />
                <Tooltip
                  cursor={{ fill: '#334155', opacity: 0.1 }}
                  contentStyle={{
                    backgroundColor: '#1e293b',
                    border: 'none',
                    borderRadius: '8px',
                    color: '#f8fafc',
                  }}
                />
                <Bar dataKey="value" fill="#10b981" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>

      {/* ── Recent Activity ──────────────────────────────────── */}
      <Card className="p-5">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-base font-semibold text-slate-900 dark:text-slate-100 flex items-center gap-2">
            <Activity className="w-5 h-5 text-blue-500" />
            Live Activity Feed
          </h2>
          <button className="text-sm text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 font-medium">
            View All
          </button>
        </div>

        <div className="space-y-4">
          {mockRecentActivity.map((activity) => (
            <div
              key={activity.id}
              className="flex items-center justify-between p-3 hover:bg-slate-50 dark:hover:bg-slate-800/50 rounded-lg transition-colors border border-transparent hover:border-slate-100 dark:hover:border-slate-700/50"
            >
              <div className="flex items-center gap-4">
                <div className="w-2 h-2 rounded-full bg-blue-500" />
                <div>
                  <p className="text-sm font-medium text-slate-900 dark:text-slate-100">
                    {activity.action}{' '}
                    <span className="font-normal text-slate-500 dark:text-slate-400">
                      — {activity.user}
                    </span>
                  </p>
                  <p className="text-xs text-slate-400 mt-0.5">{activity.time}</p>
                </div>
              </div>
              <Badge
                variant={
                  activity.status === 'SUCCESS'
                    ? 'success'
                    : activity.status === 'DENIED'
                      ? 'error'
                      : activity.status === 'WARNING'
                        ? 'warning'
                        : 'default'
                }
              >
                {activity.status}
              </Badge>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
