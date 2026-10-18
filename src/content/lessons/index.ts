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
import lesson2_3 from './module-02/lesson-03';
import lesson2_4 from './module-02/lesson-04';
import lesson2_5 from './module-02/lesson-05';
import lesson2_6 from './module-02/lesson-06';
import lesson2_7 from './module-02/lesson-07';
import lesson2_8 from './module-02/lesson-08';
import lesson2_9 from './module-02/lesson-09';
import lesson2_10 from './module-02/lesson-10';
import lesson2_11 from './module-02/lesson-11';
import lesson2_12 from './module-02/lesson-12';

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
  '2-3': lesson2_3,
  '2-4': lesson2_4,
  '2-5': lesson2_5,
  '2-6': lesson2_6,
  '2-7': lesson2_7,
  '2-8': lesson2_8,
  '2-9': lesson2_9,
  '2-10': lesson2_10,
  '2-11': lesson2_11,
  '2-12': lesson2_12,
};

export function getLessonContent(moduleId: number, lessonId: number): Lesson | null {
  const key = `${moduleId}-${lessonId}`;
  return LESSONS_REGISTRY[key] || null;
}
