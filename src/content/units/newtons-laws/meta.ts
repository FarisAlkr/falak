import type { UnitMeta } from '@/types/unit';

export const meta: UnitMeta = {
  id: 'newtons-laws',
  number: 3,
  section: 'mechanics',

  titles: {
    ar: 'قوانين نيوتن والديناميكا',
    he: 'חוקי ניוטון ודינמיקה',
    en: "Newton's Laws & Dynamics",
  },

  description: {
    ar: 'فهم قوانين نيوتن الثلاثة وتطبيقها في حل مسائل الديناميكا، من المستوى المائل إلى الكتل المتّصلة.',
    he: 'הבנת שלושת חוקי ניוטון ויישומם בפתרון בעיות דינמיקה — ממישור משופע ועד מסות מחוברות.',
    en: "Understanding Newton's three laws and applying them to dynamics problems — from inclined planes to connected masses.",
  },

  prerequisites: ['kinematics-1d', 'kinematics-2d'],

  estimatedMinutes: {
    theory: 45,
    interactive: 30,
    exam: 45,
    summary: 5,
  },

  bagrutWeight: 'very-high',

  keyTerms: [
    { ar: 'القوّة', he: 'כוח', en: 'Force' },
    { ar: 'الكتلة', he: 'מסה', en: 'Mass' },
    { ar: 'الوزن', he: 'משקל', en: 'Weight' },
    { ar: 'التسارع', he: 'תאוצה', en: 'Acceleration' },
    { ar: 'القوّة المحصّلة', he: 'כוח שקול', en: 'Net force' },
    { ar: 'القوّة العموديّة', he: 'כוח נורמלי', en: 'Normal force' },
    { ar: 'الشدّ', he: 'מתיחות', en: 'Tension' },
    { ar: 'الاحتكاك السكوني', he: 'חיכוך סטטי', en: 'Static friction' },
    { ar: 'الاحتكاك الحركي', he: 'חיכוך קינטי', en: 'Kinetic friction' },
    { ar: 'مخطط الجسم الحر', he: 'דיאגרמת כוחות', en: 'Free-body diagram' },
    { ar: 'اتّزان', he: 'שיווי משקל', en: 'Equilibrium' },
    { ar: 'مستوى مائل', he: 'מישור משופע', en: 'Inclined plane' },
    { ar: 'بكرة', he: 'גלגלת', en: 'Pulley' },
    { ar: 'كتل متّصلة', he: 'מסות מחוברות', en: 'Connected masses' },
  ],

  interactiveType: 'fbd-builder',

  summaryTakeaway: {
    ar: 'القوّة المحصّلة على جسم تساوي حاصل ضرب كتلته في تسارعه. بدون قوّة محصّلة، لا يوجد تسارع.',
    he: 'הכוח השקול על גוף שווה למכפלת המסה בתאוצה. בלי כוח שקול, אין תאוצה.',
    en: 'Net force on an object equals its mass times its acceleration. No net force, no acceleration.',
  },
};
