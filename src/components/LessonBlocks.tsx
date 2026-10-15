/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Block } from '../types';
import LessonIcon from './LessonIcons';
import QuizBlock from './QuizBlock';

/**
 * Tokenizer for inline formatting:
 * `backticks` -> inline <code>
 * **double asterisks** -> inline <strong>
 */
export function formatInlineText(text: string): React.ReactNode {
  if (!text) return null;

  const regex = /(`[^`]+`|\*\*[^*]+\*\*)/g;
  const parts = text.split(regex);

  if (parts.length === 1) {
    return text;
  }

  return parts.map((part, index) => {
    if (part.startsWith('`') && part.endsWith('`') && part.length >= 2) {
      return (
        <code
          key={index}
          className="font-mono text-[0.88em] px-1.5 py-0.5 rounded bg-[rgba(184,92,62,0.08)] text-[var(--color-terracotta,#B85C3E)] border border-[var(--color-border,#DED4C5)] align-baseline"
        >
          {part.slice(1, -1)}
        </code>
      );
    }
    if (part.startsWith('**') && part.endsWith('**') && part.length >= 4) {
      return (
        <strong key={index} className="font-semibold text-[var(--color-ink,#1C1A18)]">
          {part.slice(2, -2)}
        </strong>
      );
    }
    return part;
  });
}

function HeadingBlock({ block }: { block: Extract<Block, { type: 'heading' }> }) {
  if (block.icon) {
    return (
      <h2
        className="flex items-start gap-3 text-xl sm:text-[23px] font-bold text-[var(--color-ink,#1C1A18)] tracking-tight mt-4 mb-1 m-0"
        style={{ lineHeight: 1.35 }}
      >
        <span
          className="flex items-center justify-center text-[#B85C3E] shrink-0"
          style={{
            width: '36px',
            height: '36px',
            borderRadius: '10px',
            backgroundColor: 'rgba(184,92,62,0.07)',
            flexShrink: 0,
            marginTop: '-2px',
          }}
          aria-hidden="true"
        >
          <LessonIcon name={block.icon} />
        </span>
        <span className="flex-1 min-w-0">{formatInlineText(block.text)}</span>
      </h2>
    );
  }

  return (
    <h2
      className="text-xl sm:text-[23px] font-bold text-[var(--color-ink,#1C1A18)] tracking-tight mt-4 mb-1 m-0"
      style={{ lineHeight: 1.35 }}
    >
      {formatInlineText(block.text)}
    </h2>
  );
}

function ParagraphBlock({ block }: { block: Extract<Block, { type: 'paragraph' }> }) {
  return (
    <p className="text-[17px] sm:text-[18px] leading-[1.85] text-[var(--color-ink,#1C1A18)] m-0 whitespace-pre-line">
      {formatInlineText(block.text)}
    </p>
  );
}

function ListBlock({ block }: { block: Extract<Block, { type: 'list' }> }) {
  if (block.ordered) {
    return (
      <ol className="list-decimal pl-5 space-y-2 text-[17px] sm:text-[18px] leading-[1.8] text-[var(--color-ink,#1C1A18)] m-0">
        {block.items.map((item, idx) => (
          <li key={idx} className="pl-1 whitespace-pre-line">
            {formatInlineText(item)}
          </li>
        ))}
      </ol>
    );
  }

  return (
    <ul className="list-disc pl-5 space-y-2 text-[17px] sm:text-[18px] leading-[1.8] text-[var(--color-ink,#1C1A18)] m-0">
      {block.items.map((item, idx) => (
        <li key={idx} className="pl-1 whitespace-pre-line">
          {formatInlineText(item)}
        </li>
      ))}
    </ul>
  );
}

function highlightKotlin(code: string): React.ReactNode {
  const tokenRegex = /(?:"(?:[^"\\]|\\.)*"|"""[\s\S]*?"""|\/\/.*|\/\*[\s\S]*?\*\/|\b(?:fun|val|var|class|object|interface|package|import|return|if|else|when|for|while|do|try|catch|finally|throw|true|false|null|is|in|as|override|private|public|protected|internal|companion|data|sealed|enum|open|abstract)\b|\b[a-zA-Z_][a-zA-Z0-9_]*(?=\s*\()|\b\d+(?:\.\d+)?\b)/g;

  const elements: React.ReactNode[] = [];
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  while ((match = tokenRegex.exec(code)) !== null) {
    if (match.index > lastIndex) {
      elements.push(code.slice(lastIndex, match.index));
    }

    const token = match[0];
    const key = `${match.index}-${token}`;

    if (token.startsWith('"')) {
      // String literals in green
      elements.push(
        <span key={key} className="text-[#2D7A46]" style={{ color: '#2D7A46' }}>
          {token}
        </span>
      );
    } else if (token.startsWith('//') || token.startsWith('/*')) {
      // Comments in muted warm grey
      elements.push(
        <span key={key} className="text-[#8A7F72] italic" style={{ color: '#8A7F72' }}>
          {token}
        </span>
      );
    } else if (
      /^(?:fun|val|var|class|object|interface|package|import|return|if|else|when|for|while|do|try|catch|finally|throw|true|false|null|is|in|as|override|private|public|protected|internal|companion|data|sealed|enum|open|abstract)$/.test(
        token
      )
    ) {
      // Keywords in terracotta / orange
      elements.push(
        <span key={key} className="text-[#B85C3E] font-semibold" style={{ color: '#B85C3E' }}>
          {token}
        </span>
      );
    } else if (/^[a-zA-Z_][a-zA-Z0-9_]*$/.test(token)) {
      // Function names in distinct blue
      elements.push(
        <span key={key} className="text-[#2B6CB0] font-medium" style={{ color: '#2B6CB0' }}>
          {token}
        </span>
      );
    } else {
      // Numbers in purple
      elements.push(
        <span key={key} className="text-[#8F4E8B]" style={{ color: '#8F4E8B' }}>
          {token}
        </span>
      );
    }

    lastIndex = match.index + token.length;
  }

  if (lastIndex < code.length) {
    elements.push(code.slice(lastIndex));
  }

  return elements;
}

function CodeBlockItem({ block }: { block: Extract<Block, { type: 'code' }> }) {
  const [copied, setCopied] = useState(false);
  const isOutput = !block.language;
  const isInteractive = block.language === 'kotlin' && block.code.includes('আমার নাম সাকিব');
  const [customName, setCustomName] = useState('আমার নাম সাকিব');
  const [hasRun, setHasRun] = useState(false);
  const [outputContent, setOutputContent] = useState('');

  const handleRun = () => {
    setOutputContent(customName);
    setHasRun(true);
  };

  const handleCopy = async () => {
    const codeToCopy = isInteractive
      ? `fun main() {\n    println("${customName}")\n}`
      : block.code;

    try {
      await navigator.clipboard.writeText(codeToCopy);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      try {
        const textarea = document.createElement('textarea');
        textarea.value = codeToCopy;
        textarea.style.position = 'fixed';
        textarea.style.opacity = '0';
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch {
        // clipboard unavailable
      }
    }
  };

  return (
    <div className="w-full">
      <div
        className="rounded-xl border border-[#DED4C5] overflow-hidden shadow-none"
        style={{ backgroundColor: '#EFE8DE' }}
      >
        {isOutput ? (
          /* Output block header: clean, plain box with a muted "OUTPUT" label on the left; no macOS dots or copy button */
          <div className="flex items-center px-3.5 sm:px-4 py-2 border-b border-[#E2D8CA] bg-[#E8E1D5]/40 select-none">
            <span
              className="text-[11px] font-mono font-semibold text-[#8A7F72] tracking-wider uppercase"
              style={{ color: '#8A7F72' }}
            >
              OUTPUT
            </span>
          </div>
        ) : (
          /* Code block header: macOS dots, language tag, and Run/Copy button */
          <div className="flex items-center justify-between px-3.5 sm:px-4 py-2 sm:py-2.5 border-b border-[#E2D8CA] bg-[#E8E1D5]/60 select-none">
            <div className="flex items-center gap-2.5">
              {/* macOS-style window dots */}
              <div className="flex items-center gap-1.5" aria-hidden="true">
                <span className="w-2.5 h-2.5 rounded-full bg-[#EC6A5E] inline-block opacity-85" />
                <span className="w-2.5 h-2.5 rounded-full bg-[#F4BF4F] inline-block opacity-85" />
                <span className="w-2.5 h-2.5 rounded-full bg-[#61C554] inline-block opacity-85" />
              </div>
              <span className="text-[11px] font-mono font-medium text-[var(--color-muted,#5F564D)] uppercase tracking-wider ml-1">
                {block.language}
              </span>
            </div>

            {/* Replace Copy button with Run button for interactive block */}
            {isInteractive ? (
              <button
                type="button"
                onClick={handleRun}
                className="flex items-center gap-1.5 text-[12px] font-medium text-white bg-[#B85C3E] hover:bg-[#A34E32] active:scale-[0.98] px-2.5 py-1 rounded transition-colors cursor-pointer shadow-xs focus:outline-none focus-visible:ring-2 focus-visible:ring-[#B85C3E]"
                title="Run code"
                aria-label="Run code"
              >
                <svg
                  width="11"
                  height="11"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  stroke="none"
                  aria-hidden="true"
                >
                  <polygon points="5 3 19 12 5 21 5 3" />
                </svg>
                <span>Run</span>
              </button>
            ) : (
              <button
                type="button"
                onClick={handleCopy}
                className="flex items-center gap-1.5 text-[12px] font-medium text-[var(--color-muted,#5F564D)] hover:text-[var(--color-ink,#1C1A18)] bg-transparent hover:bg-[rgba(28,26,24,0.06)] px-2 py-1 rounded transition-colors cursor-pointer focus:outline-none focus-visible:ring-1 focus-visible:ring-[#B85C3E]"
                title="Copy code"
                aria-label="Copy code"
              >
                {copied ? (
                  <>
                    <svg
                      width="13"
                      height="13"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#2D7A46"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                    >
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                    <span className="text-[#2D7A46] font-medium">Copied!</span>
                  </>
                ) : (
                  <>
                    <svg
                      width="13"
                      height="13"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                    >
                      <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                      <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                    </svg>
                    <span>Copy</span>
                  </>
                )}
              </button>
            )}
          </div>
        )}

        {/* Code / Output Content */}
        <div className="overflow-x-auto p-4">
          <pre className="font-mono text-[14px] sm:text-[15px] leading-relaxed text-[var(--color-ink,#1C1A18)] m-0 whitespace-pre">
            <code>
              {isOutput ? (
                block.code
              ) : isInteractive ? (
                <>
                  <span className="text-[#B85C3E] font-semibold" style={{ color: '#B85C3E' }}>fun</span>{' '}
                  <span className="text-[#2B6CB0] font-medium" style={{ color: '#2B6CB0' }}>main</span>() {'{\n'}
                  {'    '}
                  <span className="text-[#2B6CB0] font-medium" style={{ color: '#2B6CB0' }}>println</span>(
                  <span className="text-[#2D7A46]" style={{ color: '#2D7A46' }}>"</span>
                  <input
                    type="text"
                    value={customName}
                    onChange={(e) => setCustomName(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        handleRun();
                      }
                    }}
                    className="font-mono text-[14px] sm:text-[15px] text-[#2D7A46] font-medium bg-[#E4DBD0] focus:bg-[#FFFDF9] border border-dashed border-[#B85C3E]/50 focus:border-[#B85C3E] rounded px-1.5 py-0.5 outline-none transition-colors align-baseline"
                    style={{
                      width: `${Math.max(12, customName.length * 1.4 + 2)}ch`,
                      maxWidth: 'calc(100% - 100px)',
                    }}
                    placeholder="নাম লিখুন"
                    aria-label="নাম পরিবর্তন করুন"
                  />
                  <span className="text-[#2D7A46]" style={{ color: '#2D7A46' }}>"</span>)
                  {'\n}'}
                </>
              ) : (
                highlightKotlin(block.code)
              )}
            </code>
          </pre>
        </div>
      </div>

      {/* Output block below interactive code: ONLY visible after user clicks "Run" */}
      {isInteractive && hasRun && (
        <div
          className="rounded-xl border border-[#DED4C5] overflow-hidden shadow-none mt-3"
          style={{ backgroundColor: '#EFE8DE' }}
        >
          {/* Output block header: clean, plain box with a muted "OUTPUT" label on the left */}
          <div className="flex items-center px-3.5 sm:px-4 py-2 border-b border-[#E2D8CA] bg-[#E8E1D5]/40 select-none">
            <span
              className="text-[11px] font-mono font-semibold text-[#8A7F72] tracking-wider uppercase"
              style={{ color: '#8A7F72' }}
            >
              OUTPUT
            </span>
          </div>

          {/* Output Content */}
          <div className="overflow-x-auto p-4">
            <pre className="font-mono text-[14px] sm:text-[15px] leading-relaxed text-[var(--color-ink,#1C1A18)] m-0 whitespace-pre">
              <code>{outputContent}</code>
            </pre>
          </div>
        </div>
      )}

      {block.caption && (
        <p className="text-[14px] text-[var(--color-muted,#5F564D)] mt-1.5 px-1 m-0">
          {formatInlineText(block.caption)}
        </p>
      )}
    </div>
  );
}

function NoteBlock({ block }: { block: Extract<Block, { type: 'note' }> }) {
  return (
    <aside
      className="border-l-[3px] border-[var(--color-terracotta,#B85C3E)] bg-[rgba(184,92,62,0.05)] rounded-r-lg px-4 py-3"
      role="note"
    >
      <div className="text-[16px] sm:text-[17px] leading-[1.8] text-[var(--color-ink,#1C1A18)] whitespace-pre-line">
        {formatInlineText(block.text)}
      </div>
    </aside>
  );
}

function TaskBlock({ block }: { block: Extract<Block, { type: 'task' }> }) {
  const [showHint, setShowHint] = useState(false);

  return (
    <div className="border border-[var(--color-border,#DED4C5)] rounded-2xl bg-[var(--topbar-bg,#F4EFE6)] p-4 sm:p-5">
      {block.title && (
        <div className="text-[17px] sm:text-[18px] font-semibold text-[var(--color-ink,#1C1A18)] mb-1.5">
          {formatInlineText(block.title)}
        </div>
      )}
      <div className="text-[16px] sm:text-[17px] leading-[1.8] text-[var(--color-ink,#1C1A18)] whitespace-pre-line">
        {formatInlineText(block.text)}
      </div>

      {block.hint && (
        <div className="mt-3 pt-3 border-t border-[var(--color-divider,#E6DDD0)]">
          <button
            type="button"
            onClick={() => setShowHint((prev) => !prev)}
            className="text-[14px] text-[var(--color-terracotta,#B85C3E)] font-medium hover:underline focus:outline-none cursor-pointer"
          >
            {showHint ? 'ইঙ্গিত লুকান' : 'ইঙ্গিত দেখুন'}
          </button>
          {showHint && (
            <div className="mt-2 text-[15px] sm:text-[16px] leading-relaxed text-[var(--color-muted,#5F564D)] pl-3 border-l-2 border-[var(--color-terracotta,#B85C3E)]">
              {formatInlineText(block.hint)}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

interface LessonBlocksProps {
  blocks: Block[];
}

export default function LessonBlocks({ blocks }: LessonBlocksProps) {
  if (!blocks || blocks.length === 0) {
    return null;
  }

  return (
    <div className="flex flex-col gap-5 sm:gap-6">
      {blocks.map((block, index) => {
        switch (block.type) {
          case 'heading':
            return <HeadingBlock key={index} block={block} />;
          case 'paragraph':
            return <ParagraphBlock key={index} block={block} />;
          case 'list':
            return <ListBlock key={index} block={block} />;
          case 'code':
            return <CodeBlockItem key={index} block={block} />;
          case 'note':
            return <NoteBlock key={index} block={block} />;
          case 'task':
            return <TaskBlock key={index} block={block} />;
          case 'quiz':
            return <QuizBlock key={index} questions={block.questions} />;
          default:
            return null;
        }
      })}
    </div>
  );
}
