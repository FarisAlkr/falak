import type { UnitId } from './unit';

export type Locale = 'ar' | 'he' | 'en';

export interface ExamAttempt {
  attemptId: string;
  score: number;
  date: number;
}

export interface UnitProgress {
  theoryCompleted: boolean;
  theoryLastSlide: number;
  interactiveBestScore: number;
  interactiveStreak: number;
  examScores: ExamAttempt[];
}

export interface Progress {
  userId: string;
  unitProgress: Partial<Record<UnitId, UnitProgress>>;
  streak: number;
  lastActiveAt: number;
}

export interface Settings {
  key: 'singleton';
  userId: string;
  accountId: string | null;
  locale: Locale;
}

export function defaultUnitProgress(): UnitProgress {
  return {
    theoryCompleted: false,
    theoryLastSlide: 0,
    interactiveBestScore: 0,
    interactiveStreak: 0,
    examScores: [],
  };
}

export function defaultProgress(userId: string): Progress {
  return {
    userId,
    unitProgress: {},
    streak: 0,
    lastActiveAt: Date.now(),
  };
}

export function defaultSettings(userId: string): Settings {
  return {
    key: 'singleton',
    userId,
    accountId: null,
    locale: 'ar',
  };
}
