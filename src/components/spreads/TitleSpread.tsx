import { loadUnit } from '@/lib/content/baseline';
import { LOCALE_DIR } from '@/lib/i18n/constants';
import { I18n } from '@/components/i18n/I18n';
import { SpreadShell } from './SpreadShell';
import { Rise } from './Rise';

export interface TitleSpreadProps {
  unit: string;
  id?: string;
}

/**
 * The unit's opening hero. No diagram, no chrome — just trilingual title
 * type set massive against the page. Asymmetric composition: small unit
 * mark at the top, then the title settles into the lower-mid of the
 * spread, with the meta line as a final descender.
 */
export async function TitleSpread({ unit, id }: TitleSpreadProps) {
  const u = await loadUnit(unit);
  const t = u.frontmatter.titles;
  const number = u.frontmatter.unit.number;
  const domain = u.frontmatter.unit.domain;

  return (
    <SpreadShell id={id} width="wide" className="min-h-[80vh] py-20 md:py-28">
      <div className="flex h-full flex-col justify-between gap-16 md:gap-24">
        {/* Top mark — unit number + domain */}
        <Rise>
          <div className="flex items-baseline justify-between gap-4">
            <I18n
              ar={`الوحدة ${number}`}
              he={`יחידה ${number}`}
              en={`UNIT ${number}`}
              as="span"
              className="font-mono text-xs uppercase tracking-[0.3em] text-accent"
            />
            <span
              dir="ltr"
              className="font-mono text-[10px] uppercase tracking-[0.25em] text-ink-faint"
            >
              {domain}
            </span>
          </div>
        </Rise>

        {/* Title block */}
        <div className="space-y-6 md:space-y-8">
          <Rise delay={0.05}>
            <h1
              className="leading-[0.92] tracking-[-0.025em]"
              style={{ fontFeatureSettings: '"kern", "liga", "calt", "ss01"' }}
            >
              {/* Arabic — naskh at massive scale */}
              <span
                data-lang="ar"
                dir={LOCALE_DIR.ar}
                className="block font-arabic text-[clamp(64px,11vw,168px)] font-medium leading-[1] text-ink"
              >
                {t.ar}
              </span>
              {/* Hebrew */}
              <span
                data-lang="he"
                dir={LOCALE_DIR.he}
                className="block font-hebrew text-[clamp(56px,9vw,140px)] font-medium leading-[1] text-ink"
              >
                {t.he}
              </span>
              {/* English — Fraunces, italics on the verb-y portion if any */}
              <span
                data-lang="en"
                dir={LOCALE_DIR.en}
                className="block font-display text-[clamp(56px,8vw,128px)] font-medium leading-[0.96] text-ink"
              >
                {t.en}
              </span>
            </h1>
          </Rise>

          {/* Hairline */}
          <Rise delay={0.18}>
            <div className="h-px w-24 bg-accent" aria-hidden />
          </Rise>
        </div>

        {/* Foot — leadership style mark */}
        <Rise delay={0.28}>
          <I18n
            ar="منصّة فَلَك · بجروت 5 وحدات"
            he="פלטפורמת פלאק · בגרות 5 יח״ל"
            en="Falak · 5-unit Bagrut"
            as="span"
            className="block text-sm text-ink-muted"
          />
        </Rise>
      </div>
    </SpreadShell>
  );
}
