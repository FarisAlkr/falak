import Link from 'next/link';
import { ChevronLeft } from 'lucide-react';
import { Card } from '@/components/primitives';
import { MODE_LABELS, type UnitMode } from '@/types/mode';
import type { UnitId } from '@/types/unit';

export interface ModeTileProps {
  unitId: UnitId;
  mode: UnitMode;
}

export function ModeTile({ unitId, mode }: ModeTileProps) {
  const label = MODE_LABELS[mode];

  return (
    <Link
      href={`/units/${unitId}/${mode}`}
      className="group block focus-visible:outline-none"
      aria-label={label.en}
    >
      <Card
        surface="raised"
        className="h-full p-8 flex flex-col gap-6 group-hover:border-accent group-focus-visible:border-accent"
      >
        <div className="flex-1 space-y-2">
          <p
            dir="rtl"
            className="font-arabic text-3xl font-semibold leading-tight text-ink"
          >
            {label.ar}
          </p>
          <p
            dir="rtl"
            className="font-hebrew text-sm text-accent"
          >
            {label.he}
          </p>
          <p
            dir="ltr"
            className="font-body text-sm italic text-ink-muted"
          >
            {label.en}
          </p>
        </div>

        <div className="flex items-center justify-end">
          <ChevronLeft
            size={16}
            strokeWidth={1.5}
            className="text-ink-muted transition-transform duration-fast ease-out group-hover:-translate-x-1 group-hover:text-accent"
            aria-hidden
          />
        </div>
      </Card>
    </Link>
  );
}
