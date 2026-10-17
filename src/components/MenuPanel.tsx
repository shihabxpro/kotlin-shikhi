/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  BookOpen,
  Check,
  ChevronDown,
  ChevronRight,
  Home,
  Info,
  Layers,
  Type,
  X,
} from 'lucide-react';
import type { CSSProperties, ReactNode } from 'react';
import { useEffect, useMemo, useRef, useState } from 'react';
import { getLessonContent } from '../content/lessons';
import { MODULES_DATA, getModuleLessonTotal, toBengaliDigits } from '../data/modules';
import type { CurrentRoute, TextSize } from '../types';
import { countReadLessons } from '../utils/progress';
import MenuRow from './MenuRow';
import MenuSection from './MenuSection';

interface MenuPanelProps {
  isOpen: boolean;
  onClose: () => void;
  currentRoute: CurrentRoute;
  onNavigateHome: () => void;
  onNavigateModule?: (moduleId: number) => void;
  onNavigateLesson?: (moduleId: number, lessonId: number) => void;
  onNavigateAbout: () => void;
  textSize: TextSize;
  onTextSizeChange: (size: TextSize) => void;
  readLessons?: Set<string>;
}

type SectionKey = 'modules' | 'lessons' | null;

const FOCUSABLE_SELECTOR =
  'a[href], button:not([disabled]), input:not([disabled]), textarea:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])';

const TEXT_SIZE_OPTIONS: { value: TextSize; label: string; glyphSize: number }[] = [
  { value: 'small', label: 'ছোট', glyphSize: 12 },
  { value: 'medium', label: 'মাঝারি', glyphSize: 17 },
  { value: 'large', label: 'বড়', glyphSize: 22 },
];

interface DisclosureHeaderProps {
  icon: ReactNode;
  label: string;
  open: boolean;
  onClick: () => void;
  style?: CSSProperties;
}

function DisclosureHeader({ icon, label, open, onClick, style }: DisclosureHeaderProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-expanded={open}
      style={style}
      className="w-full min-h-[52px] pl-3 pr-2.5 py-2.5 flex items-center gap-3 rounded-xl text-left transition-colors hover:bg-[rgba(184,92,62,0.06)] active:bg-[rgba(184,92,62,0.09)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-terracotta,#B85C3E)] cursor-pointer"
    >
      <span className="shrink-0 w-9 h-9 flex items-center justify-center rounded-lg bg-[rgba(184,92,62,0.10)] text-[var(--color-terracotta,#B85C3E)]">
        {icon}
      </span>
      <span className="flex-1 text-[15px] font-medium text-[var(--color-ink,#1C1A18)]">
        {label}
      </span>
      <ChevronDown
        size={18}
        strokeWidth={2}
        className={`shrink-0 text-[var(--color-muted-chevron,#A39888)] transition-transform duration-200 ${
          open ? 'rotate-180' : ''
        }`}
        aria-hidden="true"
      />
    </button>
  );
}

