import Link from 'next/link';
import { LanguageSelector } from './LanguageSelector';
import { I18n } from '@/components/i18n/I18n';

/**
 * Slim top bar shown on every page. Holds the Falak wordmark on one side and
 * the language selector on the other. Server-rendered so it appears in the
 * static HTML before any JS hydrates.
 */
export function AppHeader() {
  return (
    <header
      dir="ltr"
      className="bg-paper/80 sticky top-0 z-30 border-b border-border backdrop-blur-md"
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-3">
        <Link
          href="/"
          className="group flex items-baseline gap-2 transition-opacity hover:opacity-80"
          aria-label="Falak"
        >
          <span className="font-display text-xl font-medium tracking-tight text-ink">Falak</span>
          <span className="font-arabic text-sm text-ink-muted">·</span>
          <span dir="rtl" className="font-arabic text-sm text-ink-muted">
            فَلَك
          </span>
        </Link>

        <div className="flex items-center gap-3">
          <I18n
            k="language"
            as="span"
            className="text-xs uppercase tracking-meta text-ink-faint"
            unstyled
          />
          <LanguageSelector />
        </div>
      </div>
    </header>
  );
}
