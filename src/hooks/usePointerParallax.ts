'use client';

import { useReducedMotion } from 'motion/react';
import { useCallback, useEffect, useRef, useState, type PointerEvent } from 'react';

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

/**
 * Pointer position normalized to -1…1, disabled on touch, small screens,
 * and prefers-reduced-motion.
 */
export function usePointerParallax() {
  const ref = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const [isCoarse, setIsCoarse] = useState(false);
  const [isNarrow, setIsNarrow] = useState(false);
  const [pos, setPos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const coarse = window.matchMedia('(pointer: coarse)');
    const narrow = window.matchMedia('(max-width: 767px)');
    const sync = () => {
      setIsCoarse(coarse.matches);
      setIsNarrow(narrow.matches);
    };
    sync();
    coarse.addEventListener('change', sync);
    narrow.addEventListener('change', sync);
    return () => {
      coarse.removeEventListener('change', sync);
      narrow.removeEventListener('change', sync);
    };
  }, []);

  const disabled = Boolean(reduceMotion) || isCoarse || isNarrow;

  const onPointerMove = useCallback(
    (event: PointerEvent<HTMLDivElement>) => {
      if (disabled || event.pointerType === 'touch' || !ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      if (rect.width === 0 || rect.height === 0) return;
      setPos({
        x: clamp(((event.clientX - rect.left) / rect.width - 0.5) * 2, -1, 1),
        y: clamp(((event.clientY - rect.top) / rect.height - 0.5) * 2, -1, 1),
      });
    },
    [disabled],
  );

  const onPointerLeave = useCallback(() => {
    setPos({ x: 0, y: 0 });
  }, []);

  return { ref, x: pos.x, y: pos.y, disabled, onPointerMove, onPointerLeave };
}
