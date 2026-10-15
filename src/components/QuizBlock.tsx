/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useRef, useState } from 'react';
import QuizFlow, { QuizQuestion } from './QuizFlow';

interface QuizBlockProps {
  questions: QuizQuestion[];
}

const BENGALI_NUMERALS = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];

function toBanglaDigit(num: number): string {
  return String(num)
    .split('')
    .map((ch) => {
      const idx = parseInt(ch, 10);
      return isNaN(idx) ? ch : BENGALI_NUMERALS[idx];
    })
    .join('');
}

export default function QuizBlock({ questions }: QuizBlockProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isFullyExpanded, setIsFullyExpanded] = useState(false);
  const [lastScore, setLastScore] = useState<{ score: number; total: number } | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const cancelScrollRef = useRef<(() => void) | null>(null);

  const cleanupScrollListeners = () => {
    if (cancelScrollRef.current) {
      cancelScrollRef.current();
      cancelScrollRef.current = null;
    }
  };

  useEffect(() => {
    return () => {
      cleanupScrollListeners();
    };
  }, []);

  useEffect(() => {
    if (isOpen) {
      const prefersReducedMotion =
        window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (prefersReducedMotion) {
        setIsFullyExpanded(true);
      }
    } else {
      setIsFullyExpanded(false);
    }
  }, [isOpen]);

  const handleToggle = () => {
    setIsOpen((prev) => {
      const willOpen = !prev;
      if (!willOpen) {
        setIsFullyExpanded(false);
        cleanupScrollListeners();
      } else {
        requestAnimationFrame(() => {
          if (!containerRef.current) return;
          const rect = containerRef.current.getBoundingClientRect();
          const topbarOffset = 72;
          const viewportHeight = window.innerHeight;

          // If the top of the container is above the viewport or close to the bottom
          if (rect.top < topbarOffset || rect.top > viewportHeight - 160) {
            const targetY = window.scrollY + rect.top - topbarOffset;
            const prefersReducedMotion =
              window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

            if (prefersReducedMotion) {
              window.scrollTo({
                top: Math.max(0, targetY),
                behavior: 'auto',
              });
            } else {
              cleanupScrollListeners();

              const cancelScroll = () => {
                window.scrollTo({ top: window.scrollY, behavior: 'instant' as ScrollBehavior });
                cleanup();
              };

              const cleanup = () => {
                window.removeEventListener('touchstart', cancelScroll);
                window.removeEventListener('touchmove', cancelScroll);
                window.removeEventListener('wheel', cancelScroll);
                window.removeEventListener('keydown', cancelScroll);
                cancelScrollRef.current = null;
              };

              cancelScrollRef.current = cleanup;

              window.addEventListener('touchstart', cancelScroll, { passive: true, once: true });
              window.addEventListener('touchmove', cancelScroll, { passive: true, once: true });
              window.addEventListener('wheel', cancelScroll, { passive: true, once: true });
              window.addEventListener('keydown', cancelScroll, { passive: true, once: true });

              window.scrollTo({
                top: Math.max(0, targetY),
                behavior: 'smooth',
              });

              setTimeout(() => {
                cleanup();
              }, 800);
            }
          }
        });
      }
      return willOpen;
    });
  };

  const handleFinish = (score: number, total: number) => {
    setLastScore({ score, total });
  };

  const totalCount = questions.length;
  const subtitle =
    lastScore !== null
      ? `সর্বশেষ স্কোর: ${toBanglaDigit(lastScore.score)}/${toBanglaDigit(lastScore.total)}`
      : `${toBanglaDigit(totalCount)}টি প্রশ্ন`;

  const isRestingOpen = isOpen && isFullyExpanded;

  return (
    <div
      ref={containerRef}
      className={`w-full mt-6 mb-3 rounded-[14px] ${
        isRestingOpen ? 'overflow-visible' : 'overflow-hidden'
      }`}
      style={{
        backgroundColor: '#F1E8DE',
        border: '1px solid rgba(184, 92, 62, 0.30)',
        borderRadius: '14px',
      }}
    >
      {/* Header Toggle Button */}
      <button
        type="button"
        onClick={handleToggle}
        aria-expanded={isOpen}
        aria-controls="quiz-content"
        className="w-full text-left p-[14px_16px] min-h-[56px] bg-transparent flex items-center justify-between gap-3 cursor-pointer select-none focus:outline-none focus-visible:ring-2 focus-visible:ring-[#B85C3E] focus-visible:ring-offset-2 hover:bg-[rgba(184,92,62,0.04)] active:bg-[rgba(184,92,62,0.07)] transition-colors"
      >
        <div className="flex items-center gap-3 min-w-0">
          {/* 40px circle containing '?' icon */}
          <div
            className="w-10 h-10 rounded-full flex items-center justify-center shrink-0"
            style={{ backgroundColor: 'rgba(184, 92, 62, 0.14)' }}
            aria-hidden="true"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#B85C3E"
              strokeWidth="1.75"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="12" r="10" />
              <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
              <line x1="12" y1="17" x2="12.01" y2="17" />
            </svg>
          </div>

          <div className="flex flex-col min-w-0">
            <span
              id="quiz-header-title"
              className="text-[16px] font-semibold text-[#1C1A18] leading-snug"
            >
              নিজেকে যাচাই করুন
            </span>
            <span className="text-[13px] text-[#5F564D] mt-0.5 leading-tight">
              {subtitle}
            </span>
          </div>
        </div>

        <div
          className={`shrink-0 flex items-center justify-center transition-transform duration-[220ms] ease-[cubic-bezier(0.22,0.61,0.36,1)] motion-reduce:transition-none ${
            isOpen ? 'rotate-180' : ''
          }`}
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#A39888"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </div>
      </button>

      {/* Expandable Region with grid-template-rows animation */}
      <div
        id="quiz-content"
        role="region"
        aria-labelledby="quiz-header-title"
        onTransitionEnd={(e) => {
          if (e.target === e.currentTarget && isOpen) {
            setIsFullyExpanded(true);
          }
        }}
        className={`grid transition-[grid-template-rows] duration-[220ms] ease-[cubic-bezier(0.22,0.61,0.36,1)] motion-reduce:transition-none ${
          isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
        }`}
        inert={!isOpen ? (true as any) : undefined}
      >
        <div className={`min-h-0 ${isRestingOpen ? 'overflow-visible' : 'overflow-hidden'}`}>
          <div
            className="p-4 sm:p-5"
            style={{ borderTop: '1px solid rgba(184, 92, 62, 0.20)' }}
          >
            <QuizFlow
              questions={questions}
              isInline={true}
              onFinish={handleFinish}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
