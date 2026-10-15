/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Home, List, ListOrdered, Type } from 'lucide-react';
import { useEffect, useState } from 'react';
import type { CurrentRoute, TextSize } from '../types';

interface MenuPanelProps {
  isOpen: boolean;
  onClose: () => void;
  currentRoute: CurrentRoute;
  onNavigateHome: () => void;
  onNavigateModules: () => void;
  onNavigateLessonList?: (moduleId: number) => void;
  textSize: TextSize;
  onTextSizeChange: (size: TextSize) => void;
}

export default function MenuPanel({
  isOpen,
  onClose,
  currentRoute,
  onNavigateHome,
  onNavigateModules,
  onNavigateLessonList,
  textSize,
  onTextSizeChange,
}: MenuPanelProps) {
  const [isMounted, setIsMounted] = useState(isOpen);
  const [animateIn, setAnimateIn] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setIsMounted(true);
      const frame = requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setAnimateIn(true);
        });
      });
      return () => cancelAnimationFrame(frame);
    } else {
      setAnimateIn(false);
      const timer = setTimeout(() => {
        setIsMounted(false);
      }, 240);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  if (!isMounted) {
    return null;
  }

  const prefersReduced =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const isHome = currentRoute.type === 'home';
  const isLesson = currentRoute.type === 'lesson';

  return (
    <>
      {/* Scrim below topbar */}
      <div
        className="fixed inset-0 top-14 z-20 bg-[rgba(28,26,24,0.35)] cursor-pointer"
        onClick={onClose}
        style={{
          opacity: animateIn ? 1 : 0,
          transition: prefersReduced
            ? 'none'
            : 'opacity 220ms cubic-bezier(0.22, 0.61, 0.36, 1)',
        }}
        aria-hidden="true"
      />

      {/* Menu Panel container: fixed right below topbar (top-14), slides down */}
      <div
        id="menu-panel"
        role="region"
        aria-label="মেনু প্যানেল"
        className="fixed top-14 left-0 right-0 z-30 pointer-events-none"
        style={{
          transform: animateIn ? 'translateY(0)' : 'translateY(-100%)',
          transition: prefersReduced
            ? 'none'
            : 'transform 220ms cubic-bezier(0.22, 0.61, 0.36, 1)',
        }}
      >
        <div
          className="max-w-xl mx-auto w-full bg-[var(--topbar-bg,#F4EFE6)] border-b border-[var(--color-border,#DED4C5)] pointer-events-auto"
          style={{ boxShadow: 'none' }}
        >
          {/* Core Row 1: হোম */}
          <button
            type="button"
            onClick={() => {
              onClose();
              if (isHome) {
                window.scrollTo({ top: 0, behavior: 'smooth' });
              } else {
                onNavigateHome();
              }
            }}
            className="w-full h-[52px] min-h-[44px] px-5 flex items-center justify-between text-left hover:bg-[rgba(184,92,62,0.05)] active:bg-[rgba(184,92,62,0.08)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-terracotta,#B85C3E)] transition-colors cursor-pointer"
          >
            <div className="flex items-center gap-3">
              <Home
                size={20}
                strokeWidth={1.8}
                className="shrink-0 text-[var(--color-terracotta,#B85C3E)]"
              />
              <span
                className={`text-[16px] leading-none ${
                  isHome
                    ? 'text-[var(--color-terracotta,#B85C3E)] font-semibold'
                    : 'text-[var(--color-ink,#1C1A18)] font-normal'
                }`}
              >
                হোম
              </span>
            </div>
          </button>

          {/* 1px divider between core rows */}
          <div className="h-[1px] bg-[#E6DDD0] w-full" aria-hidden="true" />

          {/* Core Row 2: মডিউলগুলো */}
          <button
            type="button"
            onClick={() => {
              onClose();
              onNavigateModules();
            }}
            className="w-full h-[52px] min-h-[44px] px-5 flex items-center justify-between text-left hover:bg-[rgba(184,92,62,0.05)] active:bg-[rgba(184,92,62,0.08)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-terracotta,#B85C3E)] transition-colors cursor-pointer"
          >
            <div className="flex items-center gap-3">
              <List
                size={20}
                strokeWidth={1.8}
                className="shrink-0 text-[var(--color-terracotta,#B85C3E)]"
              />
              <span className="text-[16px] text-[var(--color-ink,#1C1A18)] font-normal leading-none">
                মডিউলগুলো
              </span>
            </div>
          </button>

          {/* Lesson page specific rows */}
          {isLesson && (
            <>
              {/* 1px divider separating core rows from page-specific rows */}
              <div className="h-[1px] bg-[#DED4C5] w-full" aria-hidden="true" />

              {/* Row 3: লেসন তালিকা */}
              <button
                type="button"
                onClick={() => {
                  onClose();
                  if (onNavigateLessonList && currentRoute.type === 'lesson') {
                    onNavigateLessonList(currentRoute.moduleId);
                  }
                }}
                className="w-full h-[52px] min-h-[44px] px-5 flex items-center justify-between text-left hover:bg-[rgba(184,92,62,0.05)] active:bg-[rgba(184,92,62,0.08)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-terracotta,#B85C3E)] transition-colors cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <ListOrdered
                    size={20}
                    strokeWidth={1.8}
                    className="shrink-0 text-[var(--color-terracotta,#B85C3E)]"
                  />
                  <span className="text-[16px] text-[var(--color-ink,#1C1A18)] font-normal leading-none">
                    লেসন তালিকা
                  </span>
                </div>
              </button>

              {/* 1px divider between lesson page rows */}
              <div className="h-[1px] bg-[#E6DDD0] w-full" aria-hidden="true" />

              {/* Row 4: লেখার আকার */}
              <div className="w-full h-[52px] px-5 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Type
                    size={20}
                    strokeWidth={1.8}
                    className="shrink-0 text-[var(--color-terracotta,#B85C3E)]"
                  />
                  <span className="text-[16px] text-[var(--color-ink,#1C1A18)] font-normal leading-none">
                    লেখার আকার
                  </span>
                </div>

                {/* 3 size buttons */}
                <div
                  className="flex items-center gap-2"
                  role="group"
                  aria-label="লেখার আকার নির্ধারণ"
                >
                  <button
                    type="button"
                    onClick={() => onTextSizeChange('small')}
                    aria-label="ছোট লেখা"
                    aria-pressed={textSize === 'small'}
                    className={`min-w-[44px] min-h-[44px] flex items-center justify-center rounded transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-terracotta,#B85C3E)] cursor-pointer ${
                      textSize === 'small'
                        ? 'border-[1.5px] border-[var(--color-terracotta,#B85C3E)] text-[var(--color-terracotta,#B85C3E)] bg-[rgba(184,92,62,0.08)] font-semibold'
                        : 'border border-[var(--color-border,#DED4C5)] text-[var(--color-muted,#5F564D)] hover:border-[var(--color-ink,#1C1A18)]'
                    }`}
                  >
                    <span className="text-[14px] leading-none">ক</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => onTextSizeChange('medium')}
                    aria-label="মাঝারি লেখা"
                    aria-pressed={textSize === 'medium'}
                    className={`min-w-[44px] min-h-[44px] flex items-center justify-center rounded transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-terracotta,#B85C3E)] cursor-pointer ${
                      textSize === 'medium'
                        ? 'border-[1.5px] border-[var(--color-terracotta,#B85C3E)] text-[var(--color-terracotta,#B85C3E)] bg-[rgba(184,92,62,0.08)] font-semibold'
                        : 'border border-[var(--color-border,#DED4C5)] text-[var(--color-muted,#5F564D)] hover:border-[var(--color-ink,#1C1A18)]'
                    }`}
                  >
                    <span className="text-[17px] leading-none">ক</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => onTextSizeChange('large')}
                    aria-label="বড় লেখা"
                    aria-pressed={textSize === 'large'}
                    className={`min-w-[44px] min-h-[44px] flex items-center justify-center rounded transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-terracotta,#B85C3E)] cursor-pointer ${
                      textSize === 'large'
                        ? 'border-[1.5px] border-[var(--color-terracotta,#B85C3E)] text-[var(--color-terracotta,#B85C3E)] bg-[rgba(184,92,62,0.08)] font-semibold'
                        : 'border border-[var(--color-border,#DED4C5)] text-[var(--color-muted,#5F564D)] hover:border-[var(--color-ink,#1C1A18)]'
                    }`}
                  >
                    <span className="text-[20px] leading-none">ক</span>
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}
