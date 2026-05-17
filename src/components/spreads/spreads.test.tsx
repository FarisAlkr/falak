import { describe, expect, it, vi } from 'vitest';
import { render } from '@testing-library/react';
import { ChapterBreak } from './ChapterBreak';
import { SpreadShell } from './SpreadShell';

/* The async server-component spreads (Title/Hook/Concept/etc.) need the
 * Next.js runtime + a real loadUnit() call to render. Vitest doesn't run a
 * server component pipeline. Instead, we exercise the synchronous building
 * blocks directly — `SpreadShell` and `ChapterBreak` — and verify the
 * top-level shape: no console errors, expected DOM markers, correct
 * data-attributes. The async spread components are exercised end-to-end via
 * the production build (`pnpm build`) which renders them server-side. */

describe('SpreadShell', () => {
  it('renders standard width by default', () => {
    const { container } = render(
      <SpreadShell>
        <p>content</p>
      </SpreadShell>,
    );
    const section = container.querySelector('section');
    expect(section?.className).toContain('max-w-[760px]');
  });

  it('renders wide width when requested', () => {
    const { container } = render(
      <SpreadShell width="wide">
        <p>content</p>
      </SpreadShell>,
    );
    const section = container.querySelector('section');
    expect(section?.className).toContain('max-w-[1100px]');
  });

  it('mounts ⚑ ribbon when arabicFlag is pending (dev)', () => {
    vi.stubEnv('NODE_ENV', 'development');
    const { container } = render(
      <SpreadShell arabicFlag="pending">
        <p>content</p>
      </SpreadShell>,
    );
    expect(container.textContent).toContain('Arabic review pending');
    vi.unstubAllEnvs();
  });

  it('does not mount the ribbon when arabicFlag is verified', () => {
    const { container } = render(
      <SpreadShell arabicFlag="verified">
        <p>content</p>
      </SpreadShell>,
    );
    expect(container.textContent ?? '').not.toContain('Arabic review pending');
  });
});

describe('ChapterBreak', () => {
  it('renders a separator with the numeral and trilingual title', () => {
    const errorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
    const { container } = render(
      <ChapterBreak
        numeral="II"
        title={{ ar: 'القوى الأربع', he: 'ארבעת הכוחות', en: 'The Four Forces' }}
      />,
    );
    const sep = container.querySelector('[role="separator"]');
    expect(sep).not.toBeNull();
    expect(container.textContent).toContain('II');
    // All three locales render with data-lang markers; CSS hides 2 in the
    // running app, but they're all present in the DOM.
    expect(container.querySelector('[data-lang="ar"]')?.textContent).toContain('القوى الأربع');
    expect(container.querySelector('[data-lang="he"]')?.textContent).toContain('ארבעת הכוחות');
    expect(container.querySelector('[data-lang="en"]')?.textContent).toContain('The Four Forces');
    expect(errorSpy).not.toHaveBeenCalled();
    errorSpy.mockRestore();
  });
});
