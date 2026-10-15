/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import GroupedList from '../components/GroupedList';
import SectionHeader from '../components/SectionHeader';
import { getLessonContent } from '../content/lessons';
import { MODULES_DATA, toBengaliNumber } from '../data/modules';
import { GroupedListItem } from '../types';

interface ModulePageProps {
  moduleId: number;
  onSelectLesson?: (lessonId: number) => void;
}

export default function ModulePage({ moduleId, onSelectLesson }: ModulePageProps) {
  const currentModule = MODULES_DATA.find((m) => m.id === moduleId) || MODULES_DATA[0];

  const lessonItems: GroupedListItem[] = (currentModule.lessonTitles || []).map((title, idx) => {
    const lessonId = idx + 1;
    const isClickable = Boolean(getLessonContent(moduleId, lessonId));

    return {
      id: idx,
      number: toBengaliNumber(lessonId),
      title,
      isClickable,
      onClick: () => {
        if (isClickable && onSelectLesson) {
          onSelectLesson(lessonId);
        }
      },
    };
  });

  return (
    <section className="w-full">
      {/* Module Heading & Subtitle using shared SectionHeader */}
      <SectionHeader
        title={currentModule.title}
        subtitle={`${currentModule.description}, মোট ${currentModule.lessonsCount}টি লেসন।`}
        as="h1"
        className="mb-6"
      />

      {/* Section heading for lessons list */}
      <h2
        className="text-lg sm:text-xl font-bold text-[var(--color-ink,#1C1A18)] tracking-tight mb-3 m-0"
        style={{ lineHeight: 1.3 }}
      >
        লেসন তালিকা
      </h2>

      {/* Grouped container of lesson rows */}
      <GroupedList items={lessonItems} />
    </section>
  );
}
