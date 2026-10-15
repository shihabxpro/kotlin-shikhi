/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

interface CodeBlockProps {
  className?: string;
}

export default function CodeBlock({ className = '' }: CodeBlockProps) {
  return (
    <div
      className={`hidden min-[340px]:block absolute pointer-events-none select-none z-0 ${className}`}
      style={{
        transform: 'rotate(45deg)',
        transformOrigin: 'center',
        opacity: 0.65,
        fontSize: '13px',
        lineHeight: 1.55,
        fontFamily: 'var(--font-mono)',
      }}
    >
      <div className="font-mono">
        <div className="whitespace-nowrap">
          <span style={{ color: 'var(--color-terracotta, #B85C3E)', fontWeight: 600 }}>fun</span>{' '}
          <span style={{ color: 'var(--color-code-fn, #2B5B84)', fontWeight: 600 }}>main</span>
          <span style={{ color: 'var(--color-muted, #5F564D)' }}>()</span>{' '}
          <span style={{ color: 'var(--color-muted, #5F564D)' }}>&#123;</span>
        </div>
        <div className="pl-4 whitespace-nowrap">
          <span style={{ color: 'var(--color-code-builtin, #9C4221)' }}>println</span>
          <span style={{ color: 'var(--color-muted, #5F564D)' }}>(</span>
          <span style={{ color: 'var(--color-code-string, #2D6A4F)' }}>&quot;হ্যালো, Kotlin!&quot;</span>
          <span style={{ color: 'var(--color-muted, #5F564D)' }}>)</span>
        </div>
        <div className="whitespace-nowrap">
          <span style={{ color: 'var(--color-muted, #5F564D)' }}>&#125;</span>
        </div>
      </div>
    </div>
  );
}
