/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect, useRef, useState } from 'react';
import { FeatureItem } from '../types';

interface FeatureCarouselProps {
  items: FeatureItem[];
  isPaused?: boolean;
}

const CARD_WIDTH = 210;
const CARD_GAP = 12; // gap-3 in Tailwind = 12px
const CARD_STEP = CARD_WIDTH + CARD_GAP; // 222px (210px width + 12px gap)

export default function FeatureCarousel({ items, isPaused = false }: FeatureCarouselProps) {
  const [activeCard, setActiveCard] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);
  const isInteractingRef = useRef(false);
  const resumeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Measures exact rendered card step (width + gap) with fallback to CARD_STEP constant
  const getCardStep = () => {
    if (scrollRef.current && scrollRef.current.children.length > 1) {
      const first = scrollRef.current.children[0] as HTMLElement;
      const second = scrollRef.current.children[1] as HTMLElement;
      const measured = second.offsetLeft - first.offsetLeft;
      if (measured > 0) return measured;
    }
    return CARD_STEP;
  };

  // Pause auto swipe on user interaction and resume after 6 seconds of inactivity
  const pauseTemporarily = () => {
    isInteractingRef.current = true;
    if (resumeTimerRef.current) {
      clearTimeout(resumeTimerRef.current);
    }
    resumeTimerRef.current = setTimeout(() => {
      isInteractingRef.current = false;
    }, 6000);
  };

  // Scrolls strictly via container.scrollTo (no scrollIntoView) to prevent page jumping
  const scrollToCard = (index: number) => {
    if (!scrollRef.current) return;
    const targetIndex = (index + items.length) % items.length;
    setActiveCard(targetIndex);
    const step = getCardStep();
    scrollRef.current.scrollTo({
      left: targetIndex * step,
      behavior: 'smooth',
    });
  };

  const handlePrev = () => {
    pauseTemporarily();
    scrollToCard(activeCard - 1);
  };

  const handleNext = () => {
    pauseTemporarily();
    scrollToCard(activeCard + 1);
  };

  // Active dot corresponds to card whose snap point is closest to container's scroll position
  const handleScroll = () => {
    if (!scrollRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
    const step = getCardStep();
    const maxScroll = scrollWidth - clientWidth;

    // If scrolled to the end boundary, align with the final card
    const isAtEnd = maxScroll > 0 && scrollLeft >= maxScroll - 8;

    const nextIndex = isAtEnd
      ? items.length - 1
      : Math.round(scrollLeft / step);

    const clamped = Math.max(0, Math.min(items.length - 1, nextIndex));
    setActiveCard(clamped);
  };

  // Auto-advance every 4 seconds with wrap-around, paused when tab hidden or prefers-reduced-motion
  useEffect(() => {
    if (isPaused) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    let isVisible = !document.hidden;
    const handleVisibility = () => {
      isVisible = !document.hidden;
    };
    document.addEventListener('visibilitychange', handleVisibility);

    const interval = setInterval(() => {
      if (!isInteractingRef.current && isVisible) {
        setActiveCard((prev) => {
          const next = (prev + 1) % items.length;
          if (scrollRef.current) {
            const step = getCardStep();
            scrollRef.current.scrollTo({
              left: next * step,
              behavior: 'smooth',
            });
          }
          return next;
        });
      }
    }, 4000);

    return () => {
      clearInterval(interval);
      document.removeEventListener('visibilitychange', handleVisibility);
      if (resumeTimerRef.current) {
        clearTimeout(resumeTimerRef.current);
      }
    };
  }, [items.length, isPaused]);

  return (
    <section
      className="w-full"
      onMouseEnter={pauseTemporarily}
      onMouseLeave={pauseTemporarily}
      onTouchStart={pauseTemporarily}
      onTouchEnd={pauseTemporarily}
    >
      {/* Scrolling row */}
      <div
        ref={scrollRef}
        onScroll={handleScroll}
        className="flex items-start overflow-x-auto no-scrollbar gap-3 snap-x snap-mandatory scroll-px-5 sm:scroll-px-6 -mx-5 sm:-mx-6 px-5 sm:px-6 pb-2"
        style={{
          scrollSnapType: 'x mandatory',
        }}
      >
        {items.map((item, index) => (
          <div
            key={index}
            className="shrink-0 snap-start flex flex-col items-center text-center cursor-pointer"
            onClick={() => {
              pauseTemporarily();
              scrollToCard(index);
            }}
            style={{
              scrollSnapAlign: 'start',
              flex: '0 0 210px',
              width: '210px',
              backgroundColor: 'var(--topbar-bg, #F4EFE6)',
              border: '1px solid var(--color-border-subtle, #DCD2C3)',
              borderRadius: '16px',
              padding: '14px 12px',
            }}
          >
            {/* Icon circle */}
            <div
              className="w-11 h-11 rounded-full flex items-center justify-center shrink-0 mb-[10px]"
              style={{ backgroundColor: 'rgba(184, 92, 62, 0.12)' }}
            >
              {item.iconType === 'book' && (
                <svg
                  className="w-6 h-6"
                  style={{ color: 'var(--color-terracotta, #B85C3E)' }}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.75"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
                  <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
                </svg>
              )}

              {item.iconType === 'code' && (
                <svg
                  className="w-6 h-6"
                  style={{ color: 'var(--color-terracotta, #B85C3E)' }}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.75"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <polyline points="16 18 22 12 16 6" />
                  <polyline points="8 6 2 12 8 18" />
                </svg>
              )}

              {item.iconType === 'letter' && (
                <span
                  className="text-xl font-bold leading-none select-none"
                  style={{ color: 'var(--color-terracotta, #B85C3E)' }}
                >
                  অ
                </span>
              )}

              {item.iconType === 'bolt' && (
                <svg
                  className="w-6 h-6"
                  style={{ color: 'var(--color-terracotta, #B85C3E)' }}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.75"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
                </svg>
              )}
            </div>

            {/* Title */}
            <h3 className="font-bold text-[16px] text-[var(--color-ink,#1C1A18)] leading-snug mb-[4px]">
              {item.title}
            </h3>

            {/* Description */}
            <p className="text-[14px] text-[var(--color-muted,#5F564D)] leading-relaxed">
              {item.description}
            </p>
          </div>
        ))}
      </div>

      {/* Controls row */}
      <div className="flex items-center justify-between mt-4 px-2 sm:px-4 max-w-[290px] mx-auto">
        <button
          type="button"
          onClick={handlePrev}
          aria-label="আগের"
          className="w-10 h-10 rounded-full flex items-center justify-center border border-[var(--color-border-subtle,#DCD2C3)] bg-[var(--topbar-bg,#F4EFE6)] text-[var(--color-terracotta,#B85C3E)] hover:bg-[#1C1A18]/5 active:scale-95 transition-transform focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-terracotta,#B85C3E)] cursor-pointer shrink-0"
        >
          <svg
            className="w-5 h-5"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </button>

        <div className="flex items-center gap-2">
          {items.map((_, index) => (
            <button
              key={index}
              type="button"
              onClick={() => {
                pauseTemporarily();
                scrollToCard(index);
              }}
              aria-label={`কার্ড ${index + 1}`}
              className="p-1 focus:outline-none"
            >
              <span
                className={`block w-2 h-2 rounded-full transition-colors ${
                  activeCard === index
                    ? 'bg-[var(--color-terracotta,#B85C3E)]'
                    : 'bg-[var(--color-border-subtle,#DCD2C3)]'
                }`}
              />
            </button>
          ))}
        </div>

        <button
          type="button"
          onClick={handleNext}
          aria-label="পরের"
          className="w-10 h-10 rounded-full flex items-center justify-center border border-[var(--color-border-subtle,#DCD2C3)] bg-[var(--topbar-bg,#F4EFE6)] text-[var(--color-terracotta,#B85C3E)] hover:bg-[#1C1A18]/5 active:scale-95 transition-transform focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-terracotta,#B85C3E)] cursor-pointer shrink-0"
        >
          <svg
            className="w-5 h-5"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </button>
      </div>
    </section>
  );
}
