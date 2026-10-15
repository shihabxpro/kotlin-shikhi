/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useRef, useState } from 'react';
import { formatInlineText } from './LessonBlocks';

export interface QuizQuestion {
  question: string;
  options: string[];
  answerIndex: number;
  explanation: string;
}

interface QuizFlowProps {
  questions: QuizQuestion[];
  isInline?: boolean;
  onCloseSheet?: () => void;
  onFinish?: (score: number, total: number) => void;
}

function shuffleQuestion(question: QuizQuestion): QuizQuestion {
  const indices = question.options.map((_, i) => i);
  for (let i = indices.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = indices[i];
    indices[i] = indices[j];
    indices[j] = temp;
  }

  const shuffledOptions = indices.map((idx) => question.options[idx]);
  const newAnswerIndex = indices.indexOf(question.answerIndex);

  return {
    ...question,
    options: shuffledOptions,
    answerIndex: newAnswerIndex,
  };
}

function buildShuffledQuestions(questions: QuizQuestion[]): QuizQuestion[] {
  let attempt = 0;
  let result: QuizQuestion[];
  do {
    result = questions.map((q) => shuffleQuestion(q));
    attempt++;
    if (result.length < 2) {
      break;
    }
    const firstAnswerIndex = result[0].answerIndex;
    const allSame = result.every((q) => q.answerIndex === firstAnswerIndex);
    if (!allSame) {
      break;
    }
  } while (attempt < 10);

  return result;
}

const BENGALI_NUMERALS = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];

function toBanglaDigit(num: number): string {
  const str = String(num);
  return str
    .split('')
    .map((ch) => {
      const idx = parseInt(ch, 10);
      return isNaN(idx) ? ch : BENGALI_NUMERALS[idx];
    })
    .join('');
}

function CheckIcon({ className }: { className?: string }) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

function CrossIcon({ className }: { className?: string }) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  );
}

