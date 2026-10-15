/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect, useRef, useState } from 'react';
import MenuPanel from './components/MenuPanel';
import Topbar from './components/Topbar';
import Home from './pages/Home';
import LessonPage from './pages/LessonPage';
import ModulePage from './pages/ModulePage';
import type { CurrentRoute, TextSize } from './types';

type NavDirection = 'forward' | 'backward' | 'none';

export default function App() {
  const [currentHash, setCurrentHash] = useState(() => window.location.hash || '');
  const [isTopbarHidden, setIsTopbarHidden] = useState(false);
  const [transitionDirection, setTransitionDirection] = useState<NavDirection>('none');
  const [transitionKey, setTransitionKey] = useState(0);

  // Menu state and text size state
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isMenuOpenRef = useRef(false);
  const menuOpenScrollYRef = useRef(0);

  const [textSize, setTextSize] = useState<TextSize>(() => {
    try {
      const saved = localStorage.getItem('kotlin_shikhi_text_size');
      if (saved === 'small' || saved === 'medium' || saved === 'large') {
        return saved;
      }
    } catch {
      // fallback
    }
    return 'medium';
  });

  const handleTextSizeChange = (newSize: TextSize) => {
    setTextSize(newSize);
    try {
      localStorage.setItem('kotlin_shikhi_text_size', newSize);
    } catch {
      // fallback
    }
  };

  useEffect(() => {
    isMenuOpenRef.current = isMenuOpen;
  }, [isMenuOpen]);

  // Per-route scroll position tracking map
  const scrollPositionsRef = useRef<Record<string, number>>({});
  const lastScrollYRef = useRef(0);
  const activeHashRef = useRef(currentHash);

  // Keep track of history stack index for back vs forward detection
  const historyIndexRef = useRef<number>(
    typeof window.history.state === 'object' && window.history.state !== null && 'idx' in window.history.state
      ? Number(window.history.state.idx)
      : 0
  );

  // Initialize history.state if not present
  useEffect(() => {
    if (!window.history.state || typeof window.history.state.idx !== 'number') {
      window.history.replaceState({ idx: 0 }, '');
      historyIndexRef.current = 0;
    }
  }, []);

  // Keep activeHashRef in sync
  useEffect(() => {
    activeHashRef.current = currentHash;
  }, [currentHash]);

  // Route changes listener & scroll management
  useEffect(() => {
    const handlePopState = (e: PopStateEvent) => {
      const nextHash = window.location.hash || '';

      // Close menu on popstate/route change
      setIsMenuOpen(false);

      // If the hash didn't change (e.g. bottom sheet modal pushState/popstate), don't trigger page transition
      if (nextHash === activeHashRef.current) {
        return;
      }

      const newIdx = e.state && typeof e.state.idx === 'number' ? e.state.idx : 0;
      const prevIdx = historyIndexRef.current;
      historyIndexRef.current = newIdx;

      // Determine navigation direction
      const dir: NavDirection = newIdx < prevIdx ? 'backward' : 'forward';

      // Restore stored scroll position if available; else scroll to top
      const storedPos = scrollPositionsRef.current[nextHash];
      const targetScroll = typeof storedPos === 'number' ? storedPos : 0;

      // Scroll immediately without animating scroll
      window.scrollTo({ top: targetScroll, behavior: 'instant' as ScrollBehavior });

      // Reset topbar visibility
      setIsTopbarHidden(false);
      lastScrollYRef.current = targetScroll;

      // Update state and trigger animation
      setCurrentHash(nextHash);
      setTransitionDirection(dir);
      setTransitionKey((k) => k + 1);
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Topbar scroll show/hide & menu close on >10px scroll
  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const currentY = Math.max(0, window.scrollY);
          const prevY = lastScrollYRef.current;
          const diff = currentY - prevY;

          // Always record current scroll position for the current route
          scrollPositionsRef.current[activeHashRef.current] = currentY;

          if (isMenuOpenRef.current) {
            // Keep topbar visible while menu is open
            setIsTopbarHidden(false);
            // Close menu if user scrolls more than 10px
            if (Math.abs(currentY - menuOpenScrollYRef.current) > 10) {
              setIsMenuOpen(false);
            }
          } else {
            // If near the top (under ~24px), always show topbar
            if (currentY <= 24) {
              setIsTopbarHidden(false);
            } else if (diff > 12) {
              // Scrolled down more than ~12px -> slide up out of view
              setIsTopbarHidden(true);
            } else if (diff < -4) {
              // Scrolled up even slightly -> slide back in
              setIsTopbarHidden(false);
            }
          }

          lastScrollYRef.current = currentY;
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menu on Escape key press
  useEffect(() => {
    if (!isMenuOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isMenuOpen]);

  const navigateForward = (targetHash: string) => {
    setIsMenuOpen(false);

    // 1. Save current scroll before navigating
    scrollPositionsRef.current[activeHashRef.current] = window.scrollY;

    // 2. Increment history index
    const nextIdx = historyIndexRef.current + 1;
    historyIndexRef.current = nextIdx;

    // 3. Push history state
    window.history.pushState({ idx: nextIdx }, '', targetHash || window.location.pathname);

    // 4. Scroll instantly to top before triggering transition
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });

    // 5. Reset topbar
    setIsTopbarHidden(false);
    lastScrollYRef.current = 0;

    // 6. Update view & trigger forward transition
    setCurrentHash(targetHash);
    setTransitionDirection('forward');
    setTransitionKey((k) => k + 1);
  };

  const navigateBackward = (targetHash: string, restoreScroll: boolean = false) => {
    setIsMenuOpen(false);

    // 1. Save current scroll before navigating
    scrollPositionsRef.current[activeHashRef.current] = window.scrollY;

    // 2. Increment history index
    const nextIdx = historyIndexRef.current + 1;
    historyIndexRef.current = nextIdx;

    // 3. Push history state
    window.history.pushState({ idx: nextIdx }, '', targetHash || window.location.pathname);

    // 4. Scroll position: restore if available and requested (e.g. for module list), else top
    const targetScroll =
      restoreScroll && typeof scrollPositionsRef.current[targetHash] === 'number'
        ? scrollPositionsRef.current[targetHash]
        : 0;
    window.scrollTo({ top: targetScroll, behavior: 'instant' as ScrollBehavior });

    // 5. Reset topbar
    setIsTopbarHidden(false);
    lastScrollYRef.current = targetScroll;

    // 6. Update view & trigger backward transition
    setCurrentHash(targetHash);
    setTransitionDirection('backward');
    setTransitionKey((k) => k + 1);
  };

  const navigateToModule = (moduleId: number) => {
    navigateForward(`#/module/${moduleId}`);
  };

  const navigateToLesson = (moduleId: number, lessonId: number) => {
    navigateForward(`#/module/${moduleId}/lesson/${lessonId}`);
  };

  const navigateToPrevLesson = (moduleId: number, lessonId: number) => {
    navigateBackward(`#/module/${moduleId}/lesson/${lessonId}`, false);
  };

  const navigateBackToModule = (moduleId: number) => {
    navigateBackward(`#/module/${moduleId}`, true);
  };

  const navigateHome = () => {
    if (activeHashRef.current === '') return;
    navigateForward('');
  };

  // Derive current route
  const currentRoute: CurrentRoute = (() => {
    const lessonMatch = currentHash.match(/^#\/module\/(\d+)\/lesson\/(\d+)$/);
    if (lessonMatch) {
      return {
        type: 'lesson',
        moduleId: parseInt(lessonMatch[1], 10),
        lessonId: parseInt(lessonMatch[2], 10),
      };
    }
    const moduleMatch = currentHash.match(/^#\/module\/(\d+)$/);
    if (moduleMatch) {
      return {
        type: 'module',
        moduleId: parseInt(moduleMatch[1], 10),
      };
    }
    return { type: 'home' };
  })();

  const handleMenuNavigateHome = () => {
    setIsMenuOpen(false);
    navigateHome();
  };

  const handleMenuNavigateModules = () => {
    setIsMenuOpen(false);
    if (currentHash === '') {
      document.getElementById('modules-section')?.scrollIntoView({ behavior: 'smooth' });
    } else {
      navigateForward('');
      setTimeout(() => {
        document.getElementById('modules-section')?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
  };

  const handleMenuNavigateLessonList = (moduleId: number) => {
    setIsMenuOpen(false);
    navigateToModule(moduleId);
  };

  const handleNextModule = (nextModId: number) => {
    navigateToModule(nextModId);
  };

  // Route matching
  const renderRoute = () => {
    // Match lesson route: #/module/:moduleId/lesson/:lessonId
    const lessonMatch = currentHash.match(/^#\/module\/(\d+)\/lesson\/(\d+)$/);
    if (lessonMatch) {
      const moduleId = parseInt(lessonMatch[1], 10);
      const lessonId = parseInt(lessonMatch[2], 10);
      return (
        <LessonPage
          moduleId={moduleId}
          lessonId={lessonId}
          textSize={textSize}
          onNextLesson={(nextId) => navigateToLesson(moduleId, nextId)}
          onPrevLesson={(prevId) => navigateToPrevLesson(moduleId, prevId)}
          onNextModule={handleNextModule}
          onViewAllModules={handleMenuNavigateModules}
        />
      );
    }

    // Match module route: #/module/:moduleId
    const moduleMatch = currentHash.match(/^#\/module\/(\d+)$/);
    if (moduleMatch) {
      const moduleId = parseInt(moduleMatch[1], 10);
      return (
        <ModulePage
          moduleId={moduleId}
          onSelectLesson={(lessonId) => navigateToLesson(moduleId, lessonId)}
        />
      );
    }

    return <Home onSelectModule={navigateToModule} isPaused={currentHash !== ''} />;
  };

  const animationClass =
    transitionDirection === 'forward'
      ? 'page-enter-forward'
      : transitionDirection === 'backward'
      ? 'page-enter-backward'
      : '';

  const isLesson = /^#\/module\/\d+\/lesson\/\d+$/.test(currentHash);
  const maxWidthClass = isLesson ? 'max-w-[680px]' : 'max-w-xl';

  return (
    <div className="min-h-screen flex flex-col justify-between bg-[var(--topbar-bg,#F4EFE6)] overflow-x-hidden">
      {/* Fixed topbar: stays completely still, translateY transition only on scroll */}
      <Topbar
        onHomeClick={navigateHome}
        isHidden={isTopbarHidden && !isMenuOpen}
        isMenuOpen={isMenuOpen}
        onToggleMenu={() => {
          if (!isMenuOpen) {
            menuOpenScrollYRef.current = window.scrollY;
            setIsTopbarHidden(false);
            setIsMenuOpen(true);
          } else {
            setIsMenuOpen(false);
          }
        }}
        currentRoute={currentRoute}
      />

      {/* MenuPanel dropdown below topbar */}
      <MenuPanel
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
        currentRoute={currentRoute}
        onNavigateHome={handleMenuNavigateHome}
        onNavigateModules={handleMenuNavigateModules}
        onNavigateLessonList={handleMenuNavigateLessonList}
        textSize={textSize}
        onTextSizeChange={handleTextSizeChange}
      />

      {/* Main Layout Container with dot texture; pt-14 ensures content is not hidden under the topbar */}
      <div className="paper-dot-pattern flex-1 flex flex-col justify-between pt-14" style={{ overflowX: 'clip' }}>
        <main
          key={transitionKey}
          className={`flex-1 ${maxWidthClass} w-full mx-auto px-5 sm:px-6 flex flex-col justify-between pt-6 pb-8 ${animationClass}`}
          style={{ paddingBottom: 'calc(2rem + env(safe-area-inset-bottom, 0px))' }}
        >
          {renderRoute()}
        </main>
      </div>
    </div>
  );
}
