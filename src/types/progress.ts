import type { UnitId } from './unit';

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
  unitProgress: Record<UnitId, UnitProgress>;
  streak: number;
  lastActiveAt: number;
}
