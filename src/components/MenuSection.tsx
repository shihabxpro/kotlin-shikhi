/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import type { ReactNode } from 'react';

export interface MenuSectionProps {
  label?: string;
  icon?: ReactNode;
  actionLabel?: string;
  onAction?: () => void;
  children: ReactNode;
  className?: string;
}

export default function MenuSection({
  label,
  icon,
  actionLabel,
  onAction,
  children,
  className = '',
}: MenuSectionProps) {
  return (
    <div className={`px-2.5 pt-2 pb-3 ${className}`}>
      {label && (
        <div className="flex items-center justify-between px-1.5 mb-1.5">
          <div className="flex items-center gap-2">
            {icon && (
              <span className="text-[var(--color-muted-light,#8A7F72)]" aria-hidden="true">
                {icon}
              </span>
            )}
            <span className="text-[12px] font-semibold tracking-wide uppercase text-[var(--color-muted-light,#8A7F72)]">
              {label}
            </span>
          </div>
          {actionLabel && onAction && (
            <button
              type="button"
              onClick={onAction}
              className="text-[13px] font-medium text-[var(--color-terracotta,#B85C3E)] hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-terracotta,#B85C3E)] rounded px-1.5 py-1 cursor-pointer"
            >
              {actionLabel}
            </button>
          )}
        </div>
      )}
      <div className="space-y-1">{children}</div>
    </div>
  );
}
