'use client';

import { LazyMotion, MotionConfig, domAnimation } from 'motion/react';
import type { ReactNode } from 'react';

// 全站動效設定（RPT-001 §5.4 D3、D7）：
// - reducedMotion="user"：系統開啟「減少動態」時，motion 元件只保留淡入、取消位移。
// - LazyMotion：搭配 `motion/react-m` 的 m 元件，只載入基本動畫功能。
export default function MotionProvider({ children }: { children: ReactNode }) {
  return (
    <MotionConfig reducedMotion="user">
      <LazyMotion features={domAnimation}>{children}</LazyMotion>
    </MotionConfig>
  );
}
