import { Fraunces, Inter, JetBrains_Mono, Noto_Naskh_Arabic, Heebo } from 'next/font/google';

export const fraunces = Fraunces({
  subsets: ['latin'],
  variable: '--font-display',
  weight: ['400', '500', '700', '900'],
  style: ['normal', 'italic'],
  display: 'swap',
});

export const inter = Inter({
  subsets: ['latin'],
  variable: '--font-body',
  weight: ['300', '400', '500', '600', '700'],
  display: 'swap',
});

export const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  weight: ['400', '500', '600'],
  display: 'swap',
});

/**
 * Noto Naskh Arabic — naskh forms read more like a printed book and pair
 * better with Fraunces at editorial sizes than the kufi (geometric, sans-
 * style) used in earlier phases. Per design-system v2.
 */
export const notoNaskhArabic = Noto_Naskh_Arabic({
  subsets: ['arabic'],
  variable: '--font-arabic',
  weight: ['400', '500', '600', '700'],
  display: 'swap',
});

export const heebo = Heebo({
  subsets: ['hebrew', 'latin'],
  variable: '--font-hebrew',
  weight: ['400', '500', '600', '700'],
  display: 'swap',
});
