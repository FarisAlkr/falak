import { loadUnit } from '@/lib/content/baseline';
import { BaselineSlideFrame } from './SlideFrame';
import { LOCALE_DIR } from '@/lib/i18n/constants';
import { I18n } from '@/components/i18n/I18n';

interface BaselineTitleSlideProps {
  unit: string;
  slideNumber?: string;
}

export async function BaselineTitleSlide({ unit, slideNumber }: BaselineTitleSlideProps) {
  const u = await loadUnit(unit);
  const t = u.frontmatter.titles;
  const number = u.frontmatter.unit.number;
  const domain = u.frontmatter.unit.domain;
  return (
    <BaselineSlideFrame unitNumber={unit} slideNumber={slideNumber}>
      <div className="flex h-full flex-col justify-end">
        <div className="space-y-4">
          <I18n
            ar={`الوحدة ${number}`}
            he={`יחידה ${number}`}
            en={`UNIT ${number}`}
            as="div"
            className="text-xs uppercase tracking-meta text-accent"
          />

          <h1 className="leading-tight">
            <span
              data-lang="ar"
              dir={LOCALE_DIR.ar}
              className="block font-arabic text-4xl font-semibold text-ink md:text-6xl"
            >
              {t.ar}
            </span>
            <span
              data-lang="he"
              dir={LOCALE_DIR.he}
              className="block font-hebrew text-4xl font-semibold text-ink md:text-6xl"
            >
              {t.he}
            </span>
            <span
              data-lang="en"
              dir={LOCALE_DIR.en}
              className="block font-display text-4xl font-medium text-ink md:text-6xl"
            >
              {t.en}
            </span>
          </h1>

          <I18n
            ar={`5 وحدات · ${domain}`}
            he={`5 יח״ל · ${domain}`}
            en={`5 units · ${domain}`}
            as="div"
            className="pt-6 text-sm text-ink-muted"
          />
        </div>
      </div>
    </BaselineSlideFrame>
  );
}
