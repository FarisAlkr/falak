'use client';

import { motion } from 'framer-motion';

interface Star {
  cx: number;
  cy: number;
  r: number;
  delay: number;
}

interface Edge {
  from: number;
  to: number;
}

const STARS: Star[] = [
  { cx: 80, cy: 40, r: 1.5, delay: 0 },
  { cx: 160, cy: 70, r: 2, delay: 0.2 },
  { cx: 230, cy: 30, r: 1, delay: 0.4 },
  { cx: 300, cy: 90, r: 1.8, delay: 0.6 },
  { cx: 200, cy: 130, r: 1.2, delay: 0.8 },
  { cx: 90, cy: 110, r: 1.4, delay: 1.0 },
  { cx: 360, cy: 150, r: 1.6, delay: 1.2 },
];

const EDGES: Edge[] = [
  { from: 0, to: 1 },
  { from: 1, to: 2 },
  { from: 2, to: 3 },
  { from: 3, to: 4 },
  { from: 1, to: 4 },
  { from: 4, to: 5 },
  { from: 0, to: 5 },
  { from: 3, to: 6 },
];

interface ConstellationProps {
  className?: string;
  parallax?: { x: number; y: number };
}

export function Constellation({ className, parallax }: ConstellationProps) {
  const dx = parallax?.x ?? 0;
  const dy = parallax?.y ?? 0;

  return (
    <svg
      viewBox="0 0 400 180"
      preserveAspectRatio="xMidYMid slice"
      className={className}
      aria-hidden
    >
      <motion.g
        animate={{ x: dx, y: dy }}
        transition={{ type: 'spring', stiffness: 60, damping: 18 }}
      >
        {EDGES.map((e, i) => {
          const a = STARS[e.from]!;
          const b = STARS[e.to]!;
          return (
            <motion.line
              key={i}
              x1={a.cx}
              y1={a.cy}
              x2={b.cx}
              y2={b.cy}
              stroke="currentColor"
              strokeWidth={0.4}
              opacity={0.18}
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 0.18 }}
              transition={{
                duration: 1.8,
                delay: 0.4 + i * 0.08,
                ease: [0.16, 1, 0.3, 1],
              }}
            />
          );
        })}
        {STARS.map((s, i) => (
          <motion.circle
            key={i}
            cx={s.cx}
            cy={s.cy}
            r={s.r}
            fill="currentColor"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: [0, 0.4, 0.25], scale: 1 }}
            transition={{
              duration: 1.4,
              delay: s.delay,
              ease: [0.16, 1, 0.3, 1],
              opacity: {
                duration: 4,
                delay: s.delay + 1,
                repeat: Infinity,
                repeatType: 'reverse',
                ease: 'easeInOut',
              },
            }}
          />
        ))}
      </motion.g>
    </svg>
  );
}
