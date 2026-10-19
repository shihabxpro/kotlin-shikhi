/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect, useRef } from 'react';

interface RandomMotionVideoProps {
  paused?: boolean;
  className?: string;
}

interface Token {
  text: string;
  mono: boolean;
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  color: string;
  alpha: number;
  angle: number;
  spin: number;
  halfWidth: number;
  halfHeight: number;
  minSpeed: number;
  maxSpeed: number;
}

const KOTLIN_TOKENS = [
  'val', 'var', 'fun', 'if', 'else', 'when', 'null', 'class', 'object',
  'return', 'println()', '{ }', '( )', '<T>', '->', '?.', 'listOf', 'map',
  'Int', 'String', 'true', 'false', 'for', 'while', '!!', '===', '?:', 'let',
];

const BANGLA_TOKENS = [
  'ভেরিয়েবল', 'ফাংশন', 'লুপ', 'ক্লাস', 'কন্ডিশন', 'স্ট্রিং', 'টাইপ',
  'নাল সেফটি', 'অ্যারে', 'কোড', 'আউটপুট', 'প্রোগ্রাম', 'কোরুটিন',
  'উদাহরণ', 'ভ্যালু', 'মডিউল', 'লেসন', 'শিখি', 'ল্যাম্বডা', 'কলেকশন',
];

const rand = (min: number, max: number) => min + Math.random() * (max - min);
const clamp = (value: number, min: number, max: number) =>
  Math.min(max, Math.max(min, value));

