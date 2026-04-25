import type { UnitId } from './unit';

export type SlideKind =
  | 'title'
  | 'concept'
  | 'equations'
  | 'visual'
  | 'worked-example'
  | 'vocab';

export interface SlideFrontmatter {
  unitId: UnitId;
}
