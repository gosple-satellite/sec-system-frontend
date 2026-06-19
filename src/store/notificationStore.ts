// ============================================================
// Notification Store (Zustand)
// ============================================================

import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import type { NotificationType } from '@/types';

export interface ToastNotification {
  id: string;
  type: NotificationType;
  title: string;
  message?: string;
  duration?: number; // ms, default 5000
}

interface NotificationStoreState {
  toasts: ToastNotification[];
  unreadCount: number;
}

interface NotificationStoreActions {
  addToast: (notification: Omit<ToastNotification, 'id'>) => void;
  removeToast: (id: string) => void;
  clearToasts: () => void;
  setUnreadCount: (count: number) => void;
  incrementUnread: () => void;
  resetUnread: () => void;
  // Shortcut helpers
  success: (title: string, message?: string) => void;
  error: (title: string, message?: string) => void;
  warn: (title: string, message?: string) => void;
  info: (title: string, message?: string) => void;
}

type NotificationStore = NotificationStoreState & NotificationStoreActions;

const generateId = () => `toast_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`;

export const useNotificationStore = create<NotificationStore>()(
  devtools(
    (set) => ({
      toasts: [],
      unreadCount: 0,

      addToast: (notification) => {
        const id = generateId();
        set(
          (state) => ({ toasts: [...state.toasts, { ...notification, id }] }),
          false,
          'notification/addToast'
        );
        // Auto-remove after duration
        const duration = notification.duration ?? 5000;
        setTimeout(() => {
          set(
            (state) => ({ toasts: state.toasts.filter((t) => t.id !== id) }),
            false,
            'notification/autoRemove'
          );
        }, duration);
      },

      removeToast: (id) =>
        set(
          (state) => ({ toasts: state.toasts.filter((t) => t.id !== id) }),
          false,
          'notification/removeToast'
        ),

      clearToasts: () => set({ toasts: [] }, false, 'notification/clearToasts'),

      setUnreadCount: (count) => set({ unreadCount: count }, false, 'notification/setUnreadCount'),

      incrementUnread: () =>
        set(
          (state) => ({ unreadCount: state.unreadCount + 1 }),
          false,
          'notification/incrementUnread'
        ),

      resetUnread: () => set({ unreadCount: 0 }, false, 'notification/resetUnread'),

      // Helpers
      success: (title: string, message?: string) =>
        useNotificationStore.getState().addToast({ type: 'SUCCESS', title, message }),
      error: (title: string, message?: string) =>
        useNotificationStore.getState().addToast({ type: 'ERROR', title, message }),
      warn: (title: string, message?: string) =>
        useNotificationStore.getState().addToast({ type: 'WARNING', title, message }),
      info: (title: string, message?: string) =>
        useNotificationStore.getState().addToast({ type: 'INFO', title, message }),
    }),
    { name: 'NotificationStore' }
  )
);
