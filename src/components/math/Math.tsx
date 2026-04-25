import katex from 'katex';
import type { HTMLAttributes } from 'react';
import { cn } from '@/lib/utils/cn';

interface MathProps extends HTMLAttributes<HTMLSpanElement> {
  children: string;
}

interface BlockMathProps extends HTMLAttributes<HTMLDivElement> {
  children: string;
}

function renderMath(tex: string, displayMode: boolean): string {
  return katex.renderToString(tex, {
    displayMode,
    throwOnError: false,
    strict: 'ignore',
    output: 'html',
  });
}

export function InlineMath({ children, className, ...props }: MathProps) {
  return (
    <span
      dir="ltr"
      className={cn('inline-block font-mono text-[0.95em]', className)}
      dangerouslySetInnerHTML={{ __html: renderMath(children, false) }}
      {...props}
    />
  );
}

export function BlockMath({ children, className, ...props }: BlockMathProps) {
  return (
    <div
      dir="ltr"
      className={cn('my-6 text-center text-xl', className)}
      dangerouslySetInnerHTML={{ __html: renderMath(children, true) }}
      {...props}
    />
  );
}
