'use client';

import { useRef } from 'react';
import { motion } from 'framer-motion';
import { Constellation } from './Constellation';
import { fadeUp, staggerSlow, TRANSITION } from '@/lib/motion';
import { useElementMouse } from '@/lib/motion/hooks';

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const mouse = useElementMouse(ref);
  const px = (mouse?.x ?? 0) * 12;
  const py = (mouse?.y ?? 0) * 12;

  return (
    <section ref={ref} className="relative overflow-hidden border-b border-border py-20 md:py-28">
      {/* Constellation backdrop */}
      <div className="pointer-events-none absolute inset-x-0 top-6 mx-auto h-44 w-full max-w-4xl text-ink-faint">
        <Constellation className="h-full w-full opacity-60" parallax={{ x: -px, y: -py }} />
      </div>

      {/* Horizon line */}
      <motion.div
        initial={{ scaleX: 0, opacity: 0 }}
        animate={{ scaleX: 1, opacity: 1 }}
        transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
        className="absolute inset-x-0 top-0 h-px origin-left bg-gradient-to-r from-transparent via-border-strong to-transparent"
      />

      <motion.div
        variants={staggerSlow}
        initial="hidden"
        animate="visible"
        className="relative space-y-6"
      >
        <motion.span variants={fadeUp} className="inline-block text-xs text-ink-muted">
          <span data-lang="ar" dir="rtl" className="font-arabic">
            5 وحدات · بجروت إسرائيل
          </span>
          <span data-lang="he" dir="rtl" className="font-hebrew">
            5 יח״ל · בגרות בפיזיקה
          </span>
          <span data-lang="en" dir="ltr" className="font-mono uppercase tracking-meta">
            5 units · Israeli Bagrut
          </span>
        </motion.span>

        <motion.h1
          variants={fadeUp}
          style={{ x: px * 0.4, y: py * 0.2 }}
          className="text-7xl font-medium leading-none text-ink md:text-8xl"
        >
          <span data-lang="ar" dir="rtl" className="font-arabic">
            فَلَك
          </span>
          <span data-lang="he" dir="rtl" className="font-hebrew">
            פלאק
          </span>
          <span data-lang="en" dir="ltr" className="font-display">
            Falak
          </span>
        </motion.h1>

        <motion.p variants={fadeUp} className="max-w-2xl text-lg leading-relaxed text-ink-muted">
          <span data-lang="ar" dir="rtl" className="font-arabic leading-arabic">
            منصّة فيزياء ثنائيّة اللغة لبجروت الفيزياء الإسرائيلي بمستوى الـ 5 وحدات. مبنيّة لطلّاب
            العربيّة الذين يستعدّون للامتحان بالعبرية.
          </span>
          <span data-lang="he" dir="rtl" className="font-hebrew">
            פלטפורמת פיזיקה דו-לשונית לבגרות הישראלית במתמטיקה ברמה של 5 יח״ל. בנויה לתלמידים דוברי
            ערבית המתכוננים לבחינה בעברית.
          </span>
          <span data-lang="en" dir="ltr" className="font-body">
            A bilingual physics teaching platform for the Israeli 5-unit Bagrut. Built for
            Arab-speaking students preparing for the Hebrew exam.
          </span>
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...TRANSITION.slow, delay: 0.7 }}
          className="flex items-center gap-3 pt-4 text-xs"
        >
          <span className="h-px w-8 bg-border-strong" />
          <span className="text-ink-faint">
            <span data-lang="ar" dir="rtl" className="font-arabic">
              12 وحدة · 4 أنماط لكلّ وحدة
            </span>
            <span data-lang="he" dir="rtl" className="font-hebrew">
              12 יחידות · 4 מצבים לכל יחידה
            </span>
            <span data-lang="en" dir="ltr" className="font-mono uppercase tracking-meta">
              12 units · 4 modes each
            </span>
          </span>
        </motion.div>
      </motion.div>
    </section>
  );
}
