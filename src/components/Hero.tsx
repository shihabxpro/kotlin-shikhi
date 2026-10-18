/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { ArrowRight, Check, Languages, Map, ShieldCheck } from 'lucide-react';
import type { CSSProperties } from 'react';
import { getLessonContent } from '../content/lessons';
import { useReadProgress } from '../hooks/useReadProgress';
import { getLastLesson } from '../utils/progress';

interface HeroProps {
  onStartLearning?: () => void;
  onViewRoadmap?: () => void;
  onOpenLesson?: (moduleId: number, lessonId: number) => void;
}

interface FloatingSymbol {
  char: string;
  style: CSSProperties;
}

const FLOATING_SYMBOLS: FloatingSymbol[] = [
  { char: '{', style: { top: '-6%', right: '6%', fontSize: '2.1rem', color: 'var(--color-terracotta, #B85C3E)', '--hero-symbol-opacity': '0.26', animationDelay: '0s', animationDuration: '7s' } as CSSProperties },
  { char: '}', style: { top: '46%', right: '8%', fontSize: '1.9rem', color: 'var(--color-code-fn, #2B5B84)', '--hero-symbol-opacity': '0.24', animationDelay: '1.1s', animationDuration: '8.5s' } as CSSProperties },
  { char: 'val', style: { top: '33%', right: '3%', fontSize: '1.05rem', color: 'var(--color-code-string, #2D6A4F)', '--hero-symbol-opacity': '0.42', animationDelay: '0.9s', animationDuration: '8s' } as CSSProperties },
  { char: 'fun', style: { top: '4%', right: '30%', fontSize: '1.05rem', color: 'var(--color-code-builtin, #9C4221)', '--hero-symbol-opacity': '0.34', animationDelay: '2.3s', animationDuration: '9.5s' } as CSSProperties },
  { char: '<', style: { bottom: '0%', right: '14%', fontSize: '1.5rem', color: 'var(--color-terracotta, #B85C3E)', '--hero-symbol-opacity': '0.24', animationDelay: '1.7s', animationDuration: '7.5s' } as CSSProperties },
  { char: '>', style: { top: '40%', right: '30%', fontSize: '1.35rem', color: 'var(--color-code-fn, #2B5B84)', '--hero-symbol-opacity': '0.22', animationDelay: '0.5s', animationDuration: '9s' } as CSSProperties },
  { char: '( )', style: { top: '2%', right: '50%', fontSize: '1.15rem', color: 'var(--color-muted-light, #8A7F72)', '--hero-symbol-opacity': '0.22', animationDelay: '2s', animationDuration: '7.3s' } as CSSProperties },
  { char: ';', style: { bottom: '6%', right: '34%', fontSize: '1.5rem', color: 'var(--color-code-string, #2D6A4F)', '--hero-symbol-opacity': '0.24', animationDelay: '1.4s', animationDuration: '8.2s' } as CSSProperties },
  { char: 'if', style: { top: '20%', right: '44%', fontSize: '1.25rem', color: 'var(--color-code-string, #2D6A4F)', '--hero-symbol-opacity': '0.3', animationDelay: '3s', animationDuration: '8.8s' } as CSSProperties },
  { char: 'null', style: { bottom: '24%', right: '22%', fontSize: '1rem', color: 'var(--color-code-builtin, #9C4221)', '--hero-symbol-opacity': '0.34', animationDelay: '1.9s', animationDuration: '7.8s' } as CSSProperties },
];

