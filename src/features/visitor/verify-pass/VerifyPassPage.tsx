// ============================================================
// Visitor Gate Pass Hub — Verify Pass & Self-Register
// ============================================================

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import QRCode from 'react-qr-code';
import { Card, CardBody, CardFooter, Input, Select, Button, Badge, Alert } from '@components/ui';
import { useVerifyPass } from '../hooks/useVisitor';
import { formatDateTime } from '@utils/helpers';
import { useNotificationStore } from '@store/notificationStore';
import type { VisitorPass, VisitorStatus, SelectOption } from '@/types';

// ─── Schemas ──────────────────────────────────────────────
const verifySchema = z.object({
  passCode: z
    .string()
    .min(4, 'Passcode must be at least 4 characters')
    .max(20, 'Passcode must not exceed 20 characters')
    .trim(),
});

const registerSchema = z.object({
  visitorName: z.string().min(3, 'Full name must be at least 3 characters').trim(),
  visitorPhone: z.string().min(8, 'Phone number must be at least 8 digits').trim(),
  visitorEmail: z.string().email('Invalid email address').optional().or(z.literal('')),
  purpose: z.string().min(1, 'Please select a purpose of entry'),
  destination: z.string().min(1, 'Please select a destination'),
  entryDate: z.string().min(1, 'Please select entry date and time'),
});

type VerifyFormValues = z.infer<typeof verifySchema>;
type RegisterFormValues = z.infer<typeof registerSchema>;

// ─── Dropdown Options ─────────────────────────────────────
const PURPOSE_OPTIONS: SelectOption[] = [
  { value: 'HOLY_GHOST_SERVICE', label: 'Holy Ghost Service / Night of Wonders' },
  { value: 'SUNDAY_SERVICE', label: 'Sunday Worship Service' },
  { value: 'CAMP_MEETING', label: 'Camp Meeting / Annual Convention' },
  { value: 'YOUTH_PROGRAMME', label: 'Youth / Children Programme' },
  { value: 'CONTRACTOR', label: 'Contractor / Construction Work' },
  { value: 'DELIVERY', label: 'Delivery / Business Supply' },
  { value: 'RESIDENT_VISIT', label: 'Visiting a Camp Resident' },
  { value: 'OTHER', label: 'Other Public Business' },
];

const DESTINATION_OPTIONS: SelectOption[] = [
  { value: 'MAIN_AUDITORIUM', label: 'Main Auditorium — 3km² Arena' },
  { value: 'YOUTH_CENTRE', label: 'Youth Centre / Youth Arena' },
  { value: 'CONGRESS_HALL', label: 'Congress Exhibition Hall' },
  { value: 'ZONE_A_K', label: 'Residential Quarters (Zone A–K)' },
  { value: 'ZONE_L_Z', label: 'Residential Quarters (Zone L–Z)' },
  { value: 'ADMIN_HQ', label: 'Camp Administrative Headquarters' },
  { value: 'CONSTRUCTION', label: 'Estate Development Site' },
];

