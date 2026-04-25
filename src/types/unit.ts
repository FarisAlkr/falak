import type { Bilingual, Trilingual, BilingualTerm } from './i18n';

export const UNIT_IDS = [
  'kinematics-1d',
  'kinematics-2d',
  'newtons-laws',
  'work-energy',
  'momentum',
  'circular-motion',
  'gravitation',
  'electrostatics',
  'dc-circuits',
  'magnetism',
  'geometric-optics',
  'physical-optics',
  'modern-physics',
  'atomic-nuclear',
] as const;

export type UnitId = (typeof UNIT_IDS)[number];

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

export type UnitListing = Pick<
  UnitMeta,
  'id' | 'number' | 'section' | 'titles' | 'bagrutWeight'
> & {
  status: UnitStatus;
};

export type { Bilingual, Trilingual, BilingualTerm };
