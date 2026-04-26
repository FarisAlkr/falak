import {
  ConceptSlide,
  EquationsSlide,
  TitleSlide,
  VisualSlide,
  VocabSlide,
  WorkedExampleSlide,
} from '@/components/slide';
import { BlockMath, InlineMath } from '@/components/math/Math';

const sampleTerms = [
  { ar: 'القوّة', he: 'כוח', en: 'Force' },
  { ar: 'الكتلة', he: 'מסה', en: 'Mass' },
  { ar: 'الوزن', he: 'משקל', en: 'Weight' },
  { ar: 'التسارع', he: 'תאוצה', en: 'Acceleration' },
  { ar: 'القوّة المحصّلة', he: 'כוח שקול', en: 'Net force' },
  { ar: 'القوّة العموديّة', he: 'כוח נורמלי', en: 'Normal force' },
];

export default function SlidesDemoPage() {
  return (
    <main className="mx-auto max-w-6xl space-y-12 px-6 py-12">
      <header className="space-y-3 border-b border-border pb-6">
        <span dir="ltr" className="font-mono text-xs uppercase tracking-meta text-ink-muted">
          Internal · Slide kit reference
        </span>
        <h1 className="font-display text-3xl font-medium text-ink">Slide components</h1>
        <p className="font-body text-base text-ink-muted">
          One of each slide type with sample content. Used during slide authoring as a layout
          reference.
        </p>
      </header>

      <DemoBlock label="TitleSlide">
        <TitleSlide
          unitNumber="03"
          arabic="قوانين نيوتن والديناميكا"
          hebrew="חוקי ניוטון ודינמיקה"
          english="Newton's Laws & Dynamics"
          meta="الوحدة الثالثة · 5 יח״ל · מכניקה"
        />
      </DemoBlock>

      <DemoBlock label="ConceptSlide">
        <ConceptSlide
          unitNumber="03"
          slideNumber="2/10"
          hebrewLabel="הרעיון המרכזי"
          arabicTitle="القوّة تغيّر الحركة"
        >
          <p dir="rtl" className="font-arabic text-xl leading-[1.8] text-ink md:text-2xl">
            القوّة هي السبب الذي يغيّر حالة حركة الجسم — يبدأ التحرّك، يتوقّف، أو يغيّر اتّجاهه.
            بدون قوّة محصّلة، يحافظ الجسم على ما هو عليه.
          </p>
        </ConceptSlide>
      </DemoBlock>

      <DemoBlock label="EquationsSlide">
        <EquationsSlide
          unitNumber="03"
          slideNumber="3/10"
          hebrewLabel="חוק ניוטון השני"
          arabicTitle="قانون نيوتن الثاني"
          arabicSubtitle="القوّة المحصّلة تساوي الكتلة مضروبة في التسارع."
        >
          <BlockMath>{`\\boxed{\\,\\vec{F}_{net} = m\\,\\vec{a}\\,}`}</BlockMath>
          <p dir="rtl" className="font-arabic text-base leading-relaxed text-ink-muted md:text-lg">
            عندما تكون <InlineMath>{`F_{net} = 0`}</InlineMath>، يكون التسارع صفراً.
          </p>
        </EquationsSlide>
      </DemoBlock>

      <DemoBlock label="VisualSlide">
        <VisualSlide
          unitNumber="03"
          slideNumber="4/10"
          hebrewLabel="ארבעת הכוחות המכניים"
          arabicTitle="القوى الميكانيكية الأربع"
          caption="الوزن، القوّة العموديّة، الشدّ، والاحتكاك — كلّ القوى التي تظهر في مسائل الميكانيكا."
        >
          <SampleDiagram />
        </VisualSlide>
      </DemoBlock>

      <DemoBlock label="WorkedExampleSlide">
        <WorkedExampleSlide
          unitNumber="03"
          slideNumber="8/10"
          hebrewLabel="דוגמה פתורה"
          arabicTitle="كتلة على مستوى مائل"
          problem={
            <>
              كتلة <InlineMath>{`m = 4\\,\\text{kg}`}</InlineMath> على مستوى مائل بزاوية{' '}
              <InlineMath>{`\\theta = 30°`}</InlineMath> ومعامل احتكاك حركي{' '}
              <InlineMath>{`\\mu_k = 0.20`}</InlineMath>. احسب التسارع.
            </>
          }
          steps={
            <>
              <p className="font-arabic text-base leading-[1.8] text-ink md:text-lg">
                <strong>الخطوة 1:</strong> نختار محورين متوازي ومتعامد على المستوى.
              </p>
              <p className="font-arabic text-base leading-[1.8] text-ink md:text-lg">
                <strong>الخطوة 2:</strong> القوّة العموديّة{' '}
                <InlineMath>{`N = mg\\cos\\theta`}</InlineMath>.
              </p>
              <p className="font-arabic text-base leading-[1.8] text-ink md:text-lg">
                <strong>الخطوة 3:</strong> نطبّق القانون الثاني على المحور الموازي.
              </p>
              <BlockMath>{`a = g(\\sin\\theta - \\mu_k \\cos\\theta) \\approx 3.2 \\text{ m/s}^2`}</BlockMath>
            </>
          }
        />
      </DemoBlock>

      <DemoBlock label="VocabSlide">
        <VocabSlide unitNumber="03" slideNumber="10/10" terms={sampleTerms} />
      </DemoBlock>
    </main>
  );
}

function DemoBlock({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <section className="space-y-4">
      <div className="flex items-baseline gap-3">
        <span dir="ltr" className="font-mono text-xs uppercase tracking-meta text-ink-muted">
          {label}
        </span>
        <span className="h-px flex-1 bg-border" />
      </div>
      {children}
    </section>
  );
}

function SampleDiagram() {
  return (
    <svg viewBox="0 0 400 240" className="h-full max-h-64 w-auto text-ink" aria-hidden>
      <rect
        x="160"
        y="120"
        width="80"
        height="60"
        fill="var(--paper-raised)"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <line x1="200" y1="180" x2="200" y2="230" stroke="var(--accent)" strokeWidth="2" />
      <polygon points="200,230 195,222 205,222" fill="var(--accent)" />
      <text x="208" y="220" className="font-mono" fontSize="12" fill="var(--accent)">
        W
      </text>

      <line x1="200" y1="120" x2="200" y2="70" stroke="currentColor" strokeWidth="2" />
      <polygon points="200,70 195,78 205,78" fill="currentColor" />
      <text x="208" y="80" className="font-mono" fontSize="12">
        N
      </text>

      <line x1="240" y1="150" x2="290" y2="150" stroke="currentColor" strokeWidth="2" />
      <polygon points="290,150 282,145 282,155" fill="currentColor" />
      <text x="295" y="155" className="font-mono" fontSize="12">
        F
      </text>

      <line x1="160" y1="150" x2="110" y2="150" stroke="currentColor" strokeWidth="2" />
      <polygon points="110,150 118,145 118,155" fill="currentColor" />
      <text x="80" y="155" className="font-mono" fontSize="12">
        f
      </text>

      <line x1="60" y1="180" x2="340" y2="180" stroke="var(--ink-muted)" strokeWidth="1" />
    </svg>
  );
}