// ─── Mock Passes ──────────────────────────────────────────
const MOCK_PASSES: Record<string, Omit<VisitorPass, 'id' | 'createdAt' | 'updatedAt'>> = {
  'DEMO-APPROVED': {
    visitorName: 'John Doe',
    visitorPhone: '+234 803 123 4567',
    visitorEmail: 'john.doe@example.com',
    purpose: 'Personal Visit / Family Reunion',
    entryDate: new Date().toISOString(),
    expiryDate: new Date(Date.now() + 86400000).toISOString(),
    passCode: 'DEMO-APPROVED',
    qrCode: 'DEMO-APPROVED',
    status: 'APPROVED',
    residentId: 'res_123',
    estateId: 'estate_abc',
  },
  'DEMO-PENDING': {
    visitorName: 'Jane Smith',
    visitorPhone: '+234 812 987 6543',
    visitorEmail: 'jane.smith@example.com',
    purpose: 'Courier Package Delivery',
    entryDate: new Date().toISOString(),
    expiryDate: new Date(Date.now() + 7200000).toISOString(),
    passCode: 'DEMO-PENDING',
    qrCode: 'DEMO-PENDING',
    status: 'PENDING',
    residentId: 'res_123',
    estateId: 'estate_abc',
  },
  'DEMO-EXPIRED': {
    visitorName: 'David Alao',
    visitorPhone: '+234 905 444 3333',
    visitorEmail: 'david.alao@example.com',
    purpose: 'Maintenance Work (Plumbing)',
    entryDate: new Date(Date.now() - 172800000).toISOString(),
    expiryDate: new Date(Date.now() - 86400000).toISOString(),
    passCode: 'DEMO-EXPIRED',
    qrCode: 'DEMO-EXPIRED',
    status: 'EXPIRED',
    residentId: 'res_123',
    estateId: 'estate_abc',
  },
  'DEMO-DENIED': {
    visitorName: 'Robert Vance',
    visitorPhone: '+234 701 555 7777',
    visitorEmail: 'robert.vance@example.com',
    purpose: 'Business Meeting',
    entryDate: new Date().toISOString(),
    expiryDate: new Date(Date.now() + 86400000).toISOString(),
    passCode: 'DEMO-DENIED',
    qrCode: 'DEMO-DENIED',
    status: 'DENIED',
    residentId: 'res_123',
    estateId: 'estate_abc',
  },
  'DEMO-USED': {
    visitorName: 'Grace Omowunmi',
    visitorPhone: '+234 809 222 1111',
    visitorEmail: 'grace.o@example.com',
    purpose: 'Church Fellowship Attendance',
    entryDate: new Date(Date.now() - 14400000).toISOString(),
    expiryDate: new Date(Date.now() + 7200000).toISOString(),
    passCode: 'DEMO-USED',
    qrCode: 'DEMO-USED',
    status: 'USED',
    residentId: 'res_123',
    estateId: 'estate_abc',
  },
};

// ─── Status badge ──────────────────────────────────────────
function getStatusBadge(status: VisitorStatus) {
  switch (status) {
    case 'APPROVED':
      return (
        <Badge variant="success" dot>
          Approved
        </Badge>
      );
    case 'PENDING':
      return (
        <Badge variant="warning" dot>
          Pending Review
        </Badge>
      );
    case 'DENIED':
      return (
        <Badge variant="error" dot>
          Denied
        </Badge>
      );
    case 'EXPIRED':
      return (
        <Badge variant="default" dot>
          Expired
        </Badge>
      );
    case 'USED':
      return (
        <Badge variant="info" dot>
          Already Used
        </Badge>
      );
    default:
      return <Badge variant="default">{status}</Badge>;
  }
}

