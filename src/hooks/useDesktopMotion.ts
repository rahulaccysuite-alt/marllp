'use client';

import { useReducedMotion } from 'motion/react';
import { useEffect, useState } from 'react';

/**
 * True only on fine-pointer desktop when motion is allowed.
 * Used to gate parallax, cursor glow, and floating loops.
 */
export function useDesktopMotion() {
  const reduceMotion = useReducedMotion();
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const media = window.matchMedia('(min-width: 768px) and (hover: hover) and (pointer: fine)');
    const sync = () => setIsDesktop(media.matches);
    sync();
    media.addEventListener('change', sync);
    return () => media.removeEventListener('change', sync);
  }, []);

  return {
    enabled: Boolean(isDesktop && !reduceMotion),
    isDesktop,
    reduceMotion: Boolean(reduceMotion),
  };
}
