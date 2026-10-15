/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect, useRef, useState } from 'react';
import { GroupedListItem } from '../types';

interface GroupedListProps {
  items: GroupedListItem[];
  className?: string;
}

export default function GroupedList({ items, className = '' }: GroupedListProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [hasEntered, setHasEntered] = useState(false);

  useEffect(() => {
    const node = containerRef.current;
    if (!node || hasEntered) return;

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) {
      setHasEntered(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting) {
          setHasEntered(true);
          observer.disconnect();
        }
      },
      { threshold: 0.08, rootMargin: '0px 0px -40px 0px' }
    );

    observer.observe(node);

    return () => {
      observer.disconnect();
    };
  }, [hasEntered]);

  const prefersReduced =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  return (
    <div
      ref={containerRef}
      className={`w-full divide-y divide-[var(--color-divider,#E6DDD0)] overflow-hidden ${className}`}
      style={{
        border: '1px solid var(--color-border, #DED4C5)',
        borderRadius: '16px',
        backgroundColor: 'var(--topbar-bg, #F4EFE6)',
        boxShadow: 'none',
      }}
    >
      {items.map((item, index) => {
        const isClickable = Boolean(item.isClickable);

        const itemStyle: React.CSSProperties = prefersReduced
          ? {}
          : {
              opacity: hasEntered ? 1 : 0,
              transform: hasEntered ? 'translateY(0)' : 'translateY(10px)',
              transition: hasEntered
                ? `opacity 320ms cubic-bezier(0.16, 1, 0.3, 1) ${index * 45}ms, transform 320ms cubic-bezier(0.16, 1, 0.3, 1) ${index * 45}ms, background-color 150ms ease`
                : 'none',
              willChange: hasEntered ? 'auto' : 'opacity, transform',
            };

        return (
          <div
            key={item.id}
            onClick={isClickable ? item.onClick : undefined}
            style={itemStyle}
            className={`flex items-center justify-between gap-3 px-4 py-[14px] min-h-[56px] transition-colors ${
              isClickable
                ? 'cursor-pointer active:bg-[rgba(184,92,62,0.05)] group'
                : 'cursor-default'
            }`}
          >
            {/* Vertically centered number circle + text block */}
            <div className="flex items-center gap-[14px] flex-1 min-w-0">
              {/* Number circle: 32px, font-size 13px, font-weight 600, background rgba(184,92,62,0.07) */}
              <div
                className="shrink-0 flex items-center justify-center font-semibold text-[var(--color-terracotta,#B85C3E)]"
                style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '50%',
                  backgroundColor: 'rgba(184, 92, 62, 0.07)',
                  fontSize: '13px',
                  lineHeight: 1,
                }}
              >
                <span className="tabular-nums relative -top-[1.5px] inline-block leading-none">
                  {item.number}
                </span>
              </div>

              <div className="flex-1 min-w-0">
                <h3
                  className={`font-semibold text-[16px] text-[var(--color-ink,#1C1A18)] leading-snug transition-colors truncate ${
                    isClickable ? 'group-hover:text-[var(--color-terracotta,#B85C3E)]' : ''
                  }`}
                >
                  {item.title}
                </h3>
                {item.description && (
                  <p className="text-[14px] text-[var(--color-muted,#5F564D)] leading-normal truncate mt-0.5">
                    {item.description}
                  </p>
                )}
                {item.metaText && (
                  <span className="inline-block text-[13px] text-[var(--color-muted-light,#8A7F72)] mt-0.5">
                    {item.metaText}
                  </span>
                )}
              </div>
            </div>

            {/* Right side: lesson badge pill + chevron */}
            <div className="flex items-center gap-2.5 shrink-0">
              {item.badgeText && (
                <span
                  className="text-[12px] font-normal whitespace-nowrap"
                  style={{
                    padding: '3px 10px',
                    borderRadius: '999px',
                    border: '1px solid #DED4C5',
                    color: '#6F6458',
                    backgroundColor: 'transparent',
                  }}
                >
                  {item.badgeText}
                </span>
              )}

              {/* Chevron */}
              <svg
                className={`w-4 h-4 shrink-0 transition-colors ${
                  isClickable ? 'group-hover:text-[var(--color-terracotta,#B85C3E)]' : ''
                }`}
                style={{ color: 'var(--color-muted-chevron, #A39888)' }}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.75"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </div>
          </div>
        );
      })}
    </div>
  );
}
