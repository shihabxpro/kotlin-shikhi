/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type Block =
  | { type: 'heading'; text: string; icon?: 'phone' | 'server' | 'devices' }
  | { type: 'paragraph'; text: string }
  | { type: 'list'; items: string[]; ordered?: boolean }
  | { type: 'code'; code: string; language?: string; caption?: string }
  | { type: 'note'; text: string }
  | { type: 'task'; title?: string; text: string; hint?: string }
  | {
      type: 'quiz';
      questions: {
        question: string;
        options: string[];
        answerIndex: number;
        explanation: string;
      }[];
    };

export interface Lesson {
  title: string;
  blocks: Block[];
}

export interface ModuleItem {
  id: number;
  number: string;
  title: string;
  description: string;
  lessonsCount: string;
  lessonTitles?: string[];
}

export type FeatureIconType = 'book' | 'code' | 'letter' | 'bolt';

export interface FeatureItem {
  title: string;
  description: string;
  iconType: FeatureIconType;
}

export interface GroupedListItem {
  id: string | number;
  number: string;
  title: string;
  description?: string;
  metaText?: string;
  badgeText?: string;
  isClickable?: boolean;
  onClick?: () => void;
}
