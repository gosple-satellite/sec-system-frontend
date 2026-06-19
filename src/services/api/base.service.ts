// ============================================================
// Generic API Service - Base Class for all feature services
// ============================================================

import { httpClient } from './http-client';
import type { ApiResponse, PaginatedResponse, PaginationParams } from '@/types';

export class BaseApiService {
  protected readonly basePath: string;

  constructor(basePath: string) {
    this.basePath = basePath;
  }

  protected async get<T>(path: string, params?: PaginationParams): Promise<ApiResponse<T>> {
    const response = await httpClient.get<ApiResponse<T>>(`${this.basePath}${path}`, { params });
    return response.data;
  }

  protected async getList<T>(
    path: string,
    params?: PaginationParams
  ): Promise<PaginatedResponse<T>> {
    const response = await httpClient.get<PaginatedResponse<T>>(`${this.basePath}${path}`, {
      params,
    });
    return response.data;
  }

  protected async getById<T>(id: string): Promise<ApiResponse<T>> {
    const response = await httpClient.get<ApiResponse<T>>(`${this.basePath}/${id}`);
    return response.data;
  }

  protected async post<T, P = unknown>(path: string, payload: P): Promise<ApiResponse<T>> {
    const response = await httpClient.post<ApiResponse<T>>(`${this.basePath}${path}`, payload);
    return response.data;
  }

  protected async put<T, P = unknown>(path: string, payload: P): Promise<ApiResponse<T>> {
    const response = await httpClient.put<ApiResponse<T>>(`${this.basePath}${path}`, payload);
    return response.data;
  }

  protected async patch<T, P = unknown>(path: string, payload: P): Promise<ApiResponse<T>> {
    const response = await httpClient.patch<ApiResponse<T>>(`${this.basePath}${path}`, payload);
    return response.data;
  }

  protected async delete<T>(path: string): Promise<ApiResponse<T>> {
    const response = await httpClient.delete<ApiResponse<T>>(`${this.basePath}${path}`);
    return response.data;
  }
}
