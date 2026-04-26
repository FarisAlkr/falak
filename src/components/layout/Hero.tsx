'use client';

import { useRef } from 'react';
import { motion } from 'framer-motion';
import { Constellation } from './Constellation';
import { fadeUp, staggerSlow, TRANSITION } from '@/lib/motion';
import { useElementMouse } from '@/lib/motion/hooks';

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const mouse = useElementMouse(ref);
  const px = (mouse?.x ?? 0) * 12;
  const py = (mouse?.y ?? 0) * 12;

  return (
    <section ref={ref} className="relative overflow-hidden border-b border-border py-20 md:py-28">
      {/* Constellation backdrop */}
      <div className="pointer-events-none absolute inset-x-0 top-6 mx-auto h-44 w-full max-w-4xl text-ink-faint">
        <Constellation className="h-full w-full opacity-60" parallax={{ x: -px, y: -py }} />
      </div>

      {/* Horizon line */}
      <motion.div
        initial={{ scaleX: 0, opacity: 0 }}
        animate={{ scaleX: 1, opacity: 1 }}
        transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
        className="absolute inset-x-0 top-0 h-px origin-left bg-gradient-to-r from-transparent via-border-strong to-transparent"
      />

      <motion.div
        variants={staggerSlow}
        initial="hidden"
        animate="visible"
        className="relative space-y-6"
      >
        <motion.span
          variants={fadeUp}
          dir="ltr"
          className="inline-block font-mono text-xs uppercase tracking-meta text-ink-muted"
        >
          5 יח״ל · 5 وحدات · Israeli Bagrut
        </motion.span>

        <motion.h1
          variants={fadeUp}
          dir="ltr"
          style={{ x: px * 0.4, y: py * 0.2 }}
          className="font-display text-7xl font-medium leading-none text-ink md:text-8xl"
        >
          Falak
        </motion.h1>

        <motion.p
          variants={fadeUp}
          dir="rtl"
          style={{ x: -px * 0.25, y: py * 0.15 }}
          className="font-arabic text-3xl font-medium text-ink md:text-4xl"
        >
          فَلَك
        </motion.p>

        <motion.p
          variants={fadeUp}
          dir="ltr"
          className="max-w-2xl font-body text-lg leading-relaxed text-ink-muted"
        >
          A bilingual physics teaching platform for the Israeli 5-unit Bagrut. Built for
          Arab-speaking students preparing for the Hebrew exam.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...TRANSITION.slow, delay: 0.7 }}
          className="flex items-center gap-3 pt-4 text-xs"
        >
          <span className="h-px w-8 bg-border-strong" />
          <span dir="ltr" className="font-mono uppercase tracking-meta text-ink-faint">
            14 units · 4 modes each · physics in Arabic, Bagrut in Hebrew
          </span>
        </motion.div>
      </motion.div>
    </section>
  );
}
