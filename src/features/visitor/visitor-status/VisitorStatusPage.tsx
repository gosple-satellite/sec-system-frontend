// ============================================================
// Visitor Status - Visitor Module
// ============================================================

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Input,
  Button,
  Badge,
  Alert,
} from '@components/ui';
import { useVisitorStatus } from '../hooks/useVisitor';
import { formatDateTime } from '@utils/helpers';
import { useNotificationStore } from '@store/notificationStore';
import type { VisitorPass, VisitorStatus } from '@/types';

// Zod schema for validation
const statusSearchSchema = z.object({
  searchQuery: z.string().min(3, 'Search query must be at least 3 characters').trim(),
});

type StatusFormValues = z.infer<typeof statusSearchSchema>;

// Mock data aligned with VerifyPassPage
const MOCK_PASSES: Record<string, Omit<VisitorPass, 'id'>> = {
  'DEMO-APPROVED': {
    visitorName: 'John Doe',
    visitorPhone: '+234 803 123 4567',
    visitorEmail: 'john.doe@example.com',
    purpose: 'Personal Visit / Family Reunion',
    entryDate: '2026-06-19T10:00:00.000Z',
    expiryDate: '2026-06-20T10:00:00.000Z',
    passCode: 'DEMO-APPROVED',
    qrCode: 'https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=DEMO-APPROVED',
    status: 'APPROVED',
    residentId: 'res_123',
    estateId: 'estate_abc',
    createdAt: '2026-06-19T09:00:00.000Z',
    updatedAt: '2026-06-19T09:30:00.000Z',
  },
  'DEMO-PENDING': {
    visitorName: 'Jane Smith',
    visitorPhone: '+234 812 987 6543',
    visitorEmail: 'jane.smith@example.com',
    purpose: 'Deliver Courier Packages',
    entryDate: '2026-06-19T14:00:00.000Z',
    expiryDate: '2026-06-19T16:00:00.000Z',
    passCode: 'DEMO-PENDING',
    qrCode: 'https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=DEMO-PENDING',
    status: 'PENDING',
    residentId: 'res_123',
    estateId: 'estate_abc',
    createdAt: '2026-06-19T12:00:00.000Z',
    updatedAt: '2026-06-19T12:00:00.000Z',
  },
  'DEMO-EXPIRED': {
    visitorName: 'David Alao',
    visitorPhone: '+234 905 444 3333',
    visitorEmail: 'david.alao@example.com',
    purpose: 'Maintenance Work (Plumbing)',
    entryDate: '2026-06-17T08:00:00.000Z',
    expiryDate: '2026-06-18T08:00:00.000Z',
    passCode: 'DEMO-EXPIRED',
    qrCode: 'https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=DEMO-EXPIRED',
    status: 'EXPIRED',
    residentId: 'res_123',
    estateId: 'estate_abc',
    createdAt: '2026-06-17T07:00:00.000Z',
    updatedAt: '2026-06-17T07:00:00.000Z',
  },
  'DEMO-DENIED': {
    visitorName: 'Robert Vance',
    visitorPhone: '+234 701 555 7777',
    visitorEmail: 'robert.vance@example.com',
    purpose: 'Business meeting',
    entryDate: '2026-06-19T10:00:00.000Z',
    expiryDate: '2026-06-20T10:00:00.000Z',
    passCode: 'DEMO-DENIED',
    qrCode: 'https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=DEMO-DENIED',
    status: 'DENIED',
    residentId: 'res_123',
    estateId: 'estate_abc',
    createdAt: '2026-06-19T09:00:00.000Z',
    updatedAt: '2026-06-19T09:15:00.000Z',
  },
  'DEMO-USED': {
    visitorName: 'Grace Omowunmi',
    visitorPhone: '+234 809 222 1111',
    visitorEmail: 'grace.o@example.com',
    purpose: 'Church Fellowship Attendance',
    entryDate: '2026-06-19T08:00:00.000Z',
    expiryDate: '2026-06-19T14:00:00.000Z',
    passCode: 'DEMO-USED',
    qrCode: 'https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=DEMO-USED',
    status: 'USED',
    residentId: 'res_123',
    estateId: 'estate_abc',
    createdAt: '2026-06-19T07:00:00.000Z',
    updatedAt: '2026-06-19T13:00:00.000Z',
  },
};

interface StepItem {
  title: string;
  description: string;
  status: 'complete' | 'active' | 'upcoming' | 'error';
  date?: string;
  notes?: string;
}

