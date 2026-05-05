import type { ReactNode } from 'react';
import type { BaselineDeckSlide } from '@/lib/content/types';
import { BaselineConceptSlide } from './BaselineConceptSlide';
import { BaselineExampleSlide } from './BaselineExampleSlide';
import { BaselineHookSlide } from './BaselineHookSlide';
import { BaselineMisconceptionSlide } from './BaselineMisconceptionSlide';
import { BaselineSummarySlide } from './BaselineSummarySlide';
import { BaselineTitleSlide } from './BaselineTitleSlide';

/**
 * Presenter-mode slide renderer. Dispatches a `BaselineDeckSlide` to a
 * `<Baseline*Slide>` component framed by `BaselineSlideFrame` (16:10 card,
 * letter-boxed for projection).
 *
 * **Outline mode no longer uses this path.** As of the editorial rebuild,
 * `/units/{id}/theory/` composes a continuous spread document via the
 * components in `src/components/spreads/` instead — each slide type
 * renders its own full-width composition with hero figures and editorial
 * typography. This file remains for:
 *   - the presenter route (`/units/{id}/theory/present/`)
 *   - the dev preview (`/dev/baseline-03/`)
 *   - any future unit's lectureDeck manifest — Unit 02 will reuse this as-is.
 *
 * Slide components are async server components; callers can include the
 * returned ReactNode directly in JSX (Next.js App Router handles the awaiting
 * during streaming).
 */
export function renderBaselineSlide(
  unit: string,
  entry: BaselineDeckSlide,
  slideNumber: string,
): ReactNode {
  switch (entry.type) {
    case 'title':
      return <BaselineTitleSlide unit={unit} slideNumber={slideNumber} />;
    case 'hook':
      return <BaselineHookSlide unit={unit} slideNumber={slideNumber} />;
    case 'concept':
      if (!entry.id) throw new Error('renderBaselineSlide: concept entry missing id');
      return <BaselineConceptSlide unit={unit} id={entry.id} slideNumber={slideNumber} />;
    case 'example':
      if (!entry.id) throw new Error('renderBaselineSlide: example entry missing id');
      return <BaselineExampleSlide unit={unit} id={entry.id} slideNumber={slideNumber} />;
    case 'misconception':
      if (!entry.id) throw new Error('renderBaselineSlide: misconception entry missing id');
      return <BaselineMisconceptionSlide unit={unit} id={entry.id} slideNumber={slideNumber} />;
    case 'summary':
      return <BaselineSummarySlide unit={unit} slideNumber={slideNumber} />;
  }
}