export default function QuizFlow({
  questions,
  isInline = false,
  onCloseSheet,
  onFinish,
}: QuizFlowProps) {
  const [shuffledQuestions, setShuffledQuestions] = useState<QuizQuestion[]>(() =>
    buildShuffledQuestions(questions)
  );

  const prevQuestionsRef = useRef(questions);
  useEffect(() => {
    if (prevQuestionsRef.current !== questions) {
      prevQuestionsRef.current = questions;
      setShuffledQuestions(buildShuffledQuestions(questions));
      setSelectedAnswers({});
      setCurrentIndex(0);
      setIsFinished(false);
    }
  }, [questions]);

  const [currentIndex, setCurrentIndex] = useState(0);
  // Map of questionIndex -> chosen optionIndex
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [isFinished, setIsFinished] = useState(false);

  const totalQuestions = shuffledQuestions.length;
  const currentQuestion = shuffledQuestions[currentIndex];
  const chosenOption = selectedAnswers[currentIndex];
  const isQuestionAnswered = chosenOption !== undefined;
  const isLastQuestion = currentIndex === totalQuestions - 1;

  const handleSelectOption = (optIdx: number) => {
    if (isQuestionAnswered) return;
    setSelectedAnswers((prev) => ({
      ...prev,
      [currentIndex]: optIdx,
    }));
  };

  const handleNextOrFinish = () => {
    if (!isQuestionAnswered) return;

    if (isLastQuestion) {
      let score = 0;
      shuffledQuestions.forEach((q, idx) => {
        if (selectedAnswers[idx] === q.answerIndex) {
          score++;
        }
      });
      setIsFinished(true);
      if (onFinish) {
        onFinish(score, totalQuestions);
      }
    } else {
      setCurrentIndex((prev) => prev + 1);
    }
  };

  const handleRestart = () => {
    setShuffledQuestions(buildShuffledQuestions(questions));
    setSelectedAnswers({});
    setCurrentIndex(0);
    setIsFinished(false);
  };

  const finalScore = shuffledQuestions.reduce((acc, q, idx) => {
    return selectedAnswers[idx] === q.answerIndex ? acc + 1 : acc;
  }, 0);

  // Result screen
  if (isFinished) {
    let encouragement = 'দারুণ চেষ্টা করেছেন! আরও অনুশীলনে সব আয়ত্তে চলে আসবে।';
    if (finalScore === totalQuestions) {
      encouragement = 'অসাধারণ! সব প্রশ্নের উত্তর একদম সঠিক হয়েছে।';
    } else if (finalScore >= Math.ceil(totalQuestions / 2)) {
      encouragement = 'খুব ভালো ফলাফল! আরেকটু ঝালিয়ে নিলেই পুরো নিখুঁত হবে।';
    }

    return (
      <div className="flex flex-col gap-6" aria-live="polite">
        <div className="flex flex-col items-center justify-center text-center py-4 sm:py-6">
          <div className="text-[13px] font-semibold text-[var(--color-terracotta,#B85C3E)] mb-2">
            ফলাফল
          </div>
          <h3 className="text-2xl sm:text-3xl font-bold text-[var(--color-ink,#1C1A18)] m-0 mb-3">
            আপনার স্কোর: {toBanglaDigit(finalScore)}/{toBanglaDigit(totalQuestions)}
          </h3>
          <p className="text-[15px] sm:text-[16px] text-[var(--color-muted,#5F564D)] max-w-sm m-0 leading-relaxed">
            {encouragement}
          </p>
        </div>

        {/* Buttons in normal flow */}
        <div className="flex flex-col gap-3 w-full pt-4 border-t border-[var(--color-divider,#E6DDD0)]">
          <button
            type="button"
            onClick={handleRestart}
            className="w-full h-12 rounded-xl border border-[var(--color-border,#DED4C5)] bg-[var(--color-paper,#F8F4EE)] text-[var(--color-ink,#1C1A18)] font-semibold text-[15px] hover:border-[var(--color-terracotta,#B85C3E)] transition-colors cursor-pointer"
          >
            আবার শুরু করুন
          </button>
          {!isInline && onCloseSheet && (
            <button
              type="button"
              onClick={onCloseSheet}
              className="w-full h-12 rounded-xl bg-[var(--color-ink,#1C1A18)] text-[var(--color-paper,#F8F4EE)] font-semibold text-[15px] hover:opacity-90 transition-opacity cursor-pointer"
            >
              বন্ধ করুন
            </button>
          )}
        </div>
      </div>
    );
  }

  const isCurrentRight = isQuestionAnswered && chosenOption === currentQuestion.answerIndex;

  return (
    <div className="flex flex-col gap-5" aria-live="polite">
      {/* Upper content in normal page flow */}
      <div className="w-full">
        {/* Top: Progress and indicator */}
        <div className="mb-4">
          <div className="flex items-center justify-between text-[13px] text-[var(--color-muted,#5F564D)] mb-2">
            <span>
              প্রশ্ন {toBanglaDigit(currentIndex + 1)}/{toBanglaDigit(totalQuestions)}
            </span>
          </div>

          {/* Thin multi-segment progress bar */}
          <div className="flex gap-1.5 w-full h-[4px]">
            {shuffledQuestions.map((_, idx) => (
              <div
                key={idx}
                className={`flex-1 h-full rounded-full transition-colors ${
                  idx <= currentIndex
                    ? 'bg-[var(--color-terracotta,#B85C3E)]'
                    : 'bg-[var(--color-divider,#E6DDD0)]'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Question Text */}
        <div className="text-[17px] sm:text-[18px] font-semibold text-[var(--color-ink,#1C1A18)] leading-[1.5] mb-4">
          {formatInlineText(currentQuestion.question)}
        </div>

        {/* Options Stack */}
        <div className="flex flex-col gap-2">
          {currentQuestion.options.map((optionText, optIdx) => {
            const isChosen = chosenOption === optIdx;
            const isCorrect = optIdx === currentQuestion.answerIndex;

            let optionStyle =
              'border-[#DED4C5] bg-[var(--color-paper,#F8F4EE)] text-[var(--color-ink,#1C1A18)]';

            if (isQuestionAnswered) {
              if (isCorrect) {
                // Correct option
                optionStyle =
                  'border-[#6B8A55] bg-[rgba(107,138,85,0.10)] text-[var(--color-ink,#1C1A18)]';
              } else if (isChosen) {
                // Wrong chosen option
                optionStyle =
                  'border-[#B85C3E] bg-[rgba(184,92,62,0.08)] text-[var(--color-ink,#1C1A18)]';
              } else {
                optionStyle =
                  'border-[#E6DDD0] bg-[var(--color-paper,#F8F4EE)] text-[var(--color-muted,#5F564D)] opacity-60';
              }
            }

            return (
              <button
                key={optIdx}
                type="button"
                disabled={isQuestionAnswered}
                aria-pressed={isChosen}
                onClick={() => handleSelectOption(optIdx)}
                className={`w-full text-left rounded-xl p-[12px_14px] min-h-[48px] text-[15px] border flex items-center justify-between gap-3 transition-colors ${optionStyle} ${
                  !isQuestionAnswered
                    ? 'hover:border-[#B85C3E] hover:bg-[rgba(184,92,62,0.03)] cursor-pointer'
                    : 'cursor-default'
                }`}
              >
                <span className="flex-1 leading-snug">{formatInlineText(optionText)}</span>

                {isQuestionAnswered && (
                  <span className="shrink-0 flex items-center justify-center">
                    {isCorrect && (
                      <span className="text-[#6B8A55] flex items-center" aria-label="সঠিক">
                        <CheckIcon />
                      </span>
                    )}
                    {!isCorrect && isChosen && (
                      <span className="text-[#B85C3E] flex items-center" aria-label="ভুল">
                        <CrossIcon />
                      </span>
                    )}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Explanation */}
        {isQuestionAnswered && (
          <div
            className="mt-3.5 pl-3 py-1 border-l-[3px] text-[14px] leading-[1.7] text-[var(--color-muted,#5F564D)]"
            style={{
              borderColor: isCurrentRight ? '#6B8A55' : '#B85C3E',
            }}
          >
            {formatInlineText(currentQuestion.explanation)}
          </div>
        )}
      </div>

      {/* Action Button in normal flow */}
      <div className="pt-4 border-t border-[var(--color-divider,#E6DDD0)]">
        {isQuestionAnswered ? (
          <button
            type="button"
            onClick={handleNextOrFinish}
            className="w-full h-12 rounded-xl bg-[var(--color-ink,#1C1A18)] text-[var(--color-paper,#F8F4EE)] font-semibold text-[15px] hover:opacity-90 transition-opacity cursor-pointer flex items-center justify-center"
          >
            {isLastQuestion ? 'ফলাফল দেখুন' : 'পরের প্রশ্ন'}
          </button>
        ) : (
          <div className="h-12 flex items-center justify-center text-[13px] text-[var(--color-muted,#5F564D)] select-none">
            একটি উত্তর নির্বাচন করুন
          </div>
        )}
      </div>
    </div>
  );
}
