'use client';

import { useReducedMotion } from 'motion/react';
import { cn } from '@/lib/utils';

interface FinancialGridProps {
  variant?: 'light' | 'dark';
  className?: string;
  animated?: boolean;
}

/** Subtle animated ledger grid used behind cinematic financial sections. */
export function FinancialGrid({
  variant = 'light',
  className,
  animated = true,
}: FinancialGridProps) {
  const reduceMotion = useReducedMotion();

  return (
    <div
      className={cn(
        'pointer-events-none absolute inset-0',
        variant === 'light' ? 'bg-grid-soft' : 'bg-grid-soft-light',
        animated && !reduceMotion && 'animate-grid-drift',
        className,
      )}
      aria-hidden="true"
    />
  );
}
