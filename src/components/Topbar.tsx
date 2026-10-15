/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Menu, X } from 'lucide-react';
import type { CurrentRoute } from '../types';

interface TopbarProps {
  onHomeClick?: () => void;
  isHidden?: boolean;
  isMenuOpen?: boolean;
  onToggleMenu?: () => void;
  currentRoute?: CurrentRoute;
}

export default function Topbar({
  onHomeClick,
  isHidden = false,
  isMenuOpen = false,
  onToggleMenu,
}: TopbarProps) {
  return (
    <header
      className={`fixed top-0 left-0 right-0 h-14 border-b border-[var(--color-border-subtle,#DCD2C3)] bg-[var(--topbar-bg,#F4EFE6)] z-40 transition-transform duration-200 ease-out motion-reduce:transition-none ${
        isHidden ? '-translate-y-full' : 'translate-y-0'
      }`}
    >
      <div className="max-w-xl mx-auto px-5 sm:px-6 h-full flex items-center justify-between">
        {/* Brand: Logo + site name on the left */}
        <div
          className="flex items-center gap-2.5 cursor-pointer select-none"
          onClick={() => {
            if (onHomeClick) {
              onHomeClick();
            } else if (window.location.hash) {
              window.location.hash = '';
            }
          }}
        >
          {/* Kotlin geometric icon */}
          <svg
            className="w-5 h-5 shrink-0"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <polygon points="24,0 0,0 0,24 24,24 12,12" fill="var(--color-terracotta, #B85C3E)" />
          </svg>
          <span className="text-lg font-bold tracking-tight text-[var(--color-ink,#1C1A18)]">
            Kotlin শিখি
          </span>
        </div>

        {/* Hamburger menu / Close toggle on the right */}
        <button
          type="button"
          onClick={onToggleMenu}
          aria-expanded={isMenuOpen}
          aria-controls="menu-panel"
          aria-label={isMenuOpen ? 'মেনু বন্ধ করুন' : 'মেনু খুলুন'}
          className="min-h-[44px] min-w-[44px] flex items-center justify-center -mr-2 text-[var(--color-ink,#1C1A18)] hover:text-[var(--color-terracotta,#B85C3E)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-terracotta,#B85C3E)] rounded transition-colors cursor-pointer"
        >
          {isMenuOpen ? (
            <X className="w-5 h-5" strokeWidth={2} aria-hidden="true" />
          ) : (
            <Menu className="w-5 h-5" strokeWidth={2} aria-hidden="true" />
          )}
        </button>
      </div>
    </header>
  );
}
