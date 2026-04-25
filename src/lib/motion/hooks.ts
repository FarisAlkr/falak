'use client';

import { useEffect, useRef, useState, type RefObject } from 'react';
import { useMotionValue, useSpring, type MotionValue } from 'framer-motion';

interface MousePos {
  x: number;
  y: number;
}

export function useReducedMotion(): boolean {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReduced(mq.matches);
    const listener = (e: MediaQueryListEvent) => setReduced(e.matches);
    mq.addEventListener('change', listener);
    return () => mq.removeEventListener('change', listener);
  }, []);
  return reduced;
}

/**
 * Tracks the mouse position relative to the target element, normalized to [-0.5, 0.5]
 * on each axis. Returns null when the cursor leaves the element. SSR-safe.
 */
export function useElementMouse(
  ref: RefObject<HTMLElement | null>,
): MousePos | null {
  const [pos, setPos] = useState<MousePos | null>(null);
  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const handleMove = (e: MouseEvent) => {
      const rect = node.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      setPos({ x, y });
    };
    const handleLeave = () => setPos(null);
    node.addEventListener('mousemove', handleMove);
    node.addEventListener('mouseleave', handleLeave);
    return () => {
      node.removeEventListener('mousemove', handleMove);
      node.removeEventListener('mouseleave', handleLeave);
    };
  }, [ref]);
  return pos;
}

/**
 * 3D tilt that follows the cursor. Returns spring-smoothed motion values for
 * rotateX / rotateY in degrees. Disabled if user prefers reduced motion.
 */
export function useTilt(
  ref: RefObject<HTMLElement | null>,
  maxDegrees = 4,
): { rotateX: MotionValue<number>; rotateY: MotionValue<number> } {
  const reduced = useReducedMotion();
  const targetX = useMotionValue(0);
  const targetY = useMotionValue(0);
  const rotateX = useSpring(targetX, { stiffness: 200, damping: 20 });
  const rotateY = useSpring(targetY, { stiffness: 200, damping: 20 });

  useEffect(() => {
    if (reduced) return;
    const node = ref.current;
    if (!node) return;
    const handleMove = (e: MouseEvent) => {
      const rect = node.getBoundingClientRect();
      const px = (e.clientX - rect.left) / rect.width - 0.5;
      const py = (e.clientY - rect.top) / rect.height - 0.5;
      targetX.set(-py * maxDegrees * 2);
      targetY.set(px * maxDegrees * 2);
    };
    const handleLeave = () => {
      targetX.set(0);
      targetY.set(0);
    };
    node.addEventListener('mousemove', handleMove);
    node.addEventListener('mouseleave', handleLeave);
    return () => {
      node.removeEventListener('mousemove', handleMove);
      node.removeEventListener('mouseleave', handleLeave);
    };
  }, [ref, maxDegrees, reduced, targetX, targetY]);

  return { rotateX, rotateY };
}

/**
 * Pulls the element toward the cursor when within `radius` px. Used for
 * magnetic CTAs. Returns spring-smoothed offsets in pixels.
 */
export function useMagnetic(
  ref: RefObject<HTMLElement | null>,
  options: { radius?: number; pull?: number } = {},
): { x: MotionValue<number>; y: MotionValue<number> } {
  const { radius = 100, pull = 0.25 } = options;
  const reduced = useReducedMotion();
  const targetX = useMotionValue(0);
  const targetY = useMotionValue(0);
  const x = useSpring(targetX, { stiffness: 250, damping: 18 });
  const y = useSpring(targetY, { stiffness: 250, damping: 18 });

  useEffect(() => {
    if (reduced) return;
    const node = ref.current;
    if (!node) return;
    const handleMove = (e: MouseEvent) => {
      const rect = node.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = e.clientX - cx;
      const dy = e.clientY - cy;
      const dist = Math.hypot(dx, dy);
      if (dist < radius) {
        const factor = (1 - dist / radius) * pull;
        targetX.set(dx * factor);
        targetY.set(dy * factor);
      } else {
        targetX.set(0);
        targetY.set(0);
      }
    };
    window.addEventListener('mousemove', handleMove);
    return () => window.removeEventListener('mousemove', handleMove);
  }, [ref, radius, pull, reduced, targetX, targetY]);

  return { x, y };
}

/**
 * Global mouse position in viewport pixels. SSR-safe (returns 0,0 server-side).
 */
export function useViewportMouse(): MousePos {
  const [pos, setPos] = useState<MousePos>({ x: 0, y: 0 });
  useEffect(() => {
    const handler = (e: MouseEvent) => setPos({ x: e.clientX, y: e.clientY });
    window.addEventListener('mousemove', handler);
    return () => window.removeEventListener('mousemove', handler);
  }, []);
  return pos;
}

/**
 * Triggers `visible` when the element scrolls into view. Idempotent — only fires once.
 * Falls back to immediate-visible if IntersectionObserver isn't available.
 */
export function useInViewOnce(
  ref: RefObject<HTMLElement | null>,
  threshold = 0.15,
): boolean {
  const [seen, setSeen] = useState(false);
  const fired = useRef(false);
  useEffect(() => {
    if (fired.current) return;
    const node = ref.current;
    if (!node) return;
    if (typeof IntersectionObserver === 'undefined') {
      setSeen(true);
      fired.current = true;
      return;
    }
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting && !fired.current) {
            setSeen(true);
            fired.current = true;
            obs.disconnect();
          }
        });
      },
      { threshold },
    );
    obs.observe(node);
    return () => obs.disconnect();
  }, [ref, threshold]);
  return seen;
}
