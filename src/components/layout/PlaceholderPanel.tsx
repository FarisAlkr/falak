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
        <motion.span
          variants={fadeUp}
          dir="ltr"
          className="font-mono text-xs uppercase tracking-meta text-ink-muted"
        >
          {label.en}
        </motion.span>

        <motion.p
          variants={fadeUp}
          dir="rtl"
          className="mt-8 font-arabic text-4xl font-semibold text-ink md:text-5xl"
          animate={{
            opacity: [0.85, 1, 0.85],
            transition: { duration: 4, repeat: Infinity, ease: [0.83, 0, 0.17, 1] },
          }}
        >
          قريباً
        </motion.p>

        <motion.p
          variants={fadeUp}
          dir="rtl"
          className="mt-4 font-hebrew text-base text-ink-muted"
        >
          בקרוב
        </motion.p>

        <motion.p
          variants={fadeUp}
          dir="ltr"
          className="mt-2 font-body text-sm italic text-ink-faint"
        >
          Coming soon
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
