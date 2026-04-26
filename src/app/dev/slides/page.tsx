import {
  ConceptSlide,
  EquationsSlide,
  InteractiveForcesSlide,
  TitleSlide,
  VisualSlide,
  VocabSlide,
  WorkedExampleSlide,
} from '@/components/slide';
import { BlockMath, InlineMath } from '@/components/math/Math';

const KEY_TERMS = [
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
];

export default function SlidesDemoPage() {
  return (
    <main className="mx-auto max-w-6xl space-y-16 px-6 py-12">
      <header className="space-y-3 border-b border-border pb-6">
        <span dir="ltr" className="font-mono text-xs uppercase tracking-meta text-ink-muted">
          Preview · Unit 03 · Theory deck
        </span>
        <h1 className="font-display text-3xl font-medium text-ink">
          Newton&rsquo;s Laws &amp; Dynamics — slides preview
        </h1>
        <p className="font-body text-base text-ink-muted">
          Live preview of the Unit 3 theory deck. 12 slides; bilingual; KaTeX math; one
          mouse-interactive force-balance slide. Vertical scroll for review.
        </p>
      </header>

      <Numbered n="1/12">
        <TitleSlide
          unitNumber="03"
          arabic="قوانين نيوتن والديناميكا"
          hebrew="חוקי ניוטון ודינמיקה"
          english="Newton's Laws & Dynamics"
          meta="الوحدة الثالثة · 5 יח״ל · מכניקה"
        />
      </Numbered>

      <Numbered n="2/12">
        <ConceptSlide
          unitNumber="03"
          slideNumber="2/12"
          hebrewLabel="הרעיון המרכזי"
          arabicTitle="القوّة هي ما يغيّر الحركة"
        >
          <p dir="rtl" className="font-arabic text-lg leading-[1.8] text-ink md:text-xl">
            القوّة لا تجعل الجسم يتحرّك فقط — بل هي ما يجعل حركته <strong>تتغيّر</strong>: يبدأ،
            يتسارع، يبطئ، أو يغيّر اتّجاهه. أمّا الجسم الذي يتحرّك بسرعة ثابتة على خطّ مستقيم، فلا
            يحتاج إلى قوّة محصّلة على الإطلاق.
          </p>
          <div dir="rtl" className="bg-accent-tint/30 rounded-sm border-s-2 border-accent p-4">
            <p className="font-arabic text-base leading-[1.8] text-ink md:text-lg">
              <strong>مثال يومي:</strong> عربة التسوّق المتحرّكة في الممرّ تواصل تحرّكها بسرعة شبه
              ثابتة بعد دفعةٍ واحدة. الدفعة قوّة، لكنّ استمرار الحركة بعدها لا يحتاج إلى قوّة —
              يحتاج فقط إلى غياب الاحتكاك.
            </p>
          </div>
          <p dir="rtl" className="font-arabic text-sm text-ink-muted md:text-base">
            <strong>تنبيه:</strong> الحركة وحدها ليست دليلاً على وجود قوّة. فقط{' '}
            <strong>تغيّر</strong> الحركة هو الذي يدلّ على قوّة محصّلة.
          </p>
        </ConceptSlide>
      </Numbered>

      <Numbered n="3/12">
        <VisualSlide
          unitNumber="03"
          slideNumber="3/12"
          hebrewLabel="כוח הוא וקטור"
          arabicTitle="القوّة متّجه — مقدار واتّجاه"
          caption="جمع القوى يكون رأساً بذيل (head-to-tail) — كلّ قوّة كلّها مهمّة، والاتّجاه يحدّد النتيجة."
        >
          <VectorAdditionDiagram />
        </VisualSlide>
      </Numbered>

      <Numbered n="4/12">
        <EquationsSlide
          unitNumber="03"
          slideNumber="4/12"
          hebrewLabel="חוק ניוטון השני"
          arabicTitle="قانون نيوتن الثاني — المحرّك"
          arabicSubtitle="القوّة المحصّلة على جسم تساوي حاصل ضرب كتلته في تسارعه."
        >
          <BlockMath>{String.raw`\boxed{\,\vec{F}_{net} = m\,\vec{a}\,}`}</BlockMath>
          <p
            dir="rtl"
            className="max-w-2xl font-arabic text-base leading-relaxed text-ink-muted md:text-lg"
          >
            <strong>تطبيق عمليّ:</strong> هذه معادلة متّجهة — في المسائل ثنائيّة البعد نطبّق{' '}
            <InlineMath>{String.raw`\sum F_x = m a_x`}</InlineMath> و{' '}
            <InlineMath>{String.raw`\sum F_y = m a_y`}</InlineMath> على كلّ محور بمفرده.
          </p>
          <p dir="rtl" className="font-arabic text-sm text-ink-muted md:text-base">
            <strong>نصيحة الامتحان:</strong> ابدأ دائماً برسم مخطّط الجسم الحرّ، ثمّ اختر محورين
            مناسبين، وعندها يصبح حساب القوى المحصّلة عمليّةً أبسط بكثير.
          </p>
        </EquationsSlide>
      </Numbered>

      <Numbered n="5/12">
        <VisualSlide
          unitNumber="03"
          slideNumber="5/12"
          hebrewLabel="ארבעת הכוחות המכניים"
          arabicTitle="القوى الميكانيكيّة الأربع"
          caption="هذه القوى تظهر في كلّ مسائل الميكانيكا — تعرّف عليها جيّداً."
        >
          <FourForcesDiagram />
        </VisualSlide>
      </Numbered>

      <Numbered n="6/12">
        <ConceptSlide
          unitNumber="03"
          slideNumber="6/12"
          hebrewLabel="פירוט הכוחות"
          arabicTitle="القوى الأربع — تفصيلاً"
        >
          <div dir="rtl" className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <ForceCard
              symbol="W"
              ar="الوزن"
              he="משקל"
              definition="جذب الأرض للجسم — يتّجه دائماً نحو مركز الأرض."
              formula={String.raw`W = mg`}
              example="كتلة 5 kg لها وزن 49 N على سطح الأرض."
            />
            <ForceCard
              symbol="N"
              ar="القوّة العموديّة"
              he="כוח נורמלי"
              definition="ردّ فعل السطح على الجسم — عموديّ على السطح، لا على الأرض."
              formula={String.raw`N = mg\cos\theta \;(\text{على ميلٍ})`}
              example="على سطح أفقي N = mg، لكن على سطحٍ مائل N أصغر."
            />
            <ForceCard
              symbol="T"
              ar="الشدّ"
              he="מתיחות"
              definition="القوّة في الحبل أو الخيط — تسحب طوال الحبل."
              formula={String.raw`T_1 = T_2 \;(\text{حبل عديم الكتلة})`}
              example="في بكرة مثاليّة، الشدّ نفسه على كلا طرفي الحبل."
            />
            <ForceCard
              symbol="f"
              ar="الاحتكاك"
              he="חיכוך"
              definition="يعاكس الحركة (أو محاولة الحركة) — لا يعاكس قوّتك بالضرورة."
              formula={String.raw`f_k = \mu_k N`}
              example="إذا دفعت صندوقاً ساكناً ولم يتحرّك، فالاحتكاك يساوي قوّتك بالضبط."
            />
          </div>
        </ConceptSlide>
      </Numbered>

      <Numbered n="7/12">
        <InteractiveForcesSlide unitNumber="03" slideNumber="7/12" />
      </Numbered>

      <Numbered n="8/12">
        <ConceptSlide
          unitNumber="03"
          slideNumber="8/12"
          hebrewLabel="שלושת חוקי ניוטון"
          arabicTitle="قوانين نيوتن الثلاثة"
        >
          <div dir="rtl" className="space-y-4">
            <LawCard
              n="الأول"
              he="חוק ההתמדה"
              statement="إذا كانت القوّة المحصّلة على جسم تساوي صفراً، يبقى الجسم ساكناً، أو يتحرّك بسرعة ثابتة على خطّ مستقيم."
              example="كرة هوكي على جليد أملس تنزلق بسرعة ثابتة دون أن تحتاج لقوّة دافعة."
            />
            <LawCard
              n="الثاني"
              he="חוק התנועה"
              statement={
                <>
                  القوّة المحصّلة تساوي الكتلة في التسارع:{' '}
                  <InlineMath>{String.raw`\vec{F}_{net} = m\vec{a}`}</InlineMath>.
                </>
              }
              example="نفس القوّة تعطي تسارعاً أكبر لكتلةٍ أصغر — لذا دفع كرة سلة أسرع من دفع سيّارة."
            />
            <LawCard
              n="الثالث"
              he="חוק הפעולה והתגובה"
              statement={
                <>
                  لكلّ فعل ردّ فعل مساوٍ له في المقدار ومعاكس له في الاتّجاه — على{' '}
                  <strong>جسمين مختلفين</strong>.
                </>
              }
              example="عندما تسبح، يدك تدفع الماء للخلف، والماء يدفعك للأمام بنفس القوّة. القوّتان على جسمين مختلفين، لذلك لا يلغي بعضهما بعضاً."
            />
          </div>
        </ConceptSlide>
      </Numbered>

      <Numbered n="9/12">
        <VisualSlide
          unitNumber="03"
          slideNumber="9/12"
          hebrewLabel="דיאגרמת גוף חופשי"
          arabicTitle="مخطّط الجسم الحرّ — كيف ترسمه"
          caption="١. اختر الجسم. ٢. ارسم نقطة. ٣. ارسم سهماً لكلّ قوّة تلامس الجسم. ٤. سمِّ كلّ قوّة."
        >
          <FBDDiagram />
        </VisualSlide>
      </Numbered>

      <Numbered n="10/12">
        <EquationsSlide
          unitNumber="03"
          slideNumber="10/12"
          hebrewLabel="חיכוך סטטי וקינטי"
          arabicTitle="الاحتكاك — السكوني والحركي"
          arabicSubtitle="الاحتكاك السكوني يكون متبدّلاً (يساوي ما تحتاجه) حتّى يبلغ حدّه الأقصى. أمّا الحركي فثابت."
        >
          <BlockMath>{String.raw`f_s \leq \mu_s\, N \quad\text{(سكوني)}`}</BlockMath>
          <BlockMath>{String.raw`f_k = \mu_k\, N \quad\text{(حركي)}`}</BlockMath>
          <p
            dir="rtl"
            className="max-w-2xl font-arabic text-sm leading-relaxed text-ink-muted md:text-base"
          >
            <strong>نصيحة:</strong> الاحتكاك السكوني <InlineMath>{String.raw`f_s`}</InlineMath> ليس
            عدداً ثابتاً — يأخذ القيمة التي تكفي لإبقاء الجسم ساكناً، ولا يتجاوز الحدّ الأقصى{' '}
            <InlineMath>{String.raw`\mu_s N`}</InlineMath>. إذا تجاوزت قوّتك هذا الحدّ، انتقل الجسم
            إلى الاحتكاك الحركي الذي يكون عادةً أصغر.
          </p>
        </EquationsSlide>
      </Numbered>

      <Numbered n="11/12">
        <WorkedExampleSlide
          unitNumber="03"
          slideNumber="11/12"
          hebrewLabel="דוגמה פתורה"
          arabicTitle="كتلة على مستوى مائل مع احتكاك"
          problem={
            <>
              كتلة <InlineMath>{String.raw`m = 4\,\text{kg}`}</InlineMath> موضوعة على مستوى مائل
              بزاوية <InlineMath>{String.raw`\theta = 30^\circ`}</InlineMath> ومعامل احتكاك حركي{' '}
              <InlineMath>{String.raw`\mu_k = 0.20`}</InlineMath>. احسب التسارع الذي تنزلق به الكتلة
              على المستوى. ( <InlineMath>{String.raw`g = 9.8\,\text{m/s}^2`}</InlineMath> ).
            </>
          }
          steps={
            <>
              <p className="font-arabic text-base leading-[1.8] text-ink md:text-lg">
                <strong>الخطوة ١ — اختيار المحاور:</strong> نختار محوراً موازياً للمستوى (الإيجابي
                نحو الأسفل) وآخر عمودياً عليه.
              </p>
              <p className="font-arabic text-base leading-[1.8] text-ink md:text-lg">
                <strong>الخطوة ٢ — القوّة العموديّة:</strong> لا تسارع عمودياً، فالقوى العموديّة
                متّزنة: <InlineMath>{String.raw`N = mg\cos\theta`}</InlineMath>.
              </p>
              <p className="font-arabic text-base leading-[1.8] text-ink md:text-lg">
                <strong>الخطوة ٣ — تطبيق نيوتن الثاني على المحور الموازي:</strong>
              </p>
              <BlockMath>{String.raw`m a = mg\sin\theta - \mu_k\, mg\cos\theta`}</BlockMath>
              <BlockMath>{String.raw`a = g(\sin\theta - \mu_k \cos\theta)`}</BlockMath>
              <p className="font-arabic text-base leading-[1.8] text-ink md:text-lg">
                <strong>الخطوة ٤ — التعويض:</strong>
              </p>
              <BlockMath>
                {String.raw`a = 9.8 \cdot (0.500 - 0.20 \cdot 0.866) \approx 3.20\,\text{m/s}^2`}
              </BlockMath>
              <p
                dir="rtl"
                className="bg-accent-tint/30 rounded-sm border-s-2 border-accent p-3 font-arabic text-base text-ink md:text-lg"
              >
                <strong>النتيجة:</strong> التسارع ≈{' '}
                <InlineMath>{String.raw`3.2\,\text{m/s}^2`}</InlineMath> نحو الأسفل على المستوى.
              </p>
            </>
          }
        />
      </Numbered>

      <Numbered n="12/12">
        <ConceptSlide
          unitNumber="03"
          slideNumber="12/12"
          hebrewLabel="טעויות נפוצות"
          arabicTitle="تنبيهات — أخطاء شائعة"
        >
          <div dir="rtl" className="space-y-3">
            <Warning
              wrong="«الجسم المتحرّك يحتاج إلى قوّة دافعة»"
              right="الحركة وحدها لا تحتاج إلى قوّة — فقط تغيّر الحركة. الجسم المتحرّك بسرعة ثابتة في غياب الاحتكاك يستمرّ بنفسه."
            />
            <Warning
              wrong="«قوّة الفعل وردّ الفعل تلغي بعضهما»"
              right="القوّتان تعملان على جسمين مختلفين — لا يلغي بعضهما بعضاً على أيّ جسم."
            />
            <Warning
              wrong={
                <>
                  «<InlineMath>N = mg</InlineMath> دائماً»
                </>
              }
              right={
                <>
                  صحيحة فقط على سطح أفقي. على المستوى المائل{' '}
                  <InlineMath>{String.raw`N = mg\cos\theta`}</InlineMath>.
                </>
              }
            />
            <Warning
              wrong="«الجسم الساكن لا تؤثّر عليه قوى»"
              right="ليس صحيحاً — يكون مجموع القوى عليه صفراً، لكنّ القوى موجودة (الجاذبيّة + العموديّة على كتاب فوق طاولة، مثلاً)."
            />
            <Warning
              wrong="«الاحتكاك يعاكس قوّتك»"
              right="الاحتكاك يعاكس الحركة (أو محاولة الحركة)، وليس بالضرورة قوّتك. إذا دفعت بزاوية، الاحتكاك يبقى عكس اتّجاه الانزلاق."
            />
          </div>
        </ConceptSlide>
      </Numbered>

      <Numbered n="13/12">
        <VocabSlide unitNumber="03" slideNumber="ملحق" terms={KEY_TERMS} />
      </Numbered>
    </main>
  );
}

