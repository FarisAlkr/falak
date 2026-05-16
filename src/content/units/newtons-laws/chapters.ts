import type { Chapter } from '@/lib/content/types';

/**
 * Unit 03 · Newton's Laws & Dynamics — chapter manifest.
 *
 * Five chapters covering slides 1–32 of the lecture deck. Slide 33 (the
 * unit summary) is reachable only via the long-scroll `/theory/all/` page
 * and the full-unit presenter — see judgment-call note in the report. Each
 * chapter's slide range matches the deck manifest in `lectureDeck.tsx`,
 * the chapter break positions in `theory/page.tsx` (long-scroll), and the
 * TOC in `toc.ts`. If any of those move, all four files move together.
 *
 * Trilingual descriptions are best-effort native drafts. Arabic and Hebrew
 * are flagged ⚑ pending native-speaker review (per project policy — no
 * machine-translated student-facing prose ships unverified).
 */
export const NEWTONS_LAWS_CHAPTERS: readonly Chapter[] = [
  {
    id: 'foundations',
    number: 'I',
    title: {
      ar: 'الأسس',
      he: 'יסודות',
      en: 'Foundations',
    },
    description: {
      ar: 'ما هي القوى وكيف نجمعها — اللغة التي سنستخدمها في الوحدة كلّها. ⚑',
      he: 'מהם כוחות וכיצד מחברים אותם — השפה שנעבוד איתה לאורך כל היחידה. ⚑',
      en: 'What forces are and how they add together — the language we will use for the rest of the unit.',
    },
    slides: [1, 6],
    estimatedMinutes: 12,
    tocSectionIds: ['opening', 'force-vector'],
    prerequisites: [],
    kind: 'foundation',
  },
  {
    id: 'the-laws',
    number: 'II',
    title: {
      ar: 'القوانين الثلاثة',
      he: 'שלושת החוקים',
      en: 'The Three Laws',
    },
    description: {
      ar: 'قوانين نيوتن الثلاثة، محرّك الميكانيكا: متى تتحرّك الأجسام، ولماذا، وكيف تأتي القوى دائماً في أزواج. ⚑',
      he: 'שלושת חוקי ניוטון, המנוע של המכניקה: מתי גופים נעים, מדוע, וכיצד כוחות מופיעים תמיד בזוגות. ⚑',
      en: "Newton's three laws of motion, the engine of mechanics: when bodies move, why they move, and how forces always come in pairs.",
    },
    slides: [7, 18],
    estimatedMinutes: 25,
    tocSectionIds: ['newton-first', 'newton-second', 'newton-third'],
    prerequisites: ['foundations'],
    kind: 'core',
  },
  {
    id: 'the-four-forces',
    number: 'III',
    title: {
      ar: 'القوى الأربع',
      he: 'ארבעת הכוחות',
      en: 'The Four Forces',
    },
    description: {
      ar: 'القوى الميكانيكيّة التي ستلاقيها في كلّ مسألة بجروت: الوزن، والقوّة العموديّة، والشدّ، والاحتكاك. ⚑',
      he: 'הכוחות המכניים שתפגשו בכל שאלת בגרות: משקל, כוח נורמלי, מתיחות, וחיכוך. ⚑',
      en: "The mechanical forces you'll meet in every Bagrut problem: weight, normal, tension, and friction.",
    },
    slides: [19, 26],
    estimatedMinutes: 18,
    tocSectionIds: ['forces'],
    prerequisites: ['the-laws'],
    kind: 'core',
  },
  {
    id: 'synthesis',
    number: 'IV',
    title: {
      ar: 'التركيب',
      he: 'סינתזה',
      en: 'Synthesis',
    },
    description: {
      ar: 'النموذج المعتاد في البجروت — كتلة على مستوى مائل مع احتكاك. كلّ مفاهيم الوحدة في مسألة واحدة. ⚑',
      he: 'השאלה הקלאסית של הבגרות — גוף על מישור משופע עם חיכוך. כל מושגי היחידה במקום אחד. ⚑',
      en: 'The Bagrut staple — a block on an incline with friction. Every concept of the unit applied at once.',
    },
    slides: [27, 27],
    estimatedMinutes: 10,
    tocSectionIds: ['cumulative'],
    prerequisites: ['the-four-forces'],
    kind: 'synthesis',
  },
  {
    id: 'common-pitfalls',
    number: 'V',
    title: {
      ar: 'الأخطاء الشائعة',
      he: 'טעויות נפוצות',
      en: 'Common Pitfalls',
    },
    description: {
      ar: 'الأخطاء التي يقع فيها الطلّاب غالباً. كلّ واحد منها معزول ومحلّل كي لا يظهر في امتحانك. ⚑',
      he: 'הטעויות הנפוצות ביותר. כל אחת מבודדת ומפוצחת כדי שלא תופיע במבחן שלכם. ⚑',
      en: "The mistakes students make most often. Each one quarantined and dissected so they don't show up on your exam.",
    },
    slides: [28, 32],
    estimatedMinutes: 10,
    tocSectionIds: ['misconceptions'],
    prerequisites: ['the-laws'],
    kind: 'misconceptions',
  },
];
