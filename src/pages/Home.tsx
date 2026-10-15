/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import FeatureCarousel from '../components/FeatureCarousel';
import GroupedList from '../components/GroupedList';
import Hero from '../components/Hero';
import SectionHeader from '../components/SectionHeader';
import StatsStrip from '../components/StatsStrip';
import { FEATURE_ITEMS, MODULES_DATA } from '../data/modules';
import { GroupedListItem } from '../types';

interface HomeProps {
  onSelectModule: (moduleId: number) => void;
  isPaused?: boolean;
}

export default function Home({ onSelectModule, isPaused = false }: HomeProps) {
  const handleStartLearning = () => {
    window.location.hash = '#/module/1/lesson/1';
    window.dispatchEvent(new PopStateEvent('popstate', { state: window.history.state }));
  };

  const handleViewRoadmap = () => {
    const modulesSection = document.getElementById('modules-section');
    if (modulesSection) {
      modulesSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const groupedModules: GroupedListItem[] = MODULES_DATA.map((module) => {
    const isClickable = Boolean(module.lessonTitles?.length);

    return {
      id: module.id,
      number: module.number,
      title: module.title,
      description: module.description,
      badgeText: `${module.lessonsCount} লেসন`,
      isClickable,
      onClick: () => {
        if (isClickable) {
          onSelectModule(module.id);
        }
      },
    };
  });

  return (
    <>
      {/* Hero section */}
      <Hero onStartLearning={handleStartLearning} onViewRoadmap={handleViewRoadmap} />

      {/* Stats strip */}
      <StatsStrip />

      {/* Feature highlights carousel */}
      <FeatureCarousel items={FEATURE_ITEMS} isPaused={isPaused} />

      {/* Modules Section */}
      <section id="modules-section" style={{ marginTop: 'var(--hero-gap)' }}>
        <SectionHeader
          title="আপনার শেখার পথ"
          subtitle="শূন্য থেকে ধাপে ধাপে Kotlin শিখুন।"
          as="h2"
          className="mb-5"
        />

        <GroupedList items={groupedModules} leadingSize={32} />
      </section>
    </>
  );
}