function Numbered({ n, children }: { n: string; children: React.ReactNode }) {
  return (
    <section className="space-y-3">
      <div className="flex items-baseline gap-3">
        <span dir="ltr" className="font-mono text-xs uppercase tracking-meta text-ink-muted">
          Slide {n}
        </span>
        <span className="h-px flex-1 bg-border" />
      </div>
      {children}
    </section>
  );
}

function ForceCard({
  symbol,
  ar,
  he,
  definition,
  formula,
  example,
}: {
  symbol: string;
  ar: string;
  he: string;
  definition: string;
  formula: string;
  example: string;
}) {
  return (
    <div className="space-y-2 rounded-sm border border-border bg-paper-raised p-4">
      <div className="flex items-baseline justify-between gap-2">
        <h3 dir="rtl" className="font-arabic text-lg font-semibold text-ink md:text-xl">
          {ar}
        </h3>
        <span dir="ltr" className="font-mono text-base font-semibold text-accent">
          {symbol}
        </span>
      </div>
      <p dir="rtl" className="font-hebrew text-xs text-accent">
        {he}
      </p>
      <p dir="rtl" className="font-arabic text-sm leading-[1.8] text-ink md:text-base">
        {definition}
      </p>
      <div dir="ltr" className="text-sm">
        <InlineMath>{formula}</InlineMath>
      </div>
      <p dir="rtl" className="font-arabic text-xs leading-[1.8] text-ink-muted md:text-sm">
        <strong>مثال:</strong> {example}
      </p>
    </div>
  );
}

