/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  className?: string;
  as?: 'h1' | 'h2' | 'h3';
}

export default function SectionHeader({
  title,
  subtitle,
  className = '',
  as = 'h2',
}: SectionHeaderProps) {
  const HeadingTag = as;

  return (
    <div className={`flex flex-col gap-2 ${className}`}>
      <HeadingTag
        className="text-2xl sm:text-3xl font-bold text-[var(--color-ink,#1C1A18)] tracking-tight m-0 p-0"
        style={{ lineHeight: 1.3 }}
      >
        {title}
      </HeadingTag>
      {subtitle && (
        <p className="text-[14px] sm:text-[15px] text-[var(--color-muted,#5F564D)] m-0 p-0 leading-normal">
          {subtitle}
        </p>
      )}
    </div>
  );
}
