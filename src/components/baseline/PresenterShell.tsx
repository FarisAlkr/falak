'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { useCallback, useEffect, useState, type ReactNode } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { ChevronLeft, ChevronRight, Maximize2, Minimize2, X } from 'lucide-react';
import { I18n } from '@/components/i18n/I18n';
import type { TocEntry } from '@/content/units/newtons-laws/toc';
import { LOCALE_DIR } from '@/lib/i18n/constants';
import { cn } from '@/lib/utils/cn';

interface PresenterShellProps {
  slides: ReactNode[];
  toc: TocEntry[];
  unitId: string;
  totalSlides: number;
}

/**
 * Real presenter mode: one slide at a time, fills the viewport, keyboard
 * navigation, fullscreen toggle, persistent slide counter and progress rail.
 *
 * Keyboard shortcuts:
 *   ← / →   prev / next slide  (j / k also accepted)
 *   Home / End   first / last slide
 *   F       toggle fullscreen
 *   Esc     exit fullscreen → return to outline mode if already windowed
 *
 * URL param `?slide=N` keeps position on refresh and supports deep-linking.
 */
export function PresenterShell({ slides, toc, unitId, totalSlides }: PresenterShellProps) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const initial = clamp(parseInt(searchParams.get('slide') ?? '1', 10) || 1, 1, totalSlides);
  const [index, setIndex] = useState(initial);
  const [direction, setDirection] = useState<1 | -1>(1);
  const [isFullscreen, setIsFullscreen] = useState(false);

  // Keep the URL in sync without forcing a server roundtrip — replace, not push.
  useEffect(() => {
    const url = new URL(window.location.href);
    url.searchParams.set('slide', String(index));
    window.history.replaceState({}, '', url.toString());
  }, [index]);

  const goTo = useCallback(
    (target: number) => {
      const next = clamp(target, 1, totalSlides);
      if (next === index) return;
      setDirection(next > index ? 1 : -1);
      setIndex(next);
    },
    [index, totalSlides],
  );

  const toggleFullscreen = useCallback(async () => {
    if (typeof document === 'undefined') return;
    if (!document.fullscreenElement) {
      try {
        await document.documentElement.requestFullscreen();
      } catch {
        /* ignore — browser may block */
      }
    } else {
      await document.exitFullscreen();
    }
  }, []);

  // Keyboard handling
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement | null;
      if (target && (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA')) return;

      if (e.key === 'ArrowRight' || e.key === 'k' || e.key === ' ') {
        e.preventDefault();
        goTo(index + 1);
      } else if (e.key === 'ArrowLeft' || e.key === 'j') {
        e.preventDefault();
        goTo(index - 1);
      } else if (e.key === 'Home') {
        e.preventDefault();
        goTo(1);
      } else if (e.key === 'End') {
        e.preventDefault();
        goTo(totalSlides);
      } else if (e.key === 'f' || e.key === 'F') {
        e.preventDefault();
        void toggleFullscreen();
      } else if (e.key === 'Escape') {
        // If fullscreen, browser handles exit. If not, route back to outline.
        if (!document.fullscreenElement) {
          router.push(`/units/${unitId}/theory/`);
        }
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [index, totalSlides, goTo, toggleFullscreen, router, unitId]);

  // Track fullscreen changes
  useEffect(() => {
    const onChange = () => setIsFullscreen(Boolean(document.fullscreenElement));
    document.addEventListener('fullscreenchange', onChange);
    return () => document.removeEventListener('fullscreenchange', onChange);
  }, []);

  const currentSection = findSectionForSlide(toc, index);
  const slide = slides[index - 1];

  return (
    <div
      dir="ltr"
      className="fixed inset-0 z-40 flex flex-col bg-paper"
      style={{ paddingTop: isFullscreen ? 0 : 56 }}
    >
      {/* Top chrome: section breadcrumb (left) + actions (right) */}
      <div className="bg-paper/85 absolute inset-x-0 top-0 z-50 flex items-center justify-between border-b border-border px-6 py-2 backdrop-blur-sm">
        <div className="flex items-center gap-3 text-xs text-ink-muted">
          <Link
            href={`/units/${unitId}/theory/`}
            className="inline-flex items-center gap-1 transition-colors hover:text-ink"
            aria-label="Exit presenter"
          >
            <X size={14} strokeWidth={1.5} aria-hidden />
            <I18n
              ar="عودة"
              he="חזרה"
              en="Outline"
              as="span"
              unstyled
              className="font-mono uppercase tracking-meta"
            />
          </Link>
          {currentSection && (
            <>
              <span aria-hidden className="text-border-strong">
                ·
              </span>
              <span>
                <span data-lang="ar" dir={LOCALE_DIR.ar} className="font-arabic">
                  {currentSection.title.ar}
                </span>
                <span data-lang="he" dir={LOCALE_DIR.he} className="font-hebrew">
                  {currentSection.title.he}
                </span>
                <span data-lang="en" dir={LOCALE_DIR.en} className="font-display">
                  {currentSection.title.en}
                </span>
              </span>
            </>
          )}
        </div>

        <div className="flex items-center gap-3">
          <span
            dir="ltr"
            className="font-mono text-xs uppercase tabular-nums tracking-meta text-ink-faint"
          >
            {index} / {totalSlides}
          </span>
          <button
            type="button"
            onClick={toggleFullscreen}
            aria-label={isFullscreen ? 'Exit fullscreen' : 'Enter fullscreen'}
            className="text-ink-muted transition-colors hover:text-ink"
          >
            {isFullscreen ? (
              <Minimize2 size={16} strokeWidth={1.5} />
            ) : (
              <Maximize2 size={16} strokeWidth={1.5} />
            )}
          </button>
        </div>
      </div>

      {/* Slide stage */}
      <div className="relative flex flex-1 items-center justify-center overflow-hidden p-4 md:p-10">
        <AnimatePresence custom={direction} mode="wait">
          <motion.div
            key={index}
            custom={direction}
            initial={{ opacity: 0, x: direction * 24 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -direction * 24 }}
            transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
            className="w-full max-w-6xl"
          >
            {slide}
          </motion.div>
        </AnimatePresence>

        {/* Edge nav — large invisible click zones with subtle chevrons */}
        <button
          type="button"
          aria-label="Previous slide"
          onClick={() => goTo(index - 1)}
          disabled={index === 1}
          className="group absolute inset-y-0 left-0 z-30 flex w-16 items-center justify-center text-ink-faint opacity-0 transition-opacity duration-fast hover:opacity-100 disabled:cursor-not-allowed disabled:opacity-0"
        >
          <ChevronLeft size={28} strokeWidth={1.25} />
        </button>
        <button
          type="button"
          aria-label="Next slide"
          onClick={() => goTo(index + 1)}
          disabled={index === totalSlides}
          className="group absolute inset-y-0 right-0 z-30 flex w-16 items-center justify-center text-ink-faint opacity-0 transition-opacity duration-fast hover:opacity-100 disabled:cursor-not-allowed disabled:opacity-0"
        >
          <ChevronRight size={28} strokeWidth={1.25} />
        </button>
      </div>

      {/* Progress rail */}
      <div className="bg-paper/85 absolute inset-x-0 bottom-0 z-50 border-t border-border backdrop-blur-sm">
        <div
          className="h-0.5 bg-accent transition-all duration-base ease-out"
          style={{ width: `${(index / totalSlides) * 100}%` }}
          aria-hidden
        />
        <div className="flex flex-wrap items-center gap-1 px-6 py-2.5">
          {toc.map((entry) => (
            <SectionDot
              key={entry.id}
              entry={entry}
              currentSlide={index}
              onJump={(slide) => goTo(slide)}
            />
          ))}
        </div>
      </div>

      {/* Hidden hint about keyboard shortcuts — first-mount nudge */}
      <KeyboardHint />
    </div>
  );
}

function SectionDot({
  entry,
  currentSlide,
  onJump,
}: {
  entry: TocEntry;
  currentSlide: number;
  onJump: (slide: number) => void;
}) {
  const active = currentSlide >= entry.slides[0] && currentSlide <= entry.slides[1];
  return (
    <button
      type="button"
      onClick={() => onJump(entry.slides[0])}
      className={cn(
        'group flex items-center gap-1.5 rounded-sm px-2 py-1 text-[10px] uppercase tracking-meta transition-colors duration-fast ease-out',
        active ? 'text-ink' : 'text-ink-faint hover:text-ink-muted',
      )}
      aria-label={entry.title.en}
    >
      <span
        aria-hidden
        className={cn(
          'h-1.5 w-1.5 rounded-full transition-colors',
          active ? 'bg-accent' : 'bg-ink-faint/40 group-hover:bg-ink-muted',
        )}
      />
      <span className="hidden sm:inline">
        <span data-lang="ar" dir={LOCALE_DIR.ar} className="font-arabic">
          {entry.title.ar.split(' · ')[0]}
        </span>
        <span data-lang="he" dir={LOCALE_DIR.he} className="font-hebrew">
          {entry.title.he.split(' · ')[0]}
        </span>
        <span data-lang="en" dir={LOCALE_DIR.en} className="font-mono">
          {entry.title.en.split(' · ')[0]}
        </span>
      </span>
    </button>
  );
}

function KeyboardHint() {
  const [visible, setVisible] = useState(true);
  useEffect(() => {
    const t = setTimeout(() => setVisible(false), 4500);
    return () => clearTimeout(t);
  }, []);
  if (!visible) return null;
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      className="pointer-events-none absolute bottom-16 left-1/2 z-50 -translate-x-1/2"
    >
      <div className="rounded-sm border border-border bg-paper-raised px-3 py-1.5 font-mono text-[10px] uppercase tracking-meta text-ink-muted shadow-soft">
        ← → · F · Esc
      </div>
    </motion.div>
  );
}

function findSectionForSlide(toc: TocEntry[], slide: number): TocEntry | undefined {
  for (const top of toc) {
    if (slide >= top.slides[0] && slide <= top.slides[1]) {
      // Prefer the deepest matching child for a more specific breadcrumb.
      for (const child of top.children ?? []) {
        if (slide >= child.slides[0] && slide <= child.slides[1]) {
          return child;
        }
      }
      return top;
    }
  }
  return undefined;
}

function clamp(n: number, lo: number, hi: number): number {
  if (n < lo) return lo;
  if (n > hi) return hi;
  return n;
}
