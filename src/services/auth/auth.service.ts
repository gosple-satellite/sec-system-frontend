// ============================================================
// Authentication API Service
// ============================================================

import { BaseApiService } from '@services/api';
import type {
  ApiResponse,
  User,
  AuthTokens,
  LoginCredentials,
  ForgotPasswordPayload,
  ResetPasswordPayload,
} from '@/types';

interface LoginResponse {
  user: User;
  tokens: AuthTokens;
}

class AuthService extends BaseApiService {
  constructor() {
    super('/auth');
  }

  async login(credentials: LoginCredentials): Promise<ApiResponse<LoginResponse>> {
    return this.post<LoginResponse, LoginCredentials>('/login', credentials);
  }

  async logout(): Promise<ApiResponse<null>> {
    return this.post<null, Record<string, never>>('/logout', {});
  }

  async forgotPassword(payload: ForgotPasswordPayload): Promise<ApiResponse<null>> {
    return this.post<null, ForgotPasswordPayload>('/forgot-password', payload);
  }

  async resetPassword(payload: ResetPasswordPayload): Promise<ApiResponse<null>> {
    return this.post<null, ResetPasswordPayload>('/reset-password', payload);
  }

  async getProfile(): Promise<ApiResponse<User>> {
    return this.get<User>('/me');
  }

  async refreshTokens(refreshToken: string): Promise<ApiResponse<AuthTokens>> {
    return this.post<AuthTokens, { refreshToken: string }>('/refresh', { refreshToken });
  }
}

export const authService = new AuthService();