export default function MenuPanel({
  isOpen,
  onClose,
  currentRoute,
  onNavigateHome,
  onNavigateModule,
  onNavigateLesson,
  onNavigateAbout,
  textSize,
  onTextSizeChange,
  readLessons,
}: MenuPanelProps) {
  const [isMounted, setIsMounted] = useState(isOpen);
  const [animateIn, setAnimateIn] = useState(false);
  const [openSection, setOpenSection] = useState<SectionKey>(null);

  const panelRef = useRef<HTMLElement>(null);
  const swipeStartXRef = useRef<number | null>(null);
  const swipeDeltaRef = useRef(0);

  // Mount/unmount + slide-in animation
  useEffect(() => {
    if (isOpen) {
      setIsMounted(true);
      const frame = requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setAnimateIn(true);
        });
      });
      return () => cancelAnimationFrame(frame);
    }
    setAnimateIn(false);
    const timer = setTimeout(() => {
      setIsMounted(false);
    }, 260);
    return () => clearTimeout(timer);
  }, [isOpen]);

  // Auto-open the relevant section when the drawer opens
  useEffect(() => {
    if (!isOpen) return;
    if (currentRoute.type === 'lesson') setOpenSection('lessons');
    else if (currentRoute.type === 'module') setOpenSection('modules');
    else setOpenSection(null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

  // Lock background scroll while open
  useEffect(() => {
    if (!isOpen) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = previous;
    };
  }, [isOpen]);

  // Focus management, focus trap, roving keyboard navigation
  useEffect(() => {
    if (!isOpen || !isMounted) return;
    const panel = panelRef.current;
    if (!panel) return;

    const previouslyFocused = document.activeElement as HTMLElement | null;
    panel.focus({ preventScroll: true });

    const getFocusable = () =>
      Array.from(panel.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR)).filter(
        (el) => el.getClientRects().length > 0
      );

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        onClose();
        return;
      }

      const active = document.activeElement;
      const isTyping =
        active instanceof HTMLInputElement || active instanceof HTMLTextAreaElement;

      if (event.key === 'Tab') {
        const items = getFocusable();
        if (items.length === 0) {
          event.preventDefault();
          return;
        }
        const first = items[0];
        const last = items[items.length - 1];
        if (event.shiftKey) {
          if (active === first || active === panel) {
            event.preventDefault();
            last.focus();
          }
        } else if (active === last) {
          event.preventDefault();
          first.focus();
        }
        return;
      }

      if (isTyping) return;
      if (
        event.key !== 'ArrowDown' &&
        event.key !== 'ArrowUp' &&
        event.key !== 'Home' &&
        event.key !== 'End'
      ) {
        return;
      }

      const items = getFocusable();
      if (items.length === 0) return;
      const index = items.indexOf(active as HTMLElement);
      let next = index;

      if (event.key === 'ArrowDown') next = index < 0 ? 0 : (index + 1) % items.length;
      else if (event.key === 'ArrowUp') next = index <= 0 ? items.length - 1 : index - 1;
      else if (event.key === 'Home') next = 0;
      else next = items.length - 1;

      event.preventDefault();
      items[next]?.focus();
    };

    panel.addEventListener('keydown', handleKeyDown);
    return () => {
      panel.removeEventListener('keydown', handleKeyDown);
      previouslyFocused?.focus?.();
    };
  }, [isOpen, isMounted, onClose]);

  const prefersReduced =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const isHome = currentRoute.type === 'home';
  const isAbout = currentRoute.type === 'about';
  const isLesson = currentRoute.type === 'lesson';

  const reveal = (index: number, base = 60): CSSProperties =>
    prefersReduced
      ? {}
      : {
          opacity: animateIn ? 1 : 0,
          transform: animateIn ? 'translateX(0)' : 'translateX(16px)',
          transition: `opacity 300ms cubic-bezier(0.22, 1, 0.36, 1) ${
            base + index * 35
          }ms, transform 320ms cubic-bezier(0.22, 1, 0.36, 1) ${
            base + index * 35
          }ms`,
        };

  const lessonItems = useMemo(() => {
    const items: {
      moduleId: number;
      lessonId: number;
      title: string;
      moduleTitle: string;
    }[] = [];
    for (const module of MODULES_DATA) {
      if (!module.lessonTitles) continue;
      module.lessonTitles.forEach((title, index) => {
        if (getLessonContent(module.id, index + 1)) {
          items.push({
            moduleId: module.id,
            lessonId: index + 1,
            title,
            moduleTitle: module.title,
          });
        }
      });
    }
    return items;
  }, []);

  // ---- Swipe (drag right) to close ----
  const handleTouchStart = (event: React.TouchEvent<HTMLElement>) => {
    swipeStartXRef.current = event.touches[0].clientX;
    swipeDeltaRef.current = 0;
  };

  const handleTouchMove = (event: React.TouchEvent<HTMLElement>) => {
    if (swipeStartXRef.current === null) return;
    const delta = event.touches[0].clientX - swipeStartXRef.current;
    if (delta <= 0) return;
    swipeDeltaRef.current = delta;
    const panel = panelRef.current;
    if (panel) panel.style.transform = `translateX(${delta}px)`;
  };

  const handleTouchEnd = () => {
    if (swipeStartXRef.current === null) return;
    swipeStartXRef.current = null;
    const panel = panelRef.current;
    const delta = swipeDeltaRef.current;
    swipeDeltaRef.current = 0;
    if (!panel) return;
    if (delta > 90) {
      panel.style.transform = '';
      onClose();
      return;
    }
    if (delta > 0) {
      panel.style.transition = 'transform 220ms cubic-bezier(0.22, 1, 0.36, 1)';
      panel.style.transform = '';
      window.setTimeout(() => {
        if (panel) panel.style.transition = '';
      }, 240);
    }
  };

  if (!isMounted) {
    return null;
  }

  return (
    <>
      {/* Scrim */}
      <div
        className="fixed inset-0 z-50 bg-[rgba(28,26,24,0.42)] backdrop-blur-[2px] cursor-pointer"
        onClick={onClose}
        style={{
          opacity: animateIn ? 1 : 0,
          transition: prefersReduced
            ? 'none'
            : 'opacity 240ms cubic-bezier(0.22, 1, 0.36, 1)',
        }}
        aria-hidden="true"
      />

      {/* Side drawer */}
      <aside
        id="menu-panel"
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-label="মেনু"
        tabIndex={-1}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        className="fixed top-0 right-0 z-50 h-full w-[86vw] max-w-[330px] flex flex-col bg-[var(--topbar-bg,#F4EFE6)] border-l border-[var(--color-border,#DED4C5)] shadow-2xl focus:outline-none"
        style={{
          transform: animateIn ? 'translateX(0)' : 'translateX(100%)',
          transition: prefersReduced
            ? 'none'
            : 'transform 300ms cubic-bezier(0.22, 1, 0.36, 1)',
        }}
      >
        {/* Drawer header */}
        <div className="flex items-center justify-between h-14 px-4 border-b border-[var(--color-border-subtle,#DCD2C3)] shrink-0">
          <div className="flex items-center gap-2.5">
            <svg
              className="w-5 h-5 shrink-0"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <polygon points="24,0 0,0 0,24 24,24 12,12" fill="var(--color-terracotta, #B85C3E)" />
            </svg>
            <span className="text-[16px] font-bold tracking-tight text-[var(--color-ink,#1C1A18)]">
              Kotlin শিখি
            </span>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="মেনু বন্ধ করুন"
            className="w-10 h-10 -mr-1.5 flex items-center justify-center rounded-lg text-[var(--color-ink,#1C1A18)] hover:text-[var(--color-terracotta,#B85C3E)] hover:bg-[rgba(184,92,62,0.08)] transition-colors cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-terracotta,#B85C3E)]"
          >
            <X size={20} strokeWidth={2} aria-hidden="true" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto overscroll-contain px-2.5 py-2">
          <MenuSection>
            <MenuRow
              icon={<Home size={18} strokeWidth={1.9} aria-hidden="true" />}
              title="হোম"
              active={isHome}
              onClick={() => {
                onClose();
                onNavigateHome();
              }}
              trailing={
                isHome ? (
                  <Check
                    size={16}
                    strokeWidth={2.4}
                    className="text-[var(--color-terracotta,#B85C3E)]"
                    aria-hidden="true"
                  />
                ) : undefined
              }
              style={reveal(0)}
            />

            <DisclosureHeader
              icon={<Layers size={18} strokeWidth={1.9} aria-hidden="true" />}
              label="মডিউল"
              open={openSection === 'modules'}
              onClick={() =>
                setOpenSection((prev) => (prev === 'modules' ? null : 'modules'))
              }
              style={reveal(1)}
            />
            {openSection === 'modules' && (
              <div className="pl-3 space-y-1">
                {MODULES_DATA.map((module, index) => {
                  const isActive =
                    (currentRoute.type === 'module' || currentRoute.type === 'lesson') &&
                    currentRoute.moduleId === module.id;
                  const total = getModuleLessonTotal(module);
                  const readCount = readLessons
                    ? countReadLessons(readLessons, module.id, total)
                    : 0;
                  const isComplete = total > 0 && readCount >= total;
                  const progress = total > 0 ? readCount / total : 0;

                  return (
                    <MenuRow
                      key={module.id}
                      icon={module.number}
                      title={module.title}
                      active={isActive}
                      accent
                      progress={progress}
                      onClick={() => {
                        onClose();
                        onNavigateModule?.(module.id);
                      }}
                      style={reveal(index, 20)}
                      trailing={
                        isComplete ? (
                          <Check
                            size={16}
                            strokeWidth={2.4}
                            className="text-[var(--color-terracotta,#B85C3E)]"
                            aria-hidden="true"
                          />
                        ) : (
                          <span className="text-[11px] font-medium whitespace-nowrap px-2 py-0.5 rounded-full bg-[rgba(28,26,24,0.05)] text-[var(--color-muted-light,#8A7F72)]">
                            {`${toBengaliDigits(readCount)}/${toBengaliDigits(total)}`}
                          </span>
                        )
                      }
                    />
                  );
                })}
              </div>
            )}

            <DisclosureHeader
              icon={<BookOpen size={18} strokeWidth={1.9} aria-hidden="true" />}
              label="লেসন"
              open={openSection === 'lessons'}
              onClick={() =>
                setOpenSection((prev) => (prev === 'lessons' ? null : 'lessons'))
              }
              style={reveal(2)}
            />
            {openSection === 'lessons' && (
              <div className="pl-3 space-y-1">
                {lessonItems.map((lesson, index) => {
                  const isActive =
                    isLesson &&
                    currentRoute.moduleId === lesson.moduleId &&
                    currentRoute.lessonId === lesson.lessonId;
                  return (
                    <MenuRow
                      key={`${lesson.moduleId}-${lesson.lessonId}`}
                      icon={<BookOpen size={17} strokeWidth={1.9} aria-hidden="true" />}
                      title={lesson.title}
                      subtitle={lesson.moduleTitle}
                      active={isActive}
                      onClick={() => {
                        onClose();
                        onNavigateLesson?.(lesson.moduleId, lesson.lessonId);
                      }}
                      style={reveal(index, 20)}
                      trailing={
                        <ChevronRight
                          size={16}
                          strokeWidth={2}
                          className="text-[var(--color-muted-chevron,#A39888)]"
                          aria-hidden="true"
                        />
                      }
                    />
                  );
                })}
              </div>
            )}

            <MenuRow
              icon={<Info size={18} strokeWidth={1.9} aria-hidden="true" />}
              title="আমাদের সম্পর্কে"
              active={isAbout}
              onClick={() => {
                onClose();
                onNavigateAbout();
              }}
              style={reveal(3)}
              trailing={
                <ChevronRight
                  size={16}
                  strokeWidth={2}
                  className="text-[var(--color-muted-chevron,#A39888)]"
                  aria-hidden="true"
                />
              }
            />
          </MenuSection>
        </nav>

        {/* Text size — only on lesson pages */}
        {isLesson && (
          <div
            className="shrink-0 border-t border-[var(--color-border-subtle,#DCD2C3)] px-2.5 py-3"
            style={reveal(4, 40)}
          >
            <div className="flex items-center gap-3.5 mb-2.5 px-1">
              <span className="w-9 h-9 flex items-center justify-center rounded-lg bg-[rgba(184,92,62,0.10)] text-[var(--color-terracotta,#B85C3E)]">
                <Type size={18} strokeWidth={1.9} aria-hidden="true" />
              </span>
              <span className="text-[15px] text-[var(--color-ink,#1C1A18)] font-medium leading-none">
                লেখার আকার
              </span>
            </div>

            <div
              className="grid grid-cols-3 gap-1 p-1 rounded-xl bg-[rgba(28,26,24,0.05)]"
              role="group"
              aria-label="লেখার আকার নির্ধারণ"
            >
              {TEXT_SIZE_OPTIONS.map((option) => {
                const selected = textSize === option.value;
                return (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() => onTextSizeChange(option.value)}
                    aria-pressed={selected}
                    className={`min-h-[48px] flex flex-col items-center justify-center gap-1 rounded-lg font-medium transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-terracotta,#B85C3E)] cursor-pointer ${
                      selected
                        ? 'bg-[var(--color-terracotta,#B85C3E)] text-[#F4EFE6] shadow-sm'
                        : 'text-[var(--color-muted,#5F564D)] hover:bg-[rgba(28,26,24,0.06)]'
                    }`}
                  >
                    <span
                      className="leading-none"
                      style={{ fontSize: option.glyphSize }}
                      aria-hidden="true"
                    >
                      ক
                    </span>
                    <span className="text-[11px] leading-none">{option.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </aside>
    </>
  );
}
