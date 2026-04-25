import type { Bilingual, Trilingual, BilingualTerm } from './i18n';

export type UnitId = string;

export type Section = 'mechanics' | 'electromagnetism' | 'radiation-matter';

export type BagrutWeight = 'low' | 'medium' | 'high' | 'very-high';

export type UnitStatus = 'not-started' | 'in-progress' | 'ready';

export interface UnitTimeBudget {
  theory: number;
  interactive: number;
  exam: number;
  summary: number;
}

export interface UnitMeta {
  id: UnitId;
  number: number;
  section: Section;
  titles: Trilingual;
  description: Trilingual;
  prerequisites: UnitId[];
  estimatedMinutes: UnitTimeBudget;
  bagrutWeight: BagrutWeight;
  keyTerms: BilingualTerm[];
  interactiveType: string;
  summaryTakeaway: Trilingual;
  status?: UnitStatus;
}

export type { Bilingual, Trilingual, BilingualTerm };
