import { forwardRef, type HTMLAttributes } from 'react';
import { cn } from '@/lib/utils/cn';

export type CardSurface = 'flat' | 'raised';

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  surface?: CardSurface;
}

const surfaces: Record<CardSurface, string> = {
  flat: 'bg-paper',
  raised: 'bg-paper-raised',
};

export const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ surface = 'flat', className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        'rounded-sm border border-border p-6 transition-colors duration-fast ease-out',
        surfaces[surface],
        className,
      )}
      {...props}
    />
  ),
);

Card.displayName = 'Card';
