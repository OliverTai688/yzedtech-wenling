'use client';

import { Children, useState, type KeyboardEvent, type ReactNode } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

// 一次一則，左右翻（pages-v2/BRIEF §6）：故事、見證、媒體單集。
// - children 的每一個子元素是一則；全部都在 HTML 裡，沒輪到的由 CSS 隱藏（只在 <html class="js"> 時），
//   所以沒有 JavaScript 時每一則直向列出，箭頭與圓點不顯示（見 app/globals.css）。
// - 箭頭只有圖示；無障礙名稱是「要去的那一則」的標題，由 labels 傳入（既有字串，順序與 children 相同）。
// - 鍵盤：焦點在這個區塊內時，左右方向鍵翻頁。到頭尾時箭頭停用，不循環。
interface PagerProps {
  children: ReactNode;
  /** 每一則的標題（既有字串），用作箭頭的 aria-label */
  labels: string[];
  /** 整個區塊的無障礙名稱（既有字串，例如所在區塊的標題） */
  ariaLabel: string;
  /** true：高度跟著目前這一則變；預設 false：高度固定為最高的那一則，箭頭的位置不會跳動 */
  autoHeight?: boolean;
  className?: string;
}

export default function Pager({ children, labels, ariaLabel, autoHeight = false, className }: PagerProps) {
  const slides = Children.toArray(children);
  const [index, setIndex] = useState(0);
  const last = slides.length - 1;
  const go = (next: number) => setIndex(Math.min(last, Math.max(0, next)));

  const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    // 輸入欄位與分頁列（Radix Tabs 自己用方向鍵）裡的方向鍵不攔
    if ((event.target as HTMLElement).closest('input, textarea, select, [contenteditable="true"], [role="tab"]')) return;
    if (event.key === 'ArrowLeft') go(index - 1);
    else if (event.key === 'ArrowRight') go(index + 1);
    else return;
    event.preventDefault();
  };

  return (
    <div role="group" aria-label={ariaLabel} onKeyDown={onKeyDown} data-auto={autoHeight ? '' : undefined} className={cn('pager', className)}>
      <div aria-live="polite" className="pager__track">
        {slides.map((slide, i) => (
          <div key={i} className="pager__slide" data-off={i === index ? undefined : ''}>
            {slide}
          </div>
        ))}
      </div>
      {last > 0 && (
        <div className="pager__nav mt-5 flex items-center justify-between gap-4">
          <button type="button" className="icon-btn" aria-disabled={index === 0} aria-label={labels[Math.max(0, index - 1)]} onClick={() => go(index - 1)}>
            <ChevronLeft aria-hidden="true" />
          </button>
          <div aria-hidden="true" className="flex items-center gap-1.5">
            {slides.map((_, i) => (
              <span key={i} className="pager__dot" data-on={i === index ? '' : undefined} />
            ))}
          </div>
          <button type="button" className="icon-btn" aria-disabled={index === last} aria-label={labels[Math.min(last, index + 1)]} onClick={() => go(index + 1)}>
            <ChevronRight aria-hidden="true" />
          </button>
        </div>
      )}
    </div>
  );
}
