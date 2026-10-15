/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { ArrowRight, Map } from 'lucide-react';

interface HeroProps {
  onStartLearning?: () => void;
  onViewRoadmap?: () => void;
}

export default function Hero({ onStartLearning, onViewRoadmap }: HeroProps = {}) {
  const handleStartLearning = () => {
    if (onStartLearning) {
      onStartLearning();
    } else {
      window.location.hash = '#/module/1/lesson/1';
      window.dispatchEvent(new PopStateEvent('popstate', { state: window.history.state }));
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
          className="inline-block text-xs font-semibold tracking-wider px-3.5 py-1 rounded-full"
          style={{
            color: 'var(--color-terracotta, #B85C3E)',
            border: '1px solid var(--color-border-subtle, #DCD2C3)',
            backgroundColor: 'var(--topbar-bg, #F4EFE6)',
          }}
        >
          KOTLIN • বাংলা টিউটোরিয়াল
        </span>
      </div>

      {/* Headline with 'গল্পটা' in terracotta + hand-drawn wavy underline */}
      <h1
        className="text-3xl sm:text-5xl text-[var(--color-ink,#1C1A18)] mb-5 relative z-10"
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
              className="absolute left-0 -bottom-1 w-full h-2.5 overflow-visible pointer-events-none"
              style={{ color: 'var(--color-terracotta, #B85C3E)' }}
              viewBox="0 0 100 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              preserveAspectRatio="none"
              aria-hidden="true"
            >
              <path
                d="M2 7 C 22 1.5, 42 11, 64 6 C 78 2.5, 89 8.5, 98 5"
                stroke="currentColor"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
          {' '}শুরু হোক
        </span>
        <span className="block">বাংলায়।</span>
      </h1>

      {/* Sub headline with exact --hero-gap bottom spacing to CTA buttons */}
      <p
        className="text-base sm:text-lg text-[var(--color-muted,#5F564D)] leading-[1.8] font-normal"
        style={{ marginBottom: 'var(--hero-gap)' }}
      >
        একটি করে ধারণা শিখুন, উদাহরণ বুঝুন, নিজের হাতে কোড লিখুন। শুরু থেকে ধাপে ধাপে Kotlin শেখার জন্য একটি সম্পূর্ণ বাংলা গাইড।
      </p>

      {/* CTA buttons with exact --hero-gap bottom spacing to stats strip */}
      <div
        className="flex flex-row items-center gap-3 w-full"
        style={{ marginBottom: 'var(--hero-gap)' }}
      >
        <button
          type="button"
          onClick={handleStartLearning}
          className="flex-1 px-2.5 sm:px-3 py-3.5 font-semibold text-[14px] sm:text-[15px] whitespace-nowrap rounded hover:bg-[#2C2926] active:translate-y-px focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-terracotta,#B85C3E)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--topbar-bg,#F4EFE6)] transition-transform flex items-center justify-center gap-2 cursor-pointer"
          style={{
            backgroundColor: 'var(--color-ink, #1C1A18)',
            color: 'var(--color-paper, #F4EFE6)',
          }}
        >
          <span>শেখা শুরু করুন</span>
          <ArrowRight size={18} strokeWidth={1.75} className="shrink-0" />
        </button>
        <button
          type="button"
          onClick={handleViewRoadmap}
          className="flex-1 px-2.5 sm:px-3 py-3.5 font-semibold text-[14px] sm:text-[15px] whitespace-nowrap rounded hover:bg-[#1C1A18]/5 active:translate-y-px focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-terracotta,#B85C3E)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--topbar-bg,#F4EFE6)] transition-transform flex items-center justify-center gap-2 cursor-pointer"
          style={{
            border: '1px solid var(--color-ink, #1C1A18)',
            color: 'var(--color-ink, #1C1A18)',
          }}
        >
          <Map size={18} strokeWidth={1.75} className="shrink-0" />
          <span>রোডম্যাপ দেখুন</span>
        </button>
      </div>
    </section>
  );
}
