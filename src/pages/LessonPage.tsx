/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import LessonBlocks from '../components/LessonBlocks';
import { getLessonContent } from '../content/lessons';
import { BENGALI_DIGITS, MODULES_DATA } from '../data/modules';

interface LessonPageProps {
  moduleId: number;
  lessonId: number;
  onNextLesson?: (nextLessonId: number) => void;
  onPrevLesson?: (prevLessonId: number) => void;
  onLessonList?: () => void;
}

export default function LessonPage({
  moduleId,
  lessonId,
  onNextLesson,
  onPrevLesson,
  onLessonList,
}: LessonPageProps) {
  const lessonData = getLessonContent(moduleId, lessonId);

  // If a lesson file does not exist, render nothing
  if (!lessonData) {
    return null;
  }

  const currentModule = MODULES_DATA.find((m) => m.id === moduleId);
  const nextLessonIndex = lessonId; // since lessonId is 1-based, index lessonId is the next lesson's title
  const hasNextLesson = Boolean(
    currentModule &&
      currentModule.lessonTitles &&
      nextLessonIndex < currentModule.lessonTitles.length
  );
  const nextLessonTitle =
    hasNextLesson && currentModule?.lessonTitles
      ? currentModule.lessonTitles[nextLessonIndex]
      : null;

  const prevLessonIndex = lessonId - 2; // lessonId=2 -> index 0 (1st lesson title)
  const hasPrevLesson = lessonId > 1;
  const prevLessonTitle =
    hasPrevLesson && currentModule?.lessonTitles && prevLessonIndex >= 0
      ? currentModule.lessonTitles[prevLessonIndex]
      : null;

  const handleNextLesson = () => {
    if (onNextLesson) {
      onNextLesson(lessonId + 1);
    } else {
      window.location.hash = `#/module/${moduleId}/lesson/${lessonId + 1}`;
    }
  };

  const handlePrevLesson = () => {
    if (onPrevLesson) {
      onPrevLesson(lessonId - 1);
    } else {
      window.location.hash = `#/module/${moduleId}/lesson/${lessonId - 1}`;
    }
  };

  const handleLessonList = () => {
    if (onLessonList) {
      onLessonList();
    } else {
      window.location.hash = `#/module/${moduleId}`;
    }
  };

  const moduleDigit = BENGALI_DIGITS[moduleId - 1] || `${moduleId}`;
  const lessonDigit = BENGALI_DIGITS[lessonId - 1] || `${lessonId}`;
  // Remove leading zero if present for clean display, e.g. "১" instead of "০১"
  const cleanModuleDigit = moduleDigit.replace(/^০/, '');
  const cleanLessonDigit = lessonDigit.replace(/^০/, '');

  return (
    <section className="w-full max-w-[680px] mx-auto pb-12" style={{ paddingBottom: '48px' }}>
      {/* Small muted context line: "মডিউল ১ • লেসন ১" (13px, #8A7F72, no uppercase, no letter spacing) */}
      {/* Followed by 8px gap rule and title with line-height 1.3 */}
      <div className="flex flex-col gap-2">
        <p className="text-[13px] text-[#8A7F72] m-0 p-0 leading-none">
          {`মডিউল ${cleanModuleDigit} • লেসন ${cleanLessonDigit}`}
        </p>

        <h1
          className="text-2xl sm:text-3xl font-bold text-[var(--color-ink,#1C1A18)] tracking-tight m-0 p-0"
          style={{ lineHeight: 1.3 }}
        >
          {lessonData.title}
        </h1>
      </div>

      {/* Render blocks under title with 24px gap if not empty; if blocks is empty, render nothing */}
      {lessonData.blocks && lessonData.blocks.length > 0 ? (
        <div className="mt-6">
          <LessonBlocks blocks={lessonData.blocks} />
        </div>
      ) : null}

      {/* Navigation area at the end of every lesson page (after the last block) */}
      <div
        className="mt-10 border-t border-[#E6DDD0] pt-5"
        style={{ marginTop: '40px', borderTop: '1px solid #E6DDD0', paddingTop: '20px' }}
      >
        {/* Navigation cards row: 2 equal columns if both present, or 1 column if first lesson */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-[10px] items-stretch">
          {/* Previous Lesson Card (if available) */}
          {hasPrevLesson && prevLessonTitle ? (
            <button
              type="button"
              onClick={handlePrevLesson}
              className="w-full flex items-center justify-between text-left border border-[#DED4C5] rounded-[14px] p-[14px_16px] min-h-[72px] shadow-none active:bg-[rgba(184,92,62,0.05)] transition-colors cursor-pointer select-none focus:outline-none focus-visible:ring-2 focus-visible:ring-[#B85C3E]"
              style={{
                backgroundColor: '#F4EFE6',
                borderColor: '#DED4C5',
                borderRadius: '14px',
                padding: '14px 16px',
                minHeight: '72px',
                boxShadow: 'none',
              }}
            >
              <div className="flex items-center gap-2.5 min-w-0 pr-2">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#A39888"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="shrink-0"
                  style={{ stroke: '#A39888', flexShrink: 0 }}
                  aria-hidden="true"
                >
                  <polyline points="15 18 9 12 15 6" />
                </svg>
                <div className="flex flex-col gap-0.5 min-w-0">
                  <span
                    className="text-[13px] text-[#8A7F72] leading-none"
                    style={{ fontSize: '13px', color: '#8A7F72', lineHeight: 1 }}
                  >
                    আগের লেসন
                  </span>
                  <span
                    className="text-[15px] sm:text-[16px] font-semibold text-[#1C1A18] leading-snug break-words line-clamp-2"
                    style={{ fontWeight: 600, color: '#1C1A18' }}
                  >
                    {prevLessonTitle}
                  </span>
                </div>
              </div>
            </button>
          ) : null}

          {/* Next Lesson Card (if available) */}
          {hasNextLesson && nextLessonTitle ? (
            <button
              type="button"
              onClick={handleNextLesson}
              className={`w-full flex items-center justify-between text-left border border-[#DED4C5] rounded-[14px] p-[14px_16px] min-h-[72px] shadow-none active:bg-[rgba(184,92,62,0.05)] transition-colors cursor-pointer select-none focus:outline-none focus-visible:ring-2 focus-visible:ring-[#B85C3E] ${
                !hasPrevLesson ? 'sm:col-span-2' : ''
              }`}
              style={{
                backgroundColor: '#F4EFE6',
                borderColor: '#DED4C5',
                borderRadius: '14px',
                padding: '14px 16px',
                minHeight: '72px',
                boxShadow: 'none',
              }}
            >
              <div className="flex flex-col gap-0.5 min-w-0 pr-3">
                <span
                  className="text-[13px] text-[#8A7F72] leading-none"
                  style={{ fontSize: '13px', color: '#8A7F72', lineHeight: 1 }}
                >
                  পরের লেসন
                </span>
                <span
                  className="text-[15px] sm:text-[16px] font-semibold text-[#1C1A18] leading-snug break-words line-clamp-2"
                  style={{ fontWeight: 600, color: '#1C1A18' }}
                >
                  {nextLessonTitle}
                </span>
              </div>
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#A39888"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="shrink-0"
                style={{ stroke: '#A39888', flexShrink: 0 }}
                aria-hidden="true"
              >
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </button>
          ) : null}
        </div>

        {/* Small text row with "লেসন তালিকা", right-aligned, 14px, terracotta, min 44px tap height */}
        <div
          className="flex items-center justify-end min-h-[44px] mt-3"
          style={{ minHeight: '44px' }}
        >
          <button
            type="button"
            onClick={handleLessonList}
            className="text-[14px] text-[#B85C3E] min-h-[44px] flex items-center hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-[#B85C3E] rounded cursor-pointer select-none active:opacity-75"
            style={{ fontSize: '14px', color: '#B85C3E', minHeight: '44px' }}
          >
            লেসন তালিকা
          </button>
        </div>
      </div>
    </section>
  );
}
