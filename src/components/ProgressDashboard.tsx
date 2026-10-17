/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { ArrowRight } from 'lucide-react';
import { LESSONS_REGISTRY } from '../content/lessons';
import { toBengaliDigits } from '../data/modules';
import { useReadProgress } from '../hooks/useReadProgress';
import { getLastLesson } from '../utils/progress';

interface ProgressDashboardProps {
  onOpenLesson: (moduleId: number, lessonId: number) => void;
}

const RING_RADIUS = 33;
const RING_CIRCUMFERENCE = 2 * Math.PI * RING_RADIUS;

export default function ProgressDashboard({ onOpenLesson }: ProgressDashboardProps) {
  const read = useReadProgress();
  const allKeys = Object.keys(LESSONS_REGISTRY);
  const total = allKeys.length;
  const done = allKeys.filter((key) => read.has(key)).length;
  const percent = total > 0 ? Math.round((done / total) * 100) : 0;

  const last = getLastLesson();
  const hasLastContent = last
    ? Boolean(LESSONS_REGISTRY[`${last.moduleId}-${last.lessonId}`])
    : false;

  const handleContinue = () => {
    if (last && hasLastContent) {
      onOpenLesson(last.moduleId, last.lessonId);
    } else {
      onOpenLesson(1, 1);
    }
  };

  return (
    <section
      className="rounded-2xl border border-[var(--color-border,#DED4C5)] p-4 sm:p-5"
      style={{
        marginBottom: 'var(--hero-gap)',
        background:
          'linear-gradient(180deg, rgba(184,92,62,0.06) 0%, rgba(184,92,62,0.02) 100%)',
      }}
      aria-label="আপনার অগ্রগতি"
    >
      <div className="flex items-center gap-4 sm:gap-5">
        {/* Progress ring */}
        <div className="relative shrink-0 w-[74px] h-[74px]">
          <svg viewBox="0 0 74 74" className="w-full h-full -rotate-90" aria-hidden="true">
            <circle
              cx="37"
              cy="37"
              r={RING_RADIUS}
              fill="none"
              stroke="rgba(28,26,24,0.08)"
              strokeWidth="6"
            />
            <circle
              cx="37"
              cy="37"
              r={RING_RADIUS}
              fill="none"
              stroke="var(--color-terracotta,#B85C3E)"
              strokeWidth="6"
              strokeLinecap="round"
              strokeDasharray={RING_CIRCUMFERENCE}
              strokeDashoffset={RING_CIRCUMFERENCE * (1 - percent / 100)}
              style={{ transition: 'stroke-dashoffset 600ms cubic-bezier(0.22, 1, 0.36, 1)' }}
            />
          </svg>
          <span className="absolute inset-0 flex items-center justify-center text-[17px] font-bold text-[var(--color-ink,#1C1A18)] tabular-nums">
            {`${toBengaliDigits(percent)}%`}
          </span>
        </div>

        {/* Text + bar */}
        <div className="flex-1 min-w-0">
          <h2 className="text-[16px] font-bold text-[var(--color-ink,#1C1A18)] leading-tight m-0">
            আপনার অগ্রগতি
          </h2>
          <p className="text-[13px] text-[var(--color-muted,#5F564D)] mt-1 leading-snug">
            {done === 0
              ? 'এখনো শুরু করা হয়নি — আজই শুরু করুন।'
              : `${toBengaliDigits(done)}টি লেসন সম্পন্ন • মোট ${toBengaliDigits(total)}টি`}
          </p>
          <div className="mt-3 h-[6px] rounded-full bg-[rgba(28,26,24,0.08)] overflow-hidden">
            <div
              className="h-full rounded-full bg-[var(--color-terracotta,#B85C3E)]"
              style={{
                width: `${percent}%`,
                transition: 'width 600ms cubic-bezier(0.22, 1, 0.36, 1)',
              }}
            />
          </div>
        </div>
      </div>

      <button
        type="button"
        onClick={handleContinue}
        className="mt-4 w-full min-h-[46px] flex items-center justify-center gap-2 rounded-xl bg-[var(--color-terracotta,#B85C3E)] text-[#F4EFE6] text-[15px] font-semibold transition-[filter] hover:brightness-105 active:brightness-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--topbar-bg,#F4EFE6)] focus-visible:ring-[var(--color-terracotta,#B85C3E)] cursor-pointer"
      >
        {done === 0 ? 'শেখা শুরু করুন' : 'যেখানে ছেড়েছিলেন, চালিয়ে যান'}
        <ArrowRight size={17} strokeWidth={2.2} aria-hidden="true" />
      </button>
    </section>
  );
}
