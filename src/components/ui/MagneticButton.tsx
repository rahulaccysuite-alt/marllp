'use client';

import { motion, useReducedMotion, useSpring } from 'motion/react';
import { useEffect, useRef, useState, type PointerEvent, type ReactNode } from 'react';
import { springSnappy } from '@/lib/motion';
import { cn } from '@/lib/utils';

interface MagneticButtonProps {
  children: ReactNode;
  className?: string;
  /** How far the control leans toward the pointer, in px. */
  strength?: number;
}

/** Slightly attracts a CTA toward the pointer on fine pointers only. */
export function MagneticButton({
  children,
  className,
  strength = 10,
}: MagneticButtonProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const [isCoarse, setIsCoarse] = useState(false);
  const x = useSpring(0, springSnappy);
  const y = useSpring(0, springSnappy);

  useEffect(() => {
    const media = window.matchMedia('(pointer: coarse)');
    const sync = () => setIsCoarse(media.matches);
    sync();
    media.addEventListener('change', sync);
    return () => media.removeEventListener('change', sync);
  }, []);

  const disabled = Boolean(reduceMotion) || isCoarse;

  const reset = () => {
    x.set(0);
    y.set(0);
  };

  const handlePointerMove = (event: PointerEvent<HTMLDivElement>) => {
    if (disabled || event.pointerType === 'touch' || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const dx = event.clientX - (rect.left + rect.width / 2);
    const dy = event.clientY - (rect.top + rect.height / 2);
    x.set((dx / rect.width) * strength);
    y.set((dy / rect.height) * strength);
  };

  return (
    <motion.div
      ref={ref}
      className={cn('inline-flex', className)}
      style={disabled ? undefined : { x, y }}
      onPointerMove={handlePointerMove}
      onPointerLeave={reset}
    >
      {children}
    </motion.div>
  );
}
