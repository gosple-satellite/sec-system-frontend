// ============================================================
// Domain-specific Types for RCCG Security Management
// ============================================================

import type { User } from './auth.types';

// --- Estate ---
export interface Estate {
  id: string;
  name: string;
  address: string;
  city: string;
  state: string;
  adminId: string;
  admin?: User;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

// --- Vehicle ---
export type VehicleStatus = 'ACTIVE' | 'INACTIVE';

export interface Vehicle {
  id: string;
  plateNumber: string;
  make: string;
  model: string;
  color: string;
  year: number;
  status: VehicleStatus;
  residentId: string;
  estateId: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateVehiclePayload {
  plateNumber: string;
  make: string;
  model: string;
  color: string;
  year: number;
}

// --- Visitor ---
export type VisitorStatus = 'PENDING' | 'APPROVED' | 'DENIED' | 'EXPIRED' | 'USED';

export interface VisitorPass {
  id: string;
  visitorName: string;
  visitorPhone: string;
  visitorEmail?: string;
  purpose: string;
  entryDate: string;
  expiryDate: string;
  passCode: string;
  qrCode: string;
  status: VisitorStatus;
  residentId: string;
  estateId: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateVisitorPassPayload {
  visitorName: string;
  visitorPhone: string;
  visitorEmail?: string;
  purpose: string;
  entryDate: string;
  expiryDate?: string;
}

// --- Smart Card ---
export type SmartCardStatus = 'ACTIVE' | 'INACTIVE' | 'LOST' | 'EXPIRED';

export interface SmartCard {
  id: string;
  cardNumber: string;
  status: SmartCardStatus;
  residentId: string;
  expiryDate: string;
  issuedAt: string;
  createdAt: string;
  updatedAt: string;
}

// --- Access History ---
export type AccessType = 'ENTRY' | 'EXIT';
export type AccessMethod = 'QR_CODE' | 'SMART_CARD' | 'MANUAL';

export interface AccessRecord {
  id: string;
  accessType: AccessType;
  method: AccessMethod;
  timestamp: string;
  userId?: string;
  user?: User;
  visitorPassId?: string;
  visitorPass?: VisitorPass;
  vehicleId?: string;
  vehicle?: Vehicle;
  estateId: string;
  guardId: string;
  notes?: string;
}

// --- Program ---
export type ProgramStatus = 'UPCOMING' | 'ONGOING' | 'COMPLETED' | 'CANCELLED';

export interface Program {
  id: string;
  title: string;
  description: string;
  startDate: string;
  endDate: string;
  venue: string;
  status: ProgramStatus;
  estateId: string;
  createdBy: string;
  maxAttendees?: number;
  createdAt: string;
  updatedAt: string;
}

// --- Notification ---
export type NotificationType = 'INFO' | 'SUCCESS' | 'WARNING' | 'ERROR';

export interface Notification {
  id: string;
  type: NotificationType;
  title: string;
  message: string;
  isRead: boolean;
  userId: string;
  createdAt: string;
}

// --- Report ---
export interface ReportSummary {
  totalVisitors: number;
  totalVehicles: number;
  totalResidents: number;
  totalAccessToday: number;
  pendingPasses: number;
  activeGuards: number;
}
