'use client';

import { useEffect, useRef } from 'react';
import { useProgress } from '@/lib/db/hooks';
import { useProgressStore } from '@/stores/progressStore';
import type { UnitId } from '@/types/unit';

interface ChapterCompletionTrackerProps {
  unitId: UnitId;
  chapterId: string;
}

/**
 * Auto-marks a chapter as completed when the foot of the page enters the
 * viewport. Mounted once per chapter document, sits invisibly at the end
 * of the spread flow above the prev/next nav.
 *
 * Soft sequencing only — the mark is a hint for the index card progress
 * dots; it never gates navigation. If the student scrolls past the foot
 * once, the chapter is considered done. They can manually unmark from
 * the chapter index if needed.
 */
export function ChapterCompletionTracker({ unitId, chapterId }: ChapterCompletionTrackerProps) {
  const ref = useRef<HTMLDivElement>(null);
  const progress = useProgress(unitId);
  const markChapterComplete = useProgressStore((s) => s.markChapterComplete);
  const alreadyDone = progress.completedChapters.includes(chapterId);

  useEffect(() => {
    if (alreadyDone) return;
    const node = ref.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            void markChapterComplete(unitId, chapterId);
            observer.disconnect();
            break;
          }
        }
      },
      { rootMargin: '0px 0px -25% 0px', threshold: 0 },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [alreadyDone, chapterId, markChapterComplete, unitId]);

  return (
    <div
      ref={ref}
      aria-hidden
      data-chapter-completion-sentinel={chapterId}
      className="h-px w-full"
    />
  );
}
