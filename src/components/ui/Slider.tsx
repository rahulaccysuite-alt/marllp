'use client';

import useEmblaCarousel from 'embla-carousel-react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { motion, useReducedMotion } from 'motion/react';
import { Children, useCallback, useEffect, useState, type KeyboardEvent, type ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface SliderProps {
  children: ReactNode;
  /** Controls how many slides are visible per breakpoint. */
  slideClassName?: string;
  className?: string;
  ariaLabel: string;
  /** Hide dots/arrows from this breakpoint up (when cards already fit in view). */
  hideControlsFrom?: 'md' | 'lg' | 'xl';
  /** Auto-advance interval in ms. Disabled when prefers-reduced-motion. */
  autoplayMs?: number;
  /** Scale the selected slide up and fade neighbors. */
  emphasizeActive?: boolean;
}

/**
 * Premium drag/touch-enabled horizontal slider (Embla) with arrow
 * navigation and pill pagination indicators.
 */
const hideControlsClass: Record<NonNullable<SliderProps['hideControlsFrom']>, string> = {
  md: 'md:hidden',
  lg: 'lg:hidden',
  xl: 'xl:hidden',
};

const spring = { type: 'spring' as const, stiffness: 260, damping: 28, mass: 0.7 };

export function Slider({
  children,
  slideClassName = 'flex-[0_0_100%] md:flex-[0_0_50%] lg:flex-[0_0_33.333%]',
  className,
  ariaLabel,
  hideControlsFrom,
  autoplayMs,
  emphasizeActive = false,
}: SliderProps) {
  const reduceMotion = useReducedMotion();
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: 'start',
    skipSnaps: false,
    containScroll: 'trimSnaps',
    dragFree: false,
    loop: Boolean(autoplayMs),
  });
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
    setCanScrollPrev(emblaApi.canScrollPrev());
    setCanScrollNext(emblaApi.canScrollNext());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    const onReInit = () => {
      setScrollSnaps(emblaApi.scrollSnapList());
      onSelect();
    };
    onReInit();
    emblaApi.on('select', onSelect);
    emblaApi.on('reInit', onReInit);
    return () => {
      emblaApi.off('select', onSelect);
      emblaApi.off('reInit', onReInit);
    };
  }, [emblaApi, onSelect]);

  useEffect(() => {
    if (!emblaApi || !autoplayMs) return;
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (media.matches) return;

    const id = window.setInterval(() => {
      if (emblaApi.canScrollNext()) {
        emblaApi.scrollNext();
      } else {
        emblaApi.scrollTo(0);
      }
    }, autoplayMs);

    return () => window.clearInterval(id);
  }, [emblaApi, autoplayMs]);

  const arrowClasses =
    'flex h-11 w-11 items-center justify-center rounded-full border border-brand-100 bg-white text-ink shadow-sm transition-all duration-300 hover:border-brand-300 hover:bg-brand-50 hover:text-brand-700 hover:shadow-md disabled:opacity-35 disabled:pointer-events-none';

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'ArrowLeft') {
      event.preventDefault();
      emblaApi?.scrollPrev();
    }
    if (event.key === 'ArrowRight') {
      event.preventDefault();
      emblaApi?.scrollNext();
    }
  };

  return (
    <div
      className={cn('overflow-x-clip outline-none', className)}
      role="region"
      aria-roledescription="carousel"
      aria-label={ariaLabel}
      tabIndex={0}
      onKeyDown={handleKeyDown}
    >
      {/* Vertical padding keeps hover lift + shadows from being clipped */}
      <div ref={emblaRef} className="overflow-hidden -my-4 py-4 cursor-grab active:cursor-grabbing sm:-my-6 sm:py-6">
        <div className="flex touch-pan-y gap-6 [transform-style:preserve-3d]">
          {Children.map(children, (child, index) => {
            const distance = Math.abs(index - selectedIndex);
            const emphasize = emphasizeActive && !reduceMotion;
            return (
              <motion.div
                className={cn('min-w-0', slideClassName)}
                animate={
                  emphasize
                    ? {
                        scale: distance === 0 ? 1 : distance === 1 ? 0.94 : 0.9,
                        opacity: distance === 0 ? 1 : distance === 1 ? 0.72 : 0.55,
                      }
                    : undefined
                }
                transition={spring}
                style={{ transformOrigin: 'center bottom' }}
              >
                {child}
              </motion.div>
            );
          })}
        </div>
      </div>

      <div
        className={cn(
          'mt-10 flex items-center justify-between gap-6',
          hideControlsFrom && hideControlsClass[hideControlsFrom],
        )}
      >
        <div className="flex items-center gap-2" role="tablist" aria-label="Slides">
          {scrollSnaps.map((_, index) => (
            <button
              key={index}
              type="button"
              role="tab"
              aria-selected={index === selectedIndex}
              aria-label={`Go to slide ${index + 1}`}
              onClick={() => emblaApi?.scrollTo(index)}
              className={cn(
                'h-2 rounded-full transition-all duration-400',
                index === selectedIndex
                  ? 'w-8 bg-brand-600'
                  : 'w-2 bg-brand-200 hover:bg-brand-300',
              )}
            />
          ))}
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            aria-label="Previous slide"
            onClick={() => emblaApi?.scrollPrev()}
            disabled={!canScrollPrev}
            className={arrowClasses}
          >
            <ArrowLeft size={18} />
          </button>
          <button
            type="button"
            aria-label="Next slide"
            onClick={() => emblaApi?.scrollNext()}
            disabled={!canScrollNext}
            className={arrowClasses}
          >
            <ArrowRight size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}