// ─── Download helper ──────────────────────────────────────
function downloadPassAsPng(pass: VisitorPass, notifySuccess: (title: string, msg: string) => void) {
  const containerId = `qr-container-${pass.passCode.replace(/[^a-zA-Z0-9]/g, '-')}`;
  const container = document.getElementById(containerId);
  if (!container) return;

  const svgEl = container.querySelector('svg');
  if (!svgEl) return;

  // Give the SVG explicit dimensions so it renders correctly on the canvas
  const clonedSvg = svgEl.cloneNode(true) as SVGSVGElement;
  clonedSvg.setAttribute('width', '200');
  clonedSvg.setAttribute('height', '200');

  const svgData = new XMLSerializer().serializeToString(clonedSvg);
  const svgBlob = new Blob([svgData], { type: 'image/svg+xml;charset=utf-8' });
  const svgUrl = URL.createObjectURL(svgBlob);

  const img = new Image();
  img.onload = () => {
    const W = 500;
    const H = 700;
    const canvas = document.createElement('canvas');
    canvas.width = W;
    canvas.height = H;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // ── Background ──────────────────────────────
    ctx.fillStyle = '#0f172a';
    ctx.fillRect(0, 0, W, H);

    // ── Top accent bar ───────────────────────────
    const accentColor = pass.residentId === 'self-register' ? '#10b981' : '#3b82f6';
    ctx.fillStyle = accentColor;
    ctx.fillRect(0, 0, W, 7);

    // ── Label ────────────────────────────────────
    ctx.fillStyle = '#64748b';
    ctx.font = '500 11px monospace';
    ctx.letterSpacing = '0.12em';
    ctx.fillText('REDEMPTION CITY — DIGITAL GATE PASS', 36, 50);
    ctx.letterSpacing = '0em';

    // ── Visitor name ──────────────────────────────
    ctx.fillStyle = '#f1f5f9';
    ctx.font = 'bold 26px sans-serif';
    ctx.fillText(pass.visitorName, 36, 90);

    // ── Phone ─────────────────────────────────────
    ctx.fillStyle = '#94a3b8';
    ctx.font = '400 13px sans-serif';
    ctx.fillText(pass.visitorPhone, 36, 113);

    // ── Status pill (text only) ────────────────────
    const statusColors: Record<string, string> = {
      APPROVED: '#10b981',
      PENDING: '#f59e0b',
      DENIED: '#ef4444',
      EXPIRED: '#64748b',
      USED: '#3b82f6',
    };
    ctx.fillStyle = statusColors[pass.status] ?? '#64748b';
    ctx.font = 'bold 12px sans-serif';
    ctx.fillText(`● ${pass.status}`, 36, 140);

    // ── Pass code ─────────────────────────────────
    ctx.fillStyle = '#334155';
    ctx.fillRect(36, 152, W - 72, 32);
    ctx.fillStyle = '#e2e8f0';
    ctx.font = 'bold 13px monospace';
    ctx.fillText(`PASS CODE: ${pass.passCode}`, 50, 173);

    // ── Divider ───────────────────────────────────
    ctx.fillStyle = '#1e293b';
    ctx.fillRect(36, 196, W - 72, 1);

    // ── Purpose ───────────────────────────────────
    ctx.fillStyle = '#64748b';
    ctx.font = '500 11px monospace';
    ctx.fillText('PURPOSE OF VISIT', 36, 220);
    ctx.fillStyle = '#cbd5e1';
    ctx.font = '400 13px sans-serif';
    const purposeText =
      pass.purpose.length > 60 ? pass.purpose.substring(0, 57) + '...' : pass.purpose;
    ctx.fillText(purposeText, 36, 238);

    // ── Entry / Expiry ────────────────────────────
    ctx.fillStyle = '#64748b';
    ctx.font = '500 11px monospace';
    ctx.fillText('ENTRY DATE', 36, 268);
    ctx.fillStyle = '#cbd5e1';
    ctx.font = '400 12px monospace';
    ctx.fillText(formatDateTime(pass.entryDate), 36, 285);

    ctx.fillStyle = '#64748b';
    ctx.font = '500 11px monospace';
    ctx.fillText('VALID UNTIL', 280, 268);
    ctx.fillStyle = '#cbd5e1';
    ctx.font = '400 12px monospace';
    ctx.fillText(pass.expiryDate ? formatDateTime(pass.expiryDate) : 'No Expiration', 280, 285);

    // ── QR Code area ──────────────────────────────
    const qrSize = 200;
    const qrX = (W - qrSize) / 2;
    const qrY = 310;

    // White backing
    ctx.fillStyle = '#ffffff';
    ctx.beginPath();
    ctx.roundRect(qrX - 16, qrY - 16, qrSize + 32, qrSize + 32, 12);
    ctx.fill();

    ctx.drawImage(img, qrX, qrY, qrSize, qrSize);

    // ── Footer ────────────────────────────────────
    ctx.fillStyle = '#475569';
    ctx.font = '400 11px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('Present this QR code at the main gatehouse upon arrival', W / 2, 572);
    ctx.fillText('RCCG Redemption City, Ogun State, Nigeria', W / 2, 590);

    ctx.fillStyle = '#1e293b';
    ctx.fillRect(36, 608, W - 72, 1);

    ctx.fillStyle = '#334155';
    ctx.font = '400 10px monospace';
    ctx.fillText(`Generated: ${new Date().toLocaleString()}`, W / 2, 628);

    URL.revokeObjectURL(svgUrl);

    // Trigger download
    const link = document.createElement('a');
    link.download = `gate-pass-${pass.passCode}.png`;
    link.href = canvas.toDataURL('image/png');
    link.click();

    notifySuccess('Download started', `Saved gate-pass-${pass.passCode}.png`);
  };

  img.onerror = () => URL.revokeObjectURL(svgUrl);
  img.src = svgUrl;
}

