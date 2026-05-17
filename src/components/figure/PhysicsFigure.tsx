import type { ReactNode } from 'react';
import { LOCALE_DIR } from '@/lib/i18n/constants';
import { cn } from '@/lib/utils/cn';

export type PhysicsFigureVariant = 'hero' | 'plate' | 'inline';

export interface PhysicsFigureCaption {
  ar?: string;
  he?: string;
  en?: string;
}

export interface PhysicsFigureProps {
  /** Sizing tier. Default `hero`.
   *  - `hero`   ~700px wide, sits inside the content column with generous
   *             vertical breathing room. The default for concept teaching.
   *  - `plate`  ~1100px wide; breaks out to the wider page container so the
   *             figure can dominate. For pivotal visuals (cumulative
   *             example, misconception comparison).
   *  - `inline` ~320px max; sits in text flow as a small marginal aid. */
  variant?: PhysicsFigureVariant;
  /** The SVG (or any drawing). Always rendered at 100% of the variant's
   *  container width with auto height — composers don't need to know the
   *  rendered pixel size. */
  children: ReactNode;
  /** Trilingual italic caption beneath the figure. Each locale renders
   *  with its `data-lang` marker so the active language is shown. */
  caption?: PhysicsFigureCaption;
  /** Mono uppercase mark above the caption — e.g. `Fig. 3`. */
  figureNumber?: string;
  /** Mono uppercase mark below the caption — e.g. `after Halliday §5.4`. */
  sourceNote?: string;
}

const VARIANT_SHELL: Record<PhysicsFigureVariant, string> = {
  hero: 'mx-auto w-full max-w-[700px] my-12 md:my-16',
  plate: 'mx-auto w-full max-w-[1100px] my-16 md:my-20',
  inline: 'mx-auto w-full max-w-[320px] my-6',
};

const VARIANT_INNER_PADDING: Record<PhysicsFigureVariant, string> = {
  // 24 SVG units of margin live inside each diagram's viewBox; this CSS
  // padding adds a second layer of visual breathing room around the SVG
  // box so the drawing never sits flush against text or hairline rules.
  hero: 'px-2 md:px-6',
  plate: 'px-4 md:px-10',
  inline: 'px-1',
};

const VARIANT_CAPTION_SIZE: Record<PhysicsFigureVariant, string> = {
  hero: 'text-base md:text-lg',
  plate: 'text-lg md:text-xl',
  inline: 'text-sm',
};

/**
 * Editorial wrapper for a physics SVG. The component is responsible for:
 *
 *  1. **Sizing** — the SVG inside fills the variant's max-width box at
 *     full width; auto-height is computed from the SVG's intrinsic
 *     viewBox aspect.
 *  2. **Breathing room** — generous vertical margin (`my-12` to `my-20`
 *     by variant) so figures aren't crowded by surrounding type.
 *  3. **Caption** — italic Fraunces (English/display) or Noto Naskh
 *     (Arabic) / Heebo (Hebrew), centered, at a size proportional to the
 *     figure's gravity.
 *  4. **Numbering and source** — small mono uppercase labels above and
 *     below the caption, in `ink-faint` so they recede.
 *
 * The figure component carries the editorial weight; individual diagrams
 * just declare their geometry against a clean viewBox and let the figure
 * decide how big they appear.
 */
export function PhysicsFigure({
  variant = 'hero',
  children,
  caption,
  figureNumber,
  sourceNote,
}: PhysicsFigureProps) {
  const hasCaptionBlock = Boolean(caption || figureNumber || sourceNote);
  return (
    <figure
      data-figure-variant={variant}
      className={cn('flex flex-col items-center', VARIANT_SHELL[variant])}
    >
      <div className={cn('w-full', VARIANT_INNER_PADDING[variant])}>{children}</div>
      {hasCaptionBlock && (
        <figcaption className="mt-5 flex flex-col items-center gap-1.5 text-center md:mt-6">
          {figureNumber && (
            <span
              dir="ltr"
              className="font-mono text-[10px] uppercase tracking-[0.25em] text-ink-faint"
            >
              {figureNumber}
            </span>
          )}
          {caption && (
            <div
              className={cn(
                'mx-auto max-w-prose italic text-ink-muted',
                VARIANT_CAPTION_SIZE[variant],
              )}
            >
              {caption.ar && (
                <p data-lang="ar" dir={LOCALE_DIR.ar} className="font-arabic leading-arabic">
                  {caption.ar}
                </p>
              )}
              {caption.he && (
                <p data-lang="he" dir={LOCALE_DIR.he} className="font-hebrew">
                  {caption.he}
                </p>
              )}
              {caption.en && (
                <p data-lang="en" dir={LOCALE_DIR.en} className="font-display">
                  {caption.en}
                </p>
              )}
            </div>
          )}
          {sourceNote && (
            <span
              dir="ltr"
              className="mt-1 font-mono text-[10px] uppercase tracking-[0.25em] text-ink-faint"
            >
              {sourceNote}
            </span>
          )}
        </figcaption>
      )}
    </figure>
  );
}
