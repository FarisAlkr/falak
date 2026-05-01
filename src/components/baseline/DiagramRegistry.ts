import type { ComponentType } from 'react';
import {
  ActionReactionDiagram,
  AtwoodDiagram,
  BookOnTableDiagram,
  BoxOnGroundFBD,
  FBDStepsDiagram,
  FrictionRegimesDiagram,
  HangingSignDiagram,
  HeadToTailDiagram,
  HockeyPuckDiagram,
  InclineFullFBD,
  InclineHorizontalForceFBD,
  MassComparisonDiagram,
  NormalCompareDiagram,
  SigmaSymbolDiagram,
  SwimmingDiagram,
  TensionDiagram,
  ThreeBoxesStackDiagram,
  TwoBoxesContactDiagram,
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
  'force-as-vector': HeadToTailDiagram,
  'net-force-sigma': SigmaSymbolDiagram,
  'newton-first-law': HockeyPuckDiagram,
  'newton-second-vector': MassComparisonDiagram,
  'newton-second-per-axis': () => BoxOnGroundFBD({ withApplied: true, withFriction: false }),
  'newton-third-law': ActionReactionDiagram,
  weight: WeightDiagram,
  'normal-force': NormalCompareDiagram,
  tension: TensionDiagram,
  friction: FrictionRegimesDiagram,

  // Examples — basic tier
  'ex-two-forces-same-direction': HeadToTailDiagram,
  'ex-three-forces-1d': SigmaSymbolDiagram,
  'ex-book-on-table': BookOnTableDiagram,
  'ex-block-pushed': () => BoxOnGroundFBD({ withApplied: true }),
  'ex-2d-perpendicular-forces': () => BoxOnGroundFBD({ withApplied: true, withFriction: false }),
  'ex-swimming': SwimmingDiagram,
  'ex-weight-of-book': WeightDiagram,
  'ex-block-on-incline-find-N': InclineFullFBD,
  'ex-atwood-basic': AtwoodDiagram,
  'ex-friction-bound': FrictionRegimesDiagram,

  // Examples — newly authored tier
  'ex-hanging-sign-equilibrium': HangingSignDiagram,
  'ex-incline-constant-velocity': InclineHorizontalForceFBD,
  'ex-two-boxes-contact': TwoBoxesContactDiagram,
  'ex-three-boxes-stack': ThreeBoxesStackDiagram,

  // Cumulative
  'ex-incline-with-friction': InclineFullFBD,

  // FBD method (sub-steps in concept teaching, used in Hook/method slides)
  'fbd-step-1': () => FBDStepsDiagram({ step: 1 }),
  'fbd-step-2': () => FBDStepsDiagram({ step: 2 }),
  'fbd-step-3': () => FBDStepsDiagram({ step: 3 }),
};

export function hasDiagram(id: string | undefined): boolean {
  return id !== undefined && id in DIAGRAM_REGISTRY;
}

export function getDiagram(id: string | undefined): ComponentType | undefined {
  if (!id) return undefined;
  return DIAGRAM_REGISTRY[id];
}
