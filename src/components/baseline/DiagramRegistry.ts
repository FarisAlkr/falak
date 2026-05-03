import type { ComponentType } from 'react';
import {
  ActionReactionCancelMiscDiagram,
  ActionReactionDiagram,
  AtwoodDiagram,
  BookOnTableDiagram,
  BookWithWeightDiagram,
  BoxOnGroundFBD,
  ForceAnatomyDiagram,
  FrictionOpposesMotionMiscDiagram,
  FrictionRegimesDiagram,
  HangingSignDiagram,
  HeadToTailDiagram,
  HockeyPuckDiagram,
  InclineFullFBD,
  InclineHorizontalForceFBD,
  MassComparisonDiagram,
  MovingNeedsForceMiscDiagram,
  NormalCompareDiagram,
  NormalEqualsMgMiscDiagram,
  RestHasForcesMiscDiagram,
  SigmaSymbolDiagram,
  SwimmingDiagram,
  TensionDiagram,
  ThreeBoxesStackDiagram,
  ThreeForces1DDiagram,
  TwoBoxesContactDiagram,
  TwoForcesParallelDiagram,
  TwoForcesPerpendicularDiagram,
  WeightDiagram,
} from '@/components/diagrams/physics';

/**
 * Registry mapping baseline concept/example IDs → SVG diagram components.
 *
 * Lookups are by the YAML `concept.id` or `example.id` string so the renderer
 * can pull the right figure without any extra metadata in the baseline file.
 * If an ID is absent here, the slide falls back to showing the prose
 * `Visual: ...` placeholder (in EN mode only).
 */
export const DIAGRAM_REGISTRY: Record<string, ComponentType> = {
  // Concepts
  'force-as-vector': ForceAnatomyDiagram,
  'net-force-sigma': SigmaSymbolDiagram,
  'newton-first-law': HockeyPuckDiagram,
  'newton-second-vector': MassComparisonDiagram,
  'newton-second-per-axis': () => BoxOnGroundFBD({ withApplied: true, withFriction: false }),
  'newton-third-law': ActionReactionDiagram,
  weight: WeightDiagram,
  'normal-force': NormalCompareDiagram,
  tension: TensionDiagram,
  friction: FrictionRegimesDiagram,

  // Examples — problem-specific diagrams (replacing earlier reuses)
  'ex-two-forces-same-direction': TwoForcesParallelDiagram,
  'ex-three-forces-1d': ThreeForces1DDiagram,
  'ex-book-on-table': BookOnTableDiagram,
  'ex-block-pushed': () => BoxOnGroundFBD({ withApplied: true }),
  'ex-2d-perpendicular-forces': TwoForcesPerpendicularDiagram,
  'ex-swimming': SwimmingDiagram,
  'ex-weight-of-book': BookWithWeightDiagram,
  'ex-block-on-incline-find-N': InclineFullFBD,
  'ex-atwood-basic': AtwoodDiagram,
  'ex-friction-bound': FrictionRegimesDiagram,

  // Examples — newly authored tier (Phase E content)
  'ex-hanging-sign-equilibrium': HangingSignDiagram,
  'ex-incline-constant-velocity': InclineHorizontalForceFBD,
  'ex-two-boxes-contact': TwoBoxesContactDiagram,
  'ex-three-boxes-stack': ThreeBoxesStackDiagram,

  // Cumulative
  'ex-incline-with-friction': InclineFullFBD,

  // Misconceptions — wrong/right visualizations
  'misc-moving-needs-force': MovingNeedsForceMiscDiagram,
  'misc-action-reaction-cancel': ActionReactionCancelMiscDiagram,
  'misc-N-equals-mg': NormalEqualsMgMiscDiagram,
  'misc-friction-opposes-force': FrictionOpposesMotionMiscDiagram,
  'misc-rest-no-forces': RestHasForcesMiscDiagram,
};

export function hasDiagram(id: string | undefined): boolean {
  return id !== undefined && id in DIAGRAM_REGISTRY;
}

export function getDiagram(id: string | undefined): ComponentType | undefined {
  if (!id) return undefined;
  return DIAGRAM_REGISTRY[id];
}
