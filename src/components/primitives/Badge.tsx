import { forwardRef, type HTMLAttributes } from 'react';
import { cn } from '@/lib/utils/cn';

export type BadgeTone = 'neutral' | 'success' | 'warning' | 'accent';

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  tone?: BadgeTone;
  dot?: boolean;
}

const tones: Record<BadgeTone, { text: string; dot: string }> = {
  neutral: { text: 'text-ink-muted', dot: 'bg-ink-muted' },
  success: { text: 'text-success', dot: 'bg-success' },
  warning: { text: 'text-warning', dot: 'bg-warning' },
  accent: { text: 'text-accent', dot: 'bg-accent' },
};

export const Badge = forwardRef<HTMLSpanElement, BadgeProps>(
  ({ tone = 'neutral', dot = false, className, children, ...props }, ref) => {
    const palette = tones[tone];
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
        {dot && <span className={cn('h-1.5 w-1.5 rounded-full', palette.dot)} aria-hidden />}
        {children}
      </span>
    );
  },
);

Badge.displayName = 'Badge';
