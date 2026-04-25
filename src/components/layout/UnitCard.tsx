import Link from 'next/link';
import { ChevronLeft } from 'lucide-react';
import { Badge, Card } from '@/components/primitives';
import { cn } from '@/lib/utils/cn';
import type { UnitListing } from '@/types/unit';

const STATUS_LABEL: Record<UnitListing['status'], string> = {
  'not-started': 'قريباً',
  'in-progress': 'قيد التحضير',
  ready: 'جاهز',
};

const STATUS_TONE = {
  'not-started': 'neutral',
  'in-progress': 'warning',
  ready: 'success',
} as const;

export interface UnitCardProps {
  unit: UnitListing;
}

export function UnitCard({ unit }: UnitCardProps) {
  const unitNumber = unit.number.toString().padStart(2, '0');

  return (
    <Link
      href={`/units/${unit.id}`}
      className="group block focus-visible:outline-none"
      aria-label={unit.titles.ar}
    >
      <Card
        surface="raised"
        className={cn(
          'h-full p-8 group-hover:border-accent group-focus-visible:border-accent',
          'flex flex-col gap-6',
        )}
      >
        <div className="flex items-center justify-between">
          <span
            dir="ltr"
            className="font-mono text-xs uppercase tracking-meta text-ink-muted"
          >
            UNIT {unitNumber}
          </span>
          <Badge tone={STATUS_TONE[unit.status]} dot={unit.status !== 'not-started'}>
            {STATUS_LABEL[unit.status]}
          </Badge>
        </div>

        <div className="flex-1 space-y-2">
          <h2
            dir="rtl"
            className="font-arabic text-2xl font-semibold leading-tight text-ink"
          >
            {unit.titles.ar}
          </h2>
          <p
            dir="rtl"
            className="font-hebrew text-sm text-accent"
          >
            {unit.titles.he}
          </p>
          <p
            dir="ltr"
            className="font-body text-sm italic text-ink-muted"
          >
            {unit.titles.en}
          </p>
        </div>

        <div className="border-t border-border pt-4 flex items-center justify-between">
          <span className="font-mono text-xs uppercase tracking-meta text-ink-faint">
            Theory · Interactive · Exam
          </span>
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
