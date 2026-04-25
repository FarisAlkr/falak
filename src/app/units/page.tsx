'use client';

import { useState } from 'react';
import { UnitsGrid } from '@/components/layout/UnitsGrid';
import { UNIT_LISTING } from '@/lib/content/unitRegistry';
import { cn } from '@/lib/utils/cn';
import type { Section } from '@/types/unit';

type SectionFilter = Section | 'all';

const FILTERS: { value: SectionFilter; label: string }[] = [
  { value: 'all', label: 'All · الكل' },
  { value: 'mechanics', label: 'Mechanics · ميكانيكا' },
  { value: 'electromagnetism', label: 'Electromagnetism · كهرومغناطيسية' },
  { value: 'radiation-matter', label: 'Radiation & Matter · إشعاع ومادة' },
];

export default function UnitsPage() {
  const [filter, setFilter] = useState<SectionFilter>('all');

  const visibleUnits =
    filter === 'all' ? UNIT_LISTING : UNIT_LISTING.filter((u) => u.section === filter);

  return (
    <main className="mx-auto max-w-6xl px-6 py-16">
      <header className="mb-12 space-y-4">
        <span className="font-mono text-xs uppercase tracking-meta text-ink-muted">
          Units · الوحدات
        </span>
        <h1
          dir="ltr"
          className="font-display text-4xl font-medium text-ink md:text-5xl"
        >
          The 14-unit curriculum
        </h1>
      </header>

      <div className="mb-10 flex flex-wrap gap-2 border-b border-border pb-6">
        {FILTERS.map((f) => (
          <button
            key={f.value}
            type="button"
            onClick={() => setFilter(f.value)}
            className={cn(
              'border px-4 py-2 font-mono text-xs uppercase tracking-meta transition-colors duration-fast ease-out',
              filter === f.value
                ? 'border-ink bg-ink text-ink-inverted'
                : 'border-border text-ink-muted hover:border-ink hover:text-ink',
            )}
          >
            {f.label}
          </button>
        ))}
      </div>

      <UnitsGrid units={visibleUnits} />
    </main>
  );
}
