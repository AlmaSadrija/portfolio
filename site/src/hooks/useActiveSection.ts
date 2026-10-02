import { useCallback, useSyncExternalStore } from 'react';
import { subscribeToViewport } from './viewport.ts';

/**
 * Id of the section being read: the last one whose top edge has passed 40% of
 * the viewport. At the bottom of the page the last section wins, so a short
 * final section can still become active.
 */
export function useActiveSection(ids: readonly string[]): string | null {
  const getSnapshot = useCallback(() => {
    const atBottom =
      window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2;
    if (atBottom) return ids.at(-1) ?? null;

    const marker = window.innerHeight * 0.4;
    let current: string | null = null;
    for (const id of ids) {
      const top = document.getElementById(id)?.getBoundingClientRect().top;
      if (top !== undefined && top <= marker) current = id;
    }
    return current;
  }, [ids]);

  return useSyncExternalStore(subscribeToViewport, getSnapshot, () => null);
}
