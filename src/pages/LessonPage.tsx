/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { CheckCircle, ChevronRight, Clock } from 'lucide-react';
import LessonBlocks from '../components/LessonBlocks';
import { getLessonContent } from '../content/lessons';
import { MODULES_DATA, toBengaliNumber } from '../data/modules';
import type { Lesson, TextSize } from '../types';

interface LessonPageProps {
  moduleId: number;
  lessonId: number;
  textSize?: TextSize;
  onNextLesson?: (nextLessonId: number) => void;
  onPrevLesson?: (prevLessonId: number) => void;
  onNextModule?: (nextModuleId: number) => void;
  onViewAllModules?: () => void;
}

const ZOOM_LEVELS: Record<TextSize, number> = {
  small: 0.9,
  medium: 1,
  large: 1.18,
};

function countWords(str: string): number {
  if (!str) return 0;
  return str.trim().split(/\s+/).filter(Boolean).length;
}

function estimateLessonMinutes(lesson: Lesson): number {
  if (typeof lesson.minutes === 'number' && lesson.minutes > 0) {
    return lesson.minutes;
  }

  let wordsCount = 0;
  let codeBlocksCount = 0;
  let tasksCount = 0;
  let quizQuestionsCount = 0;

  for (const block of lesson.blocks || []) {
    if (block.type === 'heading') {
      wordsCount += countWords(block.text);
    } else if (block.type === 'paragraph') {
      wordsCount += countWords(block.text);
    } else if (block.type === 'list') {
      for (const item of block.items || []) {
        wordsCount += countWords(item);
      }
    } else if (block.type === 'note') {
      wordsCount += countWords(block.text);
    } else if (block.type === 'task') {
      tasksCount += 1;
      if (block.title) wordsCount += countWords(block.title);
      if (block.text) wordsCount += countWords(block.text);
      if (block.hint) wordsCount += countWords(block.hint);
    } else if (block.type === 'code') {
      codeBlocksCount += 1;
    } else if (block.type === 'quiz') {
      quizQuestionsCount += block.questions?.length || 0;
    }
  }

  const calculated = Math.ceil(
    wordsCount / 120 + codeBlocksCount * 0.5 + tasksCount * 3 + quizQuestionsCount * 0.5
  );

  return Math.max(2, calculated);
}

export default function LessonPage({
  moduleId,
  lessonId,
  textSize = 'medium',
  onNextLesson,
  onPrevLesson,
  onNextModule,
  onViewAllModules,
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

  const nextModuleId = moduleId + 1;
  const nextModule = MODULES_DATA.find((m) => m.id === nextModuleId);
  const nextModuleLesson1 = getLessonContent(nextModuleId, 1);
  const canGoToNextModule = Boolean(nextModule && nextModuleLesson1);

  const handleModuleCompleteAction = () => {
    if (canGoToNextModule) {
      if (onNextModule) {
        onNextModule(nextModuleId);
      } else {
        window.location.hash = `#/module/${nextModuleId}`;
      }
    } else {
      if (onViewAllModules) {
        onViewAllModules();
      } else {
        window.location.hash = '';
        setTimeout(() => {
          document.getElementById('modules-section')?.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    }
  };

  const totalLessons = currentModule?.lessonTitles?.length || 0;
  const cleanModuleDigit = toBengaliNumber(moduleId).replace(/^০/, '');
  const cleanLessonDigit = toBengaliNumber(lessonId).replace(/^০/, '');
  const cleanTotalLessons = toBengaliNumber(totalLessons).replace(/^০/, '');
  const estimatedMinutes = estimateLessonMinutes(lessonData);
  const cleanMinutes = toBengaliNumber(estimatedMinutes).replace(/^০/, '');

  return (
    <section className="w-full max-w-[680px] mx-auto pb-2" style={{ paddingBottom: '8px' }}>
      {/* Context line: "মডিউল N • লেসন M/K" on left, Clock + "প্রায় X মিনিট" on right */}
      {/* Followed by 8px gap rule and title with line-height 1.3 */}
      <div className="flex flex-col gap-2">
        <div className="flex flex-row items-center justify-between text-[13px] text-[#8A7F72] m-0 p-0 leading-none whitespace-nowrap">
          <span>
            {`মডিউল ${cleanModuleDigit} • লেসন ${cleanLessonDigit}/${cleanTotalLessons}`}
          </span>
          <span className="flex items-center gap-1.5 shrink-0">
            <Clock size={14} strokeWidth={1.75} className="shrink-0" />
            <span>{`প্রায় ${cleanMinutes} মিনিট`}</span>
          </span>
        </div>

        {/* Lesson title and blocks wrapped in one container with CSS zoom applied */}
        <div style={{ zoom: ZOOM_LEVELS[textSize] }}>
          <h1
            className="text-2xl sm:text-3xl font-bold text-[var(--color-ink,#1C1A18)] tracking-tight m-0 p-0"
            style={{ lineHeight: 1.3 }}
          >
            {lessonData.title}
          </h1>

          {/* Render blocks under title with 24px gap if not empty; if blocks is empty, render nothing */}
          {lessonData.blocks && lessonData.blocks.length > 0 ? (
            <div className="mt-6">
              <LessonBlocks blocks={lessonData.blocks} />
            </div>
          ) : null}
        </div>
      </div>

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

          {/* Next Lesson Card OR Module-Complete Card */}
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
              <ChevronRight
                size={16}
                strokeWidth={2}
                className="shrink-0 text-[#A39888]"
                aria-hidden="true"
              />
            </button>
          ) : (
            <button
              type="button"
              onClick={handleModuleCompleteAction}
              className={`w-full flex items-center justify-between text-left rounded-[14px] p-[14px_16px] min-h-[72px] shadow-none active:bg-[rgba(184,92,62,0.12)] transition-colors cursor-pointer select-none focus:outline-none focus-visible:ring-2 focus-visible:ring-[#B85C3E] ${
                !hasPrevLesson ? 'sm:col-span-2' : ''
              }`}
              style={{
                backgroundColor: 'rgba(184, 92, 62, 0.07)',
                border: '1px solid rgba(184, 92, 62, 0.30)',
                borderRadius: '14px',
                padding: '14px 16px',
                minHeight: '72px',
                boxShadow: 'none',
              }}
            >
              <div className="flex flex-col gap-0.5 min-w-0 pr-3">
                <div className="flex items-center gap-1.5 text-[13px] text-[#8A7F72] leading-none">
                  <CheckCircle
                    size={16}
                    strokeWidth={1.75}
                    className="shrink-0 text-[var(--color-terracotta,#B85C3E)]"
                    aria-hidden="true"
                  />
                  <span>{`মডিউল ${cleanModuleDigit} সম্পন্ন`}</span>
                </div>
                <span
                  className="text-[15px] sm:text-[16px] font-semibold text-[#1C1A18] leading-snug break-words line-clamp-2 mt-0.5"
                  style={{ fontWeight: 600, color: '#1C1A18' }}
                >
                  {canGoToNextModule && nextModule ? `পরের মডিউল: ${nextModule.title}` : 'সব মডিউল দেখুন'}
                </span>
              </div>
              <ChevronRight
                size={16}
                strokeWidth={2}
                className="shrink-0 text-[#A39888]"
                aria-hidden="true"
              />
            </button>
          )}
        </div>
      </div>
    </section>
  );
}
