'use client';

import * as m from 'motion/react-m';
import type { ReactNode } from 'react';

// 進場動效基礎元件（RPT-001 §5.2 的共用參數）：上移 16px 加淡入、250ms、
// 進入視窗約 10% 時播放一次。依序進場用 RevealGroup＋RevealItem，
// 每個元素間隔 70ms，一組建議不超過 6 個。
//
// 注意：主標題（LCP 元素）不要包在這些元件裡，避免從透明開始而延後顯示。
// 沒有 JavaScript 時由 app/layout.tsx 的 <noscript> 樣式讓 [data-reveal] 直接顯示。
const ease = [0.22, 1, 0.36, 1] as const;
const viewport = { once: true, margin: '0px 0px -10% 0px' } as const;
const hidden = { opacity: 0, y: 16 };
const shown = { opacity: 1, y: 0 };

interface RevealProps {
  children: ReactNode;
  className?: string;
  /** 延遲秒數 */
  delay?: number;
}

export function Reveal({ children, className, delay = 0 }: RevealProps) {
  return (
    <m.div
      data-reveal
      className={className}
      initial={hidden}
      whileInView={shown}
      viewport={viewport}
      transition={{ duration: 0.25, ease, delay }}
    >
      {children}
    </m.div>
  );
}

export function RevealGroup({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <m.div
      className={className}
      initial="hidden"
      whileInView="shown"
      viewport={viewport}
      variants={{ hidden: {}, shown: { transition: { staggerChildren: 0.07 } } }}
    >
      {children}
    </m.div>
  );
}

export function RevealItem({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <m.div
      data-reveal
      className={className}
      variants={{ hidden, shown: { ...shown, transition: { duration: 0.25, ease } } }}
    >
      {children}
    </m.div>
  );
}
