import type { CSSProperties } from 'react';
import WingsCompass from '../brand/WingsCompass';
import { HERO_OPEN } from './emblemGeo';

// 舞台的固定圖層（一般頁面模式下不顯示）：
// - 布景：暖白地面、光暈、地平線、換場用的金光。
// - 飛行的金翼羅盤：整個舞台只有這一個，從 Hero 飛到書、再到三階段，羅盤與雙翼不分開。
// 都是裝飾，對輔助科技隱藏。

// 前景金粉：位置與大小（%／px），最多六顆（RES-005 §2 規則 8）
const DUST: [left: number, top: number, size: number][] = [
  [8, 22, 46],
  [86, 14, 30],
  [72, 58, 54],
  [16, 70, 26],
  [44, 8, 22],
  [92, 80, 36],
];

export function StageBackdrop() {
  return (
    <div className="st-theatre" aria-hidden="true">
      <div className="st-halo" data-st="halo" />
      <div className="st-floor" data-st="floor" />
      <div className="st-flare" data-st="flare" />
      <div className="st-sweep" data-st="sweep" />
    </div>
  );
}

export function StageFly() {
  const start = { '--open': HERO_OPEN, '--o1': HERO_OPEN, '--o2': HERO_OPEN, '--o3': HERO_OPEN } as CSSProperties;
  return (
    <div className="st-fly" aria-hidden="true">
      <div className="st-fly__em" data-st="fly" style={start}>
        <WingsCompass open={HERO_OPEN} />
      </div>
    </div>
  );
}

export function StageDust() {
  return (
    <div className="st-dustlayer" aria-hidden="true">
      {DUST.map(([left, top, size]) => (
        <span key={`${left}-${top}`} className="st-dust" style={{ left: `${left}%`, top: `${top}%`, width: size, height: size }} />
      ))}
    </div>
  );
}
