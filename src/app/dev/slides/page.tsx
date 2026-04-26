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
import {
  ActionReactionDiagram,
  AtwoodDiagram,
  BookOnTableDiagram,
  BoxOnGroundFBD,
  FBDStepsDiagram,
  FrictionRegimesDiagram,
  HeadToTailDiagram,
  HockeyPuckDiagram,
  InclineFullFBD,
  MassComparisonDiagram,
  NormalCompareDiagram,
  SigmaSymbolDiagram,
  SwimmingDiagram,
  TensionDiagram,
  WeightDiagram,
} from '@/components/diagrams/physics';
import type { ReactNode } from 'react';

const TOTAL = 32;
let n = 0;
const num = () => `${++n}/${TOTAL}`;

const KEY_TERMS = [
  { ar: 'القوّة', he: 'כוח', en: 'Force' },
  { ar: 'الكتلة', he: 'מסה', en: 'Mass' },
  { ar: 'الوزن', he: 'משקל', en: 'Weight' },
  { ar: 'التسارع', he: 'תאוצה', en: 'Acceleration' },
  { ar: 'القوّة المحصّلة (مجموع)', he: 'כוח שקול', en: 'ΣF (net force)' },
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
    <main className="mx-auto max-w-6xl space-y-12 px-6 py-12">
      <header className="space-y-3 border-b border-border pb-6">
        <span dir="ltr" className="font-mono text-xs uppercase tracking-meta text-ink-muted">
          Preview · Unit 03 · Theory deck
        </span>
        <h1 className="font-display text-3xl font-medium text-ink">
          Newton&rsquo;s Laws &amp; Dynamics
        </h1>
        <p className="font-body text-base text-ink-muted">
          {TOTAL} small focused slides. Each has a diagram. Σ notation throughout.
        </p>
      </header>

      <Section label="افتتاح · Opening">
        <Numbered n={num()}>
          <TitleSlide
            unitNumber="03"
            arabic="قوانين نيوتن والديناميكا"
            hebrew="חוקי ניוטון ודינמיקה"
            english="Newton's Laws & Dynamics"
            meta="الوحدة الثالثة · 5 יח״ל · מכניקה"
          />
        </Numbered>

        <Numbered n={num()}>
          <ConceptSlide
            unitNumber="03"
            slideNumber={n + '/' + TOTAL}
            hebrewLabel="הרעיון המרכזי"
            arabicTitle="القوّة هي ما يغيّر الحركة"
          >
            <ParaAr>
              القوّة لا تجعل الجسم يتحرّك — بل تجعل حركته <Em>تتغيّر</Em>: تبدأ، تتسارع، تبطئ، أو
              تنحني. الجسم الذي يتحرّك بسرعة ثابتة على خطّ مستقيم لا يحتاج إلى أيّ قوّة محصّلة.
            </ParaAr>
            <DiagramBox>
              <HockeyPuckDiagram />
            </DiagramBox>
          </ConceptSlide>
        </Numbered>
      </Section>

      <Section label="١ · القوّة كمتّجه">
        <Numbered n={num()}>
          <VisualSlide
            unitNumber="03"
            slideNumber={n + '/' + TOTAL}
            hebrewLabel="כוח = וקטור"
            arabicTitle="القوّة لها مقدار واتّجاه"
            caption="نمثّل القوّة بسهم: طوله = المقدار، رأسه = الاتّجاه."
          >
            <HeadToTailDiagram />
          </VisualSlide>
        </Numbered>

        <Numbered n={num()}>
          <ConceptSlide
            unitNumber="03"
            slideNumber={n + '/' + TOTAL}
            hebrewLabel="חיבור וקטורים"
            arabicTitle="جمع القوى — رأساً بذيل"
          >
            <ParaAr>
              لجمع قوّتين، نضع ذيل الثانية على رأس الأولى. السهم من بداية الأولى إلى نهاية الثانية
              هو <Em>المحصّلة</Em>.
            </ParaAr>
            <DiagramBox>
              <HeadToTailDiagram />
            </DiagramBox>
          </ConceptSlide>
        </Numbered>

        <Numbered n={num()}>
          <EquationsSlide
            unitNumber="03"
            slideNumber={n + '/' + TOTAL}
            hebrewLabel="הסכום ΣF"
            arabicTitle="رمز المجموع — Σ"
            arabicSubtitle="الحرف اليوناني سيغما يعني «مجموع كلّ»."
          >
            <DiagramBox>
              <SigmaSymbolDiagram />
            </DiagramBox>
            <BlockMath>
              {String.raw`\Sigma\,\vec{F} \;=\; \vec{F}_1 + \vec{F}_2 + \vec{F}_3 + \cdots`}
            </BlockMath>
            <Tip>
              نقرأ <InlineMath>{String.raw`\Sigma F`}</InlineMath> «مجموع القوى» — كلّ القوى
              المؤثّرة على الجسم بعد جمعها متّجهيّاً.
            </Tip>
          </EquationsSlide>
        </Numbered>
      </Section>

      <Section label="٢ · قوانين نيوتن الثلاثة">
        <Numbered n={num()}>
          <ConceptSlide
            unitNumber="03"
            slideNumber={n + '/' + TOTAL}
            hebrewLabel="חוק ראשון · חוק ההתמדה"
            arabicTitle="القانون الأوّل — الجمود"
          >
            <ParaAr>
              إذا كانت <InlineMath>{String.raw`\Sigma\vec{F} = 0`}</InlineMath>، يبقى الجسم ساكناً،
              أو يتحرّك بسرعة ثابتة على خطّ مستقيم.
            </ParaAr>
            <Tip>لا يحتاج الجسم إلى قوّة كي يتحرّك — يحتاجها فقط ليغيّر حركته.</Tip>
            <DiagramBox>
              <HockeyPuckDiagram />
            </DiagramBox>
          </ConceptSlide>
        </Numbered>

        <Numbered n={num()}>
          <VisualSlide
            unitNumber="03"
            slideNumber={n + '/' + TOTAL}
            hebrewLabel="שיווי משקל"
            arabicTitle="مثال — كتاب على طاولة"
            caption="القوى الموجودة، لكن مجموعها صفر. الجسم في اتّزان."
          >
            <BookOnTableDiagram />
          </VisualSlide>
        </Numbered>

        <Numbered n={num()}>
          <EquationsSlide
            unitNumber="03"
            slideNumber={n + '/' + TOTAL}
            hebrewLabel="חוק שני"
            arabicTitle="القانون الثاني — المحرّك"
            arabicSubtitle="هذه المعادلة هي قلب الميكانيكا. كلّ مسألة ديناميكا تستخدمها."
          >
            <BlockMath>{String.raw`\boxed{\,\Sigma\,\vec{F} \;=\; m\,\vec{a}\,}`}</BlockMath>
            <ParaAr>
              مجموع القوى على جسم يساوي كتلته مضروبة في تسارعه — وفي نفس اتّجاه التسارع.
            </ParaAr>
          </EquationsSlide>
        </Numbered>

        <Numbered n={num()}>
          <VisualSlide
            unitNumber="03"
            slideNumber={n + '/' + TOTAL}
            hebrewLabel="ΣF = ma"
            arabicTitle="نفس القوّة، كتلتان مختلفتان"
            caption="عند مضاعفة الكتلة بثلاثة أضعاف، التسارع ينخفض إلى الثلث."
          >
            <MassComparisonDiagram />
          </VisualSlide>
        </Numbered>

        <Numbered n={num()}>
          <EquationsSlide
            unitNumber="03"
            slideNumber={n + '/' + TOTAL}
            hebrewLabel="פירוק לציר"
            arabicTitle="على كلّ محور بمفرده"
            arabicSubtitle="المعادلة متّجهة — نطبّقها على المحاور بشكل مستقلّ."
          >
            <BlockMath>{String.raw`\Sigma F_x = m\,a_x`}</BlockMath>
            <BlockMath>{String.raw`\Sigma F_y = m\,a_y`}</BlockMath>
            <Tip>اختر محورين مناسبين قبل الجمع. على مستوى مائل، اختر محوراً موازياً للسطح.</Tip>
          </EquationsSlide>
        </Numbered>

        <Numbered n={num()}>
          <ConceptSlide
            unitNumber="03"
            slideNumber={n + '/' + TOTAL}
            hebrewLabel="חוק שלישי"
            arabicTitle="القانون الثالث — الفعل وردّ الفعل"
          >
            <ParaAr>
              لكلّ فعل ردّ فعل مساوٍ له في المقدار، معاكس له في الاتّجاه — على{' '}
              <Em>جسمين مختلفين</Em>.
            </ParaAr>
            <BlockMath>{String.raw`\vec{F}_{A \to B} \;=\; -\,\vec{F}_{B \to A}`}</BlockMath>
            <DiagramBox>
              <ActionReactionDiagram />
            </DiagramBox>
          </ConceptSlide>
        </Numbered>

        <Numbered n={num()}>
          <VisualSlide
            unitNumber="03"
            slideNumber={n + '/' + TOTAL}
            hebrewLabel="פעולה ותגובה"
            arabicTitle="مثال — السباحة"
            caption="يدك تدفع الماء للخلف، والماء يدفعك للأمام بنفس المقدار. القوّتان على جسمين مختلفين."
          >
            <SwimmingDiagram />
          </VisualSlide>
        </Numbered>
      </Section>

      <Section label="٣ · القوى الأربع">
        <Numbered n={num()}>
          <VisualSlide
            unitNumber="03"
            slideNumber={n + '/' + TOTAL}
            hebrewLabel="ארבעה כוחות"
            arabicTitle="القوى الميكانيكيّة الأربع"
            caption="هذه القوى تظهر في كلّ مسائل الميكانيكا. في كلّ شريحة مثال على واحدة منها."
          >
            <BoxOnGroundFBD withApplied withFriction />
          </VisualSlide>
        </Numbered>

        <Numbered n={num()}>
          <VisualSlide
            unitNumber="03"
            slideNumber={n + '/' + TOTAL}
            hebrewLabel="כוח כובד · משקל"
            arabicTitle="الوزن — جذب الأرض"
            caption="كلّ كتلة قرب سطح الأرض تشعر بقوّة جذب — هذه قوّة الوزن."
          >
            <WeightDiagram />
          </VisualSlide>
        </Numbered>

        <Numbered n={num()}>
          <EquationsSlide
            unitNumber="03"
            slideNumber={n + '/' + TOTAL}
            hebrewLabel="W = mg"
            arabicTitle="حساب الوزن"
            arabicSubtitle="الوزن يساوي حاصل ضرب الكتلة في تسارع الجاذبيّة."
          >
            <BlockMath>{String.raw`W \;=\; m \cdot g`}</BlockMath>
            <Tip>
              <InlineMath>{String.raw`g = 9.8\,\text{m/s}^2`}</InlineMath> قرب سطح الأرض. مثال: كتلة{' '}
              <InlineMath>{String.raw`5\,\text{kg}`}</InlineMath> وزنها{' '}
              <InlineMath>{String.raw`49\,\text{N}`}</InlineMath>.
            </Tip>
          </EquationsSlide>
        </Numbered>

        <Numbered n={num()}>
          <VisualSlide
            unitNumber="03"
            slideNumber={n + '/' + TOTAL}
            hebrewLabel="כוח נורמלי"
            arabicTitle="القوّة العموديّة — السطح يدفع"
            caption="السطح يدفع الجسم بقوّة عموديّة على السطح، لا على الأرض."
          >
            <NormalCompareDiagram />
          </VisualSlide>
        </Numbered>

        <Numbered n={num()}>
          <EquationsSlide
            unitNumber="03"
            slideNumber={n + '/' + TOTAL}
            hebrewLabel="N על משטח שטוח ועל משופע"
            arabicTitle="على سطح أفقي مقابل مستوى مائل"
          >
            <BlockMath>{String.raw`\text{أفقي}: \;\; N \;=\; m\,g`}</BlockMath>
            <BlockMath>{String.raw`\text{مائل}: \;\; N \;=\; m\,g\,\cos\theta`}</BlockMath>
            <Tip>
              على المستوى المائل، فقط <Em>مركّبة</Em> الوزن العموديّة على السطح هي ما توازنها{' '}
              <InlineMath>{String.raw`N`}</InlineMath>.
            </Tip>
          </EquationsSlide>
        </Numbered>

        <Numbered n={num()}>
          <VisualSlide
            unitNumber="03"
            slideNumber={n + '/' + TOTAL}
            hebrewLabel="מתיחות"
            arabicTitle="الشدّ — حبل يسحب"
            caption="في حبل عديم الكتلة، الشدّ نفسه على كلا الطرفين."
          >
            <TensionDiagram />
          </VisualSlide>
        </Numbered>

        <Numbered n={num()}>
          <VisualSlide
            unitNumber="03"
            slideNumber={n + '/' + TOTAL}
            hebrewLabel="מערכת אטווד"
            arabicTitle="مثال على الشدّ — آلة آتوود"
            caption="كتلتان مرتبطتان عبر بكرة. الشدّ ينقل القوّة من واحدة إلى الأخرى."
          >
            <AtwoodDiagram />
          </VisualSlide>
        </Numbered>

        <Numbered n={num()}>
          <VisualSlide
            unitNumber="03"
            slideNumber={n + '/' + TOTAL}
            hebrewLabel="חיכוך"
            arabicTitle="الاحتكاك — يعاكس الحركة"
            caption="الاحتكاك السكوني يبقي الجسم ساكناً. الحركي يعاكس انزلاقه."
          >
            <FrictionRegimesDiagram />
          </VisualSlide>
        </Numbered>

        <Numbered n={num()}>
          <EquationsSlide
            unitNumber="03"
            slideNumber={n + '/' + TOTAL}
            hebrewLabel="חיכוך סטטי"
            arabicTitle="الاحتكاك السكوني — متراجحة"
            arabicSubtitle="ليس قيمة ثابتة — يأخذ ما يلزم لإبقاء الجسم ساكناً."
          >
            <BlockMath>{String.raw`f_s \;\leq\; \mu_s\,N`}</BlockMath>
            <Tip>
              لو دفعت بقوّة <InlineMath>{String.raw`5\,\text{N}`}</InlineMath> ولم يتحرّك الجسم،
              فالاحتكاك السكوني يساوي <InlineMath>{String.raw`5\,\text{N}`}</InlineMath> بالضبط —
              حتّى يبلغ <InlineMath>{String.raw`\mu_s\,N`}</InlineMath>.
            </Tip>
          </EquationsSlide>
        </Numbered>

        <Numbered n={num()}>
          <EquationsSlide
            unitNumber="03"
            slideNumber={n + '/' + TOTAL}
            hebrewLabel="חיכוך קינטי"
            arabicTitle="الاحتكاك الحركي — مساواة"
            arabicSubtitle="بمجرّد بدء الانزلاق، يصبح الاحتكاك ثابتاً."
          >
            <BlockMath>{String.raw`f_k \;=\; \mu_k\,N`}</BlockMath>
            <Tip>
              عادةً <InlineMath>{String.raw`\mu_k < \mu_s`}</InlineMath> — لذلك من الأصعب تحريك جسم
              ساكن من إبقائه يتحرّك.
            </Tip>
          </EquationsSlide>
        </Numbered>
      </Section>

      <Section label="٤ · مخطّط الجسم الحرّ (FBD)">
        <Numbered n={num()}>
          <VisualSlide
            unitNumber="03"
            slideNumber={n + '/' + TOTAL}
            hebrewLabel="שלב ١"
            arabicTitle="١. اختر الجسم"
            caption="ما الذي نحلّله؟ ركّز على جسم واحد."
          >
            <FBDStepsDiagram step={1} />
          </VisualSlide>
        </Numbered>

        <Numbered n={num()}>
          <VisualSlide
            unitNumber="03"
            slideNumber={n + '/' + TOTAL}
            hebrewLabel="שלב ٢"
            arabicTitle="٢. مثّله بنقطة"
            caption="الجسم نقطة — كلّ القوى تعمل من المركز."
          >
            <FBDStepsDiagram step={2} />
          </VisualSlide>
        </Numbered>

        <Numbered n={num()}>
          <VisualSlide
            unitNumber="03"
            slideNumber={n + '/' + TOTAL}
            hebrewLabel="שלב ٣"
            arabicTitle="٣. ارسم سهماً لكلّ قوّة"
            caption="من النقطة إلى الخارج — كلّ قوّة تلامس الجسم."
          >
            <FBDStepsDiagram step={3} />
          </VisualSlide>
        </Numbered>

        <Numbered n={num()}>
          <VisualSlide
            unitNumber="03"
            slideNumber={n + '/' + TOTAL}
            hebrewLabel="דוגמה · משופע"
            arabicTitle="FBD لكتلة على مستوى مائل"
            caption="ثلاث قوى: الوزن نحو الأسفل، العموديّة عمودياً على السطح، الاحتكاك موازياً."
          >
            <InclineFullFBD />
          </VisualSlide>
        </Numbered>
      </Section>

      <Section label="٥ · جرّب بنفسك">
        <Numbered n={num()}>
          <InteractiveForcesSlide unitNumber="03" slideNumber={n + '/' + TOTAL} />
        </Numbered>
      </Section>

      <Section label="٦ · مثال محلول">
        <Numbered n={num()}>
          <WorkedExampleSlide
            unitNumber="03"
            slideNumber={n + '/' + TOTAL}
            hebrewLabel="דוגמה פתורה"
            arabicTitle="كتلة على مستوى مائل مع احتكاك"
            problem={
              <>
                كتلة <InlineMath>{String.raw`m = 4\,\text{kg}`}</InlineMath> على مستوى مائل بزاوية{' '}
                <InlineMath>{String.raw`\theta = 30^\circ`}</InlineMath> ومعامل احتكاك حركي{' '}
                <InlineMath>{String.raw`\mu_k = 0.20`}</InlineMath>. احسب التسارع. (
                <InlineMath>{String.raw`g = 9.8\,\text{m/s}^2`}</InlineMath>).
              </>
            }
            steps={
              <>
                <ParaAr>
                  <Em>الخطوة ١:</Em> اختر محوراً موازياً للمستوى وآخر عمودياً عليه.
                </ParaAr>
                <ParaAr>
                  <Em>الخطوة ٢:</Em> العموديّ — لا تسارع، فالقوى متّزنة:
                </ParaAr>
                <BlockMath>{String.raw`N \;=\; m\,g\,\cos\theta`}</BlockMath>
                <ParaAr>
                  <Em>الخطوة ٣:</Em> الموازي — تطبيق قانون نيوتن الثاني:
                </ParaAr>
                <BlockMath>
                  {String.raw`m\,a \;=\; m\,g\,\sin\theta - \mu_k\,m\,g\,\cos\theta`}
                </BlockMath>
                <BlockMath>{String.raw`a \;=\; g(\sin\theta - \mu_k \cos\theta)`}</BlockMath>
                <ParaAr>
                  <Em>الخطوة ٤:</Em> التعويض:
                </ParaAr>
                <BlockMath>
                  {String.raw`a \;=\; 9.8 \cdot (0.500 - 0.20 \cdot 0.866) \;\approx\; 3.20\,\text{m/s}^2`}
                </BlockMath>
                <ResultBox>
                  التسارع ≈ <InlineMath>{String.raw`3.2\,\text{m/s}^2`}</InlineMath> نحو الأسفل على
                  المستوى.
                </ResultBox>
              </>
            }
          />
        </Numbered>
      </Section>

      <Section label="٧ · أخطاء شائعة">
        <Numbered n={num()}>
          <ConceptSlide
            unitNumber="03"
            slideNumber={n + '/' + TOTAL}
            hebrewLabel="טעות נפוצה ١"
            arabicTitle="«الجسم المتحرّك يحتاج قوّة دافعة»"
          >
            <Wrong>الحركة وحدها تحتاج إلى قوّة.</Wrong>
            <Right>
              فقط <Em>تغيّر</Em> الحركة يحتاج إلى قوّة. الجسم بسرعة ثابتة في غياب الاحتكاك يستمرّ
              بنفسه.
            </Right>
          </ConceptSlide>
        </Numbered>

        <Numbered n={num()}>
          <ConceptSlide
            unitNumber="03"
            slideNumber={n + '/' + TOTAL}
            hebrewLabel="טעות נפוצה ٢"
            arabicTitle="«الفعل وردّ الفعل يلغيان بعضهما»"
          >
            <Wrong>القوّتان تتجاذبان وتختفي النتيجة.</Wrong>
            <Right>
              القوّتان تعملان على <Em>جسمين مختلفين</Em>، لذا لا تلغيان أيّ شيء على أيّ منهما.
            </Right>
          </ConceptSlide>
        </Numbered>

        <Numbered n={num()}>
          <ConceptSlide
            unitNumber="03"
            slideNumber={n + '/' + TOTAL}
            hebrewLabel="טעות נפוצה ٣"
            arabicTitle="«N = mg دائماً»"
          >
            <Wrong>القوّة العموديّة تساوي الوزن في كلّ الحالات.</Wrong>
            <Right>
              صحيحة فقط على سطح أفقي. على المستوى المائل{' '}
              <InlineMath>{String.raw`N = m\,g\,\cos\theta`}</InlineMath>.
            </Right>
          </ConceptSlide>
        </Numbered>

        <Numbered n={num()}>
          <ConceptSlide
            unitNumber="03"
            slideNumber={n + '/' + TOTAL}
            hebrewLabel="טעות נפוצה ٤"
            arabicTitle="«الجسم الساكن لا قوى عليه»"
          >
            <Wrong>السكون يعني عدم وجود قوى.</Wrong>
            <Right>
              السكون يعني <Em>مجموع القوى صفر</Em>. القوى موجودة (الجاذبيّة + العموديّة على كتاب فوق
              طاولة)، لكنّها متّزنة.
            </Right>
          </ConceptSlide>
        </Numbered>

        <Numbered n={num()}>
          <ConceptSlide
            unitNumber="03"
            slideNumber={n + '/' + TOTAL}
            hebrewLabel="טעות נפוצה ٥"
            arabicTitle="«الاحتكاك يعاكس قوّتك»"
          >
            <Wrong>الاحتكاك دائماً عكس القوّة المطبّقة.</Wrong>
            <Right>
              الاحتكاك يعاكس <Em>الحركة (أو محاولة الحركة)</Em>، لا قوّتك بالضرورة. لو دفعت بزاوية،
              الاحتكاك يبقى عكس اتّجاه الانزلاق.
            </Right>
          </ConceptSlide>
        </Numbered>
      </Section>

      <Section label="٨ · المعجم والخلاصة">
        <Numbered n={num()}>
          <VocabSlide unitNumber="03" slideNumber={n + '/' + TOTAL} terms={KEY_TERMS} />
        </Numbered>

        <Numbered n={num()}>
          <ConceptSlide
            unitNumber="03"
            slideNumber={n + '/' + TOTAL}
            hebrewLabel="סיכום"
            arabicTitle="الخلاصة — احفظ هذه"
          >
            <BlockMath>{String.raw`\boxed{\,\Sigma\,\vec{F} \;=\; m\,\vec{a}\,}`}</BlockMath>
            <ParaAr>مجموع القوى يساوي الكتلة في التسارع. بدون قوّة محصّلة، لا يوجد تسارع.</ParaAr>
            <Tip>
              ابدأ كلّ مسألة بمخطّط الجسم الحرّ. اختر محورين. اجمع القوى على كلّ محور بمفرده.
            </Tip>
          </ConceptSlide>
        </Numbered>
      </Section>
    </main>
  );
}

