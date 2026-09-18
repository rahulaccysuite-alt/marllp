import { cn } from '@/lib/utils';

interface GlowProps {
  className?: string;
  /** Soft color wash. Brand blue is the default for financial sections. */
  tone?: 'brand' | 'navy' | 'white';
}

/** Ambient blue/navy glow. GPU-friendly blur only — no layout animation. */
export function Glow({ className, tone = 'brand' }: GlowProps) {
  return (
    <div
      className={cn(
        'pointer-events-none absolute rounded-full blur-[120px]',
        tone === 'brand' && 'bg-brand-500/25',
        tone === 'navy' && 'bg-navy-900/40',
        tone === 'white' && 'bg-white/20',
        className,
      )}
      aria-hidden="true"
    />
  );
}
