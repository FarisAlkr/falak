import type { Variants, Transition } from 'framer-motion';

const easeOut: [number, number, number, number] = [0.16, 1, 0.3, 1];
const easeInOut: [number, number, number, number] = [0.83, 0, 0.17, 1];

export const TRANSITION = {
  fast: { duration: 0.15, ease: easeOut } as Transition,
  base: { duration: 0.3, ease: easeOut } as Transition,
  slow: { duration: 0.5, ease: easeOut } as Transition,
  smooth: { duration: 0.6, ease: easeInOut } as Transition,
};

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: TRANSITION.slow },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: TRANSITION.base },
};

export const staggerParent: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.06, delayChildren: 0.05 },
  },
};

export const staggerSlow: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1, delayChildren: 0.1 },
  },
};

export const cardHover: Variants = {
  rest: { y: 0 },
  hover: { y: -2, transition: TRANSITION.base },
};

export const pulseSoft: Variants = {
  rest: { scale: 1, opacity: 0.7 },
  pulse: {
    scale: [1, 1.4, 1],
    opacity: [0.7, 1, 0.7],
    transition: { duration: 2.4, ease: easeInOut, repeat: Infinity },
  },
};

export const pageTransition: Variants = {
  initial: { opacity: 0, y: 4 },
  enter: { opacity: 1, y: 0, transition: TRANSITION.base },
  exit: { opacity: 0, y: -4, transition: TRANSITION.fast },
};
