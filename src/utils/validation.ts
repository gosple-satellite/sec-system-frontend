// ============================================================
// Validation Schemas (Zod)
// ============================================================

import { z } from 'zod';

export const loginSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

export const forgotPasswordSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
});

export const resetPasswordSchema = z
  .object({
    password: z
      .string()
      .min(8, 'Password must be at least 8 characters')
      .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
      .regex(/[0-9]/, 'Password must contain at least one number'),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  });

export const createVehicleSchema = z.object({
  plateNumber: z.string().min(5, 'Invalid plate number').max(10, 'Plate number too long'),
  make: z.string().min(2, 'Make is required'),
  model: z.string().min(1, 'Model is required'),
  color: z.string().min(2, 'Color is required'),
  year: z
    .number()
    .int()
    .min(1990, 'Year must be 1990 or later')
    .max(new Date().getFullYear() + 1, 'Invalid year'),
});

export const createVisitorPassSchema = z.object({
  visitorName: z.string().min(2, 'Visitor name must be at least 2 characters'),
  visitorPhone: z.string().regex(/^(\+234|0)[789][01]\d{8}$/, 'Invalid Nigerian phone number'),
  visitorEmail: z.string().email('Invalid email').optional().or(z.literal('')),
  purpose: z.string().min(10, 'Purpose must be at least 10 characters'),
  entryDate: z.string().min(1, 'Entry date is required'),
  expiryDate: z.string().optional(),
});

export type LoginFormData = z.infer<typeof loginSchema>;
export type ForgotPasswordFormData = z.infer<typeof forgotPasswordSchema>;
export type ResetPasswordFormData = z.infer<typeof resetPasswordSchema>;
export type CreateVehicleFormData = z.infer<typeof createVehicleSchema>;
export type CreateVisitorPassFormData = z.infer<typeof createVisitorPassSchema>;
