/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  BookOpen,
  ChevronLeft,
  Code2,
  Languages,
  Zap,
  type LucideIcon,
} from 'lucide-react';
import SectionHeader from '../components/SectionHeader';
import { FEATURE_ITEMS } from '../data/modules';

interface AboutPageProps {
  onBack: () => void;
}

const FEATURE_ICONS: Record<string, LucideIcon> = {
  book: BookOpen,
  code: Code2,
  letter: Languages,
  bolt: Zap,
};

const TECH_STACK = ['React 19', 'TypeScript', 'Vite', 'Tailwind CSS'];

export default function About({ onBack }: AboutPageProps) {
  return (
    <section className="w-full">
      <button
        type="button"
        onClick={onBack}
        className="inline-flex items-center gap-1.5 -ml-1 mb-5 min-h-[36px] px-2 rounded-lg text-[14px] font-medium text-[var(--color-muted,#5F564D)] hover:text-[var(--color-terracotta,#B85C3E)] hover:bg-[rgba(184,92,62,0.06)] transition-colors cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-terracotta,#B85C3E)]"
      >
        <ChevronLeft size={17} strokeWidth={2.2} aria-hidden="true" />
        হোমে ফিরুন
      </button>

      <SectionHeader
        title="আমাদের সম্পর্কে"
        subtitle="বাংলায় শুরু থেকে ধাপে ধাপে Kotlin শেখার ইন্টারঅ্যাকটিভ প্ল্যাটফর্ম।"
        as="h1"
        className="mb-6"
      />

      <div className="space-y-5">
        <p className="text-[15px] leading-relaxed text-[var(--color-muted,#5F564D)] m-0">
          <strong className="text-[var(--color-ink,#1C1A18)]">Kotlin শিখি</strong> তে আমরা
          সহজ ভাষায়, বাস্তব উদাহরণ দিয়ে, একদম শূন্য থেকে Kotlin শেখাই। প্রতিটি লেসনে
          ব্যাখ্যা, কোড উদাহরণ, অনুশীলন ও কুইজ থাকায় ধারণা গুলো ধীরে ধীরে পাকা হয়।
        </p>

        <div>
          <h2 className="text-[16px] font-bold text-[var(--color-ink,#1C1A18)] m-0 mb-3">
            আমরা যা দিচ্ছি
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {FEATURE_ITEMS.map((feature) => {
              const Icon = FEATURE_ICONS[feature.iconType] ?? BookOpen;
              return (
                <div
                  key={feature.title}
                  className="flex items-start gap-3 rounded-2xl border border-[var(--color-border,#DED4C5)] bg-[var(--topbar-bg,#F4EFE6)] p-4"
                >
                  <span className="shrink-0 w-10 h-10 flex items-center justify-center rounded-full bg-[rgba(184,92,62,0.12)] text-[var(--color-terracotta,#B85C3E)]">
                    <Icon size={20} strokeWidth={1.8} aria-hidden="true" />
                  </span>
                  <div className="min-w-0">
                    <h3 className="text-[15px] font-bold text-[var(--color-ink,#1C1A18)] leading-snug m-0">
                      {feature.title}
                    </h3>
                    <p className="text-[13px] leading-relaxed text-[var(--color-muted,#5F564D)] mt-1 m-0">
                      {feature.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div>
          <h2 className="text-[16px] font-bold text-[var(--color-ink,#1C1A18)] m-0 mb-3">
            ব্যবহৃত প্রযুক্তি
          </h2>
          <div className="flex flex-wrap gap-2">
            {TECH_STACK.map((tech) => (
              <span
                key={tech}
                className="text-[13px] font-medium px-3 py-1.5 rounded-full border border-[var(--color-border,#DED4C5)] text-[var(--color-muted,#5F564D)]"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