export default function Hero({
  onStartLearning,
  onViewRoadmap,
  onOpenLesson,
}: HeroProps = {}) {
  const read = useReadProgress();
  const hasProgress = read.size > 0;
  const last = getLastLesson();
  const hasLastContent = last
    ? Boolean(getLessonContent(last.moduleId, last.lessonId))
    : false;
  const canContinue = hasProgress && last !== null && hasLastContent;

  const handleStartLearning = () => {
    if (onStartLearning) {
      onStartLearning();
    } else {
      window.location.hash = '#/module/1/lesson/1';
      window.dispatchEvent(new PopStateEvent('popstate', { state: window.history.state }));
    }
  };

  const handlePrimary = () => {
    if (canContinue && last && onOpenLesson) {
      onOpenLesson(last.moduleId, last.lessonId);
    } else {
      handleStartLearning();
    }
  };

  const handleViewRoadmap = () => {
    if (onViewRoadmap) {
      onViewRoadmap();
    } else {
      const section = document.getElementById('modules-section');
      section?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative">
      {/* Badge */}
      <div className="mb-4 relative z-10">
        <span
          className="inline-flex items-center gap-2 text-[11px] font-semibold tracking-[0.14em] uppercase pl-2.5 pr-3.5 py-1.5 rounded-full backdrop-blur-sm"
          style={{
            color: 'var(--color-terracotta, #B85C3E)',
            border: '1px solid var(--color-border-subtle, #DCD2C3)',
            backgroundColor: 'rgba(244, 239, 230, 0.72)',
            boxShadow: '0 1px 2px rgba(28, 26, 24, 0.05)',
          }}
        >
          <span className="relative flex h-1.5 w-1.5" aria-hidden="true">
            <span
              className="absolute inline-flex h-full w-full rounded-full opacity-60 animate-ping motion-reduce:animate-none"
              style={{ backgroundColor: 'var(--color-terracotta, #B85C3E)' }}
            />
            <span
              className="relative inline-flex h-1.5 w-1.5 rounded-full"
              style={{ backgroundColor: 'var(--color-terracotta, #B85C3E)' }}
            />
          </span>
          <span>Kotlin</span>
          <span className="opacity-30" aria-hidden="true">•</span>
          <span className="tracking-normal normal-case">বাংলা টিউটোরিয়াল</span>
        </span>
      </div>

      {/* Headline with floating code symbols + 'গল্পটা' in terracotta + hand-drawn wavy underline */}
      <div className="relative mb-5">
        {FLOATING_SYMBOLS.map((symbol, index) => (
          <span
            key={index}
            className="hero-symbol"
            aria-hidden="true"
            style={symbol.style}
          >
            {symbol.char}
          </span>
        ))}

        <h1
          className="relative z-10 text-3xl sm:text-5xl text-[var(--color-ink,#1C1A18)]"
          style={{
            fontFamily: 'var(--font-heading)',
            fontWeight: 700,
            letterSpacing: 0,
            lineHeight: 1.35,
          }}
        >
          <span className="block">কোড শেখার</span>
          <span className="block">
            <span
              className="relative inline-block"
              style={{ color: 'var(--color-terracotta, #B85C3E)' }}
            >
              গল্পটা
              <svg
                className="absolute left-0 -bottom-[0.14em] w-full h-[0.18em] overflow-visible pointer-events-none"
                style={{ color: 'var(--color-terracotta, #B85C3E)' }}
                viewBox="0 0 100 8"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                preserveAspectRatio="none"
                aria-hidden="true"
              >
                <path
                  d="M2 5.5 C 18 2, 40 2.5, 58 4.5 C 74 6.5, 88 3.5, 98 2.5"
                  stroke="currentColor"
                  strokeWidth="2.75"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  vectorEffect="non-scaling-stroke"
                />
              </svg>
            </span>
            {' '}শুরু হোক
          </span>
          <span className="block">বাংলায়।</span>
        </h1>
      </div>

      {/* Sub headline with exact --hero-gap bottom spacing to CTA buttons */}
      <p
        className="text-base sm:text-lg text-[var(--color-muted,#5F564D)] leading-[1.8] font-normal relative z-10"
        style={{ marginBottom: 'var(--hero-gap)' }}
      >
        একটি করে ধারণা শিখুন, উদাহরণ বুঝুন, নিজের হাতে কোড লিখুন। শুরু থেকে ধাপে ধাপে Kotlin শেখার জন্য একটি সম্পূর্ণ বাংলা গাইড।
      </p>

      {/* CTA with exact --hero-gap bottom spacing to progress dashboard */}
      <div style={{ marginBottom: 'var(--hero-gap)' }}>
        <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 w-full">
          <button
            type="button"
            onClick={handlePrimary}
            className="w-full sm:flex-1 min-h-[48px] px-4 sm:px-3 py-3.5 font-semibold text-[14px] sm:text-[15px] whitespace-nowrap rounded-lg shadow-sm hover:bg-[#2C2926] hover:shadow-md active:translate-y-px focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-terracotta,#B85C3E)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--topbar-bg,#F4EFE6)] transition-all flex items-center justify-center gap-2 cursor-pointer"
            style={{
              backgroundColor: 'var(--color-ink, #1C1A18)',
              color: 'var(--color-paper, #F4EFE6)',
            }}
          >
            <span>{canContinue ? 'শেখা চালিয়ে যান' : 'শেখা শুরু করুন'}</span>
            <ArrowRight size={18} strokeWidth={1.75} className="shrink-0" />
          </button>
          <button
            type="button"
            onClick={handleViewRoadmap}
            className="w-full sm:flex-1 min-h-[48px] px-4 sm:px-3 py-3.5 font-semibold text-[14px] sm:text-[15px] whitespace-nowrap rounded-lg border border-[var(--color-border-subtle,#DCD2C3)] bg-transparent text-[var(--color-ink,#1C1A18)] hover:bg-[rgba(184,92,62,0.06)] hover:text-[var(--color-terracotta,#B85C3E)] hover:border-[rgba(184,92,62,0.35)] active:translate-y-px focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-terracotta,#B85C3E)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--topbar-bg,#F4EFE6)] transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <Map size={18} strokeWidth={1.75} className="shrink-0" />
            <span>রোডম্যাপ দেখুন</span>
          </button>
        </div>

        {/* Trust chips */}
        <div className="mt-4 flex flex-wrap justify-center gap-2">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border border-[var(--color-border-subtle,#DCD2C3)] bg-[var(--color-paper,#F4EFE6)] text-[11.5px] font-medium text-[var(--color-muted,#5F564D)]">
            <Check
              size={13}
              strokeWidth={2.4}
              className="text-[var(--color-terracotta,#B85C3E)]"
              aria-hidden="true"
            />
            ১০০% ফ্রি
          </span>
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border border-[var(--color-border-subtle,#DCD2C3)] bg-[var(--color-paper,#F4EFE6)] text-[11.5px] font-medium text-[var(--color-muted,#5F564D)]">
            <ShieldCheck
              size={13}
              strokeWidth={2.4}
              className="text-[var(--color-terracotta,#B85C3E)]"
              aria-hidden="true"
            />
            সাইন-আপ লাগবে না
          </span>
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border border-[var(--color-border-subtle,#DCD2C3)] bg-[var(--color-paper,#F4EFE6)] text-[11.5px] font-medium text-[var(--color-muted,#5F564D)]">
            <Languages
              size={13}
              strokeWidth={2.4}
              className="text-[var(--color-terracotta,#B85C3E)]"
              aria-hidden="true"
            />
            সম্পূর্ণ বাংলায়
          </span>
        </div>
      </div>
    </section>
  );
}
