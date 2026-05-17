'use client';

import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import type { ReactNode } from 'react';

export interface PageTransitionProps {
  children: ReactNode;
}

/**
 * Lightweight page transition shell.
 *
 * Cross-fades the current route's content on each path change. Implemented
 * as a single keyed `motion.div` (no `<AnimatePresence mode="wait">`) so the
 * new tree mounts immediately on soft navigation — `mode="wait"` defers the
 * mount until the previous tree's exit animation completes, which can
 * deadlock during App Router transitions and leave the page blank until a
 * full refresh clears the stuck state.
 *
 * The keyed motion.div re-mounts on pathname change; React's reconciler
 * tears down the old tree and the `initial` → `animate` keyframes apply to
 * the new one, producing a clean fade-up without the deadlock.
 */
export function PageTransition({ children }: PageTransitionProps) {
  const pathname = usePathname();

  return (
    <motion.div
      key={pathname}
      initial={{ opacity: 0, y: 4 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}
