// ============================================================
// Visitor Query Hooks - Public Module
// ============================================================

import { useQuery } from '@tanstack/react-query';
import { httpClient } from '@services/api/http-client';
import type { ApiResponse, VisitorPass } from '@/types';

const BASE_PATH = '/visitor-passes';

/**
 * Hook to verify a visitor pass by passcode.
 * Only triggers if a passcode is provided.
 */
export function useVerifyPass(passCode: string) {
  return useQuery({
    queryKey: ['visitors', 'verify', passCode] as const,
    queryFn: async () => {
      const response = await httpClient.get<ApiResponse<VisitorPass>>(
        `${BASE_PATH}/verify/${passCode}`
      );
      return response.data;
    },
    enabled: !!passCode,
    retry: false, // Don't spam retries for invalid passes
    staleTime: 0, // Always fetch fresh details
  });
}

/**
 * Hook to retrieve status information for a visitor pass by passcode or phone number.
 * Only triggers if phoneOrCode is provided.
 */
export function useVisitorStatus(phoneOrCode: string) {
  return useQuery({
    queryKey: ['visitors', 'status', phoneOrCode] as const,
    queryFn: async () => {
      const response = await httpClient.get<ApiResponse<VisitorPass>>(
        `${BASE_PATH}/status/${phoneOrCode}`
      );
      return response.data;
    },
    enabled: !!phoneOrCode,
    retry: false,
    staleTime: 0,
  });
}
