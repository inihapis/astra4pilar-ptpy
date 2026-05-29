import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { User, UserRole } from '../types';

interface AuthState {
  user: User | null;
  login: (role: UserRole, pilar?: string) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      login: (role, pilar) => {
        set({
          user: {
            id: `user-${Date.now()}`,
            name: role === 'public' ? 'John Doe' : role === 'admin' ? 'Admin Astra' : 'Juri Pilar',
            email: `${role}@astra.co.id`,
            role,
            pilar,
          },
        });
      },
      logout: () => set({ user: null }),
    }),
    {
      name: 'astra-auth-storage',
    }
  )
);
