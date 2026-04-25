import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import { Badge } from '@/components/primitives';
import type { UnitListing, BagrutWeight } from '@/types/unit';

const WEIGHT_LABEL: Record<BagrutWeight, string> = {
  low: 'Low yield',
  medium: 'Medium yield',
  high: 'High yield',
  'very-high': 'High-yield',
};

const WEIGHT_TONE = {
  low: 'neutral',
  medium: 'neutral',
  high: 'warning',
  'very-high': 'accent',
} as const;

export interface UnitHeaderProps {
  unit: UnitListing;
}

export function UnitHeader({ unit }: UnitHeaderProps) {
  const unitNumber = unit.number.toString().padStart(2, '0');

  return (
    <header className="border-b border-border pb-8">
      <Link
        href="/"
        className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-meta text-ink-muted hover:text-ink transition-colors duration-fast ease-out"
      >
        <ChevronRight
          size={14}
          strokeWidth={1.5}
          className="rtl:rotate-180"
          aria-hidden
        />
        <span>All units · العودة</span>
      </Link>

      <div className="mt-6 flex items-start justify-between gap-6">
        <div className="space-y-2">
          <span
            dir="ltr"
            className="font-mono text-xs uppercase tracking-meta text-ink-muted"
          >
            UNIT {unitNumber}
          </span>
          <h1
            dir="rtl"
            className="font-arabic text-4xl font-semibold leading-tight text-ink md:text-5xl"
          >
            {unit.titles.ar}
          </h1>
          <p
            dir="rtl"
            className="font-hebrew text-base text-accent"
          >
            {unit.titles.he}
          </p>
          <p
            dir="ltr"
            className="font-body text-base italic text-ink-muted"
          >
            {unit.titles.en}
          </p>
        </div>

        <Badge
          tone={WEIGHT_TONE[unit.bagrutWeight]}
          dot={unit.bagrutWeight === 'very-high'}
          className="shrink-0"
        >
          {WEIGHT_LABEL[unit.bagrutWeight]}
        </Badge>
      </div>
    </header>
  );
}
