/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  ArrowUpRight,
  Code2,
  Facebook,
  Github,
  Heart,
  Mail,
  Send,
  type LucideIcon,
} from 'lucide-react';
import profileImage from '../assets/profile.jpg';

interface AboutPageProps {
  onBack: () => void;
}

function KotlinMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className}>
      <defs>
        <linearGradient id="kotlin-mark" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#7F52FF" />
          <stop offset="45%" stopColor="#0095D5" />
          <stop offset="100%" stopColor="#E44857" />
        </linearGradient>
      </defs>
      <path d="M24 24H0V0h24L12 12Z" fill="url(#kotlin-mark)" />
    </svg>
  );
}

interface SocialLink {
  name: string;
  href: string;
  Icon: LucideIcon;
}

const SOCIAL_LINKS: SocialLink[] = [
  { name: 'Facebook', href: 'https://facebook.com/', Icon: Facebook },
  { name: 'Telegram', href: 'https://t.me/', Icon: Send },
  { name: 'GitHub', href: 'https://github.com/', Icon: Github },
  { name: 'Email', href: 'mailto:hello@example.com', Icon: Mail },
];


export default function About(_props: AboutPageProps) {
  return (
    <section className="relative w-full flex-1 flex flex-col items-center justify-start pt-0 text-center">
      <KotlinMark className="pointer-events-none absolute left-1/2 top-0 h-52 w-52 -translate-x-1/2 rotate-[-12deg] opacity-[0.06] blur-[1px]" />

      <div className="relative h-40 w-40 sm:h-44 sm:w-44">
        <span
          aria-hidden="true"
          className="absolute inset-0 rounded-full animate-[spin_10s_linear_infinite] motion-reduce:animate-none"
          style={{
            background: 'conic-gradient(from 0deg, #B85C3E, #7F52FF, #1686C4, #2D6A4F, #B85C3E)',
          }}
        />
        <span
          aria-hidden="true"
          className="absolute inset-[3px] rounded-full bg-[var(--color-paper,#F4EFE6)]"
        />
        <img
          src={profileImage}
          alt="শিহাব"
          width={176}
          height={176}
          decoding="async"
          className="absolute inset-[6px] h-[calc(100%-12px)] w-[calc(100%-12px)] rounded-full object-cover shadow-[0_10px_30px_-12px_rgba(28,26,24,0.6)]"
        />
        <span
          aria-hidden="true"
          className="absolute left-[85%] top-[85%] z-20 flex h-5 w-5 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-[3px] border-[var(--color-paper,#F4EFE6)]"
          style={{ backgroundColor: '#22C55E' }}
        >
          <span
            className="absolute inline-flex h-full w-full rounded-full opacity-60 animate-ping motion-reduce:animate-none"
            style={{ backgroundColor: '#22C55E' }}
          />
        </span>

        <span className="absolute bottom-0 left-1/2 z-20 inline-flex -translate-x-1/2 translate-y-1/2 items-center gap-1.5 whitespace-nowrap rounded-full border-2 border-[var(--color-paper,#F4EFE6)] bg-[var(--color-terracotta,#B85C3E)] px-3.5 py-1 text-[12px] font-semibold tracking-wide text-white shadow-[0_10px_22px_-10px_rgba(184,92,62,0.95)]">
          <Code2 size={13} strokeWidth={2.4} aria-hidden="true" />
          Developer
        </span>
      </div>

      <div className="mt-8 flex items-center gap-3">
        <span aria-hidden="true" className="h-px w-8 bg-[var(--color-border,#DED4C5)]" />
        <span className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[var(--color-muted-light,#8A7F72)]">
          Hello, I am
        </span>
        <span aria-hidden="true" className="h-px w-8 bg-[var(--color-border,#DED4C5)]" />
      </div>

      <h1
        className="mt-1 m-0 text-5xl font-bold tracking-tight sm:text-6xl"
        style={{ fontFamily: 'var(--font-heading)', lineHeight: 1.2 }}
      >
        <span className="bg-gradient-to-br from-[var(--color-ink,#1C1A18)] to-[var(--color-terracotta,#B85C3E)] bg-clip-text text-transparent">
          শিহাব
        </span>
      </h1>

      <p className="mt-2 max-w-sm text-[15px] leading-relaxed text-[var(--color-muted,#5F564D)] m-0">
        একজন শিক্ষার্থী, প্রোগ্রামিং অনুরাগী এবং Kotlin Shikhi-এর নির্মাতা।
      </p>

      <div className="mt-5 grid w-full max-w-sm grid-cols-2 gap-2.5">
        {SOCIAL_LINKS.map(({ name, href, Icon }) => (
          <a
            key={name}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={name}
            className="group flex items-center gap-2.5 rounded-2xl border border-[var(--color-border,#DED4C5)] bg-[rgba(244,239,230,0.7)] px-3 py-2.5 text-left text-[13px] font-semibold text-[var(--color-ink,#1C1A18)] backdrop-blur-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-[var(--color-terracotta,#B85C3E)] hover:bg-[rgba(244,239,230,1)] hover:shadow-[0_14px_26px_-16px_rgba(28,26,24,0.7)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-terracotta,#B85C3E)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--topbar-bg,#F4EFE6)]"
          >
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[rgba(184,92,62,0.07)] text-[var(--color-terracotta,#B85C3E)] transition-colors duration-200 group-hover:bg-[rgba(184,92,62,0.14)]">
              <Icon size={17} strokeWidth={1.75} aria-hidden="true" />
            </span>
            <span className="flex-1 truncate transition-colors duration-200 group-hover:text-[var(--color-terracotta,#B85C3E)]">
              {name}
            </span>
            <ArrowUpRight
              size={15}
              strokeWidth={2.2}
              aria-hidden="true"
              className="shrink-0 text-[var(--color-muted-chevron,#A39888)] opacity-0 transition-all duration-200 group-hover:translate-x-0.5 group-hover:text-[var(--color-terracotta,#B85C3E)] group-hover:opacity-100"
            />
          </a>
        ))}
      </div>

      <div className="mt-10 w-full max-w-sm">
        <div
          aria-hidden="true"
          className="h-px w-full bg-[var(--color-divider,#E6DDD0)]"
        />
        <div className="mt-7 text-left">
          <p className="m-0 text-[11px] font-semibold uppercase tracking-[0.28em] text-[var(--color-muted-light,#8A7F72)] opacity-70">
            01 — About Me
          </p>
          <h2
            className="mt-2 m-0 text-2xl font-bold tracking-tight text-[var(--color-ink,#1C1A18)] sm:text-[28px]"
            style={{ fontFamily: 'var(--font-heading)', lineHeight: 1.35 }}
          >
            আমার সম্পর্কে
          </h2>
          <p className="mt-3 m-0 text-[15px] leading-relaxed text-[var(--color-muted,#5F564D)]">
            আমি নতুন কিছু শিখতে, প্রযুক্তি নিয়ে কাজ করতে এবং নিজের শেখার অভিজ্ঞতা অন্যদের সঙ্গে ভাগ করে নিতে পছন্দ করি। সহজভাবে প্রোগ্রামিং শেখার একটি সুন্দর পরিবেশ তৈরি করাই আমার আগ্রহ।
          </p>
        </div>
      </div>

      <div className="mt-10 w-full max-w-sm">
        <div
          aria-hidden="true"
          className="h-px w-full bg-[var(--color-divider,#E6DDD0)]"
        />
        <div className="mt-7 text-left">
          <p className="m-0 text-[10px] font-semibold uppercase tracking-[0.28em] text-[var(--color-muted-light,#8A7F72)] opacity-70">
            02 — My Project
          </p>
          <h2
            className="mt-2 m-0 text-3xl font-bold tracking-tight text-[var(--color-ink,#1C1A18)] sm:text-4xl"
            style={{ fontFamily: 'var(--font-heading)', lineHeight: 1.35 }}
          >
            কোটলিন শিখি
          </h2>

          <p className="mt-3 m-0 whitespace-pre-line text-[15px] leading-relaxed text-[var(--color-muted,#5F564D)]">{`প্রোগ্রামিংয়ের বিশাল জগতে নতুনদের জন্য শুরুটা অনেক সময় দ্বিধা ও ভয়ের হয়ে দাঁড়ায়—বিশেষ করে যখন জটিল ধারণাসমূহ মাতৃভাষায় গোছানো আকারে পাওয়া যায় না।
সেই শূন্যতা দূর করার আন্তরিক সংকল্প থেকেই ‘Kotlin শিখি’ প্রজেক্টের সূচনা। আমি বিশ্বাস করি, প্রোগ্রামিং মুখস্থ করার বিষয় নয়; এটি চিন্তাশক্তি, যুক্তি আর সমস্যা সমাধানের এক অপূর্ব শিল্প। তাই প্রতিটি লেসন সাজানো হয়েছে হাতে-কলমে উদাহরণ, বাস্তব জীবনের উপমা ও তাৎক্ষণিক কুইজের মাধ্যমে।
আমাদের লক্ষ্য খুব স্পষ্ট—যাঁরা শূন্য থেকে শুরু করছেন তাঁরা যেন কোনো জড়তা ছাড়াই আত্মবিশ্বাসের সাথে আধুনিক Kotlin ও অ্যান্ড্রয়েড কোডিংয়ের মূল ভিত মজবুত করতে পারেন`}</p>

          <blockquote className="relative mt-5 m-0 rounded-2xl border border-[var(--color-border,#DED4C5)] bg-[rgba(184,92,62,0.05)] px-4 py-4 pl-5 text-left">
            <span
              aria-hidden="true"
              className="absolute left-0 top-3 bottom-3 w-[3px] rounded-full bg-[var(--color-terracotta,#B85C3E)]"
            />
            <p
              className="m-0 text-[15px] italic leading-relaxed text-[var(--color-ink,#1C1A18)]"
              style={{ fontFamily: 'var(--font-heading)', lineHeight: 1.6 }}
            >
              “একটি সুন্দর কোডের পেছনের গল্প শুরু হয় কৌতূহল দিয়ে। জটিল বিষয়কে সহজভাবে প্রকাশ করাই একজন সত্যিকারের ইঞ্জিনিয়ারের শ্রেষ্ঠ নৈপুণ্য।”
            </p>
          </blockquote>
        </div>
      </div>

      <footer className="mt-12 mb-8 flex items-center justify-center gap-1.5 text-[12px] text-[var(--color-muted-light,#8A7F72)]">
        <span>Made with</span>
        <Heart
          size={13}
          strokeWidth={2.2}
          aria-label="ভালোবাসা"
          className="text-[var(--color-terracotta,#B85C3E)]"
          fill="currentColor"
        />
        <span>— ভালোবাসা দিয়ে তৈরি</span>
      </footer>
    </section>
  );
}