function Section({ label, children }: { label: string; children: ReactNode }) {
  return (
    <section className="space-y-8">
      <div className="flex items-baseline gap-3">
        <span dir="rtl" className="font-arabic text-xs uppercase tracking-meta text-accent">
          {label}
        </span>
        <span className="h-px flex-1 bg-border-strong" />
      </div>
      {children}
    </section>
  );
}

function Numbered({ n, children }: { n: string; children: ReactNode }) {
  return (
    <div className="space-y-3">
      <div className="flex items-baseline gap-3">
        <span dir="ltr" className="font-mono text-[10px] uppercase tracking-meta text-ink-faint">
          Slide {n}
        </span>
        <span className="h-px flex-1 bg-border" />
      </div>
      {children}
    </div>
  );
}

function ParaAr({ children }: { children: ReactNode }) {
  return (
    <p dir="rtl" className="font-arabic text-base leading-[1.8] text-ink md:text-lg">
      {children}
    </p>
  );
}

function Em({ children }: { children: ReactNode }) {
  return <strong className="text-accent">{children}</strong>;
}

function Tip({ children }: { children: ReactNode }) {
  return (
    <p
      dir="rtl"
      className="bg-accent-tint/40 rounded-sm border-s-2 border-accent px-4 py-3 font-arabic text-sm leading-[1.8] text-ink md:text-base"
    >
      <strong>نصيحة:</strong> {children}
    </p>
  );
}

function DiagramBox({ children }: { children: ReactNode }) {
  return (
    <div className="bg-paper-raised/40 flex justify-center rounded-sm border border-border p-3">
      {children}
    </div>
  );
}

function ResultBox({ children }: { children: ReactNode }) {
  return (
    <p
      dir="rtl"
      className="bg-accent-tint/30 rounded-sm border-s-2 border-accent px-4 py-3 font-arabic text-base text-ink md:text-lg"
    >
      <strong>النتيجة:</strong> {children}
    </p>
  );
}

function Wrong({ children }: { children: ReactNode }) {
  return (
    <p
      dir="rtl"
      className="bg-error/5 rounded-sm border-s-2 border-error px-4 py-3 font-arabic text-sm leading-[1.8] text-error md:text-base"
    >
      <strong>الخطأ:</strong> {children}
    </p>
  );
}

function Right({ children }: { children: ReactNode }) {
  return (
    <p
      dir="rtl"
      className="bg-success/5 rounded-sm border-s-2 border-success px-4 py-3 font-arabic text-sm leading-[1.8] text-ink md:text-base"
    >
      <strong>الصحيح:</strong> {children}
    </p>
  );
}
