import { UNIT_IDS } from '@/types/unit';

export function getUnitStaticParams(): { unitId: string }[] {
  return UNIT_IDS.map((id) => ({ unitId: id }));
}
