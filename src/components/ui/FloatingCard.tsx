'use client';

import { motion, useReducedMotion } from 'motion/react';
import { useEffect, useState, type ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface FloatingCardProps {
  children: ReactNode;
  className?: string;
  /** Stagger the float cycle so cards don't move in sync. */
  delay?: number;
  duration?: number;
  amplitude?: number;
}

/** Glassmorphic card that gently floats up and down. */
export function FloatingCard({
  children,
  className,
  delay = 0,
  duration = 4,
  amplitude,
}: FloatingCardProps) {
  const reduceMotion = useReducedMotion();
  const [isCoarse, setIsCoarse] = useState(false);

  useEffect(() => {
    const media = window.matchMedia('(pointer: coarse)');
    const sync = () => setIsCoarse(media.matches);
    sync();
    media.addEventListener('change', sync);
    return () => media.removeEventListener('change', sync);
  }, []);

  const travel = amplitude ?? (isCoarse ? -3 : -6);

  return (
    <motion.div
      className={cn('glass-card rounded-2xl', className)}
      animate={reduceMotion ? undefined : { y: [0, travel, 0] }}
      transition={{ duration, delay, repeat: Infinity, ease: 'easeInOut' }}
    >
      {children}
    </motion.div>
  );
}
