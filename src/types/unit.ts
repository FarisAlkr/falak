import type { Bilingual, Trilingual, BilingualTerm } from './i18n';

/**
 * Canonical 12-unit list — must match `docs/content/00_baseline_index.md`.
 * Ordering is the curriculum order; the array index + 1 is the unit number.
 */
export const UNIT_IDS = [
  'kinematics-1d', // 01
  'kinematics-2d', // 02
  'newtons-laws', // 03
  'work-energy', // 04
  'momentum', // 05
  'circular-motion', // 06 — includes gravitation per baseline
  'oscillations', // 07
  'electrostatics', // 08
  'circuits', // 09 — formerly 'dc-circuits'
  'magnetism', // 10
  'waves-optics', // 11 — geometric + physical optics merged
  'modern-atomic', // 12 — modern + atomic & nuclear merged
] as const;

export type UnitId = (typeof UNIT_IDS)[number];

export type Section = 'mechanics' | 'electromagnetism' | 'waves-optics' | 'modern-atomic';

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

export type UnitListing = Pick<
  UnitMeta,
  'id' | 'number' | 'section' | 'titles' | 'bagrutWeight'
> & {
  status: UnitStatus;
};

export type { Bilingual, Trilingual, BilingualTerm };
