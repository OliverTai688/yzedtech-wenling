'use client';

import { useSyncExternalStore } from 'react';

// 舞台模式下，書目前翻到哪個對象（null：書還闔著，或不在舞台模式）。
// 由 StageBook 寫入、手機底部固定列（StageStickyCta）讀取：固定列跟著換成這個對象的第一個按鈕。
// 與 lib/need.ts 的「訪客選過的方向」不同：這只是目前看到的那一頁，不會被記住。
let viewed: string | null = null;
const listeners = new Set<() => void>();

export function setViewedNeed(id: string | null) {
  if (id === viewed) return;
  viewed = id;
  listeners.forEach((fn) => fn());
}

export function useViewedNeed(): string | null {
  return useSyncExternalStore(
    (fn) => {
      listeners.add(fn);
      return () => listeners.delete(fn);
    },
    () => viewed,
    () => null
  );
}
