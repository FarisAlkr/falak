'use client';

import { forwardRef, useRef, type ButtonHTMLAttributes, type MutableRefObject } from 'react';
import { motion } from 'framer-motion';
import { useMagnetic } from '@/lib/motion';
import { cn } from '@/lib/utils/cn';

export type ButtonVariant = 'primary' | 'secondary';
export type ButtonSize = 'sm' | 'md';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  magnetic?: boolean;
}

const base =
  'relative inline-flex items-center justify-center font-mono uppercase tracking-meta transition-[background-color,border-color,color,box-shadow] duration-base ease-out disabled:opacity-40 disabled:cursor-not-allowed active:translate-y-px';

const variants: Record<ButtonVariant, string> = {
  primary:
    'bg-accent text-ink-inverted hover:bg-accent-dark hover:shadow-glow focus-visible:shadow-glow',
  secondary:
    'border border-border text-ink hover:border-ink hover:shadow-soft focus-visible:shadow-soft',
};

const sizes: Record<ButtonSize, string> = {
  sm: 'px-5 py-2.5 text-xs',
  md: 'px-6 py-3 text-xs',
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'primary', size = 'md', magnetic = false, className, type = 'button', children, ...props }, forwardedRef) => {
    const innerRef = useRef<HTMLButtonElement | null>(null);
    const setRef = (node: HTMLButtonElement | null) => {
      innerRef.current = node;
      if (typeof forwardedRef === 'function') {
        forwardedRef(node);
      } else if (forwardedRef) {
        (forwardedRef as MutableRefObject<HTMLButtonElement | null>).current = node;
      }
    };
    const { x, y } = useMagnetic(innerRef, { radius: 90, pull: 0.22 });

    if (magnetic) {
      return (
        <motion.button
          ref={setRef}
          type={type}
          style={{ x, y }}
          className={cn(base, variants[variant], sizes[size], className)}
          {...(props as Record<string, unknown>)}
        >
          {children}
        </motion.button>
      );
    }

    return (
      <button
        ref={setRef}
        type={type}
        className={cn(base, variants[variant], sizes[size], className)}
        {...props}
      >
        {children}
      </button>
    );
  },
);

Button.displayName = 'Button';
