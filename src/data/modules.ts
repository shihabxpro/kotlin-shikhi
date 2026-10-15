/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { FeatureItem, ModuleItem } from '../types';

export const MODULES_DATA: ModuleItem[] = [
  {
    id: 1,
    number: '০১',
    title: 'Kotlin পরিচিতি',
    description: 'পরিচিতি থেকে প্রথম প্রোগ্রাম পর্যন্ত',
    lessonsCount: '৭',
    lessonTitles: [
      'Kotlin কী',
      'Kotlin কোথায় ব্যবহার হয়',
      'প্রথম Kotlin প্রোগ্রাম',
      'Program Structure',
      'main() function পরিচিতি',
      'print() ও println()',
      'Comments',
    ],
  },
  {
    id: 2,
    number: '০২',
    title: 'ভেরিয়েবল ও Data Type',
    description: 'তথ্য রাখা ও ব্যবহার',
    lessonsCount: '১২',
    lessonTitles: [
      'ভেরিয়েবল কী',
      'val ও var',
      'ভেরিয়েবলের নামের নিয়ম',
      'Data Type পরিচিতি',
      'Type লেখার দুই উপায়',
      'Int ও Long',
      'Double ও Float',
      'Arithmetic Operator',
      'Boolean',
      'Char ও String',
      'String Template',
      'Type Conversion',
    ],
  },
  {
    id: 3,
    number: '০৩',
    title: 'Condition ও Loop',
    description: 'সিদ্ধান্ত নেওয়া ও পুনরাবৃত্তি',
    lessonsCount: '১২',
  },
  {
    id: 4,
    number: '০৪',
    title: 'Function',
    description: 'কোড ভেঙে ছোট অংশে সাজানো',
    lessonsCount: '১২',
  },
  {
    id: 5,
    number: '০৫',
    title: 'Class ও Object',
    description: 'বাস্তব জিনিসকে কোডে প্রকাশ',
    lessonsCount: '১৬',
  },
  {
    id: 6,
    number: '০৬',
    title: 'Collection ও Lambda',
    description: 'ডেটার তালিকা নিয়ে কাজ',
    lessonsCount: '১৬',
  },
  {
    id: 7,
    number: '০৭',
    title: 'Null Safety',
    description: 'Kotlin-এর ক্র্যাশ এড়ানোর কৌশল',
    lessonsCount: '১০',
  },
  {
    id: 8,
    number: '০৮',
    title: 'Coroutine Basics',
    description: 'একসাথে একাধিক কাজ সামলানো',
    lessonsCount: '২০',
  },
];

export const FEATURE_ITEMS: FeatureItem[] = [
  {
    title: 'ধাপে ধাপে সাজানো',
    description: 'শুরু থেকে অ্যাডভান্সড পর্যন্ত একটি সুস্পষ্ট রোডম্যাপ।',
    iconType: 'book',
  },
  {
    title: 'প্র্যাকটিস ভিত্তিক',
    description: 'প্রতিটি লেসনের শেষে কোড, চ্যালেঞ্জ ও কুইজ।',
    iconType: 'code',
  },
  {
    title: 'বাংলা ভাষায়',
    description: 'সহজ, প্রাঞ্জল এবং শুরুদের জন্য উপযোগী।',
    iconType: 'letter',
  },
  {
    title: 'বাস্তব উদাহরণ',
    description: 'বাস্তব জীবনের উদাহরণ দিয়ে ধারণা আরও পরিষ্কার।',
    iconType: 'bolt',
  },
];

export const BENGALI_DIGITS = ['০১', '০২', '০৩', '০৪', '০৫', '০৬', '০৭', '০৮', '০৯', '১০'];

const BENGALI_NUMERALS = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];

export function toBengaliNumber(n: number): string {
  const padded = n < 10 && n >= 0 ? `0${n}` : `${n}`;
  return padded
    .split('')
    .map((ch) => {
      const d = parseInt(ch, 10);
      return !isNaN(d) && BENGALI_NUMERALS[d] !== undefined ? BENGALI_NUMERALS[d] : ch;
    })
    .join('');
}
