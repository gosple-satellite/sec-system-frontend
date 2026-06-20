// ============================================================
// Visitor Dashboard — Landing Hub (Visitor Module)
// ============================================================

import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, Badge } from '@components/ui';
import { ROUTES } from '@constants/index';

// ─── Types ────────────────────────────────────────────────
interface FaqItem {
  q: string;
  a: string;
}

// ─── Static Data ──────────────────────────────────────────
const RECENT_ACTIVITY = [
  {
    id: 1,
    code: 'DEMO-APPROVED',
    name: 'John Doe',
    action: 'Pass Verified at Main Gate',
    time: '5 mins ago',
    status: 'APPROVED' as const,
    icon: '✅',
  },
  {
    id: 2,
    code: 'DEMO-PENDING',
    name: 'Jane Smith',
    action: 'Awaiting Host Approval',
    time: '18 mins ago',
    status: 'PENDING' as const,
    icon: '⏳',
  },
  {
    id: 3,
    code: 'DEMO-USED',
    name: 'Grace Omowunmi',
    action: 'Entry Completed & Gate Closed',
    time: '2 hours ago',
    status: 'USED' as const,
    icon: '🏁',
  },
  {
    id: 4,
    code: 'DEMO-EXPIRED',
    name: 'David Alao',
    action: 'Pass Expired Before Entry',
    time: '1 day ago',
    status: 'EXPIRED' as const,
    icon: '⌛',
  },
];

const ESTATE_INFO = [
  { label: 'Estate', value: 'RCCG Redemption City' },
  { label: 'Location', value: 'Mowe, Ogun State' },
  { label: 'Gate Hours', value: '24 / 7' },
  { label: 'Main Gatehouse', value: 'Gate A — KM 46, Lagos-Ibadan Expressway' },
  { label: 'Emergency', value: '+234 800 RCCG GATE' },
  { label: 'Security Line', value: '+234 801 SEC RCCG' },
];

const FAQS: FaqItem[] = [
  {
    q: 'Do I need to register before visiting?',
    a: 'No login is required. You can generate a free self-service gate pass directly on this portal under "Get Entry Pass". Just fill in your details and show the QR code at the gate.',
  },
  {
    q: 'How long is my gate pass valid?',
    a: 'Each pass is valid for 24 hours from the entry date and time you select. After expiry, you will need to generate a new pass.',
  },
  {
    q: 'What if my host resident generated the pass for me?',
    a: 'Ask your host for the passcode (e.g. RC-XXXX-XXXX). Enter it under "Verify a Pass" to view and download your QR pass card.',
  },
  {
    q: 'Can I check my pass status after entering the estate?',
    a: 'Yes. Go to "Track Status", enter your passcode, and you will see a full lifecycle timeline showing when you checked in and out.',
  },
  {
    q: 'What if my pass shows DENIED?',
    a: 'Contact your host resident. They may need to re-approve or regenerate your pass. The gate security officer cannot override a denied pass without host approval.',
  },
];

// ─── Status badge map ─────────────────────────────────────
const STATUS_META: Record<
  string,
  { variant: 'success' | 'warning' | 'error' | 'info' | 'default'; label: string }
> = {
  APPROVED: { variant: 'success', label: 'Approved' },
  PENDING: { variant: 'warning', label: 'Pending' },
  DENIED: { variant: 'error', label: 'Denied' },
  EXPIRED: { variant: 'default', label: 'Expired' },
  USED: { variant: 'info', label: 'Completed' },
};

