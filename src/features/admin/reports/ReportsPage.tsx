// ============================================================
// Reports - Admin Module
// ============================================================

import { Card, Button } from '@components/ui';
import { Download, FileText, Calendar, PieChart } from 'lucide-react';

export function ReportsPage() {
  return (
    <div className="space-y-6 pb-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
            Reports & Analytics
          </h1>
          <p className="text-slate-500 dark:text-slate-400 mt-1">
            Generate and export system activity reports
          </p>
        </div>
        <Button leftIcon={<Download className="w-4 h-4" />}>Export All Data</Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[
          {
            title: 'Access Logs Report',
            desc: 'Detailed history of all gate entries and exits.',
            icon: FileText,
            color: 'text-blue-500',
          },
          {
            title: 'Visitor Pass Analytics',
            desc: 'Trends and statistics on generated vs used visitor passes.',
            icon: PieChart,
            color: 'text-emerald-500',
          },
          {
            title: 'Monthly Program Report',
            desc: 'Security overview of past events and large gatherings.',
            icon: Calendar,
            color: 'text-purple-500',
          },
        ].map((report, i) => (
          <Card
            key={i}
            className="p-6 flex flex-col items-start gap-4 hover:border-blue-500/50 transition-colors cursor-pointer group"
          >
            <div
              className={`p-3 rounded-lg bg-slate-100 dark:bg-slate-800 group-hover:bg-blue-50 dark:group-hover:bg-blue-900/20 ${report.color} transition-colors`}
            >
              <report.icon className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-semibold text-slate-900 dark:text-slate-100">{report.title}</h3>
              <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">{report.desc}</p>
            </div>
            <div className="mt-auto pt-4 w-full">
              <Button variant="outline" fullWidth size="sm">
                Generate Report
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
