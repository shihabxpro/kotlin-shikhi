/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

const STORAGE_KEY = 'kotlin_shikhi_read_lessons';
const LAST_LESSON_KEY = 'kotlin_shikhi_last_lesson';

/** Dispatched on window whenever the read-progress set changes. */
export const PROGRESS_EVENT = 'kotlin-shikhi:progress';

export function lessonKey(moduleId: number, lessonId: number): string {
  return `${moduleId}-${lessonId}`;
}

export function getReadLessons(): Set<string> {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return new Set<string>();
    const parsed: unknown = JSON.parse(raw);
    if (Array.isArray(parsed)) {
      return new Set(parsed.filter((item): item is string => typeof item === 'string'));
    }
  } catch {
    // ignore malformed storage
  }
  return new Set<string>();
}

export function markLessonRead(moduleId: number, lessonId: number): void {
  const key = lessonKey(moduleId, lessonId);
  try {
    localStorage.setItem(LAST_LESSON_KEY, key);
  } catch {
    // storage unavailable
  }

  const read = getReadLessons();
  if (read.has(key)) return;
  read.add(key);
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify([...read]));
  } catch {
    // storage unavailable — keep in-memory only
  }
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new Event(PROGRESS_EVENT));
  }
}

export interface LessonRef {
  moduleId: number;
  lessonId: number;
}

/** The most recently opened lesson, if any. */
export function getLastLesson(): LessonRef | null {
  try {
    const raw = localStorage.getItem(LAST_LESSON_KEY);
    if (!raw) return null;
    const [moduleId, lessonId] = raw.split('-').map(Number);
    if (Number.isFinite(moduleId) && Number.isFinite(lessonId)) {
      return { moduleId, lessonId };
    }
  } catch {
    // ignore
  }
  return null;
}

export function countReadLessons(read: Set<string>, moduleId: number, total: number): number {
  let count = 0;
  for (let lessonId = 1; lessonId <= total; lessonId += 1) {
    if (read.has(lessonKey(moduleId, lessonId))) count += 1;
  }
  return count;
}
