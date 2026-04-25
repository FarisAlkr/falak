'use client';

import { forwardRef, type HTMLAttributes } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils/cn';

export type BadgeTone = 'neutral' | 'success' | 'warning' | 'accent';

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  tone?: BadgeTone;
  dot?: boolean;
  pulse?: boolean;
}

const tones: Record<BadgeTone, { text: string; dot: string; glow: string }> = {
  neutral: { text: 'text-ink-muted', dot: 'bg-ink-muted', glow: 'bg-ink-muted/30' },
  success: { text: 'text-success', dot: 'bg-success', glow: 'bg-success/30' },
  warning: { text: 'text-warning', dot: 'bg-warning', glow: 'bg-warning/30' },
  accent: { text: 'text-accent', dot: 'bg-accent', glow: 'bg-accent/30' },
};

export const Badge = forwardRef<HTMLSpanElement, BadgeProps>(
  ({ tone = 'neutral', dot = false, pulse, className, children, ...props }, ref) => {
    const palette = tones[tone];
    const shouldPulse = pulse ?? tone === 'accent';
    return (
      <span
        ref={ref}
        className={cn(
          'inline-flex items-center gap-2 font-mono text-xs uppercase tracking-meta',
          palette.text,
          className,
        )}
        {...props}
      >
        {dot && (
          <span className="relative inline-flex h-1.5 w-1.5" aria-hidden>
            {shouldPulse && (
              <motion.span
                className={cn('absolute inset-0 rounded-full', palette.glow)}
                animate={{ scale: [1, 2.6, 1], opacity: [0.7, 0, 0.7] }}
                transition={{ duration: 2.4, repeat: Infinity, ease: [0.83, 0, 0.17, 1] }}
              />
            )}
            <span className={cn('relative inline-block h-1.5 w-1.5 rounded-full', palette.dot)} />
          </span>
        )}
        {children}
      </span>
    );
  },
);

Badge.displayName = 'Badge';
