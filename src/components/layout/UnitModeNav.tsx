'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { MODE_LABELS, MODE_ORDER, type UnitMode } from '@/types/mode';
import type { UnitId } from '@/types/unit';
import { cn } from '@/lib/utils/cn';

export interface UnitModeNavProps {
  unitId: UnitId;
}

export function UnitModeNav({ unitId }: UnitModeNavProps) {
  const pathname = usePathname() ?? '';

  return (
    <nav
      aria-label="Unit modes"
      className="flex flex-wrap gap-1 border-b border-border"
    >
      {MODE_ORDER.map((mode) => {
        const href = `/units/${unitId}/${mode}`;
        const active = isModeActive(pathname, mode);
        return (
          <Link
            key={mode}
            href={href}
            aria-current={active ? 'page' : undefined}
            className={cn(
              '-mb-px border-b-2 px-5 py-3 font-mono text-xs uppercase tracking-meta transition-colors duration-fast ease-out',
              active
                ? 'border-accent text-ink'
                : 'border-transparent text-ink-muted hover:text-ink',
            )}
          >
            <span dir="rtl" className="font-arabic text-base font-medium">
              {MODE_LABELS[mode].ar}
            </span>
            <span className="mx-2 text-ink-faint">·</span>
            <span>{MODE_LABELS[mode].en}</span>
          </Link>
        );
      })}
    </nav>
  );
}

function isModeActive(pathname: string, mode: UnitMode): boolean {
  const normalized = pathname.replace(/\/$/, '');
  return normalized.endsWith(`/${mode}`);
}
