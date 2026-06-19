# RCCG Security Management System

> An enterprise-grade Security Management Platform for RCCG estates — built for scale, team collaboration, and long-term maintainability.

---

## Table of Contents

1. [Project Overview](#1-project-overview)
2. [Technology Stack](#2-technology-stack)
3. [Folder Structure](#3-folder-structure)
4. [Installation](#4-installation)
5. [Environment Variables](#5-environment-variables)
6. [Running the Development Server](#6-running-the-development-server)
7. [Build Process](#7-build-process)
8. [Coding Standards](#8-coding-standards)
9. [Git Workflow](#9-git-workflow)
10. [Branch Strategy](#10-branch-strategy)
11. [Team Responsibilities](#11-team-responsibilities)
12. [Feature Development Guide](#12-feature-development-guide)
13. [API Integration Guide](#13-api-integration-guide)
14. [Deployment Guide](#14-deployment-guide)

---

## 1. Project Overview

The **RCCG Security Management System** is a full-featured estate security platform serving three distinct user types:

| User Role      | Description                                      |
|----------------|--------------------------------------------------|
| **Super Admin** | Manages users, estates, reports, programs, and security controls |
| **Resident**    | Manages their own vehicles, visitor passes, smart card, and access history |
| **Visitor**     | Verifies their pass and checks their visit status |

### Key Features (Planned)
- 🔐 Role-based access control (RBAC)
- 🚗 Vehicle registration and management
- 🎫 Digital visitor pass generation (QR codes)
- 🪪 Smart card management
- 📋 Real-time access history logs
- 📊 Admin dashboards and reports
- 📅 Estate program management
- 🌙 Dark / Light / System theme

---

## 2. Technology Stack

| Category          | Technology                      | Version  |
|-------------------|---------------------------------|----------|
| UI Framework      | React                           | ^19      |
| Language          | TypeScript                      | ~6.0     |
| Build Tool        | Vite                            | ^8       |
| Routing           | React Router DOM                | ^7       |
| Server State      | TanStack Query (React Query)    | ^5       |
| HTTP Client       | Axios                           | ^1       |
| Client State      | Zustand                         | ^5       |
| Forms             | React Hook Form                 | ^7       |
| Validation        | Zod                             | ^4       |
| Styling           | Tailwind CSS                    | ^4       |
| Linting           | ESLint + typescript-eslint      | ^10/^8   |
| Formatting        | Prettier                        | ^3       |
| Git Hooks         | Husky + lint-staged             | ^9/^17   |
| Commit Convention | Commitlint                      | ^21      |

---

## 3. Folder Structure

```
src/
├── app/                        # Application-level concerns
│   ├── router/                 # Route definitions and 404 page
│   ├── providers/              # AppProviders (QueryClient, Router, Toast)
│   ├── layouts/                # AuthLayout, ResidentLayout, AdminLayout, PublicLayout
│   └── guards/                 # ProtectedRoute, GuestRoute
│
├── assets/                     # Static assets
│   ├── images/
│   ├── icons/
│   └── logos/
│
├── components/
│   ├── ui/                     # Design system: Button, Input, Table, Modal, etc.
│   ├── common/                 # Shared: Breadcrumb, ToastContainer
│   └── shared/                 # Feature-shared components (add as needed)
│
├── features/                   # Feature modules (co-located components, hooks, services)
│   ├── auth/                   # Login, ForgotPassword
│   ├── resident/               # Resident dashboard, vehicles, visitors, smart-card, history
│   ├── visitor/                # Verify pass, visitor status
│   └── admin/                  # Admin dashboard, users, estates, reports, programs, security
│
├── services/
│   ├── api/                    # Axios HTTP client, BaseApiService class
│   ├── auth/                   # AuthService (extends BaseApiService)
│   └── storage/                # StorageService (localStorage abstraction)
│
├── hooks/                      # Custom React hooks (useAuth, useDebounce, useDisclosure, etc.)
├── store/                      # Zustand stores (authStore, userStore, notificationStore, themeStore)
├── types/                      # TypeScript type definitions
│   ├── auth.types.ts
│   ├── api.types.ts
│   ├── domain.types.ts
│   └── ui.types.ts
├── constants/                  # App constants (routes, storage keys, roles)
├── utils/                      # Utility functions (helpers.ts, validation.ts)
├── config/                     # Environment configuration
├── styles/                     # Global CSS
└── vite-env.d.ts               # Vite env type declarations
```

---

## 4. Installation

### Prerequisites
- Node.js >= 18.0.0
- npm >= 9.0.0
- Git

### Setup

```bash
# 1. Clone the repository
git clone <repository-url>
cd rccg-sms

# 2. Install dependencies
npm install

# 3. Set up environment variables
cp .env.example .env

# 4. Edit .env with your API base URL
# VITE_API_BASE_URL=http://localhost:5000/api/v1

# 5. Start the development server
npm run dev
```

---

## 5. Environment Variables

Copy `.env.example` to `.env` and fill in the required values:

| Variable              | Description                     | Example                          |
|-----------------------|---------------------------------|----------------------------------|
| `VITE_API_BASE_URL`   | Backend API base URL            | `http://localhost:5000/api/v1`   |
| `VITE_APP_NAME`       | Application display name        | `RCCG Security Management System`|
| `VITE_APP_VERSION`    | Application version             | `1.0.0`                          |
| `VITE_APP_ENV`        | Environment (`development`, `staging`, `production`) | `development` |

> ⚠️ **Never commit `.env` files.** Only `.env.example` should be in version control.

---

## 6. Running the Development Server

```bash
npm run dev          # Start dev server at http://localhost:3000
npm run type-check   # Run TypeScript type checking
npm run lint         # Run ESLint
npm run lint:fix     # Auto-fix ESLint issues
npm run format       # Format with Prettier
npm run format:check # Check Prettier formatting
```

---

## 7. Build Process

```bash
# Production build
npm run build

# Preview production build locally
npm run preview
```

The build output is placed in `dist/`. The build process:
1. Runs TypeScript compilation (`tsc -b`)
2. Bundles with Vite (code splitting, tree shaking)
3. Outputs optimized assets to `dist/`

---

## 8. Coding Standards

### TypeScript
- **Strict mode** is enabled — no implicit `any`
- Use `type` for object shapes, `interface` for extendable structures
- Always use `import type` for type-only imports
- Prefer explicit return types on exported functions

### Components
- Use **named exports** for all components (no default exports)
- Use `forwardRef` for form elements that need refs
- Co-locate component types in the same file
- Use `displayName` for components using `forwardRef`

### Path Aliases
Use path aliases instead of relative imports:

```ts
// ✅ Good
import { Button } from '@components/ui';
import { useAuth } from '@hooks/useAuth';
import type { User } from '@/types';

// ❌ Bad
import { Button } from '../../../components/ui';
```

### Available Aliases
| Alias          | Resolves To      |
|----------------|------------------|
| `@/*`          | `src/*`          |
| `@app/*`       | `src/app/*`      |
| `@components/*`| `src/components/*`|
| `@features/*`  | `src/features/*` |
| `@services/*`  | `src/services/*` |
| `@hooks/*`     | `src/hooks/*`    |
| `@store/*`     | `src/store/*`    |
| `@utils/*`     | `src/utils/*`    |
| `@config/*`    | `src/config/*`   |
| `@constants/*` | `src/constants/*`|
| `@styles/*`    | `src/styles/*`   |

### Naming Conventions
| Item           | Convention         | Example                   |
|----------------|--------------------|---------------------------|
| Components     | PascalCase         | `VehicleCard.tsx`         |
| Hooks          | camelCase + `use`  | `useVehicles.ts`          |
| Services       | camelCase + `.service` | `vehicle.service.ts`  |
| Types          | PascalCase + `Type`| `VehicleType`             |
| Constants      | SCREAMING_SNAKE    | `MAX_VEHICLES`            |
| Zustand stores | camelCase + `Store`| `vehicleStore.ts`         |

---

## 9. Git Workflow

### Commit Convention

This project enforces **Conventional Commits** via `commitlint`. Every commit must follow this format:

```
<type>(<scope>): <description>

[optional body]

[optional footer]
```

**Allowed types:**

| Type       | Usage                                          |
|------------|------------------------------------------------|
| `feat`     | A new feature                                  |
| `fix`      | A bug fix                                      |
| `docs`     | Documentation changes                          |
| `style`    | Formatting, missing semicolons (no logic change)|
| `refactor` | Code change that neither fixes nor adds feature|
| `test`     | Adding or fixing tests                         |
| `chore`    | Tooling, dependencies, build process changes   |
| `perf`     | Performance improvements                        |
| `ci`       | CI/CD configuration changes                    |

**Examples:**
```bash
git commit -m "feat(auth): implement login form with role-based redirect"
git commit -m "fix(vehicles): correct plate number validation regex"
git commit -m "chore(deps): upgrade tanstack-query to v5.101"
git commit -m "docs(readme): add API integration guide section"
```

### Pre-commit Hooks
Husky runs automatically on every commit:
1. **pre-commit**: Runs `lint-staged` (ESLint + Prettier on staged files)
2. **commit-msg**: Validates commit message with `commitlint`

---

## 10. Branch Strategy

```
main                  ← Production-ready code (protected)
├── develop           ← Integration branch (PR target for features)
│   ├── feature/auth-login           ← Feature branches
│   ├── feature/resident-vehicles
│   ├── feature/admin-dashboard
│   ├── fix/visitor-pass-validation  ← Bug fix branches
│   └── chore/update-dependencies    ← Chore branches
└── release/1.0.0     ← Release preparation
```

### Branch Naming Rules
```
feature/<short-description>   → New feature
fix/<short-description>        → Bug fix
chore/<short-description>      → Tooling/config
docs/<short-description>       → Documentation
refactor/<short-description>   → Code refactoring
```

### Pull Request Process
1. Branch from `develop`
2. Open PR targeting `develop`
3. All CI checks must pass (type-check, lint, format)
4. At least 1 reviewer approval required
5. Squash merge to `develop`
6. Deploy `develop` → `staging` → `main` (production)

---

## 11. Team Responsibilities

### Developer 1 — Lead Frontend (Architecture Owner)
**Primary ownership:**
- `src/app/` — Router, guards, layouts, providers
- `src/services/` — HTTP client, auth service, storage service
- `src/store/` — All Zustand stores
- `src/components/ui/` — Design system components
- `src/components/common/` — Shared components (Breadcrumb, Toast)
- `src/hooks/` — Core hooks (useAuth, useDisclosure, etc.)
- `src/types/` — Type definitions
- `src/constants/` — Application constants
- `src/config/` — Environment configuration
- `src/utils/` — Utilities and validation schemas
- `src/features/auth/` — Login, Forgot Password pages

---

### Developer 2 — Resident Module
**Primary ownership:**
- `src/features/resident/dashboard/`
- `src/features/resident/vehicles/`
- `src/features/resident/visitors/`
- `src/features/resident/smart-card/`
- `src/features/resident/access-history/`

**Domain services to build:**
```ts
// src/services/api/
vehicle.service.ts     // extends BaseApiService('/vehicles')
visitor.service.ts     // extends BaseApiService('/visitor-passes')
smartCard.service.ts   // extends BaseApiService('/smart-cards')
access.service.ts      // extends BaseApiService('/access-records')
```

---

### Developer 3 — Admin Module
**Primary ownership:**
- `src/features/admin/dashboard/`
- `src/features/admin/users/`
- `src/features/admin/estates/`
- `src/features/admin/reports/`
- `src/features/admin/programs/`
- `src/features/admin/security/`

**Domain services to build:**
```ts
// src/services/api/
user.service.ts       // extends BaseApiService('/users')
estate.service.ts     // extends BaseApiService('/estates')
report.service.ts     // extends BaseApiService('/reports')
program.service.ts    // extends BaseApiService('/programs')
```

---

## 12. Feature Development Guide

### Creating a New Feature Service

1. **Create the service** (extend `BaseApiService`):

```ts
// src/services/api/vehicle.service.ts
import { BaseApiService } from './base.service';
import type { Vehicle, CreateVehiclePayload } from '@/types';
import type { ApiResponse, PaginatedResponse, PaginationParams } from '@/types';

class VehicleService extends BaseApiService {
  constructor() {
    super('/vehicles');
  }

  async getMyVehicles(params?: PaginationParams): Promise<PaginatedResponse<Vehicle>> {
    return this.getList<Vehicle>('', params);
  }

  async createVehicle(payload: CreateVehiclePayload): Promise<ApiResponse<Vehicle>> {
    return this.post<Vehicle, CreateVehiclePayload>('', payload);
  }

  async deleteVehicle(id: string): Promise<ApiResponse<null>> {
    return this.delete(`/${id}`);
  }
}

export const vehicleService = new VehicleService();
```

2. **Create a TanStack Query hook:**

```ts
// src/features/resident/vehicles/hooks/useVehicles.ts
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { vehicleService } from '@services/api/vehicle.service';
import { useNotificationStore } from '@store/notificationStore';

const VEHICLE_KEYS = {
  all: ['vehicles'] as const,
  lists: () => [...VEHICLE_KEYS.all, 'list'] as const,
};

export function useVehicles() {
  return useQuery({
    queryKey: VEHICLE_KEYS.lists(),
    queryFn: () => vehicleService.getMyVehicles(),
  });
}

export function useCreateVehicle() {
  const queryClient = useQueryClient();
  const { success, error } = useNotificationStore();

  return useMutation({
    mutationFn: vehicleService.createVehicle.bind(vehicleService),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: VEHICLE_KEYS.lists() });
      success('Vehicle Added', 'Your vehicle has been registered.');
    },
    onError: (err: { message?: string }) => {
      error('Failed', err.message || 'Could not add vehicle.');
    },
  });
}
```

3. **Build the page component** in `src/features/resident/vehicles/VehiclesPage.tsx`

### Using UI Components

```tsx
import { Button, Input, Table, Modal, Badge } from '@components/ui';
import { useDisclosure } from '@hooks/useDisclosure';

export function VehiclesPage() {
  const { isOpen, open, close } = useDisclosure();

  return (
    <>
      <Button onClick={open} leftIcon={<span>+</span>}>Add Vehicle</Button>
      
      <Table
        columns={[
          { key: 'plateNumber', header: 'Plate Number' },
          { key: 'make', header: 'Make' },
          { key: 'status', header: 'Status', render: (val) => (
            <Badge variant={val === 'ACTIVE' ? 'success' : 'default'}>{val}</Badge>
          )},
        ]}
        data={vehicles}
        isLoading={isLoading}
      />

      <Modal isOpen={isOpen} onClose={close} title="Add Vehicle">
        {/* Form here */}
      </Modal>
    </>
  );
}
```

---

## 13. API Integration Guide

### Request/Response Contract

All API responses follow this shape:

```ts
// Single resource
{
  "success": true,
  "message": "Vehicle retrieved",
  "data": { ... },
  "timestamp": "2026-06-19T12:00:00Z"
}

// Paginated list
{
  "success": true,
  "message": "Vehicles retrieved",
  "data": [ ... ],
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 45,
    "totalPages": 5,
    "hasNext": true,
    "hasPrev": false
  },
  "timestamp": "2026-06-19T12:00:00Z"
}

// Error
{
  "success": false,
  "message": "Validation failed",
  "errors": { "plateNumber": ["Plate number already exists"] },
  "statusCode": 422,
  "timestamp": "2026-06-19T12:00:00Z"
}
```

### Authentication Flow
1. User logs in → receives `accessToken` + `refreshToken`
2. All protected requests include `Authorization: Bearer <accessToken>`
3. On 401 → HTTP client automatically refreshes using `refreshToken`
4. On refresh failure → user is logged out and redirected to `/auth/login`

---

## 14. Deployment Guide

### Environment Configuration

| Environment | Branch   | API Base URL                        |
|-------------|----------|-------------------------------------|
| Development | local    | `http://localhost:5000/api/v1`      |
| Staging     | develop  | `https://api-staging.rccgsms.com/v1`|
| Production  | main     | `https://api.rccgsms.com/v1`        |

### Build & Deploy Steps

```bash
# 1. Build for production
npm run build

# 2. Output is in /dist — deploy to your hosting provider

# Vercel / Netlify / Cloudflare Pages
# → Connect repo, set VITE_* environment variables in dashboard
# → Set build command: npm run build
# → Set output directory: dist
# → Ensure SPA redirect rule: /* → /index.html (200)
```

### Netlify `_redirects` (for SPA routing)
```
/*    /index.html   200
```

### Vercel `vercel.json`
```json
{
  "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }]
}
```

---

## License

Proprietary — All rights reserved © 2026 RCCG Security Management System
