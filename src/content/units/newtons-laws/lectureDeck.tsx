import type { BaselineDeckSlide } from '@/lib/content/types';

export const UNIT_03_NUMBER = '03';

/**
 * Unit 03 · Newton's Laws — slide manifest.
 *
 * Source of truth is `docs/content/03_newtons_laws.md`. This array names the
 * concept/example/misconception IDs from the baseline; rendering is delegated
 * to `renderBaselineSlide(unit, entry, slideNumber)`.
 *
 * Order follows `docs/09_pedagogy.md`:
 *   - title + hook
 *   - interleaved concept/example pairs (Rule 1)
 *   - cumulative 🔴
 *   - misconception quarantine (Rule 3)
 *   - summary
 *
 * Newton I and Newton III each ship three examples in difficulty order
 * (basic → intermediate → advanced) per Rule 2. Newton II's 🔴 is the
 * cumulative incline-with-friction that immediately follows.
 */
export const UNIT_03_DECK: BaselineDeckSlide[] = [
  // Opening
  { type: 'title' },
  { type: 'hook' },

  // Force as a vector
  { type: 'concept', id: 'force-as-vector' },
  { type: 'example', id: 'ex-two-forces-same-direction' },

  // Net force
  { type: 'concept', id: 'net-force-sigma' },
  { type: 'example', id: 'ex-three-forces-1d' },

  // Newton I — easy / medium / hard examples per pedagogy Rule 2
  { type: 'concept', id: 'newton-first-law' },
  { type: 'example', id: 'ex-book-on-table' }, // 🟢 basic
  { type: 'example', id: 'ex-hanging-sign-equilibrium' }, // 🟡 intermediate
  { type: 'example', id: 'ex-incline-constant-velocity' }, // 🔴 advanced

  // Newton II — the engine
  { type: 'concept', id: 'newton-second-vector' },
  { type: 'example', id: 'ex-block-pushed' },

  // Newton II per axis
  { type: 'concept', id: 'newton-second-per-axis' },
  { type: 'example', id: 'ex-2d-perpendicular-forces' },

  // Newton III — easy / medium / hard examples per pedagogy Rule 2
  { type: 'concept', id: 'newton-third-law' },
  { type: 'example', id: 'ex-swimming' }, // 🟢 basic
  { type: 'example', id: 'ex-two-boxes-contact' }, // 🟡 intermediate
  { type: 'example', id: 'ex-three-boxes-stack' }, // 🔴 advanced

  // The four mechanical forces
  { type: 'concept', id: 'weight' },
  { type: 'example', id: 'ex-weight-of-book' },
  { type: 'concept', id: 'normal-force' },
  { type: 'example', id: 'ex-block-on-incline-find-N' },
  { type: 'concept', id: 'tension' },
  { type: 'example', id: 'ex-atwood-basic' },
  { type: 'concept', id: 'friction' },
  { type: 'example', id: 'ex-friction-bound' },

  // Cumulative — the 🔴 Bagrut staple
  { type: 'example', id: 'ex-incline-with-friction' },

  // Misconception quarantine (Rule 3 — must come after cumulative)
  { type: 'misconception', id: 'misc-moving-needs-force' },
  { type: 'misconception', id: 'misc-action-reaction-cancel' },
  { type: 'misconception', id: 'misc-N-equals-mg' },
  { type: 'misconception', id: 'misc-friction-opposes-force' },
  { type: 'misconception', id: 'misc-rest-no-forces' },

  // Closing
  { type: 'summary' },
];
