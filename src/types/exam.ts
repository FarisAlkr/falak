import type { Bilingual } from './i18n';
import type { UnitId } from './unit';

export type ExamSeason = 'summer' | 'winter';

export type ExamDifficulty = 1 | 2 | 3;

export interface NumericAnswer {
  kind: 'numeric';
  value: number;
  tolerance: number;
  unit?: string;
}

export interface SymbolicAnswer {
  kind: 'symbolic';
  expression: string;
}

export interface MultipleChoiceAnswer {
  kind: 'choice';
  correctId: string;
  choices: { id: string; label: Bilingual }[];
}

export type ExamAnswer = NumericAnswer | SymbolicAnswer | MultipleChoiceAnswer;

export interface ExamPart {
  id: string;
  prompt: Bilingual;
  answer: ExamAnswer;
  points: number;
  hint?: { ar: string };
  solution: { ar: string };
}

export interface ExamQuestion {
  id: string;
  year?: number;
  season?: ExamSeason;
  difficulty: ExamDifficulty;
  problem: Bilingual;
  parts: ExamPart[];
  totalPoints: number;
}

export interface ExamBank {
  unitId: UnitId;
  questions: ExamQuestion[];
}
