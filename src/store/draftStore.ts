import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { SubmissionDraft } from '../types';

interface DraftState {
  draft: Partial<SubmissionDraft> | null;
  updateDraft: (data: Partial<SubmissionDraft>) => void;
  clearDraft: () => void;
}

export const useDraftStore = create<DraftState>()(
  persist(
    (set) => ({
      draft: null,
      updateDraft: (data) =>
        set((state) => ({
          draft: { ...state.draft, ...data, lastUpdated: new Date().toISOString() },
        })),
      clearDraft: () => set({ draft: null }),
    }),
    {
      name: 'astra-draft-storage',
    }
  )
);
