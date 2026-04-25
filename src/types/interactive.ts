import type { UnitId } from './unit';

export interface InteractiveProps {
  unitId: UnitId;
  onComplete?: (result: InteractiveResult) => void;
}

export interface InteractiveResult {
  success: boolean;
  streak: number;
  bestStreak: number;
}

export interface InteractiveHint {
  ar: string;
  direction?: 'increase' | 'decrease' | 'reverse';
}
