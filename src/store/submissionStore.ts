import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Submission, SubmissionStatus, Score } from '../types';

interface SubmissionState {
  submissions: Submission[];
  scores: Score[];
  addSubmission: (submission: Omit<Submission, 'status' | 'submittedAt'>) => void;
  updateSubmissionStatus: (id: string, status: SubmissionStatus) => void;
  addScore: (score: Omit<Score, 'id' | 'scoredAt'>) => void;
}

export const useSubmissionStore = create<SubmissionState>()(
  persist(
    (set) => ({
      submissions: [],
      scores: [],
      addSubmission: (sub) =>
        set((state) => ({
          submissions: [
            ...state.submissions,
            { ...sub, status: 'submitted', submittedAt: new Date().toISOString() } as Submission,
          ],
        })),
      updateSubmissionStatus: (id, status) =>
        set((state) => ({
          submissions: state.submissions.map((s) =>
            s.id === id ? { ...s, status } : s
          ),
        })),
      addScore: (score) =>
        set((state) => ({
          scores: [
            ...state.scores.filter(s => s.submissionId !== score.submissionId || s.judgeId !== score.judgeId),
            { ...score, id: `score-${Date.now()}`, scoredAt: new Date().toISOString() } as Score,
          ],
        })),
    }),
    {
      name: 'astra-submissions-storage',
    }
  )
);
