'use client';

import Link from 'next/link';
import { useRef } from 'react';
import { motion, useMotionTemplate, useTransform } from 'framer-motion';
import { ChevronLeft } from 'lucide-react';
import { Badge } from '@/components/primitives';
import { cn } from '@/lib/utils/cn';
import { useElementMouse, useTilt, TRANSITION } from '@/lib/motion';
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
  index?: number;
}

export function UnitCard({ unit, index = 0 }: UnitCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { rotateX, rotateY } = useTilt(ref, 3);
  const mouse = useElementMouse(ref);
  const isHighlight = unit.bagrutWeight === 'very-high';
  const unitNumber = unit.number.toString().padStart(2, '0');

  const mx = mouse ? `${(mouse.x + 0.5) * 100}%` : '50%';
  const my = mouse ? `${(mouse.y + 0.5) * 100}%` : '50%';
  const isHovered = mouse !== null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ ...TRANSITION.slow, delay: 0.04 * index }}
    >
      <Link
        href={`/units/${unit.id}`}
        className="group block focus-visible:outline-none"
        aria-label={unit.titles.ar}
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
            'relative h-full overflow-hidden rounded-sm border border-border bg-paper-raised p-8',
            'transition-[border-color,box-shadow] duration-base ease-out',
            'group-hover:border-accent group-focus-visible:border-accent',
            isHighlight ? 'group-hover:shadow-glow' : 'group-hover:shadow-lift',
          )}
        >
          {/* Cursor-follow spotlight */}
          <div
            className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-base ease-out group-hover:opacity-100"
            style={{
              background: `radial-gradient(220px circle at ${mx} ${my}, var(--accent-tint), transparent 65%)`,
            }}
            aria-hidden
          />

          {/* Highlight ring for very-high yield units */}
          {isHighlight && (
            <div
              className="pointer-events-none absolute inset-0 opacity-50 group-hover:opacity-100 transition-opacity duration-slow ease-out"
              style={{
                background:
                  'linear-gradient(135deg, transparent 0%, var(--accent-tint) 60%, transparent 100%)',
                mixBlendMode: 'multiply',
              }}
              aria-hidden
            />
          )}

          <div className="relative flex h-full flex-col gap-6">
            <div className="flex items-center justify-between">
              <span
                dir="ltr"
                className="font-mono text-xs uppercase tracking-meta text-ink-muted"
              >
                UNIT {unitNumber}
              </span>
              <Badge
                tone={STATUS_TONE[unit.status]}
                dot={unit.status !== 'not-started'}
              >
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

            <div className="flex items-center justify-between border-t border-border pt-4">
              <span
                className={cn(
                  'font-mono text-xs uppercase tracking-meta transition-colors duration-base ease-out',
                  isHovered ? 'text-ink' : 'text-ink-faint',
                )}
              >
                Theory · Interactive · Exam
              </span>
              <ChevronLeft
                size={16}
                strokeWidth={1.5}
                className={cn(
                  'transition-all duration-base ease-out',
                  isHovered
                    ? '-translate-x-1.5 text-accent'
                    : 'translate-x-0 text-ink-muted',
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
