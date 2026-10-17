/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect, useState } from 'react';
import { getReadLessons, PROGRESS_EVENT } from '../utils/progress';

/** Subscribe to the set of lessons the reader has opened. */
export function useReadProgress(): Set<string> {
  const [read, setRead] = useState<Set<string>>(() => getReadLessons());

  useEffect(() => {
    const update = () => setRead(getReadLessons());
    window.addEventListener(PROGRESS_EVENT, update);
    window.addEventListener('storage', update);
    return () => {
      window.removeEventListener(PROGRESS_EVENT, update);
      window.removeEventListener('storage', update);
    };
  }, []);

  return read;
}
