'use client';

import { useEffect, useRef, useState, type ReactNode } from 'react';
import { Tabs } from 'radix-ui';
import { cn } from '@/lib/utils';

// 分頁（pages-v2/BRIEF §6）：一次看一組對等的內容。Radix Tabs 負責鍵盤與 ARIA，外觀是設計系統的 chip 列。
// - 所有面板都在 HTML 裡（forceMount）；沒選到的面板由 CSS 隱藏，而且只在 <html class="js"> 時隱藏，
//   所以沒有 JavaScript 時全部攤開（分頁列隱藏，各面板改顯示自己的分頁名稱），見 app/globals.css。
// - 網址的錨點等於某個分頁的 id（或 `${idPrefix}-${id}`）時，會切到那一個分頁並捲到分頁列。
// - 文字都由呼叫端傳入：label 與 ariaLabel 必須是文案集既有的字串。
export interface ChipTabItem {
  id: string;
  label: string;
  content: ReactNode;
}

interface ChipTabsProps {
  items: ChipTabItem[];
  /** 這一組分頁在頁面上唯一的前綴；面板的 id 是 `${idPrefix}-${item.id}` */
  idPrefix: string;
  /** 分頁列的無障礙名稱（既有字串，例如所在區塊的標題） */
  ariaLabel: string;
  /** 一開始選到的分頁，預設第一個 */
  defaultId?: string;
  className?: string;
  /** 加在每個面板上的 class */
  panelClassName?: string;
}

export default function ChipTabs({ items, idPrefix, ariaLabel, defaultId, className, panelClassName }: ChipTabsProps) {
  const [value, setValue] = useState(defaultId ?? items[0]?.id ?? '');
  const root = useRef<HTMLDivElement>(null);

  // 只在載入與錨點改變時對一次；ids 用字串當依賴，呼叫端每次重繪傳入新陣列也不會重跑
  const ids = items.map((item) => item.id).join('|');
  useEffect(() => {
    const fromHash = () => {
      const hash = decodeURIComponent(window.location.hash.slice(1));
      const match = ids.split('|').find((id) => id === hash || `${idPrefix}-${id}` === hash);
      if (!match) return;
      setValue(match);
      root.current?.scrollIntoView({ block: 'start' });
    };
    fromHash();
    window.addEventListener('hashchange', fromHash);
    return () => window.removeEventListener('hashchange', fromHash);
  }, [ids, idPrefix]);

  return (
    <Tabs.Root ref={root} value={value} onValueChange={setValue} className={cn('scroll-mt-24', className)}>
      <Tabs.List aria-label={ariaLabel} className="chip-tabs__list">
        {items.map((item) => (
          <Tabs.Trigger
            key={item.id}
            value={item.id}
            id={`${idPrefix}-tab-${item.id}`}
            aria-controls={`${idPrefix}-${item.id}`}
            className="chip shrink-0 text-base"
          >
            {item.label}
          </Tabs.Trigger>
        ))}
      </Tabs.List>
      {items.map((item) => (
        <Tabs.Content
          key={item.id}
          value={item.id}
          forceMount
          id={`${idPrefix}-${item.id}`}
          aria-labelledby={`${idPrefix}-tab-${item.id}`}
          className={cn('chip-tabs__panel mt-6 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring', panelClassName)}
        >
          {/* 沒有 JavaScript 時才顯示：攤開的每一組前面要有名稱 */}
          <p className="chip-tabs__label mb-3 font-serif text-xl font-bold text-card-foreground">{item.label}</p>
          {item.content}
        </Tabs.Content>
      ))}
    </Tabs.Root>
  );
}
