import { UnitCard } from './UnitCard';
import type { UnitListing } from '@/types/unit';

export interface UnitsGridProps {
  units: readonly UnitListing[];
}

export function UnitsGrid({ units }: UnitsGridProps) {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {units.map((unit) => (
        <UnitCard key={unit.id} unit={unit} />
      ))}
    </div>
  );
}
