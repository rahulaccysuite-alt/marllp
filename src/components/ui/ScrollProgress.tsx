'use client';

import { motion, useReducedMotion, useScroll, useSpring } from 'motion/react';
import { springSoft } from '@/lib/motion';

/** Thin reading-progress bar along the top of the viewport. */
export function ScrollProgress() {
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, springSoft);

  return (
    <motion.div
      className="pointer-events-none fixed inset-x-0 top-0 z-[60] h-[2px] origin-left bg-gradient-to-r from-brand-400 via-brand-600 to-brand-800"
      style={reduceMotion ? { scaleX: scrollYProgress } : { scaleX }}
      aria-hidden="true"
    />
  );
}
