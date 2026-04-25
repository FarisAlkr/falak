import type { ReactNode } from 'react';
import type { Metadata } from 'next';
import { fraunces, inter, jetbrainsMono, notoKufiArabic, heebo } from './fonts';
import './globals.css';

export const metadata: Metadata = {
  title: 'Falak · فَلَك',
  description: 'Bilingual physics teaching platform for the Israeli 5-unit Bagrut',
};

const fontVariables = [
  fraunces.variable,
  inter.variable,
  jetbrainsMono.variable,
  notoKufiArabic.variable,
  heebo.variable,
].join(' ');

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="ar" dir="rtl" className={fontVariables}>
      <body>{children}</body>
    </html>
  );
}
