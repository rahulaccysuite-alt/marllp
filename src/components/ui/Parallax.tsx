'use client';

import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react';
import { useEffect, useRef, useState, type ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface ParallaxProps {
  children: ReactNode;
  className?: string;
  /** Pixel travel from start to end of the scroll range. Keep small (8–16). */
  offset?: number;
  scale?: [number, number];
}

/** Scroll-linked translate/scale. Disabled on mobile and reduced motion. */
export function Parallax({
  children,
  className,
  offset = 10,
  scale,
}: ParallaxProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const [isMobile, setIsMobile] = useState(true);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });
  const y = useTransform(scrollYProgress, [0, 1], [offset, -offset]);
  const zoom = useTransform(scrollYProgress, [0, 1], scale ?? [1, 1]);

  useEffect(() => {
    const media = window.matchMedia('(max-width: 767px)');
    const sync = () => setIsMobile(media.matches);
    sync();
    media.addEventListener('change', sync);
    return () => media.removeEventListener('change', sync);
  }, []);

  const disabled = Boolean(reduceMotion) || isMobile;

  return (
    <motion.div
      ref={ref}
      className={cn(className)}
      style={disabled ? undefined : { y, scale: scale ? zoom : undefined }}
    >
      {children}
    </motion.div>
  );
}
