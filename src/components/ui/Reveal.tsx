'use client';

import { motion, useReducedMotion } from 'motion/react';
import type { ReactNode } from 'react';
import { durationReveal, easeOut } from '@/lib/motion';

interface RevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  x?: number;
  /** Directional entrance; overrides x/y when set. */
  direction?: 'up' | 'left' | 'right' | 'none';
}

/** Group reveal: opacity + 24px rise. No blur, no scale. */
export function Reveal({
  children,
  className,
  delay = 0,
  y = 24,
  x = 0,
  direction = 'up',
}: RevealProps) {
  const reduceMotion = useReducedMotion();

  const offset =
    direction === 'left'
      ? { x: -24, y: 0 }
      : direction === 'right'
        ? { x: 24, y: 0 }
        : direction === 'none'
          ? { x: 0, y: 0 }
          : { x, y };

  return (
    <motion.div
      className={className}
      initial={reduceMotion ? false : { opacity: 0, ...offset }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: '-64px' }}
      transition={{ duration: durationReveal, delay, ease: easeOut }}
    >
      {children}
    </motion.div>
  );
}
