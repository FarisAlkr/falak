import type { Trilingual } from './i18n';

export const MODE_ORDER = ['theory', 'interactive', 'exam', 'summary'] as const;

export type UnitMode = (typeof MODE_ORDER)[number];

export const MODE_LABELS: Record<UnitMode, Trilingual> = {
  theory: { ar: 'نظري', he: 'תיאוריה', en: 'Theory' },
  interactive: { ar: 'محاكاة', he: 'סימולציה', en: 'Interactive' },
  exam: { ar: 'امتحان', he: 'מבחן', en: 'Exam' },
  summary: { ar: 'ملخّص', he: 'סיכום', en: 'Summary' },
};
