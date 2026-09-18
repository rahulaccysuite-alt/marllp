'use client';

import { motion, useReducedMotion, useSpring } from 'motion/react';
import { useEffect, useRef, useState, type PointerEvent, type ReactNode } from 'react';
import { springSoft } from '@/lib/motion';
import { cn } from '@/lib/utils';

interface TiltCardProps {
  children: ReactNode;
  className?: string;
  /** Maximum tilt in degrees. Keep subtle (4–6). */
  maxTilt?: number;
  /** Soft blue ambient glow behind the card. */
  glow?: boolean;
  /** Slow 0 → -6px → 0 float cycle. */
  float?: boolean;
}

/** Tilts its content toward the pointer with a subtle 3D perspective. */
export function TiltCard({
  children,
  className,
  maxTilt = 4.5,
  glow = false,
  float = false,
}: TiltCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const [isCoarse, setIsCoarse] = useState(false);
  const tilt = Math.min(6, Math.max(3, maxTilt));
  const rotateX = useSpring(0, springSoft);
  const rotateY = useSpring(0, springSoft);
  const translateZ = useSpring(0, springSoft);
  const liftY = useSpring(0, springSoft);
  const glowOpacity = useSpring(0.35, springSoft);

  useEffect(() => {
    const media = window.matchMedia('(pointer: coarse)');
    const sync = () => setIsCoarse(media.matches);
    sync();
    media.addEventListener('change', sync);
    return () => media.removeEventListener('change', sync);
  }, []);

  const disableTilt = Boolean(reduceMotion) || isCoarse;

  const reset = () => {
    rotateX.set(0);
    rotateY.set(0);
    translateZ.set(0);
    liftY.set(0);
    glowOpacity.set(0.35);
  };

  const handlePointerMove = (event: PointerEvent<HTMLDivElement>) => {
    if (disableTilt || event.pointerType === 'touch' || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;
    rotateX.set(Math.max(-tilt, Math.min(tilt, -y * tilt * 2)));
    rotateY.set(Math.max(-tilt, Math.min(tilt, x * tilt * 2)));
    translateZ.set(12);
    liftY.set(-5);
    glowOpacity.set(0.7);
  };

  return (
    <motion.div
      className={cn('relative', className)}
      animate={float && !reduceMotion ? { y: [0, isCoarse ? -3 : -6, 0] } : undefined}
      transition={
        float && !reduceMotion
          ? { duration: isCoarse ? 8 : 7, repeat: Infinity, ease: 'easeInOut' }
          : undefined
      }
    >
      {glow && (
        <motion.div
          className="pointer-events-none absolute -inset-5 -z-10 rounded-[40px] bg-gradient-to-br from-brand-400/30 via-brand-300/10 to-brand-700/20 blur-3xl"
          style={disableTilt ? undefined : { opacity: glowOpacity }}
          aria-hidden="true"
        />
      )}
      <motion.div
        ref={ref}
        onPointerMove={handlePointerMove}
        onPointerLeave={reset}
        className={cn(
          '[transform-style:preserve-3d]',
          disableTilt && 'transition-transform duration-500 ease-out hover:translate-y-[-2px]',
        )}
        style={
          disableTilt
            ? undefined
            : {
                rotateX,
                rotateY,
                z: translateZ,
                y: liftY,
                transformPerspective: 1400,
              }
        }
      >
        {children}
      </motion.div>
    </motion.div>
  );
}
