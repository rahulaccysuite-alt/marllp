'use client';

import { animate, useInView, useReducedMotion } from 'motion/react';
import { useEffect, useRef, useState } from 'react';

interface AnimatedCounterProps {
  value: number;
  prefix?: string;
  suffix?: string;
  duration?: number;
  decimals?: number;
  className?: string;
}

/** Counts from 0 to `value` when scrolled into view. */
export function AnimatedCounter({
  value,
  prefix = '',
  suffix = '',
  duration = 1.25,
  decimals = 0,
  className,
}: AnimatedCounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: '-40px' });
  const reduceMotion = useReducedMotion();
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView) return;
    if (reduceMotion) {
      setDisplay(value);
      return;
    }
    const controls = animate(0, value, {
      duration,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (latest) => {
        setDisplay(decimals > 0 ? Number(latest.toFixed(decimals)) : Math.round(latest));
      },
    });
    return () => controls.stop();
  }, [inView, value, duration, decimals, reduceMotion]);

  return (
    <span ref={ref} className={className}>
      {prefix}
      {decimals > 0 ? display.toFixed(decimals) : display}
      {suffix}
    </span>
  );
}
