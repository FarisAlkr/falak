import type { Config } from 'tailwindcss';
import typography from '@tailwindcss/typography';
import forms from '@tailwindcss/forms';
import rtl from 'tailwindcss-rtl';

const config: Config = {
  content: ['./src/**/*.{ts,tsx,mdx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        paper: 'var(--paper)',
        'paper-raised': 'var(--paper-raised)',
        'paper-inverted': 'var(--paper-inverted)',
        'paper-inverted-raised': 'var(--paper-inverted-raised)',
        ink: 'var(--ink)',
        'ink-muted': 'var(--ink-muted)',
        'ink-faint': 'var(--ink-faint)',
        'ink-inverted': 'var(--ink-inverted)',
        'ink-inverted-muted': 'var(--ink-inverted-muted)',
        accent: 'var(--accent)',
        'accent-dark': 'var(--accent-dark)',
        'accent-tint': 'var(--accent-tint)',
        success: 'var(--success)',
        warning: 'var(--warning)',
        error: 'var(--error)',
        info: 'var(--info)',
        border: 'var(--border)',
        'border-strong': 'var(--border-strong)',
        'border-inverted': 'var(--border-inverted)',
      },
      borderColor: {
        DEFAULT: 'var(--border)',
      },
      fontFamily: {
        display: ['var(--font-display)', 'Georgia', 'serif'],
        body: ['var(--font-body)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-mono)', 'ui-monospace', 'monospace'],
        arabic: ['var(--font-arabic)', '"Segoe UI"', 'sans-serif'],
        hebrew: ['var(--font-hebrew)', '"Segoe UI"', 'sans-serif'],
      },
      letterSpacing: {
        meta: '0.2em',
      },
      lineHeight: {
        arabic: '1.8',
      },
      transitionDuration: {
        fast: 'var(--duration-fast)',
        base: 'var(--duration-base)',
        slow: 'var(--duration-slow)',
      },
      transitionTimingFunction: {
        out: 'var(--ease-out)',
        'in-out': 'var(--ease-in-out)',
      },
      boxShadow: {
        soft: '0 1px 2px rgba(26, 22, 18, 0.04), 0 4px 16px rgba(26, 22, 18, 0.04)',
        lift: '0 2px 4px rgba(26, 22, 18, 0.06), 0 12px 32px rgba(26, 22, 18, 0.08)',
        glow: '0 0 0 1px rgba(193, 39, 45, 0.15), 0 8px 24px rgba(193, 39, 45, 0.12)',
      },
    },
  },
  plugins: [typography, forms, rtl],
};

export default config;