function LawCard({
  n,
  he,
  statement,
  example,
}: {
  n: string;
  he: string;
  statement: React.ReactNode;
  example: string;
}) {
  return (
    <div className="space-y-2 rounded-sm border border-border bg-paper-raised p-4">
      <div className="flex items-baseline justify-between gap-2">
        <h3 className="font-arabic text-lg font-semibold text-ink md:text-xl">القانون {n}</h3>
        <span className="font-hebrew text-xs text-accent">{he}</span>
      </div>
      <p className="font-arabic text-base leading-[1.8] text-ink md:text-lg">{statement}</p>
      <p className="font-arabic text-sm leading-[1.8] text-ink-muted md:text-base">
        <strong>مثال:</strong> {example}
      </p>
    </div>
  );
}

function Warning({ wrong, right }: { wrong: React.ReactNode; right: React.ReactNode }) {
  return (
    <div className="grid grid-cols-[auto,1fr] gap-3 rounded-sm border border-border bg-paper-raised p-3">
      <span
        aria-hidden
        className="mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-error font-mono text-xs font-bold text-error"
      >
        ✕
      </span>
      <div className="space-y-1">
        <p className="text-error/80 font-arabic text-sm line-through md:text-base">{wrong}</p>
        <p className="font-arabic text-sm leading-[1.8] text-ink md:text-base">
          <strong>الصحيح:</strong> {right}
        </p>
      </div>
    </div>
  );
}

