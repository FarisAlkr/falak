'use client';

import { motion } from 'framer-motion';
import type { ReactNode } from 'react';

export interface RiseProps {
  children: ReactNode;
  /** Stagger delay in seconds. */
  delay?: number;
  className?: string;
}

/**
 * Editorial entrance animation. Single canonical motion across spreads:
 * 14px translateY rise + opacity 0 → 1, 700ms with the ease-out curve
 * `cubic-bezier(0.16, 1, 0.3, 1)`. Triggered on viewport enter so spreads
 * far down the page only animate when the reader actually reaches them.
 *
 * Use sparingly — wrap heroes (titles, headlines, hero figures, cumulative
 * conclusions). Body paragraphs and chrome don't need motion.
 */
export function Rise({ children, delay = 0, className }: RiseProps) {
  return (
    <motion.div
      initial={{ y: 14, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
