import type { ReactNode } from 'react';
import type { BaselineDeckSlide } from '@/lib/content/types';
import { ConceptSpread } from './ConceptSpread';
import { ExampleSpread } from './ExampleSpread';
import { HookSpread } from './HookSpread';
import { MisconceptionSpread } from './MisconceptionSpread';
import { SummarySpread } from './SummarySpread';
import { TitleSpread } from './TitleSpread';

/**
 * Dispatch a `BaselineDeckSlide` to the matching spread component. Used by:
 *
 *   - the long-scroll route at `/units/{id}/theory/all/`
 *   - the per-chapter routes at `/units/{id}/theory/{chapter}/`
 *
 * The async server-component spreads inside accept `unit` and (where
 * applicable) `id` props, plus a `domId` so the page can mount section
 * anchors for jump-to-slide navigation.
 */
export function renderSpread(entry: BaselineDeckSlide, unit: string, domId: string): ReactNode {
  switch (entry.type) {
    case 'title':
      return <TitleSpread unit={unit} id={domId} />;
    case 'hook':
      return <HookSpread unit={unit} id={domId} />;
    case 'concept':
      if (!entry.id) return null;
      return <ConceptSpread unit={unit} id={entry.id} domId={domId} />;
    case 'example':
      if (!entry.id) return null;
      return <ExampleSpread unit={unit} id={entry.id} domId={domId} />;
    case 'misconception':
      if (!entry.id) return null;
      return <MisconceptionSpread unit={unit} id={entry.id} domId={domId} />;
    case 'summary':
      return <SummarySpread unit={unit} id={domId} />;
  }
}
