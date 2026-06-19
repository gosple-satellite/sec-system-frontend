// ============================================================
// Axios HTTP Client - Core Configuration
// ============================================================

import axios from 'axios';
import type { AxiosInstance, AxiosRequestConfig, InternalAxiosRequestConfig } from 'axios';
import { envConfig } from '@config/index';
import { storageService } from '@services/storage';
import { API_TIMEOUT, ROUTES } from '@constants/index';
import type { ApiError } from '@/types';

// ─── Refresh Token Queue ────────────────────────────────────
let isRefreshing = false;
let failedQueue: Array<{
  resolve: (token: string) => void;
  reject: (error: unknown) => void;
}> = [];

function processQueue(error: unknown, token: string | null = null) {
  failedQueue.forEach(({ resolve, reject }) => {
    if (error) {
      reject(error);
    } else {
      resolve(token!);
    }
  });
  failedQueue = [];
}

// ─── Create Axios Instance ──────────────────────────────────
const httpClient: AxiosInstance = axios.create({
  baseURL: envConfig.apiBaseUrl,
  timeout: API_TIMEOUT,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

// ─── Request Interceptor ───────────────────────────────────
httpClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = storageService.getAccessToken();
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// ─── Response Interceptor ──────────────────────────────────
httpClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config as AxiosRequestConfig & { _retry?: boolean };

    // Handle 401 - Token Expired → Refresh
    if (error.response?.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then((token) => {
            originalRequest.headers = {
              ...originalRequest.headers,
              Authorization: `Bearer ${token}`,
            };
            return httpClient(originalRequest);
          })
          .catch((err) => Promise.reject(err));
      }

      originalRequest._retry = true;
      isRefreshing = true;

      const refreshToken = storageService.getRefreshToken();
      if (!refreshToken) {
        storageService.clearAll();
        window.location.href = ROUTES.AUTH.LOGIN;
        return Promise.reject(error);
      }

      try {
        const { data } = await axios.post(`${envConfig.apiBaseUrl}/auth/refresh`, {
          refreshToken,
        });

        const { accessToken, refreshToken: newRefreshToken } = data.data;
        storageService.setAccessToken(accessToken);
        storageService.setRefreshToken(newRefreshToken);

        processQueue(null, accessToken);
        originalRequest.headers = {
          ...originalRequest.headers,
          Authorization: `Bearer ${accessToken}`,
        };
        return httpClient(originalRequest);
      } catch (refreshError) {
        processQueue(refreshError, null);
        storageService.clearAll();
        window.location.href = ROUTES.AUTH.LOGIN;
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    // Normalize error response
    const apiError: ApiError = {
      success: false,
      message: error.response?.data?.message || 'An unexpected error occurred',
      errors: error.response?.data?.errors,
      statusCode: error.response?.status || 500,
      timestamp: new Date().toISOString(),
    };

    return Promise.reject(apiError);
  }
);

export { httpClient };
