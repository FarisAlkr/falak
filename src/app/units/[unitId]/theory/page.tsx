import Link from 'next/link';
import { Play, BookOpen } from 'lucide-react';
import { PlaceholderPanel } from '@/components/layout/PlaceholderPanel';
import { getUnitStaticParams } from '@/lib/content/staticParams';
import { getChapterUnit } from '@/lib/content/chapterUnits';
import { loadUnit } from '@/lib/content/baseline';
import { LOCALE_DIR } from '@/lib/i18n/constants';
import { I18n } from '@/components/i18n/I18n';
import { ChapterCard } from '@/components/chapter/ChapterCard';
import { requireUnitId } from '@/types/unit';

export const generateStaticParams = getUnitStaticParams;

export interface TheoryIndexPageProps {
  params: { unitId: string };
}

/**
 * Chapter index — the new theory landing page. Replaces the old long-
 * scroll outline document. Composed like the front matter of a book:
 * the unit's title set massive, a brief unit description, then a vertical
 * list of chapter rows separated by hairlines.
 *
 * Long-scroll fallback lives at `/units/{id}/theory/all/` for students who
 * prefer to read the whole unit as one document.
 */
export default async function TheoryIndexPage({ params }: TheoryIndexPageProps) {
  const cfg = getChapterUnit(params.unitId);
  if (!cfg) {
    // Other units don't have authored chapters yet — fall back to the
    // existing placeholder.
    return <PlaceholderPanel mode="theory" />;
  }
  const { chapters } = cfg;

  const unit = await loadUnit(cfg.number);
  const t = unit.frontmatter.titles;
  const number = unit.frontmatter.unit.number;
  const totalSlides = chapters.reduce((acc, c) => acc + (c.slides[1] - c.slides[0] + 1), 0);
  const totalMinutes = chapters.reduce((acc, c) => acc + c.estimatedMinutes, 0);

  return (
    <div className="mx-auto max-w-[1100px] px-4 sm:px-6 md:px-10">
      {/* Hero */}
      <section className="pb-20 pt-12 md:pb-32 md:pt-20">
        <I18n
          ar={`الوحدة ${number}`}
          he={`יחידה ${number}`}
          en={`UNIT ${number}`}
          as="span"
          className="block font-mono text-xs uppercase tracking-[0.3em] text-accent"
        />
        <h1 className="mt-6 leading-[0.95]">
          <span
            data-lang="ar"
            dir={LOCALE_DIR.ar}
            className="block font-arabic text-[clamp(48px,9vw,144px)] font-medium tracking-[-0.02em] text-ink"
          >
            {t.ar}
          </span>
          <span
            data-lang="he"
            dir={LOCALE_DIR.he}
            className="block font-hebrew text-[clamp(44px,8vw,128px)] font-medium text-ink"
          >
            {t.he}
          </span>
          <span
            data-lang="en"
            dir={LOCALE_DIR.en}
            className="block font-display text-[clamp(44px,8vw,128px)] font-medium tracking-[-0.025em] text-ink"
          >
            {t.en}
          </span>
        </h1>
        <div aria-hidden className="mt-8 h-px w-24 bg-accent" />
        <p className="mt-8 max-w-[68ch] text-[clamp(17px,1.7vw,22px)] leading-relaxed">
          <span
            data-lang="ar"
            dir={LOCALE_DIR.ar}
            className="font-arabic leading-arabic text-ink-muted"
          >
            {firstSentenceOf(unit.introduction, 'ar')}
          </span>
          {/* ⚑ Hebrew pending native-speaker review — draft only. */}
          <span data-lang="he" dir={LOCALE_DIR.he} className="font-hebrew text-ink-muted">
            חמישה פרקים. התחילו ביסודות וסיימו בשאלות הבגרות.
          </span>
          <span data-lang="en" dir={LOCALE_DIR.en} className="font-display italic text-ink-muted">
            Five chapters. Begin with foundations, finish at the Bagrut.
          </span>
        </p>
        {/* Unit-wide meta */}
        <div className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-2 font-mono text-[10px] uppercase tracking-[0.25em] text-ink-faint">
          <span>{chapters.length} chapters</span>
          <span aria-hidden>·</span>
          <span>{totalSlides} slides</span>
          <span aria-hidden>·</span>
          <span>~{totalMinutes} min total</span>
        </div>
      </section>

      {/* Chapter list — typographic, no card frames */}
      <section className="border-t border-border">
        <header className="flex items-baseline justify-between gap-4 border-b border-border py-5">
          <I18n
            ar="الفصول"
            he="פרקים"
            en="CHAPTERS"
            as="span"
            className="block font-mono text-xs uppercase tracking-[0.3em] text-accent"
          />
          <Link
            href={`/units/${params.unitId}/theory/all/`}
            className="group inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.25em] text-ink-muted transition-colors duration-fast hover:text-ink"
          >
            <BookOpen size={13} strokeWidth={1.5} aria-hidden />
            <I18n ar="اقرأ الوحدة كلّها" he="קרא את היחידה כולה" en="Read entire unit" unstyled />
          </Link>
        </header>
        <ol className="mt-2">
          {chapters.map((chapter) => (
            <ChapterCard
              key={chapter.id}
              unitId={requireUnitId(params.unitId)}
              chapter={chapter}
              chapters={chapters}
            />
          ))}
        </ol>
      </section>

      {/* Foot — secondary actions */}
      <section className="mt-20 flex flex-col items-start gap-6 md:mt-28 md:flex-row md:items-center md:justify-between">
        <Link
          href={`/units/${params.unitId}/theory/all/`}
          className="group inline-flex items-baseline gap-2 text-base text-ink-muted transition-colors duration-fast hover:text-accent"
        >
          <I18n
            ar="اقرأ الوحدة كلّها كوثيقة واحدة"
            he="קרא את היחידה כולה כמסמך אחד"
            en="Read the entire unit as one document"
            unstyled
            className="font-display italic"
          />
          <span aria-hidden className="font-mono text-xs">
            →
          </span>
        </Link>
        <Link
          href={`/units/${params.unitId}/theory/present/`}
          className="group inline-flex items-center gap-2 border border-accent bg-accent px-5 py-2.5 text-xs uppercase tracking-meta text-ink-inverted transition-colors duration-fast ease-out hover:bg-accent-dark"
        >
          <Play size={14} strokeWidth={1.5} aria-hidden />
          <I18n ar="ابدأ العرض" he="הפעל מצגת" en="Open presenter" as="span" unstyled />
        </Link>
      </section>
    </div>
  );
}

/** Take the first reasonably substantial sentence from a markdown body. */
function firstSentenceOf(text: string, _locale: 'ar' | 'he' | 'en'): string {
  const blocks = text.split(/\n{2,}/);
  for (const b of blocks) {
    const t = b.trim();
    if (!t) continue;
    if (t.startsWith('#') || t.startsWith('|') || t.startsWith('-')) continue;
    if (t.startsWith('>')) continue;
    // Drop bold-question wrappers etc.
    const cleaned = t.replace(/\*\*/g, '').replace(/_/g, '');
    return cleaned.split(/\.\s/)[0]?.trim() ?? cleaned;
  }
  return '';
}