function VectorAdditionDiagram() {
  return (
    <svg viewBox="0 0 460 220" className="h-full max-h-72 w-auto text-ink" aria-hidden>
      <defs>
        <marker
          id="va-head"
          viewBox="0 0 8 8"
          refX="6"
          refY="4"
          markerWidth="6"
          markerHeight="6"
          orient="auto"
        >
          <path d="M0,0 L8,4 L0,8 z" fill="currentColor" />
        </marker>
        <marker
          id="va-head-accent"
          viewBox="0 0 8 8"
          refX="6"
          refY="4"
          markerWidth="6"
          markerHeight="6"
          orient="auto"
        >
          <path d="M0,0 L8,4 L0,8 z" fill="var(--accent)" />
        </marker>
      </defs>

      {/* F1 */}
      <line
        x1={60}
        y1={150}
        x2={200}
        y2={150}
        stroke="currentColor"
        strokeWidth={2.5}
        markerEnd="url(#va-head)"
      />
      <text x={120} y={170} fontFamily="monospace" fontSize="14" textAnchor="middle">
        F₁
      </text>

      {/* F2 (head-to-tail from F1 tip) */}
      <line
        x1={200}
        y1={150}
        x2={290}
        y2={70}
        stroke="currentColor"
        strokeWidth={2.5}
        markerEnd="url(#va-head)"
      />
      <text x={250} y={108} fontFamily="monospace" fontSize="14">
        F₂
      </text>

      {/* Resultant — accent dashed */}
      <line
        x1={60}
        y1={150}
        x2={290}
        y2={70}
        stroke="var(--accent)"
        strokeWidth={3}
        strokeDasharray="6 4"
        markerEnd="url(#va-head-accent)"
      />
      <text
        x={170}
        y={100}
        fontFamily="monospace"
        fontSize="14"
        fill="var(--accent)"
        fontWeight="bold"
      >
        F_net
      </text>

      {/* Origin marker */}
      <circle cx={60} cy={150} r={3} fill="currentColor" />
    </svg>
  );
}