export default function RandomMotionVideo({
  paused = false,
  className = '',
}: RandomMotionVideoProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pausedRef = useRef(paused);

  useEffect(() => {
    pausedRef.current = paused;
  }, [paused]);

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const reduceQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    let reduced = reduceQuery.matches;
    const handleReduceChange = () => {
      reduced = reduceQuery.matches;
    };
    reduceQuery.addEventListener?.('change', handleReduceChange);

    const rootStyles = getComputedStyle(document.documentElement);
    const cssVar = (name: string, fallback: string) =>
      rootStyles.getPropertyValue(name).trim() || fallback;

    const colors = [
      cssVar('--color-terracotta', '#B85C3E'),
      cssVar('--color-code-string', '#2D6A4F'),
      cssVar('--color-code-fn', '#2B5B84'),
      cssVar('--color-code-builtin', '#9C4221'),
      cssVar('--color-muted', '#5F564D'),
      cssVar('--color-muted-light', '#8A7F72'),
    ];

    const monoFont = cssVar('--font-mono', '"JetBrains Mono", monospace');
    const banglaFont = `"Anek Bangla", "Noto Serif Bengali", ${cssVar('--font-site', 'sans-serif')}`;

    let width = 0;
    let height = 0;
    let tokens: Token[] = [];
    let frame = 0;
    let lastTime = 0;

    const createToken = (): Token => {
      const mono = Math.random() < 0.6;
      const pool = mono ? KOTLIN_TOKENS : BANGLA_TOKENS;
      const text = pool[Math.floor(Math.random() * pool.length)];
      const scale = clamp(width / 620, 0.72, 1.55);
      const size = rand(12, 27) * scale;
      const speed = rand(0.12, 0.42) * (18 / size);
      const heading = rand(0, Math.PI * 2);
      const halfWidth = Math.max(
        size * 0.7,
        (text.length * size * (mono ? 0.34 : 0.4)) * 0.5,
      );
      const halfHeight = size * 0.72;

      return {
        text,
        mono,
        x: rand(halfWidth, Math.max(halfWidth + 1, width - halfWidth)),
        y: rand(halfHeight, Math.max(halfHeight + 1, height - halfHeight)),
        vx: Math.cos(heading) * speed,
        vy: Math.sin(heading) * speed,
        size,
        color: colors[Math.floor(Math.random() * colors.length)],
        alpha: mono ? rand(0.12, 0.26) : rand(0.16, 0.34),
        angle: mono ? rand(-0.18, 0.18) : rand(-0.1, 0.1),
        spin: rand(-0.0016, 0.0016),
        halfWidth,
        halfHeight,
        minSpeed: speed * 0.6,
        maxSpeed: Math.max(speed * 1.8, 0.5),
      };
    };

    const seed = () => {
      const count = Math.round(clamp((width * height) / 13000, 18, 42));
      tokens = Array.from({ length: count }, createToken);
    };

    const draw = (dt: number) => {
      ctx.clearRect(0, 0, width, height);
      const animate = !reduced && !pausedRef.current;

      for (const token of tokens) {
        if (animate) {
          token.vx += rand(-0.5, 0.5) * 0.02;
          token.vy += rand(-0.5, 0.5) * 0.02;

          const speed = Math.hypot(token.vx, token.vy) || 0.0001;
          const target = clamp(speed, token.minSpeed, token.maxSpeed);
          token.vx = (token.vx / speed) * target;
          token.vy = (token.vy / speed) * target;

          token.x += token.vx * dt;
          token.y += token.vy * dt;
          token.angle += token.spin * dt;

          if (token.x < token.halfWidth) {
            token.x = token.halfWidth;
            token.vx = Math.abs(token.vx);
          } else if (token.x > width - token.halfWidth) {
            token.x = width - token.halfWidth;
            token.vx = -Math.abs(token.vx);
          }
          if (token.y < token.halfHeight) {
            token.y = token.halfHeight;
            token.vy = Math.abs(token.vy);
          } else if (token.y > height - token.halfHeight) {
            token.y = height - token.halfHeight;
            token.vy = -Math.abs(token.vy);
          }
        }

        ctx.save();
        ctx.translate(token.x, token.y);
        ctx.rotate(token.angle);
        ctx.globalAlpha = token.alpha;
        ctx.fillStyle = token.color;
        ctx.font = `${token.mono ? 700 : 600} ${token.size}px ${
          token.mono ? monoFont : banglaFont
        }`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(token.text, 0, 0);
        ctx.restore();
      }

      ctx.globalAlpha = 1;
    };

    const resize = () => {
      const rect = container.getBoundingClientRect();
      const nextWidth = Math.max(1, Math.floor(rect.width));
      const nextHeight = Math.max(1, Math.floor(rect.height));
      if (nextWidth === width && nextHeight === height) return;

      width = nextWidth;
      height = nextHeight;

      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      seed();
    };

    const loop = (time: number) => {
      frame = window.requestAnimationFrame(loop);
      const dt = lastTime ? clamp((time - lastTime) / 16.6667, 0.1, 3) : 1;
      lastTime = time;
      draw(dt);
    };

    const start = () => {
      if (frame) return;
      lastTime = 0;
      frame = window.requestAnimationFrame(loop);
    };

    const stop = () => {
      if (frame) {
        window.cancelAnimationFrame(frame);
        frame = 0;
      }
    };

    let inView = true;

    const handleVisibility = () => {
      if (document.hidden || !inView) {
        stop();
      } else if (!reduced) {
        start();
      }
    };

    const handleResize = () => {
      resize();
      if (reduced) draw(0);
    };

    resize();

    const resizeObserver = new ResizeObserver(handleResize);
    resizeObserver.observe(container);

    // Pause the animation while the field is scrolled out of view (saves battery/CPU)
    const viewObserver = new IntersectionObserver(
      (entries) => {
        inView = entries[0]?.isIntersecting ?? true;
        if (reduced) {
          if (inView) draw(0);
          return;
        }
        if (inView && !document.hidden) {
          start();
        } else {
          stop();
        }
      },
      { threshold: 0 },
    );
    viewObserver.observe(container);

    document.addEventListener('visibilitychange', handleVisibility);

    if (reduced) {
      draw(0);
      document.fonts?.ready?.then(() => draw(0)).catch(() => {});
    } else {
      start();
    }

    return () => {
      stop();
      resizeObserver.disconnect();
      viewObserver.disconnect();
      document.removeEventListener('visibilitychange', handleVisibility);
      reduceQuery.removeEventListener?.('change', handleReduceChange);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={`relative h-full w-full ${className}`}
      aria-hidden="true"
    >
      <canvas
        ref={canvasRef}
        className="block h-full w-full"
        style={{
          WebkitMaskImage:
            'radial-gradient(115% 100% at 50% 38%, #000 52%, transparent 100%)',
          maskImage:
            'radial-gradient(115% 100% at 50% 38%, #000 52%, transparent 100%)',
        }}
      />
    </div>
  );
}
