/**
 * Unit 03 · Newton's Laws — table of contents (فهرس).
 *
 * Mirrors the slide manifest in `lectureDeck.tsx`. Each section maps to a
 * contiguous range of slide numbers and is mounted as an anchor target by the
 * deck renderer. The DeckIndex component renders this structure as a clickable
 * editorial-style table of contents.
 */

export interface TocEntry {
  /** Anchor id (without the leading `#`). Used both as the DOM id of the
   *  section's first slide wrapper and as the link target. */
  id: string;
  title: { ar: string; he: string; en: string };
  /** Inclusive slide range, 1-indexed. */
  slides: [number, number];
  /** Sub-entries (one level deep — sub-topics within a section). */
  children?: TocEntry[];
}

export const UNIT_03_TOC: TocEntry[] = [
  {
    id: 'opening',
    title: { ar: 'الافتتاح', he: 'פתיחה', en: 'Opening' },
    slides: [1, 2],
  },
  {
    id: 'force-vector',
    title: { ar: 'القوّة كمتّجه', he: 'כוח כווקטור', en: 'Force as a vector' },
    slides: [3, 6],
  },
  {
    id: 'newton-first',
    title: {
      ar: 'القانون الأوّل · الجمود',
      he: 'חוק ראשון · התמדה',
      en: "Newton's First Law · Inertia",
    },
    slides: [7, 8],
  },
  {
    id: 'newton-second',
    title: {
      ar: 'القانون الثاني · المحرّك',
      he: 'חוק שני · המנוע',
      en: "Newton's Second Law · The engine",
    },
    slides: [9, 12],
  },
  {
    id: 'newton-third',
    title: {
      ar: 'القانون الثالث · الفعل وردّ الفعل',
      he: 'חוק שלישי · פעולה ותגובה',
      en: "Newton's Third Law · Action–reaction",
    },
    slides: [13, 14],
  },
  {
    id: 'forces',
    title: {
      ar: 'القوى الميكانيكيّة الأربع',
      he: 'ארבעת הכוחות המכניים',
      en: 'The four mechanical forces',
    },
    slides: [15, 22],
    children: [
      {
        id: 'force-weight',
        title: { ar: 'الوزن', he: 'משקל', en: 'Weight' },
        slides: [15, 16],
      },
      {
        id: 'force-normal',
        title: { ar: 'القوّة العموديّة', he: 'כוח נורמלי', en: 'Normal force' },
        slides: [17, 18],
      },
      {
        id: 'force-tension',
        title: { ar: 'الشدّ', he: 'מתיחות', en: 'Tension' },
        slides: [19, 20],
      },
      {
        id: 'force-friction',
        title: { ar: 'الاحتكاك', he: 'חיכוך', en: 'Friction' },
        slides: [21, 22],
      },
    ],
  },
  {
    id: 'cumulative',
    title: {
      ar: 'مثال تراكميّ · مستوى مائل مع احتكاك',
      he: 'דוגמה מצטברת · מישור משופע עם חיכוך',
      en: 'Cumulative · Incline with friction',
    },
    slides: [23, 23],
  },
  {
    id: 'misconceptions',
    title: {
      ar: 'الأخطاء الشائعة',
      he: 'טעויות נפוצות',
      en: 'Common misconceptions',
    },
    slides: [24, 28],
  },
  {
    id: 'summary',
    title: { ar: 'الخلاصة', he: 'סיכום', en: 'Summary' },
    slides: [29, 29],
  },
];

/**
 * For a 1-indexed slide number, returns the section id whose range starts at
 * exactly that slide (so the deck renderer can mount the anchor on the
 * section-opening slide).
 */
export function sectionAnchorForSlide(slideNumber: number): string | undefined {
  for (const top of UNIT_03_TOC) {
    if (top.slides[0] === slideNumber) return top.id;
    for (const child of top.children ?? []) {
      if (child.slides[0] === slideNumber) return child.id;
    }
  }
  return undefined;
}
