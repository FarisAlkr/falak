'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
import { Badge } from '@/components/primitives';
import { fadeUp, staggerParent } from '@/lib/motion';
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
    <motion.header
      variants={staggerParent}
      initial="hidden"
      animate="visible"
      className="border-b border-border pb-10"
    >
      <motion.div variants={fadeUp}>
        <Link
          href="/"
          className="group inline-flex items-center gap-2 font-mono text-xs uppercase tracking-meta text-ink-muted transition-colors duration-base ease-out hover:text-ink"
        >
          <ChevronRight
            size={14}
            strokeWidth={1.5}
            className="transition-transform duration-base ease-out group-hover:translate-x-0.5 rtl:rotate-180 rtl:group-hover:-translate-x-0.5"
            aria-hidden
          />
          <span>All units · العودة</span>
        </Link>
      </motion.div>

      <div className="mt-8 flex items-start justify-between gap-6">
        <div className="space-y-3">
          <motion.span
            variants={fadeUp}
            dir="ltr"
            className="inline-block font-mono text-xs uppercase tracking-meta text-ink-muted"
          >
            UNIT {unitNumber}
          </motion.span>
          <motion.h1
            variants={fadeUp}
            dir="rtl"
            className="font-arabic text-4xl font-semibold leading-tight text-ink md:text-5xl"
          >
            {unit.titles.ar}
          </motion.h1>
          <motion.p variants={fadeUp} dir="rtl" className="font-hebrew text-base text-accent">
            {unit.titles.he}
          </motion.p>
          <motion.p
            variants={fadeUp}
            dir="ltr"
            className="font-body text-base italic text-ink-muted"
          >
            {unit.titles.en}
          </motion.p>
        </div>

        <motion.div variants={fadeUp} className="shrink-0">
          <Badge
            tone={WEIGHT_TONE[unit.bagrutWeight]}
            dot={unit.bagrutWeight === 'very-high' || unit.bagrutWeight === 'high'}
          >
            {WEIGHT_LABEL[unit.bagrutWeight]}
          </Badge>
        </motion.div>
      </div>
    </motion.header>
  );
}
