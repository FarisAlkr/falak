export interface Bilingual {
  ar: string;
  he: string;
}

export interface Trilingual extends Bilingual {
  en: string;
}

export interface BilingualTerm extends Bilingual {
  en?: string;
}
