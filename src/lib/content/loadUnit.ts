import { UNIT_LISTING } from './unitRegistry';
import type { UnitId, UnitListing } from '@/types/unit';

const UNIT_BY_ID: ReadonlyMap<UnitId, UnitListing> = new Map(UNIT_LISTING.map((u) => [u.id, u]));

export function getUnit(id: UnitId): UnitListing {
  const unit = UNIT_BY_ID.get(id);
  if (!unit) {
    throw new Error(`Unknown unit id: ${id}`);
  }
  return unit;
}

export function findUnit(id: string): UnitListing | undefined {
  return UNIT_BY_ID.get(id as UnitId);
}
