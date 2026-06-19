// ============================================================
// User Store (Zustand) - for managing user lists (admin use)
// ============================================================

import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import type { User, UserRole, UserStatus } from '@/types';

interface UserFilters {
  role?: UserRole;
  status?: UserStatus;
  search?: string;
  estateId?: string;
}

interface UserStoreState {
  users: User[];
  selectedUser: User | null;
  filters: UserFilters;
  isLoading: boolean;
  error: string | null;
}

interface UserStoreActions {
  setUsers: (users: User[]) => void;
  addUser: (user: User) => void;
  updateUser: (id: string, updates: Partial<User>) => void;
  removeUser: (id: string) => void;
  setSelectedUser: (user: User | null) => void;
  setFilters: (filters: Partial<UserFilters>) => void;
  clearFilters: () => void;
  setLoading: (isLoading: boolean) => void;
  setError: (error: string | null) => void;
}

type UserStore = UserStoreState & UserStoreActions;

export const useUserStore = create<UserStore>()(
  devtools(
    (set) => ({
      users: [],
      selectedUser: null,
      filters: {},
      isLoading: false,
      error: null,

      setUsers: (users) => set({ users }, false, 'user/setUsers'),

      addUser: (user) => set((state) => ({ users: [user, ...state.users] }), false, 'user/addUser'),

      updateUser: (id, updates) =>
        set(
          (state) => ({
            users: state.users.map((u) => (u.id === id ? { ...u, ...updates } : u)),
            selectedUser:
              state.selectedUser?.id === id
                ? { ...state.selectedUser, ...updates }
                : state.selectedUser,
          }),
          false,
          'user/updateUser'
        ),

      removeUser: (id) =>
        set(
          (state) => ({ users: state.users.filter((u) => u.id !== id) }),
          false,
          'user/removeUser'
        ),

      setSelectedUser: (selectedUser) => set({ selectedUser }, false, 'user/setSelectedUser'),

      setFilters: (filters) =>
        set((state) => ({ filters: { ...state.filters, ...filters } }), false, 'user/setFilters'),

      clearFilters: () => set({ filters: {} }, false, 'user/clearFilters'),

      setLoading: (isLoading) => set({ isLoading }, false, 'user/setLoading'),

      setError: (error) => set({ error }, false, 'user/setError'),
    }),
    { name: 'UserStore' }
  )
);