function FourForcesDiagram() {
  return (
    <svg viewBox="0 0 480 240" className="h-full max-h-72 w-auto text-ink" aria-hidden>
      {/* Ground */}
      <line x1={40} y1={200} x2={440} y2={200} stroke="var(--ink-muted)" strokeWidth={1.5} />
      <pattern id="ground-hatch" patternUnits="userSpaceOnUse" width="8" height="8">
        <path d="M0,8 L8,0" stroke="var(--ink-muted)" strokeWidth="0.6" />
      </pattern>
      <rect x={40} y={200} width={400} height={10} fill="url(#ground-hatch)" />

      {/* Box */}
      <rect
        x={200}
        y={140}
        width={80}
        height={60}
        fill="var(--paper-raised)"
        stroke="currentColor"
        strokeWidth={1.5}
      />
      <text
        x={240}
        y={175}
        fontFamily="monospace"
        fontSize="12"
        textAnchor="middle"
        fill="var(--ink-muted)"
      >
        m
      </text>

      {/* W (down) */}
      <ArrowSvg x1={240} y1={170} x2={240} y2={228} color="var(--accent)" label="W" />
      {/* N (up) */}
      <ArrowSvg x1={240} y1={140} x2={240} y2={88} color="currentColor" label="N" />
      {/* T (right, applied as tension via rope) */}
      <ArrowSvg x1={280} y1={170} x2={350} y2={170} color="var(--info)" label="T" />
      {/* f (left) */}
      <ArrowSvg x1={200} y1={170} x2={130} y2={170} color="var(--warning)" label="f" />
    </svg>
  );
}

