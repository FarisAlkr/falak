'use client';

import { create } from 'zustand';
import { getDB } from '@/lib/db/schema';
import { ensureInitialized } from '@/lib/db/init';
import { defaultProgress, defaultUnitProgress, type UnitProgress } from '@/types/progress';
import type { UnitId } from '@/types/unit';

interface ProgressActions {
  setTheoryLastSlide: (unitId: UnitId, slide: number) => Promise<void>;
  markTheoryComplete: (unitId: UnitId) => Promise<void>;
  /** Record that a chapter has been read end-to-end. Idempotent. */
  markChapterComplete: (unitId: UnitId, chapterId: string) => Promise<void>;
  /** Undo a chapter completion (used by the chapter index for the "mark
   *  unread" affordance). Idempotent. */
  unmarkChapterComplete: (unitId: UnitId, chapterId: string) => Promise<void>;
  recordExamScore: (unitId: UnitId, attemptId: string, score: number) => Promise<void>;
  bumpInteractiveStreak: (unitId: UnitId) => Promise<void>;
  setInteractiveBestScore: (unitId: UnitId, score: number) => Promise<void>;
  clearAllProgress: () => Promise<void>;
}

async function mutateUnitProgress(
  unitId: UnitId,
  mutator: (current: UnitProgress) => UnitProgress,
): Promise<void> {
  const settings = await ensureInitialized();
  const db = getDB();
  const progress = (await db.progress.get(settings.userId)) ?? defaultProgress(settings.userId);
  const current = progress.unitProgress[unitId] ?? defaultUnitProgress();
  progress.unitProgress[unitId] = mutator(current);
  progress.lastActiveAt = Date.now();
  await db.progress.put(progress);
}

export const useProgressStore = create<ProgressActions>(() => ({
  setTheoryLastSlide: (unitId, slide) =>
    mutateUnitProgress(unitId, (p) => ({ ...p, theoryLastSlide: slide })),

  markTheoryComplete: (unitId) =>
    mutateUnitProgress(unitId, (p) => ({ ...p, theoryCompleted: true })),

  markChapterComplete: (unitId, chapterId) =>
    mutateUnitProgress(unitId, (p) => {
      if (p.completedChapters.includes(chapterId)) return p;
      return { ...p, completedChapters: [...p.completedChapters, chapterId] };
    }),

  unmarkChapterComplete: (unitId, chapterId) =>
    mutateUnitProgress(unitId, (p) => ({
      ...p,
      completedChapters: p.completedChapters.filter((id) => id !== chapterId),
    })),

  recordExamScore: (unitId, attemptId, score) =>
    mutateUnitProgress(unitId, (p) => ({
      ...p,
      examScores: [...p.examScores, { attemptId, score, date: Date.now() }],
    })),

  bumpInteractiveStreak: (unitId) =>
    mutateUnitProgress(unitId, (p) => ({
      ...p,
      interactiveStreak: p.interactiveStreak + 1,
    })),

  setInteractiveBestScore: (unitId, score) =>
    mutateUnitProgress(unitId, (p) => ({
      ...p,
      interactiveBestScore: Math.max(p.interactiveBestScore, score),
    })),

  clearAllProgress: async () => {
    const db = getDB();
    await db.progress.clear();
    await db.settings.clear();
  },
}));
