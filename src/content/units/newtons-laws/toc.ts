/**
 * Unit 03 · Newton's Laws — table of contents (فهرس).
 *
 * Mirrors the slide manifest in `lectureDeck.tsx`. Each section maps to a
 * contiguous range of slide numbers and is mounted as an anchor target by the
 * deck renderer.
 *
 * Per pedagogy Rule 2, every Newton-law section ships easy / mid / hard
 * examples in difficulty order. Newton I and Newton III now have all three
 * tiers; Newton II has its 🟢 + 🟡 + a 🔴 picked up by the cumulative section
 * that follows.
 */

export interface TocEntry {
  id: string;
  title: { ar: string; he: string; en: string };
  /** Inclusive slide range, 1-indexed. */
  slides: [number, number];
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
    slides: [7, 10],
    children: [
      {
        id: 'newton-first-easy',
        title: {
          ar: 'مثال أساسيّ · كتاب على طاولة',
          he: 'דוגמה בסיסית',
          en: 'Easy · Book on table',
        },
        slides: [8, 8],
      },
      {
        id: 'newton-first-mid',
        title: {
          ar: 'مثال متوسّط · لافتة معلّقة',
          he: 'דוגמה בינונית',
          en: 'Medium · Hanging sign',
        },
        slides: [9, 9],
      },
      {
        id: 'newton-first-hard',
        title: {
          ar: 'مثال متقدّم · مستوى مائل بسرعة ثابتة',
          he: 'דוגמה מתקדמת',
          en: 'Hard · Constant-velocity incline',
        },
        slides: [10, 10],
      },
    ],
  },
  {
    id: 'newton-second',
    title: {
      ar: 'القانون الثاني · المحرّك',
      he: 'חוק שני · המנוע',
      en: "Newton's Second Law · The engine",
    },
    slides: [11, 14],
  },
  {
    id: 'newton-third',
    title: {
      ar: 'القانون الثالث · الفعل وردّ الفعل',
      he: 'חוק שלישי · פעולה ותגובה',
      en: "Newton's Third Law · Action–reaction",
    },
    slides: [15, 18],
    children: [
      {
        id: 'newton-third-easy',
        title: { ar: 'مثال أساسيّ · السباحة', he: 'דוגמה בסיסית', en: 'Easy · Swimming' },
        slides: [16, 16],
      },
      {
        id: 'newton-third-mid',
        title: {
          ar: 'مثال متوسّط · صندوقان متلاصقان',
          he: 'דוגמה בינונית',
          en: 'Medium · Two boxes',
        },
        slides: [17, 17],
      },
      {
        id: 'newton-third-hard',
        title: {
          ar: 'مثال متقدّم · ثلاثة صناديق',
          he: 'דוגמה מתקדמת',
          en: 'Hard · Three-box stack',
        },
        slides: [18, 18],
      },
    ],
  },
  {
    id: 'forces',
    title: {
      ar: 'القوى الميكانيكيّة الأربع',
      he: 'ארבעת הכוחות המכניים',
      en: 'The four mechanical forces',
    },
    slides: [19, 26],
    children: [
      {
        id: 'force-weight',
        title: { ar: 'الوزن', he: 'משקל', en: 'Weight' },
        slides: [19, 20],
      },
      {
        id: 'force-normal',
        title: { ar: 'القوّة العموديّة', he: 'כוח נורמלי', en: 'Normal force' },
        slides: [21, 22],
      },
      {
        id: 'force-tension',
        title: { ar: 'الشدّ', he: 'מתיחות', en: 'Tension' },
        slides: [23, 24],
      },
      {
        id: 'force-friction',
        title: { ar: 'الاحتكاك', he: 'חיכוך', en: 'Friction' },
        slides: [25, 26],
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
    slides: [27, 27],
  },
  {
    id: 'misconceptions',
    title: {
      ar: 'الأخطاء الشائعة',
      he: 'טעויות נפוצות',
      en: 'Common misconceptions',
    },
    slides: [28, 32],
  },
  {
    id: 'summary',
    title: { ar: 'الخلاصة', he: 'סיכום', en: 'Summary' },
    slides: [33, 33],
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
