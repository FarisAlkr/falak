'use client';

import Link from 'next/link';
import { useRef } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, BookOpen, Play, ClipboardCheck, Star, type LucideIcon } from 'lucide-react';
import { useTilt, useElementMouse, TRANSITION } from '@/lib/motion';
import { MODE_LABELS, type UnitMode } from '@/types/mode';
import type { UnitId } from '@/types/unit';
import { cn } from '@/lib/utils/cn';

const MODE_ICON: Record<UnitMode, LucideIcon> = {
  theory: BookOpen,
  interactive: Play,
  exam: ClipboardCheck,
  summary: Star,
};

const MODE_INDEX: Record<UnitMode, string> = {
  theory: '01',
  interactive: '02',
  exam: '03',
  summary: '04',
};

export interface ModeTileProps {
  unitId: UnitId;
  mode: UnitMode;
  index?: number;
}

export function ModeTile({ unitId, mode, index = 0 }: ModeTileProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { rotateX, rotateY } = useTilt(ref, 2.5);
  const mouse = useElementMouse(ref);
  const Icon = MODE_ICON[mode];
  const label = MODE_LABELS[mode];
  const mx = mouse ? `${(mouse.x + 0.5) * 100}%` : '50%';
  const my = mouse ? `${(mouse.y + 0.5) * 100}%` : '50%';
  const isHovered = mouse !== null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ ...TRANSITION.slow, delay: 0.06 * index }}
    >
      <Link
        href={`/units/${unitId}/${mode}/`}
        className="group block focus-visible:outline-none"
        aria-label={label.en}
      >
        <motion.div
          ref={ref}
          style={{
            rotateX,
            rotateY,
            transformPerspective: 1000,
            transformStyle: 'preserve-3d',
          }}
          className={cn(
            'relative h-full overflow-hidden rounded-sm border border-border bg-paper-raised p-10',
            'transition-[border-color,box-shadow] duration-base ease-out',
            'group-hover:border-accent group-hover:shadow-lift group-focus-visible:border-accent',
          )}
        >
          {/* Cursor-follow spotlight */}
          <div
            className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-base ease-out group-hover:opacity-100"
            style={{
              background: `radial-gradient(280px circle at ${mx} ${my}, var(--accent-tint), transparent 65%)`,
            }}
            aria-hidden
          />

          <div className="relative flex h-full flex-col gap-8">
            <div className="flex items-start justify-between">
              <span dir="ltr" className="font-mono text-xs uppercase tracking-meta text-ink-faint">
                {MODE_INDEX[mode]}
              </span>
              <Icon
                size={20}
                strokeWidth={1.5}
                className={cn(
                  'transition-colors duration-base ease-out',
                  isHovered ? 'text-accent' : 'text-ink-muted',
                )}
                aria-hidden
              />
            </div>

            <div className="flex-1 space-y-2">
              <p className="text-3xl font-semibold leading-tight text-ink">
                <span data-lang="ar" dir="rtl" className="font-arabic">
                  {label.ar}
                </span>
                <span data-lang="he" dir="rtl" className="font-hebrew">
                  {label.he}
                </span>
                <span data-lang="en" dir="ltr" className="font-display">
                  {label.en}
                </span>
              </p>
            </div>

            <div className="flex items-center justify-end">
              <ChevronLeft
                size={16}
                strokeWidth={1.5}
                className={cn(
                  'transition-all duration-base ease-out',
                  isHovered ? '-translate-x-1.5 text-accent' : 'translate-x-0 text-ink-muted',
                )}
                aria-hidden
              />
            </div>
          </div>
        </motion.div>
      </Link>
    </motion.div>
  );
}