// ─── Pass Card ────────────────────────────────────────────
function PassCard({
  pass,
  onReset,
  accentColor = 'blue',
}: {
  pass: VisitorPass;
  onReset: () => void;
  accentColor?: 'blue' | 'emerald';
}) {
  const [isDownloading, setIsDownloading] = useState(false);
  const { success: notifySuccess } = useNotificationStore();

  const accentBar = accentColor === 'blue' ? 'bg-blue-600' : 'bg-emerald-600';
  const containerId = `qr-container-${pass.passCode.replace(/[^a-zA-Z0-9]/g, '-')}`;

  const handleDownload = () => {
    setIsDownloading(true);
    // Small delay so the spinner renders before we block the thread
    setTimeout(() => {
      downloadPassAsPng(pass, notifySuccess);
      setIsDownloading(false);
    }, 80);
  };

  return (
    <Card className="overflow-hidden border border-slate-200 dark:border-slate-800 shadow-xl bg-gradient-to-br from-white to-slate-50/50 dark:from-slate-800 dark:to-slate-900/50">
      <div className={`h-1.5 w-full ${accentBar}`} />
      <CardBody className="p-5 sm:p-8 space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 pb-6 border-b border-slate-200 dark:border-slate-700">
          <div className="space-y-1 min-w-0">
            <span className="text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
              {accentColor === 'emerald' ? 'Self-Registered Gate Pass' : 'Digital Visitor Pass'}
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white truncate">
              {pass.visitorName}
            </h2>
            <p className="text-sm text-slate-500 dark:text-slate-400">{pass.visitorPhone}</p>
          </div>
          <div className="flex sm:flex-col sm:items-end gap-2 flex-wrap shrink-0">
            {getStatusBadge(pass.status)}
            <span className="text-xs font-mono bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 px-2.5 py-1 rounded-md border border-slate-200 dark:border-slate-700 whitespace-nowrap">
              {pass.passCode}
            </span>
          </div>
        </div>

        {/* Info Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <p className="text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
                Purpose of Visit
              </p>
              <p className="mt-1 text-slate-700 dark:text-slate-300 font-medium text-sm leading-relaxed">
                {pass.purpose}
              </p>
            </div>
            <div>
              <p className="text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
                Estate / City
              </p>
              <p className="mt-1 text-slate-700 dark:text-slate-300 font-medium text-sm">
                RCCG Redemption City, Ogun State
              </p>
            </div>
            {pass.visitorEmail && (
              <div>
                <p className="text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
                  Email
                </p>
                <p className="mt-1 text-slate-700 dark:text-slate-300 text-sm break-all">
                  {pass.visitorEmail}
                </p>
              </div>
            )}
          </div>
          <div className="space-y-4 border-t sm:border-t-0 sm:border-l border-slate-200 dark:border-slate-700 pt-4 sm:pt-0 sm:pl-6">
            <div>
              <p className="text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
                Entry Date & Time
              </p>
              <p className="mt-1 text-slate-700 dark:text-slate-300 font-mono text-sm">
                {formatDateTime(pass.entryDate)}
              </p>
            </div>
            <div>
              <p className="text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
                Valid Until
              </p>
              <p className="mt-1 text-slate-700 dark:text-slate-300 font-mono text-sm">
                {pass.expiryDate ? formatDateTime(pass.expiryDate) : 'No Expiration'}
              </p>
            </div>
            {pass.status === 'APPROVED' && (
              <div className="bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-900/30 rounded-lg p-3 text-xs text-emerald-800 dark:text-emerald-400 flex items-start gap-2">
                <svg
                  className="w-4 h-4 shrink-0 mt-0.5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <span>This pass is valid for gate authorization.</span>
              </div>
            )}
          </div>
        </div>

        {/* QR Code — inline SVG via react-qr-code */}
        <div className="flex flex-col items-center justify-center bg-slate-50 dark:bg-slate-900/60 rounded-xl p-6 border border-slate-200 dark:border-slate-800 gap-4">
          <div
            id={containerId}
            className="bg-white p-4 rounded-xl shadow-md border-4 border-white dark:border-slate-200 hover:scale-105 transition-transform duration-200"
          >
            <QRCode value={pass.passCode} size={160} fgColor="#0f172a" bgColor="#ffffff" />
          </div>
          <p className="text-xs text-slate-400 dark:text-slate-500 text-center max-w-xs">
            Present this QR code to the security officer at the main gatehouse upon arrival.
          </p>
        </div>
      </CardBody>

      <CardFooter className="bg-slate-50/80 dark:bg-slate-900/30 px-5 sm:px-8 py-4 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
        <Button variant="outline" size="sm" onClick={onReset} className="w-full sm:w-auto">
          ← Go Back
        </Button>
        <Button
          variant="primary"
          size="sm"
          isLoading={isDownloading}
          onClick={handleDownload}
          className="w-full sm:w-auto flex items-center justify-center gap-2"
        >
          {!isDownloading && (
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
              />
            </svg>
          )}
          Download Pass
        </Button>
      </CardFooter>
    </Card>
  );
}