export function VisitorStatusPage() {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [demoPass, setDemoPass] = useState<VisitorPass | null>(null);

  const { success: notifySuccess } = useNotificationStore();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<StatusFormValues>({
    resolver: zodResolver(statusSearchSchema),
    defaultValues: { searchQuery: '' },
  });

  // Query hook to fetch status
  const { data: apiResponse, isLoading, error: apiError } = useVisitorStatus(searchQuery);

  const handleSearch = (values: StatusFormValues) => {
    const query = values.searchQuery.toUpperCase().trim();
    setSearchQuery(query);

    // Look for demo codes first
    if (MOCK_PASSES[query]) {
      const mockObj = MOCK_PASSES[query];
      setDemoPass({
        ...mockObj,
        id: `pass_${query}`,
      } as VisitorPass);
      notifySuccess('Status Loaded', `Displaying pass history for ${query}`);
    } else {
      setDemoPass(null);
    }
  };

  const clearSearch = () => {
    setSearchQuery('');
    setValue('searchQuery', '');
    setDemoPass(null);
  };

  // Resolve what pass data to show
  const activePass = demoPass || apiResponse?.data;
  const isError = apiError && !demoPass;

  // Build the dynamic stepper timeline items based on the visitor status
  const getTimelineSteps = (pass: VisitorPass): StepItem[] => {
    const createdTime = formatDateTime(pass.createdAt);
    const steps: StepItem[] = [];

    // Step 1: Created (All passes start here)
    steps.push({
      title: 'Pass Requested',
      description: 'Pass generated by the resident host.',
      status: 'complete',
      date: createdTime,
    });

    switch (pass.status) {
      case 'PENDING':
        steps.push({
          title: 'Host Approval',
          description: 'Awaiting clearance from Resident Host or Estate Admin.',
          status: 'active',
        });
        steps.push({
          title: 'Gate Check-in',
          description: 'Visitor arrival & security check-in validation.',
          status: 'upcoming',
        });
        steps.push({
          title: 'Gate Check-out',
          description: 'Visitor departure record.',
          status: 'upcoming',
        });
        break;

      case 'APPROVED':
        steps.push({
          title: 'Pass Approved',
          description: 'Cleared for estate entry.',
          status: 'complete',
          date: formatDateTime(pass.updatedAt),
        });
        steps.push({
          title: 'Gate Check-in',
          description: 'Awaiting arrival at security checkpoint.',
          status: 'active',
        });
        steps.push({
          title: 'Gate Check-out',
          description: 'Visitor departure record.',
          status: 'upcoming',
        });
        break;

      case 'DENIED':
        steps.push({
          title: 'Pass Denied',
          description: 'Entry denied by the host resident.',
          status: 'error',
          date: formatDateTime(pass.updatedAt),
          notes: 'Security alert: Access declined. Gate will not authorize entry.',
        });
        steps.push({
          title: 'Gate Check-in',
          description: 'Verification cancelled.',
          status: 'upcoming',
        });
        break;

      case 'EXPIRED':
        steps.push({
          title: 'Pass Approved',
          description: 'Pass was cleared for entry.',
          status: 'complete',
          date: formatDateTime(pass.createdAt),
        });
        steps.push({
          title: 'Validity Expired',
          description: 'Pass validity duration has expired before entry.',
          status: 'error',
          date: formatDateTime(pass.expiryDate),
          notes: 'This pass exceeded its expiration limit. Please generate a new pass.',
        });
        break;

      case 'USED':
        steps.push({
          title: 'Pass Approved',
          description: 'Cleared for estate entry.',
          status: 'complete',
          date: formatDateTime(pass.createdAt),
        });
        steps.push({
          title: 'Gate Checked In',
          description: 'Visitor check-in authorized at Main Gatehouse.',
          status: 'complete',
          date: formatDateTime(pass.entryDate),
          notes: 'Checked in by Officer Kolawole. Vehicle plate number logged.',
        });
        steps.push({
          title: 'Gate Checked Out',
          description: 'Visitor departure registered.',
          status: 'complete',
          date: formatDateTime(pass.updatedAt),
          notes: 'Visitor left the estate premises. Gate pass deactivated.',
        });
        break;
    }

    return steps;
  };

  // Map status badges
  const getStatusBadge = (status: VisitorStatus) => {
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
            Completed
          </Badge>
        );
      default:
        return <Badge variant="default">{status}</Badge>;
    }
  };

  return (
    <div className="space-y-8 max-w-2xl mx-auto">
      <div>
        <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          Track Visit Status
        </h1>
        <p className="text-slate-500 dark:text-slate-400 mt-2">
          Check the authorization lifecycle and real-time gate log of a visitor gate pass.
        </p>
      </div>

      {!activePass && (
        <Card className="border border-slate-200/80 dark:border-slate-800/80 shadow-md">
          <CardBody className="p-1">
            <form onSubmit={handleSubmit(handleSearch)} className="space-y-4">
              <Input
                label="Search Pass"
                placeholder="Enter Passcode (e.g. DEMO-APPROVED, DEMO-USED)"
                error={errors.searchQuery?.message}
                {...register('searchQuery')}
                hint="Tip: Search 'DEMO-APPROVED' or 'DEMO-USED' to view dynamic timeline transitions."
              />
              <Button type="submit" fullWidth isLoading={isLoading} className="mt-2">
                Track Status
              </Button>
            </form>
          </CardBody>
        </Card>
      )}

      {isError && (
        <Alert variant="error" title="No Records Found" className="shadow-xs">
          No visitor log found for passcode or query "**{searchQuery}**". Make sure the code is
          typed correctly.
          <div className="mt-3">
            <Button variant="outline" size="sm" onClick={clearSearch}>
              Try Again
            </Button>
          </div>
        </Alert>
      )}

      {activePass && (
        <div className="space-y-6">
          {/* Header Card */}
          <Card className="border border-slate-200 dark:border-slate-800 shadow-lg">
            <CardBody className="p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div>
                <span className="text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
                  Visitor Information
                </span>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mt-0.5">
                  {activePass.visitorName}
                </h3>
                <p className="text-sm text-slate-500 dark:text-slate-400 mt-0.5">
                  Purpose: {activePass.purpose}
                </p>
              </div>
              <div className="flex flex-col md:items-end gap-1.5 shrink-0">
                {getStatusBadge(activePass.status)}
                <span className="text-xs font-mono text-slate-500 bg-slate-100 dark:bg-slate-800 dark:text-slate-400 px-2 py-0.5 rounded border border-slate-200 dark:border-slate-700">
                  {activePass.passCode}
                </span>
              </div>
            </CardBody>
          </Card>

          {/* Stepper Timeline Card */}
          <Card className="border border-slate-200 dark:border-slate-800 shadow-xl p-6 md:p-8">
            <CardHeader
              title="Pass Lifecycle Timeline"
              subtitle="Real-time authorization and gatehouse logs"
            />

            <div className="mt-8 relative border-l-2 border-slate-200 dark:border-slate-700 ml-4 space-y-8 pb-2">
              {getTimelineSteps(activePass).map((step, idx) => (
                <div key={idx} className="relative pl-8">
                  {/* Bullet indicator */}
                  <div className="absolute -left-[11px] top-1.5">
                    {step.status === 'complete' && (
                      <span className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-500 text-white ring-4 ring-white dark:ring-slate-800">
                        <svg
                          className="h-3.5 w-3.5"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={3}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                      </span>
                    )}
                    {step.status === 'active' && (
                      <span className="relative flex h-5 w-5 items-center justify-center rounded-full bg-blue-600 ring-4 ring-white dark:ring-slate-800">
                        <span className="absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75 animate-ping" />
                        <span className="relative h-2 w-2 rounded-full bg-white" />
                      </span>
                    )}
                    {step.status === 'error' && (
                      <span className="flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-white ring-4 ring-white dark:ring-slate-800">
                        <svg
                          className="h-3.5 w-3.5"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={3}
                            d="M6 18L18 6M6 6l12 12"
                          />
                        </svg>
                      </span>
                    )}
                    {step.status === 'upcoming' && (
                      <span className="flex h-5 w-5 items-center justify-center rounded-full border-2 border-slate-300 bg-white dark:border-slate-600 dark:bg-slate-800 ring-4 ring-white dark:ring-slate-800">
                        <span className="h-1.5 w-1.5 rounded-full bg-slate-300 dark:bg-slate-600" />
                      </span>
                    )}
                  </div>

                  {/* Step content */}
                  <div className="space-y-1">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                      <h4
                        className={`text-base font-bold ${
                          step.status === 'complete'
                            ? 'text-slate-900 dark:text-white'
                            : step.status === 'active'
                              ? 'text-blue-600 dark:text-blue-400 font-extrabold'
                              : step.status === 'error'
                                ? 'text-red-500'
                                : 'text-slate-400 dark:text-slate-500 font-medium'
                        }`}
                      >
                        {step.title}
                      </h4>
                      {step.date && (
                        <span className="text-xs font-mono text-slate-400 dark:text-slate-500">
                          {step.date}
                        </span>
                      )}
                    </div>
                    <p
                      className={`text-sm ${
                        step.status === 'upcoming'
                          ? 'text-slate-400 dark:text-slate-600'
                          : 'text-slate-500 dark:text-slate-400'
                      }`}
                    >
                      {step.description}
                    </p>

                    {step.notes && (
                      <div
                        className={`mt-2 p-2.5 rounded-lg text-xs font-medium border ${
                          step.status === 'error'
                            ? 'bg-red-50 dark:bg-red-950/20 border-red-200 dark:border-red-900/30 text-red-700 dark:text-red-400'
                            : 'bg-slate-50 dark:bg-slate-800/40 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400'
                        }`}
                      >
                        {step.notes}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <CardFooter className="mt-8 flex justify-start pl-0 border-t border-slate-200 dark:border-slate-700 pt-6">
              <Button variant="outline" size="sm" onClick={clearSearch}>
                Track Another Pass
              </Button>
            </CardFooter>
          </Card>
        </div>
      )}
    </div>
  );
}
