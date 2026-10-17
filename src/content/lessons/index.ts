/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Lesson } from '../../types';
import lesson01 from './module-01/lesson-01';
import lesson02 from './module-01/lesson-02';
import lesson03 from './module-01/lesson-03';
import lesson04 from './module-01/lesson-04';
import lesson05 from './module-01/lesson-05';
import lesson06 from './module-01/lesson-06';
import lesson07 from './module-01/lesson-07';
import lesson1_1 from './module-02/lesson-01';
import lesson2_2 from './module-02/lesson-02';

export type LessonContent = Lesson;

// Registry keyed by `module-lesson` string (e.g. "1-1")
export const LESSONS_REGISTRY: Record<string, Lesson> = {
  '1-1': lesson01,
  '1-2': lesson02,
  '1-3': lesson03,
  '1-4': lesson04,
  '1-5': lesson05,
  '1-6': lesson06,
  '1-7': lesson07,
  '2-1': lesson1_1,
  '2-2': lesson2_2,
};

export function getLessonContent(moduleId: number, lessonId: number): Lesson | null {
  const key = `${moduleId}-${lessonId}`;
  return LESSONS_REGISTRY[key] || null;
}
