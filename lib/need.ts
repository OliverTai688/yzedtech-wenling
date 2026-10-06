'use client';

import { useSyncExternalStore } from 'react';

// 記住訪客在需求入口選的方向（PRD-004 §4.3）。只存在訪客自己的瀏覽器，不送出。
const KEY = 'wenling:need';
const EVENT = 'wenling:need-change';

function read(): string | null {
  try {
    return window.localStorage.getItem(KEY);
  } catch {
    return null;
  }
}

export function setChosenNeed(id: string) {
  try {
    window.localStorage.setItem(KEY, id);
  } catch {
    // 無法寫入（隱私模式等）時，選擇只在這一頁有效
  }
  window.dispatchEvent(new CustomEvent(EVENT));
}

function subscribe(onChange: () => void) {
  window.addEventListener(EVENT, onChange);
  window.addEventListener('storage', onChange);
  return () => {
    window.removeEventListener(EVENT, onChange);
    window.removeEventListener('storage', onChange);
  };
}

/** 訪客選過的方向 id；沒選過或在伺服器端時為 null。 */
export function useChosenNeed(): string | null {
  return useSyncExternalStore(subscribe, read, () => null);
}
