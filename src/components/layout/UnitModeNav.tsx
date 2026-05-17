'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { MODE_LABELS, MODE_ORDER, type UnitMode } from '@/types/mode';
import type { UnitId } from '@/types/unit';
import { cn } from '@/lib/utils/cn';

export interface UnitModeNavProps {
  unitId: UnitId;
}

export function UnitModeNav({ unitId }: UnitModeNavProps) {
  const pathname = usePathname() ?? '';
  const activeMode = detectActiveMode(pathname);

  return (
    <nav aria-label="Unit modes" className="flex flex-wrap gap-1 border-b border-border">
      {MODE_ORDER.map((mode) => {
        const href = `/units/${unitId}/${mode}/`;
        const active = mode === activeMode;
        return (
          <Link
            key={mode}
            href={href}
            aria-current={active ? 'page' : undefined}
            className={cn(
              'group relative px-5 py-4 transition-colors duration-base ease-out',
              active ? 'text-ink' : 'text-ink-muted hover:text-ink',
            )}
          >
            <span data-lang="ar" dir="rtl" className="font-arabic text-base font-semibold">
              {MODE_LABELS[mode].ar}
            </span>
            <span data-lang="he" dir="rtl" className="font-hebrew text-base font-semibold">
              {MODE_LABELS[mode].he}
            </span>
            <span data-lang="en" dir="ltr" className="font-mono text-xs uppercase tracking-meta">
              {MODE_LABELS[mode].en}
            </span>
            {active && (
              <motion.span
                layoutId="active-mode-underline"
                className="absolute inset-x-3 -bottom-px h-px bg-accent"
                transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                aria-hidden
              />
            )}
          </Link>
        );
      })}
    </nav>
  );
}

function detectActiveMode(pathname: string): UnitMode | null {
  const normalized = pathname.replace(/\/$/, '');
  for (const mode of MODE_ORDER) {
    if (normalized.endsWith(`/${mode}`)) return mode;
  }
  return null;
}
