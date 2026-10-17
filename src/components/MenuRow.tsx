/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import type { CSSProperties, ReactNode } from 'react';

export interface MenuRowProps {
  icon: ReactNode;
  title: string;
  subtitle?: string;
  trailing?: ReactNode;
  active?: boolean;
  /** Render a left accent bar when active. */
  accent?: boolean;
  /** 0..1 — renders a thin progress bar along the bottom edge. */
  progress?: number;
  onClick?: () => void;
  style?: CSSProperties;
  className?: string;
  ariaLabel?: string;
  id?: string;
}

export default function MenuRow({
  icon,
  title,
  subtitle,
  trailing,
  active = false,
  accent = false,
  progress,
  onClick,
  style,
  className = '',
  ariaLabel,
  id,
}: MenuRowProps) {
  const interactive = Boolean(onClick);

  const classes = `group relative w-full min-h-[52px] pl-3 pr-2.5 py-2.5 flex items-center justify-between gap-3 rounded-xl text-left transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-terracotta,#B85C3E)] ${
    interactive ? 'cursor-pointer' : ''
  } ${
    active
      ? 'bg-[rgba(184,92,62,0.10)]'
      : interactive
      ? 'hover:bg-[rgba(184,92,62,0.06)] active:bg-[rgba(184,92,62,0.09)]'
      : ''
  } ${className}`;

  const content = (
    <>
      {accent && active && (
        <span
          className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-6 rounded-full bg-[var(--color-terracotta,#B85C3E)]"
          aria-hidden="true"
        />
      )}

      <span
        className={`shrink-0 w-9 h-9 flex items-center justify-center rounded-lg text-[13px] font-semibold tabular-nums transition-colors ${
          active
            ? 'bg-[var(--color-terracotta,#B85C3E)] text-[#F4EFE6]'
            : 'bg-[rgba(184,92,62,0.10)] text-[var(--color-terracotta,#B85C3E)] group-hover:bg-[rgba(184,92,62,0.14)]'
        }`}
      >
        {icon}
      </span>

      <span className="flex-1 min-w-0 flex flex-col">
        <span
          className={`text-[15px] leading-snug truncate transition-colors ${
            active
              ? 'text-[var(--color-terracotta,#B85C3E)] font-semibold'
              : 'text-[var(--color-ink,#1C1A18)] font-medium group-hover:text-[var(--color-terracotta,#B85C3E)]'
          }`}
        >
          {title}
        </span>
        {subtitle && (
          <span className="text-[12px] leading-snug truncate text-[var(--color-muted-light,#8A7F72)]">
            {subtitle}
          </span>
        )}
      </span>

      {trailing && <span className="flex items-center gap-2 shrink-0">{trailing}</span>}

      {typeof progress === 'number' && progress > 0 && (
        <span
          className="absolute bottom-[3px] left-12 right-3 h-[2px] rounded-full bg-[rgba(28,26,24,0.07)] overflow-hidden"
          aria-hidden="true"
        >
          <span
            className="block h-full rounded-full bg-[var(--color-terracotta,#B85C3E)] transition-[width] duration-500 ease-out"
            style={{ width: `${Math.round(Math.min(1, Math.max(0, progress)) * 100)}%` }}
          />
        </span>
      )}
    </>
  );

  if (interactive) {
    return (
      <button
        id={id}
        type="button"
        onClick={onClick}
        style={style}
        aria-label={ariaLabel}
        aria-current={active ? 'true' : undefined}
        className={classes}
      >
        {content}
      </button>
    );
  }

  return (
    <div id={id} style={style} className={classes}>
      {content}
    </div>
  );
}
