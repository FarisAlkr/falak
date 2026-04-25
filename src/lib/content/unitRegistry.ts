import { type UnitListing, UNIT_IDS } from '@/types/unit';

export { UNIT_IDS };

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
      he: 'תנועה במישור וזריקות',
      en: '2D Motion & Projectiles',
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
    status: 'not-started',
  },
  {
    id: 'work-energy',
    number: 4,
    section: 'mechanics',
    titles: {
      ar: 'العمل والطاقة والقدرة',
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
      ar: 'التنع والمتكف',
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
      ar: 'الحركة الدائرية',
      he: 'תנועה מעגלית',
      en: 'Circular Motion',
    },
    bagrutWeight: 'medium',
    status: 'not-started',
  },
  {
    id: 'gravitation',
    number: 7,
    section: 'mechanics',
    titles: {
      ar: 'الجاذبية والحركة الهرمونية',
      he: 'גרביטציה ותנועה הרמונית',
      en: 'Gravitation & SHM',
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
    id: 'dc-circuits',
    number: 9,
    section: 'electromagnetism',
    titles: {
      ar: 'الدوائر الكهربائية',
      he: 'זרם חשמלי ומעגלים',
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
      ar: 'المغناطيسية والحث',
      he: 'מגנטיות והשראה',
      en: 'Magnetism & Induction',
    },
    bagrutWeight: 'high',
    status: 'not-started',
  },
  {
    id: 'geometric-optics',
    number: 11,
    section: 'radiation-matter',
    titles: {
      ar: 'البصريات الهندسية',
      he: 'אופטיקה גאומטרית',
      en: 'Geometric Optics',
    },
    bagrutWeight: 'medium',
    status: 'not-started',
  },
  {
    id: 'physical-optics',
    number: 12,
    section: 'radiation-matter',
    titles: {
      ar: 'البصريات الفيزيائية والموجات',
      he: 'אופטיקה פיזיקלית וגלים',
      en: 'Physical Optics & Waves',
    },
    bagrutWeight: 'high',
    status: 'not-started',
  },
  {
    id: 'modern-physics',
    number: 13,
    section: 'radiation-matter',
    titles: {
      ar: 'الفيزياء الحديثة',
      he: 'פיזיקה מודרנית',
      en: 'Modern Physics',
    },
    bagrutWeight: 'very-high',
    status: 'not-started',
  },
  {
    id: 'atomic-nuclear',
    number: 14,
    section: 'radiation-matter',
    titles: {
      ar: 'الذرة والنواة',
      he: 'האטום והגרעין',
      en: 'Atomic & Nuclear',
    },
    bagrutWeight: 'high',
    status: 'not-started',
  },
];
