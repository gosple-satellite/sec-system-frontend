// ============================================================
// Application Constants
// ============================================================

export const APP_NAME = 'RCCG Security Management System';
export const APP_SHORT_NAME = 'RCCG SMS';
export const APP_VERSION = '1.0.0';

// Storage Keys
export const STORAGE_KEYS = {
  ACCESS_TOKEN: 'rccg_access_token',
  REFRESH_TOKEN: 'rccg_refresh_token',
  USER: 'rccg_user',
  THEME: 'rccg_theme',
} as const;

// Routes
export const ROUTES = {
  // Auth
  AUTH: {
    LOGIN: '/auth/login',
    FORGOT_PASSWORD: '/auth/forgot-password',
    RESET_PASSWORD: '/auth/reset-password',
  },
  // Visitor (Public)
  VISITOR: {
    PASS: '/visitor/pass',
    STATUS: '/visitor/status',
  },
  // Resident
  RESIDENT: {
    DASHBOARD: '/resident/dashboard',
    VEHICLES: '/resident/vehicles',
    VEHICLES_CREATE: '/resident/vehicles/create',
    VISITORS: '/resident/visitors',
    VISITORS_CREATE: '/resident/visitors/create',
    ACCESS_HISTORY: '/resident/access-history',
    SMART_CARD: '/resident/smart-card',
  },
  // Admin
  ADMIN: {
    DASHBOARD: '/admin/dashboard',
    USERS: '/admin/users',
    ESTATES: '/admin/estates',
    REPORTS: '/admin/reports',
    PROGRAMS: '/admin/programs',
    SECURITY: '/admin/security',
  },
} as const;

// User Roles
export const USER_ROLES = {
  SUPER_ADMIN: 'SUPER_ADMIN',
  RESIDENT: 'RESIDENT',
  VISITOR: 'VISITOR',
} as const;

// Pagination
export const DEFAULT_PAGE_SIZE = 10;
export const PAGE_SIZE_OPTIONS = [10, 20, 50, 100];

// Date Formats
export const DATE_FORMAT = 'dd/MM/yyyy';
export const DATE_TIME_FORMAT = 'dd/MM/yyyy HH:mm';
export const TIME_FORMAT = 'HH:mm';

// API
export const API_TIMEOUT = 30000; // 30 seconds
export const REFRESH_TOKEN_RETRY_LIMIT = 3;