// ─── FAQ Accordion Item ───────────────────────────────────
function FaqAccordionItem({ item, index }: { item: FaqItem; index: number }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border border-slate-200 dark:border-slate-700 rounded-xl overflow-hidden">
      <button
        id={`faq-btn-${index}`}
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors"
      >
        <span className="text-sm font-semibold text-slate-800 dark:text-slate-100">{item.q}</span>
        <svg
          className={`w-4 h-4 shrink-0 text-slate-400 transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      {open && (
        <div className="px-5 pb-4 pt-1 bg-slate-50 dark:bg-slate-800/50 text-sm text-slate-600 dark:text-slate-400 leading-relaxed border-t border-slate-100 dark:border-slate-700">
          {item.a}
        </div>
      )}
    </div>
  );
}

// ─── Main Dashboard ───────────────────────────────────────
export function VisitorDashboardPage() {
  return (
    <div className="space-y-8 pb-10">
      {/* ── Hero Banner ───────────────────────────────────── */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-blue-700 via-blue-600 to-indigo-700 p-6 sm:p-10 shadow-xl">
        {/* Decorative blobs */}
        <div className="absolute -top-12 -right-12 w-64 h-64 rounded-full bg-white/5 blur-2xl pointer-events-none" />
        <div className="absolute -bottom-16 -left-10 w-72 h-72 rounded-full bg-indigo-900/30 blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-blue-200 text-xs font-semibold uppercase tracking-widest">
              <span className="inline-block w-6 h-0.5 bg-blue-300 rounded" />
              RCCG Redemption City Security Portal
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white leading-tight">
              Welcome, Visitor 👋
            </h1>
            <p className="text-blue-100 text-sm sm:text-base max-w-lg leading-relaxed">
              Generate your gate entry pass, verify an existing pass, or track the status of your
              visit — all without needing an account.
            </p>
          </div>

          {/* Floating badge */}
          <div className="shrink-0 flex flex-col items-center justify-center bg-white/10 border border-white/20 rounded-2xl p-5 gap-1 text-center backdrop-blur-sm min-w-[140px]">
            <span className="text-4xl">🛡️</span>
            <span className="text-white font-bold text-sm mt-1">Gate Open</span>
            <span className="text-blue-200 text-xs">24 / 7</span>
          </div>
        </div>
      </div>

      {/* ── Quick Action Cards ────────────────────────────── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {[
          {
            id: 'action-verify',
            to: ROUTES.VISITOR.PASS,
            icon: '🔍',
            color: 'from-blue-600 to-blue-700',
            ring: 'ring-blue-500/30',
            title: 'Verify a Pass',
            description:
              'Enter a passcode or scan a QR code to verify an existing visitor gate pass.',
            cta: 'Verify Pass →',
          },
          {
            id: 'action-register',
            to: `${ROUTES.VISITOR.PASS}?tab=register`,
            icon: '✅',
            color: 'from-emerald-600 to-teal-700',
            ring: 'ring-emerald-500/30',
            title: 'Get Entry Pass',
            description: 'Self-register and generate your personal QR gate pass — no login needed.',
            cta: 'Generate Pass →',
          },
          {
            id: 'action-status',
            to: ROUTES.VISITOR.STATUS,
            icon: '📍',
            color: 'from-indigo-600 to-purple-700',
            ring: 'ring-indigo-500/30',
            title: 'Track Visit Status',
            description:
              'Check the full authorization lifecycle and gate check-in/out timeline of a pass.',
            cta: 'Track Status →',
          },
          {
            id: 'action-info',
            to: '#estate-info',
            icon: '🗺️',
            color: 'from-amber-500 to-orange-600',
            ring: 'ring-amber-500/30',
            title: 'Estate & Gate Info',
            description:
              'Find gatehouse locations, contact numbers, and security guidelines for the estate.',
            cta: 'View Info ↓',
            isAnchor: true,
          },
        ].map((card) =>
          card.isAnchor ? (
            <a key={card.id} id={card.id} href={card.to} className="group block">
              <ActionCard card={card} />
            </a>
          ) : (
            <Link key={card.id} id={card.id} to={card.to} className="group block">
              <ActionCard card={card} />
            </Link>
          )
        )}
      </div>

      {/* ── How It Works ─────────────────────────────────── */}
      <div className="space-y-4">
        <div>
          <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100">How It Works</h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-0.5">
            Three simple steps to enter Redemption City
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            {
              step: '01',
              icon: '📝',
              title: 'Register Yourself',
              desc: 'Fill in your name, phone, purpose of visit and your intended entry date. No account required.',
            },
            {
              step: '02',
              icon: '📲',
              title: 'Get Your QR Pass',
              desc: 'A unique gate pass code and QR code is generated instantly. Download or screenshot it.',
            },
            {
              step: '03',
              icon: '🚪',
              title: 'Show at the Gate',
              desc: 'Present your QR code to the security officer at the main gatehouse for scan and clearance.',
            },
          ].map((s) => (
            <Card
              key={s.step}
              className="p-5 border border-slate-200 dark:border-slate-700 relative overflow-hidden group hover:border-blue-500/40 transition-all duration-200"
            >
              <span className="absolute -right-2 -top-4 text-7xl font-black text-slate-100 dark:text-slate-800 select-none group-hover:text-blue-50 dark:group-hover:text-slate-700 transition-colors">
                {s.step}
              </span>
              <div className="relative z-10 space-y-2">
                <span className="text-3xl">{s.icon}</span>
                <h3 className="font-bold text-slate-900 dark:text-slate-100">{s.title}</h3>
                <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                  {s.desc}
                </p>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* ── Activity Feed + Estate Info ───────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        {/* Recent Activity */}
        <Card className="lg:col-span-3 flex flex-col overflow-hidden">
          <div className="px-5 py-4 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
            <h2 className="text-base font-semibold text-slate-900 dark:text-slate-100 flex items-center gap-2">
              <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              Live Gate Activity
            </h2>
            <Link
              to={ROUTES.VISITOR.STATUS}
              className="text-xs font-semibold text-blue-600 dark:text-blue-400 hover:underline"
            >
              Track a Pass
            </Link>
          </div>
          <div className="divide-y divide-slate-100 dark:divide-slate-800">
            {RECENT_ACTIVITY.map((item) => {
              const meta = STATUS_META[item.status];
              return (
                <div
                  key={item.id}
                  className="flex items-center gap-4 px-5 py-3.5 hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors"
                >
                  <div className="w-9 h-9 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center shrink-0 text-lg">
                    {item.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-slate-900 dark:text-slate-100 truncate">
                      {item.action}
                    </p>
                    <p className="text-xs text-slate-400 mt-0.5">
                      {item.name} &bull; <span className="font-mono">{item.code}</span> &bull;{' '}
                      {item.time}
                    </p>
                  </div>
                  <Badge variant={meta.variant}>{meta.label}</Badge>
                </div>
              );
            })}
          </div>
          <div className="px-5 py-3 border-t border-slate-100 dark:border-slate-800 mt-auto">
            <p className="text-xs text-slate-400">
              Showing simulated recent gate activity. Search your passcode under{' '}
              <Link to={ROUTES.VISITOR.STATUS} className="text-blue-500 hover:underline">
                Track Status
              </Link>{' '}
              for your personal record.
            </p>
          </div>
        </Card>

        {/* Estate Info */}
        <div id="estate-info" className="lg:col-span-2 flex flex-col overflow-hidden">
          <Card className="flex flex-col h-full overflow-hidden">
            <div className="px-5 py-4 border-b border-slate-100 dark:border-slate-800">
              <h2 className="text-base font-semibold text-slate-900 dark:text-slate-100">
                🏙️ Estate Information
              </h2>
            </div>
            <div className="flex-1 p-5 space-y-4">
              {ESTATE_INFO.map((info) => (
                <div key={info.label}>
                  <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                    {info.label}
                  </p>
                  <p className="text-sm font-medium text-slate-700 dark:text-slate-300 mt-0.5">
                    {info.value}
                  </p>
                </div>
              ))}
            </div>
            <div className="px-5 py-4 border-t border-slate-100 dark:border-slate-800 bg-amber-50 dark:bg-amber-950/20">
              <div className="flex items-start gap-2">
                <span className="text-amber-500 shrink-0 mt-0.5">⚠️</span>
                <p className="text-xs text-amber-700 dark:text-amber-400 leading-relaxed">
                  All visitors must present a valid gate pass for entry. Unauthorised entry is
                  strictly prohibited under estate security policy.
                </p>
              </div>
            </div>
          </Card>
        </div>
      </div>

      {/* ── Pass Status Reference ─────────────────────────── */}
      <div className="space-y-4">
        <div>
          <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100">
            Pass Status Guide
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-0.5">
            What each pass status means for gate access
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
          {[
            {
              status: 'APPROVED',
              color:
                'border-emerald-300 dark:border-emerald-700 bg-emerald-50 dark:bg-emerald-950/20',
              icon: '✅',
              desc: 'Pass cleared. Present QR at gate for entry.',
            },
            {
              status: 'PENDING',
              color: 'border-amber-300 dark:border-amber-700 bg-amber-50 dark:bg-amber-950/20',
              icon: '⏳',
              desc: 'Awaiting approval from host resident.',
            },
            {
              status: 'DENIED',
              color: 'border-red-300 dark:border-red-700 bg-red-50 dark:bg-red-950/20',
              icon: '🚫',
              desc: 'Entry refused. Contact your host to re-invite.',
            },
            {
              status: 'EXPIRED',
              color: 'border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-800/30',
              icon: '⌛',
              desc: 'Pass period has ended. Generate a new pass.',
            },
            {
              status: 'USED',
              color: 'border-blue-300 dark:border-blue-700 bg-blue-50 dark:bg-blue-950/20',
              icon: '🏁',
              desc: 'Entry completed. Visit recorded in system.',
            },
          ].map((s) => {
            const meta = STATUS_META[s.status];
            return (
              <div
                key={s.status}
                className={`rounded-xl border p-4 flex flex-col gap-2 ${s.color}`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-xl">{s.icon}</span>
                  <Badge variant={meta.variant}>{meta.label}</Badge>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                  {s.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* ── FAQ ───────────────────────────────────────────── */}
      <div className="space-y-4">
        <div>
          <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100">
            Frequently Asked Questions
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-0.5">
            Common questions about visiting Redemption City
          </p>
        </div>
        <div className="space-y-2">
          {FAQS.map((faq, i) => (
            <FaqAccordionItem key={i} item={faq} index={i} />
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Action Card sub-component ────────────────────────────
function ActionCard({
  card,
}: {
  card: {
    icon: string;
    color: string;
    ring: string;
    title: string;
    description: string;
    cta: string;
  };
}) {
  return (
    <Card
      className={`h-full p-5 border border-slate-200 dark:border-slate-700 group-hover:ring-2 ${card.ring} group-hover:border-transparent transition-all duration-200 group-hover:shadow-lg`}
    >
      <div className="flex flex-col h-full gap-3">
        <div
          className={`w-11 h-11 rounded-xl bg-gradient-to-br ${card.color} flex items-center justify-center text-xl shadow-md`}
        >
          {card.icon}
        </div>
        <div className="flex-1">
          <h3 className="font-bold text-slate-900 dark:text-slate-100">{card.title}</h3>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
            {card.description}
          </p>
        </div>
        <span className="text-sm font-semibold text-blue-600 dark:text-blue-400 group-hover:gap-2 flex items-center gap-1 transition-all">
          {card.cta}
        </span>
      </div>
    </Card>
  );
}