// ─── Main Page ────────────────────────────────────────────
type TabId = 'verify' | 'register';

export function VerifyPassPage() {
  const [activeTab, setActiveTab] = useState<TabId>('verify');

  // Verify tab state
  const [searchCode, setSearchCode] = useState('');
  const [isScanning, setIsScanning] = useState(false);
  const [demoPass, setDemoPass] = useState<VisitorPass | null>(null);

  // Register tab state
  const [generatedPass, setGeneratedPass] = useState<VisitorPass | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const { success: notifySuccess, info: notifyInfo } = useNotificationStore();

  // ── Verify form ──────────────────────────────────────
  const {
    register: registerVerify,
    handleSubmit: handleVerifySubmit,
    setValue: setVerifyValue,
    formState: { errors: verifyErrors },
  } = useForm<VerifyFormValues>({
    resolver: zodResolver(verifySchema),
    defaultValues: { passCode: '' },
  });

  // ── Register form ────────────────────────────────────
  const {
    register: registerForm,
    handleSubmit: handleRegisterSubmit,
    formState: { errors: registerErrors },
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      visitorName: '',
      visitorPhone: '',
      visitorEmail: '',
      purpose: '',
      destination: '',
      entryDate: '',
    },
  });

  // ── API query (only fires when searchCode is non-empty) ──
  const { data: apiResponse, isLoading, error: apiError } = useVerifyPass(searchCode);

  // ── Verify handlers ──────────────────────────────────
  const handleVerify = (values: VerifyFormValues) => {
    const code = values.passCode.toUpperCase().trim();
    setSearchCode(code);
    if (MOCK_PASSES[code]) {
      const mock = MOCK_PASSES[code];
      setDemoPass({
        ...mock,
        id: `pass_${code}`,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      });
      notifySuccess('Pass Verified', `Loaded pass for code ${code}`);
    } else {
      setDemoPass(null);
    }
  };

  const handleQRUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files?.[0]) return;
    setIsScanning(true);
    notifyInfo('Scanning QR code...', 'Analysing visitor pass image');
    setTimeout(() => {
      setIsScanning(false);
      const keys = Object.keys(MOCK_PASSES);
      const key = keys[Math.floor(Math.random() * keys.length)];
      setVerifyValue('passCode', key);
      setSearchCode(key);
      const mock = MOCK_PASSES[key];
      setDemoPass({
        ...mock,
        id: `pass_${key}`,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      });
      notifySuccess('QR Decoded', `Scanned passcode: ${key}`);
    }, 1500);
  };

  const clearVerify = () => {
    setSearchCode('');
    setVerifyValue('passCode', '');
    setDemoPass(null);
  };

  // ── Register handler ─────────────────────────────────
  const handleRegister = (values: RegisterFormValues) => {
    setIsGenerating(true);
    setTimeout(() => {
      const purposeLabel =
        PURPOSE_OPTIONS.find((p) => p.value === values.purpose)?.label ?? values.purpose;
      const destLabel =
        DESTINATION_OPTIONS.find((d) => d.value === values.destination)?.label ??
        values.destination;
      const code = `RC-${Math.random().toString(36).substring(2, 6).toUpperCase()}-${Date.now().toString(36).toUpperCase().slice(-4)}`;
      const entryIso = new Date(values.entryDate).toISOString();
      const expiryIso = new Date(new Date(values.entryDate).getTime() + 86400000).toISOString();

      const pass: VisitorPass = {
        id: `self_${Date.now()}`,
        visitorName: values.visitorName,
        visitorPhone: values.visitorPhone,
        visitorEmail: values.visitorEmail || undefined,
        purpose: `${purposeLabel} — ${destLabel}`,
        entryDate: entryIso,
        expiryDate: expiryIso,
        passCode: code,
        qrCode: code,
        status: 'APPROVED',
        residentId: 'self-register',
        estateId: 'redemption-city',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      setGeneratedPass(pass);
      setIsGenerating(false);
      notifySuccess('Pass Generated!', `Your entry code is ${code}`);
    }, 1200);
  };

  // ── Derived state ────────────────────────────────────
  const activeVerifyPass = demoPass ?? apiResponse?.data;
  const isVerifyError = !!apiError && !demoPass && !!searchCode;

  const tabs: { id: TabId; label: string; icon: React.ReactNode }[] = [
    {
      id: 'verify',
      label: 'Verify a Pass',
      icon: (
        <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-4.35-4.35M17 11A6 6 0 115 11a6 6 0 0112 0z"
          />
        </svg>
      ),
    },
    {
      id: 'register',
      label: 'Get Entry Pass',
      icon: (
        <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      ),
    },
  ];

  return (
    <div className="w-full max-w-2xl mx-auto space-y-6 px-2 sm:px-0">
      {/* Page header */}
      <div className="space-y-1">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          Visitor Gate Pass Hub
        </h1>
        <p className="text-sm sm:text-base text-slate-500 dark:text-slate-400">
          Verify an existing pass or register yourself for entry into Redemption City.
        </p>
      </div>

      {/* Tab bar */}
      <div className="flex rounded-xl bg-slate-100 dark:bg-slate-800/60 p-1 gap-1">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            id={`tab-${tab.id}`}
            onClick={() => {
              setActiveTab(tab.id);
              clearVerify();
              setGeneratedPass(null);
            }}
            className={`flex-1 flex items-center justify-center gap-2 py-2.5 px-3 text-sm font-semibold rounded-lg transition-all duration-200 ${
              activeTab === tab.id
                ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm'
                : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200'
            }`}
          >
            {tab.icon}
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {/* ── TAB 1: Verify ─────────────────────────────── */}
      {activeTab === 'verify' && (
        <div className="space-y-5">
          {!activeVerifyPass && (
            <Card className="shadow-md border border-slate-200/80 dark:border-slate-800/80">
              <CardBody className="space-y-5">
                <form onSubmit={handleVerifySubmit(handleVerify)} className="space-y-4">
                  <Input
                    label="Digital Passcode"
                    placeholder="e.g. DEMO-APPROVED or RC-XXXX-XXXX"
                    error={verifyErrors.passCode?.message}
                    hint="Try: DEMO-APPROVED, DEMO-PENDING, DEMO-EXPIRED, DEMO-DENIED, DEMO-USED"
                    {...registerVerify('passCode')}
                  />
                  <Button type="submit" fullWidth isLoading={isLoading}>
                    Verify Passcode
                  </Button>
                </form>

                {/* Divider */}
                <div className="flex items-center gap-3">
                  <div className="flex-grow border-t border-slate-200 dark:border-slate-700" />
                  <span className="text-xs font-semibold text-slate-400 uppercase tracking-widest">
                    or scan QR
                  </span>
                  <div className="flex-grow border-t border-slate-200 dark:border-slate-700" />
                </div>

                {/* QR drop zone */}
                <div className="relative">
                  {isScanning && (
                    <div className="absolute inset-0 z-10 rounded-xl bg-slate-900/70 flex flex-col items-center justify-center backdrop-blur-sm">
                      <div className="relative w-14 h-14">
                        <div className="absolute inset-0 rounded-full border-4 border-blue-500 border-t-transparent animate-spin" />
                        <div className="absolute inset-0 flex items-center justify-center text-blue-400 font-bold text-xs">
                          SCAN
                        </div>
                      </div>
                      <div className="absolute left-4 right-4 h-0.5 bg-blue-500 shadow-[0_0_12px_#3b82f6] top-1/2 animate-pulse" />
                      <p className="text-white text-sm font-medium mt-8">Reading QR Data...</p>
                    </div>
                  )}
                  <label className="group flex flex-col items-center justify-center w-full h-36 border-2 border-dashed border-slate-300 dark:border-slate-700 rounded-xl cursor-pointer hover:border-blue-500 dark:hover:border-blue-500 hover:bg-blue-50/30 dark:hover:bg-blue-950/10 transition-all duration-200">
                    <svg
                      className="w-9 h-9 mb-2 text-slate-300 group-hover:text-blue-500 transition-colors duration-200"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                    <p className="text-sm text-slate-500 dark:text-slate-400 text-center px-4">
                      <span className="text-blue-600 dark:text-blue-400 font-semibold">Upload</span>{' '}
                      or drag a QR pass image here
                    </p>
                    <p className="text-xs text-slate-400 mt-1">PNG, JPG supported</p>
                    <input
                      type="file"
                      className="hidden"
                      accept="image/*"
                      onChange={handleQRUpload}
                      disabled={isScanning}
                    />
                  </label>
                </div>
              </CardBody>
            </Card>
          )}

          {isVerifyError && (
            <Alert variant="error" title="Pass Not Found">
              No active pass found for <strong>{searchCode}</strong>. Check the code or contact your
              host resident.
              <div className="mt-3">
                <Button variant="outline" size="sm" onClick={clearVerify}>
                  Try Another Code
                </Button>
              </div>
            </Alert>
          )}

          {activeVerifyPass && (
            <PassCard pass={activeVerifyPass} onReset={clearVerify} accentColor="blue" />
          )}
        </div>
      )}

      {/* ── TAB 2: Self-Register ──────────────────────── */}
      {activeTab === 'register' && (
        <div className="space-y-5">
          {!generatedPass && (
            <Card className="shadow-md border border-slate-200/80 dark:border-slate-800/80">
              <CardBody className="space-y-5">
                <div className="flex items-start gap-3 bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-900/30 rounded-lg p-3.5">
                  <span className="text-xl shrink-0">ℹ️</span>
                  <p className="text-sm text-blue-800 dark:text-blue-300 leading-relaxed">
                    Fill in your details to generate a personal gate entry pass. No login required —
                    open to the public for church programmes, deliveries, and contractor work.
                  </p>
                </div>

                <form onSubmit={handleRegisterSubmit(handleRegister)} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Input
                      label="Full Name"
                      placeholder="First and last name"
                      error={registerErrors.visitorName?.message}
                      {...registerForm('visitorName')}
                      required
                    />
                    <Input
                      label="Phone Number"
                      placeholder="+234 800 000 0000"
                      error={registerErrors.visitorPhone?.message}
                      {...registerForm('visitorPhone')}
                      required
                    />
                  </div>

                  <Input
                    label="Email Address (Optional)"
                    placeholder="you@example.com"
                    error={registerErrors.visitorEmail?.message}
                    {...registerForm('visitorEmail')}
                  />

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Select
                      label="Purpose of Visit"
                      options={PURPOSE_OPTIONS}
                      placeholder="Select purpose..."
                      error={registerErrors.purpose?.message}
                      {...registerForm('purpose')}
                      required
                    />
                    <Select
                      label="Destination"
                      options={DESTINATION_OPTIONS}
                      placeholder="Select destination..."
                      error={registerErrors.destination?.message}
                      {...registerForm('destination')}
                      required
                    />
                  </div>

                  <Input
                    label="Entry Date & Time"
                    type="datetime-local"
                    error={registerErrors.entryDate?.message}
                    {...registerForm('entryDate')}
                    required
                  />

                  <Button type="submit" fullWidth isLoading={isGenerating} size="lg">
                    {isGenerating ? 'Generating Pass...' : 'Generate My Entry Pass'}
                  </Button>
                </form>
              </CardBody>
            </Card>
          )}

          {generatedPass && (
            <div className="space-y-4">
              <Alert variant="success" title="Your Pass is Ready!">
                Your self-registered gate pass has been generated. Download it and show the QR code
                at the main gatehouse when you arrive.
              </Alert>
              <PassCard
                pass={generatedPass}
                onReset={() => setGeneratedPass(null)}
                accentColor="emerald"
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
}
