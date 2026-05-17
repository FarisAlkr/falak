'use client';

import { motion } from 'framer-motion';
import { Constellation } from './Constellation';
import { fadeUp, staggerSlow, TRANSITION } from '@/lib/motion';
import { MODE_LABELS, type UnitMode } from '@/types/mode';

export interface PlaceholderPanelProps {
  mode: UnitMode;
}

export function PlaceholderPanel({ mode }: PlaceholderPanelProps) {
  const label = MODE_LABELS[mode];

  return (
    <section className="relative overflow-hidden border border-border bg-paper-raised">
      {/* Subtle constellation backdrop */}
      <div className="pointer-events-none absolute inset-x-0 top-0 mx-auto h-32 w-full max-w-3xl text-ink-faint">
        <Constellation className="h-full w-full opacity-40" />
      </div>

      <motion.div
        variants={staggerSlow}
        initial="hidden"
        animate="visible"
        className="relative flex flex-col items-center px-8 py-20 text-center md:px-16 md:py-28"
      >
        <motion.span variants={fadeUp} className="text-xs text-ink-muted">
          <span data-lang="ar" dir="rtl" className="font-arabic">
            {label.ar}
          </span>
          <span data-lang="he" dir="rtl" className="font-hebrew">
            {label.he}
          </span>
          <span data-lang="en" dir="ltr" className="font-mono uppercase tracking-meta">
            {label.en}
          </span>
        </motion.span>

        <motion.p
          variants={fadeUp}
          className="mt-8 text-4xl font-semibold text-ink md:text-5xl"
          animate={{
            opacity: [0.85, 1, 0.85],
            transition: { duration: 4, repeat: Infinity, ease: [0.83, 0, 0.17, 1] },
          }}
        >
          <span data-lang="ar" dir="rtl" className="font-arabic">
            قريباً
          </span>
          <span data-lang="he" dir="rtl" className="font-hebrew">
            בקרוב
          </span>
          <span data-lang="en" dir="ltr" className="font-display italic">
            Coming soon
          </span>
        </motion.p>

        <motion.div
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ scaleX: 1, opacity: 1 }}
          transition={{ ...TRANSITION.slow, delay: 0.6 }}
          className="mt-12 h-px w-32 origin-left bg-gradient-to-r from-transparent via-border-strong to-transparent"
        />
      </motion.div>
    </section>
  );
}
