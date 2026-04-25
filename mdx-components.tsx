import type { MDXComponents } from 'mdx/types';
import { InlineMath, BlockMath } from '@/components/math/Math';
import { Card } from '@/components/primitives';

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    h1: ({ children, ...props }) => (
      <h1 className="font-display text-4xl font-medium text-ink md:text-5xl" {...props}>
        {children}
      </h1>
    ),
    h2: ({ children, ...props }) => (
      <h2 className="font-display text-3xl font-medium text-ink mt-12 mb-4" {...props}>
        {children}
      </h2>
    ),
    h3: ({ children, ...props }) => (
      <h3 className="font-display text-2xl font-medium text-ink mt-8 mb-3" {...props}>
        {children}
      </h3>
    ),
    p: ({ children, ...props }) => (
      <p className="font-body text-lg leading-relaxed text-ink my-4" {...props}>
        {children}
      </p>
    ),
    ul: ({ children, ...props }) => (
      <ul className="list-disc pl-6 my-4 space-y-2 text-ink" {...props}>
        {children}
      </ul>
    ),
    ol: ({ children, ...props }) => (
      <ol className="list-decimal pl-6 my-4 space-y-2 text-ink" {...props}>
        {children}
      </ol>
    ),
    a: ({ children, ...props }) => (
      <a
        className="font-medium text-accent underline decoration-accent-tint underline-offset-4 transition-colors duration-fast ease-out hover:decoration-accent"
        {...props}
      >
        {children}
      </a>
    ),
    code: ({ children, ...props }) => (
      <code
        className="rounded-sm bg-paper-raised px-1.5 py-0.5 font-mono text-[0.9em] text-ink"
        {...props}
      >
        {children}
      </code>
    ),
    blockquote: ({ children, ...props }) => (
      <blockquote
        className="my-6 border-s-2 border-accent ps-6 font-body text-lg italic text-ink-muted"
        {...props}
      >
        {children}
      </blockquote>
    ),
    hr: (props) => <hr className="my-12 border-t border-border" {...props} />,
    InlineMath,
    BlockMath,
    Card,
    ...components,
  };
}
