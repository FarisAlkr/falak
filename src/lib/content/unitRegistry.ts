import { type UnitListing, UNIT_IDS } from '@/types/unit';

export { UNIT_IDS };

/**
 * The 12-unit listing — mirrors `docs/content/00_baseline_index.md`.
 *
 * `bagrutWeight` is a coarse pedagogical signal (very-high/high/medium/low)
 * shown on unit cards; it's not the same as `bagrut_weight_estimate` in the
 * baseline frontmatter (which is a percentage of one shaalon).
 */
export const UNIT_LISTING: readonly UnitListing[] = [
  {
    id: 'kinematics-1d',
    number: 1,
    section: 'mechanics',
    titles: {
      ar: 'الحركة في بُعد واحد',
      he: 'תנועה בציר אחד',
      en: '1D Kinematics',
    },
    bagrutWeight: 'high',
    status: 'not-started',
  },
  {
    id: 'kinematics-2d',
    number: 2,
    section: 'mechanics',
    titles: {
      ar: 'الحركة في بُعدين والمقذوفات',
      he: 'תנועה בשני צירים וזריקות',
      en: '2D Kinematics & Projectiles',
    },
    bagrutWeight: 'high',
    status: 'not-started',
  },
  {
    id: 'newtons-laws',
    number: 3,
    section: 'mechanics',
    titles: {
      ar: 'قوانين نيوتن والديناميكا',
      he: 'חוקי ניוטון ודינמיקה',
      en: "Newton's Laws & Dynamics",
    },
    bagrutWeight: 'very-high',
    status: 'in-progress',
  },
  {
    id: 'work-energy',
    number: 4,
    section: 'mechanics',
    titles: {
      ar: 'الشغل والطاقة والقدرة',
      he: 'עבודה, אנרגיה והספק',
      en: 'Work, Energy, Power',
    },
    bagrutWeight: 'very-high',
    status: 'not-started',
  },
  {
    id: 'momentum',
    number: 5,
    section: 'mechanics',
    titles: {
      ar: 'الزخم والدفع',
      he: 'תנע ומתקף',
      en: 'Momentum & Impulse',
    },
    bagrutWeight: 'high',
    status: 'not-started',
  },
  {
    id: 'circular-motion',
    number: 6,
    section: 'mechanics',
    titles: {
      ar: 'الحركة الدائريّة والجاذبيّة',
      he: 'תנועה מעגלית וגרביטציה',
      en: 'Circular Motion & Gravitation',
    },
    bagrutWeight: 'high',
    status: 'not-started',
  },
  {
    id: 'oscillations',
    number: 7,
    section: 'waves-optics',
    titles: {
      ar: 'الاهتزازات والحركة التوافقيّة',
      he: 'תנודות ותנועה הרמונית',
      en: 'Oscillations & SHM',
    },
    bagrutWeight: 'medium',
    status: 'not-started',
  },
  {
    id: 'electrostatics',
    number: 8,
    section: 'electromagnetism',
    titles: {
      ar: 'الكهروستاتيكا',
      he: 'אלקטרוסטטיקה',
      en: 'Electrostatics',
    },
    bagrutWeight: 'high',
    status: 'not-started',
  },
  {
    id: 'circuits',
    number: 9,
    section: 'electromagnetism',
    titles: {
      ar: 'الدوائر الكهربائيّة',
      he: 'מעגלים חשמליים',
      en: 'DC Circuits',
    },
    bagrutWeight: 'very-high',
    status: 'not-started',
  },
  {
    id: 'magnetism',
    number: 10,
    section: 'electromagnetism',
    titles: {
      ar: 'المغناطيسيّة والحثّ',
      he: 'מגנטיות והשראה',
      en: 'Magnetism & Induction',
    },
    bagrutWeight: 'high',
    status: 'not-started',
  },
  {
    id: 'waves-optics',
    number: 11,
    section: 'waves-optics',
    titles: {
      ar: 'الموجات والبصريّات',
      he: 'גלים ואופטיקה',
      en: 'Waves & Optics',
    },
    bagrutWeight: 'high',
    status: 'not-started',
  },
  {
    id: 'modern-atomic',
    number: 12,
    section: 'modern-atomic',
    titles: {
      ar: 'الفيزياء الحديثة والذرّيّة',
      he: 'פיזיקה מודרנית ופיזיקת האטום',
      en: 'Modern & Atomic Physics',
    },
    bagrutWeight: 'very-high',
    status: 'not-started',
  },
];
