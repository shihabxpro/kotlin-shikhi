/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Sparkles } from 'lucide-react';
import profileImage from '../assets/profile.webp';
import SocialLinks from './SocialLinks';

interface AboutHeroProps {
  name: string;
  tagline: string;
  imageSrc?: string;
}

export default function AboutHero({
  name,
  tagline,
  imageSrc = profileImage,
}: AboutHeroProps) {
  return (
    <div className="relative overflow-hidden rounded-[28px] border border-[var(--color-border,#DED4C5)] bg-[var(--color-paper,#F4EFE6)] px-6 py-12 sm:py-16 text-center shadow-[0_24px_60px_-28px_rgba(28,26,24,0.40)]">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            'linear-gradient(180deg, rgba(184,92,62,0.07) 0%, rgba(43,91,132,0.05) 100%)',
        }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-24 -right-16 h-56 w-56 rounded-full blur-3xl"
        style={{
          background:
            'radial-gradient(circle, rgba(184,92,62,0.30), transparent 70%)',
        }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-28 -left-20 h-64 w-64 rounded-full blur-3xl"
        style={{
          background:
            'radial-gradient(circle, rgba(43,91,132,0.22), transparent 70%)',
        }}
      />
      <div
        aria-hidden="true"
        className="paper-dot-pattern pointer-events-none absolute inset-0 opacity-40"
      />

      <div className="relative flex flex-col items-center">
        <span className="inline-flex items-center gap-1.5 rounded-full border border-[var(--color-border-subtle,#DCD2C3)] bg-[rgba(244,239,230,0.7)] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-[var(--color-terracotta,#B85C3E)] backdrop-blur-sm">
          <Sparkles size={13} strokeWidth={2.2} aria-hidden="true" />
          Kotlin শিক্ষা • বাংলায়
        </span>

        <div className="relative mt-6 h-28 w-28 sm:h-36 sm:w-36">
          <span
            aria-hidden="true"
            className="absolute -inset-4 rounded-full opacity-60 blur-2xl"
            style={{
              background:
                'radial-gradient(circle, rgba(184,92,62,0.45), transparent 70%)',
            }}
          />
          <span
            aria-hidden="true"
            className="absolute inset-0 rounded-full animate-[spin_9s_linear_infinite] motion-reduce:animate-none"
            style={{
              background:
                'conic-gradient(from 0deg, #B85C3E, #2B5B84, #2D6A4F, #B85C3E)',
            }}
          />
          <span
            aria-hidden="true"
            className="absolute inset-[3px] rounded-full bg-[var(--color-paper,#F4EFE6)]"
          />
          <img
            src={imageSrc}
            alt={name}
            width={144}
            height={144}
            loading="eager"
            decoding="async"
            className="absolute inset-[5px] h-[calc(100%-10px)] w-[calc(100%-10px)] rounded-full object-cover"
          />
          <span
            aria-hidden="true"
            className="absolute bottom-1 right-1 h-5 w-5 rounded-full border-[3px] border-[var(--color-paper,#F4EFE6)]"
            style={{ backgroundColor: '#22C55E' }}
          />
        </div>

        <h1
          className="mt-6 text-4xl sm:text-5xl font-bold tracking-tight text-[var(--color-ink,#1C1A18)] m-0"
          style={{ fontFamily: 'var(--font-heading)', lineHeight: 1.25 }}
        >
          {name}
        </h1>

        <span className="mt-3 inline-flex items-center rounded-full border border-[var(--color-border,#DED4C5)] bg-[var(--color-paper,#F4EFE6)] px-3.5 py-1.5 text-[13px] font-medium text-[var(--color-muted,#5F564D)] sm:text-[14px]">
          {tagline}
        </span>

        <div className="mt-6">
          <SocialLinks />
        </div>
      </div>
    </div>
  );
}
