'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
import { Badge } from '@/components/primitives';
import { fadeUp, staggerParent } from '@/lib/motion';
import { I18n } from '@/components/i18n/I18n';
import type { UnitListing, BagrutWeight } from '@/types/unit';

const WEIGHT_LABEL: Record<BagrutWeight, { ar: string; he: string; en: string }> = {
  low: { ar: 'وزن منخفض', he: 'משקל נמוך', en: 'Low yield' },
  medium: { ar: 'وزن متوسّط', he: 'משקל בינוני', en: 'Medium yield' },
  high: { ar: 'وزن مرتفع', he: 'משקל גבוה', en: 'High yield' },
  'very-high': { ar: 'وزن مرتفع جدّاً', he: 'משקל גבוה מאוד', en: 'Very high yield' },
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
          className="group inline-flex items-center gap-2 text-xs text-ink-muted transition-colors duration-base ease-out hover:text-ink"
        >
          <ChevronRight
            size={14}
            strokeWidth={1.5}
            className="transition-transform duration-base ease-out group-hover:translate-x-0.5 rtl:rotate-180 rtl:group-hover:-translate-x-0.5"
            aria-hidden
          />
          <I18n ar="كلّ الوحدات" he="כל היחידות" en="All units" as="span" className="" />
        </Link>
      </motion.div>

      <div className="mt-8 flex items-start justify-between gap-6">
        <div className="space-y-3">
          <motion.div variants={fadeUp}>
            <I18n
              ar={`الوحدة ${unitNumber}`}
              he={`יחידה ${unitNumber}`}
              en={`UNIT ${unitNumber}`}
              as="span"
              className="inline-block text-xs uppercase tracking-meta text-ink-muted"
            />
          </motion.div>
          <motion.h1
            variants={fadeUp}
            className="text-4xl font-semibold leading-tight text-ink md:text-5xl"
          >
            <span data-lang="ar" dir="rtl" className="font-arabic">
              {unit.titles.ar}
            </span>
            <span data-lang="he" dir="rtl" className="font-hebrew">
              {unit.titles.he}
            </span>
            <span data-lang="en" dir="ltr" className="font-display">
              {unit.titles.en}
            </span>
          </motion.h1>
        </div>

        <motion.div variants={fadeUp} className="shrink-0">
          <Badge
            tone={WEIGHT_TONE[unit.bagrutWeight]}
            dot={unit.bagrutWeight === 'very-high' || unit.bagrutWeight === 'high'}
          >
            <I18n {...WEIGHT_LABEL[unit.bagrutWeight]} unstyled />
          </Badge>
        </motion.div>
      </div>
    </motion.header>
  );
}
