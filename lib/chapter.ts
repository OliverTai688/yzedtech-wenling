'use client';

import { useSyncExternalStore } from 'react';

// 首頁目前捲到第幾章（PRD-004 §4.2）。由 ChapterProgress 寫入，底部固定列等元件讀取。
let current = '';
const listeners = new Set<() => void>();

export function setCurrentChapter(id: string) {
  if (id === current) return;
  current = id;
  listeners.forEach((fn) => fn());
}

export function useCurrentChapter(): string {
  return useSyncExternalStore(
    (fn) => {
      listeners.add(fn);
      return () => listeners.delete(fn);
    },
    () => current,
    () => ''
  );
}