function FBDDiagram() {
  return (
    <svg viewBox="0 0 400 220" className="h-full max-h-64 w-auto text-ink" aria-hidden>
      <circle cx={200} cy={120} r={5} fill="currentColor" />
      <ArrowSvg x1={200} y1={120} x2={200} y2={50} color="currentColor" label="N" />
      <ArrowSvg x1={200} y1={120} x2={200} y2={195} color="var(--accent)" label="W" />
      <ArrowSvg x1={200} y1={120} x2={290} y2={120} color="var(--info)" label="F" />
      <ArrowSvg x1={200} y1={120} x2={130} y2={120} color="var(--warning)" label="f" />
      <text
        x={200}
        y={210}
        fontFamily="var(--font-arabic)"
        fontSize="12"
        textAnchor="middle"
        fill="var(--ink-muted)"
        direction="rtl"
      >
        نقطة واحدة · أسهم تخرج منها لكلّ قوّة
      </text>
    </svg>
  );
}

function ArrowSvg({
  x1,
  y1,
  x2,
  y2,
  color,
  label,
}: {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  color: string;
  label: string;
}) {
  const dx = x2 - x1;
  const dy = y2 - y1;
  const len = Math.hypot(dx, dy);
  const nx = dx / len;
  const ny = dy / len;
  const tipX = x2;
  const tipY = y2;
  const baseX = tipX - nx * 10;
  const baseY = tipY - ny * 10;
  const perpX = -ny;
  const perpY = nx;
  const lx = baseX + perpX * 5;
  const ly = baseY + perpY * 5;
  const rx = baseX - perpX * 5;
  const ry = baseY - perpY * 5;
  return (
    <g>
      <line x1={x1} y1={y1} x2={baseX} y2={baseY} stroke={color} strokeWidth={2.5} />
      <polygon points={`${tipX},${tipY} ${lx},${ly} ${rx},${ry}`} fill={color} />
      <text
        x={tipX + nx * 14}
        y={tipY + ny * 14 + 4}
        fontFamily="monospace"
        fontSize="14"
        fill={color}
        textAnchor="middle"
      >
        {label}
      </text>
    </g>
  );
}
