import { useEffect, useRef, useState } from 'react';

interface StatsStripProps {
  className?: string;
}

const toBengaliNumber = (num: number): string => {
  const bengaliDigits = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];
  return num
    .toString()
    .split('')
    .map((char) => {
      const d = parseInt(char, 10);
      return !isNaN(d) ? bengaliDigits[d] : char;
    })
    .join('');
};

export default function StatsStrip({ className = '' }: StatsStripProps) {
  const [modulesCount, setModulesCount] = useState(0);
  const [lessonsCount, setLessonsCount] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const node = sectionRef.current;
    if (!node || hasAnimated) return;

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) {
      setModulesCount(8);
      setLessonsCount(100);
      setHasAnimated(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting) {
          setHasAnimated(true);
          observer.disconnect();

          const duration = 1200; // ms
          const startTime = performance.now();

          const animate = (currentTime: number) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            // Ease-out cubic: fast start, soft settle
            const eased = 1 - Math.pow(1 - progress, 3);

            setModulesCount(Math.round(eased * 8));
            setLessonsCount(Math.round(eased * 100));

            if (progress < 1) {
              requestAnimationFrame(animate);
            } else {
              setModulesCount(8);
              setLessonsCount(100);
            }
          };

          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.2 }
    );

    observer.observe(node);

    return () => {
      observer.disconnect();
    };
  }, [hasAnimated]);

  return (
    <section
      ref={sectionRef}
      className={`border-y border-[var(--color-border-subtle,#DCD2C3)] py-5 ${className}`}
      style={{ marginBottom: 'var(--hero-gap)' }}
    >
      <div className="grid grid-cols-3 divide-x divide-[var(--color-border-subtle,#DCD2C3)]">
        <div className="text-center px-1.5 sm:px-3">
          <div className="text-2xl sm:text-3xl font-bold text-[var(--color-ink,#1C1A18)] leading-tight font-mono">
            {toBengaliNumber(modulesCount)}+
          </div>
          <div className="text-xs sm:text-sm text-[var(--color-muted,#5F564D)] mt-1 leading-normal truncate">
            মডিউল
          </div>
        </div>

        <div className="text-center px-1.5 sm:px-3">
          <div className="text-2xl sm:text-3xl font-bold text-[var(--color-ink,#1C1A18)] leading-tight font-mono">
            {toBengaliNumber(lessonsCount)}+
          </div>
          <div className="text-xs sm:text-sm text-[var(--color-muted,#5F564D)] mt-1 leading-normal truncate">
            লেসন
          </div>
        </div>

        <div className="text-center px-1.5 sm:px-3">
          <div className="text-xl sm:text-3xl font-bold text-[var(--color-ink,#1C1A18)] leading-tight truncate">
            বাংলায়
          </div>
          <div className="text-xs sm:text-sm text-[var(--color-muted,#5F564D)] mt-1 leading-normal truncate">
            সহজ ও সাজানো
          </div>
        </div>
      </div>
    </section>
  );
}
