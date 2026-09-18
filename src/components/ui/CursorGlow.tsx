'use client';

import { useEffect, useRef } from 'react';
import { useDesktopMotion } from '@/hooks/useDesktopMotion';
import { cn } from '@/lib/utils';

interface CursorGlowProps {
  className?: string;
}

/** Extremely soft blue wash that follows the cursor. Desktop only. */
export function CursorGlow({ className }: CursorGlowProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { enabled } = useDesktopMotion();

  useEffect(() => {
    const node = ref.current;
    if (!enabled || !node) return;

    const parent = node.parentElement;
    if (!parent) return;

    let frame = 0;
    const onMove = (event: PointerEvent) => {
      if (event.pointerType === 'touch') return;
      const rect = parent.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        node.style.setProperty('--cursor-x', `${x}px`);
        node.style.setProperty('--cursor-y', `${y}px`);
      });
    };

    parent.addEventListener('pointermove', onMove, { passive: true });
    return () => {
      parent.removeEventListener('pointermove', onMove);
      cancelAnimationFrame(frame);
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <div
      ref={ref}
      className={cn('pointer-events-none absolute inset-0 z-[1]', className)}
      style={{
        background:
          'radial-gradient(circle 180px at var(--cursor-x, 50%) var(--cursor-y, 32%), rgba(47,128,237,0.05), transparent 72%)',
      }}
      aria-hidden="true"
    />
  );
}
