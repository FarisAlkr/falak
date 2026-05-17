import type { Locale } from '@/types/progress';

/**
 * UI shell strings — nav, buttons, captions, system labels.
 *
 * Per-unit / per-slide content is **not** stored here; it lives in
 * `docs/content/{NN}_{unit}.md` and is rendered through the baseline parser.
 * This table is for the chrome only.
 */
export const STRINGS: Record<string, Record<Locale, string>> = {
  // App-level
  appName: { ar: 'فَلَك', he: 'פלאק', en: 'Falak' },
  appTagline: {
    ar: 'منصّة الفيزياء للبجروت',
    he: 'פלטפורמת פיזיקה לבגרות',
    en: 'Physics platform for the Bagrut',
  },

  // Navigation
  allUnits: { ar: 'كلّ الوحدات', he: 'כל היחידות', en: 'All units' },
  back: { ar: 'العودة', he: 'חזרה', en: 'Back' },
  unitLabel: { ar: 'وحدة', he: 'יחידה', en: 'Unit' },

  // Mode tabs (also in MODE_LABELS — kept here for nav chrome consistency)
  modeTheory: { ar: 'نظري', he: 'תיאוריה', en: 'Theory' },
  modeInteractive: { ar: 'لعب', he: 'סימולציה', en: 'Interactive' },
  modeExam: { ar: 'امتحان', he: 'מבחן', en: 'Exam' },
  modeSummary: { ar: 'ملخّص', he: 'סיכום', en: 'Summary' },

  // Status / Bagrut weight
  bagrutWeight: { ar: 'الوزن في البجروت', he: 'משקל בבגרות', en: 'Bagrut weight' },
  highYield: { ar: 'وزن مرتفع', he: 'משקל גבוה', en: 'High yield' },
  veryHighYield: { ar: 'وزن مرتفع جدّاً', he: 'משקל גבוה מאוד', en: 'Very high yield' },
  mediumYield: { ar: 'وزن متوسّط', he: 'משקל בינוני', en: 'Medium yield' },
  lowYield: { ar: 'وزن منخفض', he: 'משקל נמוך', en: 'Low yield' },

  // Placeholder
  comingSoon: { ar: 'قريباً', he: 'בקרוב', en: 'Coming soon' },

  // Slide chrome
  problem: { ar: 'المسألة', he: 'בעיה', en: 'Problem' },
  solution: { ar: 'الحلّ', he: 'פתרון', en: 'Solution' },
  narrative: { ar: 'الشرح', he: 'הסבר', en: 'Narrative' },
  watchOut: { ar: 'انتبه', he: 'שים לב', en: 'Watch out' },
  whatStudentsSay: { ar: 'الخطأ الشائع', he: 'הטעות הנפוצה', en: 'What students say' },
  actuallyTrue: { ar: 'الصحيح', he: 'הנכון', en: "What's actually true" },
  whyTheyFall: {
    ar: 'لماذا يقع الطلّاب فيه',
    he: 'למה תלמידים נופלים',
    en: 'Why students fall for it',
  },

  // Difficulty
  difficultyBasic: { ar: 'أساسي', he: 'בסיסי', en: 'Basic' },
  difficultyIntermediate: { ar: 'متوسّط', he: 'בינוני', en: 'Intermediate' },
  difficultyAdvanced: { ar: 'متقدّم', he: 'מתקדם', en: 'Advanced' },

  // Slide kicker types
  kickerConceptDefinition: { ar: 'مفهوم · تعريف', he: 'מושג · הגדרה', en: 'Concept · Definition' },
  kickerConceptLaw: { ar: 'مفهوم · قانون', he: 'מושג · חוק', en: 'Concept · Law' },
  kickerConceptDerivation: { ar: 'مفهوم · اشتقاق', he: 'מושג · גזירה', en: 'Concept · Derivation' },
  kickerConceptApplication: {
    ar: 'مفهوم · تطبيق',
    he: 'מושג · יישום',
    en: 'Concept · Application',
  },
  kickerExample: { ar: 'مثال', he: 'דוגמה', en: 'Example' },
  kickerMisconception: { ar: 'مفهوم خاطئ', he: 'מושג מוטעה', en: 'Misconception' },
  kickerSummary: { ar: 'الخلاصة', he: 'סיכום', en: 'Summary' },
  kickerHook: { ar: 'سؤال الانطلاق', he: 'שאלת פתיחה', en: 'Opening question' },

  // Language selector
  language: { ar: 'اللغة', he: 'שפה', en: 'Language' },
  switchLanguage: { ar: 'تغيير اللغة', he: 'החלף שפה', en: 'Change language' },

  // Hover-term affordance
  hoverForTranslation: {
    ar: 'مرّر للترجمة',
    he: 'רחף לתרגום',
    en: 'Hover for translation',
  },
};

export type StringKey = keyof typeof STRINGS;

export function getString(key: StringKey, locale: Locale): string {
  return STRINGS[key]?.[locale] ?? key;
}
