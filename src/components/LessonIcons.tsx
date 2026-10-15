/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type LessonHeadingIconType = 'phone' | 'server' | 'devices';

interface LessonIconProps {
  name: LessonHeadingIconType;
  className?: string;
}

export function PhoneIcon({ className }: { className?: string }) {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#B85C3E"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <rect x="5" y="2" width="14" height="20" rx="3" />
      <line x1="10" y1="18" x2="14" y2="18" />
    </svg>
  );
}

export function ServerIcon({ className }: { className?: string }) {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#B85C3E"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <rect x="3" y="4" width="18" height="6" rx="2" />
      <line x1="17" y1="7" x2="17.01" y2="7" />
      <rect x="3" y="14" width="18" height="6" rx="2" />
      <line x1="17" y1="17" x2="17.01" y2="17" />
    </svg>
  );
}

export function DevicesIcon({ className }: { className?: string }) {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#B85C3E"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      {/* Laptop / monitor outline */}
      <path d="M13 14H3a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v4" />
      <path d="M1 14h11" />
      {/* Small phone outline overlapping bottom-right corner */}
      <rect x="14" y="9" width="7" height="12" rx="1.5" />
      <line x1="17" y1="18" x2="18" y2="18" />
    </svg>
  );
}

export default function LessonIcon({ name, className }: LessonIconProps) {
  switch (name) {
    case 'phone':
      return <PhoneIcon className={className} />;
    case 'server':
      return <ServerIcon className={className} />;
    case 'devices':
      return <DevicesIcon className={className} />;
    default:
      return null;
  }
}
